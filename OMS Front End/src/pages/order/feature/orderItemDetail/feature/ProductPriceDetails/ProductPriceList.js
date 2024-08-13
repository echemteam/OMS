/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
//** Lib's */
import { priceListConfig } from "./config/ProductPriceList.data";
import { ErrorMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import CardSection from "../../../../../../components/ui/card/CardSection";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";

const ProductPriceList = ({ productId }) => {
  const molGridRef = useRef();
  const [gridConfig, setGridConfig] = useState(priceListConfig);
  const [priceList, setPriceList] = useState([
    {
      Quantity: "10g",
      Size: "Box",
      Price: "$50",
      isPrimary: "Special order",
      priorityDate: 1,
    },
    {
      Quantity: "20g",
      Size: "Pack",
      Price: "$90",
      isPrimary: "Urgent",
      priorityDate: 2,
    },
    {
      Quantity: "50g",
      Size: "Box",
      Price: "$200",
      isPrimary: "Regular order",
      priorityDate: 3,
    },
    {
      Quantity: "100g",
      Size: "Pack",
      Price: "$350",
      isPrimary: "Special order",
      priorityDate: 4,
    },
    {
      Quantity: "500g",
      Size: "Box",
      Price: "$1200",
      isPrimary: "Urgent",
      priorityDate: 1,
    },
  ]);

  const [
    getThirdPartyApiResponse,
    {
      isLoading: isApiResponseLoading,
      isSuccess: isApiResponseSucess,
      data: isApiResponseData,
    },
  ] = useThirdPartyAPICallMutation();

  useEffect(() => {
    // productId && getProductPriceByProductId();
    getProductPriceByProductId();
  }, [productId]);

  useEffect(() => {
    if (isApiResponseSucess && isApiResponseData) {
      if (isApiResponseData.isSuccess) {
        const responseData = JSON.parse(isApiResponseData.data);
        setPriceList(responseData?.data);
        console.log(responseData?.data);
      } else if (!isApiResponseData.isSuccess) {
        ToastService.warning(isApiResponseData.message);
      } else {
        ToastService.warning(ErrorMessage.DefaultMessage);
      }
    }
  }, [isApiResponseSucess, isApiResponseData]);

  useEffect(() => {
    if (priceListConfig?.columns) {
      // New blank row object
      const blankRow = {
        size: '',
        unit: '',
        price: '',
        orderNote: '',
        reqDate: '',
        priorityDate: '',
        promiseDate: '',
        priority: '',
        action: '',
      };

      setPriceList((prev) => [...prev]);
    }
  }, []);

  const getProductPriceByProductId = () => {
    let dynamicParameters = {
      productId: productId,
    };
    let request = {
      eventName: EventName.AURUMPRODUCTPRICELIST,
      isDynamicParameter: true,
      parameters: JSON.stringify(dynamicParameters),
    };
    getThirdPartyApiResponse(request);
  };

  const handleEditClick = (data, rowIndex) => {
    alert("Editing row", rowIndex);
    let newGridData = [...priceList];
    newGridData[rowIndex] = { ...priceList[rowIndex], ...data };
    setPriceList(newGridData);
  };

  return (
    <CardSection cardTitle="Product Price List">
      <FinalMolGrid
        ref={molGridRef}
        dataSource={priceList}
        configuration={gridConfig}
        allowPagination={false}
        isLoading={isApiResponseLoading}
        onRowDataUpdate={handleEditClick}
      />
    </CardSection>
  );
};

export default ProductPriceList;
