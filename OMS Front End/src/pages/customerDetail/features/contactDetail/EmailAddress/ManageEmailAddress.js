import React, { useContext } from "react";
import EmailAddressList from "./EmailAddressList";
import AddEditEmailModal from "./AddEditEmailAddress";
import ContactContext from "../../../../../utils/ContextAPIs/Customer/ContactContext";

const ManageEmailAddress = () => {

    const { handleSubEditModal, showSubModal } = useContext(ContactContext);

    const actionHandler = {
        EDIT: handleSubEditModal,
    };

    return (
        <React.Fragment>
            <EmailAddressList actionHandler={actionHandler} />
            {showSubModal && (
                <AddEditEmailModal />
            )}
        </React.Fragment>
    )

}

export default ManageEmailAddress