import React, { useRef, useState } from "react";
import { contactInformationData } from "./config/ContactDetail.data";
import FormCreator from "../../../../components/Forms/FormCreator";

const ContactDetails = () => {
  const basicInformation = useRef();
  const [formData, setFormData] = useState(contactInformationData);

  return (
    
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
        />
      </div>
    
  );
};

export default ContactDetails;
