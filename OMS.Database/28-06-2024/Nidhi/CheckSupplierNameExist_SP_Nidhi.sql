USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[CheckSupplierNameExist]    Script Date: 25-06-2024 18:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[CheckSupplierNameExist]      
@Name VARCHAR(150)

AS      
BEGIN      
    SET NOCOUNT ON;

    BEGIN TRY                
        IF EXISTS (SELECT SupplierId FROM [dbo].[Suppliers] WHERE Name = @Name AND DeletedBy IS NULL AND DeletedAt IS NULL)
        BEGIN      
            SELECT CAST(0 AS INT) AS KeyValue,               
            'Supplier name already exists' AS ErrorMessage;         
        END      
        ELSE      
        BEGIN
            SELECT CAST(1 AS INT) AS KeyValue,               
            'Supplier name does not exist' AS ErrorMessage;         
        END
    END TRY                  
    BEGIN CATCH                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                
        DECLARE @ErrorState INT = ERROR_STATE();                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                
    END CATCH;                
END;
GO
