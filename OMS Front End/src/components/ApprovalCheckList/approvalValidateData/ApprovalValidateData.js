import React, { useEffect, useState } from "react";
//** Lib's */
import "./ApprovalValidateData.scss";
import Image from "../../image/Image";
import Buttons from "../../ui/button/Buttons";
import { AppIcons } from "../../../data/appIcons";
import DataLoader from "../../ui/dataLoader/DataLoader";
import CenterModel from "../../ui/centerModel/CenterModel";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { encryptUrlData } from "../../../services/CryptoService";

const ApprovalValidateData = ({
  validateCheckList,
  handleDone,
  showModal,
  handleShowValidateModal,
  handleValidateModalClose,
  isGetCheckListLoading,
  customerId,
  isDetailPage
}) => {

  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    if (currentIndex < validateCheckList.length) {
      const timer = setTimeout(() => {
        setVisibleItems((prevItems) => [
          ...prevItems,
          validateCheckList[currentIndex],
        ]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, validateCheckList]);

  useEffect(() => {
    if (showModal) {
      setCurrentIndex(0);
      setVisibleItems([]);
    }
  }, [showModal])

  const boldSpecificWords = (text) => {
    const wordsToBold = ["TaxId", "Address", "Contact"];
    const regex = new RegExp(`\\b(${wordsToBold.join("|")})\\b`, "g");
    return text.replace(
      regex,
      '<strong class="bold-text validate-title">$1</strong>'
    );
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleItems]);

  const handleRedirectToDetails = () => {
    const url = `/viewCustomer/${encryptUrlData(customerId)}`;
    window.open(url, "_blank");
    // handleValidateModalClose();
  }

  return (
    <>
      <CenterModel modalTitle="Validate Customer Information" showModal={showModal} handleToggleModal={handleShowValidateModal}
        modelSizeClass="w-40 validation-center-model" isApprovalValidate={true}>
        {!isGetCheckListLoading ? (
          <div className="Validate-card row">
            <div className="col-12">
              <div className="customer-data-sec">
                <div ref={scrollRef} className="validation-list">
                  <ul>
                    {visibleItems.map((item) => (
                      <li key={item.id} className={item.isValid ? "success" : "error"} >
                        <span className="tick-untick-img">
                          <Image imagePath={item.isValid ? AppIcons.RightTickIcon : AppIcons.UnTickIcon} />
                        </span>
                        <span className="validation-msg" dangerouslySetInnerHTML={{ __html: boldSpecificWords(item.messages), }} />
                        {/* <span className="validation-msg">{item.messages}</span> */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-lg-4">
              <div className="d-flex align-item-center justify-content-center">
                <div className="d-flex align-item-center">
                  <Buttons buttonTypeClassName="theme-button" buttonText="Done" onClick={handleDone} />
                  {!isDetailPage && visibleItems.some(data => data.isValid === false) ?
                    <Buttons buttonTypeClassName="theme-button ml-5" buttonText="Redirect to Detail" onClick={handleRedirectToDetails} /> :
                    null}
                  <Buttons buttonTypeClassName="dark-btn ml-5" buttonText="Cancel" onClick={handleValidateModalClose} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DataLoader />
        )}
      </CenterModel>
    </>
  );
};

export default ApprovalValidateData;
