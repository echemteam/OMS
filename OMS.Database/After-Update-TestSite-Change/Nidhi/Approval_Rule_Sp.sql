USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApprovalConfiguration]    Script Date: 11-09-2024 15:03:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditApprovalConfiguration]  
    @ApprovalConfigurationId INT,  
    @RuleName VARCHAR(100),  
    @ModuleId INT = NULL,  
    @FunctionalityId INT = NULL,
    @FunctionalityEventId INT,  
    @FunctionalitiesFieldId INT = NULL,  
    @ApproverRoleId TINYINT = NULL,  
	@Template NVARCHAR(400)
AS  
BEGIN  
    SET NOCOUNT ON;  
      
    BEGIN TRY  
        DECLARE @keyId AS INT;  
          
        IF @ApprovalConfigurationId > 0  
        BEGIN  
            IF EXISTS (SELECT 1 FROM [dbo].[ApprovalConfiguration] WHERE ApprovalConfigurationId = @ApprovalConfigurationId)  
            BEGIN  
                UPDATE [dbo].[ApprovalConfiguration]  
                SET  
                    RuleName = @RuleName,  
                    ModuleId = @ModuleId,  
                    FunctionalityId = @FunctionalityId,  
                    FunctionalitiesFieldId = @FunctionalitiesFieldId,
                    FunctionalityEventId = @FunctionalityEventId,   
                    ApproverRoleId = @ApproverRoleId,  
					Template=@Template
                WHERE ApprovalConfigurationId = @ApprovalConfigurationId;  
                  
                SET @keyId = @ApprovalConfigurationId;  
  
                SELECT @keyId AS KeyValue,  
                'Approval configuration updated' AS ErrorMessage;  
            END  
        END  
        ELSE  
        BEGIN  
            INSERT INTO [dbo].[ApprovalConfiguration]  
            (  
                RuleName,  
                ModuleId,  
                FunctionalityId, 
                FunctionalityEventId, 
                FunctionalitiesFieldId,  
                ApproverRoleId,  
				Template
            )  
            VALUES  
            (  
                @RuleName,  
                @ModuleId,  
                @FunctionalityId,
                @FunctionalityEventId,  
                @FunctionalitiesFieldId,  
                @ApproverRoleId,              
				@Template
            );  
              
            SET @keyId = SCOPE_IDENTITY();  
        END  
          
        SELECT @keyId AS KeyValue,  
        'Approval configuration added' AS ErrorMessage;  
    END TRY  
    BEGIN CATCH  
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();  
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();  
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();  
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);  
    END CATCH;  
END;  
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationByApprovalConfigurationId]    Script Date: 11-09-2024 15:03:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApprovalConfigurationByApprovalConfigurationId 28    
CREATE PROCEDURE [dbo].[GetApprovalConfigurationByApprovalConfigurationId]    
    @ApprovalConfigurationId int    
AS    
BEGIN    
    SET NOCOUNT ON;    
    
    BEGIN TRY    
        SELECT     
            AC.ApprovalConfigurationId,    
            AC.RuleName,    
            AC.ModuleId,    
            M.ModuleName,    
            AC.FunctionalityId,    
            F.Name,    
            AC.FunctionalitiesFieldId,    
            FF.FieldName,
            AC.FunctionalityEventId,
            FE.EventName,    
            AC.ApproverRoleId,  
            R.RoleName,    
			FE1.IsFunctional,
			AC.Template
        FROM [dbo].[ApprovalConfiguration] AC    
        LEFT JOIN [dbo].[Modules] M ON AC.ModuleId = M.ModuleId    
        LEFT JOIN [dbo].[Functionalities] F ON AC.FunctionalityId = F.FunctionalityId    
        LEFT JOIN [dbo].[FunctionalitiesFields] FF ON AC.FunctionalitiesFieldId = FF.FunctionalitiesFieldId
        LEFT JOIN [dbo].[FunctionalityEvents] FE ON AC.FunctionalityEventId = FE.FunctionalityEventId   
        LEFT JOIN [dbo].[Roles] R ON AC.[ApproverRoleId] = R.[RoleId]         
		LEFT JOIN [dbo].[FunctionalityEvents] FE1 ON  AC.[FunctionalityEventId]= FE1.FunctionalityEventId  
		
        WHERE AC.ApprovalConfigurationId = @ApprovalConfigurationId;    
    END TRY    
    BEGIN CATCH    
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();    
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();    
        DECLARE @ErrorState INT = ERROR_STATE();    
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);    
    END CATCH;    
