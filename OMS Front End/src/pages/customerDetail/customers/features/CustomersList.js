import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CardSection from '../../../../components/ui/card/CardSection'
import MolGrid from '../../../../components/Grid/MolGrid';
import { useGetCustomersMutation, useUpdateCustomerApproveStatusMutation, useUpdateCustomerInActiveStatusMutation } from '../../../../app/services/basicdetailAPI';
import CustomerContext from "../../../../utils/ContextAPIs/Customer/CustomerListContext"
import { useNavigate } from 'react-router-dom';
import { encryptUrlData } from '../../../../services/CryptoService';
import ToastService from '../../../../services/toastService/ToastService';
import { reasonData } from '../config/CustomerData';
import CenterModel from '../../../../components/ui/centerModel/CenterModel';
import FormCreator from '../../../../components/Forms/FormCreator';
import Buttons from '../../../../components/ui/button/Buttons';
import { StatusEnums, StatusFeild } from '../../../../common/features/Enums/StatusEnums';
import SwalAlert from '../../../../services/swalService/SwalService';

export const CustomersList = ({ statusId, configFile }) => {
  const navigate = useNavigate();
  const { confirm } = SwalAlert();
  const molGridRef = useRef();
  const reasonRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(reasonData);
  const [customerID, setcustomerId] = useState();
  const [staticId, setStaticId] = useState()
  const [statusFeild, setStatusFeild] = useState()
  const { listRef } = useContext(CustomerContext);

  const [
    getCustomers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetCustomersMutation();

  const [updateCustomerApproveStatus, { isLoading: updateCustomerLoading, isSuccess: isSuccessUpdateCustomer, data: updateCustomerData }] = useUpdateCustomerApproveStatusMutation();

  const [updateCustomerInActiveStatus, { isLoading: updateCustomerInActiveStatusCustomerLoading, isSuccess: isSuccessUpdateCustomerInActiveStatus, data: updateCustomerInActiveStatusData }] = useUpdateCustomerInActiveStatusMutation();

  const handlePageChange = (page) => {
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: "" },
      statusId: statusId
    };
    getCustomers(request);
  };

  useEffect(() => {
    if (isListSuccess && isListeData) {
      if (isListeData) {
        setDataSource(isListeData.dataSource);
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (isSuccessUpdateCustomer && updateCustomerData) {
      ToastService.success(updateCustomerData.errorMessage);
      getListApi()
    }
  }, [isSuccessUpdateCustomer, updateCustomerData]);

  useEffect(() => {
    if (isSuccessUpdateCustomerInActiveStatus && updateCustomerInActiveStatusData) {
      ToastService.success(updateCustomerInActiveStatusData.errorMessage);
      getListApi()
      handleToggleModal()
    }
  }, [isSuccessUpdateCustomerInActiveStatus, updateCustomerInActiveStatusData]);

  useImperativeHandle(listRef, () => ({
    getListApi,
  }));

  const getListApi = () => {
    const currentPageObject = molGridRef.current.getCurrentPageObject();
    const request = {
      pagination: {
        pageNumber: currentPageObject.pageNumber,
        pageSize: currentPageObject.pageSize,
      },
      filters: { searchText: "" },
      statusId: statusId
    };
    getCustomers(request);
  };

  const handleEditClick = (data) => {
    navigate(`/viewCustomer/${encryptUrlData(data.customerId)}`, "_blank");
  };

  const handleGridCheckBoxChange = (rowData, datafield, rowindex, updatedValue, parentData) => {
    confirm(
      "Warning?",
      "Are you sure you want to approve the customer?",
      "Yes",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        let req = {
          customerId: rowData.customerId
        }
        updateCustomerApproveStatus(req)
      } else {
        getListApi()
      }
    });
  }

  const handleToggleModal = () => {
    setShowModal(false);
    onReset()
  };

  const handlefreeze = (data) => {
    setShowModal(true);
    setcustomerId(data.customerId)
    setStaticId(StatusEnums.Freeze)
    setStatusFeild(StatusFeild.Freeze)
  }

  const handleDiseble = (data) => {
    setShowModal(true);
    setcustomerId(data.customerId)
    setStaticId(StatusEnums.Disabled)
    setStatusFeild(StatusFeild.Disabled)
  }

  const handleBlock = (data) => {
    setShowModal(true);
    setcustomerId(data.customerId)
    setStaticId(StatusEnums.Blocked)
    setStatusFeild(StatusFeild.Blocked)
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
        customerId: customerID,
        statusId: staticId
      }
      updateCustomerInActiveStatus(req)
    }
  }

  const actionHandler = {
    EDIT: handleEditClick,
    FREEZE: handlefreeze,
    DISABLE: handleDiseble,
    BLOCKED: handleBlock
  };

  return (
    <div>
      <div className="row">
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
          <CardSection
          >
            <div className="row">
              <div className="col-md-12 table-striped">
                <MolGrid
                  ref={molGridRef}
                  configuration={configFile}
                  dataSource={dataSource}
                  isLoading={isListLoading}
                  pagination={{
                    totalCount: totalRowCount,
                    pageSize: 25,
                    currentPage: 1,
                  }}
                  onPageChange={handlePageChange}
                  onActionChange={actionHandler}
                  allowPagination={true}
                  onCellDataChange={handleGridCheckBoxChange}
                />
              </div>
            </div>
          </CardSection>
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
      </div>
    </div>
  )
}
