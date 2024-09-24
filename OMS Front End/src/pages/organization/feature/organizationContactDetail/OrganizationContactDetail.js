/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { OrganizationContactFormData } from "./config/OrganizationContact.data";
import Buttons from "../../../../components/ui/button/Buttons";
import { useAddEditOrganizationContactDetailsMutation, useLazyGetOrganizationContactDetailsQuery } from "../../../../app/services/organizationAPI";
import ToastService from "../../../../services/toastService/ToastService";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";


const OrganizationContactDetail = () => {
    const organizationContactRef = useRef();
    const [organizationContactData, setOrganizationContactData] = useState(OrganizationContactFormData);
    const [addEditOrganizationContactDetails, { isLoading: isAddEditOrganizationContactDetailsLoading, isSuccess: isAddEditOrganizationContactDetailsSuccess, data: isAddEditOrganizationContactDetailsData }] = useAddEditOrganizationContactDetailsMutation();
    const [getOrganizationContactDetails, { isFetching: isGetOrganizationContactDetailsFetching, isSuccess: isGetOrganizationContactDetailsSuccess, data: isGetOrganizationContactDetailsData }] = useLazyGetOrganizationContactDetailsQuery();
    const [contactDetailId, setContactDetailId] = useState(0);


    useEffect(() => {
        if (isAddEditOrganizationContactDetailsSuccess && isAddEditOrganizationContactDetailsData) {
            ToastService.success(isAddEditOrganizationContactDetailsData.errorMessage);
            getOrganizationContactDetails();
        }
    }, [isAddEditOrganizationContactDetailsSuccess, isAddEditOrganizationContactDetailsData]);


    useEffect(() => {
        getOrganizationContactDetails();
    }, [])

    const handleAddEditContactDetail = () => {

        let contactData = organizationContactRef.current.getFormData();
        if (contactData) {
            const request = {
                ...contactData,
                organizationContactDetailId: contactDetailId,
                companyWebsite: contactData?.companyWebsite,
                salesEmail: contactData?.salesEmail,
                accountsEmail: contactData?.accountsEmail,
                purchaseEmail: contactData?.purchaseEmail,
                customerServiceEmail: contactData?.customerServiceEmail,
                salesPhone: contactData?.salesPhone,
                accountsPhone: contactData?.accountsPhone,
                tollFreePhone: contactData?.tollFreePhone,

            }
            addEditOrganizationContactDetails(request)
        }
    }

    useEffect(() => {
        if (!isGetOrganizationContactDetailsFetching && isGetOrganizationContactDetailsSuccess && isGetOrganizationContactDetailsData) {
            let formData = { ...organizationContactData };
            formData.initialState = {
                ...isGetOrganizationContactDetailsData,
            };
            setOrganizationContactData(formData);
            setContactDetailId(isGetOrganizationContactDetailsData.organizationContactDetailId);
        }
    }, [isGetOrganizationContactDetailsFetching, isGetOrganizationContactDetailsSuccess, isGetOrganizationContactDetailsData,]);

    if (isGetOrganizationContactDetailsFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return (<>

        <div className="row mt-2 add-address-form">
        {/* <h4 className="organization-tab-title">Contact Details</h4> */}
            <FormCreator config={organizationContactData}
                ref={organizationContactRef}
                {...organizationContactData}

            />

            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditContactDetail}
                        isLoading={isAddEditOrganizationContactDetailsLoading}

                    />
                </div>
            </div>
        </div>
    </>)
}
export default OrganizationContactDetail;