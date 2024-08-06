/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { addEditCarrierFormData } from "./config/CarrierConfig";
import BasicDetailContext from "../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../../services/swalService/SwalService";
import ToastService from "../../../../../../services/toastService/ToastService";
import { useGetAllDeliveryCarriersQuery } from "../../../../../../app/services/commonAPI";
import { useDeleteCustomerDeliveryCarriersByIdMutation } from "../../../../../../app/services/customerSettingsAPI";
import PropTypes from 'prop-types';

//** Component's */
const CarrierList = React.lazy(() => import("./feature/CarrierList"));
const AddEditCarrier = React.lazy(() => import("./feature/AddEditCarrier"));

const ManageCarrier = ({ handleGetDefaultList, isGetDataLoading, isShowButton }) => {

    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { carriersList, customerId } = useContext(BasicDetailContext);
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
    // const handleEditModal = (data) => {
    //     setShowModal(!showModal);
    //     setIsEdit(true);
    //     setDeliveryCarrierId(data.customerDeliveryCarrierId);
    // }

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
        // EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <>
            <CarrierList molGridRef={molGridRef} collectAccountData={carriersList} actionHandler={actionHandler} customerId={customerId}
                handleToggleModal={handleToggleModal} isGetDataLoading={isGetDataLoading} isShowButton={isShowButton}
                handleGetDefaultList={handleGetDefaultList}
            />
            {showModal && (
                <AddEditCarrier handleToggleModal={handleToggleModal} showModal={showModal}
                    // deliveryCarrierId={deliveryCarrierId}
                    onSuccess={onSuccess}
                    isEdit={isEdit} />
            )}
        </>
    )
}

ManageCarrier.propTypes = {
    handleGetDefaultList: PropTypes.func.isRequired,
    isGetDataLoading: PropTypes.bool.isRequired,
    isShowButton: PropTypes.bool.isRequired
};
export default ManageCarrier;