"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[1966],{61966:(e,t,i)=>{i.r(t),i.d(t,{default:()=>f});var l=i(27565),o=i(63092),a=i(48368);const r={columns:[{name:"Quantity",colStyle:{width:"7%"},fieldName:"Quantity",allowEditColumn:!0,editColumn:{editColType:a.Z.NUMERIC,editColFieldName:"Quantity",isDisable:!1},colSettings:{},allowShort:!1},{name:"Size",colStyle:{width:"7%"},fieldName:"Size",allowEditColumn:!0,editColumn:{editColType:a.Z.NUMERIC,editColFieldName:"Size",isDisable:!1},colSettings:{},allowShort:!1},{name:"Unit",fieldName:"Unit",allowEditColumn:!0,editColumn:{editColType:a.Z.DROPDOWN,editColFieldName:"Unit",isDisable:!1,isMultiSelect:!1,options:[{value:"MG",label:"MG"},{value:"G",label:"G"},{value:"KG",label:"KG"}]},colStyle:{width:"10%"},allowShort:!1},{name:"Price",colStyle:{width:"12%"},fieldName:"Price",allowEditColumn:!0,editColumn:{editColType:a.Z.NUMERIC,editColFieldName:"Price",isDisable:!1},colSettings:{},allowShort:!1},{name:"Order Note",fieldName:"orderNote",allowEditColumn:!0,editColumn:{editColType:a.Z.INPUT,placeholder:"Order Note",editColFieldName:"orderNote",isDisable:!1,colConfig:{maxLength:20,isReadOnly:!1}},colStyle:{width:"29%",textAlign:"center"},allowShort:!1},{name:"Req-Date",fieldName:"requestDate",colType:o.f.DATE,colSettings:{format:"DD-MMM-YYYY"},allowEditColumn:!0,editColumn:{editColType:a.Z.DATEPICKER,placeholder:"Req-Date",editColFieldName:"requestDate",isDisable:!1,colConfig:{format:"DD/MM/YYYY"}},colStyle:{textAlign:"right",width:"15%"},allowShort:!1},{name:"Promise Date",fieldName:"promiseDate",colType:o.f.DATE,colSettings:{format:"DD-MMM-YYYY"},allowEditColumn:!0,editColumn:{placeholder:"Promise Date",editColType:a.Z.DATEPICKER,editColFieldName:"promiseDate",isDisable:!1,colConfig:{format:"DD/MM/YYYY"}},colStyle:{textAlign:"right",width:"15%"},allowShort:!1},{name:"Priority",fieldName:"orderPriority",allowEditColumn:!0,editColumn:{editColType:a.Z.DROPDOWN,editColFieldName:"orderPriority",isDisable:!1,isMultiSelect:!1,options:[{value:"High",label:"High"},{value:"Low",label:"Low"}]},colStyle:{width:"10%"},allowShort:!1},{name:"Action",colStyle:{width:"10%"},colType:o.f.ACTION,defaultAction:{allowEdit:!0,allowDelete:!0},allowShort:!1}],allowEdit:!0,editSettings:{defualtEditableView:!0,buttons:{save:!0,delete:!0,cancel:!1}}};var n=i(17690),d=i(83101),s=i(17295),c=i(65748),u=i(54992),m=i(62360),D=i(80889),C=i(27929);const f=e=>{let{productId:t,onPriceListUpdate:i,isVerifyProduct:o}=e;const a=(0,l.useRef)(),[f,S]=(0,l.useState)([]),{confirm:w}=(0,D.A)();(0,l.useEffect)((()=>{if(f){const e={orderPriority:"",promiseDate:"",requestDate:"",orderNote:"",Price:"",Size:"",Unit:"",Quantity:1};S([...f,e])}}),[]);const[y,{isLoading:P,isSuccess:N,data:p}]=(0,u.M_)();(0,l.useEffect)((()=>{t&&h()}),[t]);(0,l.useEffect)((()=>{if(N&&p)if(p.isSuccess){const e=JSON.parse(p.data),t=(e=>e.map((e=>({orderPriority:e.orderPriority||"",promiseDate:e.promiseDate||"",requestDate:e.requestDate||"",orderNote:e.orderNote||"",Price:e.Price||"",Size:e.Size||"",Unit:e.Unit||"",Quantity:1}))))((null===e||void 0===e?void 0:e.data)||[]);S(t)}else c.A.warning(p.message||n.K.DefaultMessage)}),[N,p]);const h=()=>{let e={productId:t},i={eventName:d.U.AURUMPRODUCTPRICELIST,isDynamicParameter:!0,parameters:JSON.stringify(e)};y(i)};return(0,C.jsx)(s.default,{cardTitle:"Product Price List",rightButton:!0,buttonClassName:"theme-button my-2",titleButtonClick:()=>{const e={orderPriority:"",promiseDate:"",requestDate:"",orderNote:"",Price:"",Size:"",Unit:"",Quantity:1};S((t=>[...t,e]))},buttonText:"Add Row",children:(0,C.jsx)("div",{className:"order-price-list responsive-grid",children:(0,C.jsx)(m.A,{ref:a,dataSource:f,configuration:r,isLoading:P,onRowDataUpdate:(e,t)=>{if(o){const l={...f[t],...e},o=f.map(((e,i)=>i===t?l:e));S(o);const a=e=>""===e||!e||e<=0;if(a(l.Quantity))return c.A.warning("Please enter valid quantity");if(a(l.Size))return c.A.warning("Please enter valid size");if(a(l.Unit))return c.A.warning("Please select unit");if(a(l.Price))return c.A.warning("Please enter valid price");i(l)}else c.A.warning(n.n.VerifyProduct)},onRowDataDelete:e=>{w("Delete?","Are you sure you want to Delete?","Delete","Cancel").then((t=>{if(t){const t=f.filter(((t,i)=>i!==e));S(t)}}))},allowPagination:!1},JSON.stringify(f))})})}},83101:(e,t,i)=>{i.d(t,{U:()=>l});const l={AURUMPRODUCTSEARCH:"Aurum Product Search",AURUMPRODUCTDETAILS:"Aurum Product Details",AURUMPRODUCTPRICELIST:"Aurum Product Price List"}}}]);
//# sourceMappingURL=1966.d97bf2f7.chunk.js.map