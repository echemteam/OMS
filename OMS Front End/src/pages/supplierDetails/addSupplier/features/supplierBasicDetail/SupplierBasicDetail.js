import React, { useRef, useState } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator';
import CardSection from '../../../../../components/ui/card/CardSection';
import { supplierBasicData } from '../supplierBasicDetail/config/SupplierBasicDetail.data';

const SupplierBasicDetail = (props) => {
  const basicDetailRef = useRef();
  const [formData, setFormData] = useState(supplierBasicData);
  return (
    <div className="basic-info-sec half-sec">
      <CardSection buttonClassName="theme-button">
        <div className="row horizontal-form basic-info-step">
          <FormCreator
            config={formData}
            ref={basicDetailRef}
            {...formData}
          // onActionChange={formActionHandler}
          // onInputChange={formInputHandler}
          // handleInputGroupButton={handleInputGroupButton}
          />
        </div>

        {/* {props.isOpen &&
          <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="dark-btn"
                buttonText="Cancel"
                onClick={props.onSidebarClose}
              />
              <Buttons
                buttonTypeClassName="theme-button ml-5"
                buttonText="Update"
                onClick={handleUpdate}
                isLoading={isLoading}
              // isDisable={isButtonDisable}
              />
            </div>
          </div>
        } */}

      </CardSection>
    </div>
  );
}

export default SupplierBasicDetail