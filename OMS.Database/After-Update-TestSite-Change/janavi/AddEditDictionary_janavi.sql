USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditDictionary]    Script Date: 18-09-2024 14:39:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditDictionary]     
    @DictionaryId INT,    
    @Key NVARCHAR(200),    
    @Value NVARCHAR(200),    
    @CreatedBy SMALLINT    
AS    
BEGIN    
    SET NOCOUNT ON;    
    
  
    BEGIN TRY
        DECLARE @keyId INT;


        -- Check for duplicate Key if updating an existing record
        IF @DictionaryId > 0
        BEGIN
            -- Check if the record exists
            IF NOT EXISTS (SELECT 1 FROM [dbo].[Dictionary] WHERE DictionaryId = @DictionaryId)
            BEGIN
                SELECT @DictionaryId AS KeyValue,           
				'NO RECORD FOUND' AS ErrorMessage; 
                RETURN;
            END

			 IF EXISTS (  
                SELECT 1   
                FROM [dbo].[Dictionary]   
                WHERE [Key] = @Key   
                  AND [Value] = @Value 
				  AND DictionaryId != @DictionaryId
                  AND DeletedAt IS NULL   
                  AND DeletedBy IS NULL  
            )  
            BEGIN  
                SELECT CAST(0 AS INT) AS KeyValue, 'Key-Value pair already exists' AS ErrorMessage;   
                RETURN;  
            END  

            -- Update the record
            UPDATE [dbo].[Dictionary]
            SET [Key] = @Key,  
                [Value] = @Value,
                UpdatedBy = @CreatedBy,                    
                UpdatedAt = GETDATE()
            WHERE DictionaryId = @DictionaryId;


			SELECT @DictionaryId AS KeyValue,           
			'Dictionary Updated' AS ErrorMessage; 
        END
        ELSE
        BEGIN
     
			   IF EXISTS (  
                SELECT 1   
                FROM [dbo].[Dictionary]   
                WHERE [Key] = @Key   
                  AND [Value] = @Value  
                  AND DeletedAt IS NULL   
                  AND DeletedBy IS NULL  
            )  
            BEGIN  
                SELECT CAST(0 AS INT) AS KeyValue, 'Key-Value pair already exists' AS ErrorMessage;   
                RETURN;  
            END  
            -- Insert a new record
            INSERT INTO [dbo].[Dictionary]
                ([Key], [Value], CreatedBy, CreatedAt)
            VALUES
                (@Key, @Value, @CreatedBy, GETDATE());


            SET @keyId = SCOPE_IDENTITY();

			SELECT @keyId AS KeyValue,           
			'Dictionary Added' AS ErrorMessage; 
			RETURN;
        END
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END 
GO
