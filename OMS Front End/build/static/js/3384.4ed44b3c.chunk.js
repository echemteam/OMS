"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[3384],{11003:(e,t,s)=>{s.r(t),s.d(t,{default:()=>u});var a=s(27565),l=s(14490),i=s(60497),n=s(69885),r=s(38860),c=s(67724),d=s(74573),o=s(65748),m=s(27929);const u=e=>{let{parentRef:t,handleValidateSuccess:s,validateCheckList:u,handleDone:h,showModal:g,handleShowValidateModal:p,handleValidateModalClose:C,isGetCheckListLoading:x,mainId:v,isDetailPage:j,isSupplierApproval:b,isShowBothButton:f}=e;const S=(0,a.useRef)(null),[k,A]=(0,a.useState)(0),[T,w]=(0,a.useState)([]),[y,N]=(0,a.useState)(!1),[V,M]=(0,a.useState)(!1);(0,a.useEffect)((()=>{if(u.length>0&&k<u.length){const e=setTimeout((()=>{w((e=>[...e,u[k]])),A((e=>e+1))}),500);return k===u.length-1&&D(),()=>clearTimeout(e)}}),[k,u]),(0,a.useEffect)((()=>{A(0),w([]),N(!1),M(!1)}),[g]);const P=e=>{const t=new RegExp(`\\b(${["Tax Id","Billing Address","Shipping Address","Invoice Submission Contact","Shipping Setting","Responsible User","Accounts Payable Contact","Invoice Follow-up Contact","Delivery Method","Delivery Carrier Method","Payment Terms","Payment Method","Credit Limit","Billing Currency","Physical Address","Remittance Address","Primary Contact","Purchase Order Contact","Accounts Receivable Contact","Purchase order delivery","Credit Card Notes","Check Mailing Address","Financial Settings Bank Address"].join("|")})\\b`,"g");return e.replace(t,'<strong class="bold-text validate-title">$1</strong>')},D=()=>{if(T.length===u.length){T.some((e=>!1===e.isValid))?(N(!1),M(!0)):(N(!0),M(!1))}else N(!1),M(!0)};(0,a.useEffect)((()=>{S.current&&(S.current.scrollTop=S.current.scrollHeight),T.length>0&&D()}),[T]);const I=()=>{T.some((e=>!1===e.isValid))?o.A.warning("Please fill the "):s()};return(0,a.useImperativeHandle)(t,(()=>({validateApprovalCheckList:I}))),(0,m.jsx)(m.Fragment,{children:g&&(0,m.jsx)(c.A,{modalTitle:"Validate Customer Information",showModal:g,handleToggleModal:p,modelSizeClass:"w-40 validation-center-model",isApprovalValidate:!0,children:x?(0,m.jsx)(r.A,{}):(0,m.jsxs)("div",{className:"Validate-card row",children:[(0,m.jsx)("div",{className:"col-12",children:(0,m.jsx)("div",{className:"customer-data-sec",children:(0,m.jsx)("div",{ref:S,className:"validation-list",children:(0,m.jsx)("ul",{children:T.map((e=>(0,m.jsxs)("li",{className:e.isValid?"success":"error",children:[(0,m.jsx)("span",{className:"tick-untick-img",children:(0,m.jsx)(l.A,{imagePath:e.isValid?n.m.RightTickIcon:n.m.UnTickIcon})}),(0,m.jsx)("span",{className:"validation-msg",dangerouslySetInnerHTML:{__html:P(e.messages)}})]},e.id)))})})})}),(0,m.jsx)("div",{className:"col-md-12 mt-lg-4",children:(0,m.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:(0,m.jsxs)("div",{className:"d-flex align-item-center",children:[f&&(0,m.jsxs)(m.Fragment,{children:[y?(0,m.jsx)(i.A,{buttonTypeClassName:"theme-button",buttonText:"Done",onClick:h}):null,!j&&V?(0,m.jsx)(i.A,{buttonTypeClassName:"theme-button ml-5",buttonText:b?"View Supplier Details":"View Customer Details",onClick:()=>{let e;e=b?`/SupplierDetails/${(0,d.rS)(v)}`:`/CustomerDetails/${(0,d.rS)(v)}`,window.open(e,"_blank")}}):null]}),(0,m.jsx)(i.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:C})]})})})]})})})}}}]);
//# sourceMappingURL=3384.4ed44b3c.chunk.js.map