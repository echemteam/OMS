import React from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";

const AddressCard = ({ isAddEditModal }) => {
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
        // Add more addresses as needed
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
        // Add more addresses as needed
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
        // Add more addresses as needed
      ],
    },
    // Add more address groups as needed
  ];

  return (
    <>
      <div className="row">
        {addressTypes.map((addressType, index) => (
          <div key={index} className="col-xl-4 col-md-4 col-12">
            <div className="address-card-section">
              <div className="address-type-title">
                <p>{addressType.addressTitle}</p>
              </div>
              <div className="add-desc-part">
                {addressType.addresses.map((address, addrIndex) => (
                  <div className="address-card" key={addrIndex}>
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
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressCard;
