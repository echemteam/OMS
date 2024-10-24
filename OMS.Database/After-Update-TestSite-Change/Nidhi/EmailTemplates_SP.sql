USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditEmailTemplates]    Script Date: 11-09-2024 15:00:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddEditEmailTemplates]
@EmailTemplateId int,
@EmailTemplateName nvarchar(100) ,
@Subject nvarchar(250),
@EmailBody nvarchar(max),
@IsActive bit,
@CreatedBy SMALLINT
AS
BEGIN
	
	SET NOCOUNT ON;
	    BEGIN TRY 
	
	 DECLARE @keyId AS INT;        
	   IF @EmailTemplateId > 0        
        BEGIN        
            IF EXISTS (SELECT 1 FROM [dbo].[EmailTemplates] WHERE EmailTemplateId = @EmailTemplateId)        
            BEGIN        
                UPDATE [dbo].[EmailTemplates]        
                SET        
                    [EmailTemplateName] = @EmailTemplateName,  
                    [Subject] = @Subject,
					[EmailBody]=@EmailBody,
					[IsActive]=@IsActive,
					 UpdatedBy = @CreatedBy,                    
                    UpdatedAt = GETDATE()
                WHERE        
                    EmailTemplateId = @EmailTemplateId
                        
                SELECT @EmailTemplateId AS KeyValue,           
                'Email Templates Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
                SELECT @EmailTemplateId AS KeyValue,           
                  'NO RECORD FOUND' AS ErrorMessage;        
            END        
        END        
        ELSE        
        BEGIN        
            INSERT INTO [dbo].[EmailTemplates]  
            (                 
               [EmailTemplateName],
				[Subject],
				[EmailBody],
				[IsActive],
			    CreatedBy,                                      
                CreatedAt   
            )                    
            VALUES                  
            (                
                @EmailTemplateName,
				@Subject,
				@EmailBody,
				@IsActive,
				 @CreatedBy,                                      
                 GETDATE()   
            );                    
                    
            SET @keyId = SCOPE_IDENTITY();        
           
            SELECT @keyId AS KeyValue,           
            'Email Templates Added' AS ErrorMessage;        
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
/****** Object:  StoredProcedure [dbo].[GetEmailTemplatesbyId]    Script Date: 11-09-2024 15:00:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[GetEmailTemplatesbyId]
	@EmailTemplateId int
AS
BEGIN

	SET NOCOUNT ON;
	BEGIN TRY            
            
	 SELECT 
            [EmailTemplateId],
            [EmailTemplateName],  
            [Subject],
            [EmailBody],
            [IsActive]
        FROM [dbo].[EmailTemplates]         
        WHERE [EmailTemplateId] = @EmailTemplateId;
 
END TRY            
BEGIN CATCH            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
END CATCH        
    
END
	 
GO
/****** Object:  StoredProcedure [dbo].[GetEmailTemplatesList]    Script Date: 11-09-2024 15:00:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetEmailTemplatesList]
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
  SET @OrderBy = @SortString;
      
  IF @SortString = '' OR @SortString IS NULL  
  BEGIN    
	  SET @OrderBy = 'ET.EmailTemplateId DESC';    
  END
              
  -- Get the total count                  
  SELECT @TotalCount = COUNT(*)                  
  FROM [dbo].[EmailTemplates] ET
  WHERE  
    (@SearchText = '' OR    
     ET.[EmailTemplateName] LIKE '%' + @SearchText + '%' OR    
     ET.[Subject] LIKE '%' + @SearchText + '%');
      
  DECLARE @SQL NVARCHAR(MAX);         
  SET @SQL = '
      SELECT    
        ET.[EmailTemplateId],
        ET.[EmailTemplateName],
        ET.[Subject],
		ET.[EmailBody],
        ET.[IsActive]
      FROM [dbo].[EmailTemplates] ET
      WHERE 
        (@SearchText = '''' OR    
         ET.[EmailTemplateName] LIKE ''%'' + @SearchText + ''%'' OR    
         ET.[Subject] LIKE ''%'' + @SearchText + ''%'')
      ORDER BY ' + @OrderBy + '
      OFFSET @Offset ROWS
      FETCH NEXT @PageSize ROWS ONLY;';

  EXEC sp_executesql @SQL,  
      N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',  
      @SearchText, @Offset, @PageSize;            
END
GO
