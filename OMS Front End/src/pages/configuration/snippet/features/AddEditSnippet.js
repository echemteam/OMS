/* eslint-disable react-hooks/exhaustive-deps */
import React, {  forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import FormCreator from '../../../../components/Forms/FormCreator';
import { SnippetListData } from './config/SnippetFormData';
import Buttons from '../../../../components/ui/button/Buttons';
import { useAddSnippetMutation, useLazyGetSnippetsBySnippetIdQuery, useUpdateSnippetMutation } from '../../../../app/services/snippetAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { onResetForm } from '../../../../utils/FormFields/ResetForm/handleResetForm';
import PropTypes from 'prop-types';
 
const AddEditSnippet = forwardRef((props) => {
    const snippetRef = useRef();
    const snippetId = props.initData?.snippetId;
    const [snippetsData, setSnippetsData] = useState(SnippetListData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    const [addSnippet,{ isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }, ] = useAddSnippetMutation();
    const [updateSnippets,{isLoading: isUpdateLoading,isSuccess: isUpdateSuccess, data: isUpdateData,  },] = useUpdateSnippetMutation();
    const [getSnippetsBySnippetId,{isFetching: isGetSnippetsBySnippetIdFetching,isSuccess: isGetSnippetsBySnippetIdSuccess, data: isGetSnippetsBySnippetIdData,  },] = useLazyGetSnippetsBySnippetIdQuery();

  useEffect(() => {
   if (props.isEdit && snippetId) {  
      getSnippetsBySnippetId(snippetId);
    }
  }, [props.isEdit, snippetId]);

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      if (isAddData.errorMessage.includes('EXISTS')) {
        ToastService.warning(isAddData.errorMessage);
        return;
      }
      props.onSuccess();
      ToastService.success(isAddData.errorMessage);
      onResetData();
      props.onClose();
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isAddSuccess, isAddData]);

  useEffect(() => {
    if (isUpdateSuccess && isUpdateData) {
      props.onSuccess();
      ToastService.success(isUpdateData.errorMessage);
      onResetData(); 
      props.onClose();
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isUpdateSuccess, isUpdateData]);

    useEffect(() => {
    if (!isGetSnippetsBySnippetIdFetching && isGetSnippetsBySnippetIdSuccess && isGetSnippetsBySnippetIdData  ) {
      if (isGetSnippetsBySnippetIdData) {
        let formData = { ...snippetsData };
        formData.initialState = {
          snippetId:snippetId,
          name: isGetSnippetsBySnippetIdData.name,
          hashtag: isGetSnippetsBySnippetIdData.hashtag,
          body: isGetSnippetsBySnippetIdData.body,
          isActive: isGetSnippetsBySnippetIdData.isActive,
        };
        setSnippetsData(formData);
        setShouldRerenderFormCreator((prevState) => !prevState);
      }
    }
  }, [isGetSnippetsBySnippetIdFetching,isGetSnippetsBySnippetIdSuccess, isGetSnippetsBySnippetIdData]);

   const onResetData = () => {
    let formData = { ...SnippetListData };
    onResetForm(formData, setSnippetsData, null);
    setShouldRerenderFormCreator((prevState) => !prevState);
  };

  const handleSnippets = () => {
    const snippetsData = snippetRef.current.getFormData();
    if (snippetsData) {
      const hashtag =  `#${snippetsData.hashtag.replace(/\s+/g, '').trim().replace(/^#+|#+$/g, '')}#`;
      const requestData = {
        ...snippetsData,
        name: snippetsData.name,
        hashtag: hashtag,
        body: snippetsData.body,
        isActive: snippetsData?.isActive,
      };
      if (!snippetId) {
        addSnippet(requestData);
      } else {
        const updateData = {
          ...requestData,
          snippetId: snippetId,
          // hashtag: `#${snippetsData.hashtag.replace(/\s+/g, '').trim().replace(/^#+|#+$/g, '')}#`
        };
        updateSnippets(updateData);
      }
    }
  };

  const handleInputFields = (data, dataField) => {
    if (dataField === 'name') {
      const trimmedName =  `#${data.replace(/\s+/g, '').trim().replace(/^#+|#+$/g, '')}#`; 
      snippetRef.current.updateFormFieldValue({
        name: data,  
        hashtag: trimmedName
      });
     
    }
  };
  
  const formInputHandler = {
    INPUT_CHANGED: handleInputFields,
  }

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onResetData,
  }));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row vertical-form">
            <FormCreator
              ref={snippetRef}
              config={snippetsData}
              {...snippetsData}
              key={shouldRerenderFormCreator}
              onInputChange={formInputHandler}
            />
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-center justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText={props.isEdit ? "Update" : "Save"}
              onClick={handleSnippets}
             isLoading={isAddLoading || isUpdateLoading}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              onClick={props.onClose}
            />
          </div>
        </div>
      </div>
    
    )
  })

AddEditSnippet.propTypes = {
    isEdit: PropTypes.bool,
    initData: PropTypes.shape({
        snippetId: PropTypes.number,
    }),
    isModelOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
};

 export default AddEditSnippet;