-- Drop the procedure if it already exists
IF OBJECT_ID('dbo.GetCustomersBasicInformationById', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetCustomersBasicInformationById;
END
GO

-- Create the stored procedure
--GetCustomersBasicInformationById 2387                      
CREATE PROCEDURE [dbo].[GetCustomersBasicInformationById]                                      
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
    --C.ResponsibleUserId,                
    --U.FirstName + ' ' + U.LastName AS ResponsibleUserName,        
        STUFF(         (SELECT ', ' + CAST(U.UserId AS NVARCHAR(10))      
        FROM [dbo].[ResponsibleUserMapping] RUM              
        LEFT JOIN [dbo].[Users] U ON U.UserId = RUM.UserId            
        WHERE RUM.CustomerId = C.CustomerId           
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1, 2, '')       
    AS ResponsibleUserId,        
        STUFF((SELECT ', ' + U.FirstName + ' ' + U.LastName FROM [dbo].[ResponsibleUserMapping] RUM       
        LEFT JOIN [dbo].[Users] U ON U.UserId = RUM.UserId         WHERE RUM.CustomerId = C.CustomerId             
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1, 2, '')       
    AS ResponsibleUserName,            
    C.IsSubCustomer,      
    C.IncotermId,       
    I.IncotermName,    
    C.AttachmentName,  
    C.ListCode,  
    C.RefCode  
 FROM [dbo].[Customers] C                      
 LEFT JOIN [dbo].[CustomerNotes] CN ON C.CustomerId = CN.CustomerId                      
 LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND OwnerTypeId = 1                    
 LEFT JOIN [dbo].[Countries] CS ON C.CountryId = CS.CountryId                    
 LEFT JOIN [dbo].[GroupTypes] GT ON C.GroupTypeId = GT.GroupTypeId                    
 LEFT JOIN [dbo].[Territories] T ON C.TerritoryId = T.TerritoryId                
 LEFT JOIN [dbo].[Status] S ON S.StatusId = C.StatusId       
 LEFT JOIN [dbo].[Incoterm] I ON I.IncotermId = C.IncotermId                    
 --LEFT JOIN Users U ON U.UserId =C.ResponsibleUserId                
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


IF OBJECT_ID('dbo.GetSupplierBasicInformationById', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetSupplierBasicInformationById;
END
GO

-- GetSupplierBasicInformationById 2020                   
CREATE PROCEDURE [dbo].[GetSupplierBasicInformationById]                                    
 @SupplierId int                    
as                                    
Begin                                    
SET NOCOUNT ON;                                    
BEGIN TRY                                    
                                    
 SELECT            
    SP.SupplierId,                        
    SP.Name,            
    SP.DbaName,            
    SP.SupplierTypeId,            
    SPT.Type AS SupplierType,                         
    SP.GroupTypeId,                  
    GT.Type As GroupType,                          
    SP.TerritoryId,                  
    T.Territory,                          
    SP.CountryId,                  
    CS.Name AS CountryName,                       
    SP.Website,                    
    SP.TaxId,                          
    SP.StatusId,          
    S.Status,          
    E.EmailAddress,          
    --  SP.ResponsibleUserId,          
    --  U.FirstName + ' ' + U.LastName AS ResponsibleUserName        
    STUFF((SELECT ', ' + CAST(U.UserId AS NVARCHAR(10))          
    FROM [dbo].[ResponsibleUserMappingSupplier] RUMS      
    LEFT JOIN [dbo].[Users] U ON U.UserId = RUMS.UserId          
    WHERE RUMS.SupplierId = SP.SupplierId             
    FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1, 2, '')       
    AS ResponsibleUserId,        
    STUFF((SELECT ', ' + U.FirstName + ' ' + U.LastName             
    FROM [dbo].[ResponsibleUserMappingSupplier] RUMS        
    LEFT JOIN [dbo].[Users] U ON U.UserId = RUMS.UserId        
    WHERE RUMS.SupplierId = SP.SupplierId          
    FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1, 2, '')      
    AS ResponsibleUserName,            
    SP.IncotermId,       
    I.IncotermName,    
	SP.AttachmentName,  
	SP.ListCode,  
	SP.RefCode  
 FROM [dbo].[Suppliers] SP              
 LEFT JOIN [dbo].[SupplierTypes] SPT ON SPT.SupplierTypeId = SP.SupplierTypeId           
 LEFT JOIN [dbo].[Emails] E ON SP.SupplierId = E.OwnerId AND OwnerTypeId = 2                   
 LEFT JOIN [dbo].[Countries] CS ON CS.CountryId = SP.CountryId                  
 LEFT JOIN [dbo].[GroupTypes] GT ON GT.GroupTypeId = SP.GroupTypeId                  
 LEFT JOIN [dbo].[Territories] T ON T.TerritoryId = SP.TerritoryId              
 LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId      
 LEFT JOIN [dbo].[Incoterm] I ON I.IncotermId = SP.IncotermId              
-- LEFT JOIN Users U ON U.UserId =SP.ResponsibleUserId          
 WHERE SP.SupplierId = @SupplierId            
 AND SP.DeletedBy IS NULL                     
 AND SP.DeletedAt IS NULL                                                    
END TRY                                    
BEGIN CATCH                                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                    
END CATCH                                    
END 
GO