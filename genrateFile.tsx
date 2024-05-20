import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const dirname = process.cwd();
const dirCode = path.join(dirname, "code");

if (!fs.existsSync(dirCode)) {
  fs.mkdirSync(dirCode, { recursive: true });
}

export const genrateFile = async (
  format: string,
  code: string
): Promise<string> => {
  console.log("dirname", dirCode);
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCode, filename);
  await fs.writeFileSync(filepath, code);
  return filepath;
};
