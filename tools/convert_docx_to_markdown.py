#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree as ET
from zipfile import ZipFile


NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
}
W_NS = f"{{{NS['w']}}}"


HEADING_STYLES = {
    "Title": 1,
    "heading 1": 2,
    "heading 2": 3,
    "heading 3": 4,
    "heading 4": 5,
    "heading 5": 6,
    "heading 6": 6,
    "heading 7": 6,
    "heading 8": 6,
    "heading 9": 6,
    "*Eco titre 1": 2,
    "*Eco titre 2": 3,
    "*Eco titre 3": 4,
    "*Eco titre 4": 5,
    "*Eco titre 5": 6,
    "*Eco titre gras": 4,
    "*Eco titre gauche": 4,
    "*Eco titre spécial": 5,
    "Annexe_title": 2,
}

ASSOCIATED_CAPTION_STYLES = {
    "caption",
    "*Eco légende figure",
    "*Eco légende tableau",
}

LIST_OF_FIGURES_STYLES = {
    "table of figures",
    "*Eco Listes tableaux/figures",
    "*Référence de tableau/figure",
}

LIST_STYLE_PATTERN = re.compile(r"liste à puce|liste à puces", re.IGNORECASE)
LABEL_PATTERN = re.compile(r"^(Figure|Fig\.?|Tableau|Table)\s*([0-9]+)\b", re.IGNORECASE)


