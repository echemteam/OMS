/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../../../../../components/ui/dropdown/DropDrown";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";

import SwalAlert from "../../../../../services/swalService/SwalService";
import { useLazyGetAllUserQuery } from "../../../../../app/services/commonAPI";
import {
  useAddEditResponsibleUserForCustomerMutation,
  useLazyDownloadQuery,
  useUpdateCustomerInActiveStatusMutation,
  useUpdateCustomerStatusMutation,
  useUpdateCustomerSubCustomerMutation,
} from "../../../../../app/services/basicdetailAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { securityKey } from "../../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { StatusValue, statusMapping } from "../../../../../utils/Enums/StatusEnums";
import { excludingRoles } from "../../customerBasicDetail/config/CustomerBasicDetail.data";
import CopyText from "../../../../../utils/CopyText/CopyText";
import { ErrorMessage, SuccessMessage } from "../../../../../data/appMessages";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
// import { OwnerType } from "../../../../../utils/Enums/commonEnums";
import { reasonData } from "../../../../../common/features/component/CustomerSupplierReason/Reason.data";
import PropTypes from "prop-types";
import { removeFormFields } from "../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import Iconify from "../../../../../components/ui/iconify/Iconify";
// import { Tooltip } from "react-bootstrap";
// import Select from 'react-select';
import DropdownSelect from "../../../../../components/ui/dropdown/DropdownSelect";
import AddEditInvoiceSubmissionInstructionDetail from "./feature/AddEditInvoiceSubmissionInstructionDetail";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useAddCustomerNotesMutation } from "../../../../../app/services/notesAPI";
import { CustomerSupplierStatus } from "../../../../../utils/Enums/commonEnums";
import Tooltip from "../../../../../components/ui/tooltip/Tooltip";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

//** Component's */
const CustomerApproval = React.lazy(() =>
  import("../../cutomerApproval/CustomerApproval")
);

