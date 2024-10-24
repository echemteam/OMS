USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetAllCustomers]    Script Date: 06-08-2024 16:32:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetAllCustomers]
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                 
                    
SELECT    
    C.[CustomerId],  
    C.[Name],
    C.IsBuyingForThirdParty,
    C.StatusId,
    S.[Status] as StatusName,
    C.CreatedAt
FROM [dbo].[Customers] C
LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId
WHERE C.deletedby IS NULL 
  AND C.deletedAt IS NULL   
                                                
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllSubCustomerByCustomerId]    Script Date: 06-08-2024 16:32:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllSubCustomerByCustomerId 1109
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[GetAllSubCustomerByCustomerId]
@CustomerId INT  
AS                                      
BEGIN                                      
 SET NOCOUNT ON;                                      
BEGIN TRY                                              
                            
SELECT            
            SC.SubCustomerMainCustomerId,    
            SC.CustomerId,    
            SC.SubCustomerId,    
            C.[Name] AS SubCustomerName,
            C.StatusId,
            S.[Status] AS StatusName,
			C.CreatedAt
			 
        FROM [dbo].[SubCustomerMainCustomer] SC
        LEFT JOIN [dbo].[Customers] C ON  C.[CustomerId] = SC.[SubCustomerId] 
        LEFT JOIN [dbo].[Status] S ON S.StatusId =C.StatusId   
        WHERE SC.CustomerId = @CustomerId 
		 AND C.IsBuyingForThirdParty=1
          AND SC.[DeletedAt] IS NULL 
          AND SC.[DeletedBy] IS NULL  
   
END TRY                                              
BEGIN CATCH                                              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                              
END CATCH                                       
                                      
END 
GO
