import React, { useEffect, useRef, useState } from 'react'
import { AddEditResponsibleData } from '../config/ManageResponsibleUsers.data';
import FormCreator from '../../../../../../../components/Forms/FormCreator';
import Buttons from '../../../../../../../components/ui/button/Buttons';
import { useLazyGetAllUserQuery } from '../../../../../../../app/services/commonAPI';
import { excludingRoles } from '../../../../../../customerDetail/feature/customerBasicDetail/config/CustomerBasicDetail.data';
import { setDropDownOptionField } from '../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import { useAddFunctionalitiesResponsiblesUserMutation } from '../../../../../../../app/services/configurationAPI';
import { onResetForm } from '../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import ToastService from '../../../../../../../services/toastService/ToastService';

const AddEditManageResponsibleUser = (props) => {
  const responsibleRef = useRef();
  const [responsibleData, setResponsibleData] = useState(AddEditResponsibleData);

  const [getAllUser, { isSuccess: isGetAllUserSucess, data: allGetAllUserData }] = useLazyGetAllUserQuery();
  const [addFunctionalitiesResponsiblesUser, { isLoading: isAddFunctionalitiesResponsiblesUserLoading, isSuccess: isAddFunctionalitiesResponsiblesUserSuccess, data: allAddFunctionalitiesResponsiblesUserData, },] = useAddFunctionalitiesResponsiblesUserMutation();

  useEffect(() => {
    getAllUser()
  }, [])

  useEffect(() => {
    if (isGetAllUserSucess && allGetAllUserData) {
      const filterData = allGetAllUserData.filter((item) => {
        return (item.roleName === null || !excludingRoles.map((role) => role.toLowerCase()).includes(item.roleName.toLowerCase()));
      });
      // Remove duplicates based on fullName
      const uniqueData = Array.from(new Map(filterData.map((item) => [item.fullName, item])).values());
      setDropDownOptionField(uniqueData, 'userId', 'fullName', AddEditResponsibleData, 'responsibleUserId');
    }
  }, [isGetAllUserSucess, allGetAllUserData]);

  useEffect(() => {
    if (isAddFunctionalitiesResponsiblesUserSuccess && allAddFunctionalitiesResponsiblesUserData) {
      if (allAddFunctionalitiesResponsiblesUserData.errorMessage.includes("exists")) {
        ToastService.warning(allAddFunctionalitiesResponsiblesUserData.errorMessage);
        handleResetAndClose();
        return;
      }
      ToastService.success(allAddFunctionalitiesResponsiblesUserData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddFunctionalitiesResponsiblesUserSuccess, allAddFunctionalitiesResponsiblesUserData]);

  const handleAddEditResponsibleUser = () => {
    const formData = responsibleRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        functionalityId: props.functionalityId ? props.functionalityId : 0,
        responsibleUserId: formData.responsibleUserId && typeof formData.responsibleUserId === "object" ? formData.responsibleUserId.value : formData.responsibleUserId
      };
      addFunctionalitiesResponsiblesUser(request);
    }
  }

  useEffect(() => {
    onResetForm(responsibleData, setResponsibleData, null);
  }, [props.isOpen])


  const handleResetAndClose = () => {
    onResetForm(responsibleData, setResponsibleData, null);
    props.onClose();
  };

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={responsibleData}
        ref={responsibleRef}
      />
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditResponsibleUser}
            isLoading={isAddFunctionalitiesResponsiblesUserLoading}
          />
          <Buttons
            buttonTypeClassName="dark-btn ml-5"
            buttonText="Cancel"
            onClick={handleResetAndClose}
          />
        </div>
      </div>
    </div>
  )
}

export default AddEditManageResponsibleUser