const CustomerBasicInfoCard = ({
  editClick,
  customerData,
  isLoading,
  customerId,
  getCustomerById,
  isGetCustomersBasicInformationById,
  isGetCustomersBasicInformationByIdFetching,
  GetCustomersBasicInformationByIdData,
}) => {
  const childRef = useRef();
  const reasonRef = useRef();
  const { confirm } = SwalAlert();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState(reasonData);
  const [showModal, setShowModal] = useState(false);
  const [isInvoiceModelShow, setIsInvoiceModelShow] = useState(false);
  const [customerID, setCustomerId] = useState();
  const [statusId, setStatusId] = useState();
  const [responsibleUserIds, setResponsibleUserIds] = useState([]);
  const [rUserValue, setRUserValue] = useState([]);
  const [responsibleUserOptions, setResponsibleUserOptions] = useState([]);
  const [filteredStatusOptions, setFilteredStatusOptions] = useState(StatusValue);
  const [prevRUserValue, setPrevRUserValue] = useState("");

  const [
    updateCustomerSubCustomer,
    {
      isSuccess: isSuccessUpdateCustomerSubCustomer,
      data: isUpdateCustomerSubCustomerData,
    },
  ] = useUpdateCustomerSubCustomerMutation();

  const [
    downalodImage,
    {
      isSuccess: isSuccessDownalod,
      data: isDownalodData,
    },
  ] = useLazyDownloadQuery();

  const [
    addEditResponsibleUserForCustomer,
    {
      isSuccess: isSuccessAddEditResponsibleUserForCustomer,
      data: isAddEditResponsibleUserForCustomerData,
    },
  ] = useAddEditResponsibleUserForCustomerMutation();
  const [
    updateCustomerStatus,
    {
      isSuccess: isSuccessUpdateCustomerStatus,
      data: updateCustomerStatusData,
    },
  ] = useUpdateCustomerStatusMutation();
  const [
    updateCustomerInActiveStatus,
    {
      isLoading: updateCustomerInActiveStatusCustomerLoading,
      isSuccess: isSuccessUpdateCustomerInActiveStatus,
      data: updateCustomerInActiveStatusData,
    },
  ] = useUpdateCustomerInActiveStatusMutation();

  const [addCustomerNotes] = useAddCustomerNotesMutation();

  const {
    isResponsibleUser,
    totalCount,
    approvalSuccessCount,
    getCustomerCompletionCount,
    setSubCustomer,
    subCustomer,
  } = useContext(BasicDetailContext);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(
    securityKey.EDITBASICCUSTOMERDETAILS
  );

  const [
    getAllUser,
    { isFetching, isSuccess: isGetAllUserSucess, data: allGetAlluserData },
  ] = useLazyGetAllUserQuery();
  useEffect(() => {
    if (!isResponsibleUser) {
      if (hasEditPermission && hasEditPermission.isViewOnly === true) {
        setIsButtonDisable(true);
      } else if (hasEditPermission.isEditable === true) {
        // setShowEditIcon(true);
      } else {
        setIsButtonDisable(true);
      }
    }
  }, [hasEditPermission, isResponsibleUser]);
  useEffect(() => {
    if (
      isSuccessUpdateCustomerInActiveStatus &&
      updateCustomerInActiveStatusData
    ) {
      ToastService.success(updateCustomerInActiveStatusData.errorMessage);
      handleToggleModal();
    }
  }, [isSuccessUpdateCustomerInActiveStatus, updateCustomerInActiveStatusData]);

  useEffect(() => {
    if (isSuccessDownalod && isDownalodData) {
      const fileData = isDownalodData.fileData;
      const blob = new Blob([fileData], { type: fileData.type });
      const fileURL = URL.createObjectURL(blob);
      console.log(fileURL);
    }
  }, [isSuccessDownalod, isDownalodData]);

  useEffect(() => {
    if (isSuccessUpdateCustomerStatus && updateCustomerStatusData) {
      ToastService.success(updateCustomerStatusData.errorMessage);
      handleToggleModal();
    }
  }, [isSuccessUpdateCustomerStatus, updateCustomerStatusData]);
  useEffect(() => {
    if (
      GetCustomersBasicInformationByIdData &&
      isGetCustomersBasicInformationById &&
      !isGetCustomersBasicInformationByIdFetching
    ) {
      const responsibleUserIds =
        GetCustomersBasicInformationByIdData?.responsibleUserId
          ?.split(",")
          .map((id) => id.trim());
      const responsibleUserNames =
        GetCustomersBasicInformationByIdData?.responsibleUserName
          ?.split(",")
          .map((name) => name.trim());
      const responsibleUsers = responsibleUserIds?.map((id, index) => ({
        value: id,
        label: responsibleUserNames[index] || id,
      }));
      setResponsibleUserIds(responsibleUserIds);
      setRUserValue(responsibleUsers);
      setPrevRUserValue(responsibleUsers);
      setSelectedStatus(GetCustomersBasicInformationByIdData.status);
      getAllUser();
      getCustomerCompletionCount(
        customerId,
        GetCustomersBasicInformationByIdData?.isSubCustomer
      );
      setSubCustomer(GetCustomersBasicInformationByIdData?.isSubCustomer);
    }
  }, [
    GetCustomersBasicInformationByIdData,
    isGetCustomersBasicInformationById,
    isGetCustomersBasicInformationByIdFetching,
  ]);

  const rejectedCustomerFromApproval = () => {
    getCustomerById();
  };

  useEffect(() => {
    if (!isFetching && isGetAllUserSucess && allGetAlluserData) {
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
      // Remove duplicates based on fullName
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
  }, [isGetAllUserSucess, allGetAlluserData, isFetching]);

  const handleStatusChange = (selectedOption) => {
    if (selectedOption.label === customerData.status) {
      ToastService.warning(
        "You can't change the status of the customer to currect customer status."
      );
    } else {
      if (selectedOption.value === CustomerSupplierStatus.PENDING) {
        confirm(
          "Warning?",
          `Are you sure you want to change the customer status to ${selectedOption.label}?`,
          "Yes",
          "Cancel"
        ).then((confirmed) => {
          if (confirmed) {
            let req = {
              customerId: customerId,
              statusId: selectedOption.value,
            };
            updateCustomerStatus(req);
            setSelectedStatus(selectedOption.value);
          }
        });
      } else if (
        selectedOption.value === CustomerSupplierStatus.FREEZE ||
        selectedOption.value === CustomerSupplierStatus.BLOCK ||
        selectedOption.value === CustomerSupplierStatus.DISABLE ||
        selectedOption.value === CustomerSupplierStatus.REJECT
      ) {
        if (selectedOption.value !== CustomerSupplierStatus.REJECT) {
          if (customerData.responsibleUserId) {
            removeFields();
          }
        }
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      } else if (
        selectedOption.value === CustomerSupplierStatus.APPROVED ||
        selectedOption.value === CustomerSupplierStatus.SUBMITTED
      ) {
        if (childRef.current) {
          childRef.current.callChildFunction(
            customerId,
            customerData.isSubCustomer ? customerData.isSubCustomer : false,
            selectedOption.value === CustomerSupplierStatus.SUBMITTED
              ? false
              : true
          );
        }
        setCustomerId(customerId);
        setStatusId(selectedOption.value);
      }
    }
  };


  useEffect(() => {
    if (customerData) {
      let newStatusOptions = StatusValue;
      if (customerData.status === statusMapping.APPROVED) {
        newStatusOptions = StatusValue.filter(option => option.value !== 2);
      }
      else if (customerData.status === statusMapping.PENDING) {
        newStatusOptions = StatusValue.filter(option => option.value !== 3)
      }
      setFilteredStatusOptions(newStatusOptions);
    }
  }, [customerData]);


  const removeFields = () => {
    const modifyFormFields = removeFormFields(formData, ["responsibleUserId"]);
    setFormData(modifyFormFields);
  };

  const onHandleBlur = () => {
    // Compare current rUserValue with previous value
    const currentValues = rUserValue?.map((option) => option.value).join(",");

    if (currentValues !== prevRUserValue) {
      let req = {
        customerId: customerId,
        userId: currentValues,
      };

      addEditResponsibleUserForCustomer(req);
      setPrevRUserValue(currentValues);  // Store the current value for future comparison
    }
  };


  const updateRUserData = (data) => {
    const responsibleUserId = data.map((option) => option.value.toString());
    setRUserValue(data);
    setResponsibleUserIds(responsibleUserId);
    getAllUser();
  };

  useEffect(() => {
    if (
      isSuccessAddEditResponsibleUserForCustomer &&
      isAddEditResponsibleUserForCustomerData
    ) {
      ToastService.success(
        isAddEditResponsibleUserForCustomerData.errorMessage
      );
      getCustomerCompletionCount(customerId, subCustomer);
    }
  }, [
    isSuccessAddEditResponsibleUserForCustomer,
    isAddEditResponsibleUserForCustomerData,
  ]);

  const updateCustomerApproval = () => {
    setSelectedStatus(statusId);
    let req = {
      customerId: customerID,
      statusId: statusId,
    };
    updateCustomerStatus(req);
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
        customerId: customerId,
        statusId: selectedStatus ? selectedStatus : 0,
        note: custData.inActiveReason,
      };
      updateCustomerInActiveStatus(req);
      addCustomerNotes(req);
      updateRUserDataDropdown(custData.responsibleUserId);
    }
  };

  const updateRUserDataDropdown = (value) => {
    let req = {
      customerId: customerId,
      userId: String(value),
    };
    addEditResponsibleUserForCustomer(req);
  };

  const handleModelShow = () => {
    setIsInvoiceModelShow(true);
  };

  const handleToggleModal = () => {
    setShowModal(false);
    setIsInvoiceModelShow(false);
    onReset();
    getCustomerById();
    setSelectedStatus(customerData.status);
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

  const handleCheckboxChange = (e) => {
    const value = e.target.checked;
    confirm(
      "Warning?",
      SuccessMessage.Confirm_Update.replace("{0}", "Sub Customer"),
      "Yes",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        let request = {
          customerId: customerId,
          isSubCustomer: value,
        };
        updateCustomerSubCustomer(request);
      }
    });
  };

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
    if (isSuccessUpdateCustomerSubCustomer && isUpdateCustomerSubCustomerData) {
      ToastService.success(isUpdateCustomerSubCustomerData.errorMessage);
      getCustomerById();
      getCustomerCompletionCount(customerId, subCustomer);
    }
  }, [isSuccessUpdateCustomerSubCustomer, isUpdateCustomerSubCustomerData]);

  const getStatusLabel = (value) => {
    const status = StatusValue.find((item) => item.value === value);
    return status ? status.label : "Unknown"; // Returns 'Unknown' if value not found
  };

  const getApprovalCheckList = () => {
    if (childRef.current) {
      childRef.current.callChildFunction(
        customerId,
        customerData.isSubCustomer ? customerData.isSubCustomer : false,
        false,
        false
      );
    }
  };

  return !isLoading ? (
    <div className="basic-customer-detail">
      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
        <div className="d-flex profile-info  justify-content-between col-12">
          <div className="col-3 flex-column profile-icon-desc justify-content-center">
            <div className="d-flex w-100">
              <div className="profile-icon ">
                {/* {" "}
                {customerData?.name
                  ? customerData?.name.charAt(0).toUpperCase()
                  : ""} */}
                <Image imagePath={AppIcons.DummyLogo} altText="button Icon" />
              </div>
              <div className="detail-sec">
                <div className="customer-name">
                  <h5 className="ml-0" title={customerData?.name}>
                    {customerData?.name}
                  </h5>
                  <div className="info-icon">
                    <Iconify icon="ep:info-filled" className="info" />
                    <Tooltip text={customerData?.name} />
                  </div>
                </div>
                <div>
                  <div className="field-desc col-span-3">
                    <i className="fa fa-envelope"></i>
                    <a
                      className="email-link"
                      href={`mailto:${customerData?.emailAddress}`}
                    >
                      <div className="info-desc">
                        {customerData?.emailAddress}
                      </div>
                    </a>

                    <span
                      className="copy-icon tooltip-div"
                      onClick={() =>
                        CopyText(customerData?.emailAddress, "email")
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
                    <div className="info-desc">{customerData?.website}</div>

                    <span
                      className="copy-icon tooltip-div"
                      onClick={() => CopyText(customerData?.website, "website")}
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

          <div className="col-3 pr-5">
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
                </div>}
            </div>

            <div className="field-desc">
              <div className="inf-label">Tax Id</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">
                {customerData?.taxId
                  ? customerData?.taxId
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
              onChange={updateRUserData}
              placeholder="Responsible User"
              isDisabled={isResponsibleUser ? true : isButtonDisable}
              isMultiSelect={true}
              onBlur={onHandleBlur}
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
          </div>

          {/* second no */}
          <div className="col-3  separator">
            <div className="field-desc">
              <div className="inf-label">Country</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">{customerData?.countryName}</div>
            </div>
            <div className="field-desc">
              <div className="inf-label">Territory</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">{customerData?.territory}</div>
            </div>
            <div className="field-desc">
              <div className="inf-label">Group Type</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">{customerData?.type}</div>
            </div>
            <div className="field-desc">
              <div className="inf-label">Incoterm</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">{customerData?.incotermName}</div>
            </div>
          </div>

          {/* third no */}

          <div className="col-3">
            <div className="field-desc">
              <div className="inf-label inf-label-width ">
                Is Buying for Third Party
              </div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">
                {customerData?.isBuyingForThirdParty}
                {customerData && customerData.isBuyingForThirdParty ? (
                  <i className="fa fa-check green-color"></i>
                ) : (
                  <i className="fa fa-times red-color"></i>
                )}
              </div>
            </div>
            <div className="field-desc">
              <div className="inf-label inf-label-width">Is Sub Customer</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="checkbox-part ml-2 mt-2">
                <div className="checkbox">
                  <input
                    name={"isSubCustomer"}
                    className="form-checkbox"
                    type="checkbox"
                    id={"isSubCustomer"}
                    checked={
                      customerData?.isSubCustomer
                        ? customerData?.isSubCustomer
                        : false
                    }
                    onChange={handleCheckboxChange}
                    disabled={isResponsibleUser ? true : isButtonDisable}
                  />
                  <label
                    htmlFor={"isSubCustomer"}
                    className="checkbox-label"
                  ></label>
                </div>
              </div>
            </div>
            {isResponsibleUser || !isButtonDisable ? (
              <div className="field-desc">
                <div className="inf-label inf-label-width submission-tab">
                  Invoice Submission
                </div>
                <b>&nbsp;:&nbsp;</b>
                <div className="checkbox-part ml-2 mt-2 eye-icon tooltip-div">
                  <Iconify icon="ph:eye-duotone" onClick={handleModelShow} />
                  <div className="tooltip-show">
                    <p>Add/Edit Invoice Submission</p>
                  </div>
                  <div className="tooltip-arrow-icon"></div>
                </div>
              </div>
            ) : null}

            <div className="field-desc">
              <div className="inf-label inf-label-width">
                Profile Completion
              </div>
              {totalCount && (
                <>
                  <b>&nbsp;:&nbsp;</b>
                  <div
                    className="submission-tab d-flex gap-2 align-items-center"
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
        <div className="edit-icons" onClick={editClick}>
          {/* <Image imagePath={AppIcons.editThemeIcon} altText="Website Icon" /> */}
          <Iconify icon="tabler:pencil" />
        </div>
      </div>
      {showModal && (
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle={`${getStatusLabel(selectedStatus)} Reason`}
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
      {isInvoiceModelShow && (
        <CenterModel
          showModal={isInvoiceModelShow}
          handleToggleModal={setIsInvoiceModelShow}
          modalTitle="Add/Edit Invoice Submission Instruction"
          modelSizeClass="w-60"
        >
          <AddEditInvoiceSubmissionInstructionDetail
            customerId={customerId}
            isInvoiceModelShow={isInvoiceModelShow}
            setIsInvoiceModelShow={setIsInvoiceModelShow}
            handleToggleModal={handleToggleModal}
          />
        </CenterModel>
      )}
      <CustomerApproval
        isDetailPage={true}
        childRef={childRef}
        updateCustomerApproval={updateCustomerApproval}
        responsibleUserIds={responsibleUserIds}
        setSelectedStatus={setSelectedStatus}
        onRejectedCustomerFromApproval={rejectedCustomerFromApproval}
      />
    </div>
  ) : (
    <DataLoader />
  );
};

CustomerBasicInfoCard.propTypes = {
  editClick: PropTypes.func.isRequired,
  customerData: PropTypes.shape({
    name: PropTypes.string,
    emailAddress: PropTypes.string,
    website: PropTypes.string,
    taxId: PropTypes.string,
    statusId: PropTypes.number,
    status: PropTypes.string,
    responsibleUserName: PropTypes.string,
    countryName: PropTypes.string,
    territory: PropTypes.string,
    type: PropTypes.string,
    isBuyingForThirdParty: PropTypes.bool,
    isSubCustomer: PropTypes.bool,
  }),
  isLoading: PropTypes.bool,
  customerId: PropTypes.number.isRequired,
  getCustomerById: PropTypes.func.isRequired,
};

export default CustomerBasicInfoCard;
