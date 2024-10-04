import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";

const UserDetailsModel = () => {
  return (
    <>
      <div className="customer-popup-sec">
        <div className="popup-body-sec">
          <div className="name-icon-status">
            <div className="icon-sec">sp</div>
            <div className="name-status">
              <div className="name-sec">shiva parmar</div>
              {/* <div className="status-sec pending">Pending</div> */}
            </div>
          </div>
          <div className="desc-sec-bottom user-desc">
            {/* Email Start */}
            <div className="icon-detail">
              <span className="icon-part">
                <Iconify icon="ic:round-email" />
              </span>
              <span className="info-part email-list">
                <div class="values">testin@gmail.com</div>
                <div class="values primary-email">testin@gmail.com</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Email End */}
            {/* Phone Start */}
            <div className="icon-detail">
              <span className="icon-part contact-icon">
                <Iconify icon="ic:round-phone" />
              </span>
              <span className="info-part contact-info">
                <div class="values">+91 9173010672</div>
                <div class="values primary-email">+91 9173010672</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Phone End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModel;
