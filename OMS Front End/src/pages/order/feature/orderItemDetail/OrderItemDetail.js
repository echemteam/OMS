/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
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

const OrderItemDetail = () => {
  const { productId } = useContext(AddOrderContext);

  const [priceList, setPriceList] = useState([]);
  const [verifyProductData, setVerifyProductData] = useState([]);
  // const [oldUpdatePriceList, setOldUpdatePriceList] = useState([]);

  // const handlePriceListUpdate = (updatedPriceList) => {
  //   debugger
  //   setOldUpdatePriceList(updatedPriceList)
  //   setPriceList(updatedPriceList);
  // };

  const handlePriceListUpdate = (updatedPriceList) => {
    // setOldUpdatePriceList(priceList);
  
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

  return (
    <div className="row">
      <ProductDetailsList />
      <div className="col-6">
        <VerifyProductDetail productId={productId} onVerifyProductList={handleVerifyProductDetail}/>
      </div>
      <div className="col-12">
        <ProductPriceList productId={productId}  onPriceListUpdate={handlePriceListUpdate} />
      </div>
      <div className="col-12 mt-3">
        <OrderItemsList priceList={priceList} verifyProductData={verifyProductData}/>
      </div>
    </div>
  );
};

export default OrderItemDetail;
