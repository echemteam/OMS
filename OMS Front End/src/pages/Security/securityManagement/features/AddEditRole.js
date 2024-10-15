/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { addEditRoleFormData } from './config/AddEditRoleForm.data';
import Buttons from '../../../../components/ui/button/Buttons';
import { useAddRolesMutation, useUpdateRolesMutation } from '../../../../app/services/securityRoleAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { securityKey } from '../../../../data/SecurityKey';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import PropTypes from 'prop-types';
import FormCreator from '../../../../components/FinalForms/FormCreator';

const AddEditGroup = (props) => {

  const roleFormRef = useRef();

  const [roleForm, setRoleForm] = useState(addEditRoleFormData);

  const { formSetting } = addEditRoleFormData;
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasAddPermission = hasFunctionalPermission(securityKey.ADDSECURITYROLE);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITSECURITYROLE);

  useEffect(() => {
    if (props.isEdit) {
      if (hasEditPermission.isViewOnly === true) {
        formSetting.isViewOnly = true;
        setIsButtonDisable(true);
      }
      else {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
      }
    }
    else if (!props.isEdit) {
      if (hasAddPermission.hasAccess === true) {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
      }
    }
  }, [props.isEdit, hasEditPermission, hasAddPermission, formSetting.isViewOnly])

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

  return (
    <div>
      <div className="row">
        <div className="col-md-12 add-role-input">
          <div className="row vertical-form">
            <FormCreator
              ref={roleFormRef}
              config={roleForm} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-flex align-item-center justify-content-end mt-3">
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

AddEditGroup.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  initData: PropTypes.object,
  onSuccess: PropTypes.func,
  onModalClose: PropTypes.func.isRequired,
};
export default AddEditGroup
