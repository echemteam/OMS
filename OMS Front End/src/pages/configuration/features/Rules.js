import React, { useState } from "react";
import PropTypes from "prop-types";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../../components/image/Image";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import AddEditRules from "./AddEditRules";

const Rules = ({ rules, selectedRule, onRuleClick }) => {
 
  const [isModelOpen, setisModelOpen] = useState(false);

  const handleToggleModal = () => {
    setisModelOpen(true);
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
  };

  return (
    <>
      <div className="config-card">
        <CardSection
          cardTitle="Rules"
          buttonClassName="btn theme-button"
          rightButton={true}
          buttonText="Add Rules"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          titleButtonClick={handleToggleModal}
        >
          <div className="config-content">
            {rules &&
              rules.map((rule, index) => (
                <div
                  key={index}
                  className={`config-rule-info ${selectedRule === rule ? "selected" : ""
                    }`}
                // onClick={() => onRuleClick(rule)}
                >
                  {/* <div className="profile-icon">
              <i className="fa fa-gavel" aria-hidden="true"></i>
            </div> */}
                  <span>{rule}</span>
                  <div className="edit-icons">
                    <Image
                      imagePath={AppIcons.editThemeIcon}
                      altText="Website Icon"
                    />
                  </div>
                </div>
              ))}
          </div>
        </CardSection>
      </div>
      <SidebarModel
        // modalTitle={updateSetData ? "Update Address" : "Add Address"}
        modalTitle="Add Rule"
        contentClass="content-40"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
       <AddEditRules onClose={onSidebarClose}/>
      </SidebarModel>
    </>
  );
};

Rules.propTypes = {
  rules: PropTypes.array,
  selectedRule: PropTypes.string,
  onRuleClick: PropTypes.func.isRequired,
};

export default Rules;
