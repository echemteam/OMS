import React, { useState, useEffect, useContext, useRef } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../data/appIcons";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import ContactDetailForm from "./AddEditContact";
import { useLazyGetAllContactTypesQuery, useLazyGetContactByCustomerIdQuery } from "../../../../../app/services/contactAPI";
import ManageContactList from "./ManageContactList";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import AddEditContact from "./AddEditContact";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { transformData } from "../../../../../components/Accordions/AccordionsTransformData";

const ContactDetail = () => {

  const childRef = useRef();
  const { customerId } = useContext(BasicDetailContext);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [getContactData, setGetContactData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [modifyContactData, setModifyContactData] = useState([]);
  const [editFormData, setEditFormData] = useState(contactDetailFormData.initialState);

  const [GetContactList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetContactData }] = useLazyGetContactByCustomerIdQuery();
  const [getAllContactTypes, { isFetching: isGetAllContactTypesFetching, isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData }] = useLazyGetAllContactTypesQuery();

  useEffect(() => {
    getAllContactTypes();
    GetContactList(15);
  }, []);

  useEffect(() => {
    if (!isGetContactFetching && isGetContactSucess && isGetContactData) {
      setGetContactData(isGetContactData);
      const modifyData = transformData(isGetContactData);
      setModifyContactData(modifyData)
    }
  }, [isGetContactFetching, isGetContactSucess, isGetContactData])

  useEffect(() => {
    if (!isGetAllContactTypesFetching && isGetAllContactTypesSucess && allGetAllContactTypesData) {
      const getData = allGetAllContactTypesData.map(item => ({
        value: item.contactTypeId,
        label: item.type
      }))
      const dropdownField = contactDetailFormData.formFields.find(item => item.dataField === "contactTypeId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllContactTypesFetching, isGetAllContactTypesSucess, allGetAllContactTypesData])


  const handleToggleModal = () => {
    setisModelOpen(true);
    setIsEdit(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const handleEdit = (data) => {
    setEditFormData(data);
    setIsEdit(true);
    setisModelOpen(!isModelOpen);
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  //** Success */
  const onSuccess = () => {
    GetContactList(15);
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
        titleButtonClick={handleToggleModal}>
        <ManageContactList handleEdit={handleEdit} modifyContactData={modifyContactData} />
      </CardSection>
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-55"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}>
          <AddEditContact onSidebarClose={onSidebarClose} onSuccess={onSuccess} childRef={childRef} isEdit={isEdit} editFormData={editFormData}
            modifyContactData={getContactData} />
        </SidebarModel>
      </div>
    </>
  );
};

export default ContactDetail;
