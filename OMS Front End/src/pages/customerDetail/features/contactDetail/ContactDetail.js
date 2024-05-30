import React, { useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import ContactDetailForm from "./component/ContactDetailForm";
import ContactCard from "./component/ContactCard";

const ContactDetail = () => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  return (
    <>
      <CardSection
        cardTitle="Contact Details"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add New Contact"
        titleButtonClick={handleToggleModal}
      >
        <ContactCard isAddEditModal={handleToggleModal}/>

      </CardSection>
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-45"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <ContactDetailForm onSidebarClose={onSidebarClose} />
        </SidebarModel>
      </div>
    </>
  );
};

export default ContactDetail;
