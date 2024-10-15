import { useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import { cloneContactFormData } from "../config/CloneContactForm.data";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import { getDropDownId } from "../../../../../utils/TransformData/TransformAPIData";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useAddEditContactMutation, useLazyGetAllContactTypesQuery } from "../../../../../app/services/contactAPI";
import PropTypes from "prop-types";

const ContactCloneModel = ({ cloneRef, isSupplier, onGetContactList, getCompletionCount }) => {

    const ref = useRef();
    const [cloneData, setCloneData] = useState();
    const [isCloneModel, setIsCloneModel] = useState(false);

    //** API Call's  */
    const [getAllContactTypes, { isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData }] = useLazyGetAllContactTypesQuery();
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddEditContactMutation();


    const handlSave = () => {
        const data = ref.current.getFormData();
        if (!data) return;
        if (cloneData) {
            const contactType = getDropDownId(data.contactTypeId);
            let modifyData = {
                ...cloneData,
                contactTypeId: contactType,
                [isSupplier ? 'supplierContactId' : 'customerContactId']: 0,
                contactId: 0,
                emailAddressList: cloneData.emailAddressList.map(data => ({
                    emailAddress: data.emailAddress,
                    isPrimary: data.isPrimary
                })),
                phoneNumberList: cloneData.phoneNumberList.map((data) => ({
                    extension: data.extension,
                    isPrimary: data.isPrimary,
                    phoneCode: data.phoneCode,
                    phoneNumber: data.phoneNumber,
                    phoneType: data.phoneType,
                    phoneTypeId: data.phoneTypeId
                }))
            }
            addEdit(modifyData);
        }
    };

    //** UseEffect */
    useEffect(() => {
        getAllContactTypes();
    }, [getAllContactTypes]);

    useEffect(() => {
        if (isGetAllContactTypesSucess && allGetAllContactTypesData) {
            const filterCondition = (item) => {
                let condition = isSupplier ? item.isForSuppliers : item.isForCustomers;
                return condition;
            };
            setDropDownOptionField(allGetAllContactTypesData, "contactTypeId", "type", cloneContactFormData, "contactTypeId", filterCondition);
        }
    }, [isGetAllContactTypesSucess, allGetAllContactTypesData]);

    useEffect(() => {
        if (isAddEditSuccess && isAddEditData) {
            if (isAddEditData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isAddEditData.errorMessage);
                return;
            }
            if (onGetContactList) {
                onGetContactList();
                setIsCloneModel(!isCloneModel);
                ToastService.success(isAddEditData.errorMessage);
            }
            getCompletionCount && getCompletionCount();
        }
    }, [isAddEditSuccess, isAddEditData]);

    const handleToggleModal = () => {
        setIsCloneModel(!isCloneModel);
    };

    const handleContactData = (data) => {
        setCloneData(data);
        setIsCloneModel(!isCloneModel);
    }

    //** Use Imperative Handle */
    useImperativeHandle(cloneRef, () => ({
        callChildFunction: handleContactData
    }));

    return (
        <CenterModel showModal={isCloneModel} handleToggleModal={handleToggleModal} modalTitle="Clone Contact" modelSizeClass="w-40">
            <div className="row">
                <div className="col-md-12 add-edit-emailAddressForm">
                    <div className="row vertical-form add-edit-contactForm">
                        <FormCreator config={cloneContactFormData} ref={ref} />
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    <div className="d-flex align-item-center justify-content-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText="Save"
                            isLoading={isAddEditLoading}
                            onClick={handlSave} />
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={handleToggleModal} />
                    </div>
                </div>
            </div>
        </CenterModel >
    );
}

ContactCloneModel.propTypes = {
    cloneRef: PropTypes.shape({
        current: PropTypes.shape({
            callChildFunction: PropTypes.func,
        }),
    }).isRequired,
    isSupplier: PropTypes.bool.isRequired,
    onGetContactList: PropTypes.func.isRequired
};

export default ContactCloneModel;