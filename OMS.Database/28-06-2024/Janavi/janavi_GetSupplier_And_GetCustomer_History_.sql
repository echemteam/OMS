USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAuditHistoryByCustomerId]    Script Date: 27-06-2024 11:42:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
--GetCustomerAuditHistoryByCustomerId 1106                   
CREATE PROCEDURE [dbo].[GetCustomerAuditHistoryByCustomerId]  
	@PageNumber INT = 1,            
	@PageSize INT = 25,            
--	@SearchText NVARCHAR(50) = '0',                     
	@TotalCount INT OUTPUT,
	@CustomerId INT                  
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
 BEGIN TRY            
	DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;            
 

	 -- Get the total count            
    SELECT @TotalCount = COUNT(*)            
    FROM [dbo].[CustomerAuditHistory] CAH
    LEFT JOIN Users U ON CAH.ChangedBy = U.UserId    
    WHERE (@CustomerId = 0 OR CAH.CustomerId = @CustomerId); 
	
           -- Select the data with the corrected WHERE clause 
        SELECT                    
            CAH.CustomerAuditHistoryId,    
            CAH.CustomerId,    
            CAH.EventName,    
            CAH.ChangedBy,    
            CAH.ChangedAt,    
            CAH.Description,  
            U.FirstName + ' ' + U.LastName AS Name,  
            CAH.EventStatus  
        FROM    
            [dbo].[CustomerAuditHistory] CAH  
        LEFT JOIN   
            Users U ON CAH.ChangedBy = U.UserId 
        WHERE   
            CAH.CustomerId = @CustomerId
        ORDER BY CustomerAuditHistoryId DESC 
		OFFSET @Offset ROWS            
    FETCH NEXT @PageSize ROWS ONLY;  
    END TRY                                    
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAuditHistoryBySupplierId]    Script Date: 27-06-2024 11:42:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetSupplierAuditHistoryBySupplierId]
	@PageNumber INT = 1,            
	@PageSize INT = 25,                               
	@TotalCount INT OUTPUT,
	@SupplierId INT  
AS 
BEGIN
	
	SET NOCOUNT ON;
		BEGIN TRY 
	DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;  
	
	   SELECT @TotalCount = COUNT(*)  
	    FROM [dbo].SupplierAuditHistory SAH
		  LEFT JOIN Users U ON SAH.ChangedBy = U.UserId    
    WHERE  (SupplierId = 0 OR SAH .SupplierId  = @SupplierId )
                           
        SELECT                    
            SAH.SupplierAuditHistoryId,    
            SAH.SupplierId ,    
            SAH.EventName,    
           SAH.ChangedBy,    
            SAH.ChangedAt,    
            SAH.Description,  
            U.FirstName + ' ' + U.LastName AS Name,  
            SAH.EventStatus  
        FROM    
            [dbo].[SupplierAuditHistory] SAH  
        LEFT JOIN   
            Users U ON SAH.ChangedBy = U.UserId 
        WHERE SAH .SupplierId  = @SupplierId 
        ORDER BY SupplierAuditHistoryId DESC    
			OFFSET @Offset ROWS            
    FETCH NEXT @PageSize ROWS ONLY;  
    END TRY                                    
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH   
 
END

GO
