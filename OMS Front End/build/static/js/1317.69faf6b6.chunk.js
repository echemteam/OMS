"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[1317],{64093:(e,a,t)=>{t.r(a),t.d(a,{default:()=>x});var l=t(27565),n=t(69377),s=(t(63811),t(6352)),i=t(76969),c=t(38860),r=t(76236),m=(t(3413),t(92091),t(59617)),o=t(60497),d=t(65748),h=t(69885),u=t(27929);const x=()=>{const[e,a]=(0,l.useState)([]),[t,x]=(0,l.useState)([]),[v,f]=(0,l.useState)(""),[g,{isLoading:D,isSuccess:p,data:j}]=(0,s.dA)(),[N,b]=(0,l.useState)({fromDate:null,toDate:null});(0,l.useEffect)((()=>{S(1)}),[]);const S=e=>{const a={pagination:{pageNumber:e,pageSize:25},filters:{searchText:""},eventName:v.length>0?v.join(","):null,fromDate:N.fromDate?(0,i.Ay)(N.fromDate,"YYYY-MM-DD"):null,toDate:N.toDate?(0,i.Ay)(N.toDate,"YYYY-MM-DD"):null,sortString:""};g(a)};(0,l.useEffect)((()=>{if(p&&j){a(j.dataSource);const e=[...new Set(j.dataSource.map((e=>e.eventName)))].map((e=>({value:e,label:e})));x(e)}}),[p,j]);return(0,u.jsx)("div",{className:"row",children:(0,u.jsx)("div",{className:"col-md-12",children:(0,u.jsx)("div",{className:"main-card",children:(()=>{if(D)return(0,u.jsx)("div",{children:(0,u.jsx)(c.A,{})});return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("h4",{className:"organization-tab-title",children:"History"}),(0,u.jsx)("div",{className:"serach-bar-history",children:(0,u.jsx)("div",{className:"card w-100",children:(0,u.jsxs)("div",{className:"d-flex align-items-start",children:[(0,u.jsx)("div",{className:"pr-0 name-field",children:(0,u.jsx)(m.default,{placeholder:"Search By Event Name",options:t,value:v,onChange:e=>{const a=e?e.map((e=>e.value)):[];f(a)},isMultiSelect:!0,closeMenuOnSelect:!1})}),(0,u.jsx)("div",{className:"custom-datepicker date-field input-padding-comman mb-4 ml-5",children:(0,u.jsx)(r.A,{onChange:e=>{if(e&&2===e.length){const a=e[0],t=e[1];b({fromDate:a,toDate:t})}else b({fromDate:null,toDate:null})},value:[N.fromDate,N.toDate],clearIcon:(0,u.jsx)("i",{className:"fa fa-times",onClick:e=>{b({fromDate:null,toDate:null});g({pagination:{pageNumber:e,pageSize:25},filters:{searchText:""},fromDate:null,toDate:null,sortString:""})}}),dayPlaceholder:"DD",monthPlaceholder:"MM",yearPlaceholder:"YYYY"})}),(0,u.jsxs)("div",{className:"refresh-btn-history pl-0 ml-2",children:[(0,u.jsx)(o.A,{buttonTypeClassName:"theme-button",buttonText:"Search",onClick:()=>{N.fromDate&&N.toDate||v.length>0?S(1):d.A.warning("Please select value ")},imagePath:h.m.SearchIcone,textWithIcon:!0}),(0,u.jsx)(o.A,{buttonTypeClassName:"dark-btn ml-2",buttonText:"Clear",onClick:()=>{f(""),b({fromDate:null,toDate:null});g({pagination:{pageNumber:1,pageSize:25},filters:{searchText:""},eventName:null,fromDate:null,toDate:null})},imagePath:h.m.ClearIcone,textWithIcon:!0})]})]})})}),0===e.length?(0,u.jsx)(n.A,{}):(0,u.jsx)("div",{className:"vertical-timeline vertical-timeline--animate vertical-timeline--one-column",children:e.map(((e,a)=>{const t=e.changeAt?(0,i.Ay)(e.changeAt,"MM/DD/YYYY hh:mm A"):"";return(0,u.jsx)("div",{className:"vertical-timeline-item vertical-timeline-element",children:(0,u.jsxs)("div",{children:[(0,u.jsx)("span",{className:"vertical-timeline-element-icon bounce-in",children:(0,u.jsx)("i",{className:"badge badge-dot badge-dot-xl badge-primary",children:" "})}),(0,u.jsxs)("div",{className:"vertical-timeline-element-content bounce-in",children:[(0,u.jsx)("h4",{className:"timeline-title",children:(0,u.jsx)("span",{className:"mr-1",children:e.eventName})}),(0,u.jsxs)("p",{children:[e.description," by ",e.name]}),(0,u.jsx)("span",{className:"vertical-timeline-element-date",children:t})]})]})},e.organizationHistoryId||a)}))})]})})()})})})}}}]);
//# sourceMappingURL=1317.69faf6b6.chunk.js.map