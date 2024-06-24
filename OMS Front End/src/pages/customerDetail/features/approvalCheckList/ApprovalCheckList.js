import React, { useState } from "react";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import Checkbox from "../../../../components/ui/inputs/checkBox/CheckBox";
import Buttons from "../../../../components/ui/button/Buttons";

const ApprovalCheckList = ({ isModelOpen, onSidebarClose }) => {
  const [checkData, setCheckData] = useState([
    {
      mainTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      mainChecked: false,
      subChecks: [
        {
          label: "It is a long established fact that a reader will be",
          checked: true,
        },
        {
          label: "Contrary to popular belief, Lorem Ipsum is not s",
          checked: false,
        },
        {
          label:
            "There are many variations of passages of Lorem Ipsum available",
          checked: false,
        },
        {
          label:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
          checked: false,
        },
      ],
    },
    {
      mainTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      mainChecked: false,
      subChecks: [
        {
          label: "It is a long established fact that a reader will be",
          checked: true,
        },
        {
          label: "Contrary to popular belief, Lorem Ipsum is not s",
          checked: false,
        },
        {
          label:
            "There are many variations of passages of Lorem Ipsum available",
          checked: false,
        },
        {
          label:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
          checked: false,
        },
      ],
    },
    {
      mainTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      mainChecked: false,
      subChecks: [
        {
          label: "It is a long established fact that a reader will be",
          checked: true,
        },
        {
          label:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
          checked: false,
        },
      ],
    },
    
  ]);
  const handleMainCheckChange = (index) => {
    const newCheckData = [...checkData];
    newCheckData[index].mainChecked = !newCheckData[index].mainChecked;
    setCheckData(newCheckData);
  };

  const handleSubCheckChange = (mainIndex, subIndex) => {
    const newCheckData = [...checkData];
    newCheckData[mainIndex].subChecks[subIndex].checked =
      !newCheckData[mainIndex].subChecks[subIndex].checked;
    setCheckData(newCheckData);
  };
  return (
    <div>
      <SidebarModel
        modalTitle="Approval Check List"
        contentClass="content-40 basic-info-model"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <>
          {checkData.map((mainCheck, mainIndex) => (
            <div className="checklist-section">
              <div className="row mt-3" key={mainIndex}>
                <div className="col-12 main-check-title">
                  <Checkbox
                    label={mainCheck.mainTitle}
                    checked={mainCheck.mainChecked}
                    onChange={() => handleMainCheckChange(mainIndex)}
                  />
                </div>
                <div className="col-12">
                  <div className="sub-checklist">
                    <div className="row">
                      {mainCheck.subChecks.map((subCheck, subIndex) => (
                        <div className="col-12 sub-check-list" key={subIndex}>
                          <Checkbox
                            label={subCheck.label}
                            checked={subCheck.checked}
                            onChange={() =>
                              handleSubCheckChange(mainIndex, subIndex)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-md-12 my-3 mt-4">
              <div className="d-flex align-item-end justify-content-end">
                <div className="d-flex align-item-end">
                  <Buttons
                    buttonTypeClassName="theme-button"
                    buttonText="Approve"
                    // isLoading={isAddEditLoading}
                    // onClick={handleAddEdit}
                    // isDisable={isButtonDisable}
                  />
                  <Buttons
                    buttonTypeClassName="dark-btn ml-5"
                    buttonText="Cancel"
                    onClick={onSidebarClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </SidebarModel>
    </div>
  );
};

export default ApprovalCheckList;
