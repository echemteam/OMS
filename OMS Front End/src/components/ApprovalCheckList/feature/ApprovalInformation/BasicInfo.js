import React, { useEffect, useState } from "react";

const BasicInformation = ({ isModelOpen, mainId, getBasicInformationById }) => {

    const [basicInformation, setBasicInformation] = useState();

    //** API Call's */
    const [getCustomerBasicInfoById, { isFetching: isGetCustomerBasicInfoByIdFetching, isSuccess: isGetCustomerBasicInfoByIdSuccess, data: isGetCustomerBasicInfoByIdData }]
        = getBasicInformationById();

    useEffect(() => {
        if (isModelOpen && mainId) {
            getCustomerBasicInfoById(mainId);
        }
    }, [isModelOpen, mainId]);

    useEffect(() => {
        if (!isGetCustomerBasicInfoByIdFetching && isGetCustomerBasicInfoByIdSuccess && isGetCustomerBasicInfoByIdData) {
            setBasicInformation(isGetCustomerBasicInfoByIdData);
        }
    }, [isGetCustomerBasicInfoByIdFetching, isGetCustomerBasicInfoByIdSuccess, isGetCustomerBasicInfoByIdData]);

    return (
        <React.Fragment>
            <h5> Basic Information </h5>
            {basicInformation && <h6> Tax Id: {basicInformation.taxId}</h6>}
        </React.Fragment>
    )
}

export default BasicInformation;