import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import OrderHistory from "./feature/OrderHistory";
import { useLazyGetOrderHistoryByOrderIdQuery } from "../../../../../app/services/orderAPI";

const OrderAction = ({orderId}) => {
  const [showModal, setShowModal] = useState(false);
  const [historyList,setHistortyList]=useState([]);

  const [
    getOrderHistory,
    {
      isFetching: isGetOrderHistoryByOrderIdFetching,
      isSuccess: isGetOrderHistoryByOrderIdSuccess,
      data: isGetOrderHistoryByOrderIdData,
    },
  ] = useLazyGetOrderHistoryByOrderIdQuery();

  useEffect(() => { 
    if (!isGetOrderHistoryByOrderIdFetching && isGetOrderHistoryByOrderIdSuccess && isGetOrderHistoryByOrderIdData) {
      if(isGetOrderHistoryByOrderIdData){
        setHistortyList(isGetOrderHistoryByOrderIdData);
      }
    }
  }, [isGetOrderHistoryByOrderIdFetching, isGetOrderHistoryByOrderIdSuccess, isGetOrderHistoryByOrderIdData]);

  const handleToggleHistoryModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      getOrderHistory(orderId);
    }
  };

  return (
    <>
      <div className="order-action-sec">
        <CardSection
          cardTitle="Order Items"
          rightButton={true}
          buttonClassName="outline-theme-btn"
          isIcon={true}
          iconClass="iconamoon:history-bold"
          multipleButton={true}
          isTooltip={true}
          tootipText="History"
          titleButtonClick={handleToggleHistoryModal}
          rightButtonArray={[
            {
              isIcon: true,
              buttonTypeClassName: "outline-theme-btn",
              iconClass: "fluent-mdl2:activate-orders",
              isTooltip: true,
              tootipText: "Original PO",
            },
            {
              isIcon: true,
              buttonTypeClassName: "outline-theme-btn",
              iconClass: "icon-park-outline:transaction-order",
              isTooltip: true,
              tootipText: "Price List",
            },
            {
              isIcon: true,
              buttonTypeClassName: "outline-theme-btn",
              iconClass: "fluent-mdl2:chart",
              isTooltip: true,
              tootipText: "Order Status",
            },
          ]}
        ></CardSection>
      </div>
      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleHistoryModal}
        modalTitle="History"
        modelSizeClass="w-55"
      >
        <OrderHistory historyList={historyList}/>
      </CenterModel>
    </>
  );
};

export default OrderAction;
