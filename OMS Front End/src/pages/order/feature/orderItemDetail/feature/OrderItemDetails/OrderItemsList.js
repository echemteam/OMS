/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import CardSection from "../../../../../../components/ui/card/CardSection";
import { orderItemSelectList } from "./config/OrderItem.data";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";

const OrderItemsList = ({ priceList, verifyProductData, onHandlePriceListAndVerifyProductData }) => {

  const molGridRef = useRef();

  // Ensure priceList is an array
  const validPriceList = Array.isArray(priceList) ? priceList : [priceList];

  // Merge priceList and verifyProductData
  const mergedData = validPriceList.map(item => ({
    ...verifyProductData,
    ...item,
  }));

  useEffect(() => {
    if (priceList) {
      onHandlePriceListAndVerifyProductData(mergedData)
    }
  }, [priceList])

  return (
    <CardSection cardTitle="Order Item List">
      <FinalMolGrid
        ref={molGridRef}
        dataSource={mergedData}
        configuration={orderItemSelectList}
        allowPagination={false}
      />
    </CardSection>
  );
}

export default OrderItemsList;