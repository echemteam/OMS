"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[9397],{79397:(e,i,l)=>{l.r(i),l.d(i,{default:()=>c});var o=l(27565),t=l(17295),a=l(79663);const d={columns:[{name:"Chemical Name",fieldName:"ProductName",colStyle:{width:"40%"}},{name:"Catalog ID",fieldName:"CatalogId",colStyle:{width:"15%"}},{name:"CAS No",fieldName:"CASNo",colStyle:{width:"15%"}},{name:"Pack Size",fieldName:"Pack Size",colType:a.f.CUSTOM,colStyle:{width:"15%"},renderCustomCol:e=>`${null===e||void 0===e?void 0:e.Quantity} X ${null===e||void 0===e?void 0:e.Size} ${null===e||void 0===e?void 0:e.Unit}`},{name:"Unit Total",fieldName:"Price",colType:a.f.CUSTOM,colStyle:{width:"10%"},renderCustomCol:e=>{const i=parseFloat(null===e||void 0===e?void 0:e.Price)||0;return null===i||void 0===i?void 0:i.toFixed(2)}},{name:"Total Price",fieldName:"Price",colType:a.f.CUSTOM,colStyle:{width:"10%"},renderCustomCol:e=>{const i=(parseFloat(null===e||void 0===e?void 0:e.Quantity)||0)*(parseFloat(null===e||void 0===e?void 0:e.Price)||0);return null===i||void 0===i?void 0:i.toFixed(2)}}]};var n=l(62360),r=l(27929);const c=e=>{let{priceList:i,verifyProductData:l,onHandlePriceListAndVerifyProductData:a}=e;const c=(0,o.useRef)(),u=(Array.isArray(i)?i:[i]).map((e=>({...l,...e})));return(0,o.useEffect)((()=>{i&&a(u)}),[i]),(0,r.jsx)(t.default,{cardTitle:"Order Item List",children:(0,r.jsx)(n.A,{ref:c,dataSource:u,configuration:d,allowPagination:!1})})}}}]);
//# sourceMappingURL=9397.9d84f6ed.chunk.js.map