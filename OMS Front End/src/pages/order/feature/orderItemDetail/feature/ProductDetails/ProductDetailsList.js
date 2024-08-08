/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
//** Lib's */
import MolGrid from "../../../../../../components/Grid/MolGrid";
import { ErrorMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import CenterModel from "../../../../../../components/ui/centerModel/CenterModel";
import { productDetailsList, productListConfig } from "./config/productList.data";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";

const ProductDetailsList = () => {

    const ref = useRef();
    const molGridRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [productSearch, setProductSearch] = useState('');
    const [productDetailList, setProductDetailList] = useState([]);

    const [getThirdPartyApiResponse, { isSuccess: isApiResponseSucess, data: isApiResponseData }] = useThirdPartyAPICallMutation();

    useEffect(() => {
        if (isApiResponseSucess && isApiResponseData) {
            if (isApiResponseData.isSuccess) {
                const responseData = JSON.parse(isApiResponseData.data);
                let productDetail = responseData?.data;
                setProductDetailList(productDetail);
                setShowModal(!showModal);
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
        if (productSearch.trim() !== '') {
            if (productSearch.length > 3) {
                let dynamicParameters = {
                    searchText: productSearch
                };
                let request = {
                    eventName: EventName.PRODUCTSEARCH,
                    isDynamicParameter: true,
                    parameters: JSON.stringify(dynamicParameters)
                }
                getThirdPartyApiResponse(request);
            } else {
                ToastService.warning(ErrorMessage.SearchWarningMessage)
            }
        }
    };

    const handleInputFields = (data, dataField) => {
        if (dataField === 'productSearch') {
            setProductSearch(data.trim());
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleInputGroupButton();
        }
    };

    //** Form Handler */
    const formInputHandler = {
        INPUT_CHANGED: handleInputFields
    }

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
                    modelSizeClass="w-70">
                    <MolGrid
                        ref={molGridRef}
                        dataSource={productDetailList}
                        configuration={productListConfig}
                        allowPagination={false} />
                </CenterModel>
            </div>
        </>
    );
};

export default ProductDetailsList;