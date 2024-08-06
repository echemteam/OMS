/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { addEditCarrierFormData } from "../config/CarrierConfig";
import Buttons from "../../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import CenterModel from "../../../../../../../components/ui/centerModel/CenterModel";
import BasicDetailContext from "../../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import ToastService from "../../../../../../../services/toastService/ToastService";
import { useAddShppingDeliveryCarriersMutation, useUpdateShppingDeliveryCarriersMutation } from "../../../../../../../app/services/customerSettingsAPI";
import PropTypes from 'prop-types';

const AddEditCarrier = forwardRef(({ showModal, handleToggleModal, isEdit, onSuccess }) => {

    //** State */
    const ref = useRef();
    const { customerId } = useContext(BasicDetailContext);
    const [formData, setFormData] = useState(addEditCarrierFormData);

    //** API Call's */
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateShppingDeliveryCarriersMutation();
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddShppingDeliveryCarriersMutation();
  
    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        let request;
        if (data) {
            request = {
                customerId: customerId,
                isPrimary: data.isCarrierPrimary,
                accountNumber: data.accountNumber,
                customerDeliveryCarrierId: data.customerDeliveryCarrierId ? data.customerDeliveryCarrierId : 0,
                carrierId: data.carrier && typeof data.carrier === "object" ? data.carrier.value : data.carrierId,
                handlingFee: data.handlingFee
            }
            if (data && !data.customerDeliveryCarrierId) {
                addEdit(request)
            } else if (data && data.customerDeliveryCarrierId) {
                update(request);
            }
        }
    };

    //** UseEffect */
    useEffect(() => {
        if (isAddEditSuccess && isAddEditData) {
            if (isAddEditData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isAddEditData.errorMessage);
                return;
            }
            ToastService.success(isAddEditData.errorMessage);
            onSuccess();
        }
    }, [isAddEditSuccess, isAddEditData]);

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            if (isUpdateData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isUpdateData.errorMessage);
                return;
            }
            ToastService.success(isUpdateData.errorMessage);
            onSuccess();
        }
    }, [isUpdateSuccess, isUpdateData]);


    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Carrier" modelSizeClass="w-30" >
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        {/* {!isGetByIdFetching ? */}
                            <FormCreator config={formData} ref={ref} {...formData} />
                            {/* : <DataLoader /> */}
                        {/* } */}
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="d-flex align-item-end justify-content-end">
                        <div className="d-flex align-item-end">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText={isEdit ? 'Edit' : 'Add'}
                                onClick={handleAddEdit}
                                isLoading={isAddEditLoading || isUpdateLoading}
                            />
                            <Buttons
                                buttonTypeClassName="dark-btn ml-5"
                                buttonText="Cancel"
                                onClick={handleToggleModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CenterModel>
    )
});

AddEditCarrier.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    // deliveryCarrierId: PropTypes.number,
    onSuccess: PropTypes.func.isRequired,
};

export default AddEditCarrier;