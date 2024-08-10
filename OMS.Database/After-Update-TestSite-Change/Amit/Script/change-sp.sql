
/****** Object:  StoredProcedure [dbo].[UpdateAddAddress]    Script Date: 10-08-2024 16:31:26 ******/
DROP PROCEDURE [dbo].[UpdateAddAddress]
GO
/****** Object:  StoredProcedure [dbo].[AddAddress]    Script Date: 10-08-2024 16:31:26 ******/
DROP PROCEDURE [dbo].[AddAddress]
GO
/****** Object:  StoredProcedure [dbo].[AddAddress]    Script Date: 10-08-2024 16:31:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddAddress]                
@CustomerId int,          
@AddressTypeId SMALLINT,          
@AddressLine1 VARCHAR(250),          
@AddressLine2 VARCHAR(250),          
@AddressLine3 VARCHAR(250),          
@AddressLine4 VARCHAR(250),          
@AddressLine5 VARCHAR(250),          
@CountryId SMALLINT,          
@StateId int,          
@CityId int,          
@ZipCode int,          
@CreatedBy SMALLINT                                  
AS                      
BEGIN                      
 SET NOCOUNT ON;                      
 BEGIN TRY                                
  DECLARE @keyId AS INT        
        DECLARE @AddressType VARCHAR(100);        
        DECLARE @Title VARCHAR(100);         
        
            
        SELECT @AddressType = Type        
        FROM [dbo].[AddressTypes]        
        WHERE [AddressTypeId] = @AddressTypeId;                            
                 
        IF EXISTS (SELECT 1 FROM [dbo].[Addresses] WHERE [AddressLine1] = @AddressLine1 AND [AddressLine2]=@AddressLine2 AND [CountryId]=@CountryId        
        AND [StateId]=@StateId AND [CityId]=@CityId AND DeletedAt IS NULL AND CreatedBy IS NULL)        
        AND EXISTS(SELECT 1 FROM [dbo].[AddressTypes] WHERE [AddressTypeId]=@AddressTypeId)          
        BEGIN        
            SELECT CAST(0 AS INT) as KeyValue,         
            'Address already exists.' as ErrorMessage;        
        END        
        ELSE        
        BEGIN        
   INSERT INTO [dbo].[Addresses]          
   (                  
                 Title,             
                AddressLine1,                
                AddressLine2,                
                AddressLine3,                
                AddressLine4,                
                AddressLine5,                
                CountryId,                
                StateId,                
                CityId,              
                ZipCode,            
                CreatedBy,                      
                CreatedAt                     
   )                      
   VALUES                    
   (            
                '',        
                @AddressLine1,          
                @AddressLine2,          
                @AddressLine3,          
                @AddressLine4,          
                @AddressLine5,          
                @CountryId,          
                @StateId,          
                @CityId,          
                @ZipCode,          
                @CreatedBy,                      
                GETDATE()                      
   )                      
                      
            SET  @keyId = SCOPE_IDENTITY()                              
                    
            SET @Title = CAST(@keyId AS VARCHAR(50)) + '_' + @AddressLine1;        
        
            UPDATE [dbo].[Addresses] SET Title = @Title WHERE AddressId = @keyId;          
           
            SELECT @keyId as KeyValue,                               
            'Address Added' as ErrorMessage                         
                
           --IF @keyId > 0                
           --BEGIN                
           -- INSERT INTO [dbo].[L_CustomerAddresses](CustomerId,AddressId,AddressTypeId,StatusId,CreatedBy,CreatedAt)                
           -- VALUES(@CustomerId,@keyId,@AddressTypeId,1,@CreatedBy,GETDATE())                
           --END         
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
/****** Object:  StoredProcedure [dbo].[UpdateAddAddress]    Script Date: 10-08-2024 16:31:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAddAddress]                        
@AddressId INT,                
@CustomerId INT,                  
@AddressTypeId SMALLINT,                  
@AddressLine1 VARCHAR(250),                  
@AddressLine2 VARCHAR(250),                  
@AddressLine3 VARCHAR(250),                  
@AddressLine4 VARCHAR(250),                  
@AddressLine5 VARCHAR(250),                  
@CountryId SMALLINT,                  
@StateId INT,                  
@CityId INT,                  
@ZipCode INT,                  
@UpdatedBy SMALLINT                                          
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY               
    --DECLARE @AddressType VARCHAR(100);              
    DECLARE @Title VARCHAR(100);               
              
                  
    --SELECT @AddressType = Type FROM [dbo].[AddressTypes] WHERE [AddressTypeId] = @AddressTypeId;                                    
    SET @Title = CAST(@AddressId AS VARCHAR(50)) + '_' + @AddressLine1 ;               
               
     IF NOT EXISTS (SELECT 1 FROM [dbo].[Addresses] WHERE AddressId = @AddressId)                            
     BEGIN                            
          SELECT @AddressId AS KeyValue,                                     
          'NO RECORD FOUND' AS ErrorMessage;                  
     RETURN;                
     END                  
        IF EXISTS (SELECT 1 FROM [dbo].[Addresses]  WHERE AddressId = @AddressId         
        AND ( AddressLine1 != @AddressLine1 OR AddressLine2 != @AddressLine2 OR AddressLine3 != @AddressLine3 OR  AddressLine4 != @AddressLine4 OR AddressLine5 != @AddressLine5 OR CountryId != @CountryId OR StateId != @StateId OR CityId != @CityId OR ZipCode != @ZipCode))             
        BEGIN              
        -- Update address information                  
        UPDATE [dbo].[Addresses]                  
        SET                     
         Title = @Title,                  
         AddressLine1 = @AddressLine1,                  
         AddressLine2 = @AddressLine2,                  
         AddressLine3 = @AddressLine3,                  
         AddressLine4 = @AddressLine4,                  
         AddressLine5 = @AddressLine5,                  
         CountryId = @CountryId,                  
         StateId = @StateId,                  
         CityId = @CityId,                  
         ZipCode = @ZipCode,                  
         UpdatedBy = @UpdatedBy,                  
         UpdatedAt = GETDATE()                  
        WHERE AddressId = @AddressId;                   
                
        SELECT @AddressId AS KeyValue,                                     
        'Address Updated' AS ErrorMessage;                  
    END        
    ELSE        
    BEGIN        
        SELECT @AddressId AS KeyValue,                                     
        'Address Updated' AS ErrorMessage;                  
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
