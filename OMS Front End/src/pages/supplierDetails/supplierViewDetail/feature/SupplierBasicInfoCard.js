/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useContext } from 'react'
//** Lib's */
import Image from '../../../../components/image/Image';
import { AppIcons } from '../../../../data/appIcons';
import CopyText from '../../../../utils/CopyText/CopyText';
import { securityKey } from '../../../../data/SecurityKey';
import { ErrorMessage } from '../../../../data/appMessages';
import Buttons from '../../../../components/ui/button/Buttons';
import { OwnerType } from '../../../../utils/Enums/commonEnums';
import FormCreator from '../../../../components/Forms/FormCreator';
import DropDown from '../../../../components/ui/dropdown/DropDrown';
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';
import CenterModel from '../../../../components/ui/centerModel/CenterModel';
import { StaticStatus, StatusValue } from '../../../../utils/Enums/StatusEnums';
import { reasonData } from '../../../customerDetail/customers/config/CustomerData';
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { excludingRoles } from '../../../customerDetail/features/basicDetail/config/BasicDetailForm.data';
//** Service's */
import SwalAlert from '../../../../services/swalService/SwalService';
import ToastService from '../../../../services/toastService/ToastService';
import { useLazyGetAllUserQuery, useUpdateResponsibleUserMutation } from '../../../../app/services/commonAPI';
import { useUpdateSupplierInActiveStatusMutation, useUpdateSupplierStatusMutation } from '../../../../app/services/supplierAPI';

//** Component's */
const SupplierApproval = React.lazy(() => import("../../feature/supplierApproval/SupplierApproval"));

