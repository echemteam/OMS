/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { OurAccountGridConfig } from "../config/DevliveryConfig";
import PropTypes from 'prop-types';
import FinalMolGrid from "../../../../../../../components/FinalMolGrid/FinalMolGrid";
import { useUpdateDeliveryMethodsMutation } from "../../../../../../../app/services/customerSettingsAPI";
import ToastService from "../../../../../../../services/toastService/ToastService";

const DeliveryMethodList = ({ molGridRef, ourAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton, customerId, handleGetDefaultList }) => {

    // const [gridConfig, setGridConfig] = useState(OurAccountGridConfig);
    const [update, { isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateDeliveryMethodsMutation();

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

    const handleEditClick = (data) => {
        const req = {
            charge: data.charge,
            customerId: customerId,
            isPrimary: data.isPrimary,
            customerDeliveryMethodId: data.customerDeliveryMethodId ? data.customerDeliveryMethodId : 0,
            deliveryMethodId: data.deliveryMethodId && typeof data.deliveryMethodId === "object" ? data.deliveryMethodId.value : data.deliveryMethodId,
        }
        update(req)
    }

    // useState(() => {
    //     let configuration = { ...OurAccountGridConfig }
    //     configuration.handleRowDataUpdate = handleEditClick;
    //     setGridConfig(configuration);
    // }, [])

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
                        ref={molGridRef}
                        configuration={OurAccountGridConfig}
                        dataSource={ourAccountData}
                        allowPagination={false}
                        onActionChange={actionHandler}
                        isLoading={isGetDataLoading}
                        onRowDataUpdate={handleEditClick}
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