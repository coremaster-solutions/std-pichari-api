export interface PAdESDataResponse {
  signatureFormat: string;
  signatureLevel: string;
  signaturePackaging: string;
  documentToSign: string;
  certificateFilter: string;
  webTsa: string;
  userTsa: string;
  passwordTsa: string;
  theme: string;
  visiblePosition: boolean;
  contactInfo: string;
  signatureReason: string;
  bachtOperation: boolean;
  oneByOne: boolean;
  signatureStyle: number;
  imageToStamp: string;
  stampTextSize: number;
  stampWordWrap: number;
  role: string;
  stampPage: number;
  positionx: number;
  positiony: number;
  uploadDocumentSigned: string;
  certificationSignature: boolean;
  token: string;
}
