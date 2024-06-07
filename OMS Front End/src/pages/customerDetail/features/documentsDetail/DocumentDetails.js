import React from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import AddEditDocuments from "./features/AddEditDocuments";
import "./DocumentDetails.scss"

const DocumentDetails = () => {
  return (
    <div className="document-section">
      <CardSection
        cardTitle="Attachments"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        // titleButtonClick={handleToggleModal}
      >
        <div className="">
        <AddEditDocuments />
        </div>
      </CardSection>
    </div>
  );
};

export default DocumentDetails;
