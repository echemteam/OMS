/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import PropTypes from "prop-types";
//** Component's */
const ContactDetailCard = React.lazy(() => import("./ContactDetailCard"));

const ContactList = forwardRef(
  ({
    keyId,
    handleEdit,
    showEditIcon,
    getListRef,
    getContactByKeyId,
    selectedContactTypeId,
    search,
    isSupplier,
    getCompletionCount,
    isEditablePage,
    SecurityKey
  }) => {
    const prevSelectedContactTypeIdRef = useRef();
    const [contactDetails, setContactDetails] = useState([]);
    const [openModalId, setOpenModalId] = useState(null);

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
    const arraysAreEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    };

    useEffect(() => {
      if (!arraysAreEqual(prevSelectedContactTypeIdRef.current || [], selectedContactTypeId)) {
        onGetContactList();
      } prevSelectedContactTypeIdRef.current = selectedContactTypeId;
    }, [keyId, selectedContactTypeId]);

    const modalRefs = useRef([]);

    const handleOutsideClick = (event) => {
      if (
        openModalId &&
        modalRefs.current[openModalId] &&
        !modalRefs.current[openModalId].contains(event.target)
      ) {
        setOpenModalId(null);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [openModalId]);

    //** Get Contact List */
    const onGetContactList = () => {
      let req = {
        id: keyId,
        searchText: "", // Initial call: no search text provided.
        contactType: selectedContactTypeId ? selectedContactTypeId : "",
        //contactType: selectedContactTypeId || ""
      };
      contactList(req);
    };

    const contactList = (req) => {
      let request = {
        ...req,
        contactType: selectedContactTypeId,
      };
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
                    key={contactItem.contactId}
                    contactItem={contactItem}
                    handleEdit={handleEdit}
                    showEditIcon={showEditIcon}
                    openModalId={openModalId}
                    setOpenModalId={setOpenModalId}
                    isSupplier={isSupplier}
                    onGetContactList={onGetContactList}
                    getCompletionCount={getCompletionCount}
                    isEditablePage={isEditablePage}
                    SecurityKey={SecurityKey}
                    ref={(el) => (modalRefs.current[contactItem.contactId] = el)}
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
      callChildListFunction: PropTypes.func,
    }),
  }).isRequired,
  getContactByKeyId: PropTypes.func.isRequired,
  selectedContactTypeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  search: PropTypes.string.isRequired,
};
export default ContactList;
