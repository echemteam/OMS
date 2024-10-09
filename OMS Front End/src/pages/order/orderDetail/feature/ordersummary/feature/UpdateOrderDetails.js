import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

//** Lib's */
import { AppIcons } from "../../../../../../data/appIcons";
import { orderDetailsData } from "../Config/UpdateOrderDetail.Data";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";
import { useLazyGetAllOrderMethodQuery } from "../../../../../../app/services/commonAPI";
import { setDropDownOptionField } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useLazyGetOrderInformationByOrderIdQuery, useUpdateOrderDetailMutation } from "../../../../../../app/services/orderAPI";

/** Lazily Loaded Components */
const SidebarModel = React.lazy(() => import("../../../../../../components/ui/sidebarModel/SidebarModel"))

const UpdateOrderDetails = ({ orderId, orderDetailRef, onRefreshOrderDetails }) => {

    //** State */
    const ref = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [formData, setFormData] = useState(orderDetailsData);

    //** API Call's */
    const [update, { isLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateOrderDetailMutation();
    const [getAllOrderMethod, { isSuccess: isGetAllOrderMethodSucess, data: allGetAllOrderMethodData }] = useLazyGetAllOrderMethodQuery();
    const [getOrderInfoByOrderId, { isFetching, isSuccess: isSuccess, data: isOrderData }] = useLazyGetOrderInformationByOrderIdQuery();

    //** Use Effect's */
    useEffect(() => {
        getAllOrderMethod();
    }, [orderId]);

    useEffect(() => {
        if (!isFetching && isSuccess && isOrderData) {
            const form = { ...formData }
            let request = {
                customerId: isOrderData.customerId,
                referenceNumber: isOrderData.referenceNumber,
                poNumber: isOrderData.poNumber,
                orderReceivedDate: isOrderData.orderReceivedDate,
                orderMethod: isOrderData.orderMethod,
                orderMethodId: isOrderData.orderMethodId
            }
            form.initialState = request
            setFormData(form);

        }
    }, [isFetching, isSuccess, isOrderData]);

    useEffect(() => {
        if (isGetAllOrderMethodSucess && allGetAllOrderMethodData) {
            setDropDownOptionField(allGetAllOrderMethodData, "orderMethodId", "orderMethod", formData, "orderMethodId");
        }
    }, [isGetAllOrderMethodSucess, allGetAllOrderMethodData]);

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            onSidebarClose();
            onRefreshOrderDetails();
            ToastService.success(isUpdateData.errorMessage);
        }
    }, [isUpdateSuccess, isUpdateData]);

    //** Handle Change's */
    const handleUpdate = () => {
        const data = ref.current.getFormData();
        if (data) {
            let request = {
                ...data,
                orderId: orderId,
                orderMethodId: data.orderMethodId && typeof data.orderMethodId === "object" ? data.orderMethodId.value : data.orderMethodId,
            }
            update(request);
        }
    }

    const handleToggleModal = () => {
        setIsModelOpen(!isModelOpen);
        getOrderInfoByOrderId(orderId);
    };

    const onSidebarClose = () => {
        setIsModelOpen(!isModelOpen);
    }

    //** Use Imperative Handle */
    useImperativeHandle(orderDetailRef, () => ({
        handleToggleModal
    }))

    return (
        <SidebarModel modalTitle="Update Order Details" contentClass="content-50" onClose={onSidebarClose}
            modalTitleIcon={AppIcons.AddIcon} isOpen={isModelOpen}>
            <div className="row">
                <div className="col-md-12 add-edit-user-form">
                    <div className="row vertical-form">
                        {!isFetching ?
                            <FormCreator
                                config={formData}
                                ref={ref}
                                isLoading={isFetching}
                            />
                            : <DataLoader />}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="d-flex align-item-center justify-content-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            onClick={handleUpdate}
                            buttonText="Update"
                            isLoading={isLoading}
                        />
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={onSidebarClose}
                        />
                    </div>
                </div>
            </div>
        </SidebarModel>
    )
}

export default UpdateOrderDetails;