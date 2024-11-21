import {
  deleteDirectory,
  deleteFile,
  fileExists,
  moveFileToPath as moveFileHelper,
} from "@/shared/utils";
import { IUploadFileProvider } from "../models";

export class UploadFileProvider implements IUploadFileProvider {
  async removeDic(path: string): Promise<boolean> {
    try {
      await deleteDirectory(path);
      return true;
    } catch (error) {
      return false;
    }
  }
  async removeFileByPath(path: string): Promise<string> {
    try {
      const exists = await fileExists(path);
      if (!exists) {
        throw new Error("The file not exists");
      }
      deleteFile(path);
      return "The file had been removed";
    } catch (error) {
      console.log("Error moveFileToPath::", error);
      throw new Error((error as Error).message);
    }
  }
  async moveFileToPath(
    oldUrl: string,
    destinationDir: string = "uploads"
  ): Promise<string> {
    let newFileUrl = oldUrl.replace("tmp", destinationDir);
    try {
      const exists = await fileExists(oldUrl);
      if (!exists) {
        throw new Error("The file not exists");
      }
      moveFileHelper(oldUrl, destinationDir);
    } catch (error) {
      console.log("Error moveFileToPath::", error);
      throw new Error((error as Error).message);
    }

    return newFileUrl;
  }
}
