USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 28-06-2024 19:03:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCustomersBasicInformation]                
@Name VARCHAR(200),                
@GroupTypeId SMALLINT,                
@TerritoryId VARCHAR(150),                
@CountryId SMALLINT,                
@EmailAddress VARCHAR(255),                
@Website NVARCHAR(250),                  
@Note VARCHAR(200),                
@IsCompany bit,    
@TaxId VARCHAR(15),            
@CreatedBy SMALLINT,  
@IsBuyingForThirdParty bit,
@ResponsibleUserId SMALLINT
                      
AS                      
BEGIN                      
 SET NOCOUNT ON;                      
BEGIN TRY                                
    DECLARE @keyId AS INT                        
           
        IF EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE Name = @Name)                 
     BEGIN            
         SELECT CAST(0 AS INT) as KeyValue,                                                
            'Customer already exists.' as ErrorMessage                 
        END            
        ELSE IF EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE TaxId = @TaxId AND Name = @Name) OR EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE TaxId = @TaxId)              
        BEGIN           
            SELECT CAST(0 AS INT) as KeyValue,                                
            'Taxid already exists.' as ErrorMessage              
        END                 
        ELSE          
            BEGIN          
            INSERT INTO [dbo].[Customers]                      
            (                
            Name,              
            GroupTypeId,                
            TerritoryId,                
            CountryId,                
            Website,                       
            IsCompany,                
            TaxId,                 
            StatusId,        
            IsActive,        
            CreatedBy,                      
            CreatedAt,  
            IsBuyingForThirdParty,
			ResponsibleUserId
            )                      
            VALUES                    
            (                
            @Name,              
            @GroupTypeId,                   
            @TerritoryId,                
            @CountryId,                
            @Website,                   
            @IsCompany,                   
            @TaxId,                  
            1,        
            1,        
            @CreatedBy,                      
            GETDATE(),  
            @IsBuyingForThirdParty,
			@ResponsibleUserId
            )                      
                      
            SET  @keyId = SCOPE_IDENTITY()                              
                      
            SELECT @keyId as KeyValue,                               
            'Customers Information Added' as ErrorMessage                         
            END          
            IF @keyId > 0                
            BEGIN                
            INSERT INTO [dbo].[Emails](EmailAddress,OwnerId,OwnerTypeId,CreatedBy,CreatedAt)                
            VALUES(@EmailAddress,@keyId,1,@CreatedBy,GETDATE())                
                
                 
            INSERT INTO [dbo].[CustomerNotes](Note,CustomerId,CreatedBy,CreatedAt)                
            VALUES(@Note,@keyId,@CreatedBy,GETDATE())                
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
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 28-06-2024 19:03:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
--GetCustomers 1,150,'','0',500      
CREATE PROCEDURE [dbo].[GetCustomers]            
  @PageNumber INT = 1,            
  @PageSize INT = 25,            
  @SearchText NVARCHAR(50) = '0',            
  @StatusId VARCHAR(15) = NULL,            
  @TotalCount INT OUTPUT            
AS            
BEGIN            
    SET NOCOUNT ON;            
 BEGIN TRY          
    -- Calculate the offset for pagination            
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;            
      
    DECLARE @StatusIdsTable TABLE (StatusId VARCHAR(15));      
         
    INSERT INTO @StatusIdsTable (StatusId)      
    SELECT value      
    FROM STRING_SPLIT(@StatusId, ',')      
    WHERE @StatusId IS NOT NULL; -- Filter out NULL values      
      
    -- Get the total count            
    SELECT @TotalCount = COUNT(*)            
    FROM [dbo].[Customers] C            
    LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId    
    LEFT JOIN [dbo].[L_CustomerInActiveReasons] CIAR ON C.CustomerId=CIAR.CustomerId  AND CIAR.DeletedAt IS NULL AND CIAR.DeletedBy IS NULL         
    WHERE            
        (@StatusId = '0' OR C.StatusId IN (SELECT StatusId FROM @StatusIdsTable))            
        AND C.DeletedBy IS NULL       
        AND C.DeletedAt IS NULL;      
      
    -- Select the data with the corrected WHERE clause            
    SELECT            
       C.CustomerId,      
       C.Name,      
       C.TaxId,      
       C.WebSite,      
       C.StatusId,      
       S.Status,    
       CIAR.InActiveReason,    
       C.UpdatedAt,
	   C.ResponsibleUserId,
	    U.FirstName + ' ' + U.LastName AS ResponsibleUserName
    FROM [dbo].[Customers] C            
    LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId     
    LEFT JOIN [dbo].[L_CustomerInActiveReasons] CIAR ON C.CustomerId=CIAR.CustomerId  AND CIAR.DeletedAt IS NULL AND CIAR.DeletedBy IS NULL  
	LEFT JOIN Users U ON U.UserId =C.ResponsibleUserId
    WHERE            
        (@StatusId = '0' OR C.StatusId IN (SELECT StatusId FROM @StatusIdsTable))       
        AND C.DeletedBy IS NULL       
        AND C.DeletedAt IS NULL            
    ORDER BY C.CustomerId DESC            
    OFFSET @Offset ROWS            
    FETCH NEXT @PageSize ROWS ONLY;            
      
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH       
END; 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 28-06-2024 19:03:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetCustomersBasicInformationById 16      
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
  C.IsCompany,  
  C.IsBuyingForThirdParty,
  C.StatusId,
  S.Status,
  C.ResponsibleUserId,
  U.FirstName + ' ' + U.LastName AS ResponsibleUserName  
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
/****** Object:  StoredProcedure [dbo].[UpdateCustomersBasicInformation]    Script Date: 28-06-2024 19:03:58 ******/
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
@Note VARCHAR(200),          
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
   IF EXISTS (SELECT 1 FROM [dbo].[CustomerNotes] WHERE CustomerId = @CustomerId)      
   BEGIN      
    UPDATE [dbo].[CustomerNotes]      
    SET Note = @Note,      
     UpdatedBy = @UpdatedBy,      
     UpdatedAt = GETDATE()      
    WHERE CustomerId = @CustomerId;      
   END      
             
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
