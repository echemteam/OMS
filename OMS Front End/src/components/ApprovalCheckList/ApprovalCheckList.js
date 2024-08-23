/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
//** Lib's */
import Buttons from "../ui/button/Buttons";
import CheckListItem from "./CheckListItem";
import { AppIcons } from "../../data/appIcons";
import DataLoader from "../ui/dataLoader/DataLoader";
import SidebarModel from "../ui/sidebarModel/SidebarModel";
import { transformData } from "./Config/ApprovalTransformData";
//** Service's */
import ToastService from "../../services/toastService/ToastService";
import { useAddUserChecklistResponseMutation, useLazyGetUserCheckListQuery } from "../../app/services/ApprovalAPI";

//** Component's */
const BasicInformation = React.lazy(() => import("./feature/ApprovalInformation/BasicInfo"));
const AddressInformation = React.lazy(() => import("./feature/ApprovalInformation/AddressInfo"));
const ContactInformation = React.lazy(() => import("./feature/ApprovalInformation/ContactInfo"));
const SettingInformation = React.lazy(() => import("./feature/ApprovalInformation/SettingInfo"));


const ApprovalCheckList = ({ ApprovalData, isModelOpen, onSidebarClose, onSuccessApprovalClose, mainId, getBasicInformationById,
    getAddressById, getContactById, getFinacialSettingById, isSupplierApproval
}) => {

    //** State */
    const [checkListData, setCheckListData] = useState([]);

    //** API Call's */
    const [getCheckList, { isFetching: isGetCheckListFetching, isSuccess: isGetCheckListSuccess, data: isGetCheckListData }] = useLazyGetUserCheckListQuery();
    const [addUserCheckResponse, { isLoading: isAddUserCheckResponseLoading, isSuccess: isAddUserCheckResponseSuccess, data: isAddUserCheckResponseData }] = useAddUserChecklistResponseMutation();

    //** Use Effect */
    useEffect(() => {
        if (isModelOpen) {
            getCheckList(ApprovalData);
        }
    }, [isModelOpen]);

    useEffect(() => {
        if (!isGetCheckListFetching && isGetCheckListSuccess && isGetCheckListData) {
            const modifyCheckListData = transformData(isGetCheckListData);
            setCheckListData(modifyCheckListData);
        }
    }, [isGetCheckListFetching, isGetCheckListSuccess, isGetCheckListData]);

    useEffect(() => {
        if (isAddUserCheckResponseSuccess && isAddUserCheckResponseData) {
            ToastService.success(isAddUserCheckResponseData.errorMessage);
            onSuccessApprovalClose();
        }
    }, [isAddUserCheckResponseSuccess, isAddUserCheckResponseData])

    //** handle Change */
    const handleCheckChange = (itemId, value) => {
        const modifyData = checkListData.map((item) => {
            const updatedCheckListItems = item.checkListRequest.map((childItem) =>
                childItem.checklistItemId === itemId
                    ? { ...childItem, isApproved: value }
                    : childItem
            );
            const allChildChecked = updatedCheckListItems.every((childItem) => childItem.isApproved);
            return { ...item, isMainChecked: allChildChecked, checkListRequest: updatedCheckListItems };
        });
        setCheckListData(modifyData);
    };
    const handleAddResponse = () => {
        const allChildChecked = checkListData.every((item) => item.isMainChecked);
        if (allChildChecked) {
            checkListData.forEach((data) => {
                let childRequest = {
                    checkListRequest: data.checkListRequest
                }
                addUserCheckResponse(childRequest);
            });
        } else {
            ToastService.warning("Please ensure that all data has been thoroughly reviewed.")
        }
    }

    return (
        <div>
            <SidebarModel modalTitle="Approval Check List" contentClass="content-85 basic-info-model"
                onClose={onSidebarClose} modalTitleIcon={AppIcons.AddIcon} isOpen={isModelOpen} >
                {!isGetCheckListFetching ?
                    <React.Fragment>
                        <div className="row mt-3">
                            <div className="col-md-8">
                                <BasicInformation isModelOpen={isModelOpen} mainId={mainId} getBasicInformationById={getBasicInformationById} />
                                <AddressInformation isSupplierApproval={isSupplierApproval} isModelOpen={isModelOpen} mainId={mainId} getAddressById={getAddressById} />
                                <ContactInformation isSupplierApproval={isSupplierApproval} isModelOpen={isModelOpen} mainId={mainId} getContactById={getContactById} />
                                <SettingInformation isSupplierApproval={isSupplierApproval} isModelOpen={isModelOpen} mainId={mainId} getFinacialSettingById={getFinacialSettingById} />
                            </div>
                            <div className="col-md-4">
                                {checkListData.map((item) => (
                                    <div className="checklist-section">
                                        <div className="row" key={item.id}>
                                            <div className="col-12 main-check-title mb-2">
                                                <CheckListItem itemList={item} handleCheckChange={handleCheckChange} />
                                            </div>
                                            <div className="col-12">
                                                <div className="sub-checklist">
                                                    <div className="row">
                                                        {item.checkListRequest.map((childItem) => (
                                                            <div className="col-12 sub-check-list mb-2" key={childItem.checklistItemId}>
                                                                <CheckListItem itemList={childItem} handleCheckChange={handleCheckChange} checkItemListId={childItem.checklistItemId} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </React.Fragment>
                    : <DataLoader />
                }
                <div className="row">
                    <div className="col-md-12 my-3 mt-4">
                        <div className="d-flex align-item-end justify-content-end">
                            <div className="d-flex align-item-end">
                                <Buttons
                                    buttonTypeClassName="theme-button"
                                    buttonText="Approve"
                                    isLoading={isAddUserCheckResponseLoading}
                                    onClick={handleAddResponse}
                                />
                                <Buttons
                                    buttonTypeClassName="dark-btn ml-5"
                                    buttonText="Cancel"
                                    onClick={onSidebarClose}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarModel>
        </div>
    );
};


ApprovalCheckList.propTypes = {
    ApprovalData: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
    ]).isRequired,
    isModelOpen: PropTypes.bool.isRequired,
    onSidebarClose: PropTypes.func.isRequired,
    onSuccessApprovalClose: PropTypes.func.isRequired,
};
export default ApprovalCheckList;
