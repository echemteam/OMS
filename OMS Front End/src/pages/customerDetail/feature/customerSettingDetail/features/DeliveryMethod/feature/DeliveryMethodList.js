/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { OurAccountGridConfig } from "../config/DevliveryConfig";
import PropTypes from 'prop-types';
import FinalMolGrid from "../../../../../../../components/FinalMolGrid/FinalMolGrid";
import { useUpdateDeliveryMethodsMutation } from "../../../../../../../app/services/customerSettingsAPI";
import ToastService from "../../../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const DeliveryMethodList = ({ molGridRef, ourAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton,
    customerId, handleGetDefaultList, handleDeleteClick, isEditablePage, customerStatusId }) => {

    const [dataSource, setDataSource] = useState(ourAccountData);
    const { subCustomer, getCustomerCompletionCount } = useContext(BasicDetailContext);
    const [update, { isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateDeliveryMethodsMutation();

    useEffect(() => {
        if (!isGetDataLoading && ourAccountData) {
            setDataSource([...ourAccountData]);
        }
    }, [ourAccountData, isGetDataLoading]);

    const handleEditClick = async (data, rowIndex) => {
        const req = {
            charge: data.charge,
            customerId: customerId,
            isPrimary: data.isPrimary,
            customerDeliveryMethodId: data.customerDeliveryMethodId ? data.customerDeliveryMethodId : 0,
            deliveryMethodId: data.deliveryMethodId && typeof data.deliveryMethodId === "object" ? data.deliveryMethodId.value : data.deliveryMethodId,
            chargeType: data?.name,
            zone: data?.zone,
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
                cardTitle="Delivery Method Details"
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
                        configuration={OurAccountGridConfig}
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

DeliveryMethodList.propTypes = {
    molGridRef: PropTypes.object.isRequired,
    ourAccountData: PropTypes.array.isRequired,
    actionHandler: PropTypes.object.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    isGetDataLoading: PropTypes.bool.isRequired,
    isShowButton: PropTypes.bool.isRequired,
    customerId: PropTypes.number.isRequired,
    handleGetDefaultList: PropTypes.func.isRequired
};

export default DeliveryMethodList;