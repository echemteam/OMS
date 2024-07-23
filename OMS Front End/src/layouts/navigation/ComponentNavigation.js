import React from "react";
import DemoForm from "../../pages/demoForm/DemoForm";
import DemoGrid from "../../pages/demoGrid/DemoGrid";
import Widgets from "../../pages/widgets/Widgets";
import Stepper from "../../pages/stepper/Stepper";
import { securityKey } from "../../data/SecurityKey";
import ApprovalRules from "../../pages/configuration/approvalRules/ApprovalRules";

const ApiParametersGrid = React.lazy(() => import("../../pages/apiConfiguration/apiParameters/ApiParametersGrid"));
const ApiAuthenticationGrid = React.lazy(() => import("../../pages/apiConfiguration/apiAuthentication/ApiAuthenticationGrid"));
const ApiEndPointsGrid = React.lazy(() => import("../../pages/apiConfiguration/apiEndPoints/ApiEndPointsGrid"));
const ApiProvidersGrid = React.lazy(() => import("../../pages/apiConfiguration/apiProviders/ApiProvidersGrid"));
//** Not Found */
const NotFound = React.lazy(() => import("../../pages/errors/NotFound"));
//** Dashboard */
const Dashboard = React.lazy(() => import('../../pages/dashboard/Dashboard'));

//** MyTask */
const MyTask = React.lazy(() => import('../../pages/mytask/MyTask'));

//** User */
const Users = React.lazy(() => import('../../pages/Security/userManagement/Users'));
const AddEditUser = React.lazy(() => import('../../pages/Security/userManagement/features/AddEditUser'));

//** Permissions */
const Permissions = React.lazy(() => import('../../pages/Security/permissions/Permissions'));
const SecurityRoleManagement = React.lazy(() => import('../../pages/Security/securityManagement/SecurityRoleManagement'));

//** Customer  */
// const CustomerDetail = React.lazy(() => import('../../pages/customerDetail/CustomerDetail'));
const AddCustomer = React.lazy(() => import('../../pages/customerDetail/addCustomer/AddCustomer'));
const CustomerGrid = React.lazy(() => import('../../pages/customerDetail/customerGrid/CustomerGrid'));
const CustomerViewDetails = React.lazy(() => import('../../pages/customerDetail/customerGrid/CustomerViewDetail'));

//** Supplier  */
const AddSupplier = React.lazy(() => import('../../pages/supplierDetails/addSupplier/AddSupplier'));
const SupplierGrid = React.lazy(() => import('../../pages/supplierDetails/supplierGrid/SupplierGrid'));
const SupplierViewDetail = React.lazy(() => import("../../pages/supplierDetails/supplierGrid/SupplierViewDetail"));

const Organization = React.lazy(() => import("../../pages/organization/Organization"));

