/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
//** Component's */
const ContactDetailCard = React.lazy(() => import("./ContactDetailCard"));

const ContactList = forwardRef(({ keyId, handleEdit, showEditIcon, getListRef, getContactByKeyId }) => {

    const [contactDetails, setContactDetails] = useState([]);

    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierContactDetail OR CustomerContactDetail component.
     * It fetches Contact details by the customer or supplier ID.
    */
    const [getContactList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetcontactItem }] = getContactByKeyId();

    //** UseEffect */
    useEffect(() => {
        onGetContactList();
    }, [keyId]);

    //** Get Contact List */
    const onGetContactList = () => {
        let req = {
            id: keyId,
            searchText: "", // Initial call: no search text provided.
            contactType: "", // Initial call: no specific contact type specified.
        };
        contactList(req);
    };

    const contactList = (req) => {
        keyId && getContactList(req);
    };

    //** Use Imperative Handle */
    useImperativeHandle(getListRef, () => ({
        callChildListFunction: contactList,
    }));

    useEffect(() => {
        if (!isGetContactFetching && isGetContactSucess && isGetcontactItem) {
            setContactDetails(isGetcontactItem);
        }
    }, [isGetContactFetching, isGetContactSucess, isGetcontactItem]);

    return (
        <React.Fragment>
            {!isGetContactFetching ? (
                <>
                    {contactDetails && contactDetails.length > 0 ? (
                        <div className="row">
                            {contactDetails.map((contactItem, childIndex) => (
                                <ContactDetailCard contactItem={contactItem} handleEdit={handleEdit} showEditIcon={showEditIcon} />
                            ))}
                        </div>
                    ) : (
                        <NoRecordFound />
                    )}
                </>
            ) : (<DataLoader />)}

        </React.Fragment>
    )
})

export default ContactList;