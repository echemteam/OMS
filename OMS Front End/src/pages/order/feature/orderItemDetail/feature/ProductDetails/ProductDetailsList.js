/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
//** Lib's */
import MolGrid from "../../../../../../components/Grid/MolGrid";
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

const ProductDetailsList = () => {
  const ref = useRef();
  const molGridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productDetailList, setProductDetailList] = useState([
    {
      ProductName: "Acetone",
      CatalogId: "CAT001",
      CASNumber: "67-64-1",
      MDLNumber: "MFCD00009035",
    },
    {
      ProductName: "Benzene",
      CatalogId: "CAT002",
      CASNumber: "71-43-2",
      MDLNumber: "MFCD00003006",
    },
    {
      ProductName: "Chloroform",
      CatalogId: "CAT003",
      CASNumber: "67-66-3",
      MDLNumber: "MFCD00000814",
    },
    {
      ProductName: "Ethanol",
      CatalogId: "CAT004",
      CASNumber: "64-17-5",
      MDLNumber: "MFCD00003568",
    },
    {
      ProductName: "Formaldehyde",
      CatalogId: "CAT005",
      CASNumber: "50-00-0",
      MDLNumber: "MFCD00003274",
    },
    {
      ProductName: "Glycerol",
      CatalogId: "CAT006",
      CASNumber: "56-81-5",
      MDLNumber: "MFCD00004722",
    },
    {
      ProductName: "Hexane",
      CatalogId: "CAT007",
      CASNumber: "110-54-3",
      MDLNumber: "MFCD00009077",
    },
    {
      ProductName: "Isopropanol",
      CatalogId: "CAT008",
      CASNumber: "67-63-0",
      MDLNumber: "MFCD00011674",
    },
    {
      ProductName: "Methanol",
      CatalogId: "CAT009",
      CASNumber: "67-56-1",
      MDLNumber: "MFCD00004595",
    },
    {
      ProductName: "Toluene",
      CatalogId: "CAT010",
      CASNumber: "108-88-3",
      MDLNumber: "MFCD00008512",
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
        setShowModal(!showModal);
        let dynamicParameters = {
          searchText: productSearch,
        };
        let request = {
          eventName: EventName.PRODUCTSEARCH,
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
    console.log("Row Selected", rowIndex, rowData);
  };

  const handleColumnsChange = (fieldName, rowData, rowIndex) => {
    console.log("On Change called", fieldName);
    let newGridData = [...productDetailList];
    newGridData[rowIndex] = { ...productDetailList[rowIndex], ...rowData };
    setProductDetailList(newGridData);
  };

  //** Form Handler */
  const formInputHandler = {
    INPUT_CHANGED: handleInputFields,
  };

  return (
    <>
      <div className="col-6">
        <form onKeyPress={handleKeyPress}>
          <FormCreator
            config={productDetailsList}
            ref={ref}
            onInputChange={formInputHandler}
            handleInputGroupButton={handleInputGroupButton}
          />
        </form>
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleCenterModal}
          modalTitle="Product Details"
          modelSizeClass="w-70"
        >
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
        </CenterModel>
      </div>
    </>
  );
};

export default ProductDetailsList;
