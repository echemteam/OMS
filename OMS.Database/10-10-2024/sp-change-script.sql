
/****** Object:  StoredProcedure [dbo].[UpdateOrderItemByOrderItemId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[UpdateOrderItemByOrderItemId]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderDetail]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[UpdateOrderDetail]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderContacts]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[UpdateOrderContacts]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderAddress]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[UpdateOrderAddress]
GO
/****** Object:  StoredProcedure [dbo].[GetOrders]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrders]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderItemsByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrderItemsByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderItemByOrderItemId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrderItemByOrderItemId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDocumentByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrderDocumentByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDetailByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrderDetailByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderContactByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrderContactByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderAddressesByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[GetOrderAddressesByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderItem]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[DeleteOrderItem]
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderDocuementById]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[DeleteOrderDocuementById]
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderData]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[DeleteOrderData]
GO
/****** Object:  StoredProcedure [dbo].[AddOrderItem]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddOrderItem]
GO
/****** Object:  StoredProcedure [dbo].[AddOrderDocuments]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddOrderDocuments]
GO
/****** Object:  StoredProcedure [dbo].[AddOrderDocument]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddOrderDocument]
GO
/****** Object:  StoredProcedure [dbo].[AddOrderContact]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddOrderContact]
GO
/****** Object:  StoredProcedure [dbo].[AddOrderAddress]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddOrderAddress]
GO
/****** Object:  StoredProcedure [dbo].[AddOrder]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddOrder]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderInformation]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddEditOrderInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderContactInformation]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddEditOrderContactInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderAddressInformation]    Script Date: 10-10-2024 17:11:14 ******/
DROP PROCEDURE [dbo].[AddEditOrderAddressInformation]
GO
/****** Object:  UserDefinedTableType [dbo].[DocumentTypeTable]    Script Date: 10-10-2024 17:11:14 ******/
DROP TYPE [dbo].[DocumentTypeTable]
GO
/****** Object:  UserDefinedTableType [dbo].[DocumentTypeTable]    Script Date: 10-10-2024 17:11:14 ******/
CREATE TYPE [dbo].[DocumentTypeTable] AS TABLE(
	[Name] [varchar](75) NULL,
	[Attachment] [nvarchar](255) NULL,
	[DocumentTypeId] [tinyint] NULL,
	[DocumentType] [varchar](50) NULL
)
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderAddressInformation]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOrderAddressInformation]    
    @OrderAddressId INT,
    @OrderId INT,
    @BillingAddressId INT,
    @ShippingAddressId INT,
    @CreatedBy SMALLINT                               
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                                                    
              
        IF @OrderAddressId > 0               
        BEGIN    
            IF EXISTS (SELECT 1 FROM [dbo].[L_OrderAddress] WHERE [OrderAddressId] = @OrderAddressId AND DeletedAt IS NULL AND DeletedBy IS NULL)              
            BEGIN    
                UPDATE [dbo].[L_OrderAddress]                
                SET                   
                    [OrderId] = @OrderId,
                    [BillingAddressId] = @BillingAddressId,
                    [ShippingAddressId] = @ShippingAddressId,
                    [UpdatedBy] = @CreatedBy,
                    [UpdatedAt] = GETDATE()
                WHERE [OrderAddressId] = @OrderAddressId AND DeletedAt IS NULL AND DeletedBy IS NULL
             
                SET @keyId = @OrderAddressId;    
                 
                SELECT @keyId AS KeyValue,               
               'Order address updated' AS ErrorMessage;      
            END    
            ELSE    
            BEGIN    

                SELECT CAST(0 AS INT) as KeyValue,                                                            
                'Order address does not exist.' as ErrorMessage;    
            END    
        END    
        ELSE    
        BEGIN                 
            -- Insert new order
            INSERT INTO [dbo].[L_OrderAddress]                                  
            (                            
                OrderId,
                BillingAddressId,
                ShippingAddressId,                                                        
                CreatedBy,              
                CreatedAt                         
            )                                  
            VALUES                                
            (                            
                @OrderId,
                @BillingAddressId,
                @ShippingAddressId,                                                               
                @CreatedBy,                                  
                GETDATE()                
            );                                  
            SET @keyId = SCOPE_IDENTITY();                                          
            SELECT @keyId as KeyValue,                                             
            'Order address added' as ErrorMessage;                
        END    
    END TRY                                              
    BEGIN CATCH                                            
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                            
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                            
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                            
    END CATCH;                                            
END;
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderContactInformation]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOrderContactInformation]    
    @OrderId INT,
    @IsEndUser BIT,
    @EndUserContactId INT,
    @IsInvoiceSubmission BIT,
    @InvoiceSubmissionContactId INT,
    @IsPurchasing BIT,
    @PurchasingContactId INT,
    @ReferenceNumber NVARCHAR(100),
    @CreatedBy INT                                 
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                                                    
        
        IF @OrderId > 0               
        BEGIN    
            IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE OrderId = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL)              
            BEGIN    
                UPDATE [dbo].[Orders]                
                SET                   
                    [IsEndUser] = @IsEndUser,
                    [EndUserContactId] = @EndUserContactId,
                    [IsInvoiceSubmission] = @IsInvoiceSubmission,
                    [InvoiceSubmissionContactId] = @InvoiceSubmissionContactId,
                    [IsPurchasing] = @IsPurchasing,
                    [PurchasingContactId] = @PurchasingContactId,
                    [ReferenceNumber] = @ReferenceNumber,
                    UpdatedBy = @CreatedBy,
                    UpdatedAt = GETDATE()
                WHERE [OrderId] = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL
             
                SET @keyId = @OrderId;    
                 
                SELECT @keyId AS KeyValue,               
               'Order contact Updated' AS ErrorMessage;      
            END    
            ELSE    
            BEGIN    

                SELECT CAST(0 AS INT) as KeyValue,                                                            
                'Order contact does not exist.' as ErrorMessage;    
            END    
        END
    END TRY                                              
    BEGIN CATCH                                            
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                            
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                            
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                            
    END CATCH;                                            
