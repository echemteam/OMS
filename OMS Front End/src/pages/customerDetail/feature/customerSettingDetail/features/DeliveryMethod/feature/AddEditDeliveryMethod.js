/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { addEditDeliveryFormData } from "../config/DevliveryConfig";
import Buttons from "../../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import CenterModel from "../../../../../../../components/ui/centerModel/CenterModel";
import BasicDetailContext from "../../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import ToastService from "../../../../../../../services/toastService/ToastService";
import { useAddDeliveryMethodsMutation, useLazyGetCustomerDeliveryMethodByCustomerDeliveryMethodIdQuery, useUpdateDeliveryMethodsMutation } from "../../../../../../../app/services/customerSettingsAPI";
import { setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import DataLoader from "../../../../../../../components/ui/dataLoader/DataLoader";

const AddEditDeliveryMethod = forwardRef(({ showModal, handleToggleModal, isEdit, deliveryMethodId, onSuccess }) => {
    //** State */
    const ref = useRef();
    const { customerId } = useContext(BasicDetailContext);
    const [formData, setFormData] = useState(addEditDeliveryFormData);

    //** API Call's */
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateDeliveryMethodsMutation();
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddDeliveryMethodsMutation();
    const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSuccess, data: isGetByIdData }] = useLazyGetCustomerDeliveryMethodByCustomerDeliveryMethodIdQuery();

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        let request;
        if (data) {
            request = {
                charge: data.charge,
                customerId: customerId,
                isPrimary: data.isDeliveryMethodPrimary,
                customerDeliveryMethodId: data.customerDeliveryMethodId ? data.customerDeliveryMethodId : 0,
                deliveryMethodId: data.chargeType && typeof data.chargeType === "object" ? data.chargeType.value : data.chargeType,
            }
            if (data && !data.customerDeliveryMethodId) {
                addEdit(request)
            } else if (data && data.customerDeliveryMethodId) {
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

    useEffect(() => {
        if (!isGetByIdFetching && isGetByIdSuccess && isGetByIdData) {
            let form = { ...addEditDeliveryFormData };
            form.initialState = {
                ...isGetByIdData,
                charge: isGetByIdData.charge,
                chargeType: isGetByIdData.deliveryMethodId,
                isDeliveryMethodPrimary: isGetByIdData.isPrimary
            }
            setFormData(form);
        }
    }, [isGetByIdFetching, isGetByIdSuccess, isGetByIdData]);

    useEffect(() => {
        if (isEdit && deliveryMethodId) {
            getById(deliveryMethodId);
            setFieldSetting(formData, 'chargeType', FieldSettingType.DISABLED, true);
        } else if (!isEdit) {
            onResetData();
            setFieldSetting(formData, 'chargeType', FieldSettingType.DISABLED);
        }
    }, [isEdit, deliveryMethodId])

    //** Reset Data */
    const onResetData = () => {
        let form = { ...addEditDeliveryFormData };
        form.initialState = { ...addEditDeliveryFormData.initialState };
        setFormData(form);
    };



    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Delivery Method" modelSizeClass="w-30" >
            <div className="row">
                <div className="col-md-12">
                    {!isGetByIdFetching ?
                        <div className="row">
                            <FormCreator config={formData} ref={ref} {...formData} />
                        </div>
                        : <DataLoader />}
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
})

export default AddEditDeliveryMethod;