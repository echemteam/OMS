import React, { useEffect, useRef, useState } from 'react';
//** Libs's */
import MolGrid from '../../../../components/Grid/MolGrid';
import { basicInfoData } from './config/BasicDetailForm.data';
//** Service's */
import { encryptUrlData } from '../../../../services/CryptoService';
import ToastService from '../../../../services/toastService/ToastService';
import { useLazyGetSupplierDetailsBySupplierNameQuery } from '../../../../app/services/supplierAPI';

export const BasicInformation = ({ setIsShowModel }) => {

    const molGridRef = useRef();
    const [supplierInfoData, setSupplierInfoData] = useState(false);

    const [getSupplierDetailsBySupplierName, { isFetching: isGetSupplierDetailsBySupplierNameFetching, isSuccess: isGetSupplierDetailsBySupplierNameSucess, data: isGetSupplierDetailsBySupplierNameData, }] = useLazyGetSupplierDetailsBySupplierNameQuery();


    useEffect(() => {
        if (!isGetSupplierDetailsBySupplierNameFetching && isGetSupplierDetailsBySupplierNameSucess && isGetSupplierDetailsBySupplierNameData) {
            if (isGetSupplierDetailsBySupplierNameData.length > 0) {
                setIsShowModel(true)
                setSupplierInfoData(isGetSupplierDetailsBySupplierNameData)
            } else {
                ToastService.warning("No record found");
            }
        }
    }, [isGetSupplierDetailsBySupplierNameFetching, isGetSupplierDetailsBySupplierNameSucess, isGetSupplierDetailsBySupplierNameData]);

    const handleEditClick = (data) => {
        let url;
        if (data.customerId) {
            url = `/viewCustomer/${encryptUrlData(data.customerId)}`;
        } else {
            url = `/SupplierDetails/${encryptUrlData(data.supplierId)}`;
        }
        window.open(url, "_blank");
    };

    const actionHandler = {
        EDIT: handleEditClick,
    };

    return (
        <div className="row input-list-button">
            <div className="col-lg-12 table-striped">
                <MolGrid
                    ref={molGridRef}
                    configuration={basicInfoData}
                    dataSource={supplierInfoData}
                    onActionChange={actionHandler} />
            </div>
        </div>
    )
}
