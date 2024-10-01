/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardSection from "../../../../components/ui/card/CardSection";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { useUpdateSupplierStatusMutation } from "../../../../app/services/supplierAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { CustomerSupplierTabEnum } from "../../../../utils/Enums/commonEnums";
import { StatusEnums } from "../../../../utils/Enums/StatusEnums";
import SupplierBasicDetail from "../../feature/supplierBasicDetail/SupplierBasicDetail";
import SuplierAddressDetails from "../../feature/supplierAddressDetail/SupplierAddressDetails";
import SupplierContactDetail from "../../feature/supplierContactDetail/SupplierContactDetail";
import SupplierDocumentDetail from "../../feature/supplierDocumentDetail/SupplierDocumentDetail";
import Iconify from "../../../../components/ui/iconify/Iconify";
import FinancialSettings from "../../feature/financialSettings/FinancialSettings";
import SupplierApproval from "../../feature/supplierApproval/SupplierApproval";
import { useRef } from "react";

const AddSupplierTab = () => {

  const childRef = useRef();
  const navigate = useNavigate();
  const { activeTab, movePreviewPage, addSupplier, supplierId } =
    useContext(AddSupplierContext);

  const [
    updateSupplierStatus,
    {
      isSuccess: isSuccessUpdateSupplierStatus,
      data: updateSupplierStatusData,
    },
  ] = useUpdateSupplierStatusMutation();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const tabContent = [
    {
      label: "Basic Information",
      // subLabel: "Enter Supplier Basic information",
      content: <SupplierBasicDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.BasicInformation,
    },
    {
      label: "Address",
      // subLabel: "Enter Supplier Address Details",
      content: <SuplierAddressDetails isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.Address,
    },
    {
      label: "Contact",
      // subLabel: "Enter Supplier Contact Details",
      content: (
        <SupplierContactDetail
          isEditablePage={false}
          isSearchFilterShow={false}
        />
      ),
      tab: CustomerSupplierTabEnum.Contact,
    },
    {
      label: "Financial Setting",
      // subLabel: "Enter Financial Setting Details",
      content: <FinancialSettings isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.Setting
    },
    {
      label: "Documents",
      // subLabel: "Add Supplier Documents Details",
      content: <SupplierDocumentDetail isEditablePage={true} />,
      tab: CustomerSupplierTabEnum.Documents,
    },
  ];

  useEffect(() => {
    if (isSuccessUpdateSupplierStatus && updateSupplierStatusData) {
      ToastService.success(updateSupplierStatusData.errorMessage);
      navigate("/Suppliers");
    }
  }, [isSuccessUpdateSupplierStatus, updateSupplierStatusData]);

  const handleSubmit = () => {
    if (childRef.current) {
      childRef.current.callChildFunction(
        supplierId,
        false
      );
    }
  };

  const updateSubmitStatus = () => {
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
      <div className="stepper-card stepper-view">
        <CardSection>
          <div className="stepper-section">
            <div className="stepper-header">
              {tabContent.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`step ${activeTab === index ? "active" : ""}`}
                  >
                    <button className="step-button">
                      <span className="stepper-box">{index + 1}</span>
                      <span className="stepper-label">
                        <span>{step.label}</span>
                        <span className="small-txt">{step.subLabel}</span>
                      </span>
                    </button>
                  </div>
                  {index < tabContent.length - 1 && (
                    <div className="right-arrow">
                      <Iconify icon="solar:alt-arrow-down-outline" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="stepper-content stepper-view-supplier">
              <form onSubmit={onSubmit}>
                {tabContent.map((step, index) => (
                  <div
                    key={index}
                    className={`content ${activeTab === index ? "active" : ""}`}
                  >
                    <div className="row">
                      <div className="col-12 mx-auto ">
                        {step.content}
                        <div className="d-flex justify-content-end mt-2">
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn dark-btn mr-3 btn-prev"
                              onClick={movePreviewPage}
                            >
                              <Image imagePath={AppIcons.nextArrowIcon} /> Back
                            </button>
                          )}
                          {index < tabContent.length - 1 ? (
                            <button
                              type="button"
                              className="btn theme-button btn-next ml-3"
                              onClick={() => {
                                addSupplier(step.tab);
                              }}
                            >
                              Next <Image imagePath={AppIcons.nextArrowIcon} />
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
        <SupplierApproval childRef={childRef} isDetailPage={true} isAddPagePage={true} updateApproval={updateSubmitStatus} />
      </div>
    </>
  );
};

export default AddSupplierTab;
