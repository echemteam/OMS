"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[9786],{79786:(e,l,s)=>{s.r(l),s.d(l,{default:()=>d});var a=s(27565),t=s(14490),n=s(60497),i=s(69885),r=s(42265),c=s(27929);const d=e=>{let{type:l=r.G.FILE,name:s="",placeholder:d=`Please Enter ${s}`,filename:o,onChange:u,onClear:m,onBlur:p,cssClass:f="input-field",isDisable:x,isButtonVisible:h,acceptedFiles:b,isCustomButtonVisible:j}=e;const g=(0,a.useRef)(),[C,N]=(0,a.useState)(),F=()=>{m&&(g.current.value=null,o=null,N(null),m())};return(0,a.useEffect)((()=>{if(o&&"object"===typeof o){const e=o.base64Data?o.base64Data:o.name||o.fileName;N(e)}else o?N(o):(g.current.value=null,N(null),F())}),[o]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"form-field custom-file-uploader "+(x?"field-disabled":""),children:[(0,c.jsx)("input",{ref:g,id:s,name:s,filename:C||null,type:l||"file",className:f,placeholder:d,onChange:e=>{u&&u(e);const l=new FileReader;l.readAsDataURL(e.target.files[0]),l.onload=e=>{N(l.result)}},onBlur:p,disabled:x,accept:b}),(0,c.jsxs)("div",{className:"custom-file-selector-design",children:[C?null:(0,c.jsx)(t.A,{imagePath:i.m.Uploaddocumenticon,altText:"Please Upload File"}),C?(0,c.jsx)("img",{src:C,alt:"Uploaded File"}):(0,c.jsxs)("div",{className:"drag-drop-txt",children:[(0,c.jsx)("p",{children:"Drag & Drop Your Image"}),""===b?(0,c.jsx)("span",{className:"small-txt",children:"All File Formats we support"}):(0,c.jsxs)("span",{className:"small-txt",children:[b,"Formats we support"]})]}),j&&(0,c.jsx)("div",{className:"row clear-buttons clear-btn-sec",children:C&&(0,c.jsx)(n.A,{buttonTypeClassName:"btn dark-btn",buttonText:"Clear",onClick:F})})]}),h&&(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("div",{className:"row clear-buttons",children:C&&(0,c.jsx)("span",{className:"dark-btn",onClick:F,children:"X"})})})]})})}}}]);
//# sourceMappingURL=9786.947ed34a.chunk.js.map