const SupplierBasicInfoCard = ({ editClick, supplierData, isLoading, supplierId, onhandleRepeatCall }) => {

  const childRef = useRef();
  const reasonRef = useRef();
  const { confirm } = SwalAlert();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState(reasonData);
  const [showModal, setShowModal] = useState(false);
  const [staticId, setStaticId] = useState("")
  const [statusFeild, setStatusFeild] = useState("")
  const [options, setOptions] = useState([]);
  const [statusId, setStatusId] = useState();
  // const [supplierId, setSupplierId] = useState();

  const [rUserValue, setRUserValue] = useState([]);
  const [responsibleUserOptions, setResponsibleUserOptions] = useState([]);
  const [getAllUser, { isSuccess: isGetAllUserSucess, data: allGetAlluserData }] = useLazyGetAllUserQuery();
  const [updateResponsibleUser, { isSuccess: isSuccessRUser, data: isUpdateRUserData }] = useUpdateResponsibleUserMutation();
  const [updateSupplierStatus, { isSuccess: isSuccessUpdateSupplierStatus, data: updateSupplierStatusData }] = useUpdateSupplierStatusMutation();
  const [updateSupplierInActiveStatus, { isLoading: updateCustomerInActiveStatusCustomerLoading, isSuccess: isSuccessUpdateSupplierInActiveStatus, data: updateSupplierInActiveStatusData }] = useUpdateSupplierInActiveStatusMutation();

  const { isResponsibleUser } = useContext(AddSupplierContext);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICSUPPLIERDETAILS);

  useEffect(() => {
    if (!isResponsibleUser) {
      if (hasEditPermission.isViewOnly === true) {
        setIsButtonDisable(true);
      }
      else {
        setIsButtonDisable(false);
      }
    }
  }, [hasEditPermission, isResponsibleUser])

  useEffect(() => {
    if (isSuccessUpdateSupplierInActiveStatus && updateSupplierInActiveStatusData) {
      ToastService.success(updateSupplierInActiveStatusData.errorMessage);
      handleToggleModal()
    }
  }, [isSuccessUpdateSupplierInActiveStatus, updateSupplierInActiveStatusData]);

  useEffect(() => {
    if (isSuccessUpdateSupplierStatus && updateSupplierStatusData) {
      ToastService.success(updateSupplierStatusData.errorMessage);
      handleToggleModal()
    }
  }, [isSuccessUpdateSupplierStatus, updateSupplierStatusData]);

  useEffect(() => {
    if (supplierData) {
      const statusId = supplierData.statusId;
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

      setSelectedStatus(StatusValue[statusId - 1].label);
    }
  }, [supplierData]);

  useEffect(() => {
    if (supplierData) {
      setSelectedStatus(supplierData.status);
      setRUserValue(supplierData.responsibleUserName);
      getAllUser();
    }
  }, [supplierData]);

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
      ownerId: supplierId,
      OwnerType: OwnerType.Supplier,
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

  const handleStatusChange = (selectedOption) => {
    setStaticId(selectedOption.value)
    setStatusFeild(selectedOption.label)
    if (selectedOption.label === supplierData.status) {
      ToastService.warning("You can't change the status of the customer to currect customer status.");
    } else {
      if (selectedOption.value === "1" || selectedOption.value === "2") {
        confirm(
          "Warning?",
          `Are you sure you want to change the supplier status to ${selectedOption.label}?`,
          "Yes",
          "Cancel"
        ).then((confirmed) => {
          if (confirmed) {
            let req = {
              supplierId: supplierId,
              statusId: selectedOption.value
            }
            updateSupplierStatus(req)
            setSelectedStatus(selectedOption.value);
          }
        });
      } else if (selectedOption.value === "4" || selectedOption.value === "5" || selectedOption.value === "6" || selectedOption.value === "7") {
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      } else if (selectedOption.value === "3") {
        if (childRef.current) {
          childRef.current.callChildFunction(supplierId);
        }
        setStatusId(selectedOption.value);
      }
    }
  };

  const updateCustomerApproval = () => {
    setSelectedStatus(statusId);
    let req = {
      supplierId: supplierId,
      statusId: statusId
    }
    updateSupplierStatus(req)
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
        supplierId: supplierId,
        statusId: staticId
      }
      updateSupplierInActiveStatus(req)
    }
  }

  const handleToggleModal = () => {
    setShowModal(false);
    onReset()
    onhandleRepeatCall()
    setSelectedStatus(supplierData.status)
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
    <>{!isLoading ?
      <div className="basic-customer-detail" >
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="profile-info">
            <div className="profile-icon-desc">
              <div className="d-flex align-items-center">
                <div className="profile-icon"> {supplierData?.name ? supplierData?.name.charAt(0).toUpperCase() : ""}</div>
                <h5>{supplierData?.name}</h5>
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
                isDisabled={isResponsibleUser ? true : isButtonDisable}
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
            <a className="email-link" href={`mailto:${supplierData?.emailAddress}`}>
              <div className="info-desc">{supplierData?.emailAddress}</div>
            </a>
            <span className="copy-icon" onClick={() => CopyText(supplierData?.emailAddress, 'email')}>
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>

          </div>
          <div className="field-desc">
            <div className="inf-label">Website</div>
            <b>&nbsp;:&nbsp;</b>

            <div className="info-desc">{supplierData?.website}</div>

            <span className="copy-icon" onClick={() => CopyText(supplierData?.website, 'website')}>
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>

          </div>

          <div className="field-desc">
            <div className="inf-label">Country</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{supplierData?.countryName}</div>
          </div>

          <div className="field-desc">
            <div className="inf-label">Group Type</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{supplierData?.groupType}</div>
          </div>

          <div className="field-desc">
            <div className="inf-label">Territory</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{supplierData?.territory}</div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Tax Id</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{supplierData?.taxId ? supplierData?.taxId : ErrorMessage.NotAvailabe}</div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Supplier Type</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{supplierData?.supplierType}</div>
          </div>
          {/* <div className="field-desc">
            <div className="inf-label">Is Company</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">
              {supplierData?.isCompany}
              {supplierData && supplierData.isCompany ? <i className="fa fa-check green-color"></i> : <i className="fa fa-times red-color"></i>}
            </div>
          </div> */}
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
      </div>
      : <DataLoader />}
      <SupplierApproval childRef={childRef} isDetailPage={true} updateApproval={updateCustomerApproval} />
    </>
  );
}

export default SupplierBasicInfoCard