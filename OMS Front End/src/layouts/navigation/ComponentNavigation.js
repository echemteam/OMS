import React from "react";
import DemoForm from "../../pages/demoForm/DemoForm";
import DemoGrid from "../../pages/demoGrid/DemoGrid";
import Widgets from "../../pages/widgets/Widgets";
import Stepper from "../../pages/stepper/Stepper";
import { securityKey } from "../../data/SecurityKey";
import Customers from "../../pages/customerDetail/customers/Customers";

//** Not Found */
const NotFound = React.lazy(() => import("../../pages/errors/NotFound"));
//** Dashboard */
const Dashboard = React.lazy(() => import('../../pages/dashboard/Dashboard'));
//** User */
const Users = React.lazy(() => import('../../pages/Security/userManagement/Users'));
const AddEditUser = React.lazy(() => import('../../pages/Security/userManagement/features/AddEditUser'));
const UsersRole = React.lazy(() => import('../../pages/Security/roleManagement/UsersRole'));

//** Permissions */
const Permissions = React.lazy(() => import('../../pages/Security/permissions/Permissions'));
const SecurityRoleManagement = React.lazy(() => import('../../pages/Security/securityManagement/SecurityRoleManagement'));

//**Customer  */
// const CustomerDetail = React.lazy(() => import('../../pages/customerDetail/CustomerDetail'));
const ManageAddCustomer = React.lazy(() => import('../../pages/customerDetail/ManageAddCustomer'));
const ViewCustomer = React.lazy(() => import('../../pages/customerDetail/ManageViewCustomer'));
const AddEditContact = React.lazy(() => import('../../pages/customerDetail/features/contactDetail/AddEditContact'));


export const ComponentNavigation = [
  {
    id: "pageNotFound",
    path: "pageNotFound",
    exact: true,
    title: "",
    component: NotFound,
    text: "Page not found",
    securityKey: "",
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
  {
    id: 'roleManagement',
    path: '/usersRole',
    exact: true,
    title: 'Role Management',
    component: UsersRole,
    hasParams: false,
    text: 'RoleManagement',
    securityKey: securityKey.ROLEMANAGEMENT
  },
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
    component: ManageAddCustomer,
    hasParams: false,
    text: 'Add Customer',
    securityKey: ""
  },
  {
    id: 'viewCustomer',
    path: '/viewCustomer/:id',
    exact: true,
    title: 'View Detail',
    component: ViewCustomer,
    hasParams: false,
    text: 'Customer Detail',
    securityKey: ""
  },
  {
    id: 'Customers',
    path: '/Customers',
    exact: true,
    title: 'Customers',
    component: Customers,
    hasParams: false,
    text: 'Customers',
    securityKey: ""
  },
  
  {
    id: 'addEditContact',
    path: '/addEditContact',
    exact: true,
    title: '',
    component: AddEditContact,
    hasParams: false,
    text: '',
    securityKey: ""
  },
  {
    id: 'permissions',
    path: '/permissions',
    exact: true,
    title: 'Permissions',
    component: Permissions,
    hasParams: false,
    text: 'Permissions',
    securityKey: securityKey.PERMISSIONMANAGEMENT
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
  }
];
