"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[5698],{95698:(e,s,d)=>{d.r(s),d.d(s,{default:()=>l});var a=d(27565),i=d(28734),c=d(98389),n=d(35263),t=d(27929);const l=e=>{let{isModelOpen:s,mainId:d,getAddressById:l,isSubCustomer:r,approvalChekedData:o,handleCheckbox:h,isSupplierApproval:m}=e;const[p,f]=(0,a.useState)([!0]),[u,x]=(0,a.useState)([]),[I,C]=(0,a.useState)((null===o||void 0===o?void 0:o.isChecked)||!1),[N,{isFetching:j,isSuccess:k,data:v}]=l();(0,a.useEffect)((()=>{s&&d&&N(d)}),[s,d]),(0,a.useEffect)((()=>{if(!j&&k&&v){const e=m?[i.RX.PHYSICALADDRESSHQ,i.RX.REMITTANCEADDRESS]:r?[i.RX.SHIPPING]:[i.RX.BILLING,i.RX.SHIPPING],s=v.map((e=>({...e,isChecked:!1}))).filter((s=>e.includes(s.addressTypeId))),d=v.filter((s=>e.includes(s.addressTypeId)));x(m?d:s)}}),[j,k,v]),(0,a.useEffect)((()=>{if(u&&u.length>0){u.every((e=>e.isChecked))?(h("addressInformation",!0),C(!0)):(C(!1),h("addressInformation",!1))}}),[u]);const S=(e,s)=>{const d=u.map((d=>d.addressId===e?{...d,isChecked:s}:d));x(d)};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"card-top-title "+(p[0]?"active":""),onClick:()=>(e=>{const s=[...p];s[e]=!s[e],f(s)})(0),children:(0,t.jsxs)("div",{className:"d-flex align-items-center mr-2",children:[(0,t.jsx)("span",{children:(0,t.jsx)(n.A,{icon:"ep:arrow-down-bold",className:"open-bar"})}),(0,t.jsx)("h5",{children:" Address Information "})]})}),p[0]&&(0,t.jsx)("div",{className:"card-info-checklist",children:u&&u.map(((e,s)=>(0,t.jsxs)("div",{className:"address-card-part",children:[(0,t.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,t.jsx)("h6",{className:"title",children:e.type}),(0,t.jsx)(c.A,{name:e.addressId,dataField:e.addressId,checked:e.isChecked,onChange:S})]}),(0,t.jsx)("h6",{className:"add-line-desc",children:e.addressLine1}),(0,t.jsx)("p",{className:"add-line-desc",children:e.isPreferredBilling}),(0,t.jsxs)("p",{className:"add-line-desc",children:[e.cityName,","," ",e.stateCode?e.stateCode:e.stateName," ",e.zipCode,(0,t.jsx)("div",{children:e.countryName})]})]},s)))})]})}}}]);
//# sourceMappingURL=5698.9e5ec8b9.chunk.js.map