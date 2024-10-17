import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import { useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery, useLazyGetDetailsbyCustomerIDQuery } from "../../../../../app/services/customerSettingsAPI";

const PaymentInformation = ({ orderDetails }) => {
  const [financialinancialInfo, setFinancialInfo] = useState({});

  const [getDetailsbyCustomerID, { data, isSuccess: isGetDetailsbyCustomerID }] = useLazyGetDetailsbyCustomerIDQuery();
  const [getAllPaymentTerms, { isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getAllPaymentMethod, { isSuccess: isGetAllPaymentMethodSuccess, data: isGetAllPaymentMethodData }] = useLazyGetAllPaymentMethodQuery();


  useEffect(() => {
    if (orderDetails && orderDetails.customerId) {
      getDetailsbyCustomerID(orderDetails.customerId);
      getAllPaymentTerms();
      getAllPaymentMethod();
    }
  }, [orderDetails]);

  useEffect(() => {
    if (isGetDetailsbyCustomerID && data) {
      setFinancialInfo(data);
    }
  }, [isGetDetailsbyCustomerID, data]);

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
          <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
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
                    {financialinancialInfo.cardProcessingCharges !== undefined ? financialinancialInfo.cardProcessingCharges : "N/A"}
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
                    {financialinancialInfo.salesTax !== undefined ? financialinancialInfo.salesTax : "N/A"}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
            <div className="shipping-section">
              <div className="shipping-label">Shipping</div>
              <div className="shipping-keyvalue-pair">
                <div className="shipping-key">Account Type :</div>
                <div className="shipping-value">Collect Account</div>
              </div>
              <div className="shipping-sub-label">Carrier Details</div>
              <div className="custom-row">
                <div className="custom-col">
                  <div className="shipping-sub-keyvalue-pair">
                    <div className="shipping-sub-key">Carrier :</div>
                    <div className="shipping-sub-value">DHL</div>
                  </div>
                  <div className="shipping-sub-keyvalue-pair">
                    <div className="shipping-sub-key">Handling Fee :</div>
                    <div className="shipping-sub-value">$ 10000.0</div>
                  </div>
                </div>
                <div className="custom-col">
                  <div className="shipping-sub-keyvalue-pair">
                    <div className="shipping-sub-key">Account Number :</div>
                    <div className="shipping-sub-value">123456789</div>
                  </div>
                </div>
              </div>
              <div className="shipping-sub-label">Delivery Method Details</div>
              <div className="custom-row">
                <div className="custom-col">
                  <div className="shipping-sub-keyvalue-pair">
                    <div className="shipping-sub-key">Zone :</div>
                    <div className="shipping-sub-value">International</div>
                  </div>
                  <div className="shipping-sub-keyvalue-pair">
                    <div className="shipping-sub-key">Charge :</div>
                    <div className="shipping-sub-value">$ 10000.0</div>
                  </div>
                </div>
                <div className="custom-col">
                  <div className="shipping-sub-keyvalue-pair">
                    <div className="shipping-sub-key">Charge Type :</div>
                    <div className="shipping-sub-value">OverNight</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardSection>
    </div>
  );
};

export default PaymentInformation;
