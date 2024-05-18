import { exec } from "child_process";

export const executePy = (filepath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`python ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
};
