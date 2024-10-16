/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/** Common Components */
import CardSection from "../../../../components/ui/card/CardSection";
import FinalMolGrid from "../../../../components/FinalMolGrid/FinalMolGrid";

/** Common Services & Data files */
import { AppIcons } from "../../../../data/appIcons";
import { encryptUrlData } from "../../../../services/CryptoService";

/** Configuration files */
import { orderListMolGridConfig } from "../../feature/orderListDetail/config/OrderListConfig";
/** RTK Query */
import { useDeleteOrderMutation, useGetOrdersMutation } from "../../../../app/services/orderAPI";

/** CSS Files */
import "../../Order.scss";
import useDebounce from "../../../../app/customHooks/useDebouce";
import ToastService from "../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../data/appMessages";
import SwalAlert from "../../../../services/swalService/SwalService";
import KeyCodes from "../../../../utils/Enums/KeyCodesEnums";

const Orders = ({ orderStatusId, orderItemStatusId, orderSubStatusId }) => {

  const molGridRef = useRef();
  const navigate = useNavigate();
  const { confirm } = SwalAlert();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [dataSource, setDataSource] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [itemListDataSource, setItemListDataSource] = useState([]);
  const [getOrders, { isLoading: isGetOrderListLoading, isSuccess: isGetOrderListSuccess, data: isGetOrderListData }] = useGetOrdersMutation();
  const [deleteOrder, { isSuccess: isDeleteOrderSuccess, data: isDeleteOrderData }] = useDeleteOrderMutation();
  useEffect(() => {
    onGetData();

  }, [orderStatusId, orderSubStatusId, orderItemStatusId]);

  const handleSearch = () => {
    if (search.length >= 3) {
      onGetData();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage)
    }
  };

  useEffect(() => {
    if (isDeleteOrderSuccess && isDeleteOrderData) {
      ToastService.success(isDeleteOrderData.errorMessage);
      onGetData();
    }
  }, [isDeleteOrderSuccess, isDeleteOrderData]);

  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleKeyPress = (event) => {
    if (event.code === KeyCodes.ENTER) {
      handleSearch();
    }
  }
  const handleClear = () => {
    setSearch("");
  };

  useEffect(() => {
    if (debouncedSearch === "") {
      onGetData();
    }
  }, [debouncedSearch]);


  useEffect(() => {
    if (isGetOrderListSuccess && isGetOrderListData) {

      if (isGetOrderListData) {
        setDataSource(isGetOrderListData.orderList);

        const modifyCustomerData = isGetOrderListData.orderItemList.map((data) => ({
          ...data,
          catalog: data.catalog === "" ? "-" : data.catalog,
          casNumber: data.casNumber === "" ? "-" : data.casNumber,
          itemUnitPrice: data.itemUnitPrice === "" ? "-" : `$${data.itemUnitPrice}`,
          status: data.status === "" ? "-" : data.status,
          deliveryMethod: data.deliveryMethod === "" ? "-" : data.deliveryMethod,
          quantity: data.quantity ? data.quantity : null
        }));
        setItemListDataSource(modifyCustomerData);

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
      filters: { searchText: debouncedSearch },
      sortString: sortingString,
      orderStatusId: orderStatusId,
      orderSubStatusId: orderSubStatusId ? orderSubStatusId : 0,
      orderItemStatusId: orderItemStatusId ? orderItemStatusId : 0,
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

  const handleEditClick = (data) => {
    const orderId = data.orderId;
    navigate(`/OrderDetails/${encryptUrlData(orderId)}`)
  };

  const handleDeleteClick = (data) => {
    confirm("Delete?",
      "Are you sure you want to Delete?",
      "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteOrder(data.orderId);
      }
    });
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
              handleChange={handleChange}
              searchInputName="Search By Order"
              isCardSection={true}
              searchButton={true}
              searchbuttonText="Search"
              buttonClassName="theme-button"
              searchTitleButtonClick={handleSearch}
              clearButton={true}
              clearTitleButtonClick={handleClear}
              clearButtonText="Clear"
              clearButtonClassName="dark-btn"
              searchIconImg={AppIcons.SearchIcone}
              searchTextWithIcon={true}
              clearTextWithIcon={true}
              searchValue={search}
              clearIconImg={AppIcons.ClearIcone}
              handleKeyPress={handleKeyPress}
            >
              <FinalMolGrid
                ref={molGridRef}
                configuration={orderListMolGridConfig}
                childTableDataSource={itemListDataSource}
                dataSource={dataSource}
                // dataSource={collapsibleMolGridData}
                onPageChange={handlePageChange}
                isLoading={isGetOrderListLoading}
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
