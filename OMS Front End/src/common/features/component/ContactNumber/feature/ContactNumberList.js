/* eslint-disable react-hooks/exhaustive-deps */
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import { phoneNumberConfig } from "../config/AddEditContactsForm.data";
import CardSection from "../../../../../components/ui/card/CardSection";
import PropTypes from "prop-types";
import FinalMolGrid from "../../../../../components/FinalMolGrid/FinalMolGrid";
import { useEffect, useState } from "react";

const ContactNumberList = ({
  phoneNumberList,
  molGridRef,
  handleToggleModal,
  actionHandler,
  isButtonDisable,
  handleCheckBoxChange,
}) => {
  const [sortedPhoneNumberList, setSortedPhoneNumberList] = useState([]);

  useEffect(() => {
    const hasNewEntries = phoneNumberList.some((phone) => !phone.phoneId);
    if (phoneNumberList) {
      if (hasNewEntries) {
        // Sort the list by id in descending order
        const sortedList = phoneNumberList.sort((a, b) => b.id - a.id);
        setSortedPhoneNumberList(sortedList);
      } else {
        // Update the state without sorting
        setSortedPhoneNumberList(phoneNumberList);
      }
    }
  }, [phoneNumberList]);

  useEffect(() => {
    const customActionExist = phoneNumberConfig && phoneNumberConfig.columns?.find(action => action?.fieldName === "isPrimary");
    if (isButtonDisable) {
      customActionExist.colSettings.isDisabled = true;
    } else {
      customActionExist.colSettings.isDisabled = false;
    }
  }, [isButtonDisable]);

  const handleGridCheckBoxChange = (fieldName, rowData) => {
    if (fieldName === "isPrimary") {
      handleCheckBoxChange(rowData);
    }
  };

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-2 table-email-sec">
      <CardSection
        cardTitle="Phone Numbers"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={!isButtonDisable}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <div className="row">
          <div className="col-md-12 table-striped p-0">
            <FinalMolGrid
              ref={molGridRef}
              configuration={phoneNumberConfig}
              dataSource={sortedPhoneNumberList}
              allowPagination={false}
              onActionChange={actionHandler}
              onColumnChange={handleGridCheckBoxChange}
            />
          </div>
        </div>
      </CardSection>
    </div>
  );
};
ContactNumberList.propTypes = {
  phoneNumberList: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
      phoneCode: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      phoneTypeId: PropTypes.number,
      phoneType: PropTypes.string,
      isPrimary: PropTypes.bool,
      extension: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  molGridRef: PropTypes.object,
  handleToggleModal: PropTypes.func.isRequired,
  actionHandler: PropTypes.object.isRequired,
  isButtonDisable: PropTypes.bool.isRequired,
};
export default ContactNumberList;
