/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
//** Lib's */
import Buttons from "../ui/button/Buttons";
import FileViewer from "react-file-viewer";
import { AppIcons } from "../../data/appIcons";
import DataLoader from "../ui/dataLoader/DataLoader";
import SidebarModel from "../ui/sidebarModel/SidebarModel";
import { transformData } from "./Config/ApprovalTransformData";
//** Service's */
import ToastService from "../../services/toastService/ToastService";
import {useAddUserChecklistResponseMutation,useLazyGetUserCheckListQuery,} from "../../app/services/ApprovalAPI";
import DropDown from "../../components/ui/dropdown/DropDrown";
import "./ApprovalCheckList.scss";
import { useLazyGetAllDocumentByOwnerIdQuery } from "../../app/services/commonAPI";
import { ModulePathName } from "../../utils/Enums/commonEnums";
import { useLazyDownloadDocumentQuery } from "../../app/services/documentAPI";
//** Component's */
const BasicInformation = React.lazy(() =>
  import("./feature/ApprovalInformation/BasicInfo")
);
const AddressInformation = React.lazy(() =>
  import("./feature/ApprovalInformation/AddressInfo")
);
const ContactInformation = React.lazy(() =>
  import("./feature/ApprovalInformation/ContactInfo")
);
const SettingInformation = React.lazy(() =>
  import("./feature/ApprovalInformation/SettingInfo")
);

