USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetOrders]    Script Date: 03-10-2024 14:40:25 ******/
DROP PROCEDURE [dbo].[GetOrders]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDocumentByOrderId]    Script Date: 03-10-2024 14:40:25 ******/
DROP PROCEDURE [dbo].[GetOrderDocumentByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDetailByOrderId]    Script Date: 03-10-2024 14:40:25 ******/
DROP PROCEDURE [dbo].[GetOrderDetailByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderContactByOrderId]    Script Date: 03-10-2024 14:40:25 ******/
DROP PROCEDURE [dbo].[GetOrderContactByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderAddressesByOrderId]    Script Date: 03-10-2024 14:40:25 ******/
DROP PROCEDURE [dbo].[GetOrderAddressesByOrderId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderAddressesByOrderId]    Script Date: 03-10-2024 14:40:25 ******/
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
/****** Object:  StoredProcedure [dbo].[GetOrderContactByOrderId]    Script Date: 03-10-2024 14:40:26 ******/
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
/****** Object:  StoredProcedure [dbo].[GetOrderDetailByOrderId]    Script Date: 03-10-2024 14:40:26 ******/
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
/****** Object:  StoredProcedure [dbo].[GetOrderDocumentByOrderId]    Script Date: 03-10-2024 14:40:26 ******/
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
               
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrders]    Script Date: 03-10-2024 14:40:26 ******/
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
        SET @OrderBy = 'O.OrderReceivedDate DESC';    
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
        LEFT JOIN OrderItems OI ON O.OrderId = OI.OrderId

        WHERE O.DeletedAt IS NULL AND O.DeletedBy IS NULL AND
            O.OrderStatusId = @OrderStatusId   
			AND ((@OrderSubStatusId IS NULL OR O.OrderSubStatusId = @OrderSubStatusId) OR (@OrderItemStatusId IS NULL OR OI.OrderItemStatusId = @OrderItemStatusId))
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
