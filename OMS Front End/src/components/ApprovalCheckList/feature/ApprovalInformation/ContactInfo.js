import React, { useEffect, useState } from "react";
import { ContactType } from "../../../../utils/Enums/commonEnums";

const ContactInformation = ({ isModelOpen, mainId, getContactById }) => {

    //** State */
    const [contactInformation, setContactInformation] = useState([]);

    //** API Call's */
    const [getContactList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetcontactItem }] = getContactById();

    useEffect(() => {
        if (isModelOpen && mainId) {
            const type = [ContactType.INVOICESUBMISSION, ContactType.AP]
            let req = {
                id: mainId,
                searchText: "",
                contactType: type
            };
            getContactList(req);
        }
    }, [isModelOpen, mainId]);

    useEffect(() => {
        if (!isGetContactFetching && isGetContactSucess && isGetcontactItem) {
            setContactInformation(isGetcontactItem);
            console.log(isGetcontactItem);
        }
    }, [isGetContactFetching, isGetContactSucess, isGetcontactItem]);


    return (
        <React.Fragment>
            <h5> Contact Information </h5>
            {contactInformation &&
                contactInformation.map((contact, index) =>
                    <div key={index}>
                        <h6>Contact Type: {contact.type}</h6>
                        <h6>First Name: {contact.firstName}</h6>
                        <h6>Last Name: {contact.lastName}</h6>
                        <h6>Is Primary: {contact.isPrimary}</h6>
                        <h6>Email Address Info:</h6>
                        {contact.emailAddressList && contact.emailAddressList.map((emails) =>
                            <>
                                <h6>Email Address: {emails.emailAddress}</h6>
                                <h6>Is Primary: {emails.isPrimary}</h6>
                            </>)
                        }
                        <h6>Phone Number Info:</h6>
                        {contact.phoneNumberList && contact.phoneNumberList.map((phoneData) =>
                            <>
                                <h6>Phone Type: {phoneData.phoneType}</h6>
                                <h6>Phone Number: {phoneData.phoneNumber}</h6>
                                <h6>Phone Code: {phoneData.phoneCode}</h6>
                                <h6>Extension: {phoneData.extension}</h6>
                                <h6>Is Primary: {phoneData.isPrimary}</h6>
                            </>)
                        }
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default ContactInformation;