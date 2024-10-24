USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetAllUser]    Script Date: 28-06-2024 18:06:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetAllUser]
	
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT
	UserId,
	CONCAT(FirstName, ' ', LastName) AS FullName
 from Users 
      WHERE DeletedAt IS NULL AND DeletedBy IS NULL And IsActive=1;
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
