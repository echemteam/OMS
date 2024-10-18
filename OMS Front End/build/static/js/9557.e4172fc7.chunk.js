"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[9557,9295,9263],{24014:(e,s,d)=>{d.d(s,{z:()=>t});var i=d(15335);const t={initialState:{addressTypeId:"",addressLine1:"",addressLine2:"",addressLine3:"",addressLine4:"",addressLine5:"",countryId:233,stateId:"",zipCode:"",cityId:"",supplierId:0,isPreferredBilling:!1,isShippingAndBilling:!1,isPreferredShipping:!1,stateName:"",cityName:""},formFields:[{id:"addressTypeId",lable:"Address Type ",Field_Name:"Address Type",fieldType:i.Q.SELECT,dataField:"addressTypeId",fieldSetting:{placeholder:"Select Address Type",isEnableOnChange:!0,isMultiSelect:!1},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 mb-input"}},{id:"addressLine1",lable:"Address Line 1 ",Field_Name:"Address Line 1",fieldType:i.Q.INPUT,dataField:"addressLine1",fieldSetting:{placeholder:"Enter Address Line 1",allowSpace:!0,maxLength:35},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 mb-input"}},{id:"addressLine2",lable:"Address Line 2",Field_Name:"Address Line 2",fieldType:i.Q.INPUT,dataField:"addressLine2",fieldSetting:{placeholder:"Enter Address Line 2",allowSpace:!0,maxLength:35},style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 mb-input"}},{id:"addressLine3",lable:"Address Line 3 ",Field_Name:"Address Line 3",fieldType:i.Q.INPUT,dataField:"addressLine3",fieldSetting:{placeholder:"Enter Address Line 3",allowSpace:!0,maxLength:35},style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 mb-input"}},{id:"addressLine4",lable:"Address Line 4 ",Field_Name:"Address Line 4",fieldType:i.Q.INPUT,dataField:"addressLine4",fieldSetting:{placeholder:"Enter Address Line 4",allowSpace:!0,maxLength:35},style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 mb-input"}},{id:"addressLine5",lable:"Address Line 5 ",Field_Name:"Address Line 5",fieldType:i.Q.INPUT,dataField:"addressLine5",fieldSetting:{placeholder:"Enter Address Line 5",allowSpace:!0,maxLength:35},style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 mb-input"}},{id:"countryId",lable:"Country ",Field_Name:"Country",fieldType:i.Q.SELECT,dataField:"countryId",fieldSetting:{placeholder:"Select Country",isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-12 col-12 mb-input label-name-small"}},{id:"stateId",lable:"State ",Field_Name:"State",fieldType:i.Q.SELECT,dataField:"stateId",fieldSetting:{isDisable:!1,placeholder:"Select State",isEnableOnChange:!0,isText:!1},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-12 col-12 mb-input label-name-small"}},{id:"cityId",lable:"City ",Field_Name:"City",fieldType:i.Q.EDITABLEDROPDOWN,dataField:"cityId",fieldSetting:{isDisable:!0,placeholder:"Select City",isEnableOnChange:!0,isText:!1,isDependDropdown:{dataField:"stateId"}},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-12 col-12 mb-input label-name-small"}},{id:"zipCode",lable:"Zip Code ",Field_Name:"Zip Code",fieldType:i.Q.INPUT,dataField:"zipCode",fieldSetting:{placeholder:"Enter Zip Code",allowSpace:!0,maxLength:10},validation:[{type:"require"},{type:"validZipCode"}],style:{containerCss:"col-xxl-6 col-xl-8 col-md-8 col-12 mb-input label-name-small"}},{id:"isShippingAndBilling",lable:"Is Billing And Shipping are same",Field_Name:"Is Billing and Shipping",fieldType:i.Q.CHECKBOX,dataField:"isShippingAndBilling",fieldSetting:{placeholder:""},style:{containerCss:"col-xxl-5 col-xl-5 col-md-12 col-12 col-12 "}},{id:"isPreferredBilling",lable:"Is Preferred Billing",Field_Name:"Is PreferredBilling",fieldType:i.Q.CHECKBOX,dataField:"isPreferredBilling",fieldSetting:{placeholder:""},style:{containerCss:"col-xxl-3 col-xl-3 col-md-12 col-12 col-12 "}},{id:"isPreferredShipping",lable:"Is Preferred Shipping",Field_Name:"Is PreferredShipping",fieldType:i.Q.CHECKBOX,dataField:"isPreferredShipping",fieldSetting:{placeholder:""},style:{containerCss:"col-xxl-4 col-xl-4 col-md-12 col-12 col-12 "}}],formSetting:{isViewOnly:!1}}},49295:(e,s,d)=>{d.r(s),d.d(s,{default:()=>I});var i=d(27565),t=d(60497),l=d(28734),a=d(18637),n=d(32813),r=d(15889),o=d(58412),c=d(24014),p=d(65748),m=d(4260),u=d(71509),f=d(27929);const h={label:"United States",value:233},I=(0,i.forwardRef)((e=>{let{keyId:s,isSupplier:d,updateAddress:I,addAddress:y,getAddresssById:x,isModelOpen:v,editMode:g,isButtonDisable:S,getCompletionCount:C,onSidebarClose:A,editRef:N,isOrderManage:T,getAddressTypeIdOrder:b,onHandleOrderInfoRepeatCall:j,orderCustomerId:L,isEditablePage:E,customerStatusId:F}=e;const P=(0,i.useRef)(),[D,B]=(0,i.useState)(c.z),[w,O]=(0,i.useState)(!1),[U,V]=(0,i.useState)(null),[z,M]=(0,i.useState)(null),[k,_]=(0,i.useState)(0),[G,{isLoading:Q,isSuccess:R,data:X}]=y(),[H,{isLoading:q,isSuccess:$,data:K}]=I(),[Z,{isFetching:Y,isSuccess:W,data:J}]=x(),[ee,{isSuccess:se,isFetching:de,data:ie}]=(0,u.sM)(),[te,{data:le}]=(0,u.dq)(),[ae,{isSuccess:ne,data:re}]=(0,m.f8)(),[oe,{isSuccess:ce,data:pe}]=(0,u.Yj)();(0,i.useEffect)((()=>{(async()=>{(g||v||!T)&&await Promise.all([te(),ae(),oe()])})()}),[g,v]),(0,i.useEffect)((()=>{if(T){(0,o.t5)(c.z,"addressTypeId",l.fV.DISABLED,!0);let e={...c.z};b===l.RX.BILLING?e=(0,r.G)(c.z,["isShippingAndBilling","isPreferredShipping"]):b===l.RX.SHIPPING&&(e=(0,r.G)(c.z,["isShippingAndBilling","isPreferredBilling"])),e.initialState={...e.initialState,addressTypeId:b},B(e)}else(0,o.t5)(c.z,"addressTypeId",l.fV.DISABLED)}),[T,v]);const me=(e,s)=>{e&&s&&ue(e,s)};(0,i.useEffect)((()=>{me(R,X)}),[R,X]),(0,i.useEffect)((()=>{me($,K)}),[$,K]),(0,i.useEffect)((()=>{d&&v?((0,o.t5)(D,"cityId",l.fV.DISABLED,!0),(0,o.t5)(D,"addressTypeId",l.fV.MULTISELECT,!0),g&&(0,o.t5)(D,"addressTypeId",l.fV.MULTISELECT,!1)):v||T?d||T||(0,o.t5)(D,"addressTypeId",l.fV.MULTISELECT,!1):(0,n.t)(c.z,B,null)}),[d,v]),(0,i.useEffect)((()=>{ne&&re&&(0,o.Xh)(re,"countryId","name",c.z,"countryId")}),[ne,re]),(0,i.useEffect)((()=>{if(!de&se&&ie){var e;const s=ie.map((e=>({value:e.cityId,label:e.name})));let d={...D};const i=null===d||void 0===d||null===(e=d.formFields)||void 0===e?void 0:e.find((e=>"cityId"===e.id));i.fieldSetting.options=s,B(d)}}),[se,ie,de]),(0,i.useEffect)((()=>{if(ce&&pe){const e=e=>d?e.isForSuppliers:e.isForCustomers;(0,o.Xh)(pe,"addressTypeId","type",c.z,"addressTypeId",e),O((e=>!e))}}),[ce,pe,d]),(0,i.useEffect)((()=>{if(!Y&&W&&J){_(J.addressId);let e={...D},i=J;S?S&&((0,o.t5)(D,"cityId",l.fV.DISABLED,!0),(0,o.t5)(D,"stateId",l.fV.DISABLED,!0)):((0,o.t5)(D,"cityId",l.fV.DISABLED),(0,o.t5)(D,"stateId",l.fV.DISABLED)),i.countryId&&(0,o.Xh)(le,"stateId","name",e,"stateId",(e=>e.countryId===i.countryId)),i.stateId&&ee(i.stateId),e.initialState={customerId:!1===d?s:0,supplierId:!0===d?s:0,addressTypeId:i.addressTypeId,addressLine1:i.addressLine1,addressLine2:i.addressLine2,addressLine3:i.addressLine3,addressLine4:i.addressLine4,addressLine5:i.addressLine5,countryId:i.countryId,stateId:i.stateId,cityId:i.cityId,zipCode:i.zipCode,isPreferredShipping:i.isPreferredShipping,isPreferredBilling:i.isPreferredBilling},B(e)}}),[Y,W,J]);(0,i.useEffect)((()=>{T||(()=>{if(!g){let e;e=(0,r.G)(c.z,["isPreferredShipping","isShippingAndBilling","isPreferredBilling"]),le&&(ye(h,"countryId"),(0,o.t5)(D,"cityId",l.fV.DISABLED,!0)),B(e)}})()}),[le,v]),(0,i.useEffect)((()=>{if(J){let e={...D};"Billing"===J.type?e=(0,r.G)(c.z,["isShippingAndBilling","isPreferredShipping"]):"Shipping"===J.type?e=(0,r.G)(c.z,["isShippingAndBilling","isPreferredBilling"]):"AP"!==J.type&&"Primary"!==J.type||(e=(0,r.G)(c.z,["isShippingAndBilling","isPreferredBilling","isPreferredShipping"])),e.initialState={customerId:!1===d?s:0,supplierId:!0===d?s:0,addressTypeId:J.addressTypeId,addressLine1:J.addressLine1,addressLine2:J.addressLine2,addressLine3:J.addressLine3,addressLine4:J.addressLine4,addressLine5:J.addressLine5,countryId:J.countryId,stateId:J.stateId,cityId:J.cityId,zipCode:J.zipCode,isPreferredShipping:J.isPreferredShipping,isPreferredBilling:J.isPreferredBilling},B(e)}}),[J]);const ue=(e,d)=>{if(e&&d){if(C&&C(),d.errorMessage.includes("exists"))return p.A.warning(d.errorMessage),void Z(s);(0,n.t)(c.z,B,null),p.A.success(d.errorMessage),T?j():(Z(s),A()),A()}},fe=(e,s,d,i)=>{const t=((e,s,d)=>s?d?e.addressTypeId&&"object"===typeof e.addressTypeId?String(e.addressTypeId.value):String(e.addressTypeId):Array.isArray(e.addressTypeId)?e.addressTypeId.map(String).join(","):e.addressTypeId:e.addressTypeId&&"object"===typeof e.addressTypeId?String(e.addressTypeId.value):String(e.addressTypeId))(e,s,i),l=(e,s)=>"object"===typeof e?e.isNew?{id:0,name:e.text||""}:{id:e.value||e.id||0,name:s||""}:{id:e||0,name:s||""},{id:a,name:n}=l(e.stateId,e.stateName),{id:r,name:o}=l(e.cityId,e.cityName);return{...e,[s?"supplierId":"customerId"]:d,addressTypeId:he(t),countryId:he(e.countryId),stateId:a,cityId:r,stateName:n,cityName:o}},he=e=>e&&"object"===typeof e?e.value:e,Ie=e=>{e&&Z(e)},ye=(e,s)=>{const i={...D};if("countryId"===s)(0,o.Xh)(le,"stateId","name",i,"stateId",(s=>s.countryId===e.value)),(0,o.Xh)(null,"cityId","name",i,"cityId",null),(0,o.t5)(i,"stateId",l.fV.DISABLED,!1),P.current.updateFormFieldValue({countryId:e.value,stateId:null,cityId:null});else if("stateId"===s)e?(ee(e.value),(0,o.t5)(i,"cityId",l.fV.DISABLED,!1),P.current.updateFormFieldValue({stateId:e.value,cityId:null})):P.current.updateFormFieldValue({cityId:null});else if(!d&&"addressTypeId"===s){let s;switch(e.label){case"Billing":s=g?c.z.formFields.filter((e=>"isPreferredShipping"!==e.dataField&&"isShippingAndBilling"!==e.dataField)):c.z.formFields.filter((e=>"isPreferredShipping"!==e.dataField));break;case"Shipping":s=g?c.z.formFields.filter((e=>"isPreferredBilling"!==e.dataField&&"isShippingAndBilling"!==e.dataField)):c.z.formFields.filter((e=>"isPreferredBilling"!==e.dataField));break;case"AP":case"Primary":s=c.z.formFields.filter((e=>"isPreferredBilling"!==e.dataField&&"isPreferredShipping"!==e.dataField&&"isShippingAndBilling"!==e.dataField));break;default:s=c.z.formFields}i.formFields=s,i.initialState={...g?D.initialState:c.z.initialState,addressTypeId:e.value},B(i)}};(0,i.useEffect)((()=>{let e={...D};if("isShippingAndBilling"===U&&!1===z&&1===e.initialState.addressTypeId){let e;e=(0,r.G)(D,["isPreferredShipping"]),B(e)}else if("isShippingAndBilling"===U&&!1===z&&2===e.initialState.addressTypeId){let e;e=(0,r.G)(D,["isPreferredBilling"]),B(e)}}),[z,U]),(0,i.useImperativeHandle)(N,(()=>({callChildEditFunction:Ie})));const xe={DDL_CHANGED:ye,CHECK_CHANGE:(e,s)=>{if(M(e),V(s),"isShippingAndBilling"===s&&e){const e={...D};let s;s=c.z.formFields,e.formFields=s,B(e)}},DA_CHANGED:(e,s)=>{"stateId"===s?((0,o.t5)(D,"cityId",l.fV.ISTEXT,e),P.current.updateFormFieldValue({cityId:null})):"cityId"===s&&(e||((0,o.t5)(D,"stateId",l.fV.ISTEXT,e),P.current.updateFormFieldValue({cityId:null})))}};return(0,f.jsxs)("div",{className:"row mt-2 add-address-form",children:[(0,i.createElement)(a.A,{config:D,ref:P,...D,onActionChange:xe,onDropdownAction:xe,onCheckBoxChange:xe,key:w}),(0,f.jsx)("div",{className:"col-md-12 mt-2",children:(0,f.jsxs)("div",{className:"d-flex align-item-end justify-content-end",children:[(0,f.jsx)(t.A,{buttonTypeClassName:"theme-button",buttonText:g?"Update":"Save",onClick:async()=>{const e=P.current.getFormData();if(!e)return;const i=fe(e,d,s,g);if(g){const e=((e,s,d)=>{const i=((e,s)=>!1===e&&s?s.customerAddressId:0)(d,s),t=((e,s)=>!0===e&&s?s.supplierAddressId:0)(d,s);return{...e,addressId:null===s?k:s.addressId,customerAddressId:i,supplierAddressId:t}})(i,J,d);H(e)}else{const e=L||i.customerId,s={...i,customerId:e};G(s)}},isLoading:Q||q,isDisable:S}),(0,f.jsx)(t.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:A})]})})]})}))},37549:(e,s,d)=>{d.d(s,{A:()=>t});var i=d(15335);const t={name:"Email From",initialState:{firstName:"",lastName:"",contactTypeId:"",isPrimary:!1},formFields:[{id:"firstName",lable:"First Name ",Field_Name:"First Name",fieldType:i.Q.INPUT,dataField:"firstName",fieldSetting:{placeholder:"Enter First Name",allowSpace:!0,maxLength:50},validation:[{type:"require"},{type:"onlyText"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input"}},{id:"lastName",lable:"Last Name ",Field_Name:"Last Name",fieldType:i.Q.INPUT,dataField:"lastName",fieldSetting:{placeholder:"Enter Last Name",allowSpace:!0,maxLength:50},validation:[{type:"require"},{type:"onlyText"}],style:{containerCss:"col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input"}},{id:"contactTypeId",lable:"Contact Type ",Field_Name:"Contact Type",fieldType:i.Q.SELECT,dataField:"contactTypeId",fieldSetting:{placeholder:"Select Contact Type",isMultiSelect:!0,isEnableOnChange:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-8 col-xl-8 col-md-12 col-12 col-12 mb-input"}},{id:"isPrimary",lable:"Is Primary",Field_Name:"Is Primary",fieldType:i.Q.CHECKBOX,dataField:"isPrimary",fieldSetting:{placeholder:"",allowSpace:!0},style:{containerCss:"col-xxl-4 col-xl-4 col-md-12 col-12 col-12 mb-input mt-3 margin-left0-checkbox margin-top-checkbox"}}],formSetting:{isViewOnly:!1}}},99263:(e,s,d)=>{d.r(s),d.d(s,{default:()=>y});var i=d(27565),t=d(60497),l=d(28734),a=d(18637),n=d(37549),r=d(38860),o=d(3737),c=d(58412),p=d(15269),m=d(65748),u=d(17690),f=d(27929);const h=i.lazy((()=>d.e(1435).then(d.bind(d,51435)))),I=i.lazy((()=>d.e(9024).then(d.bind(d,59024)))),y=(0,i.forwardRef)((e=>{let{keyId:s,isUpdateContactModel:d,addEditContactMutation:y,onSidebarClose:x,onSuccess:v,childRef:g,editRef:S,SecurityKey:C,customerStatusId:A,allGetAllContactTypesData:N,isGetAllContactTypesSucess:T,isEditablePage:b,isSupplier:j,isEdit:L,isOpen:E,getContactById:F,getContectTypeId:P,customerId:D,isOrderManage:B,onhandleApiCall:w,contryIdCode:O,orderResetValue:U,getCompletionCount:V}=e;const z=(0,i.useRef)(),{formSetting:M}=n.A,[k,_]=(0,i.useState)(0),[G,Q]=(0,i.useState)(!1),[R,X]=(0,i.useState)(0),[H,q]=(0,i.useState)(0),[$,K]=(0,i.useState)(!1),[Z,Y]=(0,i.useState)([]),[,W]=(0,i.useState)(!1),[J,ee]=(0,i.useState)([]),[se,de]=(0,i.useState)(n.A),[ie,{isFetching:te,isSuccess:le,data:ae}]=F(),[ne,{isLoading:re,isSuccess:oe,data:ce}]=y();(0,i.useEffect)((()=>{if(d&&T){const e=e=>j?e.isForSuppliers:e.isForCustomers;(0,c.Xh)(N,"contactTypeId","type",se,"contactTypeId",e),W((e=>!e))}}),[T,d]);const pe=()=>{const e=z.current.getFormData();if(e)if(J.length>0){const d=(0,o.H)(e.contactTypeId,L),i=me(e,d,j,s,J,Z,H,R);let t={...i,customerId:D||i.customerId};ne(t)}else m.A.warning(u.K.ContactEmailAddressRequired)},me=(e,s,d,i,t,l,a,n)=>({...e,contactId:k,contactTypeId:String(s),[d?"supplierId":"customerId"]:i,emailAddressList:t.length>0?(0,o.Vz)(t):null,phoneNumberList:l.length>0?(0,o.Ix)(l):null,[d?"supplierContactId":"customerContactId"]:d?a:n});(0,i.useEffect)((()=>{if(oe&&ce){if(ce.errorMessage.includes("EXISTS"))return void m.A.warning(ce.errorMessage);v&&(v(),m.A.success(ce.errorMessage),_(null===ce||void 0===ce?void 0:ce.keyValue),B&&w(P)),V&&V()}}),[oe,ce]),(0,i.useEffect)((()=>{if(!te&&le&&ae){let e=ae,s={...n.A};s.initialState={firstName:e.firstName,lastName:e.lastName,contactTypeId:e.contactTypeId,isPrimary:e.isPrimary},de(s),_(e.contactId),j?q(null===e||void 0===e?void 0:e.supplierContactId):X(null===e||void 0===e?void 0:e.customerContactId),(0,c.t5)(s,"contactTypeId",l.fV.MULTISELECT);const d=[...ae.phoneNumberList].sort(((e,s)=>e.phoneId-s.phoneId)).map(((e,s)=>({...e,id:s+1,extension:0===e.extension?"-":e.extension}))),i=[...ae.emailAddressList].sort(((e,s)=>s.emailId-e.emailId)).map(((e,s)=>({...e,id:s+1})));Y(d),ee(i)}}),[te,le]),(0,i.useImperativeHandle)(S,(()=>({callEditFunction:ue}))),(0,i.useEffect)((()=>{if(b&&C){const e=(0,p.T)(C.EDIT),s=(0,p.T)(C.ADD);e&&M&&(G?!0===e.isViewOnly?(M.isViewOnly=!0,K(!0)):(M.isViewOnly=!1,K(!1)):G||!0===s.hasAccess&&(M.isViewOnly=!1,K(!1)))}}),[G,S,C]);const ue=e=>{Q(!0),e&&ie(e)};(0,i.useEffect)((()=>{if(!L&&!B){j?(0,c.t5)(n.A,"contactTypeId",l.fV.MULTISELECT,!1):(0,c.t5)(n.A,"contactTypeId",l.fV.MULTISELECT,!0);let e={...n.A};de(e),E&&(_(0),Q(!1),Y([]),ee([]))}if(B){(0,c.t5)(n.A,"contactTypeId",l.fV.DISABLED,!0),(0,c.t5)(n.A,"contactTypeId",l.fV.MULTISELECT,!1);let e={...n.A};e.initialState={...e.initialState,contactTypeId:P},de(e)}}),[E]);const fe=()=>{(0,c.t5)(n.A,"contactTypeId",l.fV.DISABLED,!1);let e={...n.A};e.initialState={...n.A.initialState},de(e),X(0),q(0)};return(0,i.useImperativeHandle)(g,(()=>({callChildFunction:fe}))),(0,i.useEffect)((()=>{U&&B&&(Y([]),ee([]))}),[U]),(0,f.jsxs)("div",{children:[te?(0,f.jsx)(r.A,{}):(0,f.jsxs)(i.Fragment,{children:[(0,f.jsx)("div",{className:"row mt-2 addEditContact-form",children:(0,f.jsx)(a.A,{config:se,ref:z,...se})}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)(h,{isButtonDisable:$,emailAddressList:J,setEmailAddressList:ee,contactId:k,isOrderManage:B}),(0,f.jsx)(I,{isButtonDisable:$,phoneNumberList:Z,setPhoneNumberList:Y,contactId:k,contryIdCode:O,isOrderManage:B})]})]}),(0,f.jsx)("div",{className:"col-md-12 mt-3",children:(0,f.jsx)("div",{className:"d-flex align-item-end justify-content-end",children:(0,f.jsxs)("div",{className:"d-flex align-item-end",children:[(0,f.jsx)(t.A,{buttonTypeClassName:"theme-button",buttonText:"Save",isLoading:re,onClick:async()=>{pe()},isDisable:$}),(0,f.jsx)(t.A,{buttonTypeClassName:"dark-btn ml-5",buttonText:"Cancel",onClick:x})]})})})]})}))},91868:(e,s,d)=>{d.d(s,{qz:()=>a,r:()=>n});var i=d(69885),t=d(15335),l=d(79663);const a={name:"Document Form",initialState:{name:"",documentTypeId:"",supplierId:"",customerId:"",attachment:"",base64File:"",storagePath:""},formFields:[{id:"documentTypeId",lable:"Document Type ",Field_Name:"Document Type",fieldType:t.Q.SELECT,fieldType:t.Q.EDITABLEDROPDOWN,dataField:"documentTypeId",fieldSetting:{placeholder:"Select Document Type",isEnableOnChange:!0,options:[]},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"name",lable:"Document Name ",Field_Name:"Document Name",fieldType:t.Q.INPUT,dataField:"name",fieldSetting:{placeholder:"Enter Document Name",allowSpace:!0,maxLength:50,isDisable:!0},validation:[{type:"require"}],style:{containerCss:"col-xxl-6 col-xl-12 col-md-6 col-12 mb-input"}},{id:"attachment",lable:"Attachment ",Field_Name:"Attachment",fieldType:t.Q.FILE,dataField:"attachment",fieldSetting:{placeholder:"Upload Attachment",allowSpace:!0,isButtonVisible:!1,isCustomButtonVisible:!0,acceptedFiles:".pdf , .docx "},validation:[{type:"require"}],style:{containerCss:"col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section"}}]},n=(l.f.ACTION,[{type:"pdf",icon:i.m.PdfIcon},{type:"doc",icon:i.m.DocIcon},{type:"docx",icon:i.m.DocIcon},{type:"xlsx",icon:i.m.XlsIcon},{type:"xls",icon:i.m.XlsIcon},{type:"ppt",icon:i.m.PptIcon},{type:"zip",icon:i.m.ZipIcon},{type:"csv",icon:i.m.CsvIcon}])},19557:(e,s,d)=>{d.r(s),d.d(s,{default:()=>T});var i=d(27565),t=d(17295),l=d(35263),a=d(69885),n=d(79742),r=d(98389),o=d(60497),c=d(71509),p=d(39973),m=d(80889),u=d(57412),f=d(65748),h=d(27929);const I=e=>{let{handleAddClick:s,onUpdate:d,onSidebarCloseUpdateAddress:t,addressContactType:l,onSidebarCloseShippingAddress:a,handleRefreshOrderDetails:n,customerId:I,orderDetails:y,onGetData:x,defaultId:v,orderItemId:g}=e;const[S,C]=(0,i.useState)([]),{confirm:A}=(0,m.A)(),[N,T]=(0,i.useState)(null),[b,j]=(0,i.useState)(!1),[L,{isFetching:E,isSuccess:F,data:P}]=(0,c.bV)(),[D,{isLoading:B,isSuccess:w,data:O}]=(0,p.Uu)();(0,i.useEffect)((()=>{j(v===N)}),[N]),(0,i.useEffect)((()=>{w&&O&&(f.A.success(O.errorMessage),a(),n())}),[w,O]),(0,i.useEffect)((()=>{I&&L(I)}),[I,l,t]),(0,i.useEffect)((()=>{if(!E&&F&&P&&("Shipping"===l||"Billing"===l)){const e=l?P.filter((e=>e.type===l)):P;C(e)}}),[E,F,P]),(0,i.useEffect)((()=>{v&&(T(v),x(v))}),[v]);return(0,h.jsxs)("div",{className:"add-list-section",children:[(0,h.jsx)("div",{className:"row",children:S.map((e=>(0,h.jsx)("div",{className:"col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12 mb-3",children:(0,h.jsx)("div",{className:"address-card-main "+(N===e.addressId?"active-card":""),children:(0,h.jsxs)("div",{className:"add-desc",children:[(0,h.jsxs)("div",{className:"add-line-part first-add-sec",children:[(0,h.jsx)("span",{className:"add-info",children:e.addressLine1}),(0,h.jsx)("span",{className:"checkbox-part",children:(0,h.jsx)(r.A,{name:`addressId_${e.addressId}`,checked:N?N===e.addressId:N,onChange:()=>{return s=e.addressId,void(N===s?(T(null),x&&x(null)):(T(s),x&&x(s)));var s}})})]}),(0,h.jsx)("div",{className:"add-line-part",children:e.addressLine2}),(0,h.jsx)("div",{className:"add-line-part",children:e.addressLine3}),(0,h.jsxs)("span",{className:"add-line-part",children:[" ",null===e||void 0===e?void 0:e.cityName,","," ",e.stateCode?e.stateCode:e.stateName," ",null===e||void 0===e?void 0:e.zipCode]})]})})},e.id)))}),(0,h.jsxs)("div",{className:"d-flex align-item-end justify-content-end mt-3",children:[(0,h.jsx)(o.A,{buttonTypeClassName:"theme-button",buttonText:"Change Address",isLoading:B,onClick:()=>{N?A("Change?","Are you sure you want to Change Address?","Change","Cancel").then((e=>{if(e){const e={orderAddressId:y.orderAddressId,orderId:y.orderId,billingAddressId:"Billing"===l?N:0,shippingAddressId:"Shipping"===l?N:0,orderItemId:g||0};D(e)}})):N||u.oR.error("Please select an Address .")},isDisable:b}),(0,h.jsx)(o.A,{buttonTypeClassName:"theme-button ml-3",buttonText:"Add Address",onClick:s})]})]})},y=e=>{var s,d,i,t,a,n,r,o,c,p;let{contact:m}=e;return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"customer-popup-sec",children:(0,h.jsxs)("div",{className:"popup-body-sec",children:[(0,h.jsxs)("div",{className:"name-icon-status",children:[(0,h.jsx)("div",{className:"icon-sec",children:(u=null===m||void 0===m?void 0:m.firstName,f=null===m||void 0===m?void 0:m.lastName,((null===u||void 0===u?void 0:u[0])||"").toUpperCase()+((null===f||void 0===f?void 0:f[0])||"").toUpperCase())}),(0,h.jsx)("div",{className:"name-status",children:(0,h.jsxs)("div",{className:"name-sec",children:[null===m||void 0===m?void 0:m.firstName," ",null===m||void 0===m?void 0:m.lastName]})})]}),(0,h.jsxs)("div",{className:"desc-sec-bottom user-desc",children:[(0,h.jsxs)("div",{className:"icon-detail",children:[(0,h.jsx)("span",{className:"icon-part",children:(0,h.jsx)(l.A,{icon:"ic:round-email"})}),(0,h.jsxs)("span",{className:"info-part email-list",children:[(0,h.jsx)("div",{class:"values",children:null===m||void 0===m||null===(s=m.emailAddressList)||void 0===s||null===(d=s.find((e=>!e.isPrimary)))||void 0===d?void 0:d.emailAddress}),(0,h.jsxs)("div",{class:"values primary-email",children:[" ",null===m||void 0===m||null===(i=m.emailAddressList)||void 0===i||null===(t=i.find((e=>e.isPrimary)))||void 0===t?void 0:t.emailAddress]})]})]}),(0,h.jsxs)("div",{className:"icon-detail",children:[(0,h.jsx)("span",{className:"icon-part contact-icon",children:(0,h.jsx)(l.A,{icon:"ic:round-phone"})}),(0,h.jsxs)("span",{className:"info-part contact-info",children:[(0,h.jsxs)("div",{class:"values",children:["   ",null!==m&&void 0!==m&&null!==(a=m.phoneNumberList)&&void 0!==a&&a.find((e=>e.isPrimary))?`${(null===m||void 0===m||null===(n=m.phoneNumberList.find((e=>!e.isPrimary)))||void 0===n?void 0:n.phoneCode)||""} ${(null===m||void 0===m||null===(r=m.phoneNumberList.find((e=>!e.isPrimary)))||void 0===r?void 0:r.phoneNumber)||""}`:null]}),(0,h.jsxs)("div",{class:"values primary-email",children:["   ",null!==m&&void 0!==m&&null!==(o=m.phoneNumberList)&&void 0!==o&&o.find((e=>e.isPrimary))?`${(null===m||void 0===m||null===(c=m.phoneNumberList.find((e=>e.isPrimary)))||void 0===c?void 0:c.phoneCode)||""} ${(null===m||void 0===m||null===(p=m.phoneNumberList.find((e=>e.isPrimary)))||void 0===p?void 0:p.phoneNumber)||""}`:null]})]})]})]})]})})});var u,f},x=e=>{var s,d,i,t,a;let{contact:n,handleToggleModalUsers:r}=e;return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"contact-card",children:(0,h.jsx)("div",{className:"profile-name-btn",children:(0,h.jsxs)("div",{className:"right-info",children:[(0,h.jsxs)("div",{className:"right-name-btn",children:[(0,h.jsxs)("div",{className:"user-name text-ellipsis",children:[null===n||void 0===n?void 0:n.firstName," ",null===n||void 0===n?void 0:n.lastName]}),(0,h.jsxs)("div",{className:"btn-sec",children:[(0,h.jsxs)("div",{className:"select-icon tooltip-div",onClick:r,children:[(0,h.jsx)(l.A,{icon:"icon-park-outline:change",className:"swap-icon"}),(0,h.jsx)("div",{className:"tooltip-show",children:(0,h.jsx)("p",{children:"Change Customer"})}),(0,h.jsx)("div",{className:"tooltip-arrow-icon"})]}),(0,h.jsxs)("div",{className:"info-display info-user user-card",children:[(0,h.jsx)(l.A,{icon:"ep:info-filled",className:"info"}),(0,h.jsx)(y,{contact:n})]})]})]}),(0,h.jsxs)("div",{className:"user-details",children:[(0,h.jsxs)("div",{className:"email",children:[(0,h.jsx)(l.A,{icon:"ic:round-email"}),(0,h.jsx)("span",{children:null===n||void 0===n||null===(s=n.emailAddressList)||void 0===s||null===(d=s.find((e=>e.isPrimary)))||void 0===d?void 0:d.emailAddress})]}),(0,h.jsxs)("div",{className:"number",children:[(0,h.jsx)(l.A,{icon:"mingcute:phone-fill"}),(0,h.jsx)("span",{children:null!==n&&void 0!==n&&null!==(i=n.phoneNumberList)&&void 0!==i&&i.find((e=>e.isPrimary))?`${null===n||void 0===n||null===(t=n.phoneNumberList.find((e=>e.isPrimary)))||void 0===t?void 0:t.phoneCode} ${null===n||void 0===n||null===(a=n.phoneNumberList.find((e=>e.isPrimary)))||void 0===a?void 0:a.phoneNumber}`:""})]})]})]})})})})},v=e=>{var s,d,i,t,a;let{contact:n,handleCheckboxChange:o,selectedContactId:c}=e;return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"contact-card card-list-popup",children:(0,h.jsxs)("div",{className:"profile-name-btn",children:[(0,h.jsx)("div",{className:"profile-icon-sec",children:(p=null===n||void 0===n?void 0:n.firstName,m=null===n||void 0===n?void 0:n.lastName,((null===p||void 0===p?void 0:p[0])||"").toUpperCase()+((null===m||void 0===m?void 0:m[0])||"").toUpperCase())}),(0,h.jsxs)("div",{className:"right-info",children:[(0,h.jsxs)("div",{className:"right-name-btn",children:[(0,h.jsx)("div",{className:"user-name text-ellipsis",children:`${n.firstName} ${n.lastName}`}),(0,h.jsx)("div",{className:"btn-sec",children:(0,h.jsxs)("div",{className:"info-display info-user user-card",children:[(0,h.jsx)(l.A,{icon:"ep:info-filled",className:"info"}),(0,h.jsx)(y,{contact:n})]})})]}),(0,h.jsxs)("div",{className:"user-details",children:[(0,h.jsxs)("div",{className:"email",children:[(0,h.jsx)(l.A,{icon:"ic:round-email"}),(0,h.jsxs)("span",{children:[" ",null===n||void 0===n||null===(s=n.emailAddressList)||void 0===s||null===(d=s.find((e=>e.isPrimary)))||void 0===d?void 0:d.emailAddress]})]}),(0,h.jsxs)("div",{className:"number",children:[(0,h.jsx)(l.A,{icon:"mingcute:phone-fill"}),(0,h.jsxs)("span",{children:[" ",null!==n&&void 0!==n&&null!==(i=n.phoneNumberList)&&void 0!==i&&i.find((e=>e.isPrimary))?`${null===n||void 0===n||null===(t=n.phoneNumberList.find((e=>e.isPrimary)))||void 0===t?void 0:t.phoneCode} ${null===n||void 0===n||null===(a=n.phoneNumberList.find((e=>e.isPrimary)))||void 0===a?void 0:a.phoneNumber}`:""]})]})]}),(0,h.jsx)("span",{className:"checkbox-sec",children:(0,h.jsx)(r.A,{name:`addressId_${n.contactId}`,checked:c?c===n.contactId:c,onChange:()=>o(n.contactId)})})]})]})})});var p,m},g=e=>{let{onGetContactId:s,handleAddContact:d,handleRefreshOrderDetails:t,orderContactId:l,onSidebarCloseUserModel:a,onSidebarCloseUpdateContact:n,defaultId:r,onUpdate:c,selectedContactId:I,setSelectedContactId:y,contactTypeId:x,addressContactType:g,customerId:S,orderDetails:C}=e;const[A,N]=(0,i.useState)([]),{confirm:T}=(0,m.A)(),[b,j]=(0,i.useState)(!1),[L,{isFetching:E,isSuccess:F,data:P}]=(0,p.EQ)(),[D,{isLoading:B,isSuccess:w,data:O}]=(0,p.iJ)();(0,i.useEffect)((()=>{w&&O&&(f.A.success(O.errorMessage),a(),t())}),[w,O]),(0,i.useEffect)((()=>{j(r===I)}),[I]);(0,i.useEffect)((()=>{if(g){L({customerId:S,searchText:"",searchContactType:x})}}),[g,n]),(0,i.useEffect)((()=>{y(r)}),[r]),(0,i.useEffect)((()=>{if(!E&&F&&P&&("Invoice Submission"===g||"Purchasing"===g||"EndUser"===g)){const e=g?P.filter((e=>e.type===g)):P;N(e)}}),[E,F,P]);const U=()=>{I||u.oR.error("Please select an Address .")},V=e=>{I===e?(y(null),s&&s(null)):(y(e),s&&s(e))};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"row mt-3",children:[A.map((e=>(0,h.jsx)("div",{className:"col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12 mb-3",children:(0,h.jsx)(v,{contact:e,onGetContactId:s,handleCheckboxChange:V,selectedContactId:I,setSelectedContactId:y})},e.contactId))),(0,h.jsxs)("div",{className:"d-flex align-item-end justify-content-end mt-3",children:[(0,h.jsx)(o.A,{buttonTypeClassName:"theme-button",buttonText:"Change Contact",isLoading:B,onClick:()=>{I?T("Change?","Are you sure you want to Change Contact?","Change","Cancel").then((e=>{if(e){const e={orderContactId:l,orderId:C.orderId,contactId:I,contactTypeId:x};D(e)}})):U()},isDisable:b}),(0,h.jsx)(o.A,{buttonTypeClassName:"theme-button ml-3",buttonText:"Add Contact",onClick:d})]})]})})};var S=d(38860),C=d(49295),A=d(52085),N=d(99263);const T=e=>{let{orderDetails:s,orderItemShippingAddRef:d,handleRefreshOrderDetails:r}=e;const[o,p]=(0,i.useState)(null),[m,u]=(0,i.useState)(null),[f,y]=(0,i.useState)(null),[v,T]=(0,i.useState)(null),[b,j]=(0,i.useState)(null),[L,E]=(0,i.useState)(!1),[F,P]=(0,i.useState)(null),[D,B]=(0,i.useState)(""),[w,O]=(0,i.useState)(!1),[U,V]=(0,i.useState)(!1),[z,M]=(0,i.useState)(!1),[k,_]=(0,i.useState)(!1),[G,Q]=(0,i.useState)(null),[R,X]=(0,i.useState)(null),[H,q]=(0,i.useState)(!1),[$,K]=(0,i.useState)(null),[Z,Y]=(0,i.useState)(0),[W,{isSuccess:J,data:ee}]=(0,A.sD)(),se=()=>{O(!1),B(""),X(""),Y(0)},de=(e,s,d)=>{Y(d),O(!0),B(e),X(s)};(0,i.useImperativeHandle)(d,(()=>({handleToggleModalShippingAddress:de})));const ie=()=>{V(!1),E(!1),O(!0),Y(0)},te=()=>{M(!1),B(""),X("")},le=()=>{_(!1),q(!1),M(!0)};(0,i.useEffect)((()=>{if(s){if(p(s),P(s.customerId),s.orderAddressInformation){const{billingAddress:e,shippingAddress:d}=s.orderAddressInformation;u([e,d])}s.orderContactList&&y(s.orderContactList)}}),[s]);return(0,h.jsxs)("div",{className:"order-information-card",children:[(0,h.jsx)(t.default,{cardTitle:"Order Information",headerContent:(0,h.jsxs)("div",{className:"d-flex order-method",children:[(0,h.jsx)(l.A,{icon:(e=>{switch(e){case"Online":return"mdi:web";case"Email":return"lucide:mail";case"Fax":return"fluent:fax-20-regular";case"Phone Call":return"mi:call";default:return"svg-spinners:ring-resize"}})(null===o||void 0===o?void 0:o.orderMethod)}),(0,h.jsx)("div",{className:"order-method-value",children:null===o||void 0===o?void 0:o.orderMethod})]}),children:s?(0,h.jsxs)("div",{className:"order-info-list",children:[(0,h.jsx)("div",{className:"row"}),(0,h.jsx)("div",{className:"row",children:null===m||void 0===m?void 0:m.map((e=>(0,h.jsxs)("div",{className:"col-xxl-6 col-lg-6 col-md-6 col-12 relative mt-1",children:[(0,h.jsx)("div",{className:`order-title ${e.type}`,children:(0,h.jsxs)("span",{children:[e.type," Address"]})}),(0,h.jsxs)("div",{className:"address-card",children:[(0,h.jsxs)("div",{className:"title-swap-btn",children:[(0,h.jsx)("span",{children:e.addressLine1}),(0,h.jsxs)("span",{className:"swap-btn tooltip-div",onClick:()=>de(e.type,e.addressId),children:[(0,h.jsx)(l.A,{icon:"icon-park-outline:change",className:"swap-icon"}),(0,h.jsx)("div",{className:"tooltip-show",children:(0,h.jsx)("p",{children:"Change Address"})}),(0,h.jsx)("div",{className:"tooltip-arrow-icon"})]})]}),(0,h.jsxs)("div",{className:"desc-add-sec",children:[(0,h.jsx)("span",{children:null===e||void 0===e?void 0:e.addressLine2}),(0,h.jsxs)("span",{children:[null===e||void 0===e?void 0:e.cityName,","," ",e.stateCode?e.stateCode:e.stateName," ",null===e||void 0===e?void 0:e.zipCode]}),(0,h.jsx)("span",{children:null===e||void 0===e?void 0:e.countryName})]})]})]},e.type)))}),(0,h.jsx)("div",{className:"row mt-2",children:null===f||void 0===f?void 0:f.map(((e,s)=>{return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"col-xxl-4 col-lg-6 col-md-6 col-12 relative mt-2",children:[(0,h.jsx)("div",{className:`order-title ${d=null===e||void 0===e?void 0:e.contactType,d?d.toLowerCase().replace(/\s+/g,"-"):""}`,children:(0,h.jsx)("span",{children:null===e||void 0===e?void 0:e.contactType})}),(0,h.jsx)(x,{contact:e,index:s,handleToggleModalUsers:()=>((e,s,d,i)=>{j(e),M(!0),B(s),X(d),K(i)})(null===e||void 0===e?void 0:e.contactTypeId,e.contactType,e.contactId,e.orderContactId)})]},s)});var d}))})]}):(0,h.jsx)(S.A,{})}),(0,h.jsx)(n.default,{modalTitle:`Change ${D} Address`,contentClass:"content-50",onClose:se,modalTitleIcon:a.m.AddIcon,isOpen:w,children:(0,h.jsx)(I,{handleRefreshOrderDetails:r,onSidebarCloseUpdateAddress:ie,handleAddClick:()=>{O(!1),E(!1),V(!0)},onSidebarCloseShippingAddress:se,onGetData:e=>{T(e)},orderDetails:s,addressContactType:D,customerId:F,defaultId:R,orderItemId:Z})}),U?(0,h.jsx)(n.default,{modalTitle:(L?"Update":"Add")+" Address",contentClass:"content-50",onClose:ie,modalTitleIcon:a.m.AddIcon,isOpen:U,children:(0,h.jsx)(C.default,{selectedAddressId:v,isModelOpenUpdateAddress:U,keyId:F,updateAddress:c.Tg,addAddress:c.MC,getAddresssById:c.ZS,onSidebarClose:ie})}):null,z?(0,h.jsx)(n.default,{modalTitle:"Update Users",contentClass:"content-50",onClose:te,modalTitleIcon:a.m.AddIcon,isOpen:z,children:(0,h.jsx)(g,{handleRefreshOrderDetails:r,orderContactId:$,onGetContactId:e=>{Q(e)},onSidebarCloseUpdateContact:le,orderDetails:s,contactTypeId:b,handleAddContact:()=>{M(!1),E(!1),_(!0),W()},selectedContactId:G,addressContactType:D,setSelectedContactId:Q,onSidebarCloseUserModel:te,customerId:F,defaultId:R})}):null,k?(0,h.jsx)(n.default,{modalTitle:"Add/Edit Contact",contentClass:"content-40",onClose:le,modalTitleIcon:a.m.AddIcon,isOpen:k,children:(0,h.jsx)(N.default,{onSuccess:()=>{le()},addEditContactMutation:A.yv,customerId:F,getContactById:A.Su,isUpdateContactModel:k,selectedContactId:G,isGetAllContactTypesSucess:J,allGetAllContactTypesData:ee,onSidebarClose:le,isSupplier:!1})}):null]})}},3737:(e,s,d)=>{d.d(s,{Co:()=>c,EV:()=>u,H:()=>a,Ix:()=>r,Vz:()=>o,i_:()=>f,jZ:()=>n,oP:()=>p,xG:()=>l});var i=d(76969),t=d(91868);const l=e=>[{id:0,type:"All",isForSuppliers:!0,isForCustomers:!0,contactTypeId:""},...e],a=(e,s)=>s?String(e&&"object"===typeof e?e.value:e):Array.isArray(e)?e.map(String).join(","):String(e&&"object"===typeof e?e.value:e),n=e=>[{id:0,type:"All",isForSuppliers:!0,isForCustomers:!0,addressTypeId:""},...e],r=e=>{const s=e.every((e=>!e.isPrimary));return e.map(((e,d)=>({...e,extension:"-"===e.extension?0:e.extension,isPrimary:!(!s||0!==d)||e.isPrimary})))},o=e=>{const s=e.every((e=>!e.isPrimary));return e.map(((e,d)=>({...e,isPrimary:!(!s||0!==d)||e.isPrimary})))},c=e=>e.map((e=>({...e,description:e.description+" by "+e.name+" on "+(0,i.Ay)(e.changedAt,"MM/DD/YYYY hh:mm A")}))),p=e=>{const s=null===e||void 0===e?void 0:e.split("."),d=(null===s||void 0===s?void 0:s.length)>1?s[s.length-1]:"";return m(d)},m=e=>{const s=t.r.find((s=>s.type===e));return s?s.icon:null},u=e=>e.reduce(((e,s)=>{const{type:d,attachment:i,customerDocumentId:t,customerId:l,documentTypeId:a,name:n,createdAt:r,isArchive:o}=s,c={attachment:i,customerDocumentId:t,customerId:l,documentTypeId:a,name:n,documentIcon:p(i),createdAt:r,isArchive:o,type:d};return e[d]||(e[d]=[]),e[d].push(c),e}),{}),f=e=>e.reduce(((e,s)=>{const{type:d,attachment:i,supplierDocumentId:t,supplierId:l,documentTypeId:a,name:n,createdAt:r,isArchive:o}=s,c={attachment:i,supplierDocumentId:t,supplierId:l,documentTypeId:a,name:n,documentIcon:p(i),createdAt:r,isArchive:o};return e[d]||(e[d]=[]),e[d].push(c),e}),{})}}]);
//# sourceMappingURL=9557.e4172fc7.chunk.js.map