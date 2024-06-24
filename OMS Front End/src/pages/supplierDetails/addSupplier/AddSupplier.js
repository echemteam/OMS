import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardSection from "../../../components/ui/card/CardSection";
import Image from "../../../components/image/Image";
import { AppIcons } from "../../../data/appIcons";
import AddSupplierContext from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import SupplierBasicDetail from "./features/supplierBasicDetail/SupplierBasicDetail";
import SupplierAddressDetail from "./features/supplierAddressDetail/SupplierAddressDetail";
import SupplierContactDetail from "./features/supplierContactDetail/SupplierContactDetail";
import SupplierDocumentDetail from "./features/supplierDocumentDetail/SupplierDocumentDetail";
import { TabEnum } from "../../../common/features/Enums/TabsEnums";


const AddSupplier = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, movePreviewPage, addSupplier, supplierId } = useContext(AddSupplierContext);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const tabContent = [
    {
      label: "Basic Information",
      subLabel: "Enter Supplier Basic information",
      content: <SupplierBasicDetail />,
      tab: TabEnum.BasicInformation
    },
    {
      label: "Address",
      subLabel: "Enter Supplier Address Details",
      content: <SupplierAddressDetail />,
      tab: TabEnum.Address
    },
    {
      label: "Contact",
      subLabel: "Enter Supplier Contact Details",
      content: <SupplierContactDetail isEditablePage={false}/>,
      tab: TabEnum.Contact
    },
    {
      label: "Documents",
      subLabel: "Add Supplier Documents Details",
      content: <SupplierDocumentDetail />,
      tab: TabEnum.Documents
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleSubmit = () => {
    navigate('/Suppliers');
  };

  return (
    <>
      <div className="stepper-card">
        <CardSection>
          <div className="stepper-section">
            <div className="stepper-header">
              {tabContent.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`step ${activeTab === index ? 'active' : ''}`}
                  >
                    <button className="step-button"
                      onClick={() => handleTabClick(index)}
                    >
                      <span className="stepper-box">{index + 1}</span>
                      <span className="stepper-label">
                        <span>{step.label}</span>
                        <span className="small-txt">{step.subLabel}</span>
                      </span>
                    </button>
                  </div>
                  {index < tabContent.length - 1 && (
                    <div className="right-arrow">
                      <Image imagePath={AppIcons.arrowIcon} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="stepper-content">
              <form onSubmit={onSubmit}>
                {tabContent.map((step, index) => (
                  <div key={index}
                    className={`content ${activeTab === index ? 'active' : ''}`}
                  >
                    <div className="row">
                      <div className="col-12 mx-auto">
                        {step.content}
                        <div className="d-flex justify-content-end">
                          {index > 0 && (
                            <button type="button" className="btn dark-btn mr-3"
                              onClick={movePreviewPage}
                            >
                              Back
                            </button>
                          )}
                          {index < tabContent.length - 1 ? (
                            <button
                              type="button"
                              className="btn theme-button"
                              onClick={() => addSupplier(step.tab)}
                            >
                              Next
                            </button>
                          ) : (
                            <button type="submit" className="btn theme-button"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </CardSection>
      </div>
    </>
  );


};

export default AddSupplier;
