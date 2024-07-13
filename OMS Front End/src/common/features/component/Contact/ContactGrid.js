import ContactDetailCard from "./feature/ContactDetailCard";
import CardSection from "../../../../components/ui/card/CardSection";
import { useRef, useState } from "react";
import { AppIcons } from "../../../../data/appIcons";
import ToastService from "../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../data/appMessages";

const ContactGrid = ({ keyId, getContactByKeyId, addEditContactMutation, isSupplier, isEditablePage, SecurityKey, getContactById, isSearchFilterShow }) => {

    //** State */
    const editRef = useRef();
    const childRef = useRef();
    const getListRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [isModelOpen, setisModelOpen] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [showEditIcon, setShowEditIcon] = useState(true);
    const [contactType, setContactType] = useState("")
    const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
    const [search, setSearch] = useState("");
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    //** Handle Change's */
    const handleChange = (event) => {
        setSearch(event.target.value.trim());
    }
    const onhandleSearch = () => {
        if (search.length >= 3 || selectedDrpvalues.length > 0) {
            let request = {
                id: keyId,
                searchText: search,
                contactType: Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues)
            }
            if (getListRef.current) {
                getListRef.current.callChildListFunction(request);
            }
        } else {
            ToastService.warning(ErrorMessage.CommonErrorMessage)
        }
    }
    const onhandleClear = () => {
        setSearch("");
        setContactType("");
        setSelectedDrpvalues("");
        setShouldRerenderFormCreator((prevState) => !prevState);
    };
    const handleToggleModal = () => {
        setIsEdit(false);
        setisModelOpen(true);
        if (childRef.current) {
            childRef.current.callChildFunction();
        }
    };
    const handleChangeDropdown = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        if (selectedValues.length > 0) {
            setSelectedDrpvalues(selectedValues);
        } else {
            setSelectedDrpvalues("");
        }
    };

    const handleEdit = (contactId) => {
        setIsEdit(true);
        setisModelOpen(!isModelOpen);
        if (editRef.current) {
            editRef.current.callEditFunction(contactId);
        }
    };

    return (
        <div key={shouldRerenderFormCreator}>
            <CardSection cardTitle={isSearchFilterShow ? "" : "Contact"} handleChange={handleChange} searchInputName="Search By Name and Email"
                searchInput={isSearchFilterShow ? true : false} buttonClassName="theme-button" textWithIcon={true} iconImg={AppIcons.PlusIcon}
                rightButton={buttonVisible ? true : false} buttonText="Add" titleButtonClick={handleToggleModal} clearButton={isSearchFilterShow ? true : false}
                clearTitleButtonClick={onhandleClear} clearButtonText="Clear" searchButton={isSearchFilterShow ? true : false} searchbuttonText="Search"
                searchTitleButtonClick={onhandleSearch} searchFilter={isSearchFilterShow ? true : false} handleChangeDropdown={handleChangeDropdown}
                selectedOptions={selectedDrpvalues} optionsValue={contactType} isMultiSelect={true} placeholder="Search by Contact Type" isCardSection={true}
                isdropdownOpen={true} clearButtonClassName="dark-btn">
                <ContactDetailCard keyId={keyId} getListRef={getListRef} handleEdit={handleEdit} showEditIcon={showEditIcon} getContactByKeyId={getContactByKeyId} />
            </CardSection>
        </div>
    )
}

export default ContactGrid;