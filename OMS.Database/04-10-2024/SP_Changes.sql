USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrderData]    Script Date: 04-10-2024 18:04:33 ******/
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
/****** Object:  StoredProcedure [dbo].[GetOrderItemsByOrderId]    Script Date: 04-10-2024 18:04:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetOrderItemsByOrderId 1159        
CREATE  PROCEDURE [dbo].[GetOrderItemsByOrderId]                                      
@OrderId INT        
as                                      
Begin                                      
SET NOCOUNT ON;                                      
BEGIN TRY                                      
                                      
 SELECT           
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
 U.Unit
 FROM [dbo].[OrderItems] OI                         
 LEFT JOIN [dbo].[OrderItemStatus] OIS ON  OI.OrderItemStatusId = OIS.OrderItemStatusId  
 LEFT JOIN [dbo].[Units] U ON U.Unitid = OI.Unitid
 WHERE (@OrderId = 0 OR   OI.OrderId = @OrderId)        
        
 AND OI.DeletedBy IS NULL                       
 AND OI.DeletedAt IS NULL                                                      
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                                      
END           
      
GO
/****** Object:  StoredProcedure [dbo].[GetOrders]    Script Date: 04-10-2024 18:04:34 ******/
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
			AND ((@OrderSubStatusId IS NULL OR O.OrderSubStatusId = @OrderSubStatusId)
			 OR (@OrderItemStatusId IS NULL OR OI.OrderItemStatusId = @OrderItemStatusId))
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
