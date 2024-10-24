import React from "react";
import DemoForm from "../../pages/demoForm/DemoForm";
import DemoGrid from "../../pages/demoGrid/DemoGrid";
import Widgets from "../../pages/widgets/Widgets";
import Stepper from "../../pages/stepper/Stepper";
import { securityKey } from "../../data/SecurityKey";
import ApprovalRules from "../../pages/configuration/approvalRules/ApprovalRules";
import ApiProviderViewDetail from "../../pages/apiConfiguration/apiProviders/features/apiProviderViewDetail/ApiProviderViewDetail";
import { ThirdPartyApiConfigurationViewDetails } from "../../pages/thirdPartyApi/thirdPartyApiConfigurationGrid/feature/thirdPartyApiConfigurationList/feature/thirdPartyApiConfigurationViewDetails/ThirdPartyApiConfigurationViewDetails";
import EmailTemplate from "../../pages/configuration/emailTemplate/EmailTemplate";
import OrdersGrid from "../../pages/order/orderGrid/OrdersGrid";
import UserManagementViewTab from "../../pages/Security/userManagement/features/UserManagementViewTab";
import Snippet from "../../pages/configuration/snippet/Snippet";

const ApiProviders = React.lazy(() => import("../../pages/apiConfiguration/apiProviders/ApiProviders"));
//** Not Found */
const NotFound = React.lazy(() => import("../../pages/errors/NotFound"));
//** Dashboard */
const Dashboard = React.lazy(() => import('../../pages/dashboard/Dashboard'));

//** Order */
const Order = React.lazy(() => import('../../pages/order/addOrder/AddOrder'));
const OrderList = React.lazy(() => import('../../pages/order/orderGrid/OrderList'));
const OrderDetails = React.lazy(() => import('../../pages/order/orderDetail/OrderDetails'));



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