def normalize_space(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = text.replace("\u202f", " ")
    text = text.replace("\t", " ")
    text = re.sub(r"Erreur\s*!\s*Source du renvoi introuvable\.?", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"[ \r\f\v]+", " ", text)
    text = re.sub(r" *\n *", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def markdown_escape(text: str) -> str:
    text = text.replace("\\", "\\\\")
    text = text.replace("|", "\\|")
    return text


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def style_name(style_map: dict[str, str], paragraph: ET.Element) -> str:
    ppr = paragraph.find("w:pPr", NS)
    if ppr is None:
        return ""
    pstyle = ppr.find("w:pStyle", NS)
    if pstyle is None:
        return ""
    style_id = pstyle.get(f"{W_NS}val", "")
    return style_map.get(style_id, style_id)


def paragraph_text(paragraph: ET.Element) -> str:
    parts: list[str] = []
    for node in paragraph.iter():
        tag = local_name(node.tag)
        if tag == "t" and node.text:
            parts.append(node.text)
        elif tag in {"tab"}:
            parts.append(" ")
        elif tag in {"br", "cr"}:
            parts.append("\n")
        elif tag == "footnoteReference":
            footnote_id = node.get(f"{W_NS}id")
            if footnote_id:
                parts.append(f"[^{footnote_id}]")
    return normalize_space("".join(parts))


def cell_text(cell: ET.Element) -> str:
    chunks = [paragraph_text(paragraph) for paragraph in cell.findall("w:p", NS)]
    chunks = [chunk for chunk in chunks if chunk]
    return normalize_space(" <br> ".join(chunks))


def paragraph_has_drawing(paragraph: ET.Element) -> bool:
    return paragraph.find(".//w:drawing", NS) is not None


def list_indent(style: str) -> int:
    match = re.search(r"(\d+)$", style)
    if match:
        return max(0, int(match.group(1)) - 1)
    return 0


def label_key(text: str) -> str | None:
    match = LABEL_PATTERN.match(text)
    if not match:
        return None
    prefix = match.group(1).lower()
    if prefix.startswith("fig"):
        prefix = "figure"
    elif prefix.startswith("table"):
        prefix = "tableau"
    return f"{prefix} {match.group(2)}"


def clean_catalog_caption(text: str, style: str) -> str:
    text = normalize_space(text)
    if style in LIST_OF_FIGURES_STYLES:
        text = re.sub(r"\d+$", "", text).rstrip()
    return text


def build_caption_catalog(elements: list[dict]) -> dict[str, str]:
    catalog: dict[str, str] = {}
    for element in elements:
        if element["kind"] != "p":
            continue
        text = element["text"]
        key = label_key(text)
        if not key:
            continue
        cleaned = clean_catalog_caption(text, element["style"])
        if not cleaned:
            continue
        if key not in catalog or len(cleaned) < len(catalog[key]):
            catalog[key] = cleaned
    return catalog


def extract_description(text: str, title: str) -> str:
    text = normalize_space(text)
    title = normalize_space(title)
    if not text or not title or not text.startswith(title):
        return ""
    remainder = text
    while remainder.startswith(title):
        remainder = remainder[len(title) :].lstrip(" -–—:;,.")
    return normalize_space(remainder)


def heading_level(style: str) -> int | None:
    return HEADING_STYLES.get(style)


def table_to_markdown(table: ET.Element) -> list[str]:
    rows: list[list[str]] = []
    max_cols = 0
    for row in table.findall("w:tr", NS):
        values: list[str] = []
        for cell in row.findall("w:tc", NS):
            text = markdown_escape(cell_text(cell))
            tcpr = cell.find("w:tcPr", NS)
            grid_span = 1
            if tcpr is not None:
                grid = tcpr.find("w:gridSpan", NS)
                if grid is not None:
                    raw_span = grid.get(f"{W_NS}val")
                    if raw_span and raw_span.isdigit():
                        grid_span = int(raw_span)
            values.append(text)
            for _ in range(grid_span - 1):
                values.append("")
        max_cols = max(max_cols, len(values))
        rows.append(values)

    if not rows:
        return []

    for row in rows:
        row.extend([""] * (max_cols - len(row)))

    if len(rows) >= 2 and any(not cell for cell in rows[0]) and any(cell for cell in rows[1]):
        header = [
            " / ".join(part for part in [rows[0][index], rows[1][index]] if part)
            for index in range(max_cols)
        ]
        data_rows = rows[2:]
    else:
        header = rows[0]
        data_rows = rows[1:]

    if not any(header):
        header = [f"Colonne {index + 1}" for index in range(max_cols)]

    separator = ["---"] * max_cols
    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(separator) + " |",
    ]
    for row in data_rows:
        lines.append("| " + " | ".join(row) + " |")
    return lines


def render_figure_block(title: str, description: str) -> list[str]:
    lines = ["> Illustration omise", f"> {title}"]
    if description:
        lines.append(f"> Description: {description}")
    return lines


def load_footnotes(archive: ZipFile) -> dict[str, str]:
    try:
        footnotes_xml = archive.read("word/footnotes.xml")
    except KeyError:
        return {}
    footnotes_root = ET.fromstring(footnotes_xml)
    notes: dict[str, str] = {}
    for footnote in footnotes_root.findall("w:footnote", NS):
        footnote_id = footnote.get(f"{W_NS}id")
        if not footnote_id or footnote_id.startswith("-"):
            continue
        chunks = [paragraph_text(paragraph) for paragraph in footnote.findall("w:p", NS)]
        text = normalize_space(" ".join(chunk for chunk in chunks if chunk))
        if text:
            notes[footnote_id] = text
    return notes


def iter_body_elements(document_root: ET.Element) -> Iterable[ET.Element]:
    body = document_root.find("w:body", NS)
    if body is None:
        return []
    return list(body)


def paragraph_entry(style_map: dict[str, str], paragraph: ET.Element) -> dict:
    return {
        "kind": "p",
        "style": style_name(style_map, paragraph),
        "text": paragraph_text(paragraph),
        "drawing": paragraph_has_drawing(paragraph),
        "element": paragraph,
    }


def table_entry(table: ET.Element) -> dict:
    return {
        "kind": "tbl",
        "element": table,
    }


def build_elements(document_root: ET.Element, style_map: dict[str, str]) -> list[dict]:
    entries: list[dict] = []
    for child in iter_body_elements(document_root):
        tag = local_name(child.tag)
        if tag == "p":
            entries.append(paragraph_entry(style_map, child))
        elif tag == "tbl":
            entries.append(table_entry(child))
    return entries


def should_skip_caption_before_drawing(elements: list[dict], index: int) -> bool:
    current = elements[index]
    if current["kind"] != "p" or current["style"] not in ASSOCIATED_CAPTION_STYLES:
        return False
    if index + 1 >= len(elements):
        return False
    next_element = elements[index + 1]
    return next_element["kind"] == "p" and next_element["drawing"]


def render_markdown(elements: list[dict], caption_catalog: dict[str, str], footnotes: dict[str, str]) -> str:
    lines: list[str] = []
    consumed: set[int] = set()
    referenced_footnotes: list[str] = []

    def register_footnotes(text: str) -> None:
        for footnote_id in re.findall(r"\[\^([0-9]+)\]", text):
            if footnote_id in footnotes and footnote_id not in referenced_footnotes:
                referenced_footnotes.append(footnote_id)

    for index, element in enumerate(elements):
        if index in consumed:
            continue

        if element["kind"] == "tbl":
            table_lines = table_to_markdown(element["element"])
            if table_lines:
                lines.extend(table_lines)
                lines.append("")
            continue

        text = element["text"]
        style = element["style"]

        if should_skip_caption_before_drawing(elements, index):
            continue

        if element["drawing"]:
            level = heading_level(style)
            if level and text and not label_key(text):
                lines.append(f"{'#' * level} {text}")
                lines.append("")
                register_footnotes(text)
                continue

            if text and not label_key(text):
                lines.append(text)
                lines.append("")
                register_footnotes(text)
                continue

            candidates: list[tuple[int, str]] = []
            if text:
                candidates.append((index, text))
            if index > 0 and elements[index - 1]["kind"] == "p":
                previous = elements[index - 1]
                if previous["style"] in ASSOCIATED_CAPTION_STYLES and previous["text"]:
                    candidates.append((index - 1, previous["text"]))
            if index + 1 < len(elements) and elements[index + 1]["kind"] == "p":
                following = elements[index + 1]
                if following["style"] in ASSOCIATED_CAPTION_STYLES and following["text"]:
                    candidates.append((index + 1, following["text"]))

            chosen_text = ""
            chosen_index: int | None = None
            for candidate_index, candidate_text in candidates:
                if label_key(candidate_text):
                    chosen_text = candidate_text
                    chosen_index = candidate_index
                    break

            key = label_key(chosen_text) if chosen_text else None
            title = caption_catalog.get(key, clean_catalog_caption(chosen_text, style)) if key else ""
            description = extract_description(text, title) if title else ""

            if not title:
                continue

            if chosen_index is not None and chosen_index != index:
                consumed.add(chosen_index)

            lines.extend(render_figure_block(title, description))
            lines.append("")
            register_footnotes(title)
            register_footnotes(description)
            continue

        if not text:
            continue

        register_footnotes(text)
        level = heading_level(style)
        if level:
            lines.append(f"{'#' * level} {text}")
            lines.append("")
            continue

        if LIST_STYLE_PATTERN.search(style):
            indent = "  " * list_indent(style)
            lines.append(f"{indent}- {text}")
            continue

        lines.append(text)
        lines.append("")

    if referenced_footnotes:
        lines.append("## Notes")
        lines.append("")
        for footnote_id in sorted(referenced_footnotes, key=int):
            lines.append(f"[^{footnote_id}]: {footnotes[footnote_id]}")
        lines.append("")

    output = "\n".join(lines)
    output = re.sub(r"\n{3,}", "\n\n", output).strip() + "\n"
    return output


def load_style_map(archive: ZipFile) -> dict[str, str]:
    styles_root = ET.fromstring(archive.read("word/styles.xml"))
    style_map: dict[str, str] = {}
    for style in styles_root.findall("w:style", NS):
        style_id = style.get(f"{W_NS}styleId")
        name = style.find("w:name", NS)
        if not style_id:
            continue
        style_map[style_id] = name.get(f"{W_NS}val") if name is not None else style_id
    return style_map


def convert(source: Path, destination: Path) -> None:
    with ZipFile(source) as archive:
        style_map = load_style_map(archive)
        footnotes = load_footnotes(archive)
        document_root = ET.fromstring(archive.read("word/document.xml"))
        elements = build_elements(document_root, style_map)
        caption_catalog = build_caption_catalog(elements)
        markdown = render_markdown(elements, caption_catalog, footnotes)
    destination.write_text(markdown, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert a DOCX report into Markdown.")
    parser.add_argument("source", type=Path, help="Path to the source DOCX file")
    parser.add_argument(
        "destination",
        type=Path,
        nargs="?",
        help="Path to the destination Markdown file. Defaults to the same name with .md",
    )
    args = parser.parse_args()

    source = args.source
    destination = args.destination or source.with_suffix(".md")
    convert(source, destination)


if __name__ == "__main__":
    main()
