/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { OurAccountGridConfig } from "../config/DevliveryConfig";
import PropTypes from 'prop-types';
import FinalMolGrid from "../../../../../../../components/FinalMolGrid/FinalMolGrid";
import { useUpdateDeliveryMethodsMutation } from "../../../../../../../app/services/customerSettingsAPI";
import ToastService from "../../../../../../../services/toastService/ToastService";

const DeliveryMethodList = ({ molGridRef, ourAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton, customerId, handleGetDefaultList , handleDeleteClick }) => {

    const [dataSource, setDataSource] = useState(ourAccountData);
    const [update, { isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateDeliveryMethodsMutation();

    useEffect(() => {
        if (!isGetDataLoading && ourAccountData) {
            // New blank row object
            const blankRow = {
                zone: '', // Assuming movieId is a unique key, use an empty string or a temporary placeholder
                name: '',
                charge: '',
                isPrimary: false,
            };

            setDataSource([...ourAccountData, blankRow]);
        }
    }, [ourAccountData, isGetDataLoading]);

    const handleEditClick = (data, rowIndex) => {
        let newGridData = [...dataSource]
        newGridData[rowIndex] = { ...dataSource[rowIndex], ...data };
        setDataSource(newGridData);

        const req = {
            charge: data.charge,
            customerId: customerId,
            isPrimary: data.isPrimary,
            customerDeliveryMethodId: data.customerDeliveryMethodId ? data.customerDeliveryMethodId : 0,
            deliveryMethodId: data.deliveryMethodId && typeof data.deliveryMethodId === "object" ? data.deliveryMethodId.value : data.deliveryMethodId,
        };
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
        }
    }, [isUpdateSuccess, isUpdateData]);

    return (
        <div className="first-card">
            <CardSection
                cardTitle="Delivery Method Details"
                rightButton={isShowButton ? true : false}
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