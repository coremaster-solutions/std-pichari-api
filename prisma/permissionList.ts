const permissionList = [
  {
    description: "Vista módulo Administración de personal",
    value: "vm_admin_personal",
  },
  {
    description: "Vista Sub-módulo Relación de personal",
    value: "sub_vm_admin_personal_mr_related_personal",
  },
  {
    description: "Vista y Operación Sub-módulo Relación de personal",
    value: "sub_vm_admin_personal_mrw_related_personal",
  },
  {
    description: "Vista Sub-módulo Grupos",
    value: "sub_vm_admin_personal_mr_groups",
  },
  {
    description: "Vista y Operación Sub-módulo Grupos",
    value: "sub_vm_admin_personal_mrw_groups",
  },
  {
    description: "Vista módulo Control de registros",
    value: "vm_register_control",
  },
  {
    description: "Vista Sub-módulo Nuevo trámite",
    value: "sub_vm_register_control_mr_new_procedure",
  },
  {
    description: "Vista y Operación Sub-módulo Nuevo trámite",
    value: "sub_vm_register_control_mrw_new_procedure",
  },
  {
    description: "Vista Sub-módulo Pendientes",
    value: "sub_vm_register_control_mr_pending",
  },
  {
    description: "Vista y Operación Sub-módulo Pendientes",
    value: "sub_vm_register_control_mrw_pending",
  },
  {
    description: "Vista Sub-módulo Registrados",
    value: "sub_vm_register_control_mr_registers",
  },
  {
    description: "Vista y Operación Sub-módulo Registrados",
    value: "sub_vm_register_control_mrw_registers",
  },
  {
    description: "Vista Sub-módulo En proceso",
    value: "sub_vm_register_control_mr_in_process",
  },
  {
    description: "Vista y Operación Sub-módulo En proceso",
    value: "sub_vm_register_control_mrw_in_process",
  },
  {
    description: "Vista Sub-módulo Observados",
    value: "sub_vm_register_control_mr_observed",
  },
  {
    description: "Vista y Operación Sub-módulo Observados",
    value: "sub_vm_register_control_mrw_observed",
  },
  {
    description: "Vista Sub-módulo Archivados",
    value: "sub_vm_register_control_mr_archived",
  },
  {
    description: "Vista y Operación Sub-módulo Archivados",
    value: "sub_vm_register_control_mrw_archived",
  },
  {
    description: "Vista módulo Configuación",
    value: "vm_configuration",
  },
  {
    description: "Vista Sub-módulo Oficinas creadas",
    value: "sub_vm_configuration_mr_offices",
  },
  {
    description: "Vista y Operación Sub-módulo Oficinas creadas",
    value: "sub_vm_configuration_mrw_offices",
  },
  {
    description: "Vista Sub-módulo Tipos de documentos",
    value: "sub_vm_configuration_mr_type_documents",
  },
  {
    description: "Vista y Operación Sub-módulo Tipos de documentos",
    value: "sub_vm_configuration_mrw_type_documents",
  },
  {
    description: "Vista módulo Reportes",
    value: "vm_reports",
  },
  {
    description: "Vista Sub-módulo Trámites",
    value: "sub_vm_reports_mr_formalities",
  },
  {
    description: "Vista y Operación Sub-módulo Trámites",
    value: "sub_vm_reports_mrw_formalities",
  },
];

export const permissionListNotAdmin = [
  "sub_vm_admin_personal_mr_related_personal",
  "sub_vm_admin_personal_mr_groups",
  "sub_vm_register_control_mrw_new_procedure",
  "sub_vm_register_control_mrw_pending",
  "sub_vm_register_control_mrw_registers",
  "sub_vm_register_control_mrw_in_process",
  "sub_vm_register_control_mrw_observed",
  "sub_vm_register_control_mrw_archived",
  "sub_vm_configuration_mr_offices",
  "sub_vm_configuration_mr_type_documents",
  "sub_vm_reports_mr_formalities",
];

export default permissionList;
