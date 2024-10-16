"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[1435],{51435:(e,a,d)=>{d.r(a),d.d(a,{default:()=>f});var i=d(27565),l=d(82929),t=d(65513),s=d(92045),r=d(80889),n=d(65748),o=d(40465),m=d(27929);const c=i.lazy((()=>d.e(2792).then(d.bind(d,12792)))),u=i.lazy((()=>Promise.all([d.e(8145),d.e(5097),d.e(4301)]).then(d.bind(d,84301)))),f=e=>{let{contactId:a,emailAddressList:d,setEmailAddressList:f,isButtonDisable:A,isOrderManage:E,orderResetValue:h}=e;const y=(0,i.useRef)(),p=(0,i.useRef)(),{confirm:g}=(0,r.A)(),[C,b]=(0,i.useState)(!1),[w,D]=(0,i.useState)(!1),[v,x]=(0,i.useState)(),[P,{isFetching:N,isSuccess:I,data:S}]=(0,o.uE)();(0,i.useEffect)((()=>{I&&S&&!N&&n.A.success(S.errorMessage)}),[I,S,N]),(0,i.useEffect)((()=>{const e=l.$.columns.find((e=>"Action"===e.name));A&&e?(e.defaultAction.allowEdit=!1,e.defaultAction.allowDelete=!1):e&&(e.defaultAction.allowEdit=!0,e.defaultAction.allowDelete=!0)}),[A]);const L=()=>{(null===d||void 0===d?void 0:d.length)<2?(D(!w),b(!1)):w?D(!w):n.A.warning("You have reached the maximum number of Email Address. Please remove an existing email address before adding a new one.")},M={EDIT:e=>{D(!w),b(!0),x(e)},DELETE:e=>{g("Delete?","Are you sure you want to Delete?","Delete","Cancel").then((a=>{a&&(0,s.Wv)(e.emailId,e.id,P,d,f,t.Q.EmailDelete,!0)}))}};return(0,m.jsxs)(i.Fragment,{children:[(0,m.jsx)(c,{molGridRef:y,handleToggleModal:L,actionHandler:M,isButtonDisable:A,emailAddressList:d,handleCheckBoxChange:e=>{p.current&&p.current.callChildFunction(e)},isOrderManage:E}),(0,m.jsx)(u,{contactId:a,handleToggleModal:L,onSuccess:()=>{D(!w),b(!1)},showModal:w,addeditRef:p,editFormData:v,isEdit:C,emailAddressList:d,setEmailAddressList:f,isOrderManage:E})]})}},82929:(e,a,d)=>{d.d(a,{$:()=>s,O:()=>t});var i=d(15335),l=d(79663);const t={name:"Add Edit Role Form",initialState:{emailAddress:"",isEmailPrimary:!1},formFields:[{id:"emailAddress",lable:"Email Address ",Field_Name:"Email Address",fieldType:i.Q.INPUT,dataField:"emailAddress",fieldSetting:{placeholder:"Enter Email Address",allowSpace:!1,maxLength:50},validation:[{type:"require"},{type:"email"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 mb-input"}},{id:"isEmailPrimary",lable:"Is Primary",Field_Name:"IsEmailPrimary",fieldType:i.Q.CHECKBOX,dataField:"isEmailPrimary",fieldSetting:{placeholder:"",allowSpace:!0},style:{containerCss:"col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-input margin-left0-checkbox"}}]},s={columns:[{name:"Email Address",fieldName:"emailAddress",colStyle:{width:"40%"}},{name:"Is Primary",fieldName:"isPrimary",colStyle:{width:"20%"},colType:l.f.CHECKBOX,colSettings:{allowCheckbox:!0,isDisabled:!1}},{name:"Action",colStyle:{width:"40%"},colType:l.f.ACTION,defaultAction:{allowEdit:!0,allowDelete:!0}}]}},92045:(e,a,d)=>{d.d(a,{O6:()=>s,Wv:()=>l,ys:()=>t});var i=d(65748);const l=(e,a,d,l,t,s,r)=>{if(e){let a;d(e),a=r?l.filter((a=>a.emailId!==e)):l.filter((a=>a.phoneId!==e)),t(a)}else{t(l.filter((e=>e.id!==a)).map(((e,a)=>({...e,id:a+1})))),i.A.success(s)}},t=(e,a,d,l,t,s,r,n,o)=>{let m={...e,contactId:a,isPrimary:0===(null===d||void 0===d?void 0:d.length)||e.isEmailPrimary,id:d?(null===d||void 0===d?void 0:d.length)+1:1};if(d&&2===d.length)return i.A.warning(s),n(),void o();if(null===d||void 0===d?void 0:d.some((a=>a.emailAddress.toLowerCase()===e.emailAddress.toLowerCase())))i.A.warning(r);else{let a;d?(a=[...d],e.isEmailPrimary&&(a=a.map((e=>({...e,isPrimary:!1})))),a.push(m)):a=[m],a.length<=5&&(l(a),i.A.success(t),n(),o())}},s=(e,a,d,l,t,s,r,n)=>{if(a&&e.id>0){if(a.some((a=>a.emailAddress.toLowerCase()===e.emailAddress.toLowerCase()&&a.id!==e.id)))i.A.warning(t);else{d(a.map((a=>a.id===e.id?{...a,emailAddress:e.emailAddress,isPrimary:e.isEmailPrimary}:e.isEmailPrimary?{...a,isPrimary:!1}:a))),i.A.success(l),null===r||void 0===r||r(),null===n||void 0===n||n()}}else i.A.success(s),r(),n()}},65513:(e,a,d)=>{d.d(a,{Q:()=>i});const i={EmailDelete:"Email address Deleted.",EmailAdded:"Email address added.",EmailUpdated:"Email address updated.",EmailMaxLength:"Maximum number of email addresses reached. Request not added.",DuplicateEmail:"Duplicate email address found. Request not added.",InvalidData:"Invalid data. Update not performed.",ContactNumberDelete:"Contact Number Deleted.",ContactNumberAdded:"Contact Number added.",ContactNumberUpdated:"Contact Number updated.",ContactNumberMaxLength:"Maximum number of Contact Number reached. Request not added.",ContactNumberDuplicate:"Duplicate Contact Number found. Request not added."}}}]);
//# sourceMappingURL=1435.7e1e52f7.chunk.js.map