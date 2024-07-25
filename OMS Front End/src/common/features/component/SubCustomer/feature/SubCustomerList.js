/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import MolGrid from "../../../../../components/Grid/MolGrid";
import { SubCustomerGridConfig } from "../config/SubCustomer.data";
import ToastService from "../../../../../services/toastService/ToastService";
import SwalAlert from "../../../../../services/swalService/SwalService";
import { useImperativeHandle } from "react";
import { encryptUrlData } from "../../../../../services/CryptoService";
import { useDeleteSubCustomerMutation, useGetSubCustomerByCustomerIdMutation } from "../../../../../app/services/customerSubCustomerAPI";
import PropTypes from 'prop-types';

const SubCustomerList = (props) => {
  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const { confirm } = SwalAlert();
  const [getSubCustomerByCustomerId, { isLoading: isGetSubCustomerByCustomerIdLoading, isSuccess: isGetSubCustomerByCustomerIdSuccess, data: isGetSubCustomerByCustomerIdData },] = useGetSubCustomerByCustomerIdMutation();
  const [deleteSubCustomer, { isSuccess: isDeleteSubCustomerSuccess, data: isDeleteSubCustomerData },] = useDeleteSubCustomerMutation();
  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      customerId: props.customerId,
    };
    getSubCustomerByCustomerId(request);
  };

  const handlePageChange = (page) => {
    getLists(page, molGridRef.current.generateSortingString());
  };
  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  }
  const onGetData = () => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject, molGridRef.current.generateSortingString());
    }
  }

  useEffect(() => {
    if (isDeleteSubCustomerSuccess && isDeleteSubCustomerData) {
      ToastService.success(isDeleteSubCustomerData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      handlePageChange(currentPageObject);
      props.onGetLinkCustomer();
    }
  }, [isDeleteSubCustomerSuccess, isDeleteSubCustomerData]);

  const handleDeleteClick = (data) => {

    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel")
      .then((confirmed) => {
        if (confirmed) {
          deleteSubCustomer(data.subCustomerMainCustomerId);
        }
      });
  };

  useEffect(() => {
    onGetData()
  }, []);

  useEffect(() => {
    if (isGetSubCustomerByCustomerIdSuccess && isGetSubCustomerByCustomerIdData) {

      if (isGetSubCustomerByCustomerIdData) {
        setListData(isGetSubCustomerByCustomerIdData.dataSource);
      }
      if (isGetSubCustomerByCustomerIdData.totalRecord) {
        setTotalRowCount(isGetSubCustomerByCustomerIdData.totalRecord);
      }
    }
  }, [isGetSubCustomerByCustomerIdSuccess, isGetSubCustomerByCustomerIdData]);


  const handleViewClick = (data) => {
    window.open(`/CustomerDetails/${encryptUrlData(data.subCustomerId)}`, '_blank');
  };
  const actionHandler = {
    VIEWCUSTOMER: handleViewClick,
    DELETE: handleDeleteClick,
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onGetData
  }));
  return (
    <>
      <div className="row">
        <div className="col-md-12 table-striped p-3">
          <MolGrid
            ref={molGridRef}
            configuration={SubCustomerGridConfig}
            dataSource={listData}
            allowPagination={true}
            pagination={{
              totalCount: totalRowCount,
              pageSize: 20,
              currentPage: 1,
            }}
            onPageChange={handlePageChange}
            onSorting={handleSorting}
            isLoading={isGetSubCustomerByCustomerIdLoading}
            onActionChange={actionHandler}
          />
        </div>
      </div>
    </>
  );
};
SubCustomerList.propTypes = {
  customerId: PropTypes.number.isRequired,
  onGetLinkCustomer: PropTypes.func.isRequired,
  childRef: PropTypes.object
};
export default SubCustomerList;
