import React, { useState, useEffect, useContext, useRef } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import CardSection from "../../../../../components/ui/card/CardSection";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import { contactTransformData } from "../../../../../components/Accordions/AccordionsTransformData";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import { useLazyGetAllContactTypesQuery, useLazyGetContactByCustomerIdQuery } from "../../../../../app/services/contactAPI";
//** Component's */
const AddEditContact = React.lazy(() => import("./AddEditContact"));
const ManageContactList = React.lazy(() => import("./ManageContactList"));

const ContactDetail = () => {

  //** State */
  const childRef = useRef();
  const editRef = useRef();
  const addRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);
  const [modifyContactData, setModifyContactData] = useState([]);
  const { customerId, setEmailAddressData, setContactMainModal, setContactId, setPhoneNumberData } = useContext(BasicDetailContext);

  //** API Call's */
  const [GetContactList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetContactData }] = useLazyGetContactByCustomerIdQuery();
  const [getAllContactTypes, { isFetching: isGetAllContactTypesFetching, isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData }] = useLazyGetAllContactTypesQuery();

  //** UseEffect */
  useEffect(() => {
    getAllContactTypes();
    customerId && GetContactList(customerId);
  }, [customerId]);

  useEffect(() => {
    if (!isGetContactFetching && isGetContactSucess && isGetContactData) {
      const modifyData = contactTransformData(isGetContactData);
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

  //** Handle Change's */
  const handleToggleModal = () => {
    setContactId(0);
    setIsEdit(false);
    setisModelOpen(true);
    setPhoneNumberData('');
    setEmailAddressData('');
    setContactMainModal(true);
    setIsAddModelOpen(true);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
    if (addRef.current) {
      addRef.current.callOpenModalFunction();
    }
  };

  const handleEdit = (data) => {
    setIsAddModelOpen(false);
    setIsEdit(true);
    // setEditFormData(data);
    setisModelOpen(!isModelOpen);
    if (editRef.current) {
      editRef.current.callEditFunction(data);
    }
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  //** Success */
  const onSuccess = () => {
    customerId && GetContactList(customerId);
  };

  return (
    <>
      <CardSection
        cardTitle="Contact"
        buttonClassName="theme-button"
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
          <AddEditContact onSidebarClose={onSidebarClose} childRef={childRef} onSuccess={onSuccess} isEdit={isEdit} editRef={editRef} addRef={addRef}
          isAddModelOpen={isAddModelOpen} />
        </SidebarModel>
      </div>
    </>
  );
};

export default ContactDetail;
