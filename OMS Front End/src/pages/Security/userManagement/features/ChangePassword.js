import React, { useEffect, useRef, useState } from 'react'
import { useUpdateUserPasswordMutation } from '../../../../app/services/userAPI';
import changePasswordInfo from '../features/formData/ChangePassword.data';
import ToastService from '../../../../services/toastService/ToastService';
import FormCreator from '../../../../components/Forms/FormCreator';
import Buttons from '../../../../components/ui/button/Buttons';

const ChangePassword = (props) => {
    const userId = props.descrypteId;
    const passwordFormRef = useRef();
    const [passwordForm, setPasswordForm] = useState(changePasswordInfo);
    const [resetPassword, { isLoading, isSuccess, data: resetPasswordData }] = useUpdateUserPasswordMutation();

    const handlePassword = () => {
        const formData = passwordFormRef.current.getFormData();
        if (userId && formData) {
            const reqParams = {
                userId: userId,
                password: formData.password
            }
            resetPassword(reqParams);
        }
    }

    useEffect(() => {
        if (isSuccess && resetPasswordData) {
            ToastService.success(resetPasswordData.errorMessage);
            resetForm();
        }
    }, [isSuccess, resetPasswordData])

    const resetForm = () => {
        const formData = { ...changePasswordInfo }
        formData.initialState = { ...changePasswordInfo.initialState }
        setPasswordForm(formData);
    }

    return (
        <div className="row">
            <div className="col-md-12 horizontal-form">
                <div className="row vertical-form">
                    <FormCreator
                        ref={passwordFormRef} {...passwordForm} config={passwordForm}
                    />
                </div>
            </div>
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-center justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Update Password"
                        onClick={handlePassword}
                        isLoading={isLoading} />

                </div>
            </div>
        </div>
    )
}

export default ChangePassword