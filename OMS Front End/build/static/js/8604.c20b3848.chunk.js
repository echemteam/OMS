"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[8604],{98604:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var c=n(27565),s=n(38860),a=n(69377),r=n(27929);const i=c.lazy((()=>Promise.all([n.e(8145),n.e(5097),n.e(7164)]).then(n.bind(n,7164)))),o=(0,c.forwardRef)((e=>{let{keyId:t,handleEdit:n,showEditIcon:o,getListRef:d,getContactByKeyId:l,selectedContactTypeId:u,search:h,isSupplier:f,getCompletionCount:m,isEditablePage:p,SecurityKey:g}=e;const y=(0,c.useRef)(),[E,I]=(0,c.useState)([]),[C,w]=(0,c.useState)(null),[x,{isFetching:S,isSuccess:j,data:v}]=l();(0,c.useEffect)((()=>{((e,t)=>{if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0})(y.current||[],u)||L(),y.current=u}),[t,u]);const b=(0,c.useRef)([]),k=e=>{C&&b.current[C]&&!b.current[C].contains(e.target)&&w(null)};(0,c.useEffect)((()=>(document.addEventListener("mousedown",k),()=>{document.removeEventListener("mousedown",k)})),[C]);const L=()=>{F({id:t,searchText:"",contactType:u||""})},F=e=>{let n={...e,contactType:u};t&&x(n)};return(0,c.useImperativeHandle)(d,(()=>({callChildListFunction:F}))),(0,c.useEffect)((()=>{!S&&j&&v&&I(v)}),[S,j,v]),(0,r.jsx)(c.Fragment,{children:S?(0,r.jsx)(s.A,{}):(0,r.jsx)(r.Fragment,{children:E&&E.length>0?(0,r.jsx)("div",{className:"contact-card-list custom-contact-card",children:E.map(((e,t)=>(0,r.jsx)(i,{contactItem:e,handleEdit:n,showEditIcon:o,openModalId:C,setOpenModalId:w,isSupplier:f,onGetContactList:L,getCompletionCount:m,isEditablePage:p,SecurityKey:g,ref:t=>b.current[e.contactId]=t},e.contactId)))}):(0,r.jsx)(a.A,{})})})}))}}]);
//# sourceMappingURL=8604.c20b3848.chunk.js.map