END;
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderInformation]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOrderInformation]    
    @OrderId INT,
    @OrderMethodId TINYINT,
    @CustomerId INT,
    @SubCustomerId INT,
    @PoNumber VARCHAR(255),
    @OrderReceivedDate DATETIME,
    @CreatedBy INT                                 
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                                                    
              
      
        IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE PoNumber = @PoNumber AND CustomerId = @CustomerId AND OrderId <> @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL)
        BEGIN
            SELECT CAST(0 AS INT) as KeyValue,                                                            
            'PoNumber already exists.' as ErrorMessage;              
        END

        IF @OrderId > 0               
        BEGIN    
            IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE OrderId = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL)              
            BEGIN    
                UPDATE [dbo].[Orders]                
                SET                   
                    OrderMethodId = @OrderMethodId,
                    CustomerId = @CustomerId,
                    SubCustomerId = @SubCustomerId,
                    PoNumber = @PoNumber,
                    OrderReceivedDate = @OrderReceivedDate,
                    UpdatedBy = @CreatedBy,
                    UpdatedAt = GETDATE()
                WHERE [OrderId] = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL
             
                SET @keyId = @OrderId;    
                 
                SELECT @keyId AS KeyValue,               
               'Order Updated' AS ErrorMessage;      
            END    
            ELSE    
            BEGIN    

                SELECT @OrderId as KeyValue,                                                            
                'Order does not exist.' as ErrorMessage;    
            END    
        END    
        ELSE    
        BEGIN                 
            -- Insert new order
            INSERT INTO [dbo].[Orders]                                  
            (                            
                OrderMethodId,   
                CustomerId,                            
                SubCustomerId,                             
                PoNumber,                            
                OrderReceivedDate,                                                           
                CreatedBy,              
                CreatedAt                         
            )                                  
            VALUES                                
            (                            
                @OrderMethodId,                          
                @CustomerId,                               
                @SubCustomerId,                            
                @PoNumber,                            
                @OrderReceivedDate,                                                                 
                @CreatedBy,                                  
                GETDATE()                
            );                                  
            SET @keyId = SCOPE_IDENTITY();                                          
            SELECT @keyId as KeyValue,                                             
            'Order Added' as ErrorMessage;                
        END    
    END TRY                                              
    BEGIN CATCH                                            
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                            
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                            
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                            
    END CATCH;                                            
