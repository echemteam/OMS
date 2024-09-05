/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useImperativeHandle } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import ToastService from "../../../../services/toastService/ToastService";
import { dictionaryFormData } from "../config/Dictionary.Data";
import { useAddEditDictionaryMutation, useLazyGetDictionaryByDictonaryIdQuery } from "../../../../app/services/dictionaryAPI";
import PropTypes from 'prop-types';

const AddEditDictionary = (props) => {
  const dictionaryRef = useRef();
  const dictionaryId = props.initData?.dictionaryId;
  const [dictionaryData, setDictionaryData] = useState(dictionaryFormData);
  const [addEditDictionary, { isLoading: isAddEditDictionaryLoading, isSuccess: isAddEditDictionarySuccess, data: addEditDictionaryData }] = useAddEditDictionaryMutation();
  const [getDictionaryByDictonaryId, { isFetching: isGetDictionaryByDictonaryIdFetching, isSuccess: isGetDictionaryByDictonaryIdSuccess, data: isGetDictionaryByDictonaryIdData }] = useLazyGetDictionaryByDictonaryIdQuery();

  useEffect(() => {
    if (!isGetDictionaryByDictonaryIdFetching && isGetDictionaryByDictonaryIdSuccess && isGetDictionaryByDictonaryIdData  ) {
        if (isGetDictionaryByDictonaryIdData) {
            let formData = { ...dictionaryData };
            formData.initialState = { 
              dictionaryId:isGetDictionaryByDictonaryIdData.dictionaryId,
              key: isGetDictionaryByDictonaryIdData.key,
              value: isGetDictionaryByDictonaryIdData.value,
            };
            setDictionaryData(formData);
          }
    }
  }, [isGetDictionaryByDictonaryIdFetching,isGetDictionaryByDictonaryIdSuccess, isGetDictionaryByDictonaryIdData]);

  useEffect(() => {
    if (dictionaryId && props.isEdit) {
      getDictionaryByDictonaryId(dictionaryId);
    }
  }, [dictionaryId ,props.isEdit]);

  useEffect(() => {
    if (isAddEditDictionarySuccess && addEditDictionaryData) {
      if(addEditDictionaryData.errorMessage.includes('exists')) {
        ToastService.warning(addEditDictionaryData.errorMessage);
        return;
      }
      props.onSuccess();
      ToastService.success(addEditDictionaryData.errorMessage);
      onResetData();
      props.onClose();
    }
      }, [isAddEditDictionarySuccess, addEditDictionaryData]);

  const handleDictionary = () => {
    const formData = dictionaryRef.current.getFormData();
    if (formData && !dictionaryId) {
      const requestData = {
        ...formData,
        key: formData.key ,
        value:formData.value
      };
      addEditDictionary(requestData);
    }
    else if(formData && dictionaryId){
      const requestData = {
        ...formData,
        dictionaryId,
        key: formData.key ,
        value:formData.value
      };
      addEditDictionary(requestData);
    }
  };

  const onResetData = () => {
    let formData = { ...dictionaryFormData };
    onResetForm(formData, setDictionaryData, null);
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onResetData,
  }));
    
  return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row vertical-form">
              <FormCreator
                ref={dictionaryRef}
                config={dictionaryData}
                 {...dictionaryData}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={props.isEdit ? "Update" : "Save"}
                onClick={handleDictionary}
                isLoading={isAddEditDictionaryLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={props.onClose}
              />
            </div>
          </div>
        </div>
      </div>
     
  );
};

AddEditDictionary.propTypes = {
  initData: PropTypes.shape({
    dictionaryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  isEdit: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  childRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};

export default AddEditDictionary;
