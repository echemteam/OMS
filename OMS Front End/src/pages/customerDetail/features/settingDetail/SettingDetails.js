import React, { useRef } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import FormCreator from "../../../../components/Forms/FormCreator";
import { SettingFormData } from "./config/SettingData";
import Buttons from "../../../../components/ui/button/Buttons";
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
          <FinancialSettings />
        {/* </div> */}
      </CardSection>
    </>
  );
};

export default SettingDetails;
