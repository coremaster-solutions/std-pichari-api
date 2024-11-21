import { PrismaClient, Prisma, Role, ArchivistType } from "@prisma/client";
import { hash } from "bcrypt";
import permissionList, { permissionListNotAdmin } from "./permissionList";

const prisma = new PrismaClient();

const personalsData: Prisma.PersonalCreateInput[] = [
  {
    firstName: "Administrador",
    first_lastName: "",
    second_lastName: "",
    documentType: "DNI",
    documentNumber: "12345678",
    address: "Jr Lima 1234",
    birthdate: new Date().toISOString(),
    civilStatus: "SINGLE",
    email: "admin@gmail.com",
    username: "ADMIN",
    password: "MDPichari",
    role: "ADMIN",
  },
  // {
  //   firstName: "MAXIMO",
  //   first_lastName: "MEZA",
  //   second_lastName: "ESPINOZA",
  //   documentType: "DNI",
  //   documentNumber: "70361177",
  //   rucNumber: "10703611774",
  //   address: "Jr Ayacucho 1234",
  //   birthdate: new Date().toISOString(),
  //   civilStatus: "SINGLE",
  //   email: "matt1007k@gmail.com",
  //   username: "70361177",
  //   password: "70361177",
  //   role: "IT",
  //   position: "Programador",
  // },
  // {
  //   firstName: "JEIN",
  //   first_lastName: "ROJAS",
  //   second_lastName: "LICAS",
  //   documentType: "DNI",
  //   documentNumber: "70361188",
  //   rucNumber: "10703611883",
  //   address: "Jr Carmen Alto 1234",
  //   birthdate: new Date().toISOString(),
  //   civilStatus: "SINGLE",
  //   email: "jein123@gmail.com",
  //   username: "70361188",
  //   password: "70361188",
  //   role: "PART_OF_TABLE",
  //   position: "Secretario",
  // },
];

const officesData: Prisma.OfficeCreateInput[] = [
  {
    name: "OFICINA DE ATENCIÓN AL CIUDADANO",
    description: "MESA DE PARTES",
  },
  {
    name: "OFICINA DE TECNOLOGÍAS DE LA INFORMACIÓN",
    description: "OFICINA DE TI",
  },
];

async function main() {
  console.log(`Truncate tables ...`);
  await prisma.personal.deleteMany();
  await prisma.archivist.deleteMany();
  await prisma.office.deleteMany();
  await prisma.group.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.groupPermission.deleteMany();
  await prisma.officeGroup.deleteMany();

  console.log(`Start seeding ...`);

  for (const permission of permissionList) {
    const permissionCreated = await prisma.permission.create({
      data: permission,
    });
    console.log(`Created permission with id: ${permissionCreated.id}`);
  }
  for (const c of personalsData) {
    const personal = await prisma.personal.create({
      data: { ...c, password: await hash(c.password, 10) },
    });
    console.log(`Created personal with id: ${personal.id}`);
  }
  const personalAdmin = await prisma.personal.findFirst({
    select: { id: true },
  });
  for (const o of officesData) {
    const office = await prisma.office.create({
      data: { ...o, creator: { connect: { id: personalAdmin?.id } } },
    });
    await prisma.archivist.create({
      data: {
        name: "Archivero 1",
        description: "Primer archivero",
        default: true,
        entityId: office.id,
        entityType: ArchivistType.OFFICE,
      },
    });
    console.log(`Created office with id: ${office.id}`);
  }
  const permissionsAdmin = await prisma.permission.findMany({
    where: {
      NOT: [
        {
          value: {
            in: permissionListNotAdmin,
          },
        },
      ],
    },
    select: { id: true },
  });
  const officeTI = await prisma.office.findFirst({
    where: { description: officesData.at(1)?.description },
  });

  const groupAdmin = await prisma.group.create({
    data: {
      description: "ADMIN",
    },
  });

  for (const permission of permissionsAdmin) {
    await prisma.groupPermission.create({
      data: {
        group: { connect: { id: groupAdmin?.id } },
        permission: { connect: { id: permission?.id } },
      },
    });
    console.log(
      `Created group with id: ${groupAdmin?.id} permission with id: ${permission?.id}`
    );
  }

  const groupOfficeAdmin = await prisma.officeGroup.create({
    data: {
      office: { connect: { id: officeTI?.id } },
      group: { connect: { id: groupAdmin?.id } },
      personal: { connect: { id: personalAdmin?.id } },
    },
  });
  console.log(`Created group office (admin) with id: ${groupOfficeAdmin.id}`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
