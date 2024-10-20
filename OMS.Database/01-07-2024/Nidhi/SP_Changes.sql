USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetAllAddressTypes]    Script Date: 01-07-2024 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllAddressTypes       
CREATE PROCEDURE [dbo].[GetAllAddressTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
[AddressTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM [dbo].[AddressTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllContactTypes]    Script Date: 01-07-2024 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllContactTypes       
CREATE PROCEDURE [dbo].[GetAllContactTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
[ContactTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM [dbo].[ContactTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllDocumentTypes]    Script Date: 01-07-2024 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllDocumentTypes       
CREATE PROCEDURE [dbo].[GetAllDocumentTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT
[DocumentTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM  [dbo].[DocumentTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllGroupTypes]    Script Date: 01-07-2024 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllGroupTypes       
CREATE PROCEDURE [dbo].[GetAllGroupTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
 [GroupTypeId],    
 [Type],
 [IsForCustomers],
 [IsForSuppliers]
FROM  [dbo].[GroupTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
