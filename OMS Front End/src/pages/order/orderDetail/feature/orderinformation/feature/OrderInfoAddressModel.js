import React, { useState } from "react";
import Checkbox from "../../../../../../components/ui/inputs/checkBox/CheckBox";
import Buttons from "../../../../../../components/ui/button/Buttons";

const OrderInfoAddressModel = ({ onUpdate }) => {
  const addresses = [
    {
      id: 1,
      name: "Chemistry Research Laboratory",
      addressLine1: "Mansfield Road",
      addressLine2: "Oxford",
      addressLine3: "United Kingdom, Oxfordshire OX1 3TA",
      isChecked: false,
    },
    {
      id: 2,
      name: "Physics Research Center",
      addressLine1: "University Avenue",
      addressLine2: "Cambridge",
      addressLine3: "United Kingdom, Cambridgeshire CB2 1TN",
      isChecked: false,
    },
  ];
  const [selectedAddresses, setSelectedAddresses] = useState(
    addresses.map((addr) => ({ ...addr, isChecked: addr.isChecked }))
  );

  const handleCheckboxChange = (id) => {
    setSelectedAddresses((prev) =>
      prev.map((address) =>
        address.id === id
          ? { ...address, isChecked: !address.isChecked }
          : address
      )
    );
  };

  return (
    <div className="add-list-section">
      <div className="row">
        {selectedAddresses.map((address) => (
          <div
            className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12"
            key={address.id}
          >
            <div className="address-card-main">
              <div className="add-desc">
                <div className="add-line-part first-add-sec">
                  <span className="add-info">{address.name}</span>
                  <span className="checkbox-part">
                    <Checkbox
                      name={`addressId_${address.id}`}
                      checked={address.isChecked}
                      onChange={() => handleCheckboxChange(address.id)}
                    />
                  </span>
                </div>
                <div className="add-line-part">{address.addressLine1}</div>
                <div className="add-line-part">{address.addressLine2}</div>
                <div className="add-line-part">{address.addressLine3}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex align-item-end justify-content-end mt-3">
        <Buttons
          buttonTypeClassName="theme-button"
          buttonText="Save"
        />
        <Buttons
          buttonTypeClassName="theme-button ml-3"
          buttonText="Update"
          onClick={onUpdate}
        />
      </div>
    </div>
  );
};

export default OrderInfoAddressModel;
