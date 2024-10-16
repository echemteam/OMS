"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[6760,4555,6046],{19045:(e,l,t)=>{t.d(l,{n:()=>a});var i=t(15335);const a={name:"",initialState:{responsibleUserId:0,inActiveReason:""},formFields:[{id:"ResponsibleUserId",lable:"Responsible User ",Field_Name:"Responsible User",fieldType:i.Q.SELECT,dataField:"responsibleUserId",fieldSetting:{placeholder:"Select Responsible User",isDisabled:!1,isEnableOnChange:!0,isMultiSelect:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-2"}},{id:"inActiveReason",lable:"Reason :",Field_Name:"Reason ",fieldType:i.Q.TEXTAREA,dataField:"inActiveReason",fieldSetting:{placeholder:"please enter Reason",allowSpace:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 mb-2"}}]}},67724:(e,l,t)=>{t.d(l,{A:()=>o});t(27565);var i=t(85097),a=t(27929);const o=e=>{let{isApprovalValidate:l,showModal:t,handleToggleModal:o,children:d,...s}=e;return(0,a.jsxs)(i.A,{className:`center-model-popup ${s.modelSizeClass}`,show:t,onHide:o,keyboard:!l,backdrop:!l||"static",children:[(0,a.jsx)(i.A.Header,{closeButton:!l,children:(0,a.jsx)("div",{className:"model-title",children:s.modalTitle})}),(0,a.jsx)(i.A.Body,{children:d})]})}},37792:(e,l,t)=>{t.d(l,{D9:()=>n,hN:()=>s});var i=t(17690),a=t(15335),o=t(79663),d=t(75707);const s=["Admin","manager"],n={initialState:{name:"",groupTypeId:1,countryId:233,territoryId:2,emailAddress:"",website:"",note:"",isSubCustomer:!1,taxId:"",isBuyingForThirdParty:!1,responsibleUserId:"",customerNoteId:"",incotermId:11,attachment:"",base64File:"",storagePath:""},formFields:[{id:"attachment",lable:"Customer Logo ",Field_Name:"Attachment",fieldType:a.Q.IMAGE,dataField:"attachment",fieldSetting:{placeholder:"Upload Attachment",allowSpace:!0,isImageUpload:!0,isButtonVisible:!0,isCustomButtonVisible:!1,acceptedFiles:".png , .jpg "},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input mb-0 custom-file-upload-section validation-image-uploader customer-logo-sec"}},{id:"name",lable:"Customer Name ",Field_Name:"Customer Name",fieldType:a.Q.INPUT,dataField:"name",fieldSetting:{placeholder:"Enter Customer Name",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0},validation:[{type:"require"},{type:"uniqueName"}],style:{containerCss:"col-xxl-8 col-xl-8 col-md-8 col-12 mb-input"},inputButtonGroupConfig:{isPrimaryButtonVisible:!1,infoButtonConfig:{isInfoButtonVisible:!0,infoButtonIcon:"fa-search",infoButtonTooltip:"Customer Information"}}},{id:"emailAddress",lable:"Email ",Field_Name:"Email",fieldType:a.Q.INPUT,dataField:"emailAddress",fieldSetting:{placeholder:"Enter Email",allowSpace:!1,maxLength:65,exemptBoundarySpaces:!0},validation:[{type:"require"},{type:"email"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-input"}},{id:"website",lable:"Website ",Field_Name:"Website",fieldType:a.Q.INPUT,dataField:"website",fieldSetting:{placeholder:"https://www.xyz.com",allowSpace:!1,maxLength:250},validation:[{type:"require"},{type:"website"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-input"}},{id:"groupTypeId",lable:"Group Type ",Field_Name:"Group Type",fieldType:a.Q.SELECT,dataField:"groupTypeId",fieldSetting:{placeholder:"Select Group Type",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-6 col-12 mb-input"}},{id:"countryId",lable:"Country ",Field_Name:"Country",fieldType:a.Q.SELECT,dataField:"countryId",fieldSetting:{placeholder:"Select Country",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-6 col-12 mb-input"}},{id:"territoryId",lable:"Territory ",Field_Name:"Territory",fieldType:a.Q.SELECT,dataField:"territoryId",fieldSetting:{placeholder:"Select Territory",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-4 col-12 mb-input"}},{id:"incotermId",lable:"Incoterm",Field_Name:"Incoterm",fieldType:a.Q.SELECT,dataField:"incotermId",fieldSetting:{placeholder:"Select Incoterm",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-4 col-12 mb-input"}},{id:"taxId",lable:"Tax Id ",Field_Name:"Tax Id",fieldType:a.Q.INPUT,dataField:"taxId",fieldSetting:{placeholder:"Tax Id",allowSpace:!1,minLength:10,maxLength:10,exemptBoundarySpaces:!0},inputIcon:{isIconShow:!0,faIcon:"fa-info-circle",message:i.n.DefaultUSATaxId},style:{containerCss:"col-xxl-3 col-xl-3 col-md-4 col-12 mb-input"}},{id:"responsibleUserId",lable:"Responsible User ",Field_Name:"Responsible User",fieldType:a.Q.SELECT,dataField:"responsibleUserId",fieldSetting:{placeholder:"Select Responsible User",isEnableOnChange:!0,isDisabled:!1},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input"}},{id:"isBuyingForThirdParty",lable:"Is Buying for Third Party",Field_Name:"Is Buying for Third Party",fieldType:a.Q.CHECKBOX,dataField:"isBuyingForThirdParty",style:{containerCss:"col-xxl-2 col-xl-2 col-md-3 col-12 pt-2 mb-input margin-top-checkbox mt-2"}},{id:"isSubCustomer",lable:"Is Sub Customer",Field_Name:"Is Sub Customer",fieldType:a.Q.CHECKBOX,dataField:"isSubCustomer",style:{containerCss:"col-xxl-2 col-xl-2 col-md-3 col-12 md-pt-0 pt-2 mb-input margin-top-checkbox margin-left0-checkbox mt-2"}},{id:"note",lable:"Notes ",Field_Name:"Notes",fieldType:a.Q.CKEDITOR,dataField:"note",fieldSetting:{placeholder:"Enter Notes",maxLength:1e3},style:{containerCss:"col-xxl-5 col-xl-5 col-md-12 col-12 mb-input mb-0"}}],formSetting:{isViewOnly:!1}};o.f.LABLE,d.x,o.f.ACTION},648:(e,l,t)=>{t.r(l),t.d(l,{default:()=>c});var i=t(27565),a=t(28734),o=t(66774),d=t(2604),s=t(84464),n=t(27929);const r=i.lazy((()=>t.e(3384).then(t.bind(t,11003)))),c=(0,i.forwardRef)((e=>{let{childRef:l,getListApi:t,updateApproval:c,isDetailPage:p,isAddPagePage:m,setSelectedStatus:u,responsibleUserIds:y,OnRejectedSupplierFromApproval:b}=e;const x=(0,i.useRef)(),[S,h]=(0,i.useState)(!1),[g,f]=(0,i.useState)(!1),[C,I]=(0,i.useState)([]),[T,F]=(0,i.useState)(!1),[A,E]=(0,i.useState)(!1),[v,N]=(0,i.useState)(!1),{setRejectStatusId:B}=(0,i.useContext)(s.A),[R,{isLoading:w,isSuccess:L,data:U}]=(0,d.Tr)(),P=function(e,l){let t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];E(!A),R({customerId:0,supplierId:e}),h(e),N(l||!1),F(t)};return(0,i.useEffect)((()=>{L&&U&&I(U)}),[L,U]),(0,i.useImperativeHandle)(l,(()=>({callChildFunction:P}))),(0,n.jsxs)(i.Fragment,{children:[(0,n.jsx)(r,{parentRef:x,handleValidateSuccess:()=>{E(!A),v&&f(!g),!v&&c()},showModal:A,isSupplierApproval:!0,isGetCheckListLoading:w,mainId:S,isDetailPage:p,handleShowValidateModal:P,handleValidateModalClose:()=>{E(!A),p||m||t()},handleDone:()=>{x.current&&x.current.validateApprovalCheckList()},validateCheckList:C,isShowBothButton:T}),g&&(0,n.jsx)(o.default,{onSidebarClose:()=>{p||t(),f(!g)},isModelOpen:g,mainId:S,isSupplierApproval:!0,ApprovalData:a.lx.APPROVESUPPLIER,onSuccessApprovalClose:()=>{f(!g),c()},getBasicInformationById:d.ly,getAddressById:d.Sp,getContactById:d.if,getFinacialSettingById:d.$c,ownerType:a.A$.Supplier,setRejectStatusId:B,setSelectedStatus:u,basicData:y,OnRejectedSupplierFromApproval:b})]})}))}}]);
//# sourceMappingURL=6760.983c8b61.chunk.js.map