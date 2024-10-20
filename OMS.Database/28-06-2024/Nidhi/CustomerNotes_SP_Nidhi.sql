USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerNotes]    Script Date: 28-06-2024 18:10:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[AddCustomerNotes]
	-- Add the parameters for the stored procedure here
	 @CustomerId int,	
	@Note nvarchar(1000),
	 @CreatedBy smallint
As
	BEGIN      
	SET NOCOUNT ON;      
	BEGIN TRY                
		IF EXISTS (SELECT CustomerNoteId FROM [dbo].[CustomerNotes] WHERE Note=@Note )      
			BEGIN      
			   SELECT CAST(0 AS SMALLINT) as KeyValue,               
			  'Notes EXISTS ' as ErrorMessage         
			END      
		ELSE      
		BEGIN       
		 DECLARE @keyId AS BIGINT        
      
		   INSERT INTO [dbo].[CustomerNotes]      
			  (
			   CustomerId,
			   Note,
			   CreatedBy,
				CreatedAt
			  )      
			  VALUES    
			  (
				@CustomerId,
				@Note ,
				@CreatedBy, 
				GETDATE()
			  )      
		   SET  @keyId = SCOPE_IDENTITY()              
		   SELECT @keyId as KeyValue,               
		   'Note Added' as ErrorMessage         
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
/****** Object:  StoredProcedure [dbo].[GetCustomerNotesByCustomerId]    Script Date: 28-06-2024 18:10:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[GetCustomerNotesByCustomerId]  
 -- Add the parameters for the stored procedure here  
  @CustomerId int  
AS  
BEGIN  
  SET NOCOUNT ON;          
          
 SELECT  
  [CustomerNoteId],  
  [Note],  
  CASE
	WHEN CN.[UpdatedAt] IS NULL AND CN.[UpdatedBy] IS NULL THEN CN.[CreatedAt]    
	ELSE CN.[UpdatedAt]   
	END AS NoteDate,  
  U.FirstName + ' ' + U.LastName AS FullName
 FROM [dbo].[CustomerNotes]  CN
 INNER JOIN Users U 
	ON (CN.[UpdatedAt] IS NULL AND CN.[UpdatedBy] IS NULL AND U.UserId = CN.[CreatedBy])
	OR (CN.[UpdatedAt] IS NOT NULL AND CN.[UpdatedBy] IS NOT NULL AND U.UserId = CN.[UpdatedBy])
 WHERE  CustomerId=@CustomerId  
    
END   
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomerNotes]    Script Date: 28-06-2024 18:10:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[UpdateCustomerNotes] 
	@CustomerNoteId bigint,
	 @CustomerId int,	
	@Note nvarchar(1000),
	@UpdatedBy smallint
AS
BEGIN      
	SET NOCOUNT ON;      
	BEGIN TRY                
		IF NOT EXISTS (SELECT CustomerId FROM [dbo].[CustomerNotes] WHERE CustomerId = @CustomerId)      
			BEGIN      
			  SELECT @CustomerNoteId as KeyValue,               
			  'NO RECORD FOUND' as ErrorMessage      
			END      
		ELSE      
			BEGIN      
      
			 UPDATE [dbo].[CustomerNotes] SET
				CustomerId=@CustomerId,
				Note=@Note,
				UpdatedBy = @UpdatedBy,      
				UpdatedAt = GETDATE()      
			 WHERE CustomerNoteId = @CustomerNoteId   
      
			 SELECT @CustomerNoteId as KeyValue,               
			 'Notes Updated' as ErrorMessage       
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
