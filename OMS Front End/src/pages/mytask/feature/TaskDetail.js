import React from "react";
import { Button } from "react-bootstrap";
import { AppIcons } from "../../../data/appIcons";

import Image from "../../../components/image/Image";
import RenderTabs from "../../../components/ui/tabs/RenderTabs";

const TaskDetail = () => {
  
  return (
    <div className="task-detail">
      <div className="task-head">
        <div className="d-flex align-items-center">
          <span className="profile-icon">PD</span>
          <div className="title">
            Praful Desai
            <span className="sub-title">UI/UX Developer</span>
          </div>
        </div>
        <div>
          <div className="date">25 June,2024</div>
          <div className="view-customer">
            <Image imagePath={AppIcons.Iicon} altText="Icon" />
            View Customer
          </div>
        </div>
      </div>

      <div className="customer-information">
        <h3 className="info-title">Customer Information Update</h3>
        <p className="info-detail">
          (Description-Reason for Change): Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
        <div>
          <span className="customer-id">Customer Id : 123456</span>
          <span className="customer-name">Customer Name : Praful Desai</span>
        </div>

        <div className="d-flex ">
          <div className="old-detail col-6">
            <h3 className="detail-head">Old Details</h3>
            <div className="detail">
              <div className="detail-btn mb-2">Address</div>
              <div>Address Line 1 : Ahmedabad</div>
              <div>Zip Code : 456321</div>

              <div className="detail-btn mt-2 mb-2">Contact</div>
              <div>First Name : Admin</div>
              <div>Contact Type : Primary</div>
            </div>
          </div>
          <div className="new-detail col-6">
            <h3 className="detail-head">New Details</h3>
            <div className="detail">
              <div className="detail-btn mb-2">Address</div>
              <div>Address Line 1 : Ahmedabad</div>
              <div>Zip Code : 456321</div>
              <div className="detail-btn mt-2 mb-2">Contact</div>
              <div>First Name : Kirtan Patel</div>
              <div>Contact Type : Purchasing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="task-footer">
        <Button className="reject-btn">
          <Image imagePath={AppIcons.CloseIcon} altText="Icon" />
          Reject
        </Button>
        <Button className="accept-btn">
          <Image imagePath={AppIcons.RightTickIcon} altText="Icon" />
          Accept
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;
