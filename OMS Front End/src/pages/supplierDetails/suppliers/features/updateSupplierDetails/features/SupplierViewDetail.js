import React, { useEffect, useRef, useState } from 'react'
import { useUpdateSupplierInActiveStatusMutation, useUpdateSupplierStatusMutation } from '../../../../../../app/services/supplierAPI';
import { reasonData } from '../../../../../customerDetail/customers/config/CustomerData';
import SwalAlert from '../../../../../../services/swalService/SwalService';
import ToastService from '../../../../../../services/toastService/ToastService';
import { StaticStatus, StatusValue } from '../../../../../../common/features/Enums/StatusEnums';
import Image from '../../../../../../components/image/Image';
import { AppIcons } from '../../../../../../data/appIcons';
import DropDown from '../../../../../../components/ui/dropdown/DropDrown';
import CopyText from '../../../../../../utils/CopyText/CopyText';
import FormCreator from '../../../../../../components/Forms/FormCreator';
import Buttons from '../../../../../../components/ui/button/Buttons';
import DataLoader from '../../../../../../components/ui/dataLoader/DataLoader';
import CenterModel from '../../../../../../components/ui/centerModel/CenterModel';

const SupplierViewDetail = ({ editClick, supplierData, isLoading, supplierId , onhandleRepeatCall}) => {
  const reasonRef = useRef();
  const { confirm } = SwalAlert();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState(reasonData);
  const [showModal, setShowModal] = useState(false);
  const [staticId, setStaticId] = useState("")
  const [statusFeild, setStatusFeild] = useState("")
  const [options, setOptions] = useState([]);

  const [updateSupplierStatus, { isSuccess: isSuccessUpdateSupplierStatus, data: updateSupplierStatusData }] = useUpdateSupplierStatusMutation();
  const [updateSupplierInActiveStatus, { isLoading: updateCustomerInActiveStatusCustomerLoading, isSuccess: isSuccessUpdateSupplierInActiveStatus, data: updateSupplierInActiveStatusData }] = useUpdateSupplierInActiveStatusMutation();

  useEffect(() => {
    if (isSuccessUpdateSupplierInActiveStatus && updateSupplierInActiveStatusData) {
      ToastService.success(updateSupplierInActiveStatusData.errorMessage);
      handleToggleModal()
    }
  }, [isSuccessUpdateSupplierInActiveStatus, updateSupplierInActiveStatusData]);

  useEffect(() => {
    if (isSuccessUpdateSupplierStatus && updateSupplierStatusData) {
      ToastService.success(updateSupplierStatusData.errorMessage);
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
        case 5:
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
    }
  }, [supplierData]);

  const handleStatusChange = (selectedOption) => {
    setStaticId(selectedOption.value)
    setStatusFeild(selectedOption.label)
    if (selectedOption.label === supplierData.status) {
      ToastService.warning("You can't change the status of the customer to currect customer status.");
    } else {
      if (selectedOption.value === "1" || selectedOption.value === "2" || selectedOption.value === "3" ) {
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
      } else if (selectedOption.value === "4" || selectedOption.value === "5" || selectedOption.value === "6" || selectedOption.value === "7" ) {
        setShowModal(true);
        setSelectedStatus(selectedOption.value);
      }
    }
  };

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
          return "badge-gradient-Blocked";
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
            <div className="inf-label">Status</div>
            <b>&nbsp;:&nbsp;</b>
            <div className={`status-dropdown ${getStatusClass()}`}>
              <DropDown
                options={options}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Select Status"
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
            <div className="info-desc">{supplierData?.taxId}</div>
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
            modalTitle={statusFeild + " " + "Reason"}
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
      : <DataLoader />
  );
}

export default SupplierViewDetail