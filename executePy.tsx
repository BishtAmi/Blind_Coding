import { exec } from "child_process";

const executePy = (filepath: any) => {
  return new Promise((resolve, reject) => {
    exec(
      `python ${filepath}`, // python filename
      (error, stdout, stderr) => {
        error && reject({ error, stderr }),
          stderr && reject(stderr),
          resolve(stdout);
      }
    );
  });
};

module.exports = {
  executePy,
};
