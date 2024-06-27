import React, { useEffect, useState } from "react";
//** Lib's */
import './ApprovalValidateData.scss';
import Image from "../../image/Image";
import Buttons from "../../ui/button/Buttons";
import { AppIcons } from "../../../data/appIcons";
import DataLoader from "../../ui/dataLoader/DataLoader";
import CenterModel from "../../ui/centerModel/CenterModel";

const ApprovalValidateData = ({ validateCheckList, handleDone, showModal, handleToggleModal, isGetCheckListLoading }) => {

  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < validateCheckList.length) {
      const timer = setTimeout(() => {
        setVisibleItems(prevItems => [...prevItems, validateCheckList[currentIndex]]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, validateCheckList]);

  const boldSpecificWords = (text) => {
    const wordsToBold = ['TaxId', 'Address', 'Contact'];
    const regex = new RegExp(`\\b(${wordsToBold.join('|')})\\b`, 'g');
    return text.replace(regex, '<strong class="bold-text validate-title">$1</strong>');
  };

  return (
    <CenterModel modalTitle="Validate Customer Information" showModal={showModal}
      handleToggleModal={handleToggleModal} modelSizeClass="w-40">
      {!isGetCheckListLoading ?
        <div className="Validate-card row">
          <div className="col-12">
            <div className="customer-data-sec">
              <div className="validation-list">
                <ul>
                  {visibleItems.map((item) => (
                    <li key={item.id} className={item.isValid ? 'success' : 'error'}>
                      <span className="tick-untick-img">
                        <Image imagePath={item.isValid ? AppIcons.RightTickIcon : AppIcons.UnTickIcon} />
                      </span>
                      <span
                        className="validation-msg"
                        dangerouslySetInnerHTML={{ __html: boldSpecificWords(item.messages) }}
                      />
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
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Done"
                  // isLoading={isAddEditLoading}
                  onClick={handleDone}
                // isDisable={isButtonDisable}
                />
                {/* <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={handleToggleModal}
                /> */}
              </div>
            </div>
          </div>
        </div>
        : <DataLoader />
      }
    </CenterModel>
  );
};

export default ApprovalValidateData;
