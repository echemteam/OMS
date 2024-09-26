/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useUpdateShppingDeliveryCarriersMutation } from "../../../../../../../app/services/customerSettingsAPI";
import FinalMolGrid from "../../../../../../../components/FinalMolGrid/FinalMolGrid";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { AccountGridConfig } from "../config/CarrierConfig";
import PropTypes from 'prop-types';
import ToastService from "../../../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const CarrierList = ({ molGridRef, collectAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton, customerId,
    handleGetDefaultList, handleDeleteClick, isEditablePage, customerStatusId }) => {

    const [dataSource, setDataSource] = useState(collectAccountData);
    const { subCustomer, getCustomerCompletionCount } = useContext(BasicDetailContext);
    const [update, { isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateShppingDeliveryCarriersMutation();

    useEffect(() => {
        if (!isGetDataLoading && collectAccountData) {
            setDataSource([...collectAccountData]);
        }
    }, [collectAccountData, isGetDataLoading]);

    const handleEditClick = async (data, rowIndex) => {
        const req = {
            customerId: customerId,
            isPrimary: data.isPrimary,
            accountNumber: data.accountNumber,
            customerDeliveryCarrierId: data.customerDeliveryCarrierId || 0,
            carrierId: data.carrier?.value || data.carrierId,
            handlingFee: data.handlingFee,
            carrierName: data?.carrier
        };
        let newGridData = [...dataSource]
        newGridData[rowIndex] = { ...dataSource[rowIndex], ...data };
        setDataSource(newGridData);
        update(req);
    }

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            if (isUpdateData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isUpdateData.errorMessage);
                return;
            }
            handleGetDefaultList()
            ToastService.success(isUpdateData.errorMessage);
            getCustomerCompletionCount(customerId, subCustomer);
        }
    }, [isUpdateSuccess, isUpdateData]);

    return (
        <div className="first-card">
            <CardSection
                cardTitle="Carrier Details"
                rightButton={false}
                buttonClassName="theme-button "
                buttonText="Add"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                titleButtonClick={handleToggleModal}>
                <div className="account-table table-striped mb-3">
                    <FinalMolGrid
                        key={JSON.stringify(dataSource)}
                        ref={molGridRef}
                        configuration={AccountGridConfig}
                        dataSource={dataSource}
                        allowPagination={false}
                        onActionChange={actionHandler}
                        isLoading={isGetDataLoading}
                        onRowDataUpdate={handleEditClick}
                        onRowDataDelete={handleDeleteClick}
                    />
                </div>
            </CardSection>
        </div>
    )
}

CarrierList.propTypes = {
    molGridRef: PropTypes.object.isRequired,
    collectAccountData: PropTypes.array.isRequired,
    actionHandler: PropTypes.object.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    isGetDataLoading: PropTypes.bool.isRequired,
    isShowButton: PropTypes.bool.isRequired,
    customerId: PropTypes.number.isRequired,
    handleGetDefaultList: PropTypes.func.isRequired
};

export default CarrierList;