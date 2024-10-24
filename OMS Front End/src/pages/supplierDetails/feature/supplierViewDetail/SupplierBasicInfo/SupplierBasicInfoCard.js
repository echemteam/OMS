/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useContext } from "react";
//** Lib's */
import PropTypes from "prop-types";
import CopyText from "../../../../../utils/CopyText/CopyText";
import { securityKey } from "../../../../../data/SecurityKey";
import { ErrorMessage } from "../../../../../data/appMessages";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
import DropDown from "../../../../../components/ui/dropdown/DropDrown";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import { StatusValue, statusMapping } from "../../../../../utils/Enums/StatusEnums";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";
import ToastService from "../../../../../services/toastService/ToastService";
import { useLazyGetAllUserQuery } from "../../../../../app/services/commonAPI";
import {
  useAddEditResponsibleUserForSupplierMutation,
  useUpdateSupplierInActiveStatusMutation,
  useUpdateSupplierStatusMutation,
} from "../../../../../app/services/supplierAPI";
import { removeFormFields } from "../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { reasonData } from "../../../../../common/features/component/CustomerSupplierReason/Reason.data";
import { excludingRoles } from "../../../../customerDetail/feature/customerBasicDetail/config/CustomerBasicDetail.data";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import DropdownSelect from "../../../../../components/ui/dropdown/DropdownSelect";
import { useAddSupplierNotesMutation } from "../../../../../app/services/supplierNotesAPI";
import { CustomerSupplierStatus } from "../../../../../utils/Enums/commonEnums";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

//** Component's */
const SupplierApproval = React.lazy(() =>
  import("../../supplierApproval/SupplierApproval")
);

