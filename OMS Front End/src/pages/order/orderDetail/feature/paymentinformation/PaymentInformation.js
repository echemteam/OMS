/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { COUNTRYUSA, ZoneEnum } from "./Config/Payment.Data";
import CardSection from "../../../../../components/ui/card/CardSection";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import { useLazyGetOrganizationBusinessAddressesQuery } from "../../../../../app/services/organizationAPI";
import { useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery, useLazyGetDetailsbyCustomerIDQuery, useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery } from "../../../../../app/services/customerSettingsAPI";

const PaymentInformation = ({ orderDetails }) => {

  const [accountType, setAccountType] = useState('');
  const [carriersDetails, setCarriersDetails] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [financialinancialInfo, setFinancialInfo] = useState({});

  const [getDetailsbyCustomerID, { isFetching: isGetDetailsbyCustomerIdFetching, data, isSuccess: isGetDetailsbyCustomerID }] = useLazyGetDetailsbyCustomerIDQuery();
  const [getAllPaymentTerms, { isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getAllPaymentMethod, { isSuccess: isGetAllPaymentMethodSuccess, data: isGetAllPaymentMethodData }] = useLazyGetAllPaymentMethodQuery();
  const [getRegisteredAddresses, { isSuccess: isgetRegisteredAddressesSuccess,
    data: isgetRegisteredAddressesData }] = useLazyGetOrganizationBusinessAddressesQuery();
  const [getDefaultList, { isFetching: isGetDefaultValueFetching, isSuccess: isGetDefaultValueSuccess,
    data: isGetDefaultValueData }] = useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery();


  useEffect(() => {
    if (orderDetails && orderDetails.customerId) {
      getAllPaymentTerms();
      getAllPaymentMethod();
      getRegisteredAddresses();
      getDefaultList(orderDetails.customerId);
      getDetailsbyCustomerID(orderDetails.customerId);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (isGetDetailsbyCustomerID && data) {
      console.log(data)
      setFinancialInfo(data);
    }
  }, [isGetDetailsbyCustomerID, data]);

  useEffect(() => {
    if (!isGetDefaultValueFetching && isGetDefaultValueSuccess && isGetDefaultValueData && isgetRegisteredAddressesSuccess && isgetRegisteredAddressesData) {
      setAccountType(isGetDefaultValueData.name);
      if (isGetDefaultValueData?.deliveryMethodsList?.length > 0 && isgetRegisteredAddressesData.registeredAddress.countryId && isgetRegisteredAddressesData.registeredAddress.countryName) {
        const countryId = isgetRegisteredAddressesData.registeredAddress.countryId;
        const countryName = isgetRegisteredAddressesData.registeredAddress.countryName.trim();
        const isCountryUSA = countryId === 233 && countryName.toLowerCase() === COUNTRYUSA.toLowerCase();
        const primaryDeliveryMethod = isGetDefaultValueData?.deliveryMethodsList?.find(data => data.isPrimary && data?.isForInternational === !isCountryUSA);
        if (primaryDeliveryMethod) {
          const updatedPrimaryDeliveryMethod = {
            ...primaryDeliveryMethod,
            zone: primaryDeliveryMethod.isForInternational ? ZoneEnum.INTERNATIONAL : ZoneEnum.DOMESTIC
          };
          setDeliveryDetails(updatedPrimaryDeliveryMethod);
        } else {
          setDeliveryDetails({});
        }
      } else if (isGetDefaultValueData?.deliveryMethodsList?.length === 0) {
        setDeliveryDetails({});
      }
      if (isGetDefaultValueData?.shppingDeliveryCarriersList?.length > 0) {
        const primaryCarriersMethod = isGetDefaultValueData?.shppingDeliveryCarriersList?.find((data) => data.isPrimary);
        setCarriersDetails(primaryCarriersMethod);
      } else if (isGetDefaultValueData?.shppingDeliveryCarriersList?.length === 0) {
        setCarriersDetails({});
      }
    }
  }, [isGetDefaultValueFetching, isGetDefaultValueSuccess, isGetDefaultValueData, isgetRegisteredAddressesSuccess, isgetRegisteredAddressesData]);

  const getPaymentMethod = (id) => {
    const method = isGetAllPaymentMethodSuccess && isGetAllPaymentMethodData && isGetAllPaymentMethodData.find((method) => method.paymentMethodId === id);
    return method ? method.method : "N/A";
  };
  const getPaymentTerm = (id) => {
    const term = isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData && isGetAllPaymentTermsData.find((term) => term.paymentTermId === id);
    return term ? term.paymentTerm : "N/A";
  };

  return (
    <div>
      <CardSection cardTitle="Payment Information">
        <div className="row">
          <div className="col-xxl-5 col-lg-5 col-md-6 col-12">
            {!isGetDetailsbyCustomerIdFetching && financialinancialInfo ?
              <div className="financial-section">
                <div className="financial-label">Financial</div>
                <div className="financial-keyvalue-pair">
                  <div className="financial-key">Default Payment Terms :</div>
                  <div className="financial-value">{getPaymentTerm(financialinancialInfo.paymentTermId) || "N/A"}</div>
                </div>
                <div className="financial-keyvalue-pair">
                  <div className="financial-key">Credit Limit :</div>
                  <div className="financial-value">{financialinancialInfo.creditLimit !== undefined ? financialinancialInfo.creditLimit : "N/A"}</div>
                </div>
                <div className="financial-keyvalue-pair">
                  <div className="financial-key">Payment Method :</div>
                  <div className="financial-value">{getPaymentMethod(financialinancialInfo.paymentMethodId) || "N/A"}</div>
                </div>
                {financialinancialInfo.paymentMethodId === 4 && (
                  <div className="financial-keyvalue-pair">
                    <div className="financial-key">Card Processing Charge :</div>
                    <div className="financial-value">
                      {financialinancialInfo.cardProcessingCharges !== undefined ? financialinancialInfo.cardProcessingCharges?.toFixed(2) : "N/A"}%
                    </div>
                  </div>
                )}
                <div className="financial-keyvalue-pair">
                  <div className="financial-key">Exempt Sales Tax :</div>
                  <div className="financial-value"> <input
                    type="checkbox"
                    checked={financialinancialInfo.exemptSalesTax}
                    readOnly
                  /></div>
                </div>
                {financialinancialInfo.exemptSalesTax === false && (
                  <div className="financial-keyvalue-pair">
                    <div className="financial-key">Sales Tax :</div>
                    <div className="financial-value">
                      {financialinancialInfo.salesTax !== undefined ? financialinancialInfo.salesTax?.toFixed(2) : "N/A"}%
                    </div>
                  </div>
                )}
                {financialinancialInfo.bankWireFee !== null && financialinancialInfo.bankWireFee !== undefined && (
                  <div className="financial-keyvalue-pair">
                    <div className="financial-key">Bank Wire Fee:</div>
                    <div className="financial-value">
                      ${financialinancialInfo.bankWireFee?.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
              : <DataLoader />
            }
          </div>
          <div className="col-xxl-7 col-lg-7 col-md-6 col-12">
            {!isGetDefaultValueFetching && accountType ?
              <div className="shipping-section">
                <div className="shipping-label">Shipping</div>
                <React.Fragment>
                  <div className="shipping-keyvalue-pair">
                    <div className="shipping-key">Account Type :</div>
                    <div className="shipping-value">{accountType}</div>
                  </div>
                  {carriersDetails && carriersDetails.carrier &&
                    <>
                      <div className="shipping-sub-label">Carrier Details</div>
                      <div className="custom-row">
                        <div className="custom-col">
                          <div className="shipping-sub-keyvalue-pair">
                            <div className="shipping-sub-key">Carrier :</div>
                            <div className="shipping-sub-value">{carriersDetails.carrier}</div>
                          </div>
                          <div className="shipping-sub-keyvalue-pair">
                            <div className="shipping-sub-key">Handling Fee :</div>
                            <div className="shipping-sub-value">${carriersDetails.handlingFee?.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="custom-col">
                          <div className="shipping-sub-keyvalue-pair">
                            <div className="shipping-sub-key">Account Number :</div>
                            <div className="shipping-sub-value">{carriersDetails.accountNumber}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  {deliveryDetails && deliveryDetails.zone &&
                    <>
                      <div className="shipping-sub-label">Delivery Method Details</div>
                      <div className="custom-row">
                        <div className="custom-col">
                          <div className="shipping-sub-keyvalue-pair">
                            <div className="shipping-sub-key">Zone :</div>
                            <div className="shipping-sub-value">{deliveryDetails.zone}</div>
                          </div>
                          <div className="shipping-sub-keyvalue-pair">
                            <div className="shipping-sub-key">Charge :</div>
                            <div className="shipping-sub-value">${deliveryDetails.charge?.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="custom-col">
                          <div className="shipping-sub-keyvalue-pair">
                            <div className="shipping-sub-key">Charge Type :</div>
                            <div className="shipping-sub-value">{deliveryDetails.name}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  {!carriersDetails?.carrier && !deliveryDetails?.zone && accountType &&
                    <NoRecordFound message="No Primary Record Found" />
                  }
                  {!accountType && <NoRecordFound />}
                </React.Fragment>
              </div>
              : <DataLoader />}
          </div>
        </div>
      </CardSection>
    </div>
  );
};

export default PaymentInformation;
