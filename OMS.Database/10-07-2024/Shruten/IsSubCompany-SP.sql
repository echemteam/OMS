USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 16-07-2024 15:47:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetCustomersBasicInformationById 16          
ALTER PROCEDURE [dbo].[GetCustomersBasicInformationById]                          
 @CustomerId int          
as                          
Begin                          
SET NOCOUNT ON;                          
BEGIN TRY                          
                          
 SELECT              
  C.Name,              
  C.GroupTypeId,        
  GT.Type,                
  C.TerritoryId,        
  T.Territory,                
  C.CountryId,        
  CS.Name AS CountryName,             
  E.EmailAddress,          
  C.Website,          
  C.TaxId,                  
  C.IsBuyingForThirdParty,    
  C.StatusId,    
  S.Status,    
  C.ResponsibleUserId,    
  U.FirstName + ' ' + U.LastName AS ResponsibleUserName,
  C.IsSubCompany
 FROM [dbo].[Customers] C          
 LEFT JOIN [dbo].[CustomerNotes] CN ON C.CustomerId = CN.CustomerId          
 LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND OwnerTypeId = 1        
 LEFT JOIN [dbo].[Countries] CS ON C.CountryId = CS.CountryId        
 LEFT JOIN [dbo].[GroupTypes] GT ON C.GroupTypeId = GT.GroupTypeId        
 LEFT JOIN [dbo].[Territories] T ON C.TerritoryId = T.TerritoryId    
 LEFT JOIN [dbo].[Status] S ON S.StatusId = C.StatusId       
 LEFT JOIN Users U ON U.UserId =C.ResponsibleUserId    
 WHERE C.CustomerId = @CustomerId          
 AND C.DeletedBy IS NULL           
 AND C.DeletedAt IS NULL                                          
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                          
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomerSubCompany]    Script Date: 16-07-2024 15:47:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                
CREATE PROCEDURE [dbo].[UpdateCustomerSubCompany]                    
 @CustomerId INT,                         
 @IsSubCompany BIT  
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
 BEGIN TRY  
			IF @IsSubCompany = 0
			BEGIN
				UPDATE [dbo].[L_CustomerAddresses] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;      
				UPDATE [dbo].[L_CustomerContacts] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;   
                UPDATE [dbo].[CustomerDocuments] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;
				UPDATE [dbo].[Customers] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;
			END
		--ELSE 
  --      BEGIN                    
             UPDATE [dbo].[Customers] SET IsSubCompany= @IsSubCompany WHERE CustomerId = @CustomerId  
  
             SELECT @CustomerId as KeyValue,                             
             'Sub Company updated' as ErrorMessage           
        --END           
 END TRY                             
    BEGIN CATCH                              
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                              
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                              
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                              
    END CATCH                         
END 
GO
