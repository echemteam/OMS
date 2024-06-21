import { useContext, useEffect, useRef, useState } from "react";
import DeliveryMethodList from "./feature/DeliveryMethodList";
import AddEditDeliveryMethod from "./feature/AddEditDeliveryMethod";
import BasicDetailContext from "../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { useDeleteCustomerDeliveryMethodsByIdMutation } from "../../../../../../app/services/customerSettingsAPI";
import SwalAlert from "../../../../../../services/swalService/SwalService";
import ToastService from "../../../../../../services/toastService/ToastService";
import { useGetAllDeliveryMethodsQuery } from "../../../../../../app/services/commonAPI";
import { addEditDeliveryFormData } from "./config/DevliveryConfig";

const ManageDevliveryMethod = ({ handleGetDefaultList, isGetDataLoading }) => {

    const childRef = useRef();
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { deliveryMethodsList } = useContext(BasicDetailContext);

    const { data, isFetching, isSuccess } = useGetAllDeliveryMethodsQuery();
    const [deleteDeliveryMethods, { isSuccess: isDeleteSuccess, data: isDeletData }] = useDeleteCustomerDeliveryMethodsByIdMutation();

    useEffect(() => {
        if (!isFetching && isSuccess && data) {
            const getData = data.map((item) => ({
                value: item.deliveryMethodId,
                label: item.name,
            }));
            const dropdownField = addEditDeliveryFormData.formFields.find((item) => item.dataField === "chargeType");
            dropdownField.fieldSetting.options = getData;
        }
    }, [isFetching, isSuccess, data]);

    useEffect(() => {
        if (isDeleteSuccess && isDeletData) {
            ToastService.success(isDeletData.errorMessage);
            handleGetDefaultList();
        }
    }, [isDeleteSuccess, isDeletData]);


    const handleToggleModal = () => {
        setShowModal(!showModal);
        setIsEdit(false);
        if (childRef.current) {
            childRef.current.callChildFunction();
        }
    };

    //** Success */
    const onSuccess = () => {
        setShowModal(!showModal);
        handleGetDefaultList();
    };

    //** Action Handler */
    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }

    const handleDeleteClick = (data) => {
        confirm(
            "Delete?",
            "Are you sure you want to Delete?",
            "Delete",
            "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                deleteDeliveryMethods(data.customerDeliveryMethodId);
            }
        });
    };

    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <>
            <DeliveryMethodList molGridRef={molGridRef} ourAccountData={deliveryMethodsList} actionHandler={actionHandler} handleToggleModal={handleToggleModal}
                isGetDataLoading={isGetDataLoading} />
            {showModal && (
                <AddEditDeliveryMethod handleToggleModal={handleToggleModal} showModal={showModal} editFormData={editFormData} onSuccess={onSuccess}
                    isEdit={isEdit} childRef={childRef} />
            )}
        </>
    )
}

export default ManageDevliveryMethod;