ALTER TABLE customers ADD IsSubCustomer BIT;

UPDATE customers SET IsSubCustomer = IsSubCompany;

ALTER TABLE customers DROP COLUMN IsSubCompany;
