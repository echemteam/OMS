/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useImperativeHandle, useState } from "react";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";
import SwalAlert from "../../../../services/swalService/SwalService";

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
  const { productId, itemRef, documentRef } = useContext(AddOrderContext);

  const { confirm } = SwalAlert();
  const [priceList, setPriceList] = useState([]);
  const [isDocumentData, setIsDocumentData] = useState(false);
  const [isVerifyProduct, setIsVerifyProduct] = useState(false);
  const [verifyProductData, setVerifyProductData] = useState([]);
  const [priceListAndVerifyProductData, setPriceListAndVerifyProductData] = useState([])
  const [productDetailsListData, setProductDetailsListData] = useState({ documentName: "", base64File: "" });

  const handlePriceListUpdate = (updatedPriceList) => {
    const listToAdd = Array.isArray(updatedPriceList) ? updatedPriceList : [updatedPriceList];
    const newPriceList = [...priceList];
    newPriceList.push(...listToAdd);
    setPriceList(newPriceList);
  };

  //** This Code for the duplicates size found  */
  // const handlePriceListUpdate = (updatedPriceList) => {
  //   const listToAdd = Array.isArray(updatedPriceList) ? updatedPriceList : [updatedPriceList];
  //   const newPriceList = [...priceList];
  //   // Check for duplicates
  //   const duplicates = listToAdd.filter(itemToAdd =>
  //     newPriceList.some(existingItem =>
  //       existingItem.Size === itemToAdd.Size && existingItem.Unit === itemToAdd.Unit && existingItem.Price === itemToAdd.Price
  //     )
  //   );
  //   if (duplicates.length > 0) {
  //     confirm(
  //       "Duplicate items found?",
  //       "Are you sure you want to add the same package size and unit",
  //       "Yes",
  //       "Cancel"
  //     ).then((confirmed) => {
  //       if (confirmed) {
  //         duplicates.forEach(itemToAdd => {
  //           const index = newPriceList.findIndex(existingItem =>
  //             existingItem.Size === itemToAdd.Size && existingItem.Unit === itemToAdd.Unit && existingItem.Price === itemToAdd.Price
  //           );
  //           if (index !== -1) {
  //             newPriceList[index].Package = (newPriceList[index].Package || 1) * (itemToAdd.Package || 1);
  //           }
  //         });
  //         setPriceList(newPriceList);
  //         ToastService.success(SuccessMessage.Add_Success.replace("{0}", "Order Item"));
  //       }
  //     });
  //   } else {
  //     newPriceList.push(...listToAdd);
  //     setPriceList(newPriceList);
  //     ToastService.success(SuccessMessage.Add_Success.replace("{0}", "Order Item"));
  //   }

  // };

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
      quantity: Number(item.Quantity) || 0,
      packSize: Number(item.Size) || 0,
      unit: item.Unit || 0,
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
    const documentData = documentRef.current.getFormData();
    const requestBody = {
      orderItemsList, // the array of items
      orderChargeId: 0,
      chargeType: "",
      name: "",
      orderItemId: 0,
      documentName: documentData?.attachment?.fileName ? documentData?.attachment?.fileName : "",
      documentType: 0,
      base64File: documentData?.attachment?.base64Data ? documentData?.attachment?.base64Data : "",
      storagePath: "Order",
    };
    onhandleAddOrderData(requestBody)
    setIsDocumentData(true)
  }

  return (
    <div className="row">
      <ProductDetailsList onhandleProductDetailsListData={handleProductDetailsListData} isDocumentData={isDocumentData} />
      <div className="col-xl-6 col-2xl-6 col-lg-12 col-12">
        <VerifyProductDetail productId={productId} onVerifyProductList={handleVerifyProductDetail} setIsVerifyProduct={setIsVerifyProduct} />
      </div>
      <div className="col-12">
        <ProductPriceList productId={productId} onPriceListUpdate={handlePriceListUpdate} isVerifyProduct={isVerifyProduct} />
      </div>
      <div className="col-12 mt-3">
        <OrderItemsList priceList={priceList} verifyProductData={verifyProductData} onHandlePriceListAndVerifyProductData={handlePriceListAndVerifyProductData} />
      </div>
    </div>
  );
};

export default OrderItemDetail;
