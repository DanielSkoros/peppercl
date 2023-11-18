import fs from "fs";
import path from "node:path";
import { BASE_PATH } from "../config";

const { mkdir } = require("node:fs/promises");

export class BaseFile {
  name!: string;
  path: string = path.join(BASE_PATH, "uploads");

  async save(path: string) {
    const options = { recursive: true };
    await mkdir(path, options);
    fs.rename(path, this.path, function (err) {
      if (err) throw err;
    });
  }
  delete() {
    fs.unlink(this.path, (err) => {
      if (err) return err;
      return "File deleted";
    });
  }
}
