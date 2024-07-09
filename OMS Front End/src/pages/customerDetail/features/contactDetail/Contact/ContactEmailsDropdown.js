import React, { useRef } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import CopyText from "../../../../../utils/CopyText/CopyText";

const ContactEmailsDropdown = ({ showEmailDropdown, setShowEmailDropdown, primaryEmailAddres, emailAddresses }) => {

    const ref = useRef(null);
    const toggleEmailDropdown = () => {
        setShowEmailDropdown(!showEmailDropdown);
    };


    return (
        <React.Fragment>
            <div className="label-txt d-flex align-items-center email-sec">
                <Image imgCustomClassName="contact-icon-img" imagePath={AppIcons.Mail} altText="contact icon" />
                <div className="fix-data">
                    {primaryEmailAddres ?
                        <div className="d-flex align-items-center mb-0">
                            <div className="card-value">
                                {primaryEmailAddres?.emailAddres}
                            </div>
                            <span className="copy-icon" onClick={() => CopyText(primaryEmailAddres?.emailAddres, "email")}>
                                <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                            </span>
                        </div>
                        : null}
                </div>
            </div>
            <div className="drop-down" ref={ref} onClick={toggleEmailDropdown} >
                <i className={`fa fa-caret-down ${showEmailDropdown ? "rotated" : ""}`} aria-hidden="true" ></i>
                {showEmailDropdown && (
                    <div className="dropdown-content show">
                        {emailAddresses.map((emaildata, index) => (
                            <>
                                <span
                                    className="contact-list d-flex flex-row" key={index}>
                                    <span>{emaildata?.emailAddres}</span>
                                    <span className="copy-icon" onClick={() => CopyText(emaildata?.emailAddres, "email")}>
                                        <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                                    </span>
                                </span>
                            </>
                        ))}
                    </div>
                )}
            </div>

        </React.Fragment>
    )
}

export default ContactEmailsDropdown;