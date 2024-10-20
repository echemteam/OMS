USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddUserCheckListResponse]    Script Date: 28-06-2024 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[AddUserCheckListResponse]  
	@CheckListResponse CheckListResponseTypeTable READONLY
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
 BEGIN         
   DECLARE @keyId AS BIGINT          
        
     INSERT INTO [dbo]. UserChecklistResponses        
     (  
		UserId,  
		IsApproved,  
		ChecklistItemId,
		CreatedAt  
     )        
      SELECT  
            UserId,  
            IsApproved,  
            ChecklistItemId,  
            GETDATE()        
        FROM @CheckListResponse;      
	
     SET  @keyId = SCOPE_IDENTITY()                
     SELECT @keyId as KeyValue,                 
     'Response Added' as ErrorMessage           
  END        
       
END  
GO
/****** Object:  StoredProcedure [dbo].[GetCheckListItemByListId]    Script Date: 28-06-2024 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetCheckListItemByListId 1
CREATE PROCEDURE [dbo].[GetCheckListItemByListId]  
    @ChecklistId int  
AS  
BEGIN  
    SET NOCOUNT ON;  
    BEGIN TRY  
        SELECT    
            CLI.[ChecklistItemId],    
            CLI.[ItemDescription],
			CLI.[ChecklistId]
			
        FROM [dbo].[ChecklistItems] CLI
        WHERE CLI.ChecklistId = @ChecklistId  
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()          
        DECLARE @ErrorState int = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END  
GO
/****** Object:  StoredProcedure [dbo].[GetUserCheckListByEventId]    Script Date: 28-06-2024 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
-- GetUserCheckListBtEventId 1
CREATE PROCEDURE [dbo].[GetUserCheckListByEventId] 
	 @EventId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   BEGIN TRY                     
        SELECT        
             CL.ChecklistId,
			 CL.ChecklistName,
			 CL.EventId
			        
        FROM   
            [dbo].[Checklists] CL            
           
        WHERE    
            CL.EventId = @EventId  
                            
    END TRY          
    BEGIN CATCH              
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()              
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()              
        DECLARE @ErrorState int = ERROR_STATE()              
          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)              
    END CATCH      
END
GO
