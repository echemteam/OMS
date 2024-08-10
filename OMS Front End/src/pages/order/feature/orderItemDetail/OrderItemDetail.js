/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

//** Component's */
const OrderItemsList = React.lazy(() => import("./feature/OrderItemDetails/OrderItemsList"));
const ProductDetailsList = React.lazy(() => import("./feature/ProductDetails/ProductDetailsList"));
const ProductPriceList = React.lazy(() => import("./feature/ProductPriceDetails/ProductPriceList"));
const VerifyProductDetail = React.lazy(() => import("./feature/VerifyProductInfo/VerifyProductDetail"));


const OrderItemDetail = () => {

  const [productId, setProductId] = useState(2);

  return (
    <div className="row">
      <ProductDetailsList setProductId={setProductId} />
      <div className="col-6">
        <VerifyProductDetail productId={productId} />
      </div>
      <ProductPriceList productId={productId} />
      <div className="col-12 mt-3">
        <OrderItemsList />
      </div>
    </div>
  );
};

export default OrderItemDetail;
