import React, { useContext, useEffect, useRef, useState } from 'react'
import { addEditRoleFormData, securityKeys } from './formData/AddEditRoleForm.data';
import FormCreator from '../../../../components/Forms/FormCreator';
import Buttons from '../../../../components/ui/button/Buttons';
import { useAddRolesMutation, useUpdateRolesMutation } from '../../../../app/services/securityRoleAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { PagePermissionsContext } from '../../../../utils/ContextAPIs/PagePermissions/PagePermissionsContext';
import usePermissions from '../../../../utils/CustomHook/UsePermissions';

const AddEditGroup = (props) => {

  const roleFormRef = useRef();

  const [roleForm, setRoleForm] = useState(addEditRoleFormData);
  const { isButtonDisable } = useContext(PagePermissionsContext);
  usePermissions(props.isEdit, securityKeys, addEditRoleFormData);

  const [
    addRoles,
    { isLoading: isAddRoleLoading, isSuccess: isAddRoleSuccess, data: isAddRoleData },
  ] = useAddRolesMutation();
  const [
    updateRoles,
    {
      isLoading: isUpdateRoleLoading,
      isSuccess: isUpdateRoleSuccess,
      data: isUpdateRoleData,
    },
  ] = useUpdateRolesMutation();

  // const [
  //   getRoleByRoleId,
  //   {
  //     isFetching: isGetRoleByIdFetching,
  //     isSuccess: isGetRoleByIdSuccess,
  //     data: isGetRoleByIdData,
  //   },
  // ] = useLazyGetRoleByRoleIdQuery();

  const handleUser = () => {
    let roleData = roleFormRef.current.getFormData(); // Get form data from the FormCreator component.
    if (!props.isEdit && roleData) {
      addRoles(roleData);
    } else if (props.isEdit && roleData) {
      updateRoles(roleData);
    }
  }

  useEffect(() => {
    onreset();
  }, [props.initData])

  //** Reset Form */
  const onreset = () => {
    let formData = { ...roleForm };
    formData.initialState = { ...props.initData };
    setRoleForm(formData);
  };

  // useEffect(() => {
  //   // onreset();
  //   if (descrypteId) {
  //     getRoleByRoleId(descrypteId, false);
  //   }
  // }, [descrypteId]);

  useEffect(() => {
    if (isAddRoleSuccess && isAddRoleData) {
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isAddRoleData.errorMessage);
    }
  }, [isAddRoleSuccess, isAddRoleData]);

  useEffect(() => {
    if (isUpdateRoleSuccess && isUpdateRoleData) {
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isUpdateRoleData.errorMessage);
    }
  }, [isUpdateRoleSuccess, isUpdateRoleData]);

  // useEffect(() => {
  //   if (isGetRoleByIdSuccess && isGetRoleByIdData && !isGetRoleByIdFetching) {
  //     const newFrom = { ...roleForm };
  //     newFrom.initialState = isGetRoleByIdData;
  //     setRoleForm(newFrom);
  //   }
  // }, [isGetRoleByIdSuccess, isGetRoleByIdData, isGetRoleByIdFetching]);

  return (
    <div>
      <div className="row">
        <div className="col-md-12 horizontal-form">
          <div className="row vertical-form">
            <FormCreator
              ref={roleFormRef}
              config={roleForm}
              {...roleForm}
            />
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-center justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              onClick={handleUser}
              buttonText={`${props.isEdit ? "Update" : "Add"}`}
              isLoading={isAddRoleLoading || isUpdateRoleLoading}
              isDisable={isButtonDisable}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              onClick={props.onModalClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditGroup
