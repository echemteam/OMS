/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "../../../../../components/image/Image";
import DropDown from "../../../../../components/ui/dropdown/DropDrown";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";
import CustomerApproval from "../../cutomerApproval/CustomerApproval";
import SwalAlert from "../../../../../services/swalService/SwalService";
import {
  useLazyGetAllUserQuery,
  useUpdateResponsibleUserMutation,
} from "../../../../../app/services/commonAPI";
import {
  useUpdateCustomerInActiveStatusMutation,
  useUpdateCustomerStatusMutation,
  useUpdateCustomerSubCustomerMutation
} from "../../../../../app/services/basicdetailAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { securityKey } from "../../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import {
  StatusValue,
} from "../../../../../utils/Enums/StatusEnums";
import { excludingRoles } from "../../customerBasicDetail/config/CustomerBasicDetail.data";
import { AppIcons } from "../../../../../data/appIcons";
import CopyText from "../../../../../utils/CopyText/CopyText";
import { ErrorMessage, SuccessMessage } from "../../../../../data/appMessages";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { OwnerType } from "../../../../../utils/Enums/commonEnums";
import { reasonData } from "../../../../../common/features/component/CustomerSupplierReason/Reason.data";
import PropTypes from 'prop-types';
import { removeFormFields } from "../../../../../utils/FormFields/RemoveFields/handleRemoveFields";


