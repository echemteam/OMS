import React from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import FinancialSettings from "./features/FinancialSettings";

const SettingDetails = () => {
  return (
    <>
      <CardSection
        cardTitle="Financial Settings"
        buttonClassName="invisible"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        // titleButtonClick={handleToggleModal}
      >
        {/* <div className="border-b pb-4"> */}
        <div className="mt-3">
          <FinancialSettings />
        </div>
        {/* </div> */}
      </CardSection>
    </>
  );
};

export default SettingDetails;
