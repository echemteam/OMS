import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import "../../Order.scss";
import FinalMolGrid from "../../../../components/FinalMolGrid/FinalMolGrid";
import { orderListMolGridConfig } from "../../feature/orderListDetail/config/OrderListConfig";
import {
  collapsibleChildGridData,
  orderListMolGridData,
} from "../../feature/orderListDetail/config/OrderList.Data";
import { useNavigate } from "react-router-dom";
import { useGetOrdersMutation } from "../../../../app/services/orderAPI";


const Orders = ({orderStatusId,orderSubStatusId,orderItemStatusId}) => {
  const molGridRef = useRef();
  const navigate=useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
 // const { confirm } = SwalAlert();
  const [gridChildDataSource, setGridChildDataSource] = useState(collapsibleChildGridData);
  const [getOrders,{ isLoading: isGetOrderListLoading, isSuccess: isGetOrderListSuccess, data: isGetOrderListData }] = useGetOrdersMutation();
  
  useEffect(() => {
    onGetData()
  }, [orderStatusId, orderSubStatusId,orderItemStatusId]);

  useEffect(() => {
    if (isGetOrderListSuccess && isGetOrderListData) {
      
      if (isGetOrderListData) {
        setDataSource(isGetOrderListData.dataSource);
       // handleListData(isGetOrderListData.dataSource.length)

      }
      if (isGetOrderListData.totalRecord) {
        setTotalRowCount(isGetOrderListData.totalRecord);
      }
    }
  }, [isGetOrderListSuccess, isGetOrderListData]);
  const getLists = (pageObject, sortingString) => {

    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      orderStatusId: orderStatusId ,
      orderSubStatusId:orderSubStatusId ? orderSubStatusId : 0,
      orderItemStatusId:orderItemStatusId ? orderItemStatusId :0,
    };
    getOrders(request);
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


  // useEffect(() => {
  //   if (orderListMolGridData) {
  //     setDataSource(orderListMolGridData);
  //   }
  //   if (collapsibleChildGridData) {
  //     setGridChildDataSource(collapsibleChildGridData);
  //   }
  // }, [orderListMolGridData, collapsibleChildGridData]);


  const handleEditClick = () => {
    // alert("EDIT");
    navigate("/OrderDetails")
  };

  const handleDeleteClick = () => {
    alert("DELETE");
  };

  const actionHandler = {
    EDIT: handleEditClick,
    DELETE: handleDeleteClick,
  };
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="order-listing">
            <CardSection
              cardTitle="Orders"
              searchInput={true}
              handleChange=""
              searchInputName="Search By Customer Name, Tax Id , Email Address"
              searchFilter=""
              isCardSection={true}
              searchButton={true}
              searchbuttonText="Search"
              buttonClassName="theme-button"
              searchTitleButtonClick=""
              clearButton={true}
              clearTitleButtonClick=""
              clearButtonText="Clear"
              clearButtonClassName="dark-btn"
              searchIconImg={AppIcons.SearchIcone}
              searchTextWithIcon={true}
              clearTextWithIcon={true}
              clearIconImg={AppIcons.ClearIcone}
            >
              <FinalMolGrid
                ref={molGridRef}
                configuration={orderListMolGridConfig}
                childTableDataSource={gridChildDataSource}
                dataSource={dataSource}
                // dataSource={collapsibleMolGridData}
                onPageChange={handlePageChange}
                allowPagination={true}
                onSorting={handleSorting}
                pagination={{
                  totalCount: totalRowCount,
                  pageSize: 20,
                  currentPage: 1,
                }}
                onActionChange={actionHandler}
                
              />
            </CardSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
