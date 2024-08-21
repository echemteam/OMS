/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";

//** Component's */
const OrderItemsList = React.lazy(() => import("./feature/OrderItemDetails/OrderItemsList"));
const ProductDetailsList = React.lazy(() => import("./feature/ProductDetails/ProductDetailsList"));
const ProductPriceList = React.lazy(() => import("./feature/ProductPriceDetails/ProductPriceList"));
const VerifyProductDetail = React.lazy(() => import("./feature/VerifyProductInfo/VerifyProductDetail"));


const OrderItemDetail = () => {

  const { productId } = useContext(AddOrderContext);

  return (
    <div className="row">
      <ProductDetailsList />
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
