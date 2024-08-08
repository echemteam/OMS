/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
//** Lib's */
import MolGrid from "../../../../../../components/Grid/MolGrid";
import { priceListConfig } from "./config/ProductPriceList.data";
import { ErrorMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import CardSection from "../../../../../../components/ui/card/CardSection";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";

const ProductPriceList = ({ productId }) => {

    const molGridRef = useRef();
    const [priceList, setPriceList] = useState();

    const [getThirdPartyApiResponse, { isLoading: isApiResponseLoading, isSuccess: isApiResponseSucess, data: isApiResponseData }] = useThirdPartyAPICallMutation();

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

    const getProductPriceByProductId = () => {
        let dynamicParameters = {
            productId: productId
        };
        let request = {
            eventName: EventName.PRODUCTPRICELIST,
            isDynamicParameter: true,
            parameters: JSON.stringify(dynamicParameters)
        }
        getThirdPartyApiResponse(request);
    }

    return (
        <CardSection cardTitle="Product Price List">
            <MolGrid
                ref={molGridRef}
                dataSource={priceList}
                configuration={priceListConfig}
                allowPagination={false}
                isLoading={isApiResponseLoading}
            />
        </CardSection>
    )
}

export default ProductPriceList;