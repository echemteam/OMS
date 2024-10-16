"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[4885],{19045:(e,t,l)=>{l.d(t,{n:()=>a});var i=l(15335);const a={name:"",initialState:{responsibleUserId:0,inActiveReason:""},formFields:[{id:"ResponsibleUserId",lable:"Responsible User ",Field_Name:"Responsible User",fieldType:i.Q.SELECT,dataField:"responsibleUserId",fieldSetting:{placeholder:"Select Responsible User",isDisabled:!1,isEnableOnChange:!0,isMultiSelect:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-2"}},{id:"inActiveReason",lable:"Reason :",Field_Name:"Reason ",fieldType:i.Q.TEXTAREA,dataField:"inActiveReason",fieldSetting:{placeholder:"please enter Reason",allowSpace:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 mb-2"}}]}},67724:(e,t,l)=>{l.d(t,{A:()=>n});l(27565);var i=l(85097),a=l(27929);const n=e=>{let{isApprovalValidate:t,showModal:l,handleToggleModal:n,children:o,...d}=e;return(0,a.jsxs)(i.A,{className:`center-model-popup ${d.modelSizeClass}`,show:l,onHide:n,keyboard:!t,backdrop:!t||"static",children:[(0,a.jsx)(i.A.Header,{closeButton:!t,children:(0,a.jsx)("div",{className:"model-title",children:d.modalTitle})}),(0,a.jsx)(i.A.Body,{children:o})]})}},37792:(e,t,l)=>{l.d(t,{D9:()=>s,hN:()=>d});var i=l(17690),a=l(15335),n=l(79663),o=l(75707);const d=["Admin","manager"],s={initialState:{name:"",groupTypeId:1,countryId:233,territoryId:2,emailAddress:"",website:"",note:"",isSubCustomer:!1,taxId:"",isBuyingForThirdParty:!1,responsibleUserId:"",customerNoteId:"",incotermId:11,attachment:"",base64File:"",storagePath:""},formFields:[{id:"attachment",lable:"Customer Logo ",Field_Name:"Attachment",fieldType:a.Q.IMAGE,dataField:"attachment",fieldSetting:{placeholder:"Upload Attachment",allowSpace:!0,isImageUpload:!0,isButtonVisible:!0,isCustomButtonVisible:!1,acceptedFiles:".png , .jpg "},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input mb-0 custom-file-upload-section validation-image-uploader customer-logo-sec"}},{id:"name",lable:"Customer Name ",Field_Name:"Customer Name",fieldType:a.Q.INPUT,dataField:"name",fieldSetting:{placeholder:"Enter Customer Name",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0},validation:[{type:"require"},{type:"uniqueName"}],style:{containerCss:"col-xxl-8 col-xl-8 col-md-8 col-12 mb-input"},inputButtonGroupConfig:{isPrimaryButtonVisible:!1,infoButtonConfig:{isInfoButtonVisible:!0,infoButtonIcon:"fa-search",infoButtonTooltip:"Customer Information"}}},{id:"emailAddress",lable:"Email ",Field_Name:"Email",fieldType:a.Q.INPUT,dataField:"emailAddress",fieldSetting:{placeholder:"Enter Email",allowSpace:!1,maxLength:65,exemptBoundarySpaces:!0},validation:[{type:"require"},{type:"email"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-input"}},{id:"website",lable:"Website ",Field_Name:"Website",fieldType:a.Q.INPUT,dataField:"website",fieldSetting:{placeholder:"https://www.xyz.com",allowSpace:!1,maxLength:250},validation:[{type:"require"},{type:"website"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-input"}},{id:"groupTypeId",lable:"Group Type ",Field_Name:"Group Type",fieldType:a.Q.SELECT,dataField:"groupTypeId",fieldSetting:{placeholder:"Select Group Type",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-6 col-12 mb-input"}},{id:"countryId",lable:"Country ",Field_Name:"Country",fieldType:a.Q.SELECT,dataField:"countryId",fieldSetting:{placeholder:"Select Country",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-6 col-12 mb-input"}},{id:"territoryId",lable:"Territory ",Field_Name:"Territory",fieldType:a.Q.SELECT,dataField:"territoryId",fieldSetting:{placeholder:"Select Territory",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-4 col-12 mb-input"}},{id:"incotermId",lable:"Incoterm",Field_Name:"Incoterm",fieldType:a.Q.SELECT,dataField:"incotermId",fieldSetting:{placeholder:"Select Incoterm",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-3 col-xl-4 col-md-4 col-12 mb-input"}},{id:"taxId",lable:"Tax Id ",Field_Name:"Tax Id",fieldType:a.Q.INPUT,dataField:"taxId",fieldSetting:{placeholder:"Tax Id",allowSpace:!1,minLength:10,maxLength:10,exemptBoundarySpaces:!0},inputIcon:{isIconShow:!0,faIcon:"fa-info-circle",message:i.n.DefaultUSATaxId},style:{containerCss:"col-xxl-3 col-xl-3 col-md-4 col-12 mb-input"}},{id:"responsibleUserId",lable:"Responsible User ",Field_Name:"Responsible User",fieldType:a.Q.SELECT,dataField:"responsibleUserId",fieldSetting:{placeholder:"Select Responsible User",isEnableOnChange:!0,isDisabled:!1},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input"}},{id:"isBuyingForThirdParty",lable:"Is Buying for Third Party",Field_Name:"Is Buying for Third Party",fieldType:a.Q.CHECKBOX,dataField:"isBuyingForThirdParty",style:{containerCss:"col-xxl-2 col-xl-2 col-md-3 col-12 pt-2 mb-input margin-top-checkbox mt-2"}},{id:"isSubCustomer",lable:"Is Sub Customer",Field_Name:"Is Sub Customer",fieldType:a.Q.CHECKBOX,dataField:"isSubCustomer",style:{containerCss:"col-xxl-2 col-xl-2 col-md-3 col-12 md-pt-0 pt-2 mb-input margin-top-checkbox margin-left0-checkbox mt-2"}},{id:"note",lable:"Notes ",Field_Name:"Notes",fieldType:a.Q.CKEDITOR,dataField:"note",fieldSetting:{placeholder:"Enter Notes",maxLength:1e3},style:{containerCss:"col-xxl-5 col-xl-5 col-md-12 col-12 mb-input mb-0"}}],formSetting:{isViewOnly:!1}};n.f.LABLE,o.x,n.f.ACTION},75707:(e,t,l)=>{l.d(t,{x:()=>i});const i=e=>{switch(e){case"Active":return"status-btn badge-gradient-success";case"Open":default:return"status-btn badge-gradient-info";case"In Active":return"status-btn badge-gradient-danger";case"Pending":return"status-btn badge-gradient-Pending";case"In progress":return"status-btn badge-gradient-theme";case"Submitted":return"status-btn badge-gradient-Submitted";case"Approved":return"status-btn badge-gradient-Approved";case"Freeze":return"status-btn badge-gradient-Frozen";case"Block":return"status-btn badge-gradient-Blocked";case"Reject":return"status-btn badge-gradient-reject";case"Disable":return"status-btn badge-gradient-disabled"}}}}]);
//# sourceMappingURL=4885.b5a02ae3.chunk.js.map