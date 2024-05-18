import fs from "fs";
import path, { resolve } from "path";
import { exec } from "child_process";
const dirname = __dirname;
const outputPath = path.join(dirname, "output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath: any) => {
  const jobId = path.basename(filepath).split(".")[0];
  const output = path.join(outputPath, `${jobId}.out`);
  console.log("Compiling:", filepath); // Log the source file path
  console.log("Output:", output); // Log the output file path
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${output} && cd ${outputPath} && .\\${jobId}.out`, // g++ filename -o exfilename and ./a.out
      (error, stdout, stderr) => {
        if (error) {
          console.log("error occ", error);
          reject({ error, stderr });
        } else if (stderr) {
          console.log("std error occ", error);
          reject(stderr);
        } else {
          console.log("success");
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeCpp,
};
