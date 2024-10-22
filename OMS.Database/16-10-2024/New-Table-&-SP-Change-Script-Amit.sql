IF OBJECT_ID('dbo.L_Snippet_EmailTemplate', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.YourTableName;
END
GO
/****** Object:  Table [dbo].[L_Snippet_EmailTemplate]    Script Date: 17-10-2024 10:29:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[L_Snippet_EmailTemplate](
	[SnippetEmailTemplateId] [int] IDENTITY(1,1) NOT NULL,
	[EmailTemplateId] [int] NOT NULL,
	[SnippetId] [tinyint] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[SnippetEmailTemplateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Snippet]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.Snippet', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.YourTableName;
END
GO
CREATE TABLE [dbo].[Snippet](
	[SnippetId] [tinyint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Hashtag] [nvarchar](100) NULL,
	[Body] [nvarchar](max) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [smallint] NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedBy] [smallint] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedBy] [smallint] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[SnippetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[L_Snippet_EmailTemplate] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Snippet] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Snippet] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[L_Snippet_EmailTemplate]  WITH CHECK ADD  CONSTRAINT [FK_EmailTemplate] FOREIGN KEY([EmailTemplateId])
REFERENCES [dbo].[EmailTemplates] ([EmailTemplateId])
GO
ALTER TABLE [dbo].[L_Snippet_EmailTemplate] CHECK CONSTRAINT [FK_EmailTemplate]
GO
ALTER TABLE [dbo].[L_Snippet_EmailTemplate]  WITH CHECK ADD  CONSTRAINT [FK_Snippet] FOREIGN KEY([SnippetId])
REFERENCES [dbo].[Snippet] ([SnippetId])
GO
ALTER TABLE [dbo].[L_Snippet_EmailTemplate] CHECK CONSTRAINT [FK_Snippet]
GO

IF OBJECT_ID('dbo.AddAssignedSnippet', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.AddAssignedSnippet;
END
GO
/****** Object:  StoredProcedure [dbo].[AddAssignedSnippet]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddAssignedSnippet]
    @EmailTemplateId INT,
    @SnippetId TINYINT,
    @CreatedBy SMALLINT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [dbo].[L_Snippet_EmailTemplate] WHERE EmailTemplateId = @EmailTemplateId AND SnippetId = @SnippetId 
              AND DeletedBy IS NULL AND DeletedAt IS NULL)
        BEGIN
            SELECT CAST(0 AS INT) AS KeyValue, 
            'Snippet Assigned Already Exists' AS ErrorMessage;
        END
        ELSE
        BEGIN
            DECLARE @keyId INT;

            INSERT INTO [dbo].[L_Snippet_EmailTemplate] 
            (
                EmailTemplateId,
                SnippetId,
                CreatedAt,
                CreatedBy
            )
            VALUES 
            (
                @EmailTemplateId,
                @SnippetId,
                GETDATE(),
                @CreatedBy
            );

            SET @keyId = SCOPE_IDENTITY();

            SELECT @keyId AS KeyValue,
            'Snippet Assigned' AS ErrorMessage;
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
IF OBJECT_ID('dbo.AddSnippet', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.AddSnippet;
END
GO
/****** Object:  StoredProcedure [dbo].[AddSnippet]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddSnippet]        
    @Name NVARCHAR(255),      
    @Hashtag NVARCHAR(100),        
    @Body NVARCHAR(MAX),
	@IsActive BIT,
    @CreatedBy SMALLINT        
AS        
BEGIN        
    SET NOCOUNT ON;        
    
    BEGIN TRY                  
        IF EXISTS (SELECT SnippetId FROM [dbo].[Snippet] WHERE Name = @Name AND DeletedBy IS NULL  AND DeletedAt IS NULL)        
        BEGIN        
            SELECT CAST(0 AS TINYINT) AS KeyValue,                 
            'Snippet Name EXISTS' AS ErrorMessage           
        END        
        ELSE        
        BEGIN         
            DECLARE @keyId AS TINYINT          
        
            INSERT INTO [dbo].[Snippet]        
            (     
                Name,    
                Hashtag,        
                Body,
				IsActive,
                CreatedBy,
				CreatedAt
            )        
            VALUES      
            (    
                @Name,    
                @Hashtag,        
                @Body,
				@IsActive,
                @CreatedBy,
				GETDATE()
            )        
        
            SET @keyId = SCOPE_IDENTITY();                
        
            SELECT @keyId AS KeyValue,                 
             'Snippet Added' AS ErrorMessage           
        END        
    END TRY                    

    BEGIN CATCH                  
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                  
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                  
        DECLARE @ErrorState INT = ERROR_STATE();                  

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                  
    END CATCH                  
END
GO
IF OBJECT_ID('dbo.DeleteAssignedSnippetBySnippetEmailTemplateId', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.DeleteAssignedSnippetBySnippetEmailTemplateId;
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteAssignedSnippetBySnippetEmailTemplateId]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteAssignedSnippetBySnippetEmailTemplateId]
    @SnippetEmailTemplateId INT,
    @DeletedBy SMALLINT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF EXISTS (SELECT 1  FROM [dbo].[L_Snippet_EmailTemplate] WHERE SnippetEmailTemplateId = @SnippetEmailTemplateId AND [DeletedBy] IS NULL AND [DeletedAt] IS NULL  )
        BEGIN
            UPDATE [dbo].[L_Snippet_EmailTemplate]
            SET
                DeletedBy = @DeletedBy,
                DeletedAt = GETDATE()
            WHERE SnippetEmailTemplateId = @SnippetEmailTemplateId AND [DeletedBy] IS NULL AND [DeletedAt] IS NULL  

            SELECT @SnippetEmailTemplateId AS KeyValue,
            'Assigned snippet email template deleted' AS ErrorMessage;
        END
        ELSE
        BEGIN
            SELECT @SnippetEmailTemplateId AS KeyValue,
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
IF OBJECT_ID('dbo.DeleteSnippet', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.DeleteSnippet;
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteSnippet]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteSnippet]    
    @SnippetId TINYINT,    
    @DeletedBy SMALLINT    
AS    
BEGIN    
    SET NOCOUNT ON;    
    
    BEGIN TRY    
        IF EXISTS (SELECT SnippetId FROM [dbo].[Snippet] WHERE SnippetId = @SnippetId)    
        BEGIN    
            UPDATE [dbo].[Snippet]    
            SET    
                [DeletedBy] = @DeletedBy,    
                [DeletedAt] = GETDATE()    
            WHERE SnippetId = @SnippetId  
    
            SELECT @SnippetId AS KeyValue,    
             'Snippet Deleted' AS ErrorMessage;    
        END    
        ELSE    
        BEGIN    
            SELECT @SnippetId AS KeyValue,    
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
IF OBJECT_ID('dbo.GetAssignedSnippetByEmailTemplateId', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetAssignedSnippetByEmailTemplateId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetAssignedSnippetByEmailTemplateId]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAssignedSnippetByEmailTemplateId]                                                                  
    @EmailTemplateId INT,    
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
        SET @OrderBy = 'LSE.CreatedAt DESC';        
    END       
  
    SELECT @TotalCount = COUNT(*)                  
    FROM [dbo].[L_Snippet_EmailTemplate] LSE        
    LEFT JOIN [dbo].[Snippet] S ON S.SnippetId = LSE.SnippetId 
	LEFT JOIN [dbo].[Emailtemplates] E ON E.EmailTemplateId = LSE.EmailTemplateId    
    WHERE LSE.EmailTemplateId = @EmailTemplateId   
    AND LSE.DeletedBy IS NULL   
    AND LSE.DeletedAt IS NULL  
    AND (@SearchText IS NULL         
    OR S.Name LIKE '%' + @SearchText + '%'         
    OR S.Hashtag LIKE '%' + @SearchText + '%'
	OR E.EmailTemplateName LIKE '%' + @SearchText + '%'
	OR S.Body LIKE '%' + @SearchText + '%');                
  
    DECLARE @SQL NVARCHAR(MAX);             
    SET @SQL = '          
    SELECT        
        LSE.SnippetEmailTemplateId,        
        LSE.EmailTemplateId,
		E.EmailTemplateName,
        LSE.SnippetId,        
        S.Name,        
        S.Hashtag,        
        S.Body,        
        LSE.CreatedAt                    
    FROM [dbo].[L_Snippet_EmailTemplate] LSE                     
    LEFT JOIN [dbo].[Snippet] S ON S.SnippetId = LSE.SnippetId     
	LEFT JOIN [dbo].[Emailtemplates] E ON E.EmailTemplateId = LSE.EmailTemplateId     
    WHERE                  
        LSE.EmailTemplateId = @EmailTemplateId   
        AND LSE.DeletedAt IS NULL   
        AND LSE.DeletedBy IS NULL              
        AND (@SearchText IS NULL OR @SearchText = ''''        
            OR S.Name LIKE ''%'' + @SearchText + ''%''         
            OR S.Hashtag LIKE ''%'' + @SearchText + ''%''
			OR E.EmailTemplateName LIKE ''%'' + @SearchText + ''%''
			OR S.Body LIKE ''%'' + @SearchText + ''%'')               
  
    ORDER BY ' + @OrderBy + '                   
    OFFSET @Offset ROWS                  
    FETCH NEXT @PageSize ROWS ONLY;';                             
  
    -- Execute the dynamic SQL  
    EXEC sp_executesql @SQL,       
    N'@EmailTemplateId INT, @SearchText NVARCHAR(200), @Offset INT, @PageSize INT',       
    @EmailTemplateId, @SearchText, @Offset, @PageSize;                          
END  
GO
/****** Object:  StoredProcedure [dbo].[GetSnippets]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.GetSnippets', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetSnippets;
END
GO
CREATE PROCEDURE [dbo].[GetSnippets]                                              
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
        SET @OrderBy = 'S.CreatedAt DESC';      
    END     
                                      
    SELECT @TotalCount = COUNT(*)                      
    FROM [dbo].[Snippet] S                           
    WHERE               
        S.DeletedAt IS NULL AND S.DeletedBy IS NULL AND               
        (      
            @SearchText = '' OR 
            S.Name LIKE '%' + @SearchText + '%' OR
            S.Hashtag LIKE '%' + @SearchText + '%' OR
            S.Body LIKE '%' + @SearchText + '%'          
        );          
        
    DECLARE @SQL NVARCHAR(MAX);     
    SET @SQL = '                  
    SELECT      
        SnippetId,      
        Name,      
        Hashtag,      
        Body,
		IsActive
    FROM [dbo].[Snippet] S                               
    WHERE               
        S.DeletedAt IS NULL AND S.DeletedBy IS NULL AND       
        (      
            @SearchText = '''' OR 
            S.Name LIKE ''%'' + @SearchText + ''%'' OR
            S.Hashtag LIKE ''%'' + @SearchText + ''%'' OR
            S.Body LIKE ''%'' + @SearchText + ''%''          
        )           
        
    ORDER BY ' + @OrderBy + '                     
    OFFSET @Offset ROWS                      
    FETCH NEXT @PageSize ROWS ONLY;';                     
        
    EXEC sp_executesql @SQL,      
    N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',   
    @SearchText, @Offset, @PageSize;                                       
END   
GO
IF OBJECT_ID('dbo.GetSnippetsBySnippetId', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetSnippetsBySnippetId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetSnippetsBySnippetId]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetSnippetsBySnippetId]                
    @SnippetId TINYINT                
AS                
BEGIN                
    SET NOCOUNT ON;                
    
    BEGIN TRY                
        SELECT 
		    SnippetId,
            Name,      
            Hashtag,      
            Body,
			IsActive
        FROM [dbo].[Snippet]              
        WHERE SnippetId = @SnippetId  
        AND [DeletedBy] IS NULL AND DeletedAt IS NULL;            
    END TRY                
    
    BEGIN CATCH                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                
        DECLARE @ErrorState INT = ERROR_STATE();                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                
    END CATCH                
END;  
GO
IF OBJECT_ID('dbo.GetUnAssignedSnippetByEmailTemplateId', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetUnAssignedSnippetByEmailTemplateId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetUnAssignedSnippetByEmailTemplateId]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUnAssignedSnippetByEmailTemplateId]  
    @EmailTemplateId INT  
AS  
BEGIN  
    SET NOCOUNT ON;  
  
    SELECT DISTINCT S.SnippetId, S.Name  
    FROM [dbo].[Snippet] S  
    LEFT JOIN [dbo].[L_Snippet_EmailTemplate] LSET ON S.SnippetId = LSET.SnippetId  
    WHERE S.SnippetId NOT IN (  
        SELECT SnippetId  
        FROM [dbo].[L_Snippet_EmailTemplate]  
        WHERE EmailTemplateId = @EmailTemplateId   
          AND DeletedAt IS NULL AND DeletedBy IS NULL  
    )  
    AND S.DeletedAt IS NULL AND S.DeletedBy IS NULL AND S.IsActive=1  
    ORDER BY S.Name ASC;  
END  
GO
/****** Object:  StoredProcedure [dbo].[UpdateSnippet]    Script Date: 17-10-2024 10:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.UpdateSnippet', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.UpdateSnippet;
END
GO
CREATE PROCEDURE [dbo].[UpdateSnippet]          
    @SnippetId TINYINT,    
    @Name NVARCHAR(255),              
    @Hashtag NVARCHAR(100),        
    @Body NVARCHAR(MAX),
	@IsActive BIT,
    @UpdatedBy SMALLINT          
AS          
BEGIN          
    SET NOCOUNT ON;          
   
    BEGIN TRY                    
        IF NOT EXISTS (SELECT SnippetId FROM [dbo].[Snippet] WHERE SnippetId = @SnippetId)          
        BEGIN          
            SELECT @SnippetId AS KeyValue,                   
            'NO RECORD FOUND' AS ErrorMessage          
        END          
        ELSE          
        BEGIN          
            -- Update the Snippet record
            UPDATE [dbo].[Snippet] 
            SET    
                Name = @Name,    
                Hashtag = @Hashtag,        
                Body = @Body,   
				IsActive = @IsActive,
                UpdatedBy = @UpdatedBy,          
                UpdatedAt = GETDATE()          
            WHERE SnippetId = @SnippetId  
          
            SELECT @SnippetId AS KeyValue,                   
             'Snippet Updated' AS ErrorMessage           
        END          
    END TRY                      

    BEGIN CATCH                    
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                    
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                    
        DECLARE @ErrorState INT = ERROR_STATE();                    

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                    
    END CATCH               
END
GO
