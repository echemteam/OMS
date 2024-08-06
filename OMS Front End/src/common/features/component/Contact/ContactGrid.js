/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../data/appIcons";
import { ErrorMessage } from "../../../../data/appMessages";
import CardSection from "../../../../components/ui/card/CardSection";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { useLazyGetAllContactTypesQuery } from "../../../../app/services/contactAPI";
import {
  getFieldData,
  setDropDownOptionField,
} from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
import { modifyContactType } from "../../../../utils/TransformData/TransformAPIData";
import PropTypes from "prop-types";
//** Component's */
const ContactList = React.lazy(() => import("./feature/ContactList"));
const AddEditContact = React.lazy(() => import("./feature/AddEditContact"));
 

const ContactGrid = ({
  keyId,
  getContactByKeyId,
  addEditContactMutation,
  isSupplier,
  isEditablePage,
  SecurityKey,
  getContactById,
  isSearchFilterShow,
}) => {
  //** State */
  const editRef = useRef();
  const childRef = useRef();
  const getListRef = useRef();
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [contactType, setContactType] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [tabContactType, setTabContactType] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("");

  //** API Call's  */
  const [
    getAllContactTypes,
    { isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData },
  ] = useLazyGetAllContactTypesQuery();

  //** UseEffect  */

  useEffect(() => {
    if (isEditablePage && SecurityKey) {
      const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
      const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);

      if (hasAddPermission) {
        if (hasAddPermission.hasAccess === true) {
          setButtonVisible(true);
        } else {
          setButtonVisible(false);
        }
      }
      if (hasEditPermission && hasEditPermission.isViewOnly === true) {
        setShowEditIcon(true);
      } else if (hasEditPermission.isEditable === true) {
        setShowEditIcon(true);
      } else {
        setShowEditIcon(false);
      }
    }
  }, [isEditablePage, isSupplier, SecurityKey]);

  useEffect(() => {
    getAllContactTypes();
  }, [keyId]);

  useEffect(() => {
    if (isGetAllContactTypesSucess && allGetAllContactTypesData) {
      const filterCondition = (item) => {
        let condition = isSupplier ? item.isForSuppliers : item.isForCustomers;
        return condition;
      };
      setDropDownOptionField(allGetAllContactTypesData, "contactTypeId", "type", contactDetailFormData, "contactTypeId", filterCondition);
      const contactOption = getFieldData(contactDetailFormData, "contactTypeId");
      setContactType(contactOption?.fieldSetting?.options);
      setTabContactType(modifyContactType(allGetAllContactTypesData));
    }
  }, [isGetAllContactTypesSucess, allGetAllContactTypesData]);


  //** Handle Change's */
  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const onhandleSearch = () => {
    if (search.length >= 3 || selectedDrpvalues.length > 0) {
      onGetContactList();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage);
    }
  };
  const onhandleClear = () => {
    setSearch("");
    let request = {
      id: keyId,
      searchText: "",
      contactType: Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues),
    };
    if (getListRef.current) {
      getListRef.current.callChildListFunction(request);
    }
  };
  const handleToggleModal = () => {
    setIsEdit(false);
    setIsModelOpen(true);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };
  const handleChangeDropdown = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (selectedValues.length > 0) {
      setSelectedDrpvalues(selectedValues);
    } else {
      setSelectedDrpvalues("");
    }

  };

  const handleEdit = (contactId) => {
    setIsEdit(true);
    setIsModelOpen(!isModelOpen);
    if (editRef.current) {
      editRef.current.callEditFunction(contactId);
    }
  };

  const onGetContactList = () => {
    let request = {
      id: keyId,
      searchText: search,
      contactType: Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues),
    };
    if (getListRef.current) {
      getListRef.current.callChildListFunction(request);
    }
  };

  //** Tab Change */
  const onTabClick = () => {
    setSearch("");
  };

  //** Success */
  const onSuccess = () => {
    onGetContactList();
    setIsModelOpen(!isModelOpen);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    onGetContactList();
  };

  const components = [
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>
    ,
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>,
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>,
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>,
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>,
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>,
    (contactTypeId) => <div className="mt-2">
      <div className="mt-2">
        <ContactList
          keyId={keyId}
          getListRef={getListRef}
          handleEdit={handleEdit}
          showEditIcon={showEditIcon}
          getContactByKeyId={getContactByKeyId}
          selectedContactTypeId={contactTypeId}
          search={search}
        />
      </div>
    </div>
  ];
   

  const filteredTabs = tabContactType?.filter(item => isSupplier ? item.isForSuppliers : item.isForCustomers);

  const tabs = filteredTabs?.map((data, index) => {
    const component = components[index] ? components[index]([data.contactTypeId]) : <div className="mt-2">Default Tab</div>;
    return {
      sMenuItemCaption: data.type,
      component
    };
  });

 
  return (
    <div className="contact-main-card-section vertical-tab-card">
      <CardSection
        cardTitle={isSearchFilterShow ? "" : "Contact"}
        handleChange={handleChange}
        searchInputName="Search By Name and Email"
        searchInput={isSearchFilterShow }
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={buttonVisible }
        buttonText="Add"
        titleButtonClick={handleToggleModal}
        clearButton={isSearchFilterShow }
        clearTitleButtonClick={onhandleClear}
        clearButtonText="Clear"
        searchButton={isSearchFilterShow }
        searchbuttonText="Search"
        searchTitleButtonClick={onhandleSearch}
        searchFilter={false}
        handleChangeDropdown={handleChangeDropdown}
        selectedOptions={selectedDrpvalues}
        optionsValue={contactType}
        isMultiSelect={true}
        placeholder="Search by Contact Type"
        isCardSection={true}
        isdropdownOpen={true}
        clearButtonClassName="dark-btn"
        searchIconImg={AppIcons.SearchIcone}
        searchTextWithIcon={true}
        clearTextWithIcon={true}
        clearIconImg={AppIcons.ClearIcone}
        searchValue={search}
      >
        <div className="vertical-tab-inner">
          <RenderTabs tabs={tabs} isCollapse={true} onTabClick={onTabClick} />
        </div>
      </CardSection>
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-40"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          {/* Add-Edit Contact */}
          <AddEditContact
            isOrderManage={false}
            isSupplier={isSupplier}
            onSidebarClose={onSidebarClose}
            childRef={childRef}
            onSuccess={onSuccess}
            isEdit={isEdit}
            editRef={editRef}
            SecurityKey={SecurityKey}
            onGetContactList={onGetContactList}
            addEditContactMutation={addEditContactMutation}
            keyId={keyId}
            isEditablePage={isEditablePage}
            isOpen={isModelOpen}
            getContactById={getContactById}
            getContectTypeId={null}
          />
        </SidebarModel>
      </div>
    </div>
  );
};

ContactGrid.propTypes = {
  keyId: PropTypes.number.isRequired,
  getContactByKeyId: PropTypes.func.isRequired,
  addEditContactMutation: PropTypes.func.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  isEditablePage: PropTypes.bool.isRequired,
  SecurityKey: PropTypes.shape({
    ADD: PropTypes.string,
    EDIT: PropTypes.string,
  }),
  getContactById: PropTypes.func.isRequired,
  isSearchFilterShow: PropTypes.bool.isRequired,
};
export default ContactGrid;
