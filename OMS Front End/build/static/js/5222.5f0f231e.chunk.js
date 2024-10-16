"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[5222],{5222:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var a=n(27565);const i={columns:[{name:"Module Name",fieldName:"moduleName",colStyle:{width:"40%"},allowShort:!0},{name:"Functionality Name",fieldName:"functionalityName",colStyle:{width:"40%"},allowShort:!0},{name:"Action",colStyle:{width:"20%"},colType:n(79663).f.ACTION,defaultAction:{allowEdit:!1},customAction:[{name:"VIEWCONFIGURATION",iconName:"lets-icons:view",title:"View",className:"view-icon"}]}]};var o=n(96603),l=n(62360),c=n(27929);const s=e=>{const t=(0,a.useRef)(),[n,s]=(0,a.useState)(),[r,d]=(0,a.useState)(0),[u,{isLoading:m,isSuccess:g,data:f}]=(0,o._o)(),S=(t,n)=>{const a={pagination:{pageNumber:t.pageNumber,pageSize:t.pageSize},filters:{searchText:""},sortString:n,moduleId:e.moduleId};u(a)};(0,a.useEffect)((()=>{g&&f&&(f&&s(f.dataSource),f.totalRecord&&d(f.totalRecord))}),[g,f]),(0,a.useEffect)((()=>{if(t.current){const n=t.current.getCurrentPageObject(),a=t.current.generateSortingString(),i={pagination:{pageNumber:n.pageNumber,pageSize:n.pageSize},filters:{searchText:""},sortString:a,moduleId:e.moduleId};u(i)}}),[e.moduleId]);const h=()=>{if(t.current){const e=t.current.getCurrentPageObject();S(e,t.current.generateSortingString())}};(0,a.useImperativeHandle)(e.childRef,(()=>({callChildFunction:h})));const p={VIEWCONFIGURATION:t=>{e.onEdit&&e.onEdit(t)}};return(0,c.jsx)("div",{className:"row",children:(0,c.jsx)("div",{className:"col-md-12 table-striped api-provider",children:(0,c.jsx)(l.A,{ref:t,configuration:i,dataSource:n,allowPagination:!1,pagination:{totalCount:r,pageSize:25,currentPage:1},onPageChange:e=>{S(e,t.current.generateSortingString())},onSorting:e=>{S(t.current.getCurrentPageObject(),e)},isLoading:m,onActionChange:p})})})};const r={initialState:{name:""},formFields:[{id:"name",lable:"Name ",Field_Name:"name",fieldType:n(15335).Q.INPUT,dataField:"name",fieldSetting:{placeholder:"Enter name",allowSpace:!0,maxLength:100},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-6 mb-input"}}],formSetting:{isViewOnly:!1}};var d=n(60497),u=n(18637),m=n(65748),g=n(32813),f=n(633);const S=e=>{const t=(0,a.useRef)(),[n,i]=(0,a.useState)(r),[l,{isLoading:s,isSuccess:S,data:h}]=(0,o.ZI)();(0,a.useEffect)((()=>{if(S&&h){if(h.errorMessage.includes("exists"))return m.A.warning(h.errorMessage),void p();m.A.success(h.errorMessage),p(),e.onGetData()}}),[S,h]);(0,a.useEffect)((()=>{if((0,g.t)(n,i,null),e.initData){let t={...r};t.initialState={name:e.initData.functionalityName,functionalityId:e.initData.functionalityId?e.initData.functionalityId:0,moduleId:e.initData.moduleId?e.initData.moduleId:0},i(t)}}),[e.isOpen]);const p=()=>{(0,g.t)(n,i,null),e.onClose()};return(0,c.jsxs)("div",{className:"row mt-2 add-address-form",children:[(0,c.jsx)(u.A,{config:n,ref:t}),(0,c.jsx)("div",{className:"col-md-12 mt-2",children:(0,c.jsxs)("div",{className:"d-flex align-item-end justify-content-end",children:[(0,c.jsx)(d.A,{buttonTypeClassName:"theme-button",buttonText:"Save",onClick:()=>{const n=t.current.getFormData();if(n){let t={...n,functionalityId:e.initData.functionalityId?e.initData.functionalityId:0,moduleId:e.moduleId?e.moduleId:0};l(t)}},isLoading:s}),(0,c.jsx)(d.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:p})]})}),e.initData.functionalityId?(0,c.jsx)("div",{className:"mt-2",children:(0,c.jsx)(f.A,{functionalityId:e.initData.functionalityId})}):null]})};var h=n(17295),p=n(79742),N=n(69885),I=n(59617);const v=e=>{const[t,n]=(0,a.useState)([]),[i,l]=(0,a.useState)(null),[s,{isSuccess:r,data:d}]=(0,o.Ak)();(0,a.useEffect)((()=>{s()}),[s]),(0,a.useEffect)((()=>{if(r&&null!==d&&void 0!==d&&d.length){const e=d.map((e=>({value:e.moduleId,label:e.moduleName})));n(e)}}),[r,d]),(0,a.useEffect)((()=>{t.length>0&&!i&&u(t[0])}),[t]);const u=t=>{t&&(l(null===t||void 0===t?void 0:t.value),e.handleModuleID(null===t||void 0===t?void 0:t.value))};return(0,c.jsx)("div",{className:"row",children:(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsx)(I.default,{placeholder:"Select Module Name",options:t,value:i,onChange:u,isMultiSelect:!1,closeMenuOnSelect:!1})})})},x=()=>{const e=(0,a.useRef)(),[t,n]=(0,a.useState)(!1),[i,o]=(0,a.useState)(0),[l,d]=(0,a.useState)(!1),[u,m]=(0,a.useState)(r.initialState),g=()=>{n(!1),f()},f=()=>{let e={...r.initialState};m(e)};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(h.default,{cardTitle:"Module Selection",buttonClassName:"btn theme-button",children:(0,c.jsx)(v,{handleModuleID:e=>{o(e)}})}),i>0&&(0,c.jsxs)("div",{className:"functional-config",children:[(0,c.jsx)(h.default,{cardTitle:"Functional Configuration",textWithIcon:!0,iconImg:N.m.PlusIcon,titleButtonClick:()=>{n(!0),d(!1)},children:(0,c.jsx)(s,{moduleId:i,childRef:e,onEdit:e=>{f(),m(e),d(!0),n(!0)}})}),(0,c.jsx)(p.default,{modalTitle:(l?"Update":"Add")+" Functional Configuration",contentClass:"content-70",onClose:g,modalTitleIcon:N.m.AddIcon,isOpen:t,children:(0,c.jsx)(S,{initData:u,isEdit:l,onGetData:()=>{e.current&&e.current.callChildFunction()},isOpen:t,moduleId:i,onClose:g})})]})]})}},633:(e,t,n)=>{n.d(t,{A:()=>r});var a=n(27565);const i={columns:[{name:"functionality",fieldName:"functionalityName",colStyle:{width:"20%"},allowShort:!0},{name:"event",fieldName:"eventName",colStyle:{width:"25%"},allowShort:!0},{name:"event Date",colStyle:{width:"20%"},fieldName:"eventDate",colType:n(79663).f.DATE,colSettings:{isUTC:!0,format:"MM/DD/YYYY hh:mm A "}},{name:"description",fieldName:"description",colStyle:{width:"35%"},allowShort:!0}]};var o=n(96603),l=n(17295),c=n(62360),s=n(27929);const r=e=>{const t=(0,a.useRef)(),[n,r]=(0,a.useState)(),[d,u]=(0,a.useState)(0),[m,{isLoading:g,isSuccess:f,data:S}]=(0,o.Pv)(),h=(t,n)=>{const a={pagination:{pageNumber:t.pageNumber,pageSize:t.pageSize},filters:{searchText:""},sortString:n,functionalityId:e.functionalityId};m(a)};return(0,a.useEffect)((()=>{f&&S&&(S&&r(S.dataSource),S.totalRecord&&u(S.totalRecord))}),[f,S]),(0,a.useEffect)((()=>{if(t.current){const n=t.current.getCurrentPageObject(),a=t.current.generateSortingString(),i={pagination:{pageNumber:n.pageNumber,pageSize:n.pageSize},filters:{searchText:""},sortString:a,functionalityId:e.functionalityId};m(i)}}),[e.functionalityId]),(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-md-12 table-striped api-provider view-function-provider",children:(0,s.jsx)(l.default,{cardTitle:"Functional Events",buttonClassName:"btn theme-button",children:(0,s.jsx)(c.A,{ref:t,configuration:i,dataSource:n,allowPagination:!1,pagination:{totalCount:d,pageSize:20,currentPage:1},onPageChange:e=>{h(e,t.current.generateSortingString())},onSorting:e=>{h(t.current.getCurrentPageObject(),e)},isLoading:g})})})})}}}]);
//# sourceMappingURL=5222.5f0f231e.chunk.js.map