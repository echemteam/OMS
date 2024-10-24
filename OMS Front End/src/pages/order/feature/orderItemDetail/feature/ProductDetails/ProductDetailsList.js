/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { ErrorMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import CenterModel from "../../../../../../components/ui/centerModel/CenterModel";
import {
  productDetailsList,
  productListConfig,
} from "./config/productList.data";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";
import AddOrderContext from "../../../../../../utils/Order/AddOrderContext";

const ProductDetailsList = ({ onhandleProductDetailsListData, isDocumentData }) => {
  // const ref = useRef();
  const molGridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  // const [selectedProduct, setSelectedProduct] = useState();
  const [productDetailList, setProductDetailList] = useState([]);
  const { setProductId, documentRef } = useContext(AddOrderContext);

  const [
    getThirdPartyApiResponse,
    {
      isLoading: isApiResponseLoading,
      isSuccess: isApiResponseSucess,
      data: isApiResponseData,
    },
  ] = useThirdPartyAPICallMutation();

  useEffect(() => {
    if (isApiResponseSucess && isApiResponseData) {
      if (isApiResponseData.isSuccess) {
        const responseData = JSON.parse(isApiResponseData.data);
        let productDetail = responseData?.data;
        setProductDetailList(productDetail);
      } else if (!isApiResponseData.isSuccess) {
        ToastService.warning(isApiResponseData.message);
      } else {
        ToastService.warning(ErrorMessage.DefaultMessage);
      }
    }
  }, [isApiResponseSucess, isApiResponseData]);

  const handleToggleCenterModal = () => {
    setShowModal(!showModal);
  };

  const handleInputGroupButton = () => {
    if (productSearch.trim() !== "") {
      if (productSearch.length > 3) {
        setShowModal(true);
        let dynamicParameters = {
          searchText: productSearch,
        };
        let request = {
          eventName: EventName.AURUMPRODUCTSEARCH,
          isDynamicParameter: true,
          parameters: JSON.stringify(dynamicParameters),
        };
        getThirdPartyApiResponse(request);
      } else {
        ToastService.warning(ErrorMessage.SearchWarningMessage);
      }
    }
  };

  const handleInputFields = (data, dataField) => {
    if (dataField === "productSearch") {
      setProductSearch(data.trim());
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleInputGroupButton();
    }
  };

  const handleRowSelect = (rowIndex, rowData) => {
    setProductId(rowIndex.ProductId)
    setShowModal(false);
  };

  const handleColumnsChange = (fieldName, rowData, rowIndex) => {
    let newGridData = [...productDetailList];
    newGridData[rowIndex] = { ...productDetailList[rowIndex], ...rowData };
    setProductDetailList(newGridData);
  };

  //** Form Handler */
  const formInputHandler = {
    INPUT_CHANGED: handleInputFields,
  };

  // useEffect(() => {
  //   if (isDocumentData) {
  //     const data = ref.current.getFormData();
  //     if (data) {
  //       let req = {
  //         documentName: data.attachment.fileName,
  //         base64File: data.attachment.base64Data,
  //       }
  //       onhandleProductDetailsListData(req)
  //     }
  //   }
  // }, [isDocumentData])

  // const onFormStateChange = (data) => {
  //   if (data) {
  //     let req = {
  //       documentName: data.attachment.fileName,
  //       base64File: data.attachment.base64Data,
  //     }
  //     onhandleProductDetailsListData(req)
  //   }
  // };

  return (
    <>
      <div className="col-xl-6 col-2xl-6 col-lg-12 col-12">
        <form onKeyPress={handleKeyPress}>
          <FormCreator
            config={productDetailsList}
            ref={documentRef}
            onInputChange={formInputHandler}
            handleInputGroupButton={handleInputGroupButton}
          />
        </form>
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleCenterModal}
          modalTitle="Product Details"
          modelSizeClass="w-80"
        >

          <div className="product-details-hight">
            <div className="radio-grid">
              <FinalMolGrid
                ref={molGridRef}
                dataSource={productDetailList}
                configuration={productListConfig}
                allowPagination={false}
                isLoading={isApiResponseLoading}
                onRowSelect={handleRowSelect}
                onColumnChange={handleColumnsChange}
              />
            </div>
          </div>
        </CenterModel>
      </div>
    </>
  );
};

export default ProductDetailsList;
