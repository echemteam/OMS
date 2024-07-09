import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import SupplierList from "./features/SupplierList";
import InActiveSupplier from "./features/InActiveSupplier";
import { AllCustomerGridConfig, ApprovedCustomerGridConfig, PendingCustomerGridConfig, RejectedCustomerGridConfig, SubmittedCustomerGridConfig } from "../../customerDetail/customers/config/CustomerData";
import SupplierListContext from '../../../utils/ContextAPIs/Supplier/SupplierListContext'
import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { ListShowCustomer } from "../../../utils/Enums/enums";
import { StatusEnums } from "../../../utils/Enums/StatusEnums";

const Suppliers = () => {
  const [activeTab, setActiveTab] = useState("0");
  const supplierListRef = useRef();
  const [allManageData, setAllManageData] = useState(AllCustomerGridConfig);
  const [pendingManageData, setPendingManageData] = useState(PendingCustomerGridConfig);
  const [submittedManageData, setSubmittedManageData] = useState(SubmittedCustomerGridConfig);
  const [approvedManageData, setApprovedManageData] = useState(ApprovedCustomerGridConfig);
  const [rejectedCManageData, setRejectedCManageData] = useState(RejectedCustomerGridConfig);


  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (supplierListRef.current) {
      supplierListRef.current.getListApi();
    }
  };

  useEffect(() => {
    const updateManageData = () => {
      switch (activeTab) {
        case "0":
          setAllManageData({
            ...AllCustomerGridConfig,
            columns: AllCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "1":
          setPendingManageData({
            ...PendingCustomerGridConfig,
            columns: PendingCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "2":
          setSubmittedManageData({
            ...SubmittedCustomerGridConfig,
            columns: SubmittedCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "3":
          setApprovedManageData({
            ...ApprovedCustomerGridConfig,
            columns: ApprovedCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "4":
          setAllManageData({
            columns: []
          });
          break;
        case "5":
          setRejectedCManageData({
            ...RejectedCustomerGridConfig,
            columns: RejectedCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        default:
          setAllManageData(AllCustomerGridConfig);
      }
    };

    updateManageData(); // Initial update based on activeTab
    getListApi(); // Fetch data based on activeTab (if needed)
  }, [activeTab]);

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.ALL} configFile={allManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "PENDING",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.Pending} configFile={pendingManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "SUBMITTED",
      component: (
        <div className="mt-2 customer-list-submitted customer-list-all">
          <SupplierList statusId={StatusEnums.Submitted} configFile={submittedManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "APPROVED",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.Approved} configFile={approvedManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2 inactive-list-sec">
          <InActiveSupplier statusId={[StatusEnums.Freeze, StatusEnums.Block, StatusEnums.Disable]} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "REJECTED",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.Reject} configFile={rejectedCManageData} />
        </div>
      ),
    },
  ];
  return (
    <>
      <AddSupplierContextProvider>
        <SupplierListContext.Provider value={{ supplierListRef }}>
          <div className="main-customer-grid">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
                <CardSection
                // cardTitle="Other Information"
                >
                  <>
                    {tabs && tabs.length > 0 &&
                      <div className="row">
                        <div className="col-12">
                          <div className="tab-section mb-0">
                            <div className="tab-header">
                              {tabs && tabs.map((tab, index) => (
                                <button
                                  key={index}
                                  className={activeTab === index.toString() ? "active" : ""}
                                  onClick={() => handleTabClick(index, tab.sPage)}
                                >
                                  {tab.sMenuItemCaption}
                                </button>
                              ))}
                            </div>
                            {activeTab !== -1 && tabs[activeTab].component && (
                              <div className="tab-content">
                                <div className="tab-body-section">
                                  {tabs[activeTab].component}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    }
                  </>
                </CardSection>
              </div>
            </div>
          </div>
        </SupplierListContext.Provider>
      </AddSupplierContextProvider>
    </>
  );
};

export default Suppliers;
