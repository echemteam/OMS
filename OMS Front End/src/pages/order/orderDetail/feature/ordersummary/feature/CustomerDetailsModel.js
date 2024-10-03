import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";

const CustomerDetailsModel = () => {
  return (
    <>
      <div className="customer-popup-sec">
        <div className="popup-body-sec">
          <div className="name-icon-status">
            <div className="icon-sec">AB</div>
            <div className="name-sec">Arcus Bioscience Inc.</div>
            <div className="status-sec pending">Pending</div>
          </div>
          <div className="desc-sec-bottom">
            {/* Email Start */}
            <div className="icon-detail">
              <span className="icon-part">
                <Iconify icon="ic:round-email" />
              </span>
              <span className="info-part">
                <div class="values">alexmurphy@gmail.com</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Email End */}
            {/* Phone Start */}
            <div className="icon-detail">
              <span className="icon-part">
                <Iconify icon="ic:round-phone" />
              </span>
              <span className="info-part">
                <div class="values">+91 9173010672</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Phone End */}
            {/* Web Start */}
            <div className="icon-detail">
              <span className="icon-part">
                <Iconify icon="mdi:web" />
              </span>
              <span className="info-part">
                <div class="values">www.google.com</div>
              </span>
            </div>
            {/* Web End */}
          </div>
          <div className="customer-detail">
            <div className="key-value">
              <div className="key-part">R-User</div>
              <div className="value-part">&nbsp;:&nbsp; Alex Murphy</div>
            </div>
            <div className="key-value">
              <div className="key-part">Country</div>
              <div className="value-part">&nbsp;:&nbsp; United States</div>
            </div>
            <div className="key-value">
              <div className="key-part">tax Id</div>
              <div className="value-part">&nbsp;:&nbsp; 45525452</div>
            </div>
            <div className="key-value">
              <div className="key-part">Group Type</div>
              <div className="value-part">&nbsp;:&nbsp; Commercial</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetailsModel;
