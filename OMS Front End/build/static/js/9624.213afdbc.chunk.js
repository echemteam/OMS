"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[9624],{89624:(e,i,a)=>{a.r(i),a.d(i,{default:()=>b});var n=a(27565),t=a(18637),l=a(60497),d=a(65748),c=a(15335);const r={initialState:{beneficiaryName:"",checkingAccountNumber:"",routingAccountNumber:"",swiftCode:"",bankAddress:"",bankBranch:""},formFields:[{id:"beneficiaryName",lable:"Beneficiary Name ",Field_Name:"Beneficiary Name",fieldType:c.Q.INPUT,dataField:"beneficiaryName",fieldSetting:{placeholder:"Enter Beneficiary Name",allowSpace:!0,maxLength:255},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input"}},{id:"checkingAccountNumber",lable:"Checking Account Number ",Field_Name:"Checking Account Number",fieldType:c.Q.INPUT,dataField:"checkingAccountNumber",fieldSetting:{placeholder:"Enter Checking Account Number",allowSpace:!0,maxLength:34},validation:[{type:"require"}],style:{containerCss:"col-md-6 mb-3 mb-input relative"}},{id:"routingAccountNumber",lable:"Routing Account Number ",Field_Name:"Routing Account Number",fieldType:c.Q.INPUT,dataField:"routingAccountNumber",fieldSetting:{placeholder:"Enter Routing Account Number",allowSpace:!0,maxLength:9},validation:[{type:"require"}],style:{containerCss:"col-md-6 mb-3 mb-input relative"}},{id:"swiftCode",lable:"Swift Code ",Field_Name:"Swift Code",fieldType:c.Q.INPUT,dataField:"swiftCode",fieldSetting:{placeholder:"Enter Swift Code",allowSpace:!0,maxLength:11},validation:[{type:"require"}],style:{containerCss:"col-md-6 mb-3 mb-input relative"}},{id:"bankBranch",lable:"Bank Branch",Field_Name:"Bank Branch",fieldType:c.Q.INPUT,dataField:"bankBranch",fieldSetting:{placeholder:"Enter Bank Branch",allowSpace:!0,maxLength:100},validation:[{type:"require"}],style:{containerCss:"col-md-6 mb-3 mb-input relative"}},{id:"bankAddress",lable:"Bank Address ",Field_Name:"Bank Address",fieldType:c.Q.TEXTAREA,dataField:"bankAddress",fieldSetting:{placeholder:"Enter Bank Address",allowSpace:!0,maxLength:35},validation:[{type:"require"}],style:{containerCss:"col-md-6 mb-3 mb-input relative"}}],formSetting:{isViewOnly:!1}};var o=a(6352),s=a(38860),u=a(10723),m=a(27929);const b=e=>{const i=(0,n.useRef)(),[a,c]=(0,n.useState)(r),[b,{isLoading:f,isSuccess:N,data:g}]=(0,o.F1)(),[h,{isFetching:p,isSuccess:k,data:v}]=(0,o.TN)(),[y,A]=(0,n.useState)(0),[S,C]=(0,n.useState)(!1),{formSetting:w}=r,B=(0,u.d4)((e=>e.auth.roles.roleName));(0,n.useEffect)((()=>{e&&(null!==B&&void 0!==B&&B.includes("Admin")?(C(!1),w.isViewOnly=!1):(C(!0),w.isViewOnly=!0))}),[e,B]),(0,n.useEffect)((()=>{N&&g&&(d.A.success(g.errorMessage),h())}),[N,g]),(0,n.useEffect)((()=>{h()}),[]);return(0,n.useEffect)((()=>{if(!p&&k&&v){let e={...a};e.initialState={...v},c(e),A(v.organizationBankDetailId)}}),[p,k,v]),p?(0,m.jsx)("div",{children:(0,m.jsx)(s.A,{})}):(0,m.jsxs)("div",{className:"row mt-2 add-address-form",children:[(0,m.jsx)(t.A,{config:a,ref:i,...a}),e?(0,m.jsx)("div",{className:"col-md-12 mt-2",children:(0,m.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,m.jsx)(l.A,{buttonTypeClassName:"theme-button",buttonText:"Save",onClick:()=>{let e=i.current.getFormData();if(e){const i={...e,organizationBankDetailId:y,beneficiaryName:null===e||void 0===e?void 0:e.beneficiaryName,checkingAccountNumber:null===e||void 0===e?void 0:e.checkingAccountNumber,routingAccountNumber:null===e||void 0===e?void 0:e.routingAccountNumber,swiftCode:null===e||void 0===e?void 0:e.swiftCode,bankAddress:null===e||void 0===e?void 0:e.bankAddress,bankBranch:null===e||void 0===e?void 0:e.bankBranch};b(i)}},isLoading:f,isDisable:S})})}):null]})}}}]);
//# sourceMappingURL=9624.213afdbc.chunk.js.map