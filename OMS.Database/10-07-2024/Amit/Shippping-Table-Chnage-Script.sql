ALTER TABLE L_CustomerDeliveryCarriers
ADD HandlingFee DECIMAL(5,2);
 
ALTER TABLE CustomerAccoutingSettings
ADD 
SalesTax DECIMAL(5,2),
ExemptSalesTax BIT,
BankFee DECIMAL(5,2),
CardProcessingCharges DECIMAL(5,2)