/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
//** Lib's */
import { Message } from "../EmailAddress/utils/ContactMessages";
import { deleteData } from "../EmailAddress/utils/ContactEmailAddressUtil";
import { addEditContactsFormData, phoneNumberConfig } from "./config/AddEditContactsForm.data";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Service's */
import SwalAlert from "../../../../services/swalService/SwalService";
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";
import { useDeleteContactPhoneMutation, useLazyGetAllPhoneTypesQuery } from "../../../../app/services/phoneNumberAPI";
//** Component's */
const ContactNumberList = React.lazy(() => import("./feature/ContactNumberList"));
const AddEditContactNumber = React.lazy(() => import("./feature/AddEditContactNumber"));

const ContactNumbersGrid = ({ contactId, phoneNumberList, setPhoneNumberList, isButtonDisable, contryIdCode }) => {

    //** State */
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const [newPhoneCode, setNewPhoneCode] = useState("");

    //** API Call's */
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: isCountriesData }] = useLazyGetAllCountriesQuery();
    const [getPhoneTypes, { isSuccess: isGetAllPhoneTypesSucess, data: isPhoneTypesData }] = useLazyGetAllPhoneTypesQuery();
    const [deletePhoneNumber, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactPhoneMutation();

    //** UseEffect */
    useEffect(() => {
        getPhoneTypes();
        getAllCountries();
    }, [contactId]);

    useEffect(() => {
        const actionColumn = phoneNumberConfig.columns.find(column => column.name === "Action");
        if (isButtonDisable && actionColumn) {
            actionColumn.defaultAction.allowEdit = false;
            actionColumn.defaultAction.allowDelete = false;
        } else if (actionColumn) {
            actionColumn.defaultAction.allowEdit = true;
            actionColumn.defaultAction.allowDelete = true;
        }
    }, [isButtonDisable]);

    useEffect(() => {
        if (isGetAllCountriesSucess && isCountriesData) {
            setDropDownOptionField(isCountriesData, 'countryId', 'phoneCode', addEditContactsFormData, 'phoneCode');
            if (contryIdCode) {
                const selectedCountry = isCountriesData.find(country => country.countryId === contryIdCode);
                if (selectedCountry) {
                    setNewPhoneCode(selectedCountry.phoneCode);
                }
            }
        }
    }, [isGetAllCountriesSucess, isCountriesData, contryIdCode]);


    useEffect(() => {
        if (isGetAllPhoneTypesSucess && isPhoneTypesData) {
            setDropDownOptionField(isPhoneTypesData, 'phoneTypeId', 'type', addEditContactsFormData, 'phoneTypeId');
        }
    }, [isGetAllPhoneTypesSucess, isPhoneTypesData])

    useEffect(() => {
        if (isDeleteSucess && isDeleteData && !isDeleteFetching) {
            ToastService.success(isDeleteData.errorMessage);
        }
    }, [isDeleteSucess, isDeleteData, isDeleteFetching]);

    //** Handle Changes */
    const handleToggleModal = () => {
        if (phoneNumberList?.length < 5) {
            setShowModal(!showModal);
            setIsEdit(false);
        } else {
            if (showModal) {
                setShowModal(!showModal);
            } else {
                ToastService.warning("You have reached the maximum number of contacts. Please remove an existing contact before adding a new one.")
            }
        }
    };

    //** Success */
    const onSuccess = () => {
        setShowModal(!showModal);
        setIsEdit(false);
    };

    //** Action Handler */
    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }
    const handleDeleteClick = (data) => {
        confirm("Delete?",
            "Are you sure you want to Delete?",
            "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                deleteData(data.phoneId, data.id, deletePhoneNumber, phoneNumberList, setPhoneNumberList, Message.ContactNumberDelete, false)
            }
        });
    }
    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <React.Fragment>
            <ContactNumberList molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler}
                isButtonDisable={isButtonDisable} phoneNumberList={phoneNumberList} />
            {showModal && (
                <AddEditContactNumber handleToggleModal={handleToggleModal} onSuccess={onSuccess} showModal={showModal}
                    editFormData={editFormData} isEdit={isEdit} contactId={contactId} phoneNumberList={phoneNumberList} setPhoneNumberList={setPhoneNumberList} newPhoneCode={newPhoneCode} />
            )}
        </React.Fragment>
    )

}

ContactNumbersGrid.propTypes = {
    contactId: PropTypes.number.isRequired,
    phoneNumberList: PropTypes.arrayOf(
        PropTypes.shape({
            phoneId: PropTypes.number,
            id: PropTypes.number,

        })
    ).isRequired,
    setPhoneNumberList: PropTypes.func.isRequired,
    isButtonDisable: PropTypes.bool.isRequired,
};

export default ContactNumbersGrid;