"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[7699],{57699:(e,t,i)=>{i.r(t),i.d(t,{default:()=>m});var s=i(27565),l=i(84805),d=i(69885),o=i(17295),n=i(67724),a=i(15269),c=i(58412),r=i(27929);const u=s.lazy((()=>i.e(624).then(i.bind(i,624)))),h=s.lazy((()=>i.e(8273).then(i.bind(i,98273)))),m=e=>{let{keyId:t,isSupplier:i,isEditablePage:m,SecurityKey:y,onAddNotes:p,onUpdateNotes:S,onGetByIdNotes:f}=e;const N=(0,s.useRef)(),{formSetting:b}=l.y,[x,w]=(0,s.useState)(!1),[g,A]=(0,s.useState)(!1),[T,k]=(0,s.useState)(),[v,E]=(0,s.useState)(!0),[I,j]=(0,s.useState)(!0),[C,D]=(0,s.useState)(!1),B=(0,a.T)(null===y||void 0===y?void 0:y.ADD),M=(0,a.T)(null===y||void 0===y?void 0:y.EDIT);(0,s.useEffect)((()=>{if(M&&B&&y){if(m)if(!0===M.isViewOnly){b.isViewOnly=!0,D(!0),E(!0);(0,c.Nw)(l.y,"note").fieldSetting.isDisable=!0}else!0===M.isEditable?E(!0):(b.isViewOnly=!1,D(!1),E(!1));!0===B.hasAccess?(b.isViewOnly=!1,j(!0)):(b.isViewOnly=!0,j(!1))}}),[M,B,m,b]);const O=()=>{A(!1),w(!x)};return(0,r.jsxs)("div",{className:"notes-main-card-section",children:[(0,r.jsx)(o.default,{cardTitle:"Notes",buttonClassName:"theme-button",textWithIcon:!0,iconImg:d.m.PlusIcon,rightButton:I,buttonText:"Add",titleButtonClick:O,children:(0,r.jsx)("div",{className:"note-card-sec",children:(0,r.jsx)(u,{listRef:N,handleEditClick:e=>{A(!0),w(!x),k(e)},onGetByIdNotes:f,keyId:t,isSupplier:i,showEditIcon:v})})}),(0,r.jsx)(n.A,{showModal:x,handleToggleModal:O,modalTitle:"Add/Edit Notes",modelSizeClass:"w-60",children:(0,r.jsx)(h,{keyId:t,onAddNotes:p,onUpdateNotes:S,handleToggleModal:O,isEditModeData:T,isSupplier:i,isEditMode:g,isButtonDisable:C,onSuccess:()=>{w(!x),N.current&&N.current.callListFunction(t)}})})]})}},84805:(e,t,i)=>{i.d(t,{y:()=>s});const s={name:"Notes From",initialState:{note:""},formFields:[{id:"note",lable:"Notes :",Field_Name:"notes",fieldType:i(15335).Q.CKEDITOR,dataField:"note",fieldSetting:{placeholder:"Enter",allowSpace:!0,maxLength:1e3,isDisable:!1},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 mb-input"}}],formSetting:{isViewOnly:!1}}},67724:(e,t,i)=>{i.d(t,{A:()=>d});i(27565);var s=i(85097),l=i(27929);const d=e=>{let{isApprovalValidate:t,showModal:i,handleToggleModal:d,children:o,...n}=e;return(0,l.jsxs)(s.A,{className:`center-model-popup ${n.modelSizeClass}`,show:i,onHide:d,keyboard:!t,backdrop:!t||"static",children:[(0,l.jsx)(s.A.Header,{closeButton:!t,children:(0,l.jsx)("div",{className:"model-title",children:n.modalTitle})}),(0,l.jsx)(s.A.Body,{children:o})]})}}}]);
//# sourceMappingURL=7699.090b1f65.chunk.js.map