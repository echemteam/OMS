/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import { useLazyGetCustomersInfoByIdQuery } from "../../../../../../app/services/ApprovalAPI";

const CustomerDetailsModel = ({ customerId }) => {
  const [customerBasicDetails, setCustomerBasicDetails] = useState(null);

  const [
    getCustomerDetailsByCustomerId,
    {
      isFetching: isCustomerFetching,
      isSuccess: isCustomerFetched,
      data: customerByIdData,
    },
  ] = useLazyGetCustomersInfoByIdQuery();

  const getInitials = (firstName, lastName) => {
    return (
      (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase()
    );
  };

  useEffect(() => {
    if (customerId) {
      getCustomerDetailsByCustomerId(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    if (!isCustomerFetching && isCustomerFetched && customerByIdData) {
      setCustomerBasicDetails(customerByIdData);
    }
  }, [isCustomerFetching, isCustomerFetched, customerByIdData]);

  return (
    <>
      <div className="customer-popup-sec">
        <div className="popup-body-sec">
          <div className="name-icon-status">
            <div className="icon-sec">
              {getInitials(
                customerBasicDetails?.name,
                customerBasicDetails?.name
              )}
            </div>
            <div className="name-status">
              <div className="name-sec">{customerBasicDetails?.name}</div>
              <div className="status-sec pending">
                {customerBasicDetails?.status}
              </div>
            </div>
          </div>
          <div className="desc-sec-bottom">
            {/* Email Start */}
            <div className="icon-detail">
              <span className="icon-part">
                <Iconify icon="ic:round-email" />
              </span>
              <span className="info-part">
                <div class="values">{customerBasicDetails?.emailAddress}</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Email End */}
            {/* Phone Start */}
            <div className="icon-detail">
              <span className="icon-part contact-icon">
                <Iconify icon="ic:round-phone" />
              </span>
              <span className="info-part contact-info ">
                <div class="values">+91 9173010672</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Phone End */}
            {/* Web Start */}
            <div className="icon-detail">
              <span className="icon-part web-icon">
                <Iconify icon="mdi:web" />
              </span>
              <span className="info-part">
                <div class="values">{customerBasicDetails?.website}</div>
              </span>
            </div>
            {/* Web End */}
          </div>
          <div className="customer-detail">
            <div className="key-value">
              <div className="key-part">R-User</div>
              <div className="value-part">
                {customerBasicDetails?.responsibleUserName}
              </div>
            </div>
            <div className="key-value">
              <div className="key-part">Country</div>
              <div className="value-part">
                {customerBasicDetails?.countryName}
              </div>
            </div>
            <div className="key-value">
              <div className="key-part">tax Id</div>
              <div className="value-part">
                {customerBasicDetails?.taxId}
              </div>
            </div>
            <div className="key-value">
              <div className="key-part">Group Type</div>
              <div className="value-part">
                {customerBasicDetails?.type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetailsModel;
