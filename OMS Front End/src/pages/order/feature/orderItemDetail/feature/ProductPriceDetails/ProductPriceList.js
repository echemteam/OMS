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
  const [priceList, setPriceList] = useState([]);

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
    if (productId) {
      getProductPriceByProductId();
    }
  }, [productId]);

  useEffect(() => {
    if (isApiResponseSucess && isApiResponseData) {
      if (isApiResponseData.isSuccess) {
        const responseData = JSON.parse(isApiResponseData.data);
        setPriceList(responseData?.data);
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
      // const blankRow = {
      //   size: '',
      //   unit: '',
      //   price: '',
      //   orderNote: '',
      //   reqDate: '',
      //   priorityDate: '',
      //   promiseDate: '',
      //   priority: '',
      //   action: '',
      // };

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

  console.log("priceList", priceList)

  return (
    <CardSection cardTitle="Product Price List">
      <div className="order-price-list">
        <FinalMolGrid
          ref={molGridRef}
          dataSource={priceList}
          configuration={priceListConfig}
          allowPagination={false}
          isLoading={isApiResponseLoading}
          onRowDataUpdate={handleEditClick}
        />
      </div>
    </CardSection>
  );
};

export default ProductPriceList;