const ApprovalCheckList = ({
  ApprovalData,
  isModelOpen,
  onSidebarClose,
  onSuccessApprovalClose,
  mainId,
  getBasicInformationById,
  getAddressById,
  getContactById,
  getFinacialSettingById,
  isSupplierApproval,
  isSubCustomer,
  ownerType,
}) => {
  //** State */
  const [checkListData, setCheckListData] = useState([]);
  const [documentListData, setDocumentListData] = useState([]);
  const [document, setDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [getFileType, setGetFileType] = useState([]);
  const [actionType, setActionType] = useState(null);

  //** API Call's */
  const [
    getCheckList,
    {
      isFetching: isGetCheckListFetching,
      isSuccess: isGetCheckListSuccess,
      data: isGetCheckListData,
    },
  ] = useLazyGetUserCheckListQuery();
  const [
    addUserCheckResponse,
    {
      isLoading: isAddUserCheckResponseLoading,
      isSuccess: isAddUserCheckResponseSuccess,
      data: isAddUserCheckResponseData,
    },
  ] = useAddUserChecklistResponseMutation();
  const [
    getAllDocumentByOwnerId,
    {
      isFetching: isGetAllDocumentByOwnerIdFetching,
      isSuccess: isGetAllDocumentByOwnerIdSuccess,
      data: isGetAllDocumentByOwnerIdData,
    },
  ] = useLazyGetAllDocumentByOwnerIdQuery();

  const [
    Downalod,
    {
      isFetching: isDownalodFetching,
      isSuccess: isDownalodSucess,
      data: isDownalodData,
    },
  ] = useLazyDownloadDocumentQuery();

  useEffect(() => {
    if (mainId) {
      let req = {
        ownerId: mainId,
        ownerType: ownerType,
      };
      getAllDocumentByOwnerId(req);
    }
  }, [mainId]);

  useEffect(() => {
    if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
      
      const fileData = isDownalodData.fileData;
      const blob = new Blob([fileData], { type: fileData.type });
      const fileURL = URL.createObjectURL(blob);
      if(actionType === "view"){
      setSelectedDocument(fileURL);
      setIsModalOpen(true);
      setGetFileType(determineFileType(isDownalodData.fileName));
      }
    }
  }, [isDownalodFetching, isDownalodSucess, isDownalodData]);
  useEffect(() => {
     if (
      !isGetAllDocumentByOwnerIdFetching &&
      isGetAllDocumentByOwnerIdSuccess &&
      isGetAllDocumentByOwnerIdData
    ) {
      const transformedData = isGetAllDocumentByOwnerIdData.map((item) => ({
        value: item.documentId,
        label: item.name,
        attachment: item.attachment,
      }));
      setDocumentListData(transformedData);
    }
  }, [
    isGetAllDocumentByOwnerIdFetching,
    isGetAllDocumentByOwnerIdSuccess,
    isGetAllDocumentByOwnerIdData,
  ]);

  const handleToggleModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
    setActionType(null);
  };

  const determineFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "pdf";
      case "docx":
        return "docx";
      case "ppt":
      case "pptx":
        return "pptx";
      case "xlsx":
        return "xlsx";
      case "csv":
        return "csv";
      case "xls":
        return "xls";
      case "doc":
        return "doc";
      default:
        return null;
    }
  };

  //** Use Effect */
  useEffect(() => {
    if (isModelOpen) {
      getCheckList(ApprovalData);
    }
  }, [isModelOpen]);

  useEffect(() => {
    if (
      !isGetCheckListFetching &&
      isGetCheckListSuccess &&
      isGetCheckListData
    ) {
      const modifyCheckListData = transformData(isGetCheckListData);
      setCheckListData(modifyCheckListData);
    }
  }, [isGetCheckListFetching, isGetCheckListSuccess, isGetCheckListData]);

  useEffect(() => {
    if (isAddUserCheckResponseSuccess && isAddUserCheckResponseData) {
      ToastService.success(isAddUserCheckResponseData.errorMessage);
      onSuccessApprovalClose();
    }
  }, [isAddUserCheckResponseSuccess, isAddUserCheckResponseData]);

  //** handle Change */
  // const handleCheckChange = (itemId, value) => {
  //   const modifyData = checkListData.map((item) => {
  //     const updatedCheckListItems = item.checkListRequest.map((childItem) =>
  //       childItem.checklistItemId === itemId
  //         ? { ...childItem, isApproved: value }
  //         : childItem
  //     );
  //     const allChildChecked = updatedCheckListItems.every(
  //       (childItem) => childItem.isApproved
  //     );
  //     return {
  //       ...item,
  //       isMainChecked: allChildChecked,
  //       checkListRequest: updatedCheckListItems,
  //     };
  //   });
  //   setCheckListData(modifyData);
  // };
  const handleAddResponse = () => {
    const allChildChecked = checkListData.every((item) => item.isMainChecked);
    if (allChildChecked) {
      checkListData.forEach((data) => {
        let childRequest = {
          checkListRequest: data.checkListRequest,
        };
        addUserCheckResponse(childRequest);
      });
    } else {
      ToastService.warning(
        "Please ensure that all data has been thoroughly reviewed."
      );
    }
  };
  const handleDocumentChange = (selectedoption) => {
    
    setDocument(selectedoption.value);
    handleDocumentView("view", selectedoption.attachment);
  };
  const handleDocumentView = (action, fileName, name) => {
    setSelectedDocument(null);
    setIsModalOpen(false);
    setActionType(action);

    let request = {
      folderName: isSupplierApproval
        ? ModulePathName.SUPPLIER
        : ModulePathName.CUSTOMER,
      keyId: mainId,
      fileName: fileName,
    };

    if (action === "view") {
      Downalod(request);
    }
  };
  return (
    <div>
      <SidebarModel
        modalTitle="Approval Check List"
        contentClass="content-95 basic-info-model"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        {!isGetCheckListFetching ? (
          <>
            <div className="row mt-3">
              <div className="col-6 info-scrollable">
                <div className="checklist-info">
                  <h5>Check List Information</h5>
                </div>
                <div className="row">
                  {!isSubCustomer ? (
                    <div className="col-12 mb-3">
                      <div className="approval-list-card-basicinformation">
                        <BasicInformation
                          isModelOpen={isModelOpen}
                          mainId={mainId}
                          getBasicInformationById={getBasicInformationById}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="col-12 mb-3">
                    <div className="approval-list-card-addressinformation">
                      <AddressInformation
                        isSupplierApproval={isSupplierApproval}
                        isModelOpen={isModelOpen}
                        mainId={mainId}
                        getAddressById={getAddressById}
                        isSubCustomer={isSubCustomer}
                      />
                    </div>
                  </div>
                  {!isSubCustomer ? (
                    <div className="col-12 mb-3">
                      <div className="approval-list-card-contact">
                        <ContactInformation
                          isSupplierApproval={isSupplierApproval}
                          isModelOpen={isModelOpen}
                          mainId={mainId}
                          getContactById={getContactById}
                        />
                      </div>
                    </div>
                  ) : null}
                  {!isSubCustomer ? (
                    <div className="col-12 mb-3">
                      <div className="approval-list-card-financial">
                        <SettingInformation
                          isSupplierApproval={isSupplierApproval}
                          isModelOpen={isModelOpen}
                          mainId={mainId}
                          getFinacialSettingById={getFinacialSettingById}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
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
              </div>
              <div className="col-6 right-document-view">
                <div className="checklist-info">
                  <h5>Documents</h5>
                </div>
                <div className="row">
                  <div className="col-8">
                    <DropDown
                      placeholder="Select Documents"
                      options={documentListData}
                      value={document}
                      onChange={handleDocumentChange}
                    />
                  </div>
                </div>
            {/* File viewer modal */}
      {selectedDocument && getFileType && (
          <SidebarModel
  
          modalTitle="File Preview"
          isOpen={isModalOpen}
          contentClass="content-65"
          onClose={handleToggleModal}
        >
          <div className="model-hight-fix">
        <FileViewer fileType={getFileType} filePath={selectedDocument}  onError={(error) => console.error("Error:", error)} />
        </div>
        </SidebarModel>
      )}
              </div>
              {/* <div className="col-md-4 d-flex flex-column justify-content-between approval-check-list">
                <div>
                  {checkListData.map((item) => (
                    <div className="checklist-section">
                      <div className="row" key={item.id}>
                        <div className="col-12 main-check-title mb-2">
                          <CheckListItem
                            itemList={item}
                            handleCheckChange={handleCheckChange}
                          />
                        </div>
                        <div className="col-12">
                          <div className="sub-checklist">
                            <div className="row">
                              {item.checkListRequest.map((childItem) => (
                                <div
                                  className="col-12 sub-check-list mb-2"
                                  key={childItem.checklistItemId}
                                >
                                  <CheckListItem
                                    itemList={childItem}
                                    handleCheckChange={handleCheckChange}
                                    checkItemListId={childItem.checklistItemId}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div> */}
            </div>
          </>
        ) : (
          <DataLoader />
        )}

      </SidebarModel>
     
    </div>
  );
};

ApprovalCheckList.propTypes = {
  ApprovalData: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  isModelOpen: PropTypes.bool.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
  onSuccessApprovalClose: PropTypes.func.isRequired,
};
export default ApprovalCheckList;