END    
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationRules]    Script Date: 11-09-2024 15:03:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
--GetApprovalConfigurationRules 1,50,'','5',0,500                            
CREATE PROCEDURE [dbo].[GetApprovalConfigurationRules]                                            
    @PageNumber INT = 1,                      
    @PageSize INT = 25,                      
    @SearchText NVARCHAR(200) = '',        
    @SortString VARCHAR(250) = '',    
    @FunctionalityId INT = 0,                         
    @TotalCount INT OUTPUT                                             
AS                                              
BEGIN                         
                    
    SET NOCOUNT ON;                      
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                      
    DECLARE @OrderBy NVARCHAR(250) = '';          
    SET @OrderBy = @SortString;    
          
    IF @SortString = '' OR @SortString IS NULL      
    BEGIN        
        SET @OrderBy = 'AC.ApprovalConfigurationId DESC';        
    END           
                  
    -- Get the total count                      
    SELECT @TotalCount = COUNT(*)                      
    FROM [ApprovalConfiguration] AC    
    LEFT JOIN [dbo].[Modules] M ON AC.[ModuleId] = M.[ModuleId]     
    LEFT JOIN [dbo].[Functionalities] F ON AC.[FunctionalityId] = F.[FunctionalityId]       
    LEFT JOIN [dbo].[FunctionalitiesFields] FF ON AC.[FunctionalitiesFieldId] = FF.[FunctionalitiesFieldId]     
    LEFT JOIN [dbo].[Roles] R ON AC.[ApproverRoleId] = R.[RoleId]   
    LEFT JOIN [dbo].[FunctionalityEvents] FE ON  AC.[FunctionalityEventId]= FE.FunctionalityEventId     
    WHERE    
        (        
             @SearchText = '' OR          
             AC.RuleName LIKE '%' + @SearchText + '%' OR    
             M.ModuleName LIKE '%' + @SearchText + '%' OR    
             F.Name LIKE '%' + @SearchText + '%' OR    
             FF.FieldName LIKE '%' + @SearchText + '%' OR    
             R.RoleName LIKE '%' + @SearchText + '%'    
        )    
        AND (@FunctionalityId = 0 OR AC.FunctionalityId = @FunctionalityId);    
    
    DECLARE @SQL NVARCHAR(MAX);               
    SET @SQL = '        
    SELECT    
            AC.ApprovalConfigurationId,    
            AC.RuleName,    
            AC.ModuleId,    
            M.ModuleName,    
            AC.FunctionalityId,    
            F.Name as FunctionalityName,    
            AC.FunctionalitiesFieldId,    
            FF.FieldName,    
            AC.ApproverRoleId,    
            R.RoleName, 
			FE.IsFunctional 
			
    FROM [ApprovalConfiguration] AC    
    LEFT JOIN [dbo].[Modules] M ON AC.[ModuleId] = M.[ModuleId]     
    LEFT JOIN [dbo].[Functionalities] F ON AC.[FunctionalityId] = F.[FunctionalityId]       
    LEFT JOIN [dbo].[FunctionalitiesFields] FF ON AC.[FunctionalitiesFieldId] = FF.[FunctionalitiesFieldId]     
    LEFT JOIN [dbo].[Roles] R ON AC.[ApproverRoleId] = R.[RoleId]       
    LEFT JOIN [dbo].[FunctionalityEvents] FE ON AC.FunctionalityEventId = FE.FunctionalityEventId 
    WHERE    
        (        
            @SearchText = '''' OR          
            AC.RuleName LIKE ''%'' + @SearchText + ''%'' OR    
            M.ModuleName LIKE ''%'' + @SearchText + ''%'' OR    
            F.Name LIKE ''%'' + @SearchText + ''%'' OR    
            FF.FieldName LIKE ''%'' + @SearchText + ''%'' OR    
            R.RoleName LIKE ''%'' + @SearchText + ''%''    
        )    
        AND (@FunctionalityId = 0 OR AC.FunctionalityId = @FunctionalityId)     ORDER BY ' + @OrderBy + '       
    OFFSET @Offset ROWS                    
    FETCH NEXT @PageSize ROWS ONLY;';      
    
    EXEC sp_executesql @SQL,      
    N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT, @FunctionalityId INT',      
    @SearchText, @Offset, @PageSize, @FunctionalityId;                                              
END 
GO
