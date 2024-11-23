import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  getPaginationLinks,
  prisma,
  prismaService,
} from "@/shared/infrastructure/db";
import { StatusDocumentEnum } from "../../domain/enum";
import { IDocumentRepository } from "../../domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  personalId?: string;
  destinyOfficeId?: string;
  destinyPersonalId?: string;
}
export class GetAllDocumentSharedService {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({ personalId, ...queryData }: IRequest): Promise<any> {
    console.log("destinyOfficeId", queryData.destinyOfficeId);

    const personal = await this.personalRepository.findById(personalId!);

    if (!personal) {
      throw new AppError({
        message: `El personal logueado no existe`,
      });
    }

    let officeId = queryData.destinyOfficeId
      ? queryData.destinyOfficeId
      : personal?.personalOffices && personal?.personalOffices[0]?.officeId;

    const uuids = [personalId, officeId];
    let total: Array<{ count: number }> = [{ count: 0 }];
    const term = queryData.term ? `%${queryData.term}%` : `%%`;
    try {
      total = await prisma.$queryRaw`
SELECT 
    count(*)
  from (select FROM 
    "public"."documents" d
  WHERE 
    d."id" IN (
      SELECT DISTINCT t2."documentId"
      FROM "public"."tracking_documents" t2, 
           jsonb_array_elements(t2."sentDestinations") j
      WHERE 
          (t2."documentId", t2."sentDestinations") IS NOT null
          AND j->>'value' IN (${Prisma.join(uuids)}) 
          AND (t2."procedureNumber" ILIKE ${Prisma.sql`${term}`}
            OR t2."message" ILIKE ${Prisma.sql`${term}`} OR d."issue" ILIKE ${Prisma.sql`${term}`}
            OR d."documentNumber" ILIKE ${Prisma.sql`${term}`})
    ) 
  GROUP BY
    d."id"
  ORDER BY 
    d."createdAt" DESC) as sub
    `;

      const count = total.some((t) => Number(t.count) > 0)
        ? Number(total[0].count)
        : 0;

      const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
        query: queryData,
        modelTotal: count,
      });

      let response = null;

      response = await prisma.$queryRaw<any>`SELECT 
    d."id",
    d."procedureNumber",
    d."documentNumber",
    d."folioNumber",
    d."issue",
    d."documentUrl",
    d."attachmentDocumentUrl",
    d."statusSend"::text,
    d."documentTypeId",
    d."citizenId",
    d."createdAt",
    d."updatedAt",
    d."procedureType",
    d."shippingAverage",
    d."creatorId",
    d."archivistId",
    (
      SELECT 
        jsonb_build_object(
          'id', dt."id",
          'name', dt."name",
          'createdAt', dt."createdAt",
          'updatedAt', dt."updatedAt"
        )
      FROM "public"."document_types" dt
      WHERE dt."id" = d."documentTypeId"
    ) as "documentType",
    (
      SELECT 
        jsonb_build_object(
          'id', t1."id",
          'statusProcedure', t1."statusProcedure",
          'procedureNumber', t1."procedureNumber",
          'message', t1."message",
          'attentionPriority', t1."attentionPriority",
          'receivedDate', t1."receivedDate",
          'sentDestinations', t1."sentDestinations",
          'originPersonal', (
            SELECT jsonb_build_object(
              'id', op."id",
              'email', op."email",
              'username', op."username",              
              'firstName', op."firstName",
              'first_lastName', op."first_lastName",
              'second_lastName', op."second_lastName",
              'documentType', op."documentType",
              'documentNumber', op."documentNumber",
              'birthdate', op."birthdate",
              'address', op."address",
              'civilStatus', op."civilStatus",
              'ubigeo', op."ubigeo",
              'phone', op."phone",
              'cellphone', op."cellphone",
              'avatarUrl', op."avatarUrl",
              'status', op."status",
              'createdAt', op."createdAt",
              'updatedAt', op."updatedAt",
              'rucNumber', op."rucNumber",
              'firstLoginAt', op."firstLoginAt",
          	  'createdAt', op."createdAt",
          	  'updatedAt', op."updatedAt"
            )
            FROM "public"."personals" op
            WHERE op."id" = t1."originPersonalId" 
          ),
          'originOffice', (
          	SELECT jsonb_build_object(
          		'id', oo."id",
          		'name', oo."name",
          		'description', oo."description",
          		'status', oo."status",
          		'createdAt', oo."createdAt",
          		'updatedAt', oo."updatedAt"
          	)
          	FROM "public"."offices" oo
          	where oo."id" = t1."destinyOfficeId"
          ),
          'destinyPersonal', (
            SELECT jsonb_build_object(
              'id', dp."id",
              'email', dp."email",
              'username', dp."username",              
              'firstName', dp."firstName",
              'first_lastName', dp."first_lastName",
              'second_lastName', dp."second_lastName",
              'documentType', dp."documentType",
              'documentNumber', dp."documentNumber",
              'birthdate', dp."birthdate",
              'address', dp."address",
              'civilStatus', dp."civilStatus",
              'ubigeo', dp."ubigeo",
              'phone', dp."phone",
              'cellphone', dp."cellphone",
              'avatarUrl', dp."avatarUrl",
              'status', dp."status",
              'createdAt', dp."createdAt",
              'updatedAt', dp."updatedAt",
              'rucNumber', dp."rucNumber",
              'firstLoginAt', dp."firstLoginAt",
          	  'createdAt', dp."createdAt",
          	  'updatedAt', dp."updatedAt"
            )
            FROM "public"."personals" dp
            WHERE dp."id" = t1."destinyPersonalId" 
          ),
          'destinyOffice', (
          	SELECT jsonb_build_object(
          		'id', do1."id",
          		'name', do1."name",
          		'description', do1."description",
          		'status', do1."status",
          		'createdAt', do1."createdAt",
          		'updatedAt', do1."updatedAt"
          	)
          	FROM "public"."offices" do1
          	where do1."id" = t1."destinyOfficeId"
          )
        )
      FROM 
        "public"."tracking_documents" t1 
      WHERE 
        t1."documentId" = d."id" AND t1."sentDestinations" IS NOT null
      ORDER BY 
        t1."procedureNumber" DESC
      LIMIT 1
    ) AS "tracking"
  FROM 
    "public"."documents" d
  WHERE 
    d."id" IN (
      SELECT DISTINCT t2."documentId"
      FROM "public"."tracking_documents" t2, 
           jsonb_array_elements(t2."sentDestinations") j
      WHERE 
          (t2."documentId", t2."sentDestinations") IS NOT null
          AND j->>'value' IN (${Prisma.join(uuids)}) 
          AND (t2."procedureNumber" ILIKE ${Prisma.sql`${term}`}
            OR t2."message" ILIKE ${Prisma.sql`${term}`} OR d."issue" ILIKE ${Prisma.sql`${term}`}
            OR d."documentNumber" ILIKE ${Prisma.sql`${term}`})
    )
  GROUP BY
    d."id"
  ORDER BY 
    d."createdAt" DESC
  LIMIT ${perPage} OFFSET ${offsetSkip}
       `;

      return {
        message: "Successful",
        code: "000000",
        data: {
          data: response ?? null,
          metadata: {
            total: count,
            lastPage,
            page,
          },
        },
      };
    } catch (error) {
      console.log("ERROR GetAllDocumentSharedService::: ", error);
    }
  }
}
