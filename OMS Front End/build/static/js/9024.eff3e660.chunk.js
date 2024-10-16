"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[9024],{59024:(e,l,t)=>{t.r(l),t.d(l,{default:()=>f});var a=t(27565),i=t(65513),d=t(92045),o=t(25257),n=t(58412),s=t(80889),r=t(65748),m=t(4260),c=t(16066),u=t(27929);const h=a.lazy((()=>t.e(9164).then(t.bind(t,19164)))),p=a.lazy((()=>Promise.all([t.e(8145),t.e(5097),t.e(5272)]).then(t.bind(t,35272)))),f=e=>{let{contactId:l,phoneNumberList:t,setPhoneNumberList:f,isButtonDisable:b,contryIdCode:y,isOrderManage:C}=e;const N=(0,a.useRef)(),E=(0,a.useRef)(),{confirm:g}=(0,s.A)(),[x,v]=(0,a.useState)(!1),[w,P]=(0,a.useState)(!1),[A,S]=(0,a.useState)(),[T,D]=(0,a.useState)(""),[I,{isSuccess:L,data:F}]=(0,m.f8)(),[M,{isSuccess:R,data:k}]=(0,c.UT)(),[O,{isFetching:q,isSuccess:Q,data:B}]=(0,c.Wy)();(0,a.useEffect)((()=>{M(),I()}),[l]),(0,a.useEffect)((()=>{const e=o.uw.columns.find((e=>"Action"===e.name));b&&e?(e.defaultAction.allowEdit=!1,e.defaultAction.allowDelete=!1):e&&(e.defaultAction.allowEdit=!0,e.defaultAction.allowDelete=!0)}),[b]),(0,a.useEffect)((()=>{if(L&&F&&((0,n.Xh)(F,"countryId","phoneCode",o.lh,"phoneCode"),y)){const e=F.find((e=>e.countryId===y));e&&D(e.phoneCode)}}),[L,F,y]),(0,a.useEffect)((()=>{R&&k&&(0,n.Xh)(k,"phoneTypeId","type",o.lh,"phoneTypeId")}),[R,k]),(0,a.useEffect)((()=>{Q&&B&&!q&&r.A.success(B.errorMessage)}),[Q,B,q]);const U=()=>{(null===t||void 0===t?void 0:t.length)<5?(P(!w),v(!1)):w?P(!w):r.A.warning("You have reached the maximum number of contacts. Please remove an existing contact before adding a new one.")},H={EDIT:e=>{P(!w),v(!0),S(e)},DELETE:e=>{g("Delete?","Are you sure you want to Delete?","Delete","Cancel").then((l=>{l&&(0,d.Wv)(e.phoneId,e.id,O,t,f,i.Q.ContactNumberDelete,!1)}))}};return(0,u.jsxs)(a.Fragment,{children:[(0,u.jsx)(h,{molGridRef:N,handleToggleModal:U,actionHandler:H,isButtonDisable:b,phoneNumberList:t,handleCheckBoxChange:e=>{E.current&&E.current.callChildFunction(e)}}),(0,u.jsx)(p,{handleToggleModal:U,onSuccess:()=>{P(!w),v(!1)},showModal:w,addeditRef:E,editFormData:A,isEdit:x,contactId:l,phoneNumberList:t,setPhoneNumberList:f,newPhoneCode:T,isOrderManage:C})]})}},25257:(e,l,t)=>{t.d(l,{Ct:()=>d,lh:()=>o,uw:()=>n});var a=t(15335),i=t(79663);const d={label:"Work",value:2},o={name:"Add Edit Role Form",initialState:{phoneCode:"",phoneNumber:"",phoneTypeId:d.value,extension:0,id:0,isPrimaryPhoneNumber:!1},formFields:[{id:"phoneTypeId",lable:"Phone Type",Field_Name:"phoneType",fieldType:a.Q.SELECT,dataField:"phoneTypeId",fieldSetting:{placeholder:"Enter Phone Type",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 mb-input"}},{id:"phoneNumber",lable:"Contact Number",Field_Name:"Phone Number",fieldType:a.Q.PHONE,dataField:"phoneNumber",fieldSetting:{placeholder:"Enter Phone Number",allowSpace:!0,maxLength:15},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-12 mb-input"}},{id:"extension",lable:"",Field_Name:"Extension",fieldType:a.Q.NUMERIC,dataField:"extension",fieldSetting:{placeholder:"Extension",allowSpace:!0,minLength:0,maxLength:6},style:{containerCss:"col-xxl-3 col-xl-12 col-md-12 mb-input "}},{id:"isPrimaryPhoneNumber",lable:"Is Primary",Field_Name:"isPrimaryPhoneNumber",fieldType:a.Q.CHECKBOX,dataField:"isPrimaryPhoneNumber",fieldSetting:{placeholder:"",allowSpace:!0},style:{containerCss:"col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-input margin-left0-checkbox"}}]},n={columns:[{name:"Type",fieldName:"phoneType",colStyle:{width:"15%"},renderCustomCol:e=>`(${null===e||void 0===e?void 0:e.phoneCode}) ${null===e||void 0===e?void 0:e.phoneNumber}`},{name:"Phone Number",fieldName:"phoneNumber",colStyle:{width:"30%"},renderCustomCol:e=>`(${null===e||void 0===e?void 0:e.phoneCode}) ${null===e||void 0===e?void 0:e.phoneNumber}`},{name:"Extension",colStyle:{width:"20%"},fieldName:"extension"},{name:"Is Primary",fieldName:"isPrimary",colStyle:{width:"15%"},colType:i.f.CHECKBOX,colSettings:{allowCheckbox:!0,allowDisable:!0}},{name:"Action",colStyle:{width:"15%"},colType:i.f.ACTION,defaultAction:{allowEdit:!0,allowDelete:!0}}]}},92045:(e,l,t)=>{t.d(l,{O6:()=>o,Wv:()=>i,ys:()=>d});var a=t(65748);const i=(e,l,t,i,d,o,n)=>{if(e){let l;t(e),l=n?i.filter((l=>l.emailId!==e)):i.filter((l=>l.phoneId!==e)),d(l)}else{d(i.filter((e=>e.id!==l)).map(((e,l)=>({...e,id:l+1})))),a.A.success(o)}},d=(e,l,t,i,d,o,n,s,r)=>{let m={...e,contactId:l,isPrimary:0===(null===t||void 0===t?void 0:t.length)||e.isEmailPrimary,id:t?(null===t||void 0===t?void 0:t.length)+1:1};if(t&&2===t.length)return a.A.warning(o),s(),void r();if(null===t||void 0===t?void 0:t.some((l=>l.emailAddress.toLowerCase()===e.emailAddress.toLowerCase())))a.A.warning(n);else{let l;t?(l=[...t],e.isEmailPrimary&&(l=l.map((e=>({...e,isPrimary:!1})))),l.push(m)):l=[m],l.length<=5&&(i(l),a.A.success(d),s(),r())}},o=(e,l,t,i,d,o,n,s)=>{if(l&&e.id>0){if(l.some((l=>l.emailAddress.toLowerCase()===e.emailAddress.toLowerCase()&&l.id!==e.id)))a.A.warning(d);else{t(l.map((l=>l.id===e.id?{...l,emailAddress:e.emailAddress,isPrimary:e.isEmailPrimary}:e.isEmailPrimary?{...l,isPrimary:!1}:l))),a.A.success(i),null===n||void 0===n||n(),null===s||void 0===s||s()}}else a.A.success(o),n(),s()}},65513:(e,l,t)=>{t.d(l,{Q:()=>a});const a={EmailDelete:"Email address Deleted.",EmailAdded:"Email address added.",EmailUpdated:"Email address updated.",EmailMaxLength:"Maximum number of email addresses reached. Request not added.",DuplicateEmail:"Duplicate email address found. Request not added.",InvalidData:"Invalid data. Update not performed.",ContactNumberDelete:"Contact Number Deleted.",ContactNumberAdded:"Contact Number added.",ContactNumberUpdated:"Contact Number updated.",ContactNumberMaxLength:"Maximum number of Contact Number reached. Request not added.",ContactNumberDuplicate:"Duplicate Contact Number found. Request not added."}}}]);
//# sourceMappingURL=9024.eff3e660.chunk.js.map