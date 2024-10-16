"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[8053,9263],{37549:(e,t,i)=>{i.d(t,{A:()=>s});var n=i(15335);const s={name:"Email From",initialState:{firstName:"",lastName:"",contactTypeId:"",isPrimary:!1},formFields:[{id:"firstName",lable:"First Name ",Field_Name:"First Name",fieldType:n.Q.INPUT,dataField:"firstName",fieldSetting:{placeholder:"Enter First Name",allowSpace:!0,maxLength:50},validation:[{type:"require"},{type:"onlyText"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input"}},{id:"lastName",lable:"Last Name ",Field_Name:"Last Name",fieldType:n.Q.INPUT,dataField:"lastName",fieldSetting:{placeholder:"Enter Last Name",allowSpace:!0,maxLength:50},validation:[{type:"require"},{type:"onlyText"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input"}},{id:"contactTypeId",lable:"Contact Type ",Field_Name:"Contact Type",fieldType:n.Q.SELECT,dataField:"contactTypeId",fieldSetting:{placeholder:"Select Contact Type",isMultiSelect:!0,isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-8 col-xl-8 col-md-12 col-12 col-12 mb-input"}},{id:"isPrimary",lable:"Is Primary",Field_Name:"Is Primary",fieldType:n.Q.CHECKBOX,dataField:"isPrimary",fieldSetting:{placeholder:"",allowSpace:!0},style:{containerCss:"col-xxl-4 col-xl-4 col-md-12 col-12 col-12 mb-input mt-3 margin-left0-checkbox margin-top-checkbox"}}],formSetting:{isViewOnly:!1}}},99263:(e,t,i)=>{i.r(t),i.d(t,{default:()=>S});var n=i(27565),s=i(60497),a=i(28734),o=i(18637),l=i(37549),d=i(38860),c=i(3737),r=i(58412),u=i(15269),m=i(65748),p=i(17690),I=i(27929);const f=n.lazy((()=>i.e(1435).then(i.bind(i,51435)))),y=n.lazy((()=>i.e(9024).then(i.bind(i,59024)))),S=(0,n.forwardRef)((e=>{let{keyId:t,isUpdateContactModel:i,addEditContactMutation:S,onSidebarClose:h,onSuccess:b,childRef:v,editRef:E,SecurityKey:g,customerStatusId:C,allGetAllContactTypesData:x,isGetAllContactTypesSucess:T,isEditablePage:N,isSupplier:F,isEdit:A,isOpen:P,getContactById:D,getContectTypeId:U,customerId:L,isOrderManage:B,onhandleApiCall:O,contryIdCode:V,orderResetValue:j,getCompletionCount:G}=e;const w=(0,n.useRef)(),{formSetting:R}=l.A,[M,H]=(0,n.useState)(0),[q,_]=(0,n.useState)(!1),[Q,k]=(0,n.useState)(0),[K,X]=(0,n.useState)(0),[z,Y]=(0,n.useState)(!1),[Z,W]=(0,n.useState)([]),[,J]=(0,n.useState)(!1),[$,ee]=(0,n.useState)([]),[te,ie]=(0,n.useState)(l.A),[ne,{isFetching:se,isSuccess:ae,data:oe}]=D(),[le,{isLoading:de,isSuccess:ce,data:re}]=S();(0,n.useEffect)((()=>{if(i&&T){const e=e=>F?e.isForSuppliers:e.isForCustomers;(0,r.Xh)(x,"contactTypeId","type",te,"contactTypeId",e),J((e=>!e))}}),[T,i]);const ue=()=>{const e=w.current.getFormData();if(e)if($.length>0){const i=(0,c.H)(e.contactTypeId,A),n=me(e,i,F,t,$,Z,K,Q);let s={...n,customerId:L||n.customerId};le(s)}else m.A.warning(p.K.ContactEmailAddressRequired)},me=(e,t,i,n,s,a,o,l)=>({...e,contactId:M,contactTypeId:String(t),[i?"supplierId":"customerId"]:n,emailAddressList:s.length>0?(0,c.Vz)(s):null,phoneNumberList:a.length>0?(0,c.Ix)(a):null,[i?"supplierContactId":"customerContactId"]:i?o:l});(0,n.useEffect)((()=>{if(ce&&re){if(re.errorMessage.includes("EXISTS"))return void m.A.warning(re.errorMessage);b&&(b(),m.A.success(re.errorMessage),H(null===re||void 0===re?void 0:re.keyValue),B&&O(U)),G&&G()}}),[ce,re]),(0,n.useEffect)((()=>{if(!se&&ae&&oe){let e=oe,t={...l.A};t.initialState={firstName:e.firstName,lastName:e.lastName,contactTypeId:e.contactTypeId,isPrimary:e.isPrimary},ie(t),H(e.contactId),F?X(null===e||void 0===e?void 0:e.supplierContactId):k(null===e||void 0===e?void 0:e.customerContactId),(0,r.t5)(t,"contactTypeId",a.fV.MULTISELECT);const i=[...oe.phoneNumberList].sort(((e,t)=>e.phoneId-t.phoneId)).map(((e,t)=>({...e,id:t+1,extension:0===e.extension?"-":e.extension}))),n=[...oe.emailAddressList].sort(((e,t)=>t.emailId-e.emailId)).map(((e,t)=>({...e,id:t+1})));W(i),ee(n)}}),[se,ae]),(0,n.useImperativeHandle)(E,(()=>({callEditFunction:pe}))),(0,n.useEffect)((()=>{if(N&&g){const e=(0,u.T)(g.EDIT),t=(0,u.T)(g.ADD);e&&R&&(q?!0===e.isViewOnly?(R.isViewOnly=!0,Y(!0)):(R.isViewOnly=!1,Y(!1)):q||!0===t.hasAccess&&(R.isViewOnly=!1,Y(!1)))}}),[q,E,g]);const pe=e=>{_(!0),e&&ne(e)};(0,n.useEffect)((()=>{if(!A&&!B){F?(0,r.t5)(l.A,"contactTypeId",a.fV.MULTISELECT,!1):(0,r.t5)(l.A,"contactTypeId",a.fV.MULTISELECT,!0);let e={...l.A};ie(e),P&&(H(0),_(!1),W([]),ee([]))}if(B){(0,r.t5)(l.A,"contactTypeId",a.fV.DISABLED,!0),(0,r.t5)(l.A,"contactTypeId",a.fV.MULTISELECT,!1);let e={...l.A};e.initialState={...e.initialState,contactTypeId:U},ie(e)}}),[P]);const Ie=()=>{(0,r.t5)(l.A,"contactTypeId",a.fV.DISABLED,!1);let e={...l.A};e.initialState={...l.A.initialState},ie(e),k(0),X(0)};return(0,n.useImperativeHandle)(v,(()=>({callChildFunction:Ie}))),(0,n.useEffect)((()=>{j&&B&&(W([]),ee([]))}),[j]),(0,I.jsxs)("div",{children:[se?(0,I.jsx)(d.A,{}):(0,I.jsxs)(n.Fragment,{children:[(0,I.jsx)("div",{className:"row mt-2 addEditContact-form",children:(0,I.jsx)(o.A,{config:te,ref:w,...te})}),(0,I.jsxs)("div",{className:"row",children:[(0,I.jsx)(f,{isButtonDisable:z,emailAddressList:$,setEmailAddressList:ee,contactId:M,isOrderManage:B}),(0,I.jsx)(y,{isButtonDisable:z,phoneNumberList:Z,setPhoneNumberList:W,contactId:M,contryIdCode:V,isOrderManage:B})]})]}),(0,I.jsx)("div",{className:"col-md-12 mt-3",children:(0,I.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,I.jsxs)("div",{className:"d-flex align-item-end",children:[(0,I.jsx)(s.A,{buttonTypeClassName:"theme-button",buttonText:"Save",isLoading:de,onClick:async()=>{ue()},isDisable:z}),(0,I.jsx)(s.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:h})]})})})]})}))},91868:(e,t,i)=>{i.d(t,{qz:()=>o,r:()=>l});var n=i(69885),s=i(15335),a=i(79663);const o={name:"Document Form",initialState:{name:"",documentTypeId:"",supplierId:"",customerId:"",attachment:"",base64File:"",storagePath:""},formFields:[{id:"documentTypeId",lable:"Document Type ",Field_Name:"Document Type",fieldType:s.Q.SELECT,fieldType:s.Q.EDITABLEDROPDOWN,dataField:"documentTypeId",fieldSetting:{placeholder:"Select Document Type",isEnableOnChange:!0,options:[]},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"name",lable:"Document Name ",Field_Name:"Document Name",fieldType:s.Q.INPUT,dataField:"name",fieldSetting:{placeholder:"Enter Document Name",allowSpace:!0,maxLength:50,isDisable:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"attachment",lable:"Attachment ",Field_Name:"Attachment",fieldType:s.Q.FILE,dataField:"attachment",fieldSetting:{placeholder:"Upload Attachment",allowSpace:!0,isButtonVisible:!1,isCustomButtonVisible:!0,acceptedFiles:".pdf , .docx "},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section"}}]},l=(a.f.ACTION,[{type:"pdf",icon:n.m.PdfIcon},{type:"doc",icon:n.m.DocIcon},{type:"docx",icon:n.m.DocIcon},{type:"xlsx",icon:n.m.XlsIcon},{type:"xls",icon:n.m.XlsIcon},{type:"ppt",icon:n.m.PptIcon},{type:"zip",icon:n.m.ZipIcon},{type:"csv",icon:n.m.CsvIcon}])},88053:(e,t,i)=>{i.r(t),i.d(t,{default:()=>S});var n=i(27565),s=i(69885),a=i(15335),o=i(28734);const l={initialState:{endUserId:null,isEndUser:!0,isPurchasingGiven:!0,refNumber:"",isInvoiceSubmission:!0,invoiceSubmissionId:null,purchasingId:null},formFields:[{id:"isEndUser",lable:"Is End User given on Purchase order",Field_Name:"Is End User",fieldType:a.Q.CHECKBOX,dataField:"isEndUser",fieldSetting:{placeholder:"",isEnableOnChange:!0},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 col-12"}},{id:"isInvoiceSubmission",lable:"Is Invoice Submission given on Purchase order",Field_Name:"Exempt Sales Tax",fieldType:a.Q.CHECKBOX,dataField:"isInvoiceSubmission",fieldSetting:{placeholder:"",isEnableOnChange:!0},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 col-12"}},{id:"isPurchasingGiven",lable:"Is Purchasing given on Purchase order",Field_Name:"Is Purchasing Given",fieldType:a.Q.CHECKBOX,dataField:"isPurchasingGiven",fieldSetting:{placeholder:"",isEnableOnChange:!0},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 col-12"}},{id:"endUserId",lable:"End User ",Field_Name:"End User",fieldType:a.Q.SELECT,dataField:"endUserId",fieldSetting:{placeholder:"Enter End User",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0,validation:[{type:"require"}],isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-6 mb-input"},inputButtonGroup:{isInputButton:!0,buttonText:"Add",icon:s.m.PlusIcon,GetByID:o.Pm.ENDUSER}},{id:"invoiceSubmissionId",lable:"Invoice Submission ",Field_Name:"Invoice Submission",fieldType:a.Q.SELECT,dataField:"invoiceSubmissionId",fieldSetting:{placeholder:"Enter Invoice Submission",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0,validation:[{type:"require"}],isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-6 mb-input"},inputButtonGroup:{isInputButton:!0,buttonText:"Add",icon:s.m.PlusIcon,GetByID:o.Pm.INVOICESUBMISSION}},{id:"purchasingId",lable:"Purchasing ",Field_Name:"Purchasing",fieldType:a.Q.SELECT,dataField:"purchasingId",fieldSetting:{placeholder:"Enter Purchasing",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0,validation:[{type:"require"}],isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-6 mb-input"},inputButtonGroup:{isInputButton:!0,buttonText:"Add",icon:s.m.PlusIcon,GetByID:o.Pm.PURCHASING}},{id:"refNumber",lable:"Reference Number",Field_Name:"Reference Number",fieldType:a.Q.INPUT,dataField:"refNumber",fieldSetting:{placeholder:"Enter Reference Number",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0,validation:[{type:"require"}],isEnableOnChange:!0},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-6 mb-input"}}]};var d=i(18637),c=i(5022),r=i(58412),u=i(79742),m=i(99263),p=i(52085),I=i(37549),f=i(48357),y=i(27929);const S=e=>{const t=(0,n.useRef)(),[i,a]=(0,n.useState)(l),[S,h]=(0,n.useState)(!1),[b,v]=(0,n.useState)(null),[E,g]=(0,n.useState)(!0),[C,x]=(0,n.useState)(!0),[T,N]=(0,n.useState)(!0),[F,A]=(0,n.useState)(!1),{conatctRef:P,orderCustomerId:D,moveNextPage:U,orderId:L}=(0,n.useContext)(f.A),[B,{isSuccess:O,data:V}]=(0,p.sD)(),[j,{isFetching:G,isSuccess:w,data:R}]=(0,c.KT)(),[M,{isFetching:H,isSuccess:q,data:_}]=(0,c.KT)(),[Q,{isFetching:k,isSuccess:K,data:X}]=(0,c.KT)();(0,n.useEffect)((()=>{if(D){let e={customerId:D,contactTypeId:o.Pm.ENDUSER};j(e)}}),[D]),(0,n.useEffect)((()=>{if(D){let e={customerId:D,contactTypeId:o.Pm.INVOICESUBMISSION};M(e)}}),[D]),(0,n.useEffect)((()=>{if(D){let e={customerId:D,contactTypeId:o.Pm.PURCHASING};Q(e)}}),[D]),(0,n.useEffect)((()=>{if(!G&&w&&R){const e=R.map((e=>({value:e.contactId,label:e.fullName})));a((t=>{var i;const n={...t},s=null===(i=n.formFields)||void 0===i?void 0:i.find((e=>"endUserId"===e.dataField));return s&&(s.fieldSetting.options=e),n}))}}),[G,w,R]),(0,n.useEffect)((()=>{if(!H&&q&&_){const e=_.map((e=>({value:e.contactId,label:e.fullName})));a((t=>{var i;const n={...t},s=null===(i=n.formFields)||void 0===i?void 0:i.find((e=>"invoiceSubmissionId"===e.dataField));return s&&(s.fieldSetting.options=e),n}))}}),[H,q,_]),(0,n.useEffect)((()=>{if(!k&&K&&X){const e=X.map((e=>({value:e.contactId,label:e.fullName})));a((t=>{var i;const n={...t},s=null===(i=n.formFields)||void 0===i?void 0:i.find((e=>"purchasingId"===e.dataField));return s&&(s.fieldSetting.options=e),n}))}}),[k,K,X]);(0,n.useEffect)((()=>{B(),g(!0),x(!0),N(!0),(0,r.t5)(i,"endUserId",o.fV.DISABLED,!1),(0,r.t5)(i,"invoiceSubmissionId",o.fV.DISABLED,!1),(0,r.t5)(i,"purchasingId",o.fV.DISABLED,!1)}),[]),(0,n.useEffect)((()=>{if(O&&V){const e=e=>e.isForCustomers;(0,r.Xh)(V,"contactTypeId","type",I.A,"contactTypeId",e)}}),[O,V]);const z=()=>{h(!1),A(!1)},Y=(e,t,i)=>e.map((e=>{if(e.id===t){if(i){const{validation:t,...i}=e;return i}return{...e,validation:[{type:"require"}]}}return e})),Z={CHECK_CHANGE:(e,n)=>{let s={...i};switch(n){case"isEndUser":e?(s.formFields=Y(s.formFields,"endUserId",!1),(0,r.t5)(s,"endUserId",o.fV.DISABLED,!1),g(!0)):(s.formFields=Y(s.formFields,"endUserId",!0),(0,r.t5)(s,"endUserId",o.fV.DISABLED,!0),t.current.updateFormFieldValue({endUserId:null,isEndUser:!1}),g(!1));break;case"isInvoiceSubmission":e?(s.formFields=Y(s.formFields,"invoiceSubmissionId",!1),(0,r.t5)(s,"invoiceSubmissionId",o.fV.DISABLED,!1),x(!0)):(s.formFields=Y(s.formFields,"invoiceSubmissionId",!0),s.formFields=s.formFields.map((e=>{if("invoiceSubmissionId"===e.id){const{validation:t,...i}=e;return i}return e})),(0,r.t5)(s,"invoiceSubmissionId",o.fV.DISABLED,!0),t.current.updateFormFieldValue({invoiceSubmissionId:null,isInvoiceSubmission:!1}),x(!1));break;case"isPurchasingGiven":e?(s.formFields=Y(s.formFields,"purchasingId",!1),(0,r.t5)(s,"purchasingId",o.fV.DISABLED,!1),N(!0)):(s.formFields=Y(s.formFields,"purchasingId",!0),(0,r.t5)(s,"purchasingId",o.fV.DISABLED,!0),t.current.updateFormFieldValue({purchasingId:null,isPurchasingGiven:!1}),N(!1))}a(s)}};(0,n.useImperativeHandle)(P,(()=>({handleAddOrderConatct:W})));const W=()=>{let i=t.current.getFormData();if(i){let t=[];i.isEndUser&&i.endUserId&&t.push({contactId:"object"===typeof i.endUserId?i.endUserId.value:i.endUserId,contactTypeId:o.Pm.ENDUSER}),i.isInvoiceSubmission&&i.invoiceSubmissionId&&t.push({contactId:"object"===typeof i.invoiceSubmissionId?i.invoiceSubmissionId.value:i.invoiceSubmissionId,contactTypeId:o.Pm.INVOICESUBMISSION}),i.isPurchasingGiven&&i.purchasingId&&t.push({contactId:"object"===typeof i.purchasingId?i.purchasingId.value:i.purchasingId,contactTypeId:o.Pm.PURCHASING});let n={orderId:L||0,orderContactsList:t,referenceNumber:i.refNumber,isEndUser:i.isEndUser,isInvoiceSubmission:i.isInvoiceSubmission,isPurchasing:i.isPurchasingGiven};e.onHandleOrderContact(n),U()}};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{className:"row",children:(0,y.jsx)(d.A,{config:i,ref:t,...i,handleInputGroupButton:e=>{e>0&&(v(e),E&&o.Pm.ENDUSER===e&&h(!S),C&&o.Pm.INVOICESUBMISSION===e&&h(!S),T&&o.Pm.PURCHASING===e&&h(!S))},onCheckBoxChange:Z})}),(0,y.jsx)("div",{className:"sidebar-contact-model",children:(0,y.jsx)(u.default,{modalTitle:"Add/Edit Contact",contentClass:"content-40",onClose:z,modalTitleIcon:s.m.AddIcon,isOpen:S,children:(0,y.jsx)(m.default,{isOrderManage:!0,onSuccess:()=>{h(!S),A(!0)},addEditContactMutation:p.yv,isOpen:S,getContactById:p.Su,getContectTypeId:b,customerId:D,onhandleApiCall:e=>{if(2===e){let e={customerId:D,contactTypeId:o.Pm.ENDUSER};j(e)}else if(3===e){let e={customerId:D,contactTypeId:o.Pm.PURCHASING};Q(e)}else if(4===e){let e={customerId:D,contactTypeId:o.Pm.INVOICESUBMISSION};M(e)}},onSidebarClose:z,orderResetValue:F})})})]})}},3737:(e,t,i)=>{i.d(t,{Co:()=>r,EV:()=>p,H:()=>o,Ix:()=>d,Vz:()=>c,i_:()=>I,jZ:()=>l,oP:()=>u,xG:()=>a});var n=i(76969),s=i(91868);const a=e=>[{id:0,type:"All",isForSuppliers:!0,isForCustomers:!0,contactTypeId:""},...e],o=(e,t)=>t?String(e&&"object"===typeof e?e.value:e):Array.isArray(e)?e.map(String).join(","):String(e&&"object"===typeof e?e.value:e),l=e=>[{id:0,type:"All",isForSuppliers:!0,isForCustomers:!0,addressTypeId:""},...e],d=e=>{const t=e.every((e=>!e.isPrimary));return e.map(((e,i)=>({...e,extension:"-"===e.extension?0:e.extension,isPrimary:!(!t||0!==i)||e.isPrimary})))},c=e=>{const t=e.every((e=>!e.isPrimary));return e.map(((e,i)=>({...e,isPrimary:!(!t||0!==i)||e.isPrimary})))},r=e=>e.map((e=>({...e,description:e.description+" by "+e.name+" on "+(0,n.Ay)(e.changedAt,"MM/DD/YYYY hh:mm A")}))),u=e=>{const t=null===e||void 0===e?void 0:e.split("."),i=(null===t||void 0===t?void 0:t.length)>1?t[t.length-1]:"";return m(i)},m=e=>{const t=s.r.find((t=>t.type===e));return t?t.icon:null},p=e=>e.reduce(((e,t)=>{const{type:i,attachment:n,customerDocumentId:s,customerId:a,documentTypeId:o,name:l,createdAt:d,isArchive:c}=t,r={attachment:n,customerDocumentId:s,customerId:a,documentTypeId:o,name:l,documentIcon:u(n),createdAt:d,isArchive:c,type:i};return e[i]||(e[i]=[]),e[i].push(r),e}),{}),I=e=>e.reduce(((e,t)=>{const{type:i,attachment:n,supplierDocumentId:s,supplierId:a,documentTypeId:o,name:l,createdAt:d,isArchive:c}=t,r={attachment:n,supplierDocumentId:s,supplierId:a,documentTypeId:o,name:l,documentIcon:u(n),createdAt:d,isArchive:c};return e[i]||(e[i]=[]),e[i].push(r),e}),{})}}]);
//# sourceMappingURL=8053.f4b4f2ee.chunk.js.map