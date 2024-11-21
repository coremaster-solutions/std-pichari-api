import { AppError } from "@/shared/domain/models";
import { ISignsProvider } from "@/shared/infrastructure/containers";
import { EnumSignProvider } from "../../domain/enum";
import { ISignLogRepository } from "../../domain/repositories";
import { PAdESDataResponse, SignLogModel } from "../../domain/models";
import { Envs } from "@/shared/config";

interface IRequest {
  documentUrl: string;
  positionPersonal: string;
  signatureReason: string;
  stampUrl?: string;
  signatureStyle?: number;
}

export class CreateResponseBySignsPeruService {
  constructor(
    private signsProvider: ISignsProvider,
    private signLogRepository: ISignLogRepository
  ) {}

  async execute({
    documentUrl,
    positionPersonal,
    signatureReason,
    stampUrl = Envs.STAMP_URL,
    signatureStyle = 1,
  }: IRequest): Promise<SignLogModel> {
    const token = await this.signsProvider.getToken();

    if (!token) {
      throw new AppError({
        message: "Error al generar el token",
      });
    }

    const data: PAdESDataResponse = {
      signatureFormat: "PAdES",
      signatureLevel: "B",
      signaturePackaging: "enveloped",
      documentToSign: documentUrl,
      certificateFilter: ".*",
      webTsa: "",
      userTsa: "",
      passwordTsa: "",
      theme: "oscuro",
      visiblePosition: true,
      contactInfo: "",
      signatureReason,
      bachtOperation: false,
      oneByOne: true,
      signatureStyle,
      imageToStamp: stampUrl,
      stampTextSize: 14,
      stampWordWrap: 37,
      role: positionPersonal,
      stampPage: 1,
      positionx: 20,
      positiony: 20,
      uploadDocumentSigned: "",
      certificationSignature: false,
      token,
    };

    const signLog = await this.signLogRepository.create({
      documentUrl: "",
      provider: EnumSignProvider.SIGN_PERU,
      dataResponse: data as any,
    });

    if (!signLog) {
      throw new AppError({
        message: "Error al crear el log del firmado",
      });
    }
    const uploadDocumentSigned = `${Envs.API_URL}/v1/signs/upload-signed/${signLog.id}`;
    const updateSignLog = await this.signLogRepository.update(signLog.id, {
      dataResponse: Object.assign(data as any, { uploadDocumentSigned }),
    });

    return updateSignLog;
  }
}