const ThirdPartyApiConfiguration = React.lazy(() => import("../../pages/thirdPartyApi/thirdPartyApiConfigurationGrid/ThirdPartyApiConfiguration"));
const FunctionalConfiguration = React.lazy(() => import("../../pages/configuration/functionalConfiguration/FunctionalConfiguration"));
const FunctionalConfigurationViewDetail = React.lazy(() => import("../../pages/configuration/functionalConfiguration/features/functionalConfigurationList/functionalConfigurationViewDetail/FunctionalConfigurationViewDetail"));
const Dictionary = React.lazy(() => import("../../pages/configuration/dictionary/Dictionary"));

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
    title: '',
    component: Dashboard,
    hasParams: false,
    text: 'Dashboard Page',
    securityKey: securityKey.DASHBOARD
  },
  {
    id: "addOrder",
    path: "/addOrder",
    exact: true,
    title: '',
    component: Order,
    hasParams: false,
    text: 'Add Order',
    securityKey: securityKey.ADDORDER
  },
  {
    id: "orderList",
    path: "/Orders",
    exact: true,
    title: '',
    component: OrderList,
    hasParams: false,
    text: 'Orders',
    securityKey: securityKey.ADDORDER
  },
  {
    id: "orderDetails",
    path: "/orderDetails/:id",
    exact: true,
    title: '',
    component: OrderDetails,
    hasParams: true,
    text: 'OrderDetails',
    securityKey: securityKey.ADDORDER
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
    title: '',
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
    component: UserManagementViewTab,
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
    title: '',
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
    title: '',
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
    title: '',
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
    title: '',
    component: AddSupplier,
    hasParams: false,
    text: 'Add Supplier',
    securityKey: securityKey.SUPPLIER
  },
  {
    id: 'Suppliers',
    path: '/Suppliers',
    exact: true,
    title: '',
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

  //**************** Configuration Menu Start ****************/
  {
    id: 'ApprovalRules',
    path: '/configuration/ApprovalRules',
    exact: true,
    title: '',
    component: ApprovalRules,
    hasParams: false,
    text: 'Approval Rules',
    securityKey: securityKey.APPROVALRULES
  },
  {
    id: 'FunctionalConfiguration',
    path: '/configuration/FunctionalConfiguration',
    exact: true,
    // title: 'Functional Configuration',
    title: '',
    component: FunctionalConfiguration,
    hasParams: false,
    text: 'Approval Rules',
    securityKey: securityKey.APPROVALRULES
  },
  {
    id: 'FunctionalConfigurationViewDetail',
    path: '/configuration/FunctionalConfigurationViewDetail/:id/:data',
    exact: true,
    title: 'Functional Configuration View Details',
    component: FunctionalConfigurationViewDetail,
    hasParams: false,
    text: 'Functional Configuration View',
    securityKey: securityKey.APPROVALRULES
  },
  {
    id: 'apiProviders',
    path: '/configuration/APIProviders',
    exact: true,
    // title: 'API Providers',
    title: '',
    component: ApiProviders,
    hasParams: false,
    text: 'API Providers',
    securityKey: securityKey.APIPROVIDERS
  },
  {
    id: 'apiProviderDetails',
    path: '/configuration/APIProviderDetail/:id',
    exact: true,
    title: 'API Provider Detail',
    component: ApiProviderViewDetail,
    hasParams: false,
    text: 'API Providers Detail',
    securityKey: securityKey.APIPROVIDERS
  },
  {
    id: 'ThirdPartyApiConfigurationViewDetails',
    path: '/configuration/ThirdPartyApiConfigurationViewDetails/:id',
    exact: true,
    title: 'Third Party Api View Details',
    component: ThirdPartyApiConfigurationViewDetails,
    hasParams: false,
    text: 'ThirdPartyApiConfigurationViewDetails',
    securityKey: securityKey.THIRDPARTYAPI
  },
  {
    id: 'ThirdPartyApiConfiguration',
    path: '/configuration/ThirdPartyApiConfiguration',
    exact: true,
    title: '',
    component: ThirdPartyApiConfiguration,
    hasParams: false,
    text: 'ThirdPartyApiConfiguration',
    securityKey: securityKey.THIRDPARTYAPI
  },
  {
    id: 'emailTemplate',
    path: '/configuration/EmailTemplate',
    exact: true,
    title: '',
    component: EmailTemplate,
    hasParams: false,
    text: 'EmailTemplate',
    securityKey: securityKey.DICTIONARY
  },
  {
    id: 'Snippet',
    path: '/configuration/Snippet',
    exact: true,
    title: '',
    component: Snippet,
    hasParams: false,
    text: 'Snippet',
   // securityKey: securityKey.DICTIONARY
  },
  {
    id: 'dictionary',
    path: '/configuration/Dictionary',
    exact: true,
    title: '',
    component: Dictionary,
    hasParams: false,
    text: 'Dictionary',
    securityKey: securityKey.DICTIONARY
  },
  //**************** Configuration Menu End ****************/
  {
    id: "MyTask",
    path: "/MyTask",
    exact: true,
    title: '',
    component: MyTask,
    hasParams: false,
    text: 'My Task Page',
    securityKey: securityKey.MYTASK
  },
  {
    id: 'Organization',
    path: '/Organization',
    exact: true,
    title: '',
    component: Organization,
    hasParams: false,
    text: 'Organization',
    securityKey: securityKey.ORGANIZATION
  },
  {
    id: 'OrderList',
    path: '/OrderList',
    exact: true,
    title: '',
    component: OrderList,
    hasParams: false,
    text: 'OrderList',
    // securityKey: securityKey.SUPPLIER
  },
  {
    id: 'definedOrders',
    path: '/definedOrders',
    exact: true,
    title: '',
    component: OrdersGrid,
    hasParams: false,
    text: 'DefinedOrder',
    // securityKey: securityKey.SUPPLIER
  },

];
