import {ShippingAverageEnum} from "@/documents/domain/enum";

export interface IFindByDocumentNumber {
  documentNumber: string,
  documentTypeId: string,
  shippingAverage: ShippingAverageEnum
}