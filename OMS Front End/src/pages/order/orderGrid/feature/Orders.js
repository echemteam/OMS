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
const Orders = () => {
  const molGridRef = useRef();

  const [dataSource, setDataSource] = useState(orderListMolGridData);
  const [gridChildDataSource, setGridChildDataSource] = useState(
    collapsibleChildGridData
  );

  useEffect(() => {
    if (orderListMolGridData) {
      setDataSource(orderListMolGridData);
    }
    if (collapsibleChildGridData) {
      setGridChildDataSource(collapsibleChildGridData);
    }
  }, [orderListMolGridData, collapsibleChildGridData]);

  const handleEditClick = () => {
    alert("EDIT");
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
                allowPagination={true}
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
