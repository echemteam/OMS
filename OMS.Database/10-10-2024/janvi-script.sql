
/****** Object:  StoredProcedure [dbo].[AddAssignRoleToUser]    Script Date: 10-10-2024 17:23:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddAssignRoleToUser]
@RoleId tinyint,
@UserId smallint,
@CreatedBy smallint  
AS
BEGIN
	
	SET NOCOUNT ON;
	DECLARE @keyId AS INT    
  
 INSERT INTO [dbo].[L_UserRoles](RoleId,UserId,CreatedBy,CreatedAt)  
 VALUES (@RoleId,@UserId,@CreatedBy,GETDATE())  
  
 SET  @keyId = SCOPE_IDENTITY()    
  
 SELECT @keyId as KeyValue,           
 'Role Assign to User' as ErrorMessage   
 
END
GO
/****** Object:  StoredProcedure [dbo].[GetAssignedRoleByUserId]    Script Date: 10-10-2024 17:23:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAssignedRoleByUserId]
@PageNumber INT = 1,                  
@PageSize INT = 25,                  
@SearchText NVARCHAR(200),  
@UserId smallint,                   
@TotalCount INT OUTPUT  
AS
BEGIN

	SET NOCOUNT ON;
	 DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;  

	 SELECT @TotalCount = COUNT(*)  
    FROM [dbo].[Roles] R  
    WHERE R.RoleId IN   
    (
        SELECT RoleId 
        FROM [dbo].[L_UserRoles] 
        WHERE UserId = @UserId AND DeletedBy IS NULL
    )    
    AND R.DeletedBy IS NULL
    AND (@SearchText IS NULL OR @SearchText = '' OR R.RoleName LIKE '%' + @SearchText + '%');  
  
    SELECT   
       R.RoleId,    
		R.RoleName 
    FROM [dbo].[Roles] R  
    WHERE R.RoleId IN   
    (
        SELECT RoleId 
        FROM [dbo].[L_UserRoles] 
        WHERE UserId = @UserId AND DeletedBy IS NULL
    )    
    AND R.DeletedBy IS NULL
    AND (@SearchText IS NULL OR @SearchText = '' OR R.RoleName LIKE '%' + @SearchText + '%') 
    ORDER BY R.RoleName ASC  
    OFFSET @Offset ROWS  
    FETCH NEXT @PageSize ROWS ONLY;  

  
END
GO
/****** Object:  StoredProcedure [dbo].[GetUnAssignedRoleByUserId]    Script Date: 10-10-2024 17:23:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
   --GetUnAssignedRoleByUserId 2  
CREATE PROCEDURE [dbo].[GetUnAssignedRoleByUserId]  
@UserId smallint  
AS  
BEGIN  
   
 SET NOCOUNT ON;  
   
Select     
R.RoleId,    
R.RoleName   
FROM [dbo].[Roles] R    
WHERE R.RoleId NOT IN (select RoleId from [dbo].[L_UserRoles] where UserId = @UserId  and DeletedBy is null)   
and  
DeletedBy is null    
      
END  
GO
