"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[260],{19045:(e,l,t)=>{t.d(l,{n:()=>a});var i=t(15335);const a={name:"",initialState:{responsibleUserId:0,inActiveReason:""},formFields:[{id:"ResponsibleUserId",lable:"Responsible User ",Field_Name:"Responsible User",fieldType:i.Q.SELECT,dataField:"responsibleUserId",fieldSetting:{placeholder:"Select Responsible User",isDisabled:!1,isEnableOnChange:!0,isMultiSelect:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-2"}},{id:"inActiveReason",lable:"Reason :",Field_Name:"Reason ",fieldType:i.Q.TEXTAREA,dataField:"inActiveReason",fieldSetting:{placeholder:"please enter Reason",allowSpace:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 mb-2"}}]}},67724:(e,l,t)=>{t.d(l,{A:()=>s});t(27565);var i=t(85097),a=t(27929);const s=e=>{let{isApprovalValidate:l,showModal:t,handleToggleModal:s,children:n,...o}=e;return(0,a.jsxs)(i.A,{className:`center-model-popup ${o.modelSizeClass}`,show:t,onHide:s,keyboard:!l,backdrop:!l||"static",children:[(0,a.jsx)(i.A.Header,{closeButton:!l,children:(0,a.jsx)("div",{className:"model-title",children:o.modalTitle})}),(0,a.jsx)(i.A.Body,{children:n})]})}},56091:(e,l,t)=>{t.d(l,{h:()=>s,j:()=>n});var i=t(17690),a=t(15335);const s=["Admin","manager"],n={initialState:{name:"",groupTypeId:"",supplierTypeId:"",countryId:233,territoryId:2,emailAddress:"",website:"",note:"",taxId:"",dbaName:"",responsibleUserId:"",supplierNoteId:"",incotermId:11},formFields:[{id:"attachment",lable:"Supplier Logo",Field_Name:"Attachment",fieldType:a.Q.IMAGE,dataField:"attachment",fieldSetting:{placeholder:"Upload Attachment",allowSpace:!0,isImageUpload:!0,isButtonVisible:!0,isCustomButtonVisible:!1,acceptedFiles:".png , .jpg "},style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-4 col-4 mb-input mb-0 custom-file-upload-section customer-logo-sec"}},{id:"name",lable:"Supplier Name ",Field_Name:"Supplier Name",fieldType:a.Q.INPUT,dataField:"name",fieldSetting:{placeholder:"Enter Supplier Name",allowSpace:!0,maxLength:50,exemptBoundarySpaces:!0},validation:[{type:"require"},{type:"uniqueName"}],style:{containerCss:"col-xxl-8 col-xl-8 col-md-8 col-12 mb-input"},inputButtonGroupConfig:{isPrimaryButtonVisible:!1,infoButtonConfig:{isInfoButtonVisible:!0,infoButtonIcon:"fa-search",infoButtonTooltip:"Customer Information"}}},{id:"dbaName",lable:"Doing Business As Name ",Field_Name:"Doing Business As Name",fieldType:a.Q.INPUT,dataField:"dbaName",fieldSetting:{placeholder:"Doing Business As Name",allowSpace:!0,maxLength:50},style:{containerCss:"col-xxl-6 col-xl-4 col-md-4 col-12 mb-input"}},{id:"taxId",lable:"Tax Id ",Field_Name:"Tax Id",fieldType:a.Q.INPUT,dataField:"taxId",fieldSetting:{placeholder:"Tax Id",allowSpace:!0,minLength:10,maxLength:10},inputIcon:{isIconShow:!0,faIcon:"fa-info-circle",message:i.n.DefaultUSATaxId},style:{containerCss:"col-xxl-6 col-xl-4 col-md-4 col-12 mb-input"}},{id:"emailAddress",lable:"Email ",Field_Name:"Email",fieldType:a.Q.INPUT,dataField:"emailAddress",fieldSetting:{placeholder:"Enter Email",allowSpace:!1,maxLength:65},validation:[{type:"require"},{type:"email"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-input"}},{id:"website",lable:"Website ",Field_Name:"Website",fieldType:a.Q.INPUT,dataField:"website",fieldSetting:{placeholder:"https://www.xyz.com",allowSpace:!1,maxLength:250},validation:[{type:"require"},{type:"website"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-input"}},{id:"groupTypeId",lable:"Group Type ",Field_Name:"Group Type",fieldType:a.Q.SELECT,dataField:"groupTypeId",fieldSetting:{placeholder:"Select Group Type",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input"}},{id:"territoryId",lable:"Territory ",Field_Name:"Territory",fieldType:a.Q.SELECT,dataField:"territoryId",fieldSetting:{placeholder:"Select Territory",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input"}},{id:"countryId",lable:"Country ",Field_Name:"Country",fieldType:a.Q.SELECT,dataField:"countryId",fieldSetting:{placeholder:"Select Country",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-4 col-xl-4 col-md-4 col-12 mb-input"}},{id:"supplierTypeId",lable:"Supplier Type ",Field_Name:"Supplier Type",fieldType:a.Q.SELECT,dataField:"supplierTypeId",fieldSetting:{placeholder:"Select Supplier Type",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-4 col-md-4 col-12 mb-input"}},{id:"incotermId",lable:"Incoterm",Field_Name:"Incoterm",fieldType:a.Q.SELECT,dataField:"incotermId",fieldSetting:{placeholder:"Select Incoterm",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-4 col-md-4 col-12 mb-input"}},{id:"note",lable:"Notes ",Field_Name:"Notes",fieldType:a.Q.CKEDITOR,dataField:"note",fieldSetting:{placeholder:"Enter Notes",maxLength:1e3},style:{containerCss:"col-xxl-6 col-xl-6 col-md-12 col-12 mb-input mb-0"}}],formSetting:{isViewOnly:!1}}},260:(e,l,t)=>{t.r(l),t.d(l,{default:()=>F});var i=t(11030),a=t(10723),s=t(27565),n=t(69885),o=t(19888),r=t(60497),d=t(18637),c=t(17295),u=t(67724),p=t(94839),m=t(13399),g=t(84464),S=t(15889),h=t(15269),f=t(74573),b=t(65748),x=t(5022),I=t(3514),y=t(1933),C=t(19045),T=t(62360),A=t(53941),v=t(56091),E=t(58412),N=t(70391),L=t(27929);const R=s.lazy((()=>Promise.all([t.e(7204),t.e(6774),t.e(4555)]).then(t.bind(t,648)))),F=e=>{let{statusId:l,configFile:t,handleChange:F,handleKeyPress:w,search:j,handleChangeDropdown:U,statusOptions:B,selectedDrpvalues:O,searchStatusFilter:P,handleSearch:D,handleClear:k,shouldRerenderFormCreator:_}=e;const Q=(0,s.useRef)(),q=(0,s.useRef)(),V=(0,s.useRef)(),z=(0,i.Zp)(),[M,W]=(0,s.useState)(0),[K,G]=(0,s.useState)(),[Z,H]=(0,s.useState)(!1),[J,X]=(0,s.useState)(C.n),[$,Y]=(0,s.useState)(),[ee,le]=(0,s.useState)(),[te,ie]=(0,s.useState)(),ae=(0,a.d4)((e=>e.auth)),{supplierListRef:se}=(0,s.useContext)(m.A),[ne,oe]=(0,s.useState)(),{isResponsibleUser:re,setIsResponsibleUser:de}=(0,s.useContext)(g.A),[ce,{isSuccess:ue,data:pe}]=(0,y.qP)(),[me,{isLoading:ge,isSuccess:Se,data:he}]=(0,y.uf)(),[fe,{isSuccess:be,data:xe}]=(0,y.pb)(),[Ie,{isLoading:ye,isSuccess:Ce,data:Te}]=(0,y.j5)(),[Ae,{isSuccess:ve,data:Ee}]=(0,x.KJ)(),[Ne]=(0,I.Tm)();(0,s.useEffect)((()=>{Ae()}),[l]),(0,s.useEffect)((()=>{if(ve&&Ee){const e=Ee.filter((e=>null===e.roleName||!v.h.map((e=>e.toLowerCase())).includes(e.roleName.toLowerCase()))),l=Array.from(new Map(e.map((e=>[e.fullName,e]))).values());(0,E.Xh)(l,"userId","fullName",C.n,"responsibleUserId")}}),[ve,Ee]),(0,s.useEffect)((()=>{ue&&pe&&b.A.success(pe.errorMessage)}),[ue,pe]),(0,s.useEffect)((()=>{Le()}),[t]);const Le=()=>{const e=null===t||void 0===t?void 0:t.columns.find((e=>"Action"===e.name)),l=null===t||void 0===t?void 0:t.columns.find((e=>"Approve"===e.name));if(e){const l=(0,h.T)(o.o.EDITSUPPLIER),t=(0,h.T)(o.o.BLOCKSUPPLIER),i=(0,h.T)(o.o.FREEZESUPPLIER),a=(0,h.T)(o.o.DISABLESUPPLIER),s=(0,h.T)(o.o.UNBLOCKSUPPLIER);e.defaultAction&&(e.defaultAction.allowEdit=null===l||void 0===l?void 0:l.hasAccess),e.customAction=(0,N.V)(null===t||void 0===t?void 0:t.hasAccess,e.customAction,"ALLOWBLOCKED"),e.customAction=(0,N.V)(null===i||void 0===i?void 0:i.hasAccess,e.customAction,"ALLOWFREEZE"),e.customAction=(0,N.V)(null===a||void 0===a?void 0:a.hasAccess,e.customAction,"ALLOWDISABLE"),e.customAction=(0,N.V)(null===s||void 0===s?void 0:s.hasAccess,e.customAction,"ALLOWUNBLOCKED")}l&&l.colSettings&&(l.colSettings.isDisabled=!0),re&&l&&l.colSettings&&(l.colSettings.isDisabled=!1)};(0,s.useEffect)((()=>{if(Se&&he){if(he){he.dataSource.find((e=>{var l;return(0,A.r)(e.responsibleUserId===(null===ae||void 0===ae||null===(l=ae.user)||void 0===l?void 0:l.userID))}))?(de(!0),Le()):de(!1);const e=he.dataSource.map((e=>({...e,taxId:""===e.taxId?"-":e.taxId})));G(e)}he.totalRecord&&W(he.totalRecord)}}),[Se,he]),(0,s.useEffect)((()=>{if(be&&xe){b.A.success(xe.errorMessage);const e=V.current.getCurrentPageObject();Re(e,V.current.generateSortingString())}}),[be,xe]),(0,s.useEffect)((()=>{if(Ce&&Te){b.A.success(Te.errorMessage);const e=V.current.getCurrentPageObject();Re(e,V.current.generateSortingString()),Fe()}}),[Ce,Te]),(0,s.useImperativeHandle)(se,(()=>({getListApi:Re})));const Re=(e,t)=>{const i=e||V.current.getCurrentPageObject(),a=t||V.current.generateSortingString(),s={pagination:{pageNumber:i.pageNumber,pageSize:i.pageSize},filters:{searchText:j},statusId:Array.isArray(l)?l.join(","):String(l),sortString:a};me(s)},Fe=()=>{H(!1),je()},we=()=>{const e=(0,S.G)(J,["responsibleUserId"]);X(e)},je=()=>{let e={...C.n};e.initialState={...J},X(e)},Ue=e=>{let l={supplierId:$,userId:String(e)};ce(l)},Be={EDIT:e=>{z(`/SupplierDetails/${(0,f.rS)(e.supplierId)}`,"_blank")},ALLOWFREEZE:e=>{we(),H(!0),Y(e.supplierId),le(p.RR.Freeze),ie(p.Rm.Freeze)},ALLOWDISABLE:e=>{we(),H(!0),Y(e.supplierId),le(p.RR.Disable),ie(p.Rm.Disable)},ALLOWBLOCKED:e=>{we(),H(!0),Y(e.supplierId),le(p.RR.Block),ie(p.Rm.Block)},ALLOREJECT:e=>{const l=K.find((l=>l.supplierId===e.supplierId));H(!0),oe(!1),Y(e.supplierId),le(p.RR.Reject),ie(p.Rm.Reject),l.responsibleUserId&&(we(),oe(!0))}};return(0,L.jsx)("div",{children:(0,L.jsxs)("div",{className:"row",children:[(0,L.jsxs)("div",{className:"col-xxl-12 col-xl-12 col-md-12 col-12",children:[(0,L.jsx)(c.default,{searchInput:!0,handleChange:F,searchInputName:"Search By Supplier Name, Tax Id , Email Address",searchFilter:P,handleChangeDropdown:U,selectedOptions:O,optionsValue:B,isMultiSelect:!0,placeholder:"Search by Status",isCardSection:!0,isdropdownOpen:!0,searchButton:!0,searchbuttonText:"Search",buttonClassName:"theme-button",searchTitleButtonClick:D,clearButton:!0,clearTitleButtonClick:k,clearButtonText:"Clear",clearButtonClassName:"dark-btn",searchIconImg:n.m.SearchIcone,searchTextWithIcon:!0,clearTextWithIcon:!0,clearIconImg:n.m.ClearIcone,handleKeyPress:w,children:(0,L.jsx)("div",{className:"row",children:(0,L.jsx)("div",{className:"col-md-12 table-striped",children:(0,L.jsx)(T.A,{ref:V,configuration:t,dataSource:K,isLoading:ge,pagination:{totalCount:M,pageSize:25,currentPage:1},onPageChange:(e,t)=>{const i=t||V.current.generateSortingString(),a={pagination:{pageNumber:e.pageNumber,pageSize:e.pageSize},filters:{searchText:j},statusId:Array.isArray(l)?l.join(","):String(l),sortString:i};me(a)},onSorting:e=>{Re(V.current.getCurrentPageObject(),e)},onActionChange:Be,allowPagination:!0,onCellDataChange:e=>{Q.current&&Q.current.callChildFunction(e.supplierId),Y(e.supplierId)}})})})}),Z&&(0,L.jsx)(u.A,{showModal:Z,handleToggleModal:Fe,modalTitle:te+" "+"Reason",modelSizeClass:"w-50s",children:(0,L.jsxs)("div",{className:"row",children:[(0,L.jsx)(d.A,{config:J,ref:q,...J}),(0,L.jsx)("div",{className:"col-md-12 mt-2",children:(0,L.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,L.jsxs)("div",{className:"d-flex align-item-end",children:[(0,L.jsx)(r.A,{buttonTypeClassName:"theme-button",buttonText:"Update",isLoading:ye,onClick:()=>{let e=q.current.getFormData();if(e){let l={...e,supplierId:$,statusId:ee,note:e.inActiveReason};Ie(l),Ne(l),!ne&&e.responsibleUserId&&e.responsibleUserId&&Ue(e.responsibleUserId)}}}),(0,L.jsx)(r.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:Fe})]})})})]})})]},_),(0,L.jsx)(R,{childRef:Q,getListApi:Re,updateApproval:()=>{fe({supplierId:$})}})]})})}},70391:(e,l,t)=>{t.d(l,{V:()=>i});const i=(e,l,t)=>{var i,a;const s=l&&(null===(i=l)||void 0===i?void 0:i.some((e=>(null===e||void 0===e?void 0:e.name)===t))),n=l&&(null===(a=l)||void 0===a?void 0:a.some((e=>(null===e||void 0===e?void 0:e.name)===t)));var o;s&&!1===e?l=null===(o=l)||void 0===o?void 0:o.filter((e=>(null===e||void 0===e?void 0:e.name)!==t)):!s&&n&&(l=[...l||[],l.find((e=>(null===e||void 0===e?void 0:e.name)===t))]);return l}},53941:(e,l,t)=>{t.d(l,{r:()=>i});const i=(e,l)=>{if(!e||!l)return!1;const t=e.toString().split(",").map((e=>e.trim())),i=l.toString();return t.includes(i)}}}]);
//# sourceMappingURL=260.e4bbd025.chunk.js.map