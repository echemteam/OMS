import React, { useRef, useState } from "react";
import AddEditContactNumber from "./AddEditContactNumber";
import ContactNumberList from "./ContactNumberList";

const ManageContactNumbers = ({ }) => {

    const molGridRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const actionHandler = {
        EDIT: handleToggleModal,
    };

    return (
        <React.Fragment>
            <ContactNumberList molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler} />
            {showModal && (
                <AddEditContactNumber handleToggleModal={handleToggleModal} showModal={showModal} />
            )}
        </React.Fragment>
    )

}

export default ManageContactNumbers;