export const ComponentNavigation = [
  {
    id: "pageNotFound",
    path: "pageNotFound",
    exact: true,
    title: "",
    component: NotFound,
    text: "Page not found",
    securityKey: ""
  },

  {
    id: "",
    path: "/",
    exact: true,
    title: 'Dashboard page',
    component: Dashboard,
    hasParams: false,
    text: 'Dashboard Page',
    securityKey: securityKey.DASHBOARD
  },

  {
    id: 'demoForm',
    path: '/themeComponent/demoForm',
    exact: true,
    title: 'Form Elements',
    component: DemoForm,
    hasParams: false,
    text: 'DemoForm',
    securityKey: ""
  },
  {
    id: 'demoGrid',
    path: '/themeComponent/demoGrid',
    exact: true,
    title: 'Basic Tables',
    component: DemoGrid,
    hasParams: false,
    text: 'DemoGrid',
    securityKey: ""
  },
  {
    id: 'stepper',
    path: '/themeComponent/stepper',
    exact: true,
    title: 'Stepper Wizard',
    component: Stepper,
    hasParams: false,
    text: 'Stepper Wizard',
    securityKey: ""
  },
  {
    id: 'Users',
    path: '/Users',
    exact: true,
    title: 'Users',
    component: Users,
    hasParams: false,
    text: 'Users',
    securityKey: securityKey.USERMANAGEMENT,
    // securityPermissions: [
    //   {
    //     keyName: ActionFlag.Add,
    //     value: securityKey.ADDUSER,
    //     // gridConfig: UserGridConfig,
    //     formConfig: userFormData
    //   },
    //   {
    //     keyName: ActionFlag.Edit,
    //     value: securityKey.EDITUSER,
    //     gridConfig: UserGridConfig,
    //     formConfig: userFormData
    //   },
    //   {
    //     keyName: ActionFlag.Delete,
    //     value: securityKey.DELETEUSER,
    //     gridConfig: UserGridConfig,
    //     formConfig: userFormData
    //   }
    // ]
  },
  {
    id: 'AddEditUser',
    path: '/AddEditUser',
    exact: true,
    title: 'Add User',
    component: AddEditUser,
    hasParams: false,
    text: 'Add User',
    securityKey: securityKey.USERMANAGEMENT
  },
  {
    id: 'EditUser',
    path: '/EditUser/:id',
    exact: true,
    title: 'Edit User',
    component: AddEditUser,
    hasParams: false,
    text: 'Edit User',
    securityKey: securityKey.USERMANAGEMENT,
    // securityPermissions: [
    //   {
    //     keyName: ActionFlag.Add,
    //     value: securityKey.ADDUSER,
    //     // gridConfig: UserGridConfig,
    //     formConfig: userFormData
    //   },
    //   {
    //     keyName: ActionFlag.EditPage,
    //     value: securityKey.EDITUSER,
    //     gridConfig: UserGridConfig,
    //     formConfig: userFormData
    //   }
    // ]
  },
  // {
  //   id: 'roleManagement',
  //   path: '/usersRole',
  //   exact: true,
  //   title: 'Role Management',
  //   component: UsersRole,
  //   hasParams: false,
  //   text: 'RoleManagement',
  //   securityKey:""
  // },
  {
    id: 'widgets',
    path: '/themeComponent/widgets',
    exact: true,
    title: 'Widgets Page',
    component: Widgets,
    hasParams: false,
    text: 'Widgets',
    securityKey: ""
  },
  {
    id: 'SecurityRoleManagement',
    path: '/SecurityRoleManagement',
    exact: true,
    title: 'Roles',
    component: SecurityRoleManagement,
    hasParams: false,
    text: 'Roles',
    securityKey: securityKey.SECURITYROLEMANAGEMENT,
    // securityPermissions: [
    //   {
    //     keyName: ActionFlag.Add,
    //     value: securityKey.ADDSECURITYROLE,
    //     formConfig: addEditRoleFormData
    //   },
    //   {
    //     keyName: ActionFlag.Edit,
    //     value: securityKey.EDITSECURITYROLE,
    //     gridConfig: SecurityRoleGridConfig
    //   },
    //   {
    //     keyName: ActionFlag.Delete,
    //     value: securityKey.DELETESECURITYROLE,
    //     gridConfig: SecurityRoleGridConfig
    //   },
    //   // {
    //   //   keyName: ActionFlag.EditPage,
    //   //   value: securityKey.EDITSECURITYROLE,
    //   //   formConfig: addEditRoleFormData
    //   // }
    // ]
  },
  {
    id: 'addCustomer',
    path: '/addCustomer',
    exact: true,
    title: 'Add Customer',
    component: AddCustomer,
    hasParams: false,
    text: 'Add Customer',
    securityKey: securityKey.CUSTOMER
  },
  {
    id: 'CustomerDetails',
    path: '/CustomerDetails/:id',
    exact: true,
    title: 'View Detail',
    component: CustomerViewDetails,
    hasParams: false,
    text: 'Customer Detail',
    securityKey: securityKey.CUSTOMER
  },
  {
    id: 'Customers',
    path: '/Customers',
    exact: true,
    title: 'Customers',
    component: CustomerGrid,
    hasParams: false,
    text: 'Customers',
    securityKey: securityKey.CUSTOMER
  },
  {
    id: 'EditPermissions',
    path: '/EditPermissions/:id',
    exact: true,
    title: 'Edit Permissions',
    component: Permissions,
    hasParams: false,
    text: 'Edit Permissions',
    securityKey: securityKey.PERMISSIONMANAGEMENT
  },
  {
    id: 'addSupplier',
    path: '/addSupplier',
    exact: true,
    title: 'Add Supplier',
    component: AddSupplier,
    hasParams: false,
    text: 'Add Supplier',
    securityKey: securityKey.SUPPLIER
  },
  {
    id: 'Suppliers',
    path: '/Suppliers',
    exact: true,
    title: 'Suppliers',
    component: SupplierGrid,
    hasParams: false,
    text: 'Suppliers',
    securityKey: securityKey.SUPPLIER
  },
  {
    id: 'SupplierDetails',
    path: '/SupplierDetails/:id',
    exact: true,
    title: 'Supplier Details',
    component: SupplierViewDetail,
    hasParams: false,
    text: 'Supplier Detail',
    securityKey: securityKey.SUPPLIER
  },
  {
    id: 'ApprovalRules',
    path: '/ApprovalRules',
    exact: true,
    title: 'Approval Rules',
    component: ApprovalRules,
    hasParams: false,
    text: 'Approval Rules',
    securityKey: securityKey.APPROVALRULES
  },
  {
    id: 'apiProviders',
    path: '/APIProviders',
    exact: true,
    title: 'API Providers',
    component: ApiProvidersGrid,
    hasParams: false,
    text: 'API Providers',
    securityKey: securityKey.APIPROVIDERS
  },
  {
    id: 'apiEndpoints',
    path: '/APIEndpoints',
    exact: true,
    title: 'API EndPoints',
    component: ApiEndPointsGrid,
    hasParams: false,
    text: 'API EndPoints',
    securityKey: securityKey.APIENDPOINTS
  },
  {
    id: 'apiParameters',
    path: '/APIParameters',
    exact: true,
    title: 'API Parameters',
    component: ApiParametersGrid,
    hasParams: false,
    text: 'API Parameters',
    securityKey: securityKey.APIPARAMETERS
  },
  {
    id: 'apiAuthentication',
    path: '/APIAuthentication',
    exact: true,
    title: 'API Authentication',
    component: ApiAuthenticationGrid,
    hasParams: false,
    text: 'API Authentication',
    securityKey: securityKey.APIAUTHENTICATION
  },
  {
    id: "",
    path: "/MyTask",
    exact: true,
    title: 'Tasks',
    component: MyTask,
    hasParams: false,
    text: 'May Task Page',
    securityKey: securityKey.MYTASK
  },
  {
    id: 'Organization',
    path: '/Organization',
    exact: true,
    title: 'Organization',
    component: Organization,
    hasParams: false,
    text: 'Organization',
    // securityKey: securityKey.MYTASK
  }
];
