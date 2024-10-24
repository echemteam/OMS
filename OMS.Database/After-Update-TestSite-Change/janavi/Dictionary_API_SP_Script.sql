USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditDictionary]    Script Date: 11-09-2024 14:57:15 ******/
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

            -- Check if the Key exists for another record
            IF EXISTS (
                SELECT 1 
                FROM [dbo].[Dictionary] 
                WHERE [Key] = @Key 
                  AND DictionaryId != @DictionaryId
                  AND DeletedAt IS NULL 
                  AND DeletedBy IS NULL
            )
            BEGIN
                SELECT @DictionaryId AS KeyValue,           
				'Key exists for another record' AS ErrorMessage; 
                RETURN;
            END

            -- Check if the Value exists with a different Key
            IF EXISTS (
                SELECT 1 
                FROM [dbo].[Dictionary] 
                WHERE [Value] = @Value 
                  AND [Key] <> @Key
                  AND DictionaryId != @DictionaryId
                  AND DeletedAt IS NULL 
                  AND DeletedBy IS NULL
            )
            BEGIN
               SELECT @DictionaryId AS KeyValue,           
				'Value exists with a different Key' AS ErrorMessage; 
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
            -- Check if the Key already exists
            IF EXISTS (
                SELECT 1 
                FROM [dbo].[Dictionary] 
                WHERE [Key] = @Key 
                  AND DeletedAt IS NULL 
                  AND DeletedBy IS NULL
            )
            BEGIN
				SELECT CAST(0 AS INT) AS KeyValue,           
				'Key exists' AS ErrorMessage; 
				RETURN;
            END

            -- Check if the Value exists with a different Key
            IF EXISTS (
                SELECT 1 
                FROM [dbo].[Dictionary] 
                WHERE [Value] = @Value 
                  AND [Key] <> @Key 
                  AND DeletedAt IS NULL 
                  AND DeletedBy IS NULL
            )
            BEGIN
				SELECT CAST(0 AS INT) AS KeyValue,           
				'Value exists with a different Key' AS ErrorMessage; 
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
/****** Object:  StoredProcedure [dbo].[DeleteDictionary]    Script Date: 11-09-2024 14:57:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteDictionary]
 @DictionaryId int,  
 @DeletedBy SMALLINT 
AS
BEGIN

 BEGIN TRY  
        IF EXISTS (SELECT DictionaryId FROM [dbo]. [Dictionary] WHERE DictionaryId = @DictionaryId )  
        BEGIN  
            UPDATE [dbo].[Dictionary]   
            SET  
                [DeletedBy] = @DeletedBy,  
                [DeletedAt] = GETDATE()  
            WHERE DictionaryId = @DictionaryId   
            
           
            
            SELECT @DictionaryId AS KeyValue,  
                   'Dictionary Deleted' AS ErrorMessage;  
        END  
        ELSE  
        BEGIN  
            SELECT @DictionaryId AS KeyValue,  
                   'No Record Found' AS ErrorMessage;  
        END  
    END TRY  
    BEGIN CATCH  
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();  
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
        DECLARE @ErrorState INT = ERROR_STATE();  
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);  
    END CATCH  
	SET NOCOUNT ON;

END
GO
/****** Object:  StoredProcedure [dbo].[GetDictionary]    Script Date: 11-09-2024 14:57:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllDictionary 1,25,'','',100
CREATE PROCEDURE [dbo].[GetDictionary]
 @PageNumber INT = 1,                  
    @PageSize INT = 25,                  
    @SearchText NVARCHAR(200),  
    @SortString VARCHAR(250),                    
    @TotalCount INT OUTPUT   
AS
BEGIN
  SET NOCOUNT ON;                  
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                  
      
    DECLARE @OrderBy NVARCHAR(250) = '';    
    SET @OrderBy = @SortString   
      
      IF @SortString = '' OR @SortString IS NULL  
    BEGIN    
        SET @OrderBy = 'D.DictionaryId DESC';    
    END
              
    -- Get the total count                  
    SELECT @TotalCount = COUNT(*)                  
    FROM [dbo].[Dictionary] D                       
    WHERE      D .DeletedAt IS NULL AND D .DeletedBy IS NULL AND ( 
            @SearchText = '' OR    
            D.[Key] LIKE '%' + @SearchText + '%' OR    
            D.[Value] LIKE '%' + @SearchText + '%' )
                   
      
    DECLARE @SQL NVARCHAR(MAX);         
    SET @SQL='           
        SELECT    
			D.[DictionaryId],
           D.[Key],    
            D.[Value]    
            
        FROM [dbo].[Dictionary] D                            
        WHERE     D .DeletedAt IS NULL AND D .DeletedBy IS NULL AND (  
                @SearchText = '''' OR    
                D.[Key] LIKE ''%'' + @SearchText + ''%'' OR    
                D.[Value] LIKE ''%'' + @SearchText + ''%'')     
             
        
        ORDER BY ' + @OrderBy + '                  
        OFFSET @Offset ROWS                  
        FETCH NEXT @PageSize ROWS ONLY;';                 
             
        EXEC sp_executesql @SQL,  
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',  
        @SearchText, @Offset, @PageSize;            
	
END
GO
/****** Object:  StoredProcedure [dbo].[GetDictionaryByDictioryId]    Script Date: 11-09-2024 14:57:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetDictionaryByDictioryId]
@DictionaryId int
AS
BEGIN

	SET NOCOUNT ON;
BEGIN TRY            
            
  SELECT 
  [DictionaryId],
 [Key],  
 [Value]
         
  FROM [dbo].[Dictionary] D          
  WHERE DictionaryId = @DictionaryId  
  AND D.DeletedBy IS NULL                 
 AND D.DeletedAt IS NULL 

        
END TRY            
BEGIN CATCH            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
END CATCH        
    
END
GO
