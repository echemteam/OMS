import React, { useState, useEffect } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import ContactDetailForm from "./component/ContactDetailForm";
import ContactCard from "./component/ContactCard";
import { useLazyGetAllContactTypesQuery } from "../../../../app/services/contactAPI";
import { contactDetailFormData } from "./component/ContactDetailForm.data";

const ContactDetail = () => {
  const [isModelOpen, setisModelOpen] = useState(false);

  const [getAllContactTypes, {
    isFetching: isGetAllContactTypesFetching,
    isSuccess: isGetAllContactTypesSucess,
    data: allGetAllContactTypesData
  },] = useLazyGetAllContactTypesQuery();

  useEffect(() => {
    getAllContactTypes()
  }, [])

  useEffect(() => {
    if (!isGetAllContactTypesFetching && isGetAllContactTypesSucess && allGetAllContactTypesData) {
      const getData = allGetAllContactTypesData.map(item => ({
        value: item.contactTypeId,
        label: item.type
      }))
      const dropdownField = contactDetailFormData.formFields.find(item => item.dataField === "type");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllContactTypesFetching, isGetAllContactTypesSucess, allGetAllContactTypesData])

  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };

  return (
    <>
      <CardSection
        cardTitle="Contact"
        buttonClassName="danger-btn"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <ContactCard isAddEditModal={handleToggleModal} />

      </CardSection>
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-55"
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
