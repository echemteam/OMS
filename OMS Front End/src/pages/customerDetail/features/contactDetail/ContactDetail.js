import React from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import ContactCard from "./component/ContactCard";
import { useNavigate } from "react-router-dom";

const ContactDetail = () => {
  const navigate = useNavigate();
  const handleAddEidtClick = (data) => {
    navigate(`/addEditContact`);
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
        titleButtonClick={handleAddEidtClick}
      >
        <ContactCard isAddEditModal={handleAddEidtClick} />
      </CardSection>
    </>
  );
};

export default ContactDetail;
