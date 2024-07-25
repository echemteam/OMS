import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
//** Libs's */
import { basicInfoData } from './Config/Existing.data';
import MolGrid from '../../../../components/Grid/MolGrid';
import CardSection from '../../../../components/ui/card/CardSection';
import SidebarModel from '../../../../components/ui/sidebarModel/SidebarModel';
//** Service's */
import { encryptUrlData } from '../../../../services/CryptoService';
import ToastService from '../../../../services/toastService/ToastService';
import { ErrorMessage } from '../../../../data/appMessages';

const ExistingCustomerSupplierInfo = forwardRef(({ parentRef, isSupplier, getExistingInfoByName }) => {

    //** State */
    const molGridRef = useRef();
    const [isExistingModel, setIsExistingModel] = useState(false);
    const [existingInfoData, setExistingInfoData] = useState([]);

    //** API Call's */
    const [checkExistingInformation, { isFetching: isGetSupplierDetailsBySupplierNameFetching, isSuccess: isGetSupplierDetailsBySupplierNameSucess,
        data: isGetSupplierDetailsBySupplierNameData, }] = getExistingInfoByName();

    //** UseEffect's */
    useEffect(() => {
        if (!isGetSupplierDetailsBySupplierNameFetching && isGetSupplierDetailsBySupplierNameSucess && isGetSupplierDetailsBySupplierNameData) {
            if (isGetSupplierDetailsBySupplierNameData.length > 0) {
                setIsExistingModel(true);
                setExistingInfoData(isGetSupplierDetailsBySupplierNameData)
            } else {
                ToastService.info(ErrorMessage.NoFound);
            }
        }
    }, [isGetSupplierDetailsBySupplierNameFetching, isGetSupplierDetailsBySupplierNameSucess, isGetSupplierDetailsBySupplierNameData]);

    //** Handle Function's */
    const handleEditClick = (data) => {
        let url;
        if (!isSupplier) {
            url = `/CustomerDetails/${encryptUrlData(data.customerId)}`;
        } else {
            url = `/SupplierDetails/${encryptUrlData(data.supplierId)}`;
        }
        window.open(url, "_blank");
    };
    const onHandleExistingInfo = (supplierName) => {
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
        <SidebarModel modalTitle={!isSupplier ? "Customer Information" : "Supplier Information"} contentClass="content-50 basic-info-model"
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

ExistingCustomerSupplierInfo.propTypes = {
    parentRef: PropTypes.shape({
        current: PropTypes.shape({
            callChildFunction: PropTypes.func
        })
    }).isRequired,
    isSupplier: PropTypes.bool.isRequired,
    getExistingInfoByName: PropTypes.func.isRequired
};

export default ExistingCustomerSupplierInfo;