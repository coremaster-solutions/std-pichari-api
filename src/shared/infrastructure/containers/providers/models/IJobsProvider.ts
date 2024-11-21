type JobType =
  | "forgot_password"
  | "create_procedure"
  | "send_email_citizen_procedure"
  | "send_email_status_procedure"
  | "send_whatsapp_create_procedure"
  | "send_whatsapp_status_procedure"
  | "send_whatsapp_status_procedure_to_personal"
  | "send_email_share_document"
  | "clean_temp_directory";

export type JobsData<T> = {
  type: JobType;
  data: T;
};

export interface IJobsProvider {
  process(): void;
  add<T>(data: JobsData<T>): void;
  adapterRoute(): any;
}
