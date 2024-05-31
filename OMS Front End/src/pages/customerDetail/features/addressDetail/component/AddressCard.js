import React, { useState } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import { Accordion } from "react-bootstrap";

const AddressCard = ({ isAddEditModal }) => {
  const [activeKey, setActiveKey] = useState(null);
  const addressTypes = [
    {
      addressTitle: "Shipping Address",
      addresses: [
        {
          name: "Gregory Cartwright",
          street: "936 Kiehn Route",
          city: "West Ned",
          state: "Tennessee",
          country: "USA",
          zip: "11230",
        },
        {
          name: "Jane Doe",
          street: "123 Main St",
          city: "Springfield",
          state: "Illinois",
          country: "USA",
          zip: "62704",
        },
      ],
    },
    {
      addressTitle: "Billing Address",
      addresses: [
        {
          name: "Gregory Cartwright",
          street: "936 Kiehn Route",
          city: "West Ned",
          state: "Tennessee",
          country: "USA",
          zip: "11230",
        },
        {
          name: "Jane Doe",
          street: "123 Main St",
          city: "Springfield",
          state: "Illinois",
          country: "USA",
          zip: "62704",
        },
      ],
    },
    {
      addressTitle: "AP Address",
      addresses: [
        {
          name: "Gregory Cartwright",
          street: "936 Kiehn Route",
          city: "West Ned",
          state: "Tennessee",
          country: "USA",
          zip: "11230",
        },
        {
          name: "Jane Doe",
          street: "123 Main St",
          city: "Springfield",
          state: "Illinois",
          country: "USA",
          zip: "62704",
        },
      ],
    },

  ];

  const handleToggle = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };
  return (
    <>
      <Accordion className="address-card-section" activeKey={activeKey} onSelect={handleToggle}>
        {addressTypes.map((addressType, index) => (
          <Accordion.Item
            eventKey={addressType.addressTitle.toString()}
            className={
              activeKey === addressType.addressTitle.toString() ? "active" : ""
            }
            key={index}
          >
            <div className="header-title-btn">
              <Accordion.Header>
                <div>
                  <span>{addressType.addressTitle}</span>
                </div>
              </Accordion.Header>
            </div>
            <Accordion.Body className="add-desc-part">
              <div className="row">
                {addressType.addresses.map((address, addrIndex) => (
                  <div className="col-xl-4 col-md-4 col-12" key={addrIndex}>
                    <div className="address-card">
                      <div className="add-line">
                        <span className="label-txt">{address.name}</span>
                        <span className="label-txt">{address.street}</span>
                        <span className="label-txt">{address.city}</span>
                        <span className="label-txt">{address.state}</span>
                        <span className="label-txt">
                          {address.country} - <span>{address.zip}</span>
                        </span>
                      </div>
                      <div className="edit-delete-button">
                        <button onClick={isAddEditModal} className="edit-btn">
                          <Image imagePath={AppIcons.editThemeIcon} />
                        </button>
                        <button onClick="" className="edit-btn ml-1 mr-1">
                          <Image imagePath={AppIcons.deleteThemeIcon} />
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
    </>
  );
};

export default AddressCard;
