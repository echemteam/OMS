USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomersBasicInformation]    Script Date: 01-07-2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCustomersBasicInformation]                
@CustomerId INT,      
@Name VARCHAR(200),          
@GroupTypeId SMALLINT,          
@TerritoryId VARCHAR(150),          
@CountryId SMALLINT,          
@EmailAddress VARCHAR(255),          
@Website NVARCHAR(250),                           
@IsCompany BIT,          
@TaxId VARCHAR(15),        
@UpdatedBy SMALLINT,
@IsBuyingForThirdParty bit,
@ResponsibleUserId SMALLINT
AS                
BEGIN                
 SET NOCOUNT ON;                
 BEGIN TRY                          
 -- Check if customer exists      
    IF NOT EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE CustomerId = @CustomerId)                
    BEGIN                
        SELECT @CustomerId AS KeyValue,                         
        'NO RECORD FOUND' AS ErrorMessage;      
    END                
          
    ELSE    
    BEGIN    
   -- Update customer information      
   UPDATE [dbo].[Customers]      
   SET         
    Name = @Name,      
    GroupTypeId = @GroupTypeId,      
    TerritoryId = @TerritoryId,      
    CountryId = @CountryId,      
    Website = @Website,       
    IsCompany = @IsCompany,         
    TaxId = @TaxId,        
    UpdatedBy = @UpdatedBy,      
    UpdatedAt = GETDATE(),
	IsBuyingForThirdParty = @IsBuyingForThirdParty,
	ResponsibleUserId = @ResponsibleUserId
   WHERE CustomerId = @CustomerId;       
              
   -- Update or Insert Email      
   IF EXISTS (SELECT 1 FROM [dbo].[Emails] WHERE OwnerId = @CustomerId AND OwnerTypeId =1)      
   BEGIN      
    UPDATE [dbo].[Emails]      
    SET EmailAddress = @EmailAddress,      
     UpdatedBy = @UpdatedBy,      
     UpdatedAt = GETDATE()      
    WHERE OwnerId = @CustomerId AND OwnerTypeId = 1;      
   END      
       
      
   -- Update or Insert Note      
   /*IF EXISTS (SELECT 1 FROM [dbo].[CustomerNotes] WHERE CustomerId = @CustomerId)      
   BEGIN      
    UPDATE [dbo].[CustomerNotes]      
    SET Note = @Note,      
     UpdatedBy = @UpdatedBy,      
     UpdatedAt = GETDATE()      
    WHERE CustomerId = @CustomerId;      
   END   */   
             
   SELECT @CustomerId AS KeyValue,                         
   'Customer Information Updated' AS ErrorMessage;    
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
