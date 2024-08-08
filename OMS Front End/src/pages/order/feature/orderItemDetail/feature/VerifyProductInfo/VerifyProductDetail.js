/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../../../data/appIcons";
import Image from "../../../../../../components/image/Image";
import { ErrorMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";
import Checkbox from "../../../../../../components/ui/inputs/checkBox/CheckBox";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";

const VerifyProductDetail = ({ productId }) => {

    const [productDetail, setProductDetail] = useState();

    const [getThirdPartyApiResponse, { isLoading: isApiResponseLoading, isSuccess: isApiResponseSucess, data: isApiResponseData }] = useThirdPartyAPICallMutation();

    useEffect(() => {
        // productId && getProductDetailById();
        getProductDetailById();
    }, [productId]);

    useEffect(() => {
        if (isApiResponseSucess && isApiResponseData) {
            if (isApiResponseData.isSuccess) {
                const responseData = JSON.parse(isApiResponseData.data);
                let productDetail = responseData?.data;
                setProductDetail(productDetail);
            } else if (!isApiResponseData.isSuccess) {
                ToastService.warning(isApiResponseData.message);
            } else {
                ToastService.warning(ErrorMessage.DefaultMessage);
            }
        }
    }, [isApiResponseSucess, isApiResponseData]);

    const getProductDetailById = () => {
        let dynamicParameters = {
            productId: productId
        };
        let request = {
            eventName: EventName.PRODUCTDETAILS,
            isDynamicParameter: true,
            parameters: JSON.stringify(dynamicParameters)
        }
        getThirdPartyApiResponse(request);
    }

    return (

        <div className="verify-product-group">
            <div className="verify-product-label">Verify Product Details</div>
            {!isApiResponseLoading ?
                <div className="verify-product-details">
                    <div className="detail-row">
                        <span className="detail-label">Catalog ID</span>
                        <span className="detail-value">{productDetail?.CatalogId}</span>
                        <span className="detail-action"></span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Chemical Name</span>
                        <span className="detail-value">{productDetail?.ProductName}</span>
                        <span className="detail-action">
                            <button className="edit-button">
                                <Image imagePath={AppIcons.editThemeIcon} />
                            </button>
                            <div className="checkbox">
                                <Checkbox />
                            </div>
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">CAS Number</span>
                        <span className="detail-value">{productDetail?.CASNo}</span>
                        <span className="detail-action">
                            <button className="edit-button">
                                <Image imagePath={AppIcons.editThemeIcon} />
                            </button>
                            <div className="checkbox">
                                <Checkbox />
                            </div>
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">MDL Number</span>
                        <span className="detail-value">{productDetail?.MDLNo}</span>
                        <span className="detail-action">
                            <button className="edit-button">
                                <Image imagePath={AppIcons.editThemeIcon} />
                            </button>
                            <div className="checkbox">
                                <Checkbox />
                            </div>
                        </span>
                    </div>
                </div>
                : <DataLoader />
            }
        </div>

    )
}

export default VerifyProductDetail