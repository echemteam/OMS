/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUpdateShppingDeliveryCarriersMutation } from "../../../../../../../app/services/customerSettingsAPI";
import FinalMolGrid from "../../../../../../../components/FinalMolGrid/FinalMolGrid";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { AccountGridConfig } from "../config/CarrierConfig";
import PropTypes from 'prop-types';
import ToastService from "../../../../../../../services/toastService/ToastService";

const CarrierList = ({ molGridRef, collectAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton, customerId, handleGetDefaultList }) => {

    // const [gridConfig, setGridConfig] = useState(AccountGridConfig);

    const [update, { isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateShppingDeliveryCarriersMutation();

    const handleEditClick = (data) => {
        const req = {
            customerId: customerId,
            isPrimary: data.isPrimary,
            accountNumber: data.accountNumber,
            customerDeliveryCarrierId: data.customerDeliveryCarrierId ? data.customerDeliveryCarrierId : 0,
            carrierId: data.carrier && typeof data.carrier === "object" ? data.carrier.value : data.carrierId,
            handlingFee: data.handlingFee
        }
        update(req)
    }

    const handleGridCheckBoxChange = (fieldName, rowData) => {
        handleEditClick(rowData);
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
                        ref={molGridRef}
                        configuration={AccountGridConfig}
                        dataSource={collectAccountData}
                        allowPagination={false}
                        onActionChange={actionHandler}
                        isLoading={isGetDataLoading}
                        onRowDataUpdate={handleEditClick}
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