END;
GO
/****** Object:  StoredProcedure [dbo].[AddOrder]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
CREATE PROCEDURE [dbo].[AddOrder]        
    @OrderMethodId TINYINT,    
    @CustomerId INT,    
    @SubCustomerId INT,    
    @PoNumber VARCHAR(255),    
    @PoDate DATETIME,    
    @OrderReceivedDate DATETIME,    
    @IsEndUser BIT,    
    @IsInvoiceSubmission BIT,    
    @IsPurchasing BIT,    
    @ReferenceNumber NVARCHAR(100),    
    @PO_TotalOrderAmount DECIMAL,    
    @CurrencyId TINYINT,    
    @CreatedBy SMALLINT                                   
AS                                      
BEGIN                                      
    SET NOCOUNT ON;                                      
    BEGIN TRY                                                
        DECLARE @keyId AS INT;                                                        
        DECLARE @OrderStatusId INT;    
        DECLARE @OrderSubStatusId INT;                   
        
        SELECT 
            @OrderStatusId = OrderStatusId,
            @OrderSubStatusId = OrderSubStatusId
        FROM dbo.GetOrderStatusAndSubStatusByCustomerId(@CustomerId);  
        
        IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE PoNumber = @PoNumber AND CustomerId = @CustomerId  AND DeletedAt IS NULL AND DeletedBy IS NULL)    
        BEGIN    
            SELECT CAST(0 AS INT) as KeyValue,                                                                
            'PoNumber already exists.' as ErrorMessage;                  
        END    
        BEGIN                     
            -- Insert new order    
            INSERT INTO [dbo].[Orders]                                      
            (                                
                OrderMethodId,    
                CustomerId,    
                SubCustomerId,    
                PoNumber,    
                PoDate,    
                OrderReceivedDate,    
                IsEndUser,    
                IsInvoiceSubmission,    
                IsPurchasing,    
                ReferenceNumber,    
                PO_TotalOrderAmount,    
                CurrencyId,    
                OrderStatusId,    
                OrderSubStatusId,    
                CreatedBy,    
                CreatedAt                       
            )                                      
            VALUES                                    
            (                                
                @OrderMethodId,    
                @CustomerId,    
                @SubCustomerId,    
                @PoNumber,    
                @PoDate,    
                @OrderReceivedDate,    
                @IsEndUser,    
                @IsInvoiceSubmission,    
                @IsPurchasing,    
                @ReferenceNumber,    
                @PO_TotalOrderAmount,    
                @CurrencyId,    
                @OrderStatusId,    
                @OrderSubStatusId,   
                @CreatedBy,     
                GETDATE()     
            
            );      
                         
            SET @keyId = SCOPE_IDENTITY();                                              
            SELECT @keyId as KeyValue,                                                 
            'Order added successfully' as ErrorMessage;                    
        END        
    END TRY                                                  
    BEGIN CATCH                                                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                                
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                                
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                
    END CATCH;                                                
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddOrderAddress]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddOrderAddress]      
    @OrderId INT,  
    @BillingAddressId INT,  
    @ShippingAddressId INT,  
    @CreatedBy SMALLINT                             
AS                                    
BEGIN                                    
    SET NOCOUNT ON;                                    
    BEGIN TRY                                              
        DECLARE @keyId AS INT;                                                      
                
        BEGIN                   
            -- Insert new order  
            INSERT INTO [dbo].[L_OrderAddress]                                    
            (                              
                OrderId,  
                BillingAddressId,  
                ShippingAddressId,                                                          
                CreatedBy,                
                CreatedAt                           
            )                                    
            VALUES                                  
            (                              
                @OrderId,  
                @BillingAddressId,  
                @ShippingAddressId,                                                                 
                @CreatedBy,                                    
                GETDATE()                  
            );                                    
            SET @keyId = SCOPE_IDENTITY();                                            
            SELECT @keyId as KeyValue,                                               
            'Order address added' as ErrorMessage;                  
        END      
    END TRY                                                
    BEGIN CATCH                                              
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                              
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                              
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                              
    END CATCH;                                              
END;  
GO
/****** Object:  StoredProcedure [dbo].[AddOrderContact]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddOrderContact]
    @OrderContactList [dbo].[OrderContactsTypeTable] READONLY
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        INSERT INTO [dbo].[L_OrderContacts] 
        ( 
            ContactId, 
            ContactTypeId,
            OrderId
        )
        SELECT ContactId, ContactTypeId,OrderId
        FROM @OrderContactList;

    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[AddOrderDocument]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddOrderDocument]
    @DocumentName NVARCHAR(150),
    @OrderId INT,
    @DocumentType TINYINT,
    @CreatedBy SMALLINT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @keyId INT;       
    
      BEGIN TRY
        -- Insert the new document record
        INSERT INTO [dbo].[OrderDocument]
        (
            DocumentName,
            OrderId,
            DocumentType,
            CreatedAt,
            CreatedBy
        )
        VALUES
        (
            @DocumentName,
            @OrderId,
            @DocumentType,
            GETDATE(),
            @CreatedBy
        );

  
    SET @keyId = SCOPE_IDENTITY();   
    SELECT @keyId AS KeyValue, 'Order Documnet Added' AS ErrorMessage
    
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END
GO
/****** Object:  StoredProcedure [dbo].[AddOrderDocuments]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddOrderDocuments]                                                              
@OrderId INT,  
@CreatedBy SMALLINT,  
@OrderList dbo.OrderTypeTable READONLY
                                      
AS                                      
BEGIN                                      
 SET NOCOUNT ON;                                      
BEGIN TRY                                                
    DECLARE @keyId AS INT  
   
            BEGIN                          
                INSERT INTO [dbo].[OrderDocument]                                     
                (      
					DocumentName,
					DocumentType,
                    OrderId,                      
                    CreatedBy,                                      
                    CreatedAt                                     
                )                                      
                SELECT DocumentName,DocumentType,@OrderId,@CreatedBy,GETDATE()  
				FROM @OrderList;                     
                SET  @keyId = SCOPE_IDENTITY()                                              
                                      
                SELECT @keyId as KeyValue,                                               
                'Order Document Added' as ErrorMessage                                         
            END                          
                                      
END TRY                                                  
BEGIN CATCH                                                
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                                
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                                
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                                
 RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                                
END CATCH                                                
END 
GO
/****** Object:  StoredProcedure [dbo].[AddOrderItem]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
CREATE PROCEDURE [dbo].[AddOrderItem]        
    @OrderId INT,    
    @CatalogId NVARCHAR(1000),    
    @CasNumber NVARCHAR(1000),    
    @MdlNumber NVARCHAR(1000),    
    @ChemicalName NVARCHAR(1000),    
    @RequestDate DATETIME,    
    @PromiseDate DATETIME,    
    @OrderPriority NVARCHAR(25),    
    @ReferenceEntityId BIGINT,    
    --@OrderItemStatusId SMALLINT  ,    
    --@OrderItemSubStatusId SMALLINT ,    
    @Quantity DECIMAL(10,2),    
    @PackSize DECIMAL(10,2),    
    @Unit NVARCHAR(5),    
    @ItemUnitPrice DECIMAL(10,2),    
    @PoItemUnitPrice DECIMAL(10,2),    
    @SubTotalPrice DECIMAL(10,2),    
    @SubTotalPOPrice DECIMAL(10,2),    
    @OrderDisputTypeId SMALLINT,    
    @OrderTimeCancelReason NVARCHAR(100),    
    @EntityType VARCHAR(50),    
    @Note NVARCHAR(1000),    
    @EntityId INT,    
    @CreatedBy SMALLINT    
AS        
BEGIN        
    SET NOCOUNT ON;        
    BEGIN TRY         
    DECLARE @keyId INT;

	SET @SubTotalPrice = @ItemUnitPrice * @Quantity;
		
          
       INSERT INTO [dbo].[OrderItems]        
        (        
            OrderId,        
            CatalogId,        
            CasNumber,        
            MdlNumber,        
            ChemicalName,        
            RequestDate,        
            PromiseDate,        
            OrderPriority,        
            ReferenceEntityId,        
            OrderItemStatusId,        
            OrderItemSubStatusId,        
            Quantity,        
            PackSize,        
            Unitid,        
            ItemUnitPrice,        
            PoItemUnitPrice,        
            SubTotalPrice,        
            SubTotalPOPrice,        
            OrderDisputTypeId,        
            OrderTimeCancelReason,        
            CreatedAt,        
            CreatedBy        
        )        
        VALUES    
        (    
            @OrderId,        
            @CatalogId,        
            @CasNumber,        
            @MdlNumber,        
            @ChemicalName,        
            @RequestDate,        
            @PromiseDate,        
            @OrderPriority,        
            @ReferenceEntityId,        
            1,        
            0,        
            @Quantity,        
            @PackSize,        
            (SELECT UnitId FROM units WHERE LOWER(unit) = LOWER(@Unit)),      
            @ItemUnitPrice,        
            @PoItemUnitPrice,        
            @SubTotalPrice,        
            @SubTotalPOPrice,        
            @OrderDisputTypeId,        
            @OrderTimeCancelReason,        
            GETDATE(),        
            @CreatedBy        
        );    
             
        SET @keyId = SCOPE_IDENTITY();       
            
        SELECT @keyId AS KeyValue, 'Order item Added' AS ErrorMessage    
            
        IF @keyId > 0 AND (@Note != '' OR @Note IS NOT NULL)    
        BEGIN               
           INSERT INTO [dbo].[L_OrderNotes] (EntityType, Note, EntityId)            
           Values(@EntityType,@Note,@keyId)     
        END        
    
    END TRY          
BEGIN CATCH                                                      
    DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                                      
    DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                                      
    DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                      
END CATCH;         
END 
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderData]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
--DeleteOrderData 1146  
CREATE PROCEDURE [dbo].[DeleteOrderData]  
    @OrderId INT  ,
	 @DeletedBy SMALLINT
AS  
BEGIN  
    BEGIN TRANSACTION;  
  
    BEGIN TRY  
          UPDATE Orders
			SET DeletedBy = @DeletedBy,
            DeletedAt = GETDATE()
			WHERE OrderId = @OrderId; 

			UPDATE L_OrderAddress
			SET DeletedBy = @DeletedBy,
            DeletedAt = GETDATE()
			WHERE OrderId = @OrderId; 

			UPDATE OrderItems
			SET DeletedBy = @DeletedBy,
            DeletedAt = GETDATE()
			WHERE OrderId = @OrderId; 

			UPDATE OrderDocument
			SET DeletedBy = @DeletedBy,
            DeletedAt = GETDATE()
			WHERE OrderId = @OrderId; 

			--DELETE FROM L_OrderContacts   
			--WHERE OrderId = @OrderId;  
  
		  --  DELETE FROM OrderCharges   
		   -- WHERE OrderId = @OrderId;  
 
          
        COMMIT;  
        SELECT @OrderId AS KeyValue,      
                   'Order Data Deleted' AS ErrorMessage;   
    END TRY  
  
    BEGIN CATCH  
       DECLARE @ErrorMessage NVARCHAR(MAX) = 'Error occurred during deletion: ' + ERROR_MESSAGE(); 
        ROLLBACK;  
        PRINT 'Error occurred during deletion: ' + ERROR_MESSAGE();  
    END CATCH;  
END;  
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderDocuementById]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
    
Create PROCEDURE [dbo].[DeleteOrderDocuementById]      
 @OrderDocumentId INT,      
 @DeletedBy SMALLINT      
AS      
BEGIN      
    SET NOCOUNT ON;      
      
    BEGIN TRY      
        IF EXISTS (SELECT OrderDocumentId FROM [dbo].[OrderDocument] WHERE OrderDocumentId= @OrderDocumentId)      
        BEGIN      
            UPDATE [dbo].[OrderDocument]    
            SET      
                [DeletedBy] = @DeletedBy,      
                [DeletedAt] = GETDATE()
      
            WHERE OrderDocumentId = @OrderDocumentId   
      
            SELECT @OrderDocumentId AS KeyValue,      
            'Document Deleted' AS ErrorMessage;      
        END      
        ELSE      
        BEGIN      
            SELECT @OrderDocumentId AS KeyValue,      
            'No Record Found' AS ErrorMessage;      
        END      
    END TRY      
    BEGIN CATCH      
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();      
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();      
        DECLARE @ErrorState INT = ERROR_STATE();      
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);      
    END CATCH      
END;   
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderItem]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteOrderItem]
 @OrderItemId BIGINT,  
 @DeletedBy SMALLINT 
AS
BEGIN

 BEGIN TRY  
        IF EXISTS (SELECT OrderItemId FROM [dbo]. [OrderItems] WHERE OrderItemId = @OrderItemId )  
        BEGIN  
            UPDATE [dbo].[OrderItems]   
            SET  
                [DeletedBy] = @DeletedBy,  
                [DeletedAt] = GETDATE()  
            WHERE OrderItemId = @OrderItemId  
            
           
            
            SELECT @OrderItemId AS KeyValue,  
                   'Order Item Deleted' AS ErrorMessage;  
        END  
        ELSE  
        BEGIN  
            SELECT @OrderItemId AS KeyValue,  
                   'No Record Found' AS ErrorMessage;  
        END  
    END TRY  
    BEGIN CATCH  
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();  
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
        DECLARE @ErrorState INT = ERROR_STATE();  
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);  
    END CATCH  
	SET NOCOUNT ON;

END
GO
/****** Object:  StoredProcedure [dbo].[GetOrderAddressesByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetOrderAddressesByOrderId 4893  
CREATE PROCEDURE [dbo].[GetOrderAddressesByOrderId]  
    @AddressId INT  
AS                
BEGIN                
    SET NOCOUNT ON;                
  
    BEGIN TRY   
         SELECT 
                A.[AddressId],            
                ATS.[AddressTypeId],            
                ATS.[Type],            
                A.[AddressLine1],            
                A.[AddressLine2],            
                A.[AddressLine3],            
                A.[AddressLine4],            
                A.[AddressLine5],            
                A.[CountryId],            
                C.[Name] AS CountryName,            
                A.[StateId],     
                S.StateCode,  
                S.[Name] AS StateName,            
                A.[CityId],            
                CI.[Name] AS CityName,            
                A.[ZipCode],        
                CA.IsPreferredShipping,        
                CA.IsPreferredBilling 
            FROM [dbo].[Addresses] A 
		    LEFT JOIN [dbo].[L_CustomerAddresses] CA ON CA.AddressId = A.AddressId            
            LEFT JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = CA.AddressTypeId       
            LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId            
            LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId            
            LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId            
            WHERE A.AddressId =  @AddressId  
            AND A.DeletedBy IS NULL   
            AND A.DeletedAt IS NULL;  
    END TRY                
    BEGIN CATCH                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                
    END CATCH                
END    
GO
/****** Object:  StoredProcedure [dbo].[GetOrderContactByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetOrderContactByOrderId 1145
CREATE PROCEDURE [dbo].[GetOrderContactByOrderId]                      
	@OrderId INT                   
AS                      
BEGIN                      
    SET NOCOUNT ON;    
        
    BEGIN TRY                       
         SELECT 
            OC.OrderContactId,
            OC.OrderId,
            OC.ContactId,
            C.FirstName,
            C.LastName,
            OC.ContactTypeId,
            CT.Type AS ContactType
        FROM [dbo].[L_OrderContacts] OC
        LEFT JOIN [dbo].[Contacts] C ON OC.ContactId = C.ContactId
        LEFT JOIN [dbo].[ContactTypes] CT ON OC.ContactTypeId = CT.ContactTypeId
        WHERE OC.OrderId = @OrderId;
               
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDetailByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetOrderDetailByOrderId 1145
CREATE PROCEDURE [dbo].[GetOrderDetailByOrderId]                      
	@OrderId INT                   
AS                      
BEGIN                      
    SET NOCOUNT ON;    
        
    BEGIN TRY                       
         SELECT 
			O.OrderId,
			C.CustomerId,
			C.Name AS CustomerName,
			O.SubCustomerId,
			SC.Name AS SubCustomerName,
			O.PoNumber,
			O.OrderReceivedDate,
			O.ReferenceNumber,
			OS.Status,
			OSS.SubStatus,
			O.OrderMethodId,
			OM.OrderMethod,
			LOA.OrderAddressId,
			LOA.BillingAddressId,
			LOA.ShippingAddressId
		FROM ORDERS O
			LEFT JOIN CUSTOMERS C ON O.CustomerId = C.CustomerId
			LEFT JOIN CUSTOMERS SC ON O.SubCustomerId = SC.CustomerId
			LEFT JOIN OrderStatus OS ON O.OrderStatusId= OS.OrderStatusId
			LEFT JOIN OrderMethod OM ON O.OrderMethodId = OM.OrderMethodId
			LEFT JOIN L_OrderAddress LOA ON O.OrderId = LOA.OrderId
			LEFT JOIN OrderSubStatus OSS ON O.OrderSubStatusId= OSS.OrderSubStatusId
		WHERE O.OrderId= @OrderId
               
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDocumentByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetOrderDocumentByOrderId 1145
CREATE PROCEDURE [dbo].[GetOrderDocumentByOrderId]                      
	@OrderId INT                   
AS                      
BEGIN                      
    SET NOCOUNT ON;    
        
    BEGIN TRY                       
         SELECT 
            OD.OrderDocumentId,
            OD.DocumentName,
            OD.DocumentType AS DocumentTypeId,
            DT.Type AS DocumentType,
			OD.OrderItemId
        FROM [dbo].[OrderDocument] OD
        LEFT JOIN [dbo].[DocumentTypes] DT ON OD.DocumentType = DT.DocumentTypeId
        WHERE OD.OrderId = @OrderId AND OD.DeletedAt IS NULL AND OD.DeletedBy IS NULL
		ORDER BY OD.CreatedAt DESC
               
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrderItemByOrderItemId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetOrderItemByOrderItemId 152
CREATE PROCEDURE [dbo].[GetOrderItemByOrderItemId]                      
	@OrderItemId BIGINT                   
AS                      
BEGIN                      
    SET NOCOUNT ON;    
        
    BEGIN TRY                       
         SELECT 
			OI.OrderItemId,
			OI.catalogId,
			OI.CasNumber,
			OI.ChemicalName,
			OI.MdlNumber,
			OI.OrderPriority,
			OI.RequestDate,
			OI.PromiseDate ,
			 LON.Note
		FROM OrderItems OI
			LEFT JOIN L_OrderAddress LOA ON OI.OrderId = LOA.OrderId
			LEFT JOIN [L_OrderNotes] LON on OI.OrderItemId = LON.EntityId
			
		WHERE OI.OrderItemId= @OrderItemId
               
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrderItemsByOrderId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetOrderItemsByOrderId 1169
CREATE  PROCEDURE [dbo].[GetOrderItemsByOrderId]                                          
@OrderId INT            
as                                          
Begin                                          
SET NOCOUNT ON;                                          
BEGIN TRY                                          
                                          
 SELECT  DISTINCT             
 OI.OrderItemId,          
 OI.OrderId,          
  OI.CatalogId,             
 OI.CasNumber,                              
 OI.ItemUnitPrice,            
 OI.OrderItemStatusId,            
 OIS.ItemStatus,            
 OI.PackSize,            
 OI.SubTotalPrice,          
 OI.MdlNumber,          
 OI.ChemicalName,          
 OI.RequestDate,          
 OI.PromiseDate,          
 OI.OrderPriority ,      
 OI.Quantity,    
 OI.Unitid,    
 U.Unit,
 --(Select ShippingAddressId from L_OrderAddress LOA where ((LOA.OrderId = OI.OrderId) OR (LOA.OrderId = OI.OrderId AND LOA.OrderId = OI.OrderItemId))) as ShippingAddressId
 --LON.Note AS OrderNote
 LOA.ShippingAddressId
 FROM [dbo].[OrderItems] OI                             
 LEFT JOIN [dbo].[OrderItemStatus] OIS ON  OI.OrderItemStatusId = OIS.OrderItemStatusId      
 LEFT JOIN [dbo].[Units] U ON U.Unitid = OI.Unitid    
 --LEFT JOIN [L_OrderNotes] LON on OI.OrderItemId = LON.EntityId    
 LEFT JOIN L_OrderAddress LOA ON LOA.OrderId = OI.OrderId  
 WHERE (@OrderId = 0 OR   OI.OrderId = @OrderId)       
 AND OI.DeletedBy IS NULL                           
 AND OI.DeletedAt IS NULL
 --GROUP BY OI.OrderItemId,          
 --OI.OrderId,          
 -- OI.CatalogId,             
 --OI.CasNumber,                              
 --OI.ItemUnitPrice,            
 --OI.OrderItemStatusId,            
 --OIS.ItemStatus,            
 --OI.PackSize,            
 --OI.SubTotalPrice,          
 --OI.MdlNumber,          
 --OI.ChemicalName,          
 --OI.RequestDate,          
 --OI.PromiseDate,          
 --OI.OrderPriority ,      
 --OI.Quantity,    
 --OI.Unitid,    
 --U.Unit,
 --ShippingAddressId
END TRY                                          
BEGIN CATCH                                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                          
END CATCH                                          
END
GO
/****** Object:  StoredProcedure [dbo].[GetOrders]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--======================================================================    
-- GetOrders 1,25,'','',2,Null,1,500    
CREATE PROCEDURE [dbo].[GetOrders]    
    @PageNumber INT = 1,    
    @PageSize INT = 25,    
    @SearchText NVARCHAR(200) = '',    
    @SortString VARCHAR(250) = '',    
    @OrderStatusId SMALLINT = NULL,    
    @OrderSubStatusId SMALLINT = NULL,    
 @OrderItemStatusId SMALLINT = NULL,    
    @TotalCount INT OUTPUT    
AS                                            
BEGIN                       
    SET NOCOUNT ON;                    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                    
    DECLARE @OrderBy NVARCHAR(250);        
    
    IF @SortString = '' OR @SortString IS NULL      
    BEGIN        
        SET @OrderBy = 'O.OrderId DESC';        
    END       
    ELSE    
    BEGIN    
        SET @OrderBy = @SortString;        
    END    
                
    -- Get the total count                    
    SELECT @TotalCount = COUNT(*)                    
    FROM [dbo].[ORDERS] O    
    LEFT JOIN CUSTOMERS C ON O.CustomerId = C.CustomerId    
    LEFT JOIN OrderMethod OM ON O.OrderMethodId = OM.OrderMethodId    
    WHERE       
        O.DeletedAt IS NULL AND O.DeletedBy IS NULL AND      
        (      
            @SearchText = '' OR      
            C.Name LIKE '%' + @SearchText + '%' OR      
            O.PoNumber LIKE '%' + @SearchText + '%' OR      
            OM.OrderMethod LIKE '%' + @SearchText + '%'      
        )        
          
    DECLARE @SQL NVARCHAR(MAX);             
    SET @SQL = '    
        SELECT     
            O.OrderId,    
            C.CustomerId,    
            C.Name AS CustomerName,    
            O.SubCustomerId,    
            SC.Name AS SubCustomerName,    
            O.PoNumber,    
            O.OrderReceivedDate,    
            OM.OrderMethodId,    
            OM.OrderMethod,    
            COUNT(OI.OrderItemId) AS Items,      
            SUM(OI.ItemUnitPrice) AS ItemsTotal     
        FROM ORDERS O    
        LEFT JOIN CUSTOMERS C ON O.CustomerId = C.CustomerId    
        LEFT JOIN CUSTOMERS SC ON O.SubCustomerId = SC.CustomerId    
        LEFT JOIN OrderMethod OM ON O.OrderMethodId = OM.OrderMethodId    
        LEFT JOIN OrderItems OI ON O.OrderId = OI.OrderId AND OI.DeletedAt IS NULL AND OI.DeletedBy IS NULL 
    
        WHERE O.DeletedAt IS NULL AND O.DeletedBy IS NULL AND    
            O.OrderStatusId = @OrderStatusId       
   AND ((@OrderSubStatusId IS NULL OR O.OrderSubStatusId = @OrderSubStatusId)     OR (@OrderItemStatusId IS NULL OR OI.OrderItemStatusId = @OrderItemStatusId))    
    AND    
            (@SearchText = '''' OR  C.Name LIKE ''%'' + @SearchText + ''%'' OR  O.PoNumber LIKE ''%'' + @SearchText + ''%'' OR OM.OrderMethod LIKE ''%'' + @SearchText + ''%'')    
        GROUP BY  O.OrderId, C.Name, O.SubCustomerId, SC.Name,    
            OM.OrderMethod,  OM.OrderMethodId,  O.PoNumber,     
            O.OrderReceivedDate, C.CustomerId    
        ORDER BY ' + @OrderBy + '       
        OFFSET @Offset ROWS                    
        FETCH NEXT @PageSize ROWS ONLY;';                   
    
    EXEC sp_executesql @SQL,             
        N'@SearchText NVARCHAR(200), @OrderStatusId SMALLINT, @OrderSubStatusId SMALLINT,  @OrderItemStatusId SMALLINT,@Offset INT, @PageSize INT',             
        @SearchText, @OrderStatusId, @OrderSubStatusId, @OrderItemStatusId, @Offset, @PageSize;                               
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderAddress]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateOrderAddress]            
    @OrderAddressId INT,    
    @OrderId INT,    
    @BillingAddressId INT,    
    @ShippingAddressId INT,   
    @OrderItemId INT,
    @UpdatedBy SMALLINT         
AS            
BEGIN            
    SET NOCOUNT ON;            
    BEGIN TRY                      
        IF @OrderItemId = 0
        BEGIN
            UPDATE [dbo].[L_OrderAddress] 
            SET 
                [BillingAddressId] = CASE WHEN @BillingAddressId > 0 THEN @BillingAddressId ELSE BillingAddressId END,     
                [ShippingAddressId] = CASE WHEN @ShippingAddressId > 0 THEN @ShippingAddressId ELSE ShippingAddressId END,
                [OrderId] = @OrderId,    
                [UpdatedAt] = GETDATE(),    
                [UpdatedBy] = @UpdatedBy        
            WHERE 
                [OrderAddressId] = @OrderAddressId 
                AND DeletedAt IS NULL 
                AND DeletedBy IS NULL;    
                
            SELECT @OrderAddressId AS KeyValue,                     
                   'Order Address Updated' AS ErrorMessage;   
        END
        ELSE  
        BEGIN
            IF @OrderItemId > 0
            BEGIN
                IF EXISTS (SELECT 1 
                           FROM [dbo].[L_OrderAddress] 
                           WHERE OrderId = @OrderId 
                           AND OrderItemId = @OrderItemId 
                           AND DeletedAt IS NULL 
                           AND DeletedBy IS NULL)
                BEGIN
                    PRINT 'Updating existing record for @OrderItemId';
                    UPDATE [dbo].[L_OrderAddress] 
                    SET 
                        [BillingAddressId] = CASE WHEN @BillingAddressId > 0 THEN @BillingAddressId ELSE BillingAddressId END,     
                        [ShippingAddressId] = CASE WHEN @ShippingAddressId > 0 THEN @ShippingAddressId ELSE ShippingAddressId END,
                        [UpdatedAt] = GETDATE(),    
                        [UpdatedBy] = @UpdatedBy        
                    WHERE 
                        OrderItemId = @OrderItemId 
                        AND DeletedAt IS NULL 
                        AND DeletedBy IS NULL;
                    
                    SELECT @OrderAddressId AS KeyValue,                     
                           'Order item Address Updated' AS ErrorMessage;  
                END
                ELSE
                BEGIN
                    INSERT INTO [dbo].[L_OrderAddress] 
                        (OrderId, BillingAddressId, ShippingAddressId, OrderItemId, CreatedAt, CreatedBy)
                    VALUES 
                        (@OrderId, 
                         CASE WHEN @BillingAddressId > 0 THEN @BillingAddressId ELSE NULL END,     
                         CASE WHEN @ShippingAddressId > 0 THEN @ShippingAddressId ELSE NULL END,
                         @OrderItemId,
                         GETDATE(), 
                         @UpdatedBy);
                
                    SELECT SCOPE_IDENTITY() AS KeyValue, 
                           'Order item Address Inserted' AS ErrorMessage;
                END
            END
            ELSE 
            BEGIN
                UPDATE [dbo].[L_OrderAddress] 
                SET 
                    [BillingAddressId] = CASE WHEN @BillingAddressId > 0 THEN @BillingAddressId ELSE BillingAddressId END,     
                    [ShippingAddressId] = CASE WHEN @ShippingAddressId > 0 THEN @ShippingAddressId ELSE ShippingAddressId END,
                    [OrderId] = @OrderId,    
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @UpdatedBy        
                WHERE 
                    [OrderAddressId] = @OrderAddressId 
                    AND DeletedAt IS NULL 
                    AND DeletedBy IS NULL;    
                    
                SELECT @OrderAddressId AS KeyValue,                     
                       'Order Address Updated' AS ErrorMessage;            
            END 
        END
    END TRY      
     
    BEGIN CATCH                      
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();                      
        DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY();                      
        DECLARE @ErrorState nvarchar(max) = ERROR_STATE();                      
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                      
    END CATCH;                   
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderContacts]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateOrderContacts]          
@OrderContactId INT,  
@OrderId INT,  
@ContactId INT,  
@ContactTypeId INT
     
AS          
BEGIN          
 SET NOCOUNT ON;          
 BEGIN TRY                    
  IF NOT EXISTS(SELECT OrderContactId FROM [dbo].[L_OrderContacts] WHERE OrderContactId = @OrderContactId )          
  BEGIN          
   SELECT @OrderContactId as KeyValue,                   
   'NO RECORD FOUND' as ErrorMessage          
  END          
  ELSE          
  BEGIN          
    
   	 
   UPDATE [dbo].[L_OrderContacts] SET    
   [ContactId] =  @ContactId ,
   [ContactTypeId] =  @ContactTypeId, 
   [OrderId] = @OrderId
         
   WHERE [OrderContactId] = @OrderContactId ; 
          
   SELECT @OrderContactId as KeyValue,                   
   'Order Contact Updated' as ErrorMessage           
  END          
          
 END TRY                      
BEGIN CATCH                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                    
END CATCH               
          
          
END   
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderDetail]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
       
CREATE PROCEDURE [dbo].[UpdateOrderDetail]              
@OrderId INT,    
@OrderMethodId TINYINT,    
@OrderReceivedDate DATETIME,    
@ReferenceNumber NVARCHAR(100),   
@CustomerId INT,  
@PoNumber VARCHAR(255),  
@UpdatedBy SMALLINT          
AS              
BEGIN              
 SET NOCOUNT ON;              
BEGIN TRY                        
     --select * from [dbo].[ where OrderId=1173      
  IF NOT EXISTS (SELECT OrderId FROM [Orders] WHERE OrderId = @OrderId AND deletedat IS NULL and deletedby IS NULL)              
  BEGIN              
   SELECT @OrderId as KeyValue,                       
   'NO RECORD FOUND' as ErrorMessage              
  END              
  ELSE              
  BEGIN  
	 IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE PoNumber = @PoNumber AND CustomerId != @CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL)   
	 BEGIN      
		 SELECT CAST(0 AS INT) AS KeyValue,                                
		 'PoNumber already exists for this customer.' AS ErrorMessage;             
	 END 
  ELSE  
	 BEGIN  
		  UPDATE [dbo].[Orders] SET        
		  [OrderMethodId] = @OrderMethodId,    
		  [OrderReceivedDate] = @OrderReceivedDate,    
		  [ReferenceNumber] = @ReferenceNumber, 
		  [PoNumber] =@PoNumber,
		  [UpdatedBy] = @UpdatedBy,     
		  [UpdatedAt]=GETDATE()    
		  WHERE [OrderId] = @OrderId AND deletedat IS NULL and deletedby IS NULL      
  
			SELECT @OrderId as KeyValue,                       
			'Order Detail Updated' as ErrorMessage               
	   END              
	 END            
 END TRY                          
BEGIN CATCH                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                        
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderItemByOrderItemId]    Script Date: 10-10-2024 17:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
       
CREATE PROCEDURE [dbo].[UpdateOrderItemByOrderItemId]        
@OrderItemId INT,
@OrderId INT,
@CatalogId NVARCHAR(1000),
@CasNumber NVARCHAR(1000),
@ChemicalName nvarchar(100),
@MdlNumber nvarchar(1000),
@Note nvarchar(1000),
@OrderPriority nvarchar(25),
@RequestDate datetime,
@PromiseDate datetime,
@EntityType VARCHAR(50),
@UpdatedBy SMALLINT        
AS        
BEGIN        
 SET NOCOUNT ON;        
BEGIN TRY                  
IF NOT EXISTS (SELECT OrderItemId FROM [dbo].[OrderItems] WHERE OrderItemId = @OrderItemId)         
BEGIN        
  SELECT @OrderItemId as KeyValue,                 
  'NO RECORD FOUND' as ErrorMessage        
END        
ELSE        
BEGIN        
        
 UPDATE [dbo].[OrderItems] SET  
	CatalogId = @CatalogId,
	CasNumber = @CasNumber,
    ChemicalName=@ChemicalName, 
	OrderPriority=@OrderPriority,
	MdlNumber=@MdlNumber,
	RequestDate=@RequestDate,
	PromiseDate=@PromiseDate,

    UpdatedBy = @UpdatedBy,        
    UpdatedAt = GETDATE()        
 WHERE OrderItemId = @OrderItemId AND [OrderId] = @OrderId AND deletedat IS NULL and deletedby IS NULL 


			IF @OrderItemId > 0   
			BEGIN 
			-- Check if a note already exists for this OrderItemId and EntityType
			IF EXISTS (SELECT 1 FROM [dbo].[L_OrderNotes] WHERE EntityId = @OrderItemId AND EntityType = @EntityType)
			BEGIN
				-- Update existing note
				UPDATE [dbo].[L_OrderNotes]
				SET Note = @Note
				WHERE EntityId = @OrderItemId AND EntityType = @EntityType;
			END
			ELSE
			BEGIN
				-- Insert new note
				INSERT INTO [dbo].[L_OrderNotes] (EntityType, Note, EntityId)
				VALUES (@EntityType, @Note, @OrderItemId);
			END
		END;

 SELECT @OrderItemId as KeyValue,                 
 'Order Item Updated' as ErrorMessage         
END        
        
END TRY                    
BEGIN CATCH                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                  
END CATCH             
        
        
END 
GO
