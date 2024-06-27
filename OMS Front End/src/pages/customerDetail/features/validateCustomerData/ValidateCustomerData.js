import React from "react";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import Buttons from "../../../../components/ui/button/Buttons";

const ValidateCustomerData = ({ showModal, handleToggleModal }) => {
  const checklistItems = [
    { id: 1, text: "Customer Approval Checklist", rightTick: true },
    {
      id: 2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
      rightTick: false,
    },
    {
      id: 3,
      text: "Printing and typesetting industry. Lorem Ipsum has been the industry's",
      rightTick: true,
    },
    {
      id: 4,
      text: "Industry. Lorem Ipsum has been the industry's",
      rightTick: false,
    },
    {
      id: 5,
      text: "It is a long established fact that a reader will be distracted by the",
      rightTick: true,
    },
    {
      id: 6,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
      rightTick: false,
    },
    // Add more items as needed
  ];
  return (
    <>
      <CenterModel
        modalTitle="Validation Customer Information"
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modelSizeClass="w-40"
      >
        <div className="row">
          <div className="col-12 mt-3">
            <div className="customer-data-sec">
              <div className="validation-list">
                <ul>
                  {checklistItems.map((item) => (
                    <li key={item.id}>
                      <span className="tick-untick-img">
                        <Image
                          imagePath={
                            item.rightTick
                              ? AppIcons.RightTickIcon
                              : AppIcons.UnTickIcon
                          }
                        />
                      </span>
                      <span className="validation-msg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-lg-4">
            <div className="d-flex align-item-end justify-content-end">
              <div className="d-flex align-item-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Save"
                  // isLoading={isAddEditLoading}
                  // onClick={handleAddEdit}
                  // isDisable={isButtonDisable}
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
    </>
  );
};

export default ValidateCustomerData;
