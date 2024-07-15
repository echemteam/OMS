import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import NoteList from "./feature/NoteList";
import { NotesData } from "./config/Notes.data";
import AddEditNote from "./feature/AddEditNote";
import { AppIcons } from "../../../../data/appIcons";
import CardSection from "../../../../components/ui/card/CardSection";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";

const NoteGrid = ({ keyId, isSupplier, isEditablePage, SecurityKey, onAddNotes, onUpdateNotes, onGetByIdNotes }) => {

    const listRef = useRef()
    const { formSetting } = NotesData;
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditModeData, setIsEditModeData] = useState();
    const [buttonVisible, setButtonVisible] = useState(true);
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
    const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);

    useEffect(() => {
        if (hasEditPermission && hasAddPermission) {
            if (isEditablePage) {
                if (hasEditPermission.isViewOnly === true) {
                    formSetting.isViewOnly = true;
                    setIsButtonDisable(true);
                } else {
                    formSetting.isViewOnly = false;
                    setIsButtonDisable(false);
                }
            }
            if (hasAddPermission.hasAccess === true) {
                formSetting.isViewOnly = false;
                setIsButtonDisable(false);
                setButtonVisible(true);
            } else {
                formSetting.isViewOnly = true;
                setButtonVisible(false);
            }
        }
    }, [hasEditPermission, hasAddPermission, isEditablePage, formSetting]);

    const handleToggleModal = () => {
        setIsEditMode(false);
        setShowModal(!showModal);
    };

    const handleEditClick = (noteData) => {
        setIsEditMode(true);
        setShowModal(!showModal);
        setIsEditModeData(noteData);
    };

    const onSuccess = () => {
        setShowModal(!showModal);
        if (listRef.current) {
            listRef.current.callListFunction(keyId);
        }
    }

    return (
        <>
            <CardSection cardTitle="Notes" buttonClassName="theme-button" textWithIcon={true} iconImg={AppIcons.PlusIcon}
                rightButton={buttonVisible ? true : false} buttonText="Add" titleButtonClick={handleToggleModal}>
                <div className="note-card-sec">
                    <NoteList listRef={listRef} handleEditClick={handleEditClick} onGetByIdNotes={onGetByIdNotes} keyId={keyId} />
                </div>
            </CardSection>

            <CenterModel showModal={showModal} handleToggleModal={handleToggleModal} modalTitle="Add/Edit Notes" modelSizeClass="w-60">
                <AddEditNote keyId={keyId} onAddNotes={onAddNotes} onUpdateNotes={onUpdateNotes} handleToggleModal={handleToggleModal} isEditModeData={isEditModeData}
                    isSupplier={isSupplier} isEditMode={isEditMode} isButtonDisable={isButtonDisable} onSuccess={onSuccess} />
            </CenterModel>
        </>
    );
}

export default NoteGrid;