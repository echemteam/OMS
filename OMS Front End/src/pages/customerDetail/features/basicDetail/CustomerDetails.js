import React from "react";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import CopyText from "../../../../utils/CopyText/CopyText";

const CustomerDetails = ({ editClick, customerData }) => {
  return (
    <>
      <div className="basic-customer-detail">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="profile-info">
            <div className="profile-icon-desc">
              <div className="d-flex align-items-center">
                <div className="profile-icon"> {customerData?.name ? customerData?.name.charAt(0).toUpperCase() : ""}</div>
                <h5>{customerData?.name}</h5>
              </div>
              <div className="edit-icons" onClick={editClick}>
                <Image
                  imagePath={AppIcons.editThemeIcon}
                  altText="Website Icon"
                />
              </div>
            </div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Email</div>
            <b>&nbsp;:&nbsp;</b>
            <a className="email-link" href={`mailto:${customerData?.emailAddress}`}>
              <div className="info-desc">{customerData?.emailAddress}</div>
            </a>
            <span className="copy-icon" onClick={() => CopyText(customerData?.emailAddress, 'email')}>
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>

          </div>
          <div className="field-desc">
            <div className="inf-label">Website</div>
            <b>&nbsp;:&nbsp;</b>

            <div className="info-desc">{customerData?.website}</div>

            <span className="copy-icon" onClick={() => CopyText(customerData?.website, 'website')}>
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>

          </div>

          <div className="field-desc">
            <div className="inf-label">Country</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.countryName}</div>
          </div>

          <div className="field-desc">
            <div className="inf-label">Group Type</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.type}</div>
          </div>

          <div className="field-desc">
            <div className="inf-label">Territory</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.territory}</div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Tax Id</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.taxId}</div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Is Company</div>
            <b>&nbsp;:&nbsp;</b>
            <div className="info-desc">{customerData?.isCompany}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
