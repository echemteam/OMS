"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[149],{30149:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var a=n(27565),d=n(91868),s=n(60497),o=n(18637),i=n(65748),c=n(28734),u=n(32813),l=n(58412),r=n(27929);const m=e=>{let{showModal:t,keyId:n,isSupplier:m,addDocuments:p,handleToggleModal:f,onSuccess:h,isEditablePage:y,customerStatusId:g}=e;const v=(0,a.useRef)(),[T,I]=(0,a.useState)(d.qz),[x,{isLoading:D,isSuccess:b,data:A}]=p();(0,a.useEffect)((()=>{t&&((0,l.t5)(T,"name",c.fV.DISABLED,!0),(0,u.t)(T,I,d.qz.initialState))}),[t]),(0,a.useEffect)((()=>{if(b&&A){if(A.errorMessage.includes("Document name"))return void i.A.warning(A.errorMessage);if(A.errorMessage.includes("exists"))return void i.A.warning(A.errorMessage);h(),(0,u.t)(T,I,d.qz.initialState),i.A.success(A.errorMessage)}}),[b,A]);const S=(e,t,n)=>{const{id:a,type:d}=(e=>e&&"object"===typeof e?{id:e.value||e.id||0,type:e.text||""}:{id:e||0,type:""})(null===e||void 0===e?void 0:e.documentTypeId);return{...e,[t?"supplierId":"customerId"]:n,documentTypeId:a,documentType:d,createdAt:new Date}},C={DA_CHANGED:(e,t)=>{"documentTypeId"===t&&(e||((0,l.t5)(T,"documentTypeId",c.fV.ISTEXT,e),v.current.updateFormFieldValue({documentTypeId:null})))}};return(0,r.jsxs)("div",{className:"row add-documentForm",children:[(0,r.jsx)(o.A,{config:T,ref:v,...T,onFormDataChange:e=>{const t=e.attachment&&e.attachment.fileName||"";I((n=>({...n,initialState:{...e,name:t}})))},onDropdownAction:C}),(0,r.jsx)("div",{className:"col-md-12 mt-2",children:(0,r.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,r.jsxs)("div",{className:"d-flex align-item-end",children:[(0,r.jsx)(s.A,{buttonTypeClassName:"theme-button",buttonText:"Add",onClick:async()=>{const e=v.current.getFormData();if(e){const t=S(e,m,n),a=[{name:null===e||void 0===e?void 0:e.name,attachment:null===e||void 0===e?void 0:e.attachment.fileName,base64File:null===e||void 0===e?void 0:e.attachment.base64Data,documentTypeId:null===t||void 0===t?void 0:t.documentTypeId,documentType:t.documentType}],d={storagePath:m?c.Dh.SUPPLIER:c.Dh.CUSTOMER,[m?"supplierId":"customerId"]:n,documentInfoList:a};x(d)}},isLoading:D}),(0,r.jsx)(s.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:f})]})})})]})}}}]);
//# sourceMappingURL=149.24d43bcf.chunk.js.map