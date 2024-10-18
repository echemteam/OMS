"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[5272],{35272:(e,n,o)=>{o.r(n),o.d(n,{default:()=>c});var i=o(27565),t=o(65513),r=o(60497),s=o(18637),p=o(25257),d=o(67724),h=o(65748),a=o(38967),u=o.n(a);const l=(e,n,o,i,t,r,s,p,d)=>{const a=e.phoneNumber.phoneCode&&"object"===typeof e.phoneNumber?e.phoneNumber.phoneCode:e.phoneCode,u=e.phoneNumber.PhoneNumber&&"object"===typeof e.phoneNumber?e.phoneNumber.PhoneNumber:e.phoneNumber,l=`+${a}`,m=u.startsWith(l)?u.slice(l.length):u;let b={...e,contactId:n,id:o?(null===o||void 0===o?void 0:o.length)+1:1,phoneCode:l,phoneNumber:m,phoneTypeId:e.phoneTypeId&&"object"===typeof e.phoneTypeId?e.phoneTypeId.value:e.phoneTypeId,phoneType:e.phoneTypeId&&"object"===typeof e.phoneTypeId?e.phoneTypeId.label:e.phoneTypeId,isPrimary:0===(null===o||void 0===o?void 0:o.length)||e.isPrimaryPhoneNumber,extension:e.extension>0?e.extension:"-"};if(o&&5===o.length)return h.A.warning(r),p(),void d();if(null===o||void 0===o?void 0:o.some((e=>e.phoneNumber===b.phoneNumber&&e.phoneCode===b.phoneCode)))h.A.warning(s);else{let n;o?(n=[...o],e.isPrimaryPhoneNumber&&(n=n.map((e=>({...e,isPrimary:!1})))),n.push(b)):n=[b],n.length<=5?(i(n),h.A.success(t),p(),d()):h.A.warning("Cannot add more than 5 items.")}},m=(e,n,o,i,t,r,s,p)=>{if(n&&e.id>0){const r=e.phoneNumber.phoneCode&&"object"===typeof e.phoneNumber?e.phoneNumber.phoneCode:e.phoneCode,d=e.phoneNumber.PhoneNumber&&"object"===typeof e.phoneNumber?e.phoneNumber.PhoneNumber:e.phoneNumber,a=`+${r}`,u=d.startsWith(a)?d.slice(a.length):d,l=e.phoneTypeId&&"object"===typeof e.phoneTypeId?e.phoneTypeId.value:e.phoneTypeId,m=e.phoneTypeId.label?e.phoneTypeId.label:e.phoneType,b=e.isPrimaryPhoneNumber;if(n.some((n=>n.phoneNumber===e.phoneNumber&&n.phoneCode===r&&n.id!==e.id)))h.A.warning(t);else{let t=n.map((n=>{if(n.id===e.id)return{...n,phoneCode:r,phoneTypeId:l,phoneType:m,phoneNumber:u,extension:e.extension>0?e.extension:"-",isPrimary:b};if(b){const e=n.phoneNumber.phoneCode&&"object"===typeof n.phoneNumber?n.phoneNumber.phoneCode:n.phoneCode,o=n.phoneNumber.PhoneNumber&&"object"===typeof n.phoneNumber?n.phoneNumber.PhoneNumber:n.phoneNumber,i=o.startsWith(a)?o.slice(a.length):o;return{...n,phoneCode:e,phoneNumber:i,isPrimary:!1}}{const e=n.phoneNumber.phoneCode&&"object"===typeof n.phoneNumber?n.phoneNumber.phoneCode:n.phoneCode,o=n.phoneNumber.PhoneNumber&&"object"===typeof n.phoneNumber?n.phoneNumber.PhoneNumber:n.phoneNumber,i=o.startsWith(a)?o.slice(a.length):o;return{...n,phoneCode:e,phoneNumber:i}}}));o(t),h.A.success(i),null===s||void 0===s||s(),null===p||void 0===p||p()}}else h.A.success(r),null===s||void 0===s||s(),null===p||void 0===p||p()};l.propTypes={data:u().shape({phoneCode:u().oneOfType([u().string,u().object]),phoneTypeId:u().oneOfType([u().string,u().object]),phoneType:u().string,isPrimaryPhoneNumber:u().bool,extension:u().number,phoneNumber:u().string.isRequired}).isRequired,contactId:u().number.isRequired,listData:u().arrayOf(u().shape({phoneNumber:u().string.isRequired,phoneCode:u().string.isRequired,id:u().number.isRequired,phoneTypeId:u().string,phoneType:u().string,isPrimary:u().bool,extension:u().oneOfType([u().number,u().string])})),setListData:u().func.isRequired,successMessage:u().string.isRequired,maxLengthMessage:u().string.isRequired,duplicateMessage:u().string.isRequired,onResetData:u().func.isRequired,onSuccess:u().func.isRequired},m.propTypes={data:u().shape({id:u().number.isRequired,phoneCode:u().oneOfType([u().string,u().object]),phoneTypeId:u().oneOfType([u().string,u().object]),phoneType:u().string,isPrimaryPhoneNumber:u().bool,extension:u().number,phoneNumber:u().string.isRequired}).isRequired,listData:u().arrayOf(u().shape({phoneNumber:u().string.isRequired,phoneCode:u().string.isRequired,id:u().number.isRequired,phoneTypeId:u().string,phoneType:u().string,isPrimary:u().bool,extension:u().oneOfType([u().number,u().string])})),setListData:u().func.isRequired,successMessage:u().string.isRequired,duplicateMessage:u().string.isRequired,inValidDate:u().string.isRequired,onResetData:u().func.isRequired,onSuccess:u().func.isRequired};var b=o(27929);const c=e=>{let{contactId:n,phoneNumberList:o,setPhoneNumberList:h,editFormData:a,handleToggleModal:u,showModal:c,isEdit:y,onSuccess:N,newPhoneCode:g,addeditRef:T,isOrderManage:f}=e;const C=(0,i.useRef)(),[P,I]=(0,i.useState)(p.lh),v=e=>{let n={...e,isPrimaryPhoneNumber:e.isPrimary};m(n,o,h,t.Q.ContactNumberUpdated,t.Q.ContactNumberDuplicate,t.Q.InvalidData)};(0,i.useImperativeHandle)(T,(()=>({callChildFunction:v}))),(0,i.useEffect)((()=>{if(y&&a){let e={...p.lh},n={PhoneNumber:(null===a||void 0===a?void 0:a.phoneCode)+(null===a||void 0===a?void 0:a.phoneNumber)};e.initialState={extension:a.extension,id:a.id,isPrimaryPhoneNumber:a.isPrimary,phoneId:a.phoneId,phoneNumber:n,phoneType:a.phoneType,phoneTypeId:a.phoneTypeId},I(e)}else if(!1===y&&g){let e={...p.lh};e.initialState={...e.initialState},I(e)}}),[y,a]);const j=()=>{let e={...p.lh};e.initialState={...p.lh.initialState},I(e)};return(0,i.useEffect)((()=>{f&&j()}),[f]),(0,b.jsx)(d.A,{showModal:c,handleToggleModal:u,modalTitle:"Add/Edit Contact",modelSizeClass:"w-40",children:(0,b.jsxs)("div",{className:"row  phone-numer-card",children:[(0,b.jsx)("div",{className:"col-md-12 add-edit-phoneForm",children:(0,b.jsx)("div",{className:"row vertical-form",children:(0,b.jsx)(s.A,{config:P,ref:C,...P})})}),(0,b.jsx)("div",{className:"col-md-12 mt-2",children:(0,b.jsxs)("div",{className:"d-flex align-item-center justify-content-end",children:[(0,b.jsx)(r.A,{buttonTypeClassName:"theme-button",buttonText:""+(y?"Update":"Add"),onClick:()=>{let e=C.current.getFormData();if(e)if(e.id){if(e.id){let n={...e,isPrimary:e.isPrimaryPhoneNumber};m(n,o,h,t.Q.ContactNumberUpdated,t.Q.ContactNumberDuplicate,t.Q.InvalidData,j,N)}}else{let i={...e,phoneTypeId:e.phoneTypeId&&"object"===typeof e.phoneTypeId?e.phoneTypeId:p.Ct,isPrimary:e.isPrimaryPhoneNumber};l(i,n,o,h,t.Q.ContactNumberAdded,t.Q.ContactNumberMaxLength,t.Q.ContactNumberDuplicate,j,N)}}}),(0,b.jsx)(r.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:u})]})})]})})}},67724:(e,n,o)=>{o.d(n,{A:()=>r});o(27565);var i=o(85097),t=o(27929);const r=e=>{let{isApprovalValidate:n,showModal:o,handleToggleModal:r,children:s,...p}=e;return(0,t.jsxs)(i.A,{className:`center-model-popup ${p.modelSizeClass}`,show:o,onHide:r,keyboard:!n,backdrop:!n||"static",children:[(0,t.jsx)(i.A.Header,{closeButton:!n,children:(0,t.jsx)("div",{className:"model-title",children:p.modalTitle})}),(0,t.jsx)(i.A.Body,{children:s})]})}}}]);
//# sourceMappingURL=5272.5f821358.chunk.js.map