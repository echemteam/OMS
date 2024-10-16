"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[1551,1605],{67724:(e,s,t)=>{t.d(s,{A:()=>c});t(27565);var n=t(85097),l=t(27929);const c=e=>{let{isApprovalValidate:s,showModal:t,handleToggleModal:c,children:a,...o}=e;return(0,l.jsxs)(n.A,{className:`center-model-popup ${o.modelSizeClass}`,show:t,onHide:c,keyboard:!s,backdrop:!s||"static",children:[(0,l.jsx)(n.A.Header,{closeButton:!s,children:(0,l.jsx)("div",{className:"model-title",children:o.modalTitle})}),(0,l.jsx)(n.A.Body,{children:a})]})}},61551:(e,s,t)=>{t.r(s),t.d(s,{default:()=>D});var n=t(27565),l=t(17295),c=t(35263),a=t(14490),o=t(69885),i=t(67724),r=t(60497),d=t(18637);const m={name:"Document Form",initialState:{attachment:""},formFields:[{id:"attachment",lable:"Attachment ",Field_Name:"Attachment",fieldType:t(15335).Q.FILE,dataField:"attachment",fieldSetting:{placeholder:"Upload Attachment",allowSpace:!0,isButtonVisible:!1,isCustomButtonVisible:!0,acceptedFiles:".pdf , .docx ",isFileNameCleared:!0,isMultiple:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section"}}]};t(31785);var u=t(69377),h=t(65748),x=t(17690),p=t(55711),f=t(39973),j=t(27929);const v=e=>{switch(e){case"pdf":return o.m.PdfIcon;case"doc":case"docx":return o.m.DocIcon;case"xls":case"xlsx":return o.m.XlsIcon;case"ppt":case"pptx":return o.m.PptIcon;case"csv":return o.m.CsvIcon;case"zip":case"rar":return o.m.ZipIcon;default:return o.m.defaultFileIcon}},g=e=>{let{orderDetails:s,onClose:t,onSuccess:l}=e;const a=(0,n.useRef)(),[o,i]=(0,n.useState)([]),[g,N]=(0,n.useState)([]),[C,{isLoading:A,isSuccess:b,data:w}]=(0,f.gE)();(0,n.useEffect)((()=>{if(b&&w){if(w.errorMessage.includes("exists"))return void h.A.warning(w.errorMessage);h.A.success(w.errorMessage),l()}}),[b,w]);const D={DDL_FILE:e=>{const s=e.split(", ").map((e=>({documentName:e,documentType:2,extension:(e=>{const s=e.split(".");return s.length>1?s.pop().toLowerCase():""})(e)})));N((e=>[...e,...s]))}};return(0,j.jsxs)("div",{className:"row add-order-doc-se",children:[(0,j.jsx)(d.A,{config:m,ref:a,onActionChange:D,onFormDataChange:e=>{i((s=>[...s,...null===e||void 0===e?void 0:e.attachment]))}}),(0,j.jsxs)("table",{className:"custom-table mt-4",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{}),(0,j.jsx)("th",{children:"Name"}),(0,j.jsx)("th",{children:"Action"})]})}),(0,j.jsx)("tbody",{children:0===g.length?(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:"3",children:(0,j.jsx)(u.A,{})})}):g.map(((e,s)=>(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:(0,j.jsx)("img",{src:v(e.extension),alt:e.documentName,className:"file-icon"})}),(0,j.jsxs)("td",{children:[" ",(0,j.jsx)(p.default,{type:"text",value:e.documentName,onChange:e=>((e,s)=>{N((t=>t.map(((t,n)=>n===e?{...t,name:s}:t))))})(s,e.target.value)})]}),(0,j.jsx)("td",{children:(0,j.jsxs)("button",{onClick:()=>(e=>{N((s=>s.filter(((s,t)=>t!==e)))),i((s=>s.filter(((s,t)=>t!==e))))})(s),className:"delete-button",children:[" ",(0,j.jsx)(c.A,{icon:"mingcute:delete-2-line",className:"delete-icon-model"})]})})]},s)))})]}),(0,j.jsxs)("div",{className:"d-flex align-item-end justify-content-end mt-3",children:[(0,j.jsx)(r.A,{buttonTypeClassName:"theme-button",isLoading:A,buttonText:"Save",onClick:async()=>{if(g.length>0&&o.length>0){const e=g.map(((e,s)=>{const t=o.find(((e,t)=>t===s));return{...e,base64File:t?t.base64Data:null}}));if(e.every((e=>e.documentName&&e.base64File&&null!==e.documentType))){const t={orderId:s.orderId,storagePath:"Order",documentOrderList:e};C(t)}else h.A.warning(x.K.DocumentDetailMissing)}}}),(0,j.jsx)(r.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:t})]})]})};var N=t(79742),C=t(37204),A=t.n(C),b=t(38860),w=t(80889);const D=e=>{let{orderDetails:s,onRefreshOrderDetails:t,isOrderDetailsFetching:r}=e;const[d,m]=(0,n.useState)(null),[x,p]=(0,n.useState)(!1),[v,C]=(0,n.useState)([]),[D,I]=(0,n.useState)(null),[y,F]=(0,n.useState)(!1),{confirm:S}=(0,w.A)(),[T,{isSuccess:k,data:L}]=(0,f.GE)(),[M,{isFetching:O,isSuccess:P,data:E}]=(0,f.zR)();(0,n.useEffect)((()=>{null!==s&&void 0!==s&&s.orderDocumentList&&m(s.orderDocumentList)}),[s]),(0,n.useEffect)((()=>{k&&L&&(h.A.success(L.errorMessage),B())}),[k,L]);const B=()=>{z(),t&&t()},z=()=>{p(!1)};(0,n.useEffect)((()=>{if(!O&&P&&E){const e=E.fileData,s=new Blob([e],{type:e.type}),t=URL.createObjectURL(s);I(t),F(!0),C((e=>{switch(e.split(".").pop().toLowerCase()){case"pdf":return"pdf";case"docx":return"docx";case"ppt":case"pptx":return"pptx";case"xlsx":return"xlsx";case"csv":return"csv";case"xls":return"xls";case"doc":return"doc";default:return null}})(E.fileName))}}),[O,P,E]);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{children:(0,j.jsx)(l.default,{cardTitle:"Order Documents",rightButton:!0,buttonClassName:"theme-button",isIcon:!0,iconClass:"heroicons-solid:plus",titleButtonClick:()=>{p(!0)},children:(0,j.jsx)("div",{className:"document-list",children:(0,j.jsx)("div",{className:"row",children:r?(0,j.jsx)(b.A,{}):(0,j.jsx)(j.Fragment,{children:d&&d.length>0?(0,j.jsx)(j.Fragment,{children:null===d||void 0===d?void 0:d.map((e=>{if(e.documentName){const t=(e=>{switch(e){case"pdf":return o.m.PdfIcon;case"doc":case"docx":return o.m.DocIcon;case"xls":case"xlsx":return o.m.XlsIcon;case"ppt":case"pptx":return o.m.PptIcon;case"csv":return o.m.CsvIcon;case"zip":case"rar":return o.m.ZipIcon;default:return o.m.defaultFileIcon}})((e=>{const s=e.split(".");return s.length>1?s.pop().toLowerCase():""})(e.documentName));return(0,j.jsx)("div",{className:"col-12",children:(0,j.jsx)("div",{className:"document-view-sec",children:(0,j.jsxs)("div",{className:"file-item",children:[(0,j.jsxs)("div",{className:"left-sec",children:[(0,j.jsx)(a.A,{imagePath:t,alt:"Document Icon"})," ",(0,j.jsx)("div",{className:"file-name",children:e.documentName})]}),(0,j.jsxs)("div",{className:"file-actions order-document",children:[(0,j.jsx)("div",{onClick:()=>(e=>{I(null);let t={folderName:"Order",keyId:null===s||void 0===s?void 0:s.orderId,fileName:e};M(t)})(e.documentName),className:"btn-part pdf-view",title:"View Order Document",children:O?(0,j.jsx)(c.A,{icon:"mdi:loading"}):(0,j.jsx)(c.A,{icon:"icomoon-free:file-pdf",className:"swap-icon"})}),(0,j.jsx)("div",{onClick:()=>{return s=e.orderDocumentId,void S("Delete?","Are you sure you want to Delete?","Delete","Cancel").then((e=>{e&&T(s)}));var s},className:"btn-part delete-icon",children:(0,j.jsx)(c.A,{icon:"mi:delete",className:"swap-icon"})})]})]})})},e.documentName)}return null}))}):(0,j.jsx)(u.A,{})})})})})}),(0,j.jsx)(i.A,{showModal:x,handleToggleModal:z,modalTitle:"Add Multiple Order Document",modelSizeClass:"w-50s",children:(0,j.jsx)(g,{orderDetails:s,onClose:z,onSuccess:B})}),(0,j.jsx)(N.default,{modalTitle:"PO PDF",contentClass:"content-50",onClose:()=>{F(!1),I(null)},modalTitleIcon:o.m.AddIcon,isOpen:y,showToggle:!0,children:(0,j.jsx)("div",{className:"model-height-fix doc-view",children:D&&v?"pdf"===v?(0,j.jsx)("div",{className:"pdf-iframe",children:(0,j.jsx)("iframe",{src:D,title:"PDF Preview",style:{width:"100%",height:"200%"}})}):(0,j.jsx)(A(),{fileType:v,filePath:D,onError:e=>console.error("Error:",e)}):null})})]})}},31785:()=>{}}]);
//# sourceMappingURL=1551.e1992b80.chunk.js.map