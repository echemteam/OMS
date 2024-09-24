/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationLogisticFormData } from "./config/OrganizationLogistic.data";
import { useAddEditOrganizationLogisticDetailsMutation, useLazyGetOrganizationLogisticDetailsQuery } from "../../../../app/services/organizationAPI";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";



const OrganizationLogisticDetail = () => {
    const organizationLogisticRef = useRef();
    const [organizationLogisticData, setOrganizationLogisticData] = useState(OrganizationLogisticFormData);
    const [addEditOrganizationLogisticDetails, { isLoading: isAddEditOrganizationLogisticDetailsLoading, isSuccess: isAddEditOrganizationLogisticDetailsSuccess, data: isAddEditOrganizationLogisticDetailsData }] = useAddEditOrganizationLogisticDetailsMutation();
    const [getOrganizationLogisticDetails, { isFetching: isGetOrganizationLogisticDetailsFetching, isSuccess: isGetOrganizationLogisticDetailsSuccess, data: isGetOrganizationLogisticDetailsData }] = useLazyGetOrganizationLogisticDetailsQuery();
    const [logisticDetailId, setLogisticDetailId] = useState(0);

    useEffect(() => {
        if (isAddEditOrganizationLogisticDetailsSuccess && isAddEditOrganizationLogisticDetailsData) {
            ToastService.success(isAddEditOrganizationLogisticDetailsData.errorMessage);
            getOrganizationLogisticDetails();
        }
    }, [isAddEditOrganizationLogisticDetailsSuccess, isAddEditOrganizationLogisticDetailsData]);


    useEffect(() => {
        getOrganizationLogisticDetails();
    }, [])

    const handleAddEditLogisticDetail = () => {

        let logisticData = organizationLogisticRef.current.getFormData();
        if (logisticData) {
            const request = {
                ...logisticData,
                organizationLogisticDetailId: logisticDetailId,
                fedExAccount: logisticData?.fedExAccount,
                dHLAccount: logisticData?.dHLAccount,
                uPSAccount: logisticData?.uPSAccount,
                uSPSAccount: logisticData?.uSPSAccount,
            }
            addEditOrganizationLogisticDetails(request);
        }
    }
    useEffect(() => {

        if (!isGetOrganizationLogisticDetailsFetching && isGetOrganizationLogisticDetailsSuccess && isGetOrganizationLogisticDetailsData) {
            let formData = { ...organizationLogisticData };
            formData.initialState = {
                organizationLogisticDetailId: isGetOrganizationLogisticDetailsData.organizationLogisticDetailId,
                fedExAccount: isGetOrganizationLogisticDetailsData.fedExAccount,
                dHLAccount: isGetOrganizationLogisticDetailsData.dhlAccount,
                uPSAccount: isGetOrganizationLogisticDetailsData.upsAccount,
                uSPSAccount: isGetOrganizationLogisticDetailsData.uspsAccount,
            };
            setOrganizationLogisticData(formData);
            setLogisticDetailId(isGetOrganizationLogisticDetailsData.organizationLogisticDetailId);
        }
    }, [isGetOrganizationLogisticDetailsFetching, isGetOrganizationLogisticDetailsSuccess, isGetOrganizationLogisticDetailsData,]);

    if (isGetOrganizationLogisticDetailsFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return (

        <div className="row mt-2 add-address-form">
            {/* <h4 className="organization-tab-title">Logistic Details</h4> */}
            <FormCreator config={organizationLogisticData}
                ref={organizationLogisticRef}
                {...organizationLogisticData}

            />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditLogisticDetail}
                        isLoading={isAddEditOrganizationLogisticDetailsLoading}
                    />
                </div>
            </div>
        </div>
    )
}
export default OrganizationLogisticDetail;