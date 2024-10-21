/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../../../components/ui/button/Buttons";
import { userFormData } from "./config/UserForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import { decryptUrlData } from "../../../../services/CryptoService";
import PropTypes from "prop-types";
//** Services's */
import ChangePassword from "./ChangePassword";
import ToastService from "../../../../services/toastService/ToastService";
import {
  useAddUserMutation,
  useLazyGetUserByUserIdQuery,
  useUpdateUserMutation,
} from "../../../../app/services/userAPI";
//** Context */
//** Custom Hook */
import { securityKey } from "../../../../data/SecurityKey";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import FormCreator from "../../../../components/FinalForms/FormCreator";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import AssignRole from "./AssignRole";

const AddEditUser = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const descrypteId = id ? decryptUrlData(id) : 0;
  const userFormRef = useRef();

  const [userForm, setUserForm] = useState(userFormData);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const [
    addUser,
    { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData },
  ] = useAddUserMutation();
  const [
    updateUser,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: isUpdateData,
    },
  ] = useUpdateUserMutation();
  const [
    getUserByUserId,
    {
      isFetching: isGetByIdFetching,
      isSuccess: isGetByIdSuccess,
      data: isGetByIdData,
    },
  ] = useLazyGetUserByUserIdQuery();

  const { formSetting } = userFormData;
  const hasAddPermission = hasFunctionalPermission(securityKey.ADDUSER);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITUSER);

  useEffect(() => {
    if (descrypteId) {
      if (hasEditPermission.isViewOnly === true) {
        formSetting.isViewOnly = true;
        setIsButtonDisable(true);
      } else {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
      }
    } else if (!descrypteId) {
      if (hasAddPermission.hasAccess === true) {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
      }
    }
  }, [
    descrypteId,
    hasEditPermission,
    hasAddPermission,
    formSetting.isViewOnly,
  ]);

  const handleUser = () => {
    let userData = userFormRef.current.getFormData(); // Get form data from the FormCreator component.
    if (userData != null) {
      if (!descrypteId && userData) {
        addUser(userData);
      } else if (descrypteId && userData) {
        let req = {
          ...userData,
          userId: descrypteId,
        };
        updateUser(req);
      }
    }
  };

  useEffect(() => {
    if (descrypteId) {
      getUserByUserId(descrypteId, false);
    }
  }, [descrypteId]);

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      if (isAddData.errorMessage.includes("EXISTS")) {
        ToastService.warning(isAddData.errorMessage);
        return;
      }
      backToList();
      ToastService.success(isAddData.errorMessage);
    }
  }, [isAddSuccess, isAddData]);

  useEffect(() => {
    if (isUpdateSuccess && isUpdateData) {
      backToList();
      ToastService.success(isUpdateData.errorMessage);
    }
  }, [isUpdateSuccess, isUpdateData]);

  useEffect(() => {
    if (isGetByIdSuccess && isGetByIdData && !isGetByIdFetching) {
      let newFrom = { ...userForm };
      const removeFields = ["Password"];
      newFrom.initialState = isGetByIdData;
      newFrom = removeFormFields(newFrom, removeFields);
      setUserForm(newFrom);
    }
  }, [isGetByIdSuccess, isGetByIdData, isGetByIdFetching]);

  const backToList = () => {
    navigate("/Users");
  };

  return (
    <div className="mt-2">
      <CardSection
        cardTitle="User Basic Information"
        rightButton={true}
        buttonClassName="btn dark-btn"
        titleButtonClick={backToList}
        buttonText="Back"
        textWithIcon={true}
        iconImg={AppIcons.BackArrowIcon}
      >
        <div className="row">
          <div className="col-md-12 add-edit-user-form">
            <div className="row vertical-form">
              <div className="col-12">
                {!isGetByIdFetching ? (
                  <FormCreator
                    config={userForm}
                    ref={userFormRef}
                    {...userForm}
                    isLoading={isGetByIdFetching}
                  />
                ) : (
                  <DataLoader />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                onClick={handleUser}
                buttonText={`${descrypteId ? "Update" : "Add"}`}
                isLoading={isAddLoading || isUpdateLoading}
                isDisable={isButtonDisable}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={backToList}
              />
            </div>
          </div>
        </div>
      </CardSection>

      {descrypteId ? (
        <CardSection cardTitle="Change Password">
          <ChangePassword
            descrypteId={descrypteId}
            isButtonDisable={isButtonDisable}
          />
        </CardSection>
      ) : null}

      {descrypteId ? (
        <CardSection cardTitle="Assign Role">
          <AssignRole
            descrypteId={descrypteId}
            isButtonDisable={isButtonDisable}
          />
        </CardSection>
      ) : null}
    </div>
  );
});

AddEditUser.propTypes = {
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
export default AddEditUser;
