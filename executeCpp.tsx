import fs from "fs";
import path from "path";
import { exec } from "child_process";
import os from "os";

const tempDir = os.tmpdir(); // Use the system's temporary directory
const outputPath = path.join(tempDir, "output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = (filepath: string): Promise<string> => {
  const jobId = path.basename(filepath).split(".")[0];
  const output = path.join(outputPath, `${jobId}.out`);
  console.log("Compiling:", filepath); // Log the source file path
  console.log("Output:", output); // Log the output file path

  return new Promise((resolve, reject) => {
    const command = `g++ ${filepath} -o ${output} && cd ${outputPath} && ./${jobId}.out`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Compilation error:", error);
        reject({ error, stderr });
      } else if (stderr) {
        console.error("Standard error:", stderr);
        reject(stderr);
      } else {
        console.log("Execution success");
        resolve(stdout);
      }
    });
  });
};