const CustomerBasicInfoCard = ({
  editClick,
  customerData,
  isLoading,
  customerId,
  getCustomerById,
}) => {
  const childRef = useRef();
  const reasonRef = useRef();
  const { confirm } = SwalAlert();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState(reasonData);
  const [showModal, setShowModal] = useState(false);
  const [customerID, setCustomerId] = useState();
  const [statusId, setStatusId] = useState();
  const [rUserValue, setRUserValue] = useState([]);
  const [responsibleUserOptions, setResponsibleUserOptions] = useState([]);
  const [
    updateCustomerSubCustomer,
    { isSuccess: isSuccessUpdateCustomerSubCustomer, data: isUpdateCustomerSubCustomerData },
  ] = useUpdateCustomerSubCustomerMutation();

  const [
    updateResponsibleUser,
    { isSuccess: isSuccessRUser, data: isUpdateRUserData },
  ] = useUpdateResponsibleUserMutation();
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

  const { isResponsibleUser } = useContext(BasicDetailContext);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(
    securityKey.EDITBASICCUSTOMERDETAILS
  );

  const [
    getAllUser,
    { isSuccess: isGetAllUserSucess, data: allGetAlluserData },
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
    if (isSuccessUpdateCustomerStatus && updateCustomerStatusData) {
      ToastService.success(updateCustomerStatusData.errorMessage);
      handleToggleModal();
    }
  }, [isSuccessUpdateCustomerStatus, updateCustomerStatusData]);

  // useEffect(() => {
  //   setOptions(StatusValue);
  //   if (customerData) {
  //     // const statusId = customerData.statusId;
  //     // switch (statusId) {
  //     //   case 1:
  //     //   case 2:
  //     //   case 3:
  //     //     setOptions(StaticStatus[StatusValue[statusId - 1].label]);
  //     //     break;
  //     //   case 4:
  //     //     setOptions([
  //     //       { value: "4", label: "Freeze" },
  //     //       { value: "3", label: "Approved" },
  //     //       { value: "1", label: "Pending" },
  //     //     ]);
  //     //     break;
  //     //   case 5:
  //     //     setOptions([
  //     //       { value: "5", label: "Block" },
  //     //       { value: "3", label: "Approved" },
  //     //       { value: "1", label: "Pending" },
  //     //     ]);
  //     //     break;
  //     //   case 6:
  //     //     setOptions(
  //     //       StaticStatus.Approved.filter(
  //     //         (option) => option.label === StatusValue[statusId - 1].label
  //     //       )
  //     //     );
  //     //     break;
  //     //   case 7:
  //     //     setOptions(StaticStatus[StatusValue[statusId - 1].label]);
  //     //     break;

  //     //   default:
  //     //     setOptions([]);
  //     // }
  //   }
  // }, [customerData]);

  useEffect(() => {
    if (customerData) {
      setSelectedStatus(customerData.status);
      setRUserValue(customerData.responsibleUserName);
      getAllUser();
    }
  }, [customerData]);

  useEffect(() => {
    if (isGetAllUserSucess && allGetAlluserData) {
      const filterData = allGetAlluserData.filter((item) => {
        return (
          item.roleName === null ||
          !excludingRoles
            .map((role) => role.toLowerCase())
            .includes(item.roleName.toLowerCase())
        );
      });
      const modifyUserData = filterData.map((item) => ({
        value: item.userId,
        label: item.fullName,
      }));
      setResponsibleUserOptions(modifyUserData);
    }
  }, [isGetAllUserSucess, allGetAlluserData]);

  const handleStatusChange = (selectedOption) => {
    if (selectedOption.label === customerData.status) {
      ToastService.warning(
        "You can't change the status of the customer to currect customer status."
      );
    } else {
      if (selectedOption.value === 1 || selectedOption.value === 2) {
        confirm(
          "Warning?",
          `Are you sure you want to change the customer status to ${selectedOption.label}?`,
          "Yes",
          "Cancel"
        ).then((confirmed) => {
          if (confirmed) {
            removeFields();
            let req = {
              customerId: customerId,
              statusId: selectedOption.value,
            };
            updateCustomerStatus(req);
            setSelectedStatus(selectedOption.value);
          }
        });
      } else if (
        selectedOption.value === 4 ||
        selectedOption.value === 5 ||
        selectedOption.value === 6
      ) {
        removeFields();
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      } else if (selectedOption.value === 3) {
        removeFields();
        if (childRef.current) {
          childRef.current.callChildFunction(
            customerId,
            customerData.isSubCustomer ? customerData.isSubCustomer : false
          );
        }
        setCustomerId(customerId);
        setStatusId(selectedOption.value);
      } else if (selectedOption.value === 7) {
        if (customerData.responsibleUserId) {
          removeFields();
        }
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      }
    }
  };

  const removeFields = () => {
    const modifyFormFields = removeFormFields(formData, ['responsibleUserId']);
    setFormData(modifyFormFields);
  }


  //** Responsible User  */
  const handleRUserChange = (selectedValue) => {
    confirm(
      "Warning?",
      `Are you sure you want to assign the responsible user?`,
      "Yes",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        updateRUserData(selectedValue.value);
      }
    });
  };
  const updateRUserData = (value) => {
    let req = {
      ownerId: customerId,
      ownerType: OwnerType.Customer,
      responsibleUserId: value,
    };
    updateResponsibleUser(req);
    setRUserValue(value);
  };
  useEffect(() => {
    if (isSuccessRUser && isUpdateRUserData) {
      ToastService.success(isUpdateRUserData.errorMessage);
    }
  }, [isSuccessRUser, isUpdateRUserData]);

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
      };
      updateCustomerInActiveStatus(req);
      updateRUserData(custData?.responsibleUserId?.value);
    }
  };

  const handleToggleModal = () => {
    setShowModal(false);
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
    if (isSuccessUpdateCustomerSubCustomer && isUpdateCustomerSubCustomerData) {
      ToastService.success(isUpdateCustomerSubCustomerData.errorMessage);
      getCustomerById();
    }
  }, [isSuccessUpdateCustomerSubCustomer, isUpdateCustomerSubCustomerData]);

  const getStatusLabel = (value) => {
    const status = StatusValue.find(item => item.value === value);
    return status ? status.label : 'Unknown'; // Returns 'Unknown' if value not found
  };

  return !isLoading ? (
    <div className="basic-customer-detail">
      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
        <div className="d-flex gap-5 profile-info  justify-content-between col-11">
          <div className="d-flex col-3 flex-column profile-icon-desc justify-content-center">
            <div className="d-flex">
              <div className="profile-icon ">
                {" "}
                {customerData?.name
                  ? customerData?.name.charAt(0).toUpperCase()
                  : ""}
              </div>
              <h5 className="ml-0">{customerData?.name}</h5>
            </div>

            <div className="field-desc col-span-3">
              <i className="fa fa-envelope"></i>
              <a
                className="email-link"
                href={`mailto:${customerData?.emailAddress}`}
              >
                <div className="info-desc">{customerData?.emailAddress}</div>
              </a>
              <span
                className="copy-icon"
                onClick={() => CopyText(customerData?.emailAddress, "email")}
              >
                <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
              </span>
            </div>

            <div className="field-desc ">
              <i className="fa fa-globe"></i>
              <div className="info-desc">{customerData?.website}</div>

              <span
                className="copy-icon"
                onClick={() => CopyText(customerData?.website, "website")}
              >
                <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
              </span>
            </div>
          </div>

          <div className="col-3">
            <div className="field-desc basic-info-select">
              <div className="inf-label">Status</div>
              <b>&nbsp;:&nbsp;</b>
              <div className={`status-dropdown ${getStatusClass()}`}>
                <DropDown
                  options={StatusValue}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  placeholder="Select Status"
                  isDisabled={isButtonDisable}
                />
              </div>
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
            <div className="field-desc basic-info-select">
              <div className="inf-label">R-User</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="status-dropdown">
                <DropDown
                  options={responsibleUserOptions}
                  value={rUserValue}
                  onChange={handleRUserChange}
                  placeholder="Responsible User"
                  isDisabled={isResponsibleUser ? true : isButtonDisable}
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
                    checked={customerData?.isSubCustomer ? customerData?.isSubCustomer : false}
                    onChange={handleCheckboxChange}
                    disabled={isButtonDisable}
                  />
                  <label
                    htmlFor={"isSubCustomer"}
                    className="checkbox-label"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="edit-icons" onClick={editClick}>
          <Image imagePath={AppIcons.editThemeIcon} altText="Website Icon" />
        </div>
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
      <CustomerApproval
        isDetailPage={true}
        childRef={childRef}
        updateCustomerApproval={updateCustomerApproval}
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