const SupplierBasicInfoCard = ({
  editClick,
  supplierData,
  isLoading,
  supplierId,
  getSupplierById,
  GetSupplierBasicInformationByIdData,
  isGetSupplierBasicInformationByIdFetching,
  isGetSupplierBasicInformationById,
}) => {
  const childRef = useRef();
  const reasonRef = useRef();
  const { confirm } = SwalAlert();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState(reasonData);
  const [showModal, setShowModal] = useState(false);
  const [statusId, setStatusId] = useState();
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [responsibleUserIds, setResponsibleUserIds] = useState([]);
  const [rUserValue, setRUserValue] = useState([]);
  const [addSupplierNotes] = useAddSupplierNotesMutation();
  const [responsibleUserOptions, setResponsibleUserOptions] = useState([]);
  const [filteredStatusOptions, setFilteredStatusOptions] = useState(StatusValue);
  const [prevRUserValue, setPrevRUserValue] = useState("");

  const [
    getAllUser,
    {
      isFetching: isSuppilierFetching,
      isSuccess: isGetAllUserSucess,
      data: allGetAlluserData,
    },
  ] = useLazyGetAllUserQuery();
  const [
    addEditResponsibleUserForSupplier,
    {
      isSuccess: isSuccessAddEditResponsibleUserForSupplier,
      data: isAddEditResponsibleUserForSupplierData,
    },
  ] = useAddEditResponsibleUserForSupplierMutation();
  const [
    updateSupplierStatus,
    {
      isSuccess: isSuccessUpdateSupplierStatus,
      data: updateSupplierStatusData,
    },
  ] = useUpdateSupplierStatusMutation();
  const [
    updateSupplierInActiveStatus,
    {
      isLoading: updateCustomerInActiveStatusCustomerLoading,
      isSuccess: isSuccessUpdateSupplierInActiveStatus,
      data: updateSupplierInActiveStatusData,
    },
  ] = useUpdateSupplierInActiveStatusMutation();

  const {
    isResponsibleUser,
    totalCount,
    approvalSuccessCount,
    getSupplierCompletionCount,
  } = useContext(AddSupplierContext);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(
    securityKey.EDITBASICSUPPLIERDETAILS
  );

  useEffect(() => {
    if (!isResponsibleUser) {
      if (hasEditPermission && hasEditPermission.isViewOnly === true) {
        setShowEditIcon(true);
        setIsButtonDisable(true);
      } else if (hasEditPermission.isEditable === true) {
        setShowEditIcon(true);
      } else {
        setShowEditIcon(false);
        setIsButtonDisable(true);
      }
    }
  }, [hasEditPermission, isResponsibleUser]);

  useEffect(() => {
    if (
      isSuccessUpdateSupplierInActiveStatus &&
      updateSupplierInActiveStatusData
    ) {
      ToastService.success(updateSupplierInActiveStatusData.errorMessage);
      handleToggleModal();
    }
  }, [isSuccessUpdateSupplierInActiveStatus, updateSupplierInActiveStatusData]);

  useEffect(() => {
    if (isSuccessUpdateSupplierStatus && updateSupplierStatusData) {
      ToastService.success(updateSupplierStatusData.errorMessage);
      handleToggleModal();
    }
  }, [isSuccessUpdateSupplierStatus, updateSupplierStatusData]);

  useEffect(() => {
    if (
      isSuccessAddEditResponsibleUserForSupplier &&
      isAddEditResponsibleUserForSupplierData
    ) {
      ToastService.success(
        isAddEditResponsibleUserForSupplierData.errorMessage
      );
      getSupplierCompletionCount(supplierId);
    }
  }, [
    isSuccessAddEditResponsibleUserForSupplier,
    isAddEditResponsibleUserForSupplierData,
  ]);

  const rejectedSupplierFromApproval = () => {
    getSupplierById();
  };

  // useEffect(() => {
  //   if (rejectStatusId) {
  //     getSupplierById()
  //   }
  // }, [rejectStatusId, setRejectStatusId, selectedStatus])
  // useEffect(() => {
  //   if (supplierData) {
  //     const statusId = supplierData.statusId;
  //     switch (statusId) {
  //       case 1:
  //       case 2:
  //       case 3:
  //         setOptions(StaticStatus[StatusValue[statusId - 1].label]);
  //         break;
  //       case 4:
  //         setOptions([
  //           { value: "4", label: "Freeze" },
  //           { value: "3", label: "Approved" },
  //           { value: "1", label: "Pending" },
  //         ]);
  //         break;
  //       case 5:
  //         setOptions([
  //           { value: "5", label: "Block" },
  //           { value: "3", label: "Approved" },
  //           { value: "1", label: "Pending" },
  //         ]);
  //         break;
  //       case 6:
  //         setOptions(StaticStatus.Approved.filter(option => option.label === StatusValue[statusId - 1].label));
  //         break;
  //       case 7:
  //         setOptions(StaticStatus[StatusValue[statusId - 1].label]);
  //         break;
  //       default:
  //         setOptions([]);
  //     }

  //     setSelectedStatus(StatusValue[statusId - 1].label);
  //   }
  // }, [supplierData]);

  useEffect(() => {
    if (
      isGetSupplierBasicInformationById &&
      !isGetSupplierBasicInformationByIdFetching &&
      GetSupplierBasicInformationByIdData
    ) {
      const responsibleUserIds =
        GetSupplierBasicInformationByIdData?.responsibleUserId
          ?.split(",")
          .map((id) => id.trim());
      const responsibleUserNames =
        GetSupplierBasicInformationByIdData?.responsibleUserName
          ?.split(",")
          .map((name) => name.trim());
      const responsibleUsers = responsibleUserIds?.map((id, index) => ({
        value: id,
        label: responsibleUserNames[index] || id,
      }));
      setResponsibleUserIds(responsibleUserIds);
      setRUserValue(responsibleUsers);
      setPrevRUserValue(responsibleUsers);
      setSelectedStatus(GetSupplierBasicInformationByIdData.status);
      getAllUser();
      getSupplierCompletionCount(
        GetSupplierBasicInformationByIdData.supplierId
      );
    }
  }, [
    isGetSupplierBasicInformationByIdFetching,
    isGetSupplierBasicInformationById,
    GetSupplierBasicInformationByIdData,
  ]);

  useEffect(() => {
    if (showModal && selectedStatus === CustomerSupplierStatus.REJECT) {
      if (responsibleUserIds) {
        const responsibleUser = responsibleUserIds?.map((id) =>
          Number(id.trim())
        );
        const formNew = { ...formData };
        formNew.initialState = {
          ...formNew.initialState,
          responsibleUserId: responsibleUser,
        };
        setFormData(formNew);
      }
    }
  }, [showModal, selectedStatus]);

  useEffect(() => {
    if (!isSuppilierFetching && isGetAllUserSucess && allGetAlluserData) {
      const filterData = allGetAlluserData.filter((item) => {
        return (
          item.roleName === null ||
          !excludingRoles
            .map((role) => role.toLowerCase())
            .includes(item.roleName.toLowerCase())
        );
      });
      const uniqueData = Array.from(
        new Map(filterData.map((item) => [item.fullName, item])).values()
      );
      const filteredData = responsibleUserIds
        ? uniqueData.filter(
          (item) => !responsibleUserIds.includes(item.userId.toString())
        )
        : uniqueData;
      const modifyUserData = filteredData.map((item) => ({
        value: item.userId,
        label: item.fullName,
      }));
      setResponsibleUserOptions(modifyUserData);
      const filterDataDropdown = allGetAlluserData.filter((item) => {
        return (
          item.roleName === null ||
          !excludingRoles
            .map((role) => role.toLowerCase())
            .includes(item.roleName.toLowerCase())
        );
      });

      const uniqueDataDropdown = Array.from(
        new Map(
          filterDataDropdown.map((item) => [item.fullName, item])
        ).values()
      );
      setDropDownOptionField(
        uniqueDataDropdown,
        "userId",
        "fullName",
        reasonData,
        "responsibleUserId"
      );
    }
  }, [isGetAllUserSucess, allGetAlluserData, isSuppilierFetching]);

  const updateRUserData = (data) => {
    const responsibleUserId = data.map((option) => option.value.toString());
    setRUserValue(data);
    setResponsibleUserIds(responsibleUserId);
    getAllUser();
  };

  const handleStatusChange = (selectedOption) => {
    if (selectedOption.label === supplierData.status) {
      ToastService.warning(
        "You can't change the status of the customer to currect customer status."
      );
    } else {
      if (selectedOption.value === CustomerSupplierStatus.PENDING) {
        confirm(
          "Warning?",
          `Are you sure you want to change the supplier status to ${selectedOption.label}?`,
          "Yes",
          "Cancel"
        ).then((confirmed) => {
          if (confirmed) {
            removeFields();
            let req = {
              supplierId: supplierId,
              statusId: selectedOption.value,
            };
            updateSupplierStatus(req);
            setSelectedStatus(selectedOption.value);
          }
        });
      } else if (
        selectedOption.value === CustomerSupplierStatus.FREEZE ||
        selectedOption.value === CustomerSupplierStatus.BLOCK ||
        selectedOption.value === CustomerSupplierStatus.DISABLE
      ) {
        removeFields();
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      } else if (selectedOption.value === CustomerSupplierStatus.SUBMITTED) {
        removeFields();
        if (childRef.current) {
          childRef.current.callChildFunction(supplierId, false);
        }
        setStatusId(selectedOption.value);
      } else if (selectedOption.value === CustomerSupplierStatus.APPROVED) {
        removeFields();
        if (childRef.current) {
          childRef.current.callChildFunction(supplierId, true);
        }
        setStatusId(selectedOption.value);
      } else if (selectedOption.value === CustomerSupplierStatus.REJECT) {
        if (supplierData.responsibleUserId) {
          removeFields();
        }
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      }
    }
  };

  useEffect(() => {
    if (supplierData) {
      let newStatusOptions = StatusValue;
      if (supplierData.status === statusMapping.APPROVED) {
        newStatusOptions = StatusValue.filter(option => option.value !== 2);
      }
      else if (supplierData.status === statusMapping.PENDING) {
        newStatusOptions = StatusValue.filter(option => option.value !== 3)
      }
      setFilteredStatusOptions(newStatusOptions);
    }
  }, [supplierData]);
  const removeFields = () => {
    const modifyFormFields = removeFormFields(formData, ["responsibleUserId"]);
    setFormData(modifyFormFields);
  };

  const updateCustomerApproval = () => {
    setSelectedStatus(statusId);
    let req = {
      supplierId: supplierId,
      statusId: statusId,
    };
    updateSupplierStatus(req);
  };

  const onReset = () => {
    let restData = { ...reasonData };
    restData.initialState = { ...formData };
    setFormData(restData);
  };

  const handleUpdate = () => {
    let custData = reasonRef.current.getFormData();
    if (custData) {
      let req = {
        ...custData,
        supplierId: supplierId,
        statusId: selectedStatus ? selectedStatus : 0,
        note: custData.inActiveReason,
      };
      updateSupplierInActiveStatus(req);
      addSupplierNotes(req);
      updateRUserDataDropdown(custData.responsibleUserId);
    }
  };

  const updateRUserDataDropdown = (value) => {
    let req = {
      supplierId: supplierId,
      userId: String(value),
    };
    addEditResponsibleUserForSupplier(req);
  };
  const onHandleBlur = () => {
    // let req = {
    //   supplierId: supplierId,
    //   userId: rUserValue?.map((option) => option.value).join(","),
    // };
    // addEditResponsibleUserForSupplier(req);

    const currentValues = rUserValue?.map((option) => option.value).join(",");

    if (currentValues !== prevRUserValue) {
      let req = {
        customerId: supplierId,
        userId: currentValues,
      };

      addEditResponsibleUserForSupplier(req);
      setPrevRUserValue(currentValues);  // Store the current value for future comparison
    }

  };
  const handleToggleModal = () => {
    setShowModal(false);
    onReset();
    getSupplierById();
    setSelectedStatus(supplierData.status);
  };

  const getStatusClass = () => {
    switch (selectedStatus) {
      case "Pending":
        return "badge-gradient-Pending";
      case "Submitted":
        return "badge-gradient-Submitted";
      case "Approved":
        return "badge-gradient-Approved";
      case "Freeze":
        return "badge-gradient-Frozen";
      case "Block":
        return "badge-gradient-Blocked";
      case "Reject":
        return "badge-gradient-reject";
      case "Disable":
        return "badge-gradient-disabled";
      default:
        return "badge-gradient-info";
    }
  };

  const getStatusLabel = (value) => {
    const status = StatusValue.find((item) => item.value === value);
    return status ? status.label : "Unknown"; // Returns 'Unknown' if value not found
  };

  const getApprovalCheckList = () => {
    if (childRef.current) {
      childRef.current.callChildFunction(supplierId, false, false);
      // childRef.current.callChildFunction(customerId, customerData.isSubCustomer ? customerData.isSubCustomer : false, false, false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="basic-customer-detail">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="d-flex profile-info justify-content-between col-12">
              <div className="d-flex col-3 flex-column profile-icon-desc justify-content-center">
                <div className="d-flex w-100">
                  <div className="profile-icon ">
                    <Image
                      imagePath={supplierData?.base64File ? supplierData?.base64File : AppIcons.DummyLogo}
                      altText="button Icon"
                    />
                  </div>
                  <div className="detail-sec">
                    <div className="customer-name">
                      <h5 className="ml-0">{supplierData?.name}</h5>
                    </div>
                    <div>
                      <div className="field-desc col-span-3">
                        <i className="fa fa-envelope"></i>
                        <a
                          className="email-link"
                          href={`mailto:${supplierData?.emailAddress}`}
                        >
                          <div className="info-desc">
                            {supplierData?.emailAddress}
                          </div>
                        </a>

                        <span
                          className="copy-icon tooltip-div"
                          onClick={() =>
                            CopyText(supplierData?.emailAddress, "email")
                          }
                        >
                          <Iconify icon="bitcoin-icons:copy-outline" />
                          <div className="tooltip-show">
                            <p>Click to Copy</p>
                          </div>
                          <div className="tooltip-arrow-icon"></div>
                        </span>
                      </div>

                      <div className="field-desc ">
                        <i className="fa fa-globe"></i>
                        <div className="info-desc">{supplierData?.website}</div>

                        <span
                          className="copy-icon tooltip-div"
                          onClick={() =>
                            CopyText(supplierData?.website, "website")
                          }
                        >
                          <Iconify icon="bitcoin-icons:copy-outline" />
                          <div className="tooltip-show">
                            <p>Click to Copy</p>
                          </div>
                          <div className="tooltip-arrow-icon"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="field-desc basic-info-select dis-dropdown">
                  <div className="inf-label">Status</div>
                  <b>&nbsp;:&nbsp;</b>
                  {isButtonDisable ?
                    <div className={`info-desc  ${getStatusClass()}`}>{selectedStatus}</div>
                    :
                    <div className={`status-dropdown ${getStatusClass()}`}>
                      <DropDown
                        options={filteredStatusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        isDisabled={isButtonDisable}
                      />
                    </div>
                  }
                </div>

                <div className="field-desc">
                  <div className="inf-label">Tax Id</div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">
                    {supplierData?.taxId
                      ? supplierData?.taxId
                      : ErrorMessage.NotAvailabe}
                  </div>
                </div>
                <div className="field-desc basic-info-select dis-dropdown">
                  <div className="inf-label">R-User</div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="status-dropdown">
                    {/* <DropDown
                    options={responsibleUserOptions}
                    value={rUserValue}
                    onChange={handleRUserChange}
                    placeholder="Responsible User"
                    isDisabled={isResponsibleUser ? true : isButtonDisable}
                  /> */}
                    <DropdownSelect
                      isMultiSelect={true}
                      placeholder="Responsible User"
                      isDropdownDisabled={
                        isResponsibleUser ? true : isButtonDisable
                      }
                      optionsValue={responsibleUserOptions}
                      value={rUserValue}
                      handleDropdownChange={updateRUserData}
                      handleDropdownBlur={onHandleBlur}
                    />
                  </div>
                </div>
                <div className="field-desc">
                  <div className="inf-label">List Code</div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">
                    {supplierData?.listCode
                      ? supplierData?.listCode
                      : ErrorMessage.NotAvailabe}
                  </div>
                </div>
              </div>

              {/* second no */}
              <div className="col-3  separator">
                <div className="field-desc">
                  <div className="inf-label">Country</div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">{supplierData?.countryName}</div>
                </div>
                <div className="field-desc">
                  <div className="inf-label">Territory</div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">{supplierData?.territory}</div>
                </div>
                <div className="field-desc">
                  <div className="inf-label">Supplier Type</div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">{supplierData?.supplierType}</div>
                </div>
              </div>

              {/* third no */}

              <div className="col-3">
                <div className="field-desc">
                  <div
                    className="inf-label"
                    style={{ minWidth: "130px", maxWidth: "130px" }}
                  >
                    Group Type
                  </div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">{supplierData?.groupType}</div>
                </div>
                <div className="field-desc">
                  <div
                    className="inf-label"
                    style={{ minWidth: "130px", maxWidth: "130px" }}
                  >
                    Incoterm
                  </div>
                  <b>&nbsp;:&nbsp;</b>
                  <div className="info-desc">{supplierData?.incotermName}</div>
                </div>
                <div className="field-desc">
                  <div
                    className="inf-label"
                    style={{ minWidth: "130px", maxWidth: "130px" }}
                  >
                    Profile Completion
                  </div>
                  <b>&nbsp;:&nbsp;</b>
                  {totalCount && (
                    <>
                      <div
                        className="submission-tab d-flex gap-2 align-items-center pt-1 pl-1"
                        style={{ cursor: "pointer", fontSize: "13px" }}
                        onClick={getApprovalCheckList}
                      >
                        {approvalSuccessCount + "/" + totalCount}

                        <span className="tooltip-div">
                          <Iconify icon="ep:info-filled" className="info" />
                          <div className="tooltip-show">
                            <p>Click to view</p>
                          </div>
                          <div className="tooltip-arrow-icon"></div>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {showEditIcon ? (
              <div className="edit-icons" onClick={editClick}>
                <Iconify icon="tabler:pencil" />
              </div>
            ) : null}
          </div>
          {showModal && (
            <CenterModel
              showModal={showModal}
              handleToggleModal={handleToggleModal}
              modalTitle={`${getStatusLabel(selectedStatus)} Reason`}
              modelSizeClass="w-50s"
            >
              <div className="row horizontal-form">
                <FormCreator config={formData} ref={reasonRef} {...formData} />
                <div className="col-md-12 mt-2">
                  <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                      <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Update"
                        isLoading={updateCustomerInActiveStatusCustomerLoading}
                        onClick={handleUpdate}
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
          )}
        </div>
      ) : (
        <DataLoader />
      )}
      <SupplierApproval
        childRef={childRef}
        isDetailPage={true}
        updateApproval={updateCustomerApproval}
        setSelectedStatus={setSelectedStatus}
        responsibleUserIds={responsibleUserIds}
        OnRejectedSupplierFromApproval={rejectedSupplierFromApproval}
      />
    </>
  );
};

SupplierBasicInfoCard.propTypes = {
  editClick: PropTypes.func.isRequired,
  supplierData: PropTypes.shape({
    name: PropTypes.string,
    emailAddress: PropTypes.string,
    website: PropTypes.string,
    taxId: PropTypes.string,
    statusId: PropTypes.number,
    status: PropTypes.string,
    responsibleUserId: PropTypes.number,
    responsibleUserName: PropTypes.string,
    countryName: PropTypes.string,
    territory: PropTypes.string,
    supplierType: PropTypes.string,
    groupType: PropTypes.string,
    isCompany: PropTypes.bool,
  }),
  isLoading: PropTypes.bool,
  supplierId: PropTypes.number.isRequired,
  getSupplierById: PropTypes.func.isRequired,
};

export default SupplierBasicInfoCard;
