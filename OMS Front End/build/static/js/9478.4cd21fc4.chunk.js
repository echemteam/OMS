"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[9478],{59478:(e,i,t)=>{t.r(i),t.d(i,{default:()=>v});var l=t(27565),a=t(17295),n=t(18637),d=t(60497),o=t(65748),s=t(15335);const r={initialState:{domesticOvernight:"",domesticSecondDay:"",domesticGround:"",internationalPriority:"",internationalEconomy:""},formFields:[{id:"domesticOvernight",lable:"Domestic Overnight ",Field_Name:"Domestic Overnight",fieldType:s.Q.NUMERIC,dataField:"domesticOvernight",fieldSetting:{placeholder:"Enter Domestic Overnight",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"domesticSecondDay",lable:"Domestic SecondDay ",Field_Name:"Domestic SecondDay",fieldType:s.Q.NUMERIC,dataField:"domesticSecondDay",fieldSetting:{placeholder:"Enter Domestic SecondDay",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"domesticGround",lable:"Domestic Ground ",Field_Name:"Domestic Ground",fieldType:s.Q.NUMERIC,dataField:"domesticGround",fieldSetting:{placeholder:"Enter Domestic Ground",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"internationalPriority",lable:"International Priority ",Field_Name:"International Priority",fieldType:s.Q.NUMERIC,dataField:"internationalPriority",fieldSetting:{placeholder:"Enter International Priority",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"internationalEconomy",lable:"International Economy ",Field_Name:"International Economy",fieldType:s.Q.NUMERIC,dataField:"internationalEconomy",fieldSetting:{placeholder:"Enter International Economy",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}}],formSetting:{isViewOnly:!1}};var c=t(6352),m=t(38860),u=t(10723),f=t(27929);const g=e=>{const i=(0,l.useRef)(),[t,a]=(0,l.useState)(r),[s,{isLoading:g,isSuccess:x,data:y}]=(0,c.st)(),[F,{isFetching:h,isSuccess:p,data:S}]=(0,c.cZ)(),[v,C]=(0,l.useState)(0),[E,b]=(0,l.useState)(!1),{formSetting:N}=r,T=(0,u.d4)((e=>e.auth.roles.roleName));(0,l.useEffect)((()=>{e&&(null!==T&&void 0!==T&&T.includes("Admin")?(b(!1),N.isViewOnly=!1):(b(!0),N.isViewOnly=!0))}),[e,T]),(0,l.useEffect)((()=>{x&&y&&(o.A.success(y.errorMessage),F())}),[x,y]),(0,l.useEffect)((()=>{F()}),[F]);return(0,l.useEffect)((()=>{if(!h&&p&&S){let e={...t};e.initialState={...S},a(e),C(S.organizationShippingChargeId)}}),[h,p,S]),h?(0,f.jsx)("div",{children:(0,f.jsx)(m.A,{})}):(0,f.jsxs)("div",{className:"row mt-2 add-address-form",children:[(0,f.jsx)(n.A,{config:t,ref:i,...t}),e?(0,f.jsx)("div",{className:"col-md-12 mt-2",children:(0,f.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,f.jsx)(d.A,{buttonTypeClassName:"theme-button",buttonText:"Save",onClick:()=>{let e=i.current.getFormData();if(e){const i={...e,organizationShippingChargeId:v,domesticOvernight:null===e||void 0===e?void 0:e.domesticOvernight,domesticSecondDay:null===e||void 0===e?void 0:e.domesticSecondDay,domesticGround:null===e||void 0===e?void 0:e.domesticGround,internationalPriority:null===e||void 0===e?void 0:e.internationalPriority,internationalEconomy:null===e||void 0===e?void 0:e.internationalEconomy};s(i)}},isLoading:g,isDisable:E})})}):null]})},x={initialState:{handlingFees:"",bankWireFees:"",creditCardServiceFees:"",coldBoxFees:"",iTNFees:"",paymentTermId:""},formFields:[{id:"handlingFees",lable:"Handling Fees ",Field_Name:"Handling Fees",fieldType:s.Q.NUMERIC,dataField:"handlingFees",fieldSetting:{placeholder:"Enter Handling Fees",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"bankWireFees",lable:"Bank Wire Fees ",Field_Name:"Bank Wire Fees",fieldType:s.Q.NUMERIC,dataField:"bankWireFees",fieldSetting:{placeholder:"Enter Bank Wire Fees",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"creditCardServiceFees",lable:"Credit Card Service Fees ",Field_Name:"Credit Card Service Fees",fieldType:s.Q.NUMERIC,dataField:"creditCardServiceFees",fieldSetting:{placeholder:"Enter Credit Card Service Fees",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"coldBoxFees",lable:"Cold Box Fees ",Field_Name:"Cold Box Fees",fieldType:s.Q.NUMERIC,dataField:"coldBoxFees",fieldSetting:{placeholder:"Enter Cold Box Fees",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"iTNFees",lable:"ITN Fees ",Field_Name:"ITN Fees",fieldType:s.Q.NUMERIC,dataField:"iTNFees",fieldSetting:{placeholder:"Enter ITN Fees",allowSpace:!0,maxLength:4},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"paymentTermId",lable:"Default Payment Terms ",Field_Name:"Default Payment Terms",fieldType:s.Q.SELECT,dataField:"paymentTermId",fieldSetting:{placeholder:"Select Default Payment Terms",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}}],formSetting:{isViewOnly:!1}};var y=t(45050),F=t(58412);const h=e=>{const i=(0,l.useRef)(),[t,a]=(0,l.useState)(x),[s,{isFetching:r,isSuccess:g,data:h}]=(0,y.qC)(),[p,{isLoading:S,isSuccess:v,data:C}]=(0,c.Ww)(),[E,{isFetching:b,isSuccess:N,data:T}]=(0,c.if)(),[I,j]=(0,l.useState)(!1),[D,w]=(0,l.useState)(0),[L,O]=(0,l.useState)(!1),{formSetting:k}=x,A=(0,u.d4)((e=>e.auth.roles.roleName));(0,l.useEffect)((()=>{e&&(null!==A&&void 0!==A&&A.includes("Admin")?(O(!1),k.isViewOnly=!1):(O(!0),k.isViewOnly=!0))}),[e,A]),(0,l.useEffect)((()=>{s(),E()}),[]),(0,l.useEffect)((()=>{v&&C&&(o.A.success(C.errorMessage),E())}),[v,C]),(0,l.useEffect)((()=>{!r&&g&&h&&((0,F.Xh)(h,"paymentTermId","paymentTerm",x,"paymentTermId"),j((e=>!e)))}),[r,g,h]);return(0,l.useEffect)((()=>{if(!b&&N&&T){let e={...t};e.initialState={organizationOtherChargeId:T.organizationOtherChargeId,paymentTermId:T.defaultPaymentTerms,handlingFees:T.handlingFees,bankWireFees:T.bankWireFees,creditCardServiceFees:T.creditCardServiceFees,coldBoxFees:T.coldBoxFees,iTNFees:T.itnFees},a(e),w(T.organizationOtherChargeId)}}),[b,N,T]),b?(0,f.jsx)("div",{children:(0,f.jsx)(m.A,{})}):(0,f.jsxs)("div",{className:"row mt-2 add-address-form",children:[(0,l.createElement)(n.A,{config:t,ref:i,...t,key:I}),e?(0,f.jsx)("div",{className:"col-md-12 mt-2",children:(0,f.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,f.jsx)(d.A,{buttonTypeClassName:"theme-button",buttonText:"Save",onClick:()=>{let e=i.current.getFormData();if(e){const i={...e,organizationOtherChargeId:D,defaultPaymentTerms:null===e||void 0===e?void 0:e.paymentTermId.value,handlingFees:null===e||void 0===e?void 0:e.handlingFees,bankWireFees:null===e||void 0===e?void 0:e.bankWireFees,creditCardServiceFees:null===e||void 0===e?void 0:e.creditCardServiceFees,coldBoxFees:null===e||void 0===e?void 0:e.coldBoxFees,iTNFees:null===e||void 0===e?void 0:e.iTNFees};p(i)}},isLoading:S,isDisable:L})})}):null]})},p={initialState:{creditLimit:""},formFields:[{id:"creditLimit",lable:"Credit Limit ",Field_Name:"Credit Limit",fieldType:s.Q.NUMERIC,dataField:"creditLimit",fieldSetting:{placeholder:"Enter Credit Limit",allowSpace:!0,maxLength:5},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input"}}],formSetting:{isViewOnly:!1}},S=e=>{const i=(0,l.useRef)(),[t,a]=(0,l.useState)(p),[s,{isLoading:r,isSuccess:g,data:x}]=(0,c.G1)(),[y,{isFetching:F,isSuccess:h,data:S}]=(0,c.eH)(),[v,C]=(0,l.useState)(0),[E,b]=(0,l.useState)(!1),{formSetting:N}=p,T=(0,u.d4)((e=>e.auth.roles.roleName));(0,l.useEffect)((()=>{e&&(null!==T&&void 0!==T&&T.includes("Admin")?(b(!1),N.isViewOnly=!1):(b(!0),N.isViewOnly=!0))}),[e,T]),(0,l.useEffect)((()=>{g&&x&&(o.A.success(x.errorMessage),y())}),[g,x]),(0,l.useEffect)((()=>{y()}),[y]);return(0,l.useEffect)((()=>{if(!F&&h&&S){let e={...t};e.initialState={...S},a(e),C(S.organizationAccountingDetailId)}}),[F,h,S]),F?(0,f.jsx)("div",{children:(0,f.jsx)(m.A,{})}):(0,f.jsxs)("div",{className:"row mt-2 add-address-form",children:[(0,f.jsx)(n.A,{config:t,ref:i,...t}),e?(0,f.jsx)("div",{className:"col-md-12 mt-2",children:(0,f.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,f.jsx)(d.A,{buttonTypeClassName:"theme-button",buttonText:"Save",onClick:()=>{let e=i.current.getFormData();if(e){const i={...e,organizationAccountingDetailId:v,creditLimit:null===e||void 0===e?void 0:e.creditLimit};s(i)}},isLoading:r,isDisable:E})})}):null]})};const v=function(){return(0,f.jsxs)("div",{children:[(0,f.jsx)(a.default,{cardTitle:"Accounting",children:(0,f.jsx)(S,{isEditablePage:!0})}),(0,f.jsx)(a.default,{cardTitle:"Shipping",children:(0,f.jsx)(g,{isEditablePage:!0})}),(0,f.jsx)(a.default,{cardTitle:"Other",children:(0,f.jsx)(h,{isEditablePage:!0})})]})}}}]);
//# sourceMappingURL=9478.4cd21fc4.chunk.js.map