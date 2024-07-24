/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import PropTypes from "prop-types";
//** Component's */
const ContactDetailCard = React.lazy(() => import("./ContactDetailCard"));

const ContactList = forwardRef(({ keyId, handleEdit, showEditIcon, getListRef, getContactByKeyId, selectedContactTypeId ,search}) => {

    const [contactDetails, setContactDetails] = useState([]);
     
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierContactDetail OR CustomerContactDetail component.
     * It fetches Contact details by the customer or supplier ID.
     */
    const [
      getContactList,
      {
        isFetching: isGetContactFetching,
        isSuccess: isGetContactSucess,
        data: isGetcontactItem,
      },
    ] = getContactByKeyId();

    //** UseEffect */
    useEffect(() => {
        onGetContactList();
    }, [keyId,selectedContactTypeId]);

    //** Get Contact List */
    const onGetContactList = () => {
        let req = {
            id: keyId,
            searchText: search, // Initial call: no search text provided.
            contactType: selectedContactTypeId ? selectedContactTypeId : ""
        };
        contactList(req);
    };

    const contactList = (req) => {
        let request = {
            ...req,
            contactType: selectedContactTypeId
        }
        keyId && getContactList(request);
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
              <div className="contact-card-list custom-contact-card">
                {contactDetails.map((contactItem, childIndex) => (
                  <ContactDetailCard
                    contactItem={contactItem}
                    handleEdit={handleEdit}
                    showEditIcon={showEditIcon}
                  />
                ))}
              </div>
            ) : (
              <NoRecordFound />
            )}
          </>
        ) : (
          <DataLoader />
        )}
      </React.Fragment>
    );
  }
);
ContactList.propTypes = {
  keyId: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
  showEditIcon: PropTypes.bool.isRequired,
  getListRef: PropTypes.shape({
    current: PropTypes.shape({
      callChildListFunction: PropTypes.func
    })
  }).isRequired,
  getContactByKeyId: PropTypes.func.isRequired,
  selectedContactTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  search: PropTypes.string.isRequired,
};
export default ContactList;
