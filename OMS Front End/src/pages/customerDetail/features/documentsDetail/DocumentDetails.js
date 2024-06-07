import React from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import AddEditDocuments from "./features/AddEditDocuments";

const DocumentDetails = () => {
  return (
    <>
      <CardSection
        cardTitle="Attachments"
        buttonClassName="invisible"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        // titleButtonClick={handleToggleModal}
      >
        <div className="mt-3">
        <AddEditDocuments />
        </div>
      </CardSection>
    </>
  );
};

export default DocumentDetails;
