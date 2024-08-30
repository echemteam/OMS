/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import CardSection from "../../../../../../components/ui/card/CardSection";
import { orderItemSelectList } from "./config/OrderItem.data";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";

const OrderItemsList = ({ priceList, verifyProductData }) => {

    // console.log("priceList", priceList)
    // console.log("verifyProductData", verifyProductData)
    
    const molGridRef = useRef();

    // Ensure priceList is an array
    const validPriceList = Array.isArray(priceList) ? priceList : [priceList];
  
    // Merge priceList and verifyProductData
    const mergedData = validPriceList.map(item => ({
      ...verifyProductData,
      ...item,
    }));
  
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