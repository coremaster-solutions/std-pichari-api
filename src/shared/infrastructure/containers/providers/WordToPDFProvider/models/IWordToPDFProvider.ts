export type ConvertDto = {
  documentWordUrl: string;
  pdfDirUrl: string;
};
export interface IWordToPDFProvider {
  convert(params: ConvertDto): Promise<boolean>;
}
