export interface IGenerateRandomNumberProvider {
  generateProcedureNumber(length?: number): string;
  generateProcedureNumberCorrelative(trackingsSize: number): string;
}
