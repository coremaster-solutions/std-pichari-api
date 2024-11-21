import { directoryExists, emptyDirectory } from "@/shared/utils";

export class CleanTempDirectoryFilesService {
  async execute() {
    const path_temp = "tmp";
    try {
      const exists = await directoryExists(path_temp);

      if (!exists) {
        throw new Error("The file not exists");
      }
      emptyDirectory(path_temp);
    } catch (error) {
      console.log("Error empty directory::", error);
      throw new Error((error as Error).message);
    }
  }
}
