import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
//** Libs's */
import { basicInfoData } from './Config/Existing.data';
import MolGrid from '../../../../components/Grid/MolGrid';
import CardSection from '../../../../components/ui/card/CardSection';
import SidebarModel from '../../../../components/ui/sidebarModel/SidebarModel';
//** Service's */
import { encryptUrlData } from '../../../../services/CryptoService';
import ToastService from '../../../../services/toastService/ToastService';

const ExistingCustomerSupplierInfo = forwardRef(({ parentRef, isSupplier, getExistingInfoByName }) => {

    //** State */
    const molGridRef = useRef();
    const [isExistingModel, setIsExistingModel] = useState(false);
    const [existingInfoData, setExistingInfoData] = useState(false);

    //** API Call's */
    const [checkExistingInformation, { isFetching: isGetSupplierDetailsBySupplierNameFetching, isSuccess: isGetSupplierDetailsBySupplierNameSucess,
        data: isGetSupplierDetailsBySupplierNameData, }] = getExistingInfoByName();

    //** UseEffect's */
    useEffect(() => {
        if (!isGetSupplierDetailsBySupplierNameFetching && isGetSupplierDetailsBySupplierNameSucess && isGetSupplierDetailsBySupplierNameData) {
            if (isGetSupplierDetailsBySupplierNameData.length > 0) {
                setExistingInfoData(isGetSupplierDetailsBySupplierNameData)
            } else {
                ToastService.warning("No record found");
            }
        }
    }, [isGetSupplierDetailsBySupplierNameFetching, isGetSupplierDetailsBySupplierNameSucess, isGetSupplierDetailsBySupplierNameData]);

    //** Handle Function's */
    const handleEditClick = (data) => {
        let url;
        if (!isSupplier) {
            url = `/viewCustomer/${encryptUrlData(data.customerId)}`;
        } else {
            url = `/SupplierDetails/${encryptUrlData(data.supplierId)}`;
        }
        window.open(url, "_blank");
    };
    const onHandleExistingInfo = (supplierName) => {
        setIsExistingModel(true);
        checkExistingInformation(supplierName);
    };

    //** Action Handler */
    const actionHandler = {
        EDIT: handleEditClick,
    };

    const sidebarClose = () => {
        setIsExistingModel(false);
    }

    //** Use Imperative Handle */
    useImperativeHandle(parentRef, () => ({
        callChildFunction: onHandleExistingInfo
    }));

    return (
        <SidebarModel modalTitle="Supplier Information" contentClass="content-50 basic-info-model"
            onClose={sidebarClose} isOpen={isExistingModel}>
            <div className='pop-up-input-btn mt-3'>
                <CardSection>
                    <div className="row input-list-button">
                        <div className="col-lg-12 table-striped">
                            <MolGrid
                                ref={molGridRef}
                                configuration={basicInfoData}
                                dataSource={existingInfoData}
                                onActionChange={actionHandler}
                                isLoading={isGetSupplierDetailsBySupplierNameFetching} />
                        </div>
                    </div>
                </CardSection>
            </div>
        </SidebarModel>
    )
});


export default ExistingCustomerSupplierInfo;