USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAuditHistoryByCustomerId]    Script Date: 28-06-2024 10:57:49 ******/
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
