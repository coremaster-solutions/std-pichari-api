import { Router } from "express";
import { ArchivistsRoute } from "./archivists.route";
import { DocumentTypesRoute } from "./documentTypes.route";
import { DocumentsRoute } from "./documents.route";
import { FilesRoute } from "./files.routes";
import { GroupsRoute } from "./groups.route";
import { NotificationsRoute } from "./notifications.route";
import { OfficesRoute } from "./offices.route";
import { PermissionsRoute } from "./permissions.route";
import { PersonalOfficesRoute } from "./personalOffices.route";
import { PersonalsRoute } from "./personals.route";
import { ReportsRoute } from "./reports.route";
import { SignsRoute } from "./signs.routes";
import { TrackingDocumentsRoute } from "./trackingDocuments.route";
import { OfficeGroupsController } from "../../controllers";
import { OfficeGroupsRoute } from "./officeGroups.route";

export class V1Routes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  registerRoutes() {
    this.router.use("/personals", new PersonalsRoute().register());
    this.router.use("/document-types", new DocumentTypesRoute().register());
    this.router.use("/documents", new DocumentsRoute().register());
    this.router.use("/offices", new OfficesRoute().register());
    this.router.use("/files", new FilesRoute().register());
    this.router.use("/archivists", new ArchivistsRoute().register());
    this.router.use("/notifications", new NotificationsRoute().register());
    this.router.use(
      "/tracking-documents",
      new TrackingDocumentsRoute().register()
    );
    this.router.use("/reports", new ReportsRoute().register());
    this.router.use("/signs", new SignsRoute().register());
    this.router.use("/personal-offices", new PersonalOfficesRoute().register());
    this.router.use("/groups", new GroupsRoute().register());
    this.router.use("/permissions", new PermissionsRoute().register());
    this.router.use("/office-groups", new OfficeGroupsRoute().register());
    return this.router;
  }
}
