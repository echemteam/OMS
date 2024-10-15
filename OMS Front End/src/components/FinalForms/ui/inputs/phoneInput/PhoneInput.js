import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const Phone = ({
  defaultCountry = 'us',
  value,
  onBlur,
  onChange,
  isDisable = false,
  isReadOnly = false,
  placeholder,
}) => {
  
  const [inputAttributes, setInputAttributes] = useState({});
  
  useEffect(() => {
    const newAttribute = {};
    if (isReadOnly) {
      newAttribute.readOnly = true;
    }
    setInputAttributes(newAttribute);
  }, [isReadOnly]);

  const handleInputChange = (phone) => {
    if (onChange) {
      onChange(phone);
    }
  };

  return (
    <div className="phone-input-component">
      <PhoneInput
        defaultCountry={defaultCountry}
        value={value}
        onBlur={onBlur}
        onChange={handleInputChange}
        disabled={isDisable}
        placeholder={placeholder}
        {...inputAttributes}
        className="input-field-phone"
      />
    </div>
  );
};

Phone.propTypes = {
  defaultCountry: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisable: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Phone;
