import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const localSkillPath = resolve(".agents/skills/cross-repo-coordination/SKILL.md");
const peerSkillPath = resolve(
  process.env.CROSS_REPO_SKILL_FILE ??
    "../carbon-cut-backend/.agents/skills/cross-repo-coordination/SKILL.md"
);

const [localSkill, peerSkill] = await Promise.all([
  readFile(localSkillPath, "utf8"),
  readFile(peerSkillPath, "utf8"),
]);

if (localSkill !== peerSkill) {
  console.error(
    `Cross-repository coordination skill differs from ${peerSkillPath}. Keep both repository copies identical.`
  );
  process.exitCode = 1;
} else {
  console.log("Cross-repository coordination skill copies match.");
}
