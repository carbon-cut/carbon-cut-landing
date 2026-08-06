"use client";

import Typography from "@/components/ui/typography";

export function YearBlockHeader({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <div>
        <Typography asChild variant="sectionTitle" size="sm">
          <h4>{title}</h4>
        </Typography>
      </div>
      {description ? (
        <Typography asChild variant="body" size="body" className="mt-2">
          <p>{description}</p>
        </Typography>
      ) : null}
    </>
  );
}
