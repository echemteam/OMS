import React from "react";
import DemoForm from "../../pages/demoForm/DemoForm";
import DemoGrid from "../../pages/demoGrid/DemoGrid";
import Widgets from "../../pages/widgets/Widgets";
import Stepper from "../../pages/stepper/Stepper";
import Users from "../../pages/Security/userManagement/Users";
import UsersRole from "../../pages/Security/roleManagement/UsersRole";
import CustomerDetail from "../../pages/customerDetail/CustomerDetail";
import AddEditUser from "../../pages/Security/userManagement/features/AddEditUser";
import SecurityRoleManagement from "../../pages/Security/securityManagement/SecurityRoleManagement";
const NotFound = React.lazy(() => import("../../pages/errors/NotFound"));
const Dashboard = React.lazy(() => import('../../pages/dashboard/Dashboard'));
const Permissions = React.lazy(() => import('../../pages/Security/securityManagement/permissions/Permissions'));


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
    id: "dashboard",
    path: "/",
    exact: true,
    title: 'Dashboard page',
    component: Dashboard,
    hasParams: false,
    text: 'Dashboard Page',
    securityKey: ""
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
    securityKey: ""
  },
  {
    id: 'AddUser',
    path: '/AddEditUser',
    exact: true,
    title: 'Add User',
    component: AddEditUser,
    hasParams: false,
    text: 'Add User',
    securityKey: ""
  },
  {
    id: 'EditUser',
    path: '/EditUser/:id',
    exact: true,
    title: 'Edit User',
    component: AddEditUser,
    hasParams: false,
    text: 'Edit User',
    securityKey: ""
  },
  {
    id: 'roleManagement',
    path: '/usersRole',
    exact: true,
    title: 'Role Management',
    component: UsersRole,
    hasParams: false,
    text: 'RoleManagement',
    securityKey: ""
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
    securityKey: ""
  },
  {
    id: 'customerDetail',
    path: '/customerDetail',
    exact: true,
    title: 'Customer Detail',
    component: CustomerDetail,
    hasParams: false,
    text: 'Customer Detail',
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
    securityKey: ""
  },
  {
    id: 'EditPermissions',
    path: '/EditPermissions/:id',
    exact: true,
    title: 'Edit Permissions',
    component: Permissions,
    hasParams: false,
    text: 'Edit Permissions',
    securityKey: ""
  }
];
