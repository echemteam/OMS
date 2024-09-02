/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUpdateShppingDeliveryCarriersMutation } from "../../../../../../../app/services/customerSettingsAPI";
import FinalMolGrid from "../../../../../../../components/FinalMolGrid/FinalMolGrid";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { AccountGridConfig } from "../config/CarrierConfig";
import PropTypes from 'prop-types';
import ToastService from "../../../../../../../services/toastService/ToastService";
import { useValidateAndAddApprovalRequests } from "../../../../../../../utils/CustomHook/useValidateAndAddApproval";
import { FunctionalitiesName } from "../../../../../../../utils/Enums/ApprovalFunctionalities";

const CarrierList = ({ molGridRef, collectAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton, customerId,
    handleGetDefaultList, handleDeleteClick, isEditablePage }) => {

    const [dataSource, setDataSource] = useState(collectAccountData);
    const { ValidateRequestByApprovalRules } = useValidateAndAddApprovalRequests();

    const [update, { isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateShppingDeliveryCarriersMutation();

    useEffect(() => {
        if (!isGetDataLoading && collectAccountData) {
            // New blank row object
            const blankRow = {
                carrier: '', // Assuming movieId is a unique key, use an empty string or a temporary placeholder
                accountNumber: '',
                handlingFee: '',
                isPrimary: false,
            };

            setDataSource([...collectAccountData, blankRow]);
        }
    }, [collectAccountData, isGetDataLoading]);

    const handleEditClick = async (data, rowIndex) => {
        const req = {
            customerId: customerId,
            isPrimary: data.isPrimary,
            accountNumber: data.accountNumber,
            customerDeliveryCarrierId: data.customerDeliveryCarrierId || 0,
            carrierId: data.carrier?.value || data.carrierId,
            handlingFee: data.handlingFee
        };
        // if (isEditablePage) {
        //     await handleApprovalRequest(req, dataSource.initialState);
        // } else {
        let newGridData = [...dataSource]
        newGridData[rowIndex] = { ...dataSource[rowIndex], ...data };
        setDataSource(newGridData);
        update(req);
        // }
    }

    const handleGridCheckBoxChange = (fieldName, rowData) => {
        if (fieldName === 'isPrimary') {
            handleEditClick(rowData);
        }
    };

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            if (isUpdateData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isUpdateData.errorMessage);
                return;
            }
            handleGetDefaultList()
            ToastService.success(isUpdateData.errorMessage);
        }
    }, [isUpdateSuccess, isUpdateData]);

    return (
        <div className="first-card">
            <CardSection
                cardTitle="Carrier Details"
                rightButton={isShowButton}
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
                        onColumnChange={handleGridCheckBoxChange}
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