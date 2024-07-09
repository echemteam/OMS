
/****** Object:  Trigger [dbo].[trg_AfterUpdate_Addresses]    Script Date: 09-07-2024 15:48:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_Addresses]
ON [dbo].[Addresses]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Address Details Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    ---Customer history table 
    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        ca.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated  ', ats.type  ,' address Change ', 
            STUFF((
                SELECT 
                    CASE WHEN i.AddressLine1 <> d.AddressLine1 THEN ', AddressLine1' ELSE '' END +
                    CASE WHEN i.AddressLine2 <> d.AddressLine2 THEN ', AddressLine2' ELSE '' END +
                    CASE WHEN i.AddressLine3 <> d.AddressLine3 THEN ', AddressLine3' ELSE '' END +
                    CASE WHEN i.AddressLine4 <> d.AddressLine4 THEN ', AddressLine4' ELSE '' END +
                    CASE WHEN i.AddressLine5 <> d.AddressLine5 THEN ', AddressLine5' ELSE '' END +
                    CASE WHEN i.CityId <> d.CityId THEN ', City' ELSE '' END +
                    CASE WHEN i.StateId <> d.StateId THEN ', State' ELSE '' END +
                    CASE WHEN i.CountryId <> d.CountryId THEN ', Country' ELSE '' END +
                    CASE WHEN i.ZipCode <> d.ZipCode THEN ', ZipCode' ELSE '' END  
                FROM inserted i
                JOIN deleted d ON i.AddressId = d.AddressId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),
            1, 2, '')) AS Description,
        --+ ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.AddressId = d.AddressId
    INNER JOIN [dbo].[L_CustomerAddresses] ca ON i.AddressId = ca.AddressId
    LEFT JOIN [dbo].[AddressTypes] ats ON ats.AddressTypeId = ca.AddressTypeId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;


    ---supplier history table 

    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        sa.SupplierId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated  ', ats.type  ,' address Change ', 
            STUFF((
                SELECT 
                    CASE WHEN i.AddressLine1 <> d.AddressLine1 THEN ', AddressLine1' ELSE '' END +
                    CASE WHEN i.AddressLine2 <> d.AddressLine2 THEN ', AddressLine2' ELSE '' END +
                    CASE WHEN i.AddressLine3 <> d.AddressLine3 THEN ', AddressLine3' ELSE '' END +
                    CASE WHEN i.AddressLine4 <> d.AddressLine4 THEN ', AddressLine4' ELSE '' END +
                    CASE WHEN i.AddressLine5 <> d.AddressLine5 THEN ', AddressLine5' ELSE '' END +
                    CASE WHEN i.CityId <> d.CityId THEN ', City' ELSE '' END +
                    CASE WHEN i.StateId <> d.StateId THEN ', State' ELSE '' END +
                    CASE WHEN i.CountryId <> d.CountryId THEN ', Country' ELSE '' END +
                    CASE WHEN i.ZipCode <> d.ZipCode THEN ', ZipCode' ELSE '' END  
                FROM inserted i
                JOIN deleted d ON i.AddressId = d.AddressId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),
            1, 2, ''))AS Description,
        --+ ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.AddressId = d.AddressId
    INNER JOIN [dbo].[L_SupplierAddresses] sa ON i.AddressId = sa.AddressId
    LEFT JOIN [dbo].[AddressTypes] ats ON ats.AddressTypeId = sa.AddressTypeId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;

END
GO
ALTER TABLE [dbo].[Addresses] ENABLE TRIGGER [trg_AfterUpdate_Addresses]
GO
/****** Object:  Trigger [dbo].[trgContacts_Update]    Script Date: 09-07-2024 15:48:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trgContacts_Update]
ON [dbo].[Contacts]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EventName NVARCHAR(100) = 'Contact Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
    cc.CustomerId,
    @EventName AS EventName,
    i.CreatedBy AS ChangedBy,
    @ChangedAt AS ChangedAt, 
        CONCAT(
            'Updated  ',cts.type, ' Contact Change  ',
            STUFF((
                SELECT 
                    CASE WHEN i.FirstName <> d.FirstName THEN ', FirstName' ELSE '' END +
                    CASE WHEN i.LastName <> d.LastName THEN ', LastName' ELSE '' END
                FROM inserted i
                JOIN deleted d ON i.ContactId = d.ContactId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '')) AS Description,
             --+ ' by ' + ISNULL(COALESCE(u.FirstName, '') + ' ' + COALESCE(u.LastName, ''), 'Unknown') +
             --FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.ContactId = d.ContactId
    LEFT JOIN [dbo].[L_CustomerContacts] cc ON i.ContactId = cc.ContactId
    LEFT JOIN [dbo].[ContactTypes] cts ON cts.ContactTypeId = cc.ContactTypeId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[Contacts] ENABLE TRIGGER [trgContacts_Update]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_CustomerAccoutingSettings]    Script Date: 09-07-2024 15:48:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_CustomerAccoutingSettings]
ON [dbo].[CustomerAccoutingSettings]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Financial Settings Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Financial Settings Added ' AS Description,
        --CONCAT('Financial Settings Added by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[CustomerAccoutingSettings] ENABLE TRIGGER [trg_AfterInsert_CustomerAccoutingSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_CustomerAccoutingSettings]    Script Date: 09-07-2024 15:48:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_CustomerAccoutingSettings]
ON [dbo].[CustomerAccoutingSettings]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Financial Settings Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Main audit history insertion
    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated financial settings for customer ',
            --ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.',
            STUFF((
                SELECT 
                    CASE WHEN i.PaymentTermId <> d.PaymentTermId THEN ', Payment Term' ELSE '' END +
                    CASE WHEN i.CreditLimit <> d.CreditLimit THEN ', Credit Limit' ELSE '' END +
                    CASE WHEN i.DeliveryMethodId <> d.DeliveryMethodId THEN ', Delivery Method' ELSE '' END +
                    CASE WHEN i.DeliveryAccountId <> d.DeliveryAccountId THEN ', Delivery Account' ELSE '' END +
                    CASE WHEN i.CarrierId <> d.CarrierId THEN ', Carrier' ELSE '' END +
                    CASE WHEN i.InvoiceSubmissionMethod <> d.InvoiceSubmissionMethod THEN ', Invoice Submission Method' ELSE '' END +
                    CASE WHEN i.PaymentMethodId <> d.PaymentMethodId THEN ', Payment Method' ELSE '' END +
                    CASE WHEN i.BillingCurrency <> d.BillingCurrency THEN ', Billing Currency' ELSE '' END
                FROM inserted i
                JOIN deleted d ON i.CustomerAccountingSettingId = d.CustomerAccountingSettingId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, '')
            ) AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.CustomerAccountingSettingId = d.CustomerAccountingSettingId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;

END;
GO
ALTER TABLE [dbo].[CustomerAccoutingSettings] ENABLE TRIGGER [trg_AfterUpdate_CustomerAccoutingSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_CustomerDocuments]    Script Date: 09-07-2024 15:48:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_CustomerDocuments]
ON [dbo].[CustomerDocuments]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Document Uploaded';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
       	CONCAT(dt.type, ' Document Uploaded') AS Description,
        --CONCAT(dt.type,'  Document Uploaded By ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN [dbo].[DocumentTypes] dt ON i.DocumentTypeId = dt.DocumentTypeId
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[CustomerDocuments] ENABLE TRIGGER [trg_AfterInsert_CustomerDocuments]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_Notes]    Script Date: 09-07-2024 15:48:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_Notes]
ON [dbo].[CustomerNotes]
AFTER INSERT
AS 
BEGIN
	 DECLARE @EventName NVARCHAR(100) = 'Note Added';
     DECLARE @ChangedAt DATETIME = GETDATE();

	 INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
	SELECT 
		i.CustomerId,
		@EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Create new note' AS Description,
		--CONCAT('Create new note by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
		'Insert'
	FROM inserted i
	LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END
GO
ALTER TABLE [dbo].[CustomerNotes] ENABLE TRIGGER [trg_AfterInsert_Notes]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_Notes]    Script Date: 09-07-2024 15:48:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_Notes]
ON [dbo].[CustomerNotes]
AFTER UPDATE
AS 
BEGIN
	 DECLARE @EventName NVARCHAR(100) = 'Note Updated';
     DECLARE @ChangedAt DATETIME = GETDATE();

	 INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
	SELECT 
		i.CustomerId,
		@EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
		--CONCAT('Updated note by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Updated note' AS Description,
		'Update'
	FROM inserted i
	LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END
GO
ALTER TABLE [dbo].[CustomerNotes] ENABLE TRIGGER [trg_AfterUpdate_Notes]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_Customers]    Script Date: 09-07-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_Customers]
ON [dbo].[Customers]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Customer Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Create new customer' AS Description, 
        --CONCAT('Create new customer by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[Customers] ENABLE TRIGGER [trg_AfterInsert_Customers]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_Customers]    Script Date: 09-07-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_Customers]
ON [dbo].[Customers]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Basic Details Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Main audit history insertion
    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated customer ',
            STUFF((
                SELECT 
                    CASE WHEN i.GroupTypeId <> d.GroupTypeId THEN ', Group Type' ELSE '' END +
                    CASE WHEN i.Name <> d.Name THEN ', Name' ELSE '' END +
                    CASE WHEN i.TerritoryId <> d.TerritoryId THEN ', Territory' ELSE '' END +
                    CASE WHEN i.Website <> d.Website THEN ', Website' ELSE '' END +
                    CASE WHEN i.IndustryTypeId <> d.IndustryTypeId THEN ', Industry Type' ELSE '' END +
                    CASE WHEN i.CountryId <> d.CountryId THEN ', Country' ELSE '' END +
                    CASE WHEN i.TaxId <> d.TaxId THEN ', TaxId' ELSE '' END +
                    --CASE WHEN i.StatusId <> d.StatusId THEN ', Status' ELSE '' END +
                    CASE WHEN i.StatusId <> d.StatusId THEN ', Status from ' + os.Status + ' to ' + ns.Status ELSE '' END +
                    --CASE WHEN i.ApprovedAt <> d.ApprovedAt THEN ', ApprovedAt' ELSE '' END +
                    --CASE WHEN i.ApprovedBy <> d.ApprovedBy THEN ', ApprovedBy' ELSE '' END +
                    CASE WHEN i.IsActive <> d.IsActive THEN ', IsActive' ELSE '' END +
                    CASE WHEN i.IsBuyingForThirdParty <> d.IsBuyingForThirdParty THEN ', IsBuying For ThirdParty' ELSE '' END +
                    CASE WHEN i.InvoiceSubmissionInstruction <> d.InvoiceSubmissionInstruction THEN ', Invoice Submission Instruction' ELSE '' END

                FROM inserted i
                JOIN deleted d ON i.CustomerId = d.CustomerId
                JOIN Status os ON d.StatusId = os.StatusId 
                JOIN Status ns ON i.StatusId = ns.StatusId 
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, ''))AS Description,
            --+' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
            'Update'
    FROM inserted i
    JOIN deleted d ON i.CustomerId = d.CustomerId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId
END;
GO
ALTER TABLE [dbo].[Customers] ENABLE TRIGGER [trg_AfterUpdate_Customers]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_Emails]    Script Date: 09-07-2024 15:48:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_Emails]
ON [dbo].[Emails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Contact email Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        cc.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Added contact email' AS Description,
        --CONCAT('Added contact email by user ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert' AS EventStatus  
    FROM inserted i
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_CustomerContacts] cc ON c.ContactId = cc.ContactId
    LEFT JOIN [dbo].[Users] u ON i.CreatedBy = u.UserId;


    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        sc.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Added contact email' AS Description,
        --CONCAT('Added contact email by user ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert' AS EventStatus  -- Added alias to specify column name
    FROM inserted i
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_SupplierContacts] sc ON c.ContactId = sc.ContactId
    LEFT JOIN [dbo].[Users] u ON i.CreatedBy = u.UserId;

END;
GO
ALTER TABLE [dbo].[Emails] ENABLE TRIGGER [trg_AfterInsert_Emails]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_Emails]    Script Date: 09-07-2024 15:48:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_Emails]
ON [dbo].[Emails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Contact email Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        cc.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated Contact email',
            STUFF((
                SELECT
                    CASE WHEN i.EmailAddress <> d.EmailAddress THEN ', EmailAddress' ELSE '' END +
                    CASE WHEN i.IsPrimary <> d.IsPrimary THEN ', IsPrimary' ELSE '' END
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),
            1, 2, '.'))AS Description,
        --) + ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Update' AS EventStatus
    FROM inserted i
    INNER JOIN deleted d ON i.EmailId = d.EmailId
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_CustomerContacts] cc ON c.ContactId = cc.ContactId
    LEFT JOIN [dbo].[Users] u ON i.UpdatedBy = u.UserId;


    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        sc.SupplierId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated Contact email',
            STUFF((
                SELECT
                    CASE WHEN i.EmailAddress <> d.EmailAddress THEN ', EmailAddress' ELSE '' END +
                    CASE WHEN i.IsPrimary <> d.IsPrimary THEN ', IsPrimary' ELSE '' END
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),
            1, 2, ''))AS Description,
        --) + ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Update' AS EventStatus
    FROM inserted i
    INNER JOIN deleted d ON i.EmailId = d.EmailId
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_SupplierContacts] sc ON c.ContactId = sc.ContactId
    LEFT JOIN [dbo].[Users] u ON i.UpdatedBy = u.UserId;
    END;
GO
ALTER TABLE [dbo].[Emails] ENABLE TRIGGER [trg_AfterUpdate_Emails]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_L_CustomCharge_CustomerDeliveryMethods]    Script Date: 09-07-2024 15:48:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_L_CustomCharge_CustomerDeliveryMethods]
ON [dbo].[L_CustomCharge_CustomerDeliveryMethods]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Shipping Settings Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Shipping Settings Added' AS Description, 
        --CONCAT('Shipping Settings Added by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[L_CustomCharge_CustomerDeliveryMethods] ENABLE TRIGGER [trg_AfterInsert_L_CustomCharge_CustomerDeliveryMethods]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_L_CustomCharge_CustomerDeliveryMethods]    Script Date: 09-07-2024 15:48:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterUpdate_L_CustomCharge_CustomerDeliveryMethods]
ON [dbo].[L_CustomCharge_CustomerDeliveryMethods]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Shipping Settings Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated shipping settings for customer ',
            STUFF((
                SELECT 
                    CASE WHEN i.DeliveryMethodId <> d.DeliveryMethodId THEN ', DeliveryMethodId' ELSE '' END +
                    CASE WHEN i.Charge <> d.Charge THEN ', Charge' ELSE '' END +
                    CASE WHEN i.IsPrimary <> d.IsPrimary THEN ', IsPrimary' ELSE '' END
                FROM inserted i
                JOIN deleted d ON i.CustomerDeliveryMethodId = d.CustomerDeliveryMethodId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, ''
            )) AS Description,
        --    + ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.'
        --) AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.CustomerDeliveryMethodId = d.CustomerDeliveryMethodId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[L_CustomCharge_CustomerDeliveryMethods] ENABLE TRIGGER [trg_AfterUpdate_L_CustomCharge_CustomerDeliveryMethods]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_Address]    Script Date: 09-07-2024 15:48:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_Address]
ON [dbo].[L_CustomerAddresses]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Address Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
    i.CustomerId,
    @EventName AS EventName,
    i.CreatedBy AS ChangedBy,
    @ChangedAt AS ChangedAt,
    CONCAT('Added ', ats.type, ' address') AS Description,
    --CONCAT('Added ', ats.type, ' address by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
    'Insert'
    FROM inserted i
    INNER JOIN [dbo].[L_CustomerAddresses] ca ON i.AddressId = ca.AddressId
    LEFT JOIN Users u ON i.CreatedBy = u.UserId
    LEFT JOIN [dbo].[AddressTypes] ats ON ats.AddressTypeId = ca.AddressTypeId;
END;
GO
ALTER TABLE [dbo].[L_CustomerAddresses] ENABLE TRIGGER [trg_AfterInsert_Address]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_L_CustomerAddresses]    Script Date: 09-07-2024 15:48:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_L_CustomerAddresses]
ON [dbo].[L_CustomerAddresses]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
 
    DECLARE @EventName NVARCHAR(100) = 'Address Details Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();
 
    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        a.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated  ', ats.type  ,' address Change ',
            STUFF((
                SELECT 
                    CASE WHEN i.IsPreferredShipping <> d.IsPreferredShipping THEN ', IsPreferredShipping' ELSE '' END +
                    CASE WHEN i.IsPreferredBilling <> d.IsPreferredBilling THEN ', IsPreferredBilling' ELSE '' END +
                    CASE WHEN i.AddressTypeId <> d.AddressTypeId THEN ', AddressType' ELSE '' END +
                    CASE WHEN i.StatusId <> d.StatusId THEN ', Status from ' + os.Status + ' to ' + ns.Status ELSE '' END +
                    CASE WHEN i.ApprovedAt <> d.ApprovedAt THEN ', status Approved' ELSE '' END 
                FROM inserted i
                JOIN deleted d ON i.AddressId = d.AddressId
                JOIN Status os ON d.StatusId = os.StatusId 
                JOIN Status ns ON i.StatusId = ns.StatusId 
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, ''))AS Description,
            --+ ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
            'Update'
    FROM inserted i
    INNER JOIN [dbo].[L_CustomerAddresses] ca ON i.AddressId = ca.AddressId
    LEFT JOIN [dbo].[Addresses] a ON a.AddressId = ca.AddressId
    LEFT JOIN Users u ON a.CreatedBy = u.UserId  
    LEFT JOIN [dbo].[AddressTypes] ats ON ats.AddressTypeId = ca.AddressTypeId;
END;

GO
ALTER TABLE [dbo].[L_CustomerAddresses] ENABLE TRIGGER [trg_AfterUpdate_L_CustomerAddresses]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_L_CustomerContacts]    Script Date: 09-07-2024 15:48:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_L_CustomerContacts]
ON [dbo].[L_CustomerContacts]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Contact Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
    i.CustomerId,
    @EventName AS EventName,
    i.CreatedBy AS ChangedBy,
    @ChangedAt AS ChangedAt,
	CONCAT('Added ', cts.type, ' contact by ') AS Description,
    --CONCAT('Added ', cts.type, ' contact by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
    'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId
    LEFT JOIN [dbo].[ContactTypes] cts ON cts.ContactTypeId = i.ContactTypeId;
END;
GO
ALTER TABLE [dbo].[L_CustomerContacts] ENABLE TRIGGER [trg_AfterInsert_L_CustomerContacts]
GO
/****** Object:  Trigger [dbo].[trgCustomerContacts_Update]    Script Date: 09-07-2024 15:48:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trgCustomerContacts_Update]
ON [dbo].[L_CustomerContacts]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Variables to capture audit information
    DECLARE @EventName NVARCHAR(100) = 'Contact Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Insert into audit history table
    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated  ',cts.type, '  Contact Change ',
            CASE WHEN i.ContactTypeId <> d.ContactTypeId THEN 'Contact Type, ' ELSE '' END +
            CASE WHEN i.IsPrimary <> d.IsPrimary THEN 'IsPrimary, ' ELSE '' END +
            CASE WHEN i.StatusId <> d.StatusId THEN 'Status from ' + os.Status + ' to ' + ns.Status ELSE '' END +
            CASE WHEN i.ApprovedBy <> d.ApprovedBy THEN 'Approved, ' ELSE '' END --+
            --' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') +
            --' at ' + FORMAT(@ChangedAt, 'h:mm tt') +
            --' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.' 
        ) AS Description,
        'Update' AS EventStatus
    FROM inserted i
    JOIN deleted d ON i.CustomerContactId = d.CustomerContactId
    JOIN Status os ON d.StatusId = os.StatusId 
    JOIN Status ns ON i.StatusId = ns.StatusId 
    JOIN [dbo].[Contacts] cc ON i.ContactId = cc.ContactId
    LEFT JOIN [dbo].[ContactTypes] cts ON cts.ContactTypeId = i.ContactTypeId
    LEFT JOIN Users u ON cc.UpdatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[L_CustomerContacts] ENABLE TRIGGER [trgCustomerContacts_Update]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_L_CustomerDeliveryCarriers]    Script Date: 09-07-2024 15:48:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_L_CustomerDeliveryCarriers]
ON [dbo].[L_CustomerDeliveryCarriers]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Shipping Settings Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        --CONCAT('Shipping Settings Added by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Shipping Settings Added' AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[L_CustomerDeliveryCarriers] ENABLE TRIGGER [trg_AfterInsert_L_CustomerDeliveryCarriers]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_L_CustomerDeliveryCarriers]    Script Date: 09-07-2024 15:48:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterUpdate_L_CustomerDeliveryCarriers]
ON [dbo].[L_CustomerDeliveryCarriers]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Shipping Settings Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated shipping settings for customer ',
            --'Updated shipping settings for customer',
            --ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.',
            STUFF((
                SELECT 
                    CASE WHEN i.CarrierId <> d.CarrierId THEN ', Carrier' ELSE '' END +
                    CASE WHEN i.AccountNumber <> d.AccountNumber THEN ', AccountNumber' ELSE '' END 
					-- + CASE WHEN i.IsPrimary <> d.IsPrimary THEN ', IsPrimary' ELSE '' END
                FROM inserted i
                JOIN deleted d ON i.CustomerDeliveryCarrierId = d.CustomerDeliveryCarrierId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, '')
            ) AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.CustomerDeliveryCarrierId = d.CustomerDeliveryCarrierId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[L_CustomerDeliveryCarriers] ENABLE TRIGGER [trg_AfterUpdate_L_CustomerDeliveryCarriers]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_SupplierAddress]    Script Date: 09-07-2024 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_SupplierAddress]
ON [dbo].[L_SupplierAddresses]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Address Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
    i.SupplierId,
    @EventName AS EventName,
    i.CreatedBy AS ChangedBy,
    @ChangedAt AS ChangedAt,
   CONCAT('Added ', ats.type, ' address') AS Description,
    --CONCAT('Added ', ats.type, ' address by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
    'Insert'
    FROM inserted i
    INNER JOIN [dbo].[L_SupplierAddresses] sa ON i.AddressId = sa.AddressId
    LEFT JOIN Users u ON i.CreatedBy = u.UserId
    LEFT JOIN [dbo].[AddressTypes] ats ON ats.AddressTypeId = sa.AddressTypeId;
END;
GO
ALTER TABLE [dbo].[L_SupplierAddresses] ENABLE TRIGGER [trg_AfterInsert_SupplierAddress]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_L_SupplierAddresses]    Script Date: 09-07-2024 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_L_SupplierAddresses]
ON [dbo].[L_SupplierAddresses]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
 
    DECLARE @EventName NVARCHAR(100) = 'Address Details Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();
 
    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
SELECT
        i.SupplierId,
        @EventName AS EventName,
        a.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated  ', ats.type  ,' address Change ',
            STUFF((
                SELECT 
                    CASE WHEN i.AddressTypeId <> d.AddressTypeId THEN ', AddressType' ELSE '' END +
                    CASE WHEN i.StatusId <> d.StatusId THEN ', Status from ' + os.Status + ' to ' + ns.Status ELSE '' END +
                    CASE WHEN i.ApprovedAt <> d.ApprovedAt THEN ', status Approved' ELSE '' END 
                FROM inserted i
                JOIN deleted d ON i.AddressId = d.AddressId
                JOIN Status os ON d.StatusId = os.StatusId 
                JOIN Status ns ON i.StatusId = ns.StatusId 
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, ''))AS Description,
            --+ ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
            'Update'
    FROM inserted i
    INNER JOIN [dbo].[L_SupplierAddresses] sa ON i.AddressId = sa.AddressId
    LEFT JOIN [dbo].[Addresses] a ON a.AddressId = sa.AddressId
    LEFT JOIN Users u ON a.CreatedBy = u.UserId  
    LEFT JOIN [dbo].[AddressTypes] ats ON ats.AddressTypeId = sa.AddressTypeId;
END;

GO
ALTER TABLE [dbo].[L_SupplierAddresses] ENABLE TRIGGER [trg_AfterUpdate_L_SupplierAddresses]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_L_SupplierContacts]    Script Date: 09-07-2024 15:48:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_L_SupplierContacts]
ON [dbo].[L_SupplierContacts]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Contact Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
    i.SupplierId,
    @EventName AS EventName,
    i.CreatedBy AS ChangedBy,
    @ChangedAt AS ChangedAt,
    CONCAT('Added ', cts.type, ' contact') AS Description,
    --CONCAT('Added ', cts.type, ' contact by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
    'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId
    LEFT JOIN [dbo].[ContactTypes] cts ON cts.ContactTypeId = i.ContactTypeId;
END;
GO
ALTER TABLE [dbo].[L_SupplierContacts] ENABLE TRIGGER [trg_AfterInsert_L_SupplierContacts]
GO
/****** Object:  Trigger [dbo].[trgCustomerContacts_L_SupplierContacts]    Script Date: 09-07-2024 15:48:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trgCustomerContacts_L_SupplierContacts]
ON [dbo].[L_SupplierContacts]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Variables to capture audit information
    DECLARE @EventName NVARCHAR(100) = 'Contact Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Insert into audit history table
    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated  ',cts.type, ' Change ',
            CASE WHEN i.ContactTypeId <> d.ContactTypeId THEN 'Contact Type, ' ELSE '' END +
            CASE WHEN i.IsPrimary <> d.IsPrimary THEN 'IsPrimary, ' ELSE '' END +
            CASE WHEN i.StatusId <> d.StatusId THEN ', Status from ' + os.Status + ' to ' + ns.Status ELSE '' END +
            CASE WHEN i.ApprovedBy <> d.ApprovedBy THEN 'Approved, ' ELSE '' END --+
            --' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') +
            --' at ' + FORMAT(@ChangedAt, 'h:mm tt') +
            --' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.' 
        ) AS Description,
        'Update' AS EventStatus
    FROM inserted i
    JOIN deleted d ON i.SupplierContactId = d.SupplierContactId
    JOIN Status os ON d.StatusId = os.StatusId 
    JOIN Status ns ON i.StatusId = ns.StatusId 
    JOIN [dbo].[Contacts] cc ON i.ContactId = cc.ContactId
    LEFT JOIN [dbo].[ContactTypes] cts ON cts.ContactTypeId = i.ContactTypeId
    LEFT JOIN Users u ON cc.UpdatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[L_SupplierContacts] ENABLE TRIGGER [trgCustomerContacts_L_SupplierContacts]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_Phones]    Script Date: 09-07-2024 15:48:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_Phones]
ON [dbo].[Phones]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Contact phone Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        cc.CustomerId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        --CONCAT('Added contact phone by user ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Added contact phone' AS Description,
        'Insert' AS EventStatus  
    FROM inserted i
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_CustomerContacts] cc ON c.ContactId = cc.ContactId
    INNER JOIN [dbo].[Phones] p ON i.PhoneId = p.PhoneId
    LEFT JOIN [dbo].[Users] u ON i.CreatedBy = u.UserId;
 

    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        sc.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        --CONCAT('Added contact phone by user ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Added contact phone' AS Description,
        'Insert' AS EventStatus  
    FROM inserted i
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_SupplierContacts] sc ON c.ContactId = sc.ContactId
    INNER JOIN [dbo].[Phones] p ON i.PhoneId = p.PhoneId
    LEFT JOIN [dbo].[Users] u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[Phones] ENABLE TRIGGER [trg_AfterInsert_Phones]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_Phones]    Script Date: 09-07-2024 15:48:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_Phones]
ON [dbo].[Phones]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Phone Details Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[CustomerAuditHistory] (
        CustomerId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        cc.CustomerId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,  -- Assuming UpdatedBy is available in Phones table
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated phone details: ',
            STUFF((
                SELECT 
                    CASE WHEN i.PhoneNumber <> d.PhoneNumber THEN ', PhoneNumber' ELSE '' END +
                    CASE WHEN i.PhoneCode <> d.PhoneCode THEN ', PhoneCode' ELSE '' END +
                    CASE WHEN i.IsPrimary <> d.IsPrimary THEN ', IsPrimary' ELSE '' END +
                    CASE WHEN i.Extension <> d.Extension THEN ', Extension' ELSE '' END +
                    CASE WHEN i.PhoneTypeId <> d.PhoneTypeId THEN ', PhoneType' ELSE '' END
                FROM inserted i
                JOIN deleted d ON i.PhoneId = d.PhoneId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),
            1, 2, ''))AS Description,
        --) + ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
          'Update' AS EventStatus
    FROM inserted i
    INNER JOIN deleted d ON i.PhoneId = d.PhoneId
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_CustomerContacts] cc ON c.ContactId = cc.ContactId
    LEFT JOIN [dbo].[Users] u ON i.UpdatedBy = u.UserId;


     INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        sc.SupplierId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,  -- Assuming UpdatedBy is available in Phones table
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated phone details: ',
            STUFF((
                SELECT 
                    CASE WHEN i.PhoneNumber <> d.PhoneNumber THEN ', PhoneNumber' ELSE '' END +
                    CASE WHEN i.PhoneCode <> d.PhoneCode THEN ', PhoneCode' ELSE '' END +
                    CASE WHEN i.IsPrimary <> d.IsPrimary THEN ', IsPrimary' ELSE '' END +
                    CASE WHEN i.Extension <> d.Extension THEN ', Extension' ELSE '' END +
                    CASE WHEN i.PhoneTypeId <> d.PhoneTypeId THEN ', PhoneType' ELSE '' END
                FROM inserted i
                JOIN deleted d ON i.PhoneId = d.PhoneId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),
            1, 2, ''))AS Description,
        --) + ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Update' AS EventStatus
    FROM inserted i
    INNER JOIN deleted d ON i.PhoneId = d.PhoneId
    INNER JOIN [dbo].[Contacts] c ON i.OwnerId = c.ContactId
    INNER JOIN [dbo].[L_SupplierContacts] sc ON c.ContactId = sc.ContactId
    LEFT JOIN [dbo].[Users] u ON i.UpdatedBy = u.UserId;

END;

GO
ALTER TABLE [dbo].[Phones] ENABLE TRIGGER [trg_AfterUpdate_Phones]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_SupplierAccoutingSettings]    Script Date: 09-07-2024 15:48:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_SupplierAccoutingSettings]
ON [dbo].[SupplierAccoutingSettings]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Financial Settings Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Financial Settings Added 'AS Description,
        --CONCAT('Financial Settings Added by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] ENABLE TRIGGER [trg_AfterInsert_SupplierAccoutingSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_SupplierAccoutingSettings]    Script Date: 09-07-2024 15:48:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_SupplierAccoutingSettings]
ON [dbo].[SupplierAccoutingSettings]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Financial Settings Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Main audit history insertion
    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated financial settings chnage ',
            --ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.',
            STUFF((
                SELECT 
                    CASE WHEN i.PaymentTermId <> d.PaymentTermId THEN ', Payment Term' ELSE '' END +
                    CASE WHEN i.InvoiceSubmissionMethod <> d.InvoiceSubmissionMethod THEN ', Invoice Submission Method' ELSE '' END +
                    CASE WHEN i.PaymentMethodId <> d.PaymentMethodId THEN ', Payment Method' ELSE '' END 
                FROM inserted i
                JOIN deleted d ON i.SupplierAccountingSettingId = d.SupplierAccountingSettingId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, '')
            ) AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.SupplierAccountingSettingId= d.SupplierAccountingSettingId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;

END;
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] ENABLE TRIGGER [trg_AfterUpdate_SupplierAccoutingSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_SupplierDocuments]    Script Date: 09-07-2024 15:48:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_SupplierDocuments]
ON [dbo].[SupplierDocuments]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Document Uploaded';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
       	CONCAT(dt.type, ' Document Uploaded') AS Description,
        --CONCAT(dt.type,'  Document Uploaded By ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN [dbo].[DocumentTypes] dt ON i.DocumentTypeId = dt.DocumentTypeId
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[SupplierDocuments] ENABLE TRIGGER [trg_AfterInsert_SupplierDocuments]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_SupplierNotes]    Script Date: 09-07-2024 15:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_SupplierNotes]
ON [dbo].[SupplierNotes]
AFTER INSERT
AS 
BEGIN
	 DECLARE @EventName NVARCHAR(100) = 'Note Added';
     DECLARE @ChangedAt DATETIME = GETDATE();

	 INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
	SELECT 
		i.SupplierId,
		@EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Create new note' AS Description,
		--CONCAT('Create new note by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
		'Insert'
	FROM inserted i
	LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END
GO
ALTER TABLE [dbo].[SupplierNotes] ENABLE TRIGGER [trg_AfterInsert_SupplierNotes]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_SupplierNotes]    Script Date: 09-07-2024 15:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_SupplierNotes]
ON [dbo].[SupplierNotes]
AFTER UPDATE
AS 
BEGIN
	 DECLARE @EventName NVARCHAR(100) = 'Note Updated';
     DECLARE @ChangedAt DATETIME = GETDATE();

	 INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
	SELECT 
		i.SupplierId,
		@EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Updated note' AS Description,
		--CONCAT('Updated note by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
		'Update'
	FROM inserted i
	LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END
GO
ALTER TABLE [dbo].[SupplierNotes] ENABLE TRIGGER [trg_AfterUpdate_SupplierNotes]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_Suppliers]    Script Date: 09-07-2024 15:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_Suppliers]
ON [dbo].[Suppliers]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Supplier Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Create new Supplier'AS Description,
        --CONCAT('Create new Supplier by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[Suppliers] ENABLE TRIGGER [trg_AfterInsert_Suppliers]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_Suppliers]    Script Date: 09-07-2024 15:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_Suppliers]
ON [dbo].[Suppliers]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Basic Details Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Main audit history insertion
    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated Supplier ',
            STUFF((
                SELECT 
                    CASE WHEN i.GroupTypeId <> d.GroupTypeId THEN ', Group Type' ELSE '' END +
                    CASE WHEN i.SupplierTypeId <> d.SupplierTypeId THEN ', Supplier Type' ELSE '' END +
                    CASE WHEN i.Name <> d.Name THEN ', Name' ELSE '' END +
                    CASE WHEN i.DbaName <> d.DbaName THEN ', Dba Name' ELSE '' END +
                    CASE WHEN i.TerritoryId <> d.TerritoryId THEN ', Territory' ELSE '' END +
                    CASE WHEN i.Website <> d.Website THEN ', Website' ELSE '' END +
                    CASE WHEN i.CountryId <> d.CountryId THEN ', Country' ELSE '' END +
                    CASE WHEN i.TaxId <> d.TaxId THEN ', TaxId' ELSE '' END +
                    CASE WHEN i.StatusId <> d.StatusId THEN ', Status from ' + os.Status + ' to ' + ns.Status ELSE '' END +
                    CASE WHEN i.ResponsibleUserId <> d.ResponsibleUserId THEN ', Responsible User' ELSE '' END 
                FROM inserted i
                JOIN deleted d ON i.SupplierId = d.SupplierId
                JOIN Status os ON d.StatusId = os.StatusId 
                JOIN Status ns ON i.StatusId = ns.StatusId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, ''))AS Description,
            --+ ' by ' + ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
            'Update'
    FROM inserted i
    JOIN deleted d ON i.SupplierId = d.SupplierId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;

END;
GO
ALTER TABLE [dbo].[Suppliers] ENABLE TRIGGER [trg_AfterUpdate_Suppliers]
GO
