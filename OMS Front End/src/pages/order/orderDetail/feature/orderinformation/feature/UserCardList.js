import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import Checkbox from "../../../../../../components/ui/inputs/checkBox/CheckBox";
import UserDetailsModel from "./UserDetailsModel";

const UserCardList = () => {
  return (
    <>
      <div className="contact-card card-list-popup">
        <div className="profile-name-btn">
          <div className="profile-icon-sec">PC</div>
          <div className="right-info">
            <div className="right-name-btn">
              <div className="user-name text-ellipsis">Pankaj Chauhaun</div>
              <div className="btn-sec">
                <div className="info-display info-user user-card">
                  <Iconify icon="ep:info-filled" className="info" />
                  <UserDetailsModel />
                </div>
              </div>
            </div>
            <div className="user-details">
              <div className="email">
                <Iconify icon="ic:round-email" />
                <span>pankaj@gmail.com</span>
              </div>
              <div className="number">
                <Iconify icon="mingcute:phone-fill" />
                <span>+9522 54525 454 2485</span>
              </div>
            </div>
            <span className="checkbox-sec">
              <Checkbox name="" checked="" onChange="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCardList;
