/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import CopyText from "../../../../utils/CopyText/CopyText";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import DropDown from "../../../../components/ui/dropdown/DropDrown";
import { useUpdateCustomerInActiveStatusMutation, useUpdateCustomerStatusMutation } from "../../../../app/services/basicdetailAPI";
import ToastService from "../../../../services/toastService/ToastService";
import SwalAlert from "../../../../services/swalService/SwalService";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import { reasonData } from "../../customers/config/CustomerData";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import CustomerApproval from "../cutomerApproval/CustomerApproval";
import { securityKey } from "../../../../data/SecurityKey";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { ErrorMessage } from "../../../../data/appMessages";
import { StaticStatus, StatusValue } from "../../../../utils/Enums/StatusEnums";
import { excludingRoles } from "./config/BasicDetailForm.data";
import { useLazyGetAllUserQuery, useUpdateResponsibleUserMutation } from "../../../../app/services/commonAPI";
import { ownerType } from "../../../../utils/Enums/enums";

const CustomerDetails = ({ editClick, customerData, isLoading, customerId, onhandleRepeatCall }) => {
  const childRef = useRef();
  const reasonRef = useRef();
  const { confirm } = SwalAlert();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState(reasonData);
  const [showModal, setShowModal] = useState(false);
  const [staticId, setStaticId] = useState("")
  const [statusFeild, setStatusFeild] = useState("")
  const [options, setOptions] = useState([]);
  const [customerID, setcustomerId] = useState();
  const [statusId, setStatusId] = useState();
  const [rUserValue, setRUserValue] = useState([]);
  const [responsibleUserOptions, setResponsibleUserOptions] = useState([]);

  const [updateResponsibleUser, { isSuccess: isSuccessRUser, data: isUpdateRUserData }] = useUpdateResponsibleUserMutation();
  const [updateCustomerStatus, { isSuccess: isSuccessUpdateCustomerStatus, data: updateCustomerStatusData }] = useUpdateCustomerStatusMutation();
  const [updateCustomerInActiveStatus, { isLoading: updateCustomerInActiveStatusCustomerLoading, isSuccess: isSuccessUpdateCustomerInActiveStatus, data: updateCustomerInActiveStatusData }] = useUpdateCustomerInActiveStatusMutation();

  const { isResponsibleUser, isRCustomerUserDisble } = useContext(BasicDetailContext);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICCUSTOMERDETAILS);

  const [getAllUser, { isSuccess: isGetAllUserSucess, data: allGetAlluserData }] = useLazyGetAllUserQuery();

  useEffect(() => {
    if (!isResponsibleUser) {
      if (hasEditPermission.isViewOnly === true) {
        setIsButtonDisable(true);
      }
      else {
        setIsButtonDisable(false);
      }
    }
  }, [hasEditPermission, isResponsibleUser]);

  useEffect(() => {
    if (isSuccessUpdateCustomerInActiveStatus && updateCustomerInActiveStatusData) {
      ToastService.success(updateCustomerInActiveStatusData.errorMessage);
      handleToggleModal()
    }
  }, [isSuccessUpdateCustomerInActiveStatus, updateCustomerInActiveStatusData]);

  useEffect(() => {
    if (isSuccessUpdateCustomerStatus && updateCustomerStatusData) {
      ToastService.success(updateCustomerStatusData.errorMessage);
      handleToggleModal()
    }
  }, [isSuccessUpdateCustomerStatus, updateCustomerStatusData]);

  useEffect(() => {
    if (customerData) {
      const statusId = customerData.statusId;
      switch (statusId) {
        case 1:
        case 2:
        case 3:
          setOptions(StaticStatus[StatusValue[statusId - 1].label]);
          break;
        case 4:
          setOptions([
            { value: "4", label: "Freeze" },
            { value: "3", label: "Approved" },
            { value: "1", label: "Pending" },
          ]);
          break;
        case 5:
          setOptions([
            { value: "5", label: "Block" },
            { value: "3", label: "Approved" },
            { value: "1", label: "Pending" },
          ]);
          break;
        case 6:
          setOptions(StaticStatus.Approved.filter(option => option.label === StatusValue[statusId - 1].label));
          break;
        case 7:
          setOptions(StaticStatus[StatusValue[statusId - 1].label]);
          break;

        default:
          setOptions([]);
      }
      // setSelectedStatus(StatusValue[statusId - 1].label);
    }
  }, [customerData]);

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
        return item.roleName === null || !excludingRoles.map(role => role.toLowerCase()).includes(item.roleName.toLowerCase());
      });
      const modifyUserData = filterData.map((item) => ({
        value: item.userId,
        label: item.fullName,
      }));
      setResponsibleUserOptions(modifyUserData);
    }
  }, [isGetAllUserSucess, allGetAlluserData]);

  const handleStatusChange = (selectedOption) => {
    setStaticId(selectedOption.value)
    setStatusFeild(selectedOption.label)
    if (selectedOption.label === customerData.status) {
      ToastService.warning("You can't change the status of the customer to currect customer status.");
    } else {
      if (selectedOption.value === "1" || selectedOption.value === "2") {
        confirm(
          "Warning?",
          `Are you sure you want to change the customer status to ${selectedOption.label}?`,
          "Yes",
          "Cancel"
        ).then((confirmed) => {
          if (confirmed) {
            let req = {
              customerId: customerId,
              statusId: selectedOption.value
            }
            updateCustomerStatus(req);
            setSelectedStatus(selectedOption.value);
          }
        });
      } else if (selectedOption.value === "4" || selectedOption.value === "5" || selectedOption.value === "6" || selectedOption.value === "7") {
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      } else if (selectedOption.value === "3") {
        if (childRef.current) {
          childRef.current.callChildFunction(customerId);
        }
        setcustomerId(customerId);
        setStatusId(selectedOption.value);
      }
    }
  };

  //** Responsible User  */
  const handleRUserChange = (selectedValue) => {
    confirm("Warning?", `Are you sure you want to assign the responsible user?`,
      "Yes", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        updateRUserData(selectedValue.value);
      }
    });
  }
  const updateRUserData = (value) => {
    let req = {
      ownerId: customerId,
      ownerType: ownerType.Customer,
      responsibleUserId: value
    }
    updateResponsibleUser(req);
    setRUserValue(value);
  }
  useEffect(() => {
    if (isSuccessRUser && isUpdateRUserData) {
      ToastService.success(isUpdateRUserData.errorMessage);
    }
  }, [isSuccessRUser, isUpdateRUserData]);

  const updateCustomerApproval = () => {
    setSelectedStatus(statusId);
    let req = {
      customerId: customerID,
      statusId: statusId
    }
    updateCustomerStatus(req)
  }

  const onReset = () => {
    let restData = { ...reasonData };
    restData.initialState = { ...formData };
    setFormData(restData);
  }

  const handleUpdate = () => {

    let custData = reasonRef.current.getFormData();
    if (custData) {
      let req = {
        ...custData,
        customerId: customerId,
        statusId: staticId
      }
      updateCustomerInActiveStatus(req)
    }
  }

  const handleToggleModal = () => {
    setShowModal(false);
    onReset()
    onhandleRepeatCall()
    setSelectedStatus(customerData.status)
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

  return (
    !isLoading ?
      <div className="basic-customer-detail" >
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="profile-info">
            <div className="profile-icon-desc">
              <div className="d-flex align-items-center">
                <div className="profile-icon"> {customerData?.name ? customerData?.name.charAt(0).toUpperCase() : ""}</div>
                <h5>{customerData?.name}</h5>
              </div>
              <div className="edit-icons" onClick={editClick}>
                <Image
                  imagePath={AppIcons.editThemeIcon}
                  altText="Website Icon"
                />
              </div>
            </div>
          </div>
          <div className="field-desc d-flex align-items-center">
            <div className="inf-label">R-User</div>
            <b>&nbsp;:&nbsp;</b>
            <div className='status-dropdown'>
              <DropDown
                options={responsibleUserOptions}
                value={rUserValue}
                onChange={handleRUserChange}
                placeholder="Select Status"
                isDisabled={isRCustomerUserDisble}
              />
            </div>
          </div>
          <div className="field-desc d-flex align-items-center">
            <div className="inf-label">Status</div>
            <b>&nbsp;:&nbsp;</b>
            <div className={`status-dropdown ${getStatusClass()}`}>
              <DropDown
                options={options}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Select Status"
                isDisabled={isButtonDisable}
              />
            </div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Email</div>
            <b>&nbsp;:&nbsp;</b>
            <a className="email-link" href={`mailto:${customerData?.emailAddress}`}>
              <div className="info-desc">{customerData?.emailAddress}</div>
            </a>
            <span className="copy-icon" onClick={() => CopyText(customerData?.emailAddress, 'email')}>
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>

          </div>
          <div className="field-desc">
            <div className="inf-label">Website</div>
            <b>&nbsp;:&nbsp;</b>

            <div className="info-desc">{customerData?.website}</div>

            <span className="copy-icon" onClick={() => CopyText(customerData?.website, 'website')}>
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>

          </div>

          <div className="field-desc">
            <div className="inf-label">Country</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.countryName}</div>
          </div>

          <div className="field-desc">
            <div className="inf-label">Group Type</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.type}</div>
          </div>

          <div className="field-desc">
            <div className="inf-label">Territory</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.territory}</div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Tax Id</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.taxId ? customerData?.taxId : ErrorMessage.NotAvailabe}</div>
          </div>
          {/* <div className="field-desc">
            <div className="inf-label">Is Company</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">
              {customerData?.isCompany}
              {customerData && customerData.isCompany ? <i className="fa fa-check green-color"></i> : <i className="fa fa-times red-color"></i>}
            </div>
          </div> */}
          <div className="field-desc">
            <div className="inf-label inf-label-width ">Is Buying for Third Party</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">
              {customerData?.isBuyingForThirdParty}
              {customerData && customerData.isBuyingForThirdParty ? <i className="fa fa-check green-color"></i> : <i className="fa fa-times red-color"></i>}
            </div>
          </div>
        </div>
        {showModal && (
          <CenterModel
            showModal={showModal}
            handleToggleModal={handleToggleModal}
            modalTitle={`${statusFeild} Reason`}
            modelSizeClass="w-50s"
          >
            <div className="row horizontal-form">
              <FormCreator
                config={formData}
                ref={reasonRef}
                {...formData}

              />
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
        <CustomerApproval isDetailPage={true} childRef={childRef} updateCustomerApproval={updateCustomerApproval} />
      </div>
      : <DataLoader />
  );
};

export default CustomerDetails;
