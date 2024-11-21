export interface IUploadFileProvider {
  moveFileToPath(oldUrl: string, destinationDir: string): Promise<string>;
  removeFileByPath(path: string): Promise<string>;
  removeDic(path: string): Promise<boolean>;
}
