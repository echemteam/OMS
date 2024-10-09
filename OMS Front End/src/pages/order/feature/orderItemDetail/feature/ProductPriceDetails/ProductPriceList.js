/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
//** Lib's */
import { priceListConfig } from "./config/ProductPriceList.data";
import { ErrorMessage, SuccessMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import CardSection from "../../../../../../components/ui/card/CardSection";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";
import Buttons from "../../../../../../components/ui/button/Buttons";
import SwalAlert from "../../../../../../services/swalService/SwalService";

const ProductPriceList = ({ productId, onPriceListUpdate, isVerifyProduct }) => {
  const molGridRef = useRef();
  const [priceList, setPriceList] = useState([]);
  const { confirm } = SwalAlert();

  useEffect(() => {
    if (priceList) {
      const blankRow = {
        orderPriority: "",
        promiseDate: '',
        requestDate: '',
        orderNote: '',
        Price: '',
        Size: '',
        Unit: '',
        Package: ''
      };

      setPriceList([...priceList, blankRow]);
    }
  }, []);

  const handleAddRow = () => {
    const blankRow = {
      orderPriority: "",
      promiseDate: '',
      requestDate: '',
      orderNote: '',
      Price: '',
      Size: '',
      Unit: '',
      Quantity: 1
    };
    setPriceList(prevData => [...prevData, blankRow]);
  };

  const [
    getThirdPartyApiResponse,
    {
      isLoading: isApiResponseLoading,
      isSuccess: isApiResponseSucess,
      data: isApiResponseData,
    },
  ] = useThirdPartyAPICallMutation();

  useEffect(() => {
    if (productId) {
      getProductPriceByProductId();
    }
  }, [productId]);

  const mapApiResponseToPriceList = (responseData) => {
    return responseData.map(item => ({
      orderPriority: item.orderPriority || "",
      promiseDate: item.promiseDate || '',
      requestDate: item.requestDate || '',
      orderNote: item.orderNote || '',
      Price: item.Price || '',
      Size: item.Size || '',
      Unit: item.Unit || '', // Ensure this is mapped properly
      Quantity: 1
    }));
  };

  useEffect(() => {
    if (isApiResponseSucess && isApiResponseData) {
      if (isApiResponseData.isSuccess) {
        const responseData = JSON.parse(isApiResponseData.data);
        const mappedData = mapApiResponseToPriceList(responseData?.data || []);
        setPriceList(mappedData);
      } else {
        ToastService.warning(isApiResponseData.message || ErrorMessage.DefaultMessage);
      }
    }
  }, [isApiResponseSucess, isApiResponseData]);

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
    if (isVerifyProduct) {
      const updatedRow = {
        ...priceList[rowIndex],
        ...data,
      };
      const updatedPriceList = priceList.map((row, index) =>
        index === rowIndex ? updatedRow : row
      );
      setPriceList(updatedPriceList);
      if (updatedRow.Size === '' || !updatedRow.Size) {
        return ToastService.warning("Please enter size");
      } else if (updatedRow.Unit === '' || !updatedRow.Unit) {
        return ToastService.warning("Please enter unit");
      } else if (updatedRow.Price === '' || !updatedRow.Price) {
        return ToastService.warning("Please enter price");
      } else {
        onPriceListUpdate(updatedRow);
      }
    } else {
      ToastService.warning(SuccessMessage.VerifyProduct)
    }
  };

  const handleDeleteClick = (rowIndex) => {
    confirm(
      "Delete?",
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        const updatedPriceList = priceList.filter((_, index) => index !== rowIndex);
        setPriceList(updatedPriceList);
      }
    });
  }

  // const actionHandler = {
  //   // EDIT: handleEditClick,
  //   // DELETE: handleDeleteClick,
  // };

  return (
    <CardSection
      cardTitle="Product Price List"
      rightButton={true}
      buttonClassName="theme-button my-2"
      titleButtonClick={handleAddRow}
      buttonText="Add Row"
    >
      <div className="order-price-list responsive-grid">
        <FinalMolGrid
          key={JSON.stringify(priceList)}
          ref={molGridRef}
          dataSource={priceList}
          configuration={priceListConfig}
          isLoading={isApiResponseLoading}
          onRowDataUpdate={handleEditClick}
          onRowDataDelete={handleDeleteClick}
          allowPagination={false}
        // onActionChange={actionHandler}
        />
        {/* <Buttons
          onClick={handleAddRow}
          buttonTypeClassName="theme-button my-2"
          buttonText={"Add Row"}
        /> */}
      </div>
    </CardSection>
  );
};

export default ProductPriceList;
