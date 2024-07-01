import React, { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { addEditCarrierFormData } from "./config/CarrierConfig";
import BasicDetailContext from "../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../../services/swalService/SwalService";
import ToastService from "../../../../../../services/toastService/ToastService";
import { useGetAllDeliveryCarriersQuery } from "../../../../../../app/services/commonAPI";
import { useDeleteCustomerDeliveryCarriersByIdMutation } from "../../../../../../app/services/customerSettingsAPI";

//** Component's */
const CarrierList = React.lazy(() => import("./feature/CarrierList"));
const AddEditCarrier = React.lazy(() => import("./feature/AddEditCarrier"));

const ManageCarrier = ({ handleGetDefaultList, isGetDataLoading, isShowButton }) => {

    const childRef = useRef();
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { carriersList } = useContext(BasicDetailContext);
    const { data, isFetching, isSuccess } = useGetAllDeliveryCarriersQuery();

    const [deleteCarrier, { isSuccess: isDeleteSuccess, data: isDeletData }] = useDeleteCustomerDeliveryCarriersByIdMutation();


    useEffect(() => {
        if (!isFetching && isSuccess && data) {
            const getData = data.map((item) => ({
                value: item.carrierId,
                label: item.carrier,
            }));
            const dropdownField = addEditCarrierFormData.formFields.find((item) => item.dataField === "carrier");
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
                deleteCarrier(data.customerDeliveryCarrierId);
            }
        });
    };

    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <>
            <CarrierList molGridRef={molGridRef} collectAccountData={carriersList} actionHandler={actionHandler}
                handleToggleModal={handleToggleModal} isGetDataLoading={isGetDataLoading} isShowButton={isShowButton}/>
            {showModal && (
                <AddEditCarrier handleToggleModal={handleToggleModal} showModal={showModal} editFormData={editFormData} onSuccess={onSuccess}
                    isEdit={isEdit} childRef={childRef} />
            )}
        </>
    )
}

export default ManageCarrier;