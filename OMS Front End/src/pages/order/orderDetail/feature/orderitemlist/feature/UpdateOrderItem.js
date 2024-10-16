import { useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../../../data/appIcons";
import { orderItemFormData } from "./Config/OrderItem.Data";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/FinalForms/FormCreator";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";
import SidebarModel from "../../../../../../components/ui/sidebarModel/SidebarModel";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useLazyGetOrderItemByOrderItemIdQuery, useUpdateOrderItemByOrderItemIdMutation } from "../../../../../../app/services/orderAPI";

const UpdateOrderItem = ({ orderId, orderItemref, getOrderItemList }) => {

    //** State */
    const ref = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [formData, setFormData] = useState(orderItemFormData);

    //** API Call's */
    const [update, { isLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateOrderItemByOrderItemIdMutation();
    const [getById, { isFetching, isSuccess: isGetByIdSuccess, data: isGetByIdData }] = useLazyGetOrderItemByOrderItemIdQuery();

    //** Use Effect */
    useEffect(() => {
        if (!isFetching && isGetByIdSuccess && isGetByIdData) {
            const data = { ...formData }
            data.initialState = isGetByIdData;
            setFormData(data);
        }
    }, [isFetching, isGetByIdSuccess, isGetByIdData]);

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            onSidebarClose();
            ToastService.success(isUpdateData.errorMessage);
            getOrderItemList();
        }
    }, [isUpdateSuccess, isUpdateData]);

    //** Handle Change's */
    const handleUpdate = () => {
        let data = ref.current.getFormData();
        if (data) {
            let request = {
                ...data,
                orderId,
                orderPriority: data.orderPriority && typeof data.orderPriority === "object" ? data.orderPriority.value : data.orderPriority,
            }
            update(request);
        }
    }
    const onSidebarClose = () => {
        setIsModelOpen(!isModelOpen);
    };
    const handleToggleModal = (orderItemId) => {
        setIsModelOpen(!isModelOpen);
        getById(orderItemId);
    };

    //** Use Imperative Handle */
    useImperativeHandle(orderItemref, () => ({
        handleToggleModal
    }));

    return (
        isModelOpen &&
        <SidebarModel modalTitle="Update Order Item" contentClass="content-50" onClose={onSidebarClose} modalTitleIcon={AppIcons.AddIcon} isOpen={isModelOpen}>
            <div className="row">
                <div className="col-md-12 add-edit-user-form">
                    <div className="row vertical-form">
                        {!isFetching ?
                            <FormCreator config={formData}
                                ref={ref} isLoading={isFetching} />
                            : <DataLoader />}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="d-flex align-item-center justify-content-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            onClick={handleUpdate}
                            buttonText="Update"
                            isLoading={isLoading} />
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={onSidebarClose} />
                    </div>
                </div>
            </div>

        </SidebarModel>
    )
}

export default UpdateOrderItem