/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useState ,useRef} from "react";
//** Lib's */
import "./ApprovalValidateData.scss";
import Image from "../../../image/Image";
import Buttons from "../../../ui/button/Buttons";
import { AppIcons } from "../../../../data/appIcons";
import DataLoader from "../../../ui/dataLoader/DataLoader";
import CenterModel from "../../../ui/centerModel/CenterModel";
import { encryptUrlData } from "../../../../services/CryptoService";
import ToastService from "../../../../services/toastService/ToastService";
import PropTypes from 'prop-types';

const ApprovalValidateData = ({ parentRef, handleValidateSuccess, validateCheckList, handleDone, showModal, handleShowValidateModal, handleValidateModalClose,
  isGetCheckListLoading, mainId, isDetailPage, isSupplierApproval }) => {

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [showDoneButton, setShowDoneButton] = useState(false);
  const [showViewButton, setShowViewButton] = useState(false);
  
  useEffect(() => {
    if (validateCheckList) {
      if (currentIndex < validateCheckList.length) {
        const timer = setTimeout(() => {
          setVisibleItems((prevItems) => [
            ...prevItems,
            validateCheckList[currentIndex],
          ]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 500);

        if (currentIndex === (validateCheckList.length - 1)) {
          showButtons();
        }
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, validateCheckList]);

  useEffect(() => {
    if (showModal) {
      setCurrentIndex(0);
      setVisibleItems([]);
      setShowDoneButton(false);
      setShowViewButton(false);
    }
  }, [showModal])

  const boldSpecificWords = (text) => {
    const wordsToBold = ["TaxId","Billing Address", "Shipping Address", "Invoice Submission Contact Email","Accounts Payable Contact Email","Default Payment Terms Template","Payment Method","Credit Limit","Billing Currency","Accounting Settings","Delivery Methods","Delivery Carriers"];
    const regex = new RegExp(`\\b(${wordsToBold.join("|")})\\b`, "g");
    return text.replace(
      regex,
      '<strong class="bold-text validate-title">$1</strong>'
    );
  };

  const showButtons = () => {
    const allDone = visibleItems.some(data => data.isValid === false);
    if (!allDone) {
      setShowDoneButton(true);
      setShowViewButton(false);
    } else {
      setShowDoneButton(false);
      setShowViewButton(true);
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleItems]);

  const handleRedirectToDetails = () => {
    let url;
    if (isSupplierApproval) {
      url = `/SupplierDetails/${encryptUrlData(mainId)}`;
    } else {
      url = `/CustomerDetails/${encryptUrlData(mainId)}`;
    }
    window.open(url, "_blank");
  }

  const validateApprovalCheckList = () => {
    const allDone = visibleItems.some(data => data.isValid === false)
    if (allDone) {
      ToastService.warning("Please fill the ")
    } else {
      handleValidateSuccess();
    }
  }

  useImperativeHandle(parentRef, () => ({
    validateApprovalCheckList,
  }));

  return (
     
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-lg-4">
              <div className="d-flex align-item-center justify-content-center">
                <div className="d-flex align-item-center">
                  {showDoneButton ?
                    <Buttons buttonTypeClassName="theme-button" buttonText="Done" onClick={handleDone} />
                    : null}
                  {!isDetailPage && showViewButton ?
                    <Buttons buttonTypeClassName="theme-button ml-5" buttonText={isSupplierApproval ? 'View Supplier Details' : 'View Customer Details'}
                      onClick={handleRedirectToDetails} /> :
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
     
  );
};

ApprovalValidateData.propTypes = {
  parentRef: PropTypes.shape({
    current: PropTypes.shape({
      validateApprovalCheckList: PropTypes.func
    })
  }).isRequired,
  handleValidateSuccess: PropTypes.func.isRequired,
  validateCheckList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isValid: PropTypes.bool,
    messages: PropTypes.string
  })).isRequired,
  handleDone: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleShowValidateModal: PropTypes.func.isRequired,
  handleValidateModalClose: PropTypes.func.isRequired,
  isGetCheckListLoading: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  isDetailPage: PropTypes.bool,
  isSupplierApproval: PropTypes.bool.isRequired
};
export default ApprovalValidateData;
