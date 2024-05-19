import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import os from "os";

const tempDir = os.tmpdir(); // Use the system's temporary directory
const dirCode = path.join(tempDir, "code");

if (!fs.existsSync(dirCode)) {
  fs.mkdirSync(dirCode, { recursive: true });
}

export const genrateFile = async (format: string, code: string): Promise<string> => {
  console.log("dirname", dirCode);
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCode, filename);
  await fs.writeFileSync(filepath, code);
  return filepath;
};
