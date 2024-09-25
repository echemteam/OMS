/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";
import { useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery } from "../../../../app/services/customerSettingsAPI";
import Iconify from "../../../ui/iconify/Iconify";

const ShippingSetting = ({
  isModelOpen,
  mainId,
  approvalChekedData,
  handleCheckbox,
}) => {
  //** State */
  const [shippingInformation, setShippingInformation] = useState();
  const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
  const [deliveryCarriersList, setDeliveryCarriersList] = useState([]);

  const [openSections, setOpenSections] = useState([true]);

  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );

  //** API Call's */
  const [
    getDefaultList,
    {
      isFetching: isGetDefaultValueFetching,
      isSuccess: isGetDefaultValueSuccess,
      data: isGetDefaultValueData,
    },
  ] = useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getDefaultList(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetDefaultValueFetching &&
      isGetDefaultValueSuccess &&
      isGetDefaultValueData
    ) {
      setShippingInformation(isGetDefaultValueData);
      setDeliveryMethodsList(
        isGetDefaultValueData.deliveryMethodsList.filter(
          (data) => data.isPrimary
        )
      );
      isGetDefaultValueData.shppingDeliveryCarriersList &&
        setDeliveryCarriersList(
          isGetDefaultValueData.shppingDeliveryCarriersList.filter(
            (data) => data.isPrimary
          )
        );
    }
  }, [
    isGetDefaultValueFetching,
    isGetDefaultValueSuccess,
    isGetDefaultValueData,
  ]);

  const handleChange = (checkedValue, newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue, newValue);
  };

  // Toggle active section
  const toggleSection = (index) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the clicked section
    setOpenSections(updatedSections);
  };
  return (
    <>
      <div className={`card-top-title ${openSections[0] ? 'active' : ''}`}  onClick={() => toggleSection(0)}>
        <div className="d-flex align-items-center mr-2">
          <span>
            <Iconify icon="ep:arrow-down-bold" className="open-bar" />
          </span>
          <h5> Shipping Information </h5>
        </div>
        <div className="checkbox-part">
          <Checkbox
            name={"shippingsettingInformation"}
            dataField={"shippingsettingInformation"}
            checked={isChecked || false}
            onChange={handleChange}
          />
        </div>
      </div>
      {openSections[0] && (
        <div className="card-info-checklist">
          {shippingInformation && (
            <div className="card-part">
              <h6 className="name-title">
                <span className="label">Account Type:</span>
                <p
                  className="name-desc"
                  style={{
                    color: "var(--themeColor)",
                    fontSize: "var(--commonFont)",
                    fontWeight: "700",
                  }}
                >
                  {shippingInformation.name}
                </p>
              </h6>
              {deliveryMethodsList.length > 0 && (
                <h6 className="title mt-4 mb-0">Delivery Method Details: </h6>
              )}
              {deliveryMethodsList.length > 0 &&
                deliveryMethodsList.map((data, index) => (
                  <>
                    {/* This div used for the line */}
                    <div
                      className="card-part"
                      style={{ paddingBottom: "1px" }}
                      key={index}
                    ></div>
                    <h6 className="name-title">
                      <span className="label">Zone:</span>
                      <p className="name-desc">
                        {data.isForInternational ? "International" : "Domestic"}
                      </p>
                    </h6>
                    <h6 className="name-title">
                      <span className="label">Charge Type:</span>
                      <p className="name-desc">{data.name}</p>
                    </h6>
                    <h6 className="name-title">
                      <span className="label">Charge:</span>
                      <p className="name-desc">{data.charge}</p>
                    </h6>
                  </>
                ))}
              {deliveryCarriersList.length > 0 && (
                <h6 className="title mt-4 mb-0">Carrier Details: </h6>
              )}
              {deliveryCarriersList.length > 0 &&
                deliveryCarriersList.map((data, index) => (
                  <>
                    {/* This div used for the line */}
                    <div
                      className="card-part"
                      style={{ paddingBottom: "1px" }}
                      key={index}
                    ></div>
                    <h6 className="name-title">
                      <span className="label">Carrier:</span>
                      <p className="name-desc">{data.carrier}</p>
                    </h6>
                    <h6 className="name-title">
                      <span className="label">AccountNumber:</span>
                      <p className="name-desc">{data.accountNumber}</p>
                    </h6>
                  </>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
ShippingSetting.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getFinacialSettingById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool,
  }),
  handleCheckbox: PropTypes.func.isRequired,
};

export default ShippingSetting;
