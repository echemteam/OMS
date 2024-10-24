USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddSupplierDocuments]    Script Date: 28-06-2024 18:03:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddSupplierDocuments] 
@Name VARCHAR(75),                        
@DocumentTypeId TINYINT,                        
@SupplierId INT,                        
@Attachment NVARCHAR(255),                   
@CreatedBy SMALLINT                              
                              
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                        
    DECLARE @keyId AS INT                                
                   
                
        IF EXISTS (SELECT 1 FROM [dbo].[SupplierDocuments] WHERE DocumentTypeId = @DocumentTypeId and SupplierId=@SupplierId AND DeletedAt IS NULL AND DeletedBy IS NULL)                         
            BEGIN                    
                SELECT CAST(0 AS INT) as KeyValue,                                                        
                'Document exists on this type, Only one document per type' as ErrorMessage                           
            END         
        ELSE IF EXISTS (SELECT 1 FROM [dbo].[SupplierDocuments] WHERE Name = @Name AND SupplierId=@SupplierId)                    
             BEGIN                 
                SELECT CAST(0 AS INT) as KeyValue,                                      
                'Document name already exists' as ErrorMessage                          
              END                   
       ELSE                  
            BEGIN                  
                INSERT INTO [dbo].[SupplierDocuments]                             
                (                        
                    Name,          
                    DocumentTypeId,          
                    SupplierId,          
                    Attachment,          
                    StatusId,                      
                    CreatedBy,                              
                    CreatedAt                             
                )                              
                VALUES                            
                (                        
                    @Name,          
                    @DocumentTypeId,          
                    @SupplierId,          
                    @Attachment,            
                    1,                
                    @CreatedBy,                              
                    GETDATE()                              
                )                              
                              
                SET  @keyId = SCOPE_IDENTITY()                                      
                              
                SELECT @keyId as KeyValue,                                       
                'Document Added' as ErrorMessage                                 
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
/****** Object:  StoredProcedure [dbo].[DeleteSupplierDocuementById]    Script Date: 28-06-2024 18:03:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteSupplierDocuementById] 
@SupplierDocumentId INT,    
 @DeletedBy SMALLINT    
AS    
BEGIN    
    SET NOCOUNT ON;    
    
    BEGIN TRY    
        IF EXISTS (SELECT SupplierDocumentId FROM [dbo].[SupplierDocuments] WHERE SupplierDocumentId= @SupplierDocumentId)    
        BEGIN    
            UPDATE [dbo].[SupplierDocuments]    
            SET    
                [DeletedBy] = @DeletedBy,    
                [DeletedAt] = GETDATE()    
            WHERE SupplierDocumentId = @SupplierDocumentId 
    
            SELECT @SupplierDocumentId AS KeyValue,    
            'Document Deleted' AS ErrorMessage;    
        END    
        ELSE    
        BEGIN    
            SELECT @SupplierDocumentId AS KeyValue,    
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
/****** Object:  StoredProcedure [dbo].[GetSupplierDocuementById]    Script Date: 28-06-2024 18:03:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetSupplierDocuementById]
@SupplierId int                   
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                   
    SELECT
        SD.SupplierDocumentId,      
        SD.Name,
        SD.DocumentTypeId,
        DT.Type,
        SD.SupplierId,
        SD.Attachment
    FROM [dbo].[SupplierDocuments] SD          
    left JOIN [dbo].[DocumentTypes] DT ON DT.DocumentTypeId= SD.DocumentTypeId
    WHERE  SD.SupplierId=@SupplierId AND SD.DeletedBy IS NULL AND SD.DeletedAt IS NULL              
    ORDER BY SD.SupplierDocumentId DESC              
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH       
END       
GO
