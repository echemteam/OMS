import React, { forwardRef, useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../../../components/ui/button/Buttons";
import { userFormData } from "./formData/UserForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import { decryptUrlData } from "../../../../services/CryptoService";
//** Services's */
import ToastService from "../../../../services/toastService/ToastService";
import { useAddUserMutation, useLazyGetUserByUserIdQuery, useUpdateUserMutation } from "../../../../app/services/userAPI";
import ChangePassword from "./ChangePassword";

const AddEditUser = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const descrypteId = id ? decryptUrlData(id) : 0;
  const userFormRef = useRef();

  const [userForm, setUserForm] = useState(userFormData);

  const [
    add,
    { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData },
  ] = useAddUserMutation();
  const [
    update,
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

  const handleUser = () => {
    let userData = userFormRef.current.getFormData(); // Get form data from the FormCreator component.
    if (userData != null) {
      if (!descrypteId && userData) {
        add(userData);
      } else if (descrypteId && userData) {
        let req = {
          ...userData,
          userId: descrypteId
        }
        update(req);
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
      const removeFields = ['Password']
      const newFrom = { ...userForm };
      newFrom.initialState = isGetByIdData;
      newFrom.formFields = userFormData.formFields.filter(field => !removeFields.includes(field.id));
      setUserForm(newFrom);
    }
  }, [isGetByIdSuccess, isGetByIdData, isGetByIdFetching]);

  const backToList = () => {
    navigate("/Users");
  };

  return (
    <div>
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
          <div className="col-md-12 horizontal-form">
            <div className="row vertical-form">
              <FormCreator
                config={userForm}
                ref={userFormRef}
                {...userForm}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                onClick={handleUser}
                buttonText={`${descrypteId ? "Update" : "Add"}`}
                isLoading={isAddLoading || isUpdateLoading}
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

      {descrypteId ?
        <CardSection
          cardTitle="Change Password"
        >
          <ChangePassword descrypteId={descrypteId}/>
        </CardSection>
        : null}
    </div>
  );
});

export default AddEditUser;