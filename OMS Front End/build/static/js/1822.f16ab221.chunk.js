"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[1822],{19441:(e,t,a)=>{a.r(t),a.d(t,{default:()=>C});var i=a(27565),l=a(17295),n=a(79742),s=a(69885),c=a(15335),o=a(79663);const r={initialState:{key:"",value:""},formFields:[{id:"key",lable:"Key ",Field_Name:"key",fieldType:c.Q.INPUT,dataField:"key",fieldSetting:{placeholder:"Enter Key",allowSpace:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 "}},{id:"value",lable:"Value",Field_Name:"Value",fieldType:c.Q.INPUT,dataField:"value",fieldSetting:{placeholder:"Enter Value",allowSpace:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 mb-2"}}]},d={columns:[{name:"Key",fieldName:"key",colStyle:{width:"35%"},allowShort:!0},{name:"Value",fieldName:"value",colStyle:{width:"35%"},allowShort:!0},{name:"Action",colStyle:{width:"30%"},colType:o.f.ACTION,defaultAction:{allowEdit:!0,allowDelete:!0}}]};var u=a(65748),f=a(80889),g=a(62360),m=a(23329),y=a(27929);const S=e=>{let{handleEditClick:t,getDataRef:a}=e;const l=(0,i.useRef)(),[n,s]=(0,i.useState)([]),[c,o]=(0,i.useState)(0),{confirm:r}=(0,f.A)(),[S,{isSuccess:h,data:v}]=(0,m.Gk)(),[x,{isLoading:p,isSuccess:C,data:b}]=(0,m.Gu)();(0,i.useEffect)((()=>{E()}),[]),(0,i.useEffect)((()=>{C&&b&&(b&&s(b.dataSource),b.totalRecord&&o(b.totalRecord))}),[C,b]),(0,i.useEffect)((()=>{if(h&&v){u.A.success(v.errorMessage);const e=l.current.getCurrentPageObject();k(e)}}),[h,v]);const j=(e,t)=>{const a={pagination:{pageNumber:e.pageNumber,pageSize:e.pageSize},filters:{searchText:""},sortString:t};x(a)},k=e=>{j(e,l.current.generateSortingString())},E=()=>{if(l.current){const e=l.current.getCurrentPageObject();j(e,l.current.generateSortingString())}},N={EDIT:t,DELETE:e=>{r("Delete?","Are you sure you want to Delete?","Delete","Cancel").then((t=>{t&&S(e.dictionaryId)}))}};return(0,i.useImperativeHandle)(a,(()=>({callChildFunction:E}))),(0,y.jsx)("div",{className:"row",children:(0,y.jsx)("div",{className:"col-md-12 table-striped",children:(0,y.jsx)(g.A,{ref:l,configuration:d,dataSource:n,allowPagination:!0,pagination:{totalCount:c,pageSize:25,currentPage:1},onPageChange:k,onSorting:e=>{j(l.current.getCurrentPageObject(),e)},isLoading:p,onActionChange:N})})})};var h=a(18637),v=a(60497),x=a(32813);const p=e=>{var t;const a=(0,i.useRef)(),l=null===(t=e.initData)||void 0===t?void 0:t.dictionaryId,[n,s]=(0,i.useState)(r),[c,{isLoading:o,isSuccess:d,data:f}]=(0,m._w)(),[g,{isFetching:S,isSuccess:p,data:C}]=(0,m.j4)();(0,i.useEffect)((()=>{if(!S&&p&&C&&C){let e={...n};e.initialState={dictionaryId:C.dictionaryId,key:C.key,value:C.value},s(e)}}),[S,p,C]),(0,i.useEffect)((()=>{l&&e.isEdit&&g(l)}),[l,e.isEdit]),(0,i.useEffect)((()=>{if(d&&f){if(f.errorMessage.includes("exists"))return void u.A.warning(f.errorMessage);e.onSuccess(),u.A.success(f.errorMessage),b(),e.onClose()}}),[d,f]),(0,i.useEffect)((()=>{if(e.isModelOpen&&!e.isEdit){let e={...r};(0,x.t)(e,s,null)}}),[e.isModelOpen]);const b=()=>{let t={...r};(0,x.t)(t,s,null),e.onClose()};return(0,y.jsx)("div",{children:(0,y.jsxs)("div",{className:"row",children:[(0,y.jsx)("div",{className:"col-md-12",children:(0,y.jsx)("div",{className:"row vertical-form",children:(0,y.jsx)(h.A,{ref:a,config:n,...n})})}),(0,y.jsx)("div",{className:"col-md-12 mt-2",children:(0,y.jsxs)("div",{className:"d-flex align-item-center justify-content-end",children:[(0,y.jsx)(v.A,{buttonTypeClassName:"theme-button",buttonText:e.isEdit?"Update":"Save",onClick:()=>{const e=a.current.getFormData();if(e&&!l){const t={...e,key:e.key,value:e.value};c(t)}else if(e&&l){const t={...e,dictionaryId:l,key:e.key,value:e.value};c(t)}},isLoading:o}),(0,y.jsx)(v.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:b})]})})]})})},C=()=>{const e=(0,i.useRef)(),[t,a]=(0,i.useState)(!1),[c,o]=(0,i.useState)(!1),[d,u]=(0,i.useState)(r),f=()=>{a(!1),o(!1)};return(0,y.jsxs)("div",{children:[(0,y.jsx)(l.default,{cardTitle:"Dictionary",buttonClassName:"btn theme-button",rightButton:!0,buttonText:"Add",textWithIcon:!0,iconImg:s.m.PlusIcon,titleButtonClick:()=>{(0,x.t)(r,u,null),a(!0)},children:(0,y.jsx)(S,{getDataRef:e,handleEditClick:e=>{(0,x.t)(r,u,null),a(!0),u(e),o(!0)},initData:d})}),(0,y.jsx)(n.default,{modalTitle:c?"Upadte Dictionary":"Add Dictionary",contentClass:"content-40",onClose:f,modalTitleIcon:s.m.AddIcon,isOpen:t,children:(0,y.jsx)(p,{isEdit:c,initData:d,onClose:f,onSuccess:()=>{a(!0),e.current&&e.current.callChildFunction()},isModelOpen:t})})]})}}}]);
//# sourceMappingURL=1822.f16ab221.chunk.js.map