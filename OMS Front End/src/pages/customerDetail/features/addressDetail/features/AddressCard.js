import React, { useState } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import { Accordion } from "react-bootstrap";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";

const AddressCard = ({ isAddEditModal, addressData, onHandleSetData, isGetByIdLoading }) => {

  const [activeKey, setActiveKey] = useState("0");

  const handleToggle = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };

  if (!isGetByIdLoading) {
    if (!Array.isArray(addressData) || addressData.length === 0) {
      return <div className="no-address"><NoRecordFound /></div>;
    }
  }


  const groupedAddresses = Array.isArray(addressData)
    ? addressData.reduce((acc, address) => {
      if (!acc[address.addressTypeId]) {
        acc[address.addressTypeId] = [];
      }
      acc[address.addressTypeId].push(address);
      return acc;
    }, {})
    : {};


  const handleEdit = (data) => {
    isAddEditModal()
    onHandleSetData(data)
  }

  return (
    !isGetByIdLoading ?
      <Accordion className="address-card-section" activeKey={activeKey} onSelect={handleToggle}>
        {Object.keys(groupedAddresses).map((addressTypeId, index) => (
          <Accordion.Item
            eventKey={index.toString()} className={activeKey === index.toString() ? "active" : ""}
            // eventKey={addressTypeId}
            // className={activeKey === addressTypeId ? "active" : ""}
            key={addressTypeId}
          >
            <div className="header-title-btn">
              <Accordion.Header>
                <div>
                  <span>{groupedAddresses[addressTypeId][0].type}</span>
                </div>
              </Accordion.Header>
            </div>
            <Accordion.Body className="add-desc-part">
              <div className="row">
                {groupedAddresses[addressTypeId].map((address, addrIndex) => (
                  <div className="col-xxl-4 col-xl-6 col-md-6 col-12" key={addrIndex}>
                    <div className="address-card">
                      <div className="add-line">
                        <span className="label-txt">{address.addressLine1}</span>
                        <span className="label-txt">{address.addressLine2}</span>
                        <span className="label-txt">{address.cityName}</span>
                        <span className="label-txt">{address.stateName}</span>
                        <span className="label-txt">
                          {address.countryName} - <span>{address.zipCode}</span>
                        </span>
                      </div>
                      <div className="edit-delete-button">
                        <button onClick={() => handleEdit(address)} className="edit-btn">
                          <Image imagePath={AppIcons.editThemeIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      : <DataLoader />
  );
};

{/* <button onClick="" className="edit-btn ml-1 mr-1">
                          <Image imagePath={AppIcons.deleteThemeIcon} />
                        </button> */}

export default AddressCard;
