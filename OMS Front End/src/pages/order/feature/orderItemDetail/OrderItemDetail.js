/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";

//** Component's */
const OrderItemsList = React.lazy(() =>
  import("./feature/OrderItemDetails/OrderItemsList")
);
const ProductDetailsList = React.lazy(() =>
  import("./feature/ProductDetails/ProductDetailsList")
);
const ProductPriceList = React.lazy(() =>
  import("./feature/ProductPriceDetails/ProductPriceList")
);
const VerifyProductDetail = React.lazy(() =>
  import("./feature/VerifyProductInfo/VerifyProductDetail")
);

const OrderItemDetail = ({ onhandleAddOrderData }) => {
  const { productId , itemRef } = useContext(AddOrderContext);

  const [priceList, setPriceList] = useState([]);
  const [verifyProductData, setVerifyProductData] = useState([]);
  const [isDocumentData, setIsDocumentData] = useState(false);
  const [priceListAndVerifyProductData, setPriceListAndVerifyProductData] = useState([])
  const [productDetailsListData, setProductDetailsListData] = useState({
    documentName: "",
    base64File: ""
  });

  const handlePriceListUpdate = (updatedPriceList) => {
    const listToAdd = Array.isArray(updatedPriceList) ? updatedPriceList : [updatedPriceList];
    const newPriceList = [...priceList];
    const priceListMap = new Map(newPriceList.map(item => [item.Size, item]));
    listToAdd.forEach(item => {
      priceListMap.set(item.Size, item);
    });
    const mergedPriceList = Array.from(priceListMap.values());
    setPriceList(mergedPriceList);
  };

  const handleVerifyProductDetail = (productlist) => {
    setVerifyProductData(productlist);
  };

  const handlePriceListAndVerifyProductData = (data) => {
    setPriceListAndVerifyProductData(data);
  };

  const handleProductDetailsListData = (data) => {
    setProductDetailsListData(data);
  };

  useImperativeHandle(itemRef, () => ({
    AddOrderItem,
  }));


  const AddOrderItem = async () => {
    const orderItemsList = priceListAndVerifyProductData.map(item => ({
      catalogId: item.CatalogId || 0,
      casNumber: item.CASNo || "",
      mdlNumber: item.MDLNo || "",
      chemicalName: item.ProductName || "",
      requestDate: new Date(item.requestDate) || new Date(),
      promiseDate: new Date(item.promiseDate) || new Date(),
      orderPriority: item.orderPriority || "",
      referenceEntityId: item.referenceEntityId || 0,
      orderItemStatusId: item.orderItemStatusId || 0,
      orderItemSubStatusId: item.orderItemSubStatusId || 0,
      quantity: item.quantity || 0,
      packSize: Number(item.Size) || 0,
      unitid: item.unitid || 0,
      itemUnitPrice: item.Price || 0,
      poItemUnitPrice: item.poItemUnitPrice || 0,
      subTotalPrice: item.subTotalPrice || 0,
      subTotalPOPrice: item.subTotalPOPrice || 0,
      orderDisputTypeId: item.orderDisputTypeId || 0,
      orderTimeCancelReason: item.orderTimeCancelReason || "",
      entityType: item.entityType || "",
      note: item.orderNote || "",
      entityId: item.entityId || 0,
    }));
    const requestBody = {
      orderItemsList, // the array of items
      orderChargeId: 0,
      chargeType: "",
      name: "",
      orderItemId: 0,
      documentName: productDetailsListData.documentName ? productDetailsListData.documentName : "",
      documentType: 0,
      base64File: productDetailsListData.base64File ? productDetailsListData.base64File : "",
      storagePath: "",
    };
    onhandleAddOrderData(requestBody)
    setIsDocumentData(true)
  }

  return (
    <div className="row">
      <ProductDetailsList onhandleProductDetailsListData={handleProductDetailsListData} isDocumentData={isDocumentData}/>
      <div className="col-xl-6 col-2xl-6 col-lg-12 col-12">
        <VerifyProductDetail productId={productId} onVerifyProductList={handleVerifyProductDetail} />
      </div>
      <div className="col-12">
        <ProductPriceList productId={productId} onPriceListUpdate={handlePriceListUpdate} />
      </div>
      <div className="col-12 mt-3">
        <OrderItemsList priceList={priceList} verifyProductData={verifyProductData} onHandlePriceListAndVerifyProductData={handlePriceListAndVerifyProductData} />
      </div>
    </div>
  );
};

export default OrderItemDetail;
