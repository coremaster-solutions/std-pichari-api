import { IGenerateRandomNumberProvider } from "../models";
import crypto from "crypto";

export class GenerateRandomNumberProvider
  implements IGenerateRandomNumberProvider
{
  constructor() {}
  generateProcedureNumber(length: number = 5): string {
    const characters = "0123456789876543210";
    const charactersLength = characters.length;
    let result = "";

    const randomValues = new Uint32Array(length);

    crypto.getRandomValues(randomValues);
    randomValues.forEach((value) => {
      result += characters.charAt(value % charactersLength);
    });
    const year = new Date().getFullYear().toString().substring(2, 4);
    return `${year}${result}`;
  }

  generateProcedureNumberCorrelative(trackingsSize: number): string {
    const numberTracking = trackingsSize + 1;
    if (numberTracking < 10) {
      return `00${numberTracking}`;
    } else if (numberTracking < 100) {
      return `0${numberTracking}`;
    }
    return `${numberTracking}`;
  }
}
