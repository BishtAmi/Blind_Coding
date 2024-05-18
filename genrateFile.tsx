import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
const dirname = __dirname
const dirCode = path.join(dirname, "code");

if (!fs.existsSync(dirCode)) {
  fs.mkdirSync(dirCode, { recursive: true });
}

const genrateFile = async (format: any, code: any) => {
  console.log("dirname", dirCode);
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCode, filename);
  await fs.writeFileSync(filepath, code);
  return filepath;
};

module.exports = {
  genrateFile,
};
