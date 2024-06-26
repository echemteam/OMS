import React, { useEffect, useState } from "react";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import Buttons from "../../../../components/ui/button/Buttons";
import CheckListItem from "./CheckListItem";
import { useAddUserChecklistResponseMutation, useLazyGetUserCheckListQuery } from "../../../../app/services/ApprovalAPI";
import { ApprovalEnum } from "../../../../common/features/Enums/ApprovalEnums";
import { transformData } from "./Config/ApprovalTransformData";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import ToastService from "../../../../services/toastService/ToastService";

const ApprovalCheckList = ({ isModelOpen, onSidebarClose, onSuccessApprovalClose }) => {

  const [checkListData, setCheckListData] = useState([]);

  const [getCheckList, { isFetching: isGetCheckListFetching, isSuccess: isGetCheckListSuccess, data: isGetCheckListData }] = useLazyGetUserCheckListQuery();
  const [addUserCheckResponse, { isLoading: isAddUserCheckResponseFetching, isSuccess: isAddUserCheckResponseSuccess, data: isAddUserCheckResponseData }] = useAddUserChecklistResponseMutation();

  useEffect(() => {
    if (isModelOpen) {
      getCheckList(ApprovalEnum.APPROVECUSTOMER);
    }
  }, [isModelOpen]);

  useEffect(() => {
    if (!isGetCheckListFetching, isGetCheckListSuccess, isGetCheckListData) {
      const modifyCheckListData = transformData(isGetCheckListData);
      setCheckListData(modifyCheckListData);
    }
  }, [isGetCheckListFetching, isGetCheckListSuccess, isGetCheckListData]);

  useEffect(() => {
    if (isAddUserCheckResponseSuccess, isAddUserCheckResponseData) {
      ToastService.success(isAddUserCheckResponseData.errorMessage);
      onSuccessApprovalClose();
    }
  }, [isAddUserCheckResponseSuccess, isAddUserCheckResponseData])

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
      checkListData.map((data) => {
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
      <SidebarModel modalTitle="Approval Check List" contentClass="content-40 basic-info-model"
        onClose={onSidebarClose} modalTitleIcon={AppIcons.AddIcon} isOpen={isModelOpen} >
        {!isGetCheckListFetching ?
          <React.Fragment>
            {checkListData.map((item, mainIndex) => (
              <div className="checklist-section">
                <div className="row mt-3" key={mainIndex}>
                  <div className="col-12 main-check-title">
                    <CheckListItem itemList={item} handleCheckChange={handleCheckChange} />
                  </div>
                  <div className="col-12">
                    <div className="sub-checklist">
                      <div className="row">
                        {item.checkListRequest.map((childItem, subIndex) => (
                          <div className="col-12 sub-check-list" key={subIndex}>
                            <CheckListItem itemList={childItem} handleCheckChange={handleCheckChange} checkItemListId={childItem.checklistItemId} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  isLoading={isAddUserCheckResponseFetching}
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

export default ApprovalCheckList;
