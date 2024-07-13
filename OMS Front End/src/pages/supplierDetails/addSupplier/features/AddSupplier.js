/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardSection from "../../../../components/ui/card/CardSection";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { useUpdateSupplierStatusMutation } from "../../../../app/services/supplierAPI";
import ToastService from "../../../../services/toastService/ToastService";
import SupplierDocumentDetail from "../../suppliers/features/updateSupplierDetails/features/docuementsDetail/SupplierDocuementDetail";
import { TabEnum } from "../../../../utils/Enums/enums";
import { StatusEnums } from "../../../../utils/Enums/StatusEnums";
import SupplierBasicDetail from "../../feature/supplierBasicDetail/SupplierBasicDetail";
import SuplierAddressDetails from "../../feature/supplierAddressDetail/SupplierAddressDetails";
import SupplierContactDetail from "../../feature/supplierContactDetail/SupplierContactDetail";


const AddSupplier = () => {
  const navigate = useNavigate();
  const { activeTab, movePreviewPage, addSupplier, supplierId } = useContext(AddSupplierContext);

  const [updateSupplierStatus, { isSuccess: isSuccessUpdateSupplierStatus, data: updateSupplierStatusData }] = useUpdateSupplierStatusMutation();

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
      content: <SuplierAddressDetails isEditablePage={false} />,
      tab: TabEnum.Address
    },
    {
      label: "Contact",
      subLabel: "Enter Supplier Contact Details",
      content: <SupplierContactDetail isEditablePage={false} isSearchFilterShow={false} />,
      tab: TabEnum.Contact
    },
    {
      label: "Documents",
      subLabel: "Add Supplier Documents Details",
      content: <SupplierDocumentDetail isEditablePage={false} />,
      tab: TabEnum.Documents
    },
  ];

  useEffect(() => {
    if (isSuccessUpdateSupplierStatus && updateSupplierStatusData) {
      ToastService.success(updateSupplierStatusData.errorMessage);
      navigate("/Suppliers");
    }
  }, [isSuccessUpdateSupplierStatus, updateSupplierStatusData]);

  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  const handleSubmit = () => {
    let req = {
      supplierId: supplierId,
      statusId: StatusEnums.Submitted,
    };
    updateSupplierStatus(req);
  };

  const handleDraft = () => {
    let req = {
      supplierId: supplierId,
      statusId: StatusEnums.Pending,
    };
    updateSupplierStatus(req);
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
                    // onClick={() => handleTabClick(index)}
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
                            <>
                              <button
                                type="submit"
                                className="btn theme-button"
                                onClick={handleDraft}
                              >
                                Save as Draft
                              </button>

                              <button
                                type="submit"
                                className="btn theme-button ml-3"
                                onClick={handleSubmit}
                              >
                                Save as Submit
                              </button>
                            </>
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
