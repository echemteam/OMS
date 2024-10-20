/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import Buttons from "../ui/button/Buttons";
import FileViewer from "react-file-viewer";
import { AppIcons } from "../../data/appIcons";
import SidebarModel from "../ui/sidebarModel/SidebarModel";
import {
  customerApprovalCheckList,
  subCustomerApprovalCheckList,
  supplierApprovalCheckList,
} from "./Config/ApprovalTransformData";
//** Service's */
import ToastService from "../../services/toastService/ToastService";
import DropDown from "../../components/ui/dropdown/DropDrown";
import "./ApprovalCheckList.scss";
import {
  useLazyGetAllDocumentByOwnerIdQuery,
  useLazyGetAllUserQuery,
} from "../../app/services/commonAPI";
import {
  CustomerSupplierStatus,
  ModulePathName,
} from "../../utils/Enums/commonEnums";
import { useLazyDownloadDocumentQuery } from "../../app/services/documentAPI";
import CenterModel from "../ui/centerModel/CenterModel";
import FormCreator from "../Forms/FormCreator";
import { reasonData } from "../../common/features/component/CustomerSupplierReason/Reason.data";
import {
  useAddEditResponsibleUserForCustomerMutation,
  useUpdateCustomerInActiveStatusMutation,
} from "../../app/services/basicdetailAPI";
import { setDropDownOptionField } from "../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { excludingRoles } from "../../pages/customerDetail/feature/customerBasicDetail/config/CustomerBasicDetail.data";
import { useAddCustomerNotesMutation, useLazyGetCustomerNoteByCustomerIdQuery } from "../../app/services/notesAPI";
import { StatusFeild } from "../../utils/Enums/StatusEnums";
import ShippingSetting from "./feature/ApprovalInformation/ShippingSetting";
import { useAddSupplierNotesMutation, useLazyGetSupplierNotesBySupplierIdQuery } from "../../app/services/supplierNotesAPI";
import {
  useAddEditResponsibleUserForSupplierMutation,
  useUpdateSupplierInActiveStatusMutation,
} from "../../app/services/supplierAPI";
import CustomerSupplierNotes from "./feature/ApprovalInformation/CustomerSupplierNotes";
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

const SupplierSettingInformation = React.lazy(() =>
  import("./feature/ApprovalInformation/SupplierSetting")
);

const ApprovalCheckList = ({
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
  basicData,
  setRejectStatusId,
  setSelectedStatus,
  onRejectedCustomerFromApproval,
  OnRejectedSupplierFromApproval,
}) => {
  //** State */
  const reasonRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(reasonData);
  const [checkListData, setCheckListData] = useState([]);
  const [documentListData, setDocumentListData] = useState([]);
  const [document, setDocument] = useState(null);
  const [, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [getFileType, setGetFileType] = useState([]);
  const [actionType, setActionType] = useState(null);

  const [approvalChekedData, setApprovalChekedData] = useState(() => {
    if (!isSupplierApproval) {
      return isSubCustomer
        ? subCustomerApprovalCheckList
        : customerApprovalCheckList;
    } else if (isSupplierApproval) {
      return supplierApprovalCheckList;
    }
  });

  //** API Call's */
  const [
    getAllUser,
    { isSuccess: isGetAllUserSucess, data: allGetAllUserData },
  ] = useLazyGetAllUserQuery();
  const [addCustomerNotes] = useAddCustomerNotesMutation();
  const [addSupplierNotes] = useAddSupplierNotesMutation();
  const [addEditResponsibleUserForCustomer] =
    useAddEditResponsibleUserForCustomerMutation();
  const [addEditResponsibleUserForSupplier] =
    useAddEditResponsibleUserForSupplierMutation();
  const [
    updateCustomerInActiveStatus,
    {
      isLoading: updateCustomerInActiveStatusCustomerLoading,
      isSuccess: isSuccessUpdateCustomerInActiveStatus,
      data: updateCustomerInActiveStatusData,
    },
  ] = useUpdateCustomerInActiveStatusMutation();
  const [
    updateSupplierInActiveStatus,
    {
      isLoading: updateSupplierInActiveStatusLoading,
      isSuccess: isSuccessupdateSupplierInActiveStatus,
      data: updateSupplierInActiveStatusData,
    },
  ] = useUpdateSupplierInActiveStatusMutation();
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
    getAllUser();
    if (showModal) {
      if (basicData) {
        const responsibleUser = basicData?.map((id) => Number(id.trim()));
        const formNew = { ...formData };
        formNew.initialState = {
          ...formNew.initialState,
          responsibleUserId: responsibleUser,
        };
        setFormData(formNew);
      }
    }
  }, [showModal]);

  if (isGetAllUserSucess && allGetAllUserData) {
    const filterData = allGetAllUserData.filter((item) => {
      return (
        item.roleName === null ||
        !excludingRoles
          .map((role) => role.toLowerCase())
          .includes(item.roleName.toLowerCase())
      );
    });
    // Remove duplicates based on fullName
    const uniqueData = Array.from(
      new Map(filterData.map((item) => [item.fullName, item])).values()
    );
    setDropDownOptionField(
      uniqueData,
      "userId",
      "fullName",
      reasonData,
      "responsibleUserId"
    );
  }

  const handleCheckbox = (name, isChecked) => {
    const updatedData = approvalChekedData.map((item) =>
      item.name === name ? { ...item, isCheked: isChecked } : item
    );
    setCheckListData(updatedData);
    setApprovalChekedData(updatedData);
  };

  useEffect(() => {
    if (
      isSuccessupdateSupplierInActiveStatus &&
      updateSupplierInActiveStatusData
    ) {
      ToastService.success(updateSupplierInActiveStatusData.errorMessage);
      handleToggleModal();
    }
  }, [isSuccessupdateSupplierInActiveStatus, updateSupplierInActiveStatusData]);

  useEffect(() => {
    if (
      isSuccessUpdateCustomerInActiveStatus &&
      updateCustomerInActiveStatusData
    ) {
      ToastService.success(updateCustomerInActiveStatusData.errorMessage);
      handleToggleModal();
      isSupplierApproval
        ? OnRejectedSupplierFromApproval()
        : onRejectedCustomerFromApproval();
    }
  }, [isSuccessUpdateCustomerInActiveStatus, updateCustomerInActiveStatusData]);

  // useEffect(() => {
  //   if (isSuccessAddEditResponsibleUserForCustomer && isAddEditResponsibleUserForCustomerData) {
  //     // ToastService.success(isAddEditResponsibleUserForCustomerData.errorMessage );
  //   }
  // }, [isSuccessAddEditResponsibleUserForCustomer, isAddEditResponsibleUserForCustomerData,]);

  // useEffect(() => {
  //   if (isSuccessAddEditResponsibleUserForSupplier && isAddEditResponsibleUserForSupplierData) {
  //     // ToastService.success(isAddEditResponsibleUserForSupplierData.errorMessage );
  //   }
  // }, [isSuccessAddEditResponsibleUserForSupplier, isAddEditResponsibleUserForSupplierData]);

  const handleRejectUpdate = () => {
    if (!isSupplierApproval) {
      let custData = reasonRef.current.getFormData();
      if (custData) {
        let req = {
          ...custData,
          customerId: mainId,
          statusId: CustomerSupplierStatus.REJECT,
          note: custData.inActiveReason,
        };
        updateCustomerInActiveStatus(req);
        updateRUserDataDropdown(custData.responsibleUserId);
        addCustomerNotes(req);
        // setSelectedStatus(StatusFeild.Reject);
        // setRejectStatusId(req.statusId);
        // onRejectedCustomerFromApproval();
      }
    } else {
      let supplierData = reasonRef.current.getFormData();
      if (supplierData) {
        let req = {
          ...supplierData,
          supplierId: mainId,
          statusId: CustomerSupplierStatus.REJECT,
          note: supplierData.inActiveReason,
        };
        updateSupplierInActiveStatus(req);
        updateRUserDataDropdown(supplierData.responsibleUserId);
        addSupplierNotes(req);
        setSelectedStatus(StatusFeild.Reject);
        setRejectStatusId(req.statusId);
      }
    }
  };

  const updateRUserDataDropdown = (value) => {
    if (!isSupplierApproval) {
      let req = {
        customerId: mainId,
        userId: String(value),
      };
      addEditResponsibleUserForCustomer(req);
    } else {
      let req = {
        supplierId: mainId,
        userId: String(value),
      };
      addEditResponsibleUserForSupplier(req);
    }
  };

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
      if (actionType === "view") {
        setSelectedDocument(fileURL);
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
    setShowModal(false);
    onSidebarClose();
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

  // };
  const handleAddResponse = () => {
    const allChildChecked = checkListData.every((item) => item.isCheked);
    if (checkListData.length > 0 && allChildChecked) {
      onSuccessApprovalClose();
    } else {
      ToastService.warning(
        "Please ensure that all data has been thoroughly reviewed."
      );
    }
  };
  const handleRejectResponse = () => {
    setShowModal(true);
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
      {isModelOpen &&
        <>
          <SidebarModel
            modalTitle="Approval Check List"
            contentClass="content-95 basic-info-model"
            onClose={onSidebarClose}
            modalTitleIcon={AppIcons.AddIcon}
            isOpen={isModelOpen}>
            <div className="checklist-left-section">
              <div className="row mt-3">
                <div className="col-6 info-scrollable">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                          <div className="approval-list-part">
                            <BasicInformation
                              isModelOpen={isModelOpen}
                              mainId={mainId}
                              getBasicInformationById={getBasicInformationById}
                              approvalChekedData={approvalChekedData.find(
                                (item) => item.name === "basicInformation"
                              )}
                              handleCheckbox={handleCheckbox}
                              isSupplierApproval={isSupplierApproval}
                            />
                          </div>
                          {!isSubCustomer ? (
                            <div className="col-12 mb-3">
                              <div className="approval-list-part">
                                <ContactInformation
                                  isSupplierApproval={isSupplierApproval}
                                  isModelOpen={isModelOpen}
                                  mainId={mainId}
                                  getContactById={getContactById}
                                  approvalChekedData={approvalChekedData.find(
                                    (item) => item.name === "contactInformation"
                                  )}
                                  handleCheckbox={handleCheckbox}
                                />
                              </div>
                            </div>
                          ) : null}
                          <div className="col-12 mb-3">
                            <div className="approval-list-part">
                              <CustomerSupplierNotes
                                mainId={mainId}
                                isSupplierApproval={isSupplierApproval}
                                onGetByIdNotes={!isSupplierApproval ? useLazyGetCustomerNoteByCustomerIdQuery : useLazyGetSupplierNotesBySupplierIdQuery}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                          <div className="approval-list-part">
                            <AddressInformation
                              isSupplierApproval={isSupplierApproval}
                              isModelOpen={isModelOpen}
                              mainId={mainId}
                              getAddressById={getAddressById}
                              isSubCustomer={isSubCustomer}
                              approvalChekedData={approvalChekedData.find(
                                (item) => item.name === "addressInformation"
                              )}
                              handleCheckbox={handleCheckbox}
                            />
                          </div>
                          {!isSubCustomer && !isSupplierApproval ? (
                            <div className="col-12 mb-3">
                              <div className="approval-list-part">
                                <SettingInformation
                                  isSupplierApproval={isSupplierApproval}
                                  isModelOpen={isModelOpen}
                                  mainId={mainId}
                                  getFinacialSettingById={getFinacialSettingById}
                                  approvalChekedData={approvalChekedData.find(
                                    (item) => item.name === "settingInformation"
                                  )}
                                  handleCheckbox={handleCheckbox}
                                />
                              </div>
                            </div>
                          ) : null}
                          {!isSubCustomer && !isSupplierApproval ? (
                            <div className="col-12 mb-3">
                              <div className="approval-list-part">
                                <ShippingSetting
                                  isSupplierApproval={isSupplierApproval}
                                  isModelOpen={isModelOpen}
                                  mainId={mainId}
                                  getFinacialSettingById={getFinacialSettingById}
                                  approvalChekedData={approvalChekedData.find(
                                    (item) =>
                                      item.name === "shippingsettingInformation"
                                  )}
                                  handleCheckbox={handleCheckbox}
                                />
                              </div>
                            </div>
                          ) : null}
                          {isSupplierApproval ? (
                            <div className="col-12 mb-3">
                              <div className="approval-list-part">
                                <SupplierSettingInformation
                                  isSupplierApproval={isSupplierApproval}
                                  isModelOpen={isModelOpen}
                                  mainId={mainId}
                                  getFinacialSettingById={getFinacialSettingById}
                                  approvalChekedData={approvalChekedData.find(
                                    (item) => item.name === "settingInformation"
                                  )}
                                  handleCheckbox={handleCheckbox}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 my-3 mt-4">
                      <div className="d-flex align-item-end justify-content-end">
                        <div className="d-flex align-item-end">
                          <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText="Approve"
                            // isLoading={isAddUserCheckResponseLoading}
                            onClick={handleAddResponse}
                          />

                          <Buttons
                            buttonTypeClassName="danger-btn ml-5"
                            buttonText="Reject"
                            // isLoading={isAddUserCheckResponseLoading}
                            onClick={handleRejectResponse}
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

                  <div className="row">
                    <div className="col-12">
                      <div className="document-view">
                        {selectedDocument && getFileType ? (
                          getFileType === "pdf" ? (
                            <div className="pdf-iframe">
                              <iframe
                                src={selectedDocument}
                                title="PDF Preview"
                                style={{ width: "100%", height: "200%" }}
                              />
                            </div>
                          ) : (
                            <FileViewer
                              fileType={getFileType}
                              filePath={selectedDocument}
                              onError={(error) => console.error("Error:", error)}
                            />
                          )
                        ) : null}
                      </div>
                    </div>
                  </div>
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
            </div>
          </SidebarModel>
          <CenterModel
            showModal={showModal}
            handleToggleModal={handleToggleModal}
            modalTitle={`Reject Reason`}
            modelSizeClass="w-50s"
          >
            <div className="row">
              <FormCreator config={formData} ref={reasonRef} {...formData} />
              <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                  <div className="d-flex align-item-end">
                    <Buttons
                      buttonTypeClassName="theme-button"
                      buttonText="Update"
                      isLoading={
                        isSupplierApproval
                          ? updateSupplierInActiveStatusLoading
                          : updateCustomerInActiveStatusCustomerLoading
                      }
                      onClick={handleRejectUpdate}
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
        </>
      }
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
