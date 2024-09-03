USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddAddress]    Script Date: 02-09-2024 15:48:23 ******/
DROP PROCEDURE [dbo].[UpdateAddAddress]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAddresssByAddressId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetSupplierAddresssByAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetRecipientAddressByrecipientAddressId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetRecipientAddressByrecipientAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAddresssByAddressId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetCustomerAddresssByAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetBankAddressByBankAddressId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetBankAddressByBankAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]
GO
/****** Object:  StoredProcedure [dbo].[GetAddresssBySupplierId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetAddresssBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetAddresssByCustomerId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetAddresssByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetAddressByAddressId]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[GetAddressByAddressId]
GO
/****** Object:  StoredProcedure [dbo].[AddAddress]    Script Date: 02-09-2024 15:48:24 ******/
DROP PROCEDURE [dbo].[AddAddress]
GO
/****** Object:  StoredProcedure [dbo].[AddAddress]    Script Date: 02-09-2024 15:48:24 ******/
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
@StateName VARCHAR(255)=NULL,          
@CityId int,
@CityName VARCHAR(255)=NULL,          
@ZipCode VARCHAR(10),          
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
        IF @StateName IS NOT NULL AND @StateId = 0
        BEGIN
         IF EXISTS (SELECT StateId FROM [dbo].[States] WHERE Name = @StateName AND CountryId = @CountryId )
            BEGIN
                SET @StateId = (SELECT StateId FROM [dbo].[States] WHERE Name = @StateName AND CountryId = @CountryId);
            END
            ELSE
            BEGIN
                INSERT INTO [dbo].[States] (Name,CountryId, CreatedAt)
                VALUES (@StateName, @CountryId, GETDATE());
                SET @StateId = SCOPE_IDENTITY(); 
            END
        END 
        IF @CityName IS NOT NULL AND @CityId = 0
        BEGIN
            IF EXISTS (SELECT CityId FROM [dbo].[Cities] WHERE Name = @CityName AND StateId = @StateId)
            BEGIN
                 SET @CityId =(SELECT CityId FROM [dbo].[Cities] WHERE Name = @CityName AND StateId = @StateId);
            END
            ELSE
            BEGIN
                INSERT INTO [dbo].[Cities] (Name,StateId, CreatedAt)
                VALUES (@CityName, @StateId, GETDATE());
                SET @CityId = SCOPE_IDENTITY(); 

            END
        END               
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
/****** Object:  StoredProcedure [dbo].[GetAddressByAddressId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetAddressByAddressId 3380          
CREATE PROCEDURE [dbo].[GetAddressByAddressId]            
@AddressId int               
AS            
BEGIN            
    SET NOCOUNT ON;            
       
    BEGIN TRY            
        SELECT  
            A.[AddressId],          
            A.[AddressLine1],        
            A.[AddressLine2],             
            A.[CountryId],        
            C.[Name] AS CountryName,        
            A.[StateId],        
            S.[Name] AS StateName,        
            A.[CityId],        
            CI.[Name] AS CityName,        
            A.[ZipCode]     
        FROM [dbo].[Addresses] A     
        LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
        LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId        
        LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
        WHERE A.[AddressId] = @AddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
        ORDER BY A.AddressId DESC        
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();          
        DECLARE @ErrorState int = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH       
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAddresssByCustomerId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetAddresssByCustomerId 1076          
CREATE PROCEDURE [dbo].[GetAddresssByCustomerId]            
@CustomerId int             
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT  
        CA.CustomerAddressId,        
        A.[AddressId],        
        ATS.[AddressTypeId],        
        ATS.[Type],        
        A.[AddressLine1],        
        A.[AddressLine2],        
        A.[AddressLine3],        
        A.[AddressLine4],        
        A.[AddressLine5],        
        A.[CountryId],        
        C.[Name] As CountryName,        
        A.[StateId],        
        S.[Name] As StateName,
        S.StateCode,        
        A.[CityId],        
        CI.[Name] As CityName,        
        A.[ZipCode],    
        CA.IsPreferredShipping,    
        CA.IsPreferredBilling        
    FROM [dbo].[L_CustomerAddresses] CA            
    left JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = CA.AddressTypeId        
    left JOIN [dbo].[Addresses] A ON A.AddressId = CA.AddressId        
    left JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= A.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
    WHERE  CA.CustomerId=@CustomerId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
    ORDER BY A.AddressId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAddresssBySupplierId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetAddresssBySupplierId 5          
CREATE PROCEDURE [dbo].[GetAddresssBySupplierId]            
@SupplierId int             
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT  
        SA.SupplierAddressId,        
        A.[AddressId],        
        SA.[AddressTypeId],        
        ATS.[Type],        
        A.[AddressLine1],        
        A.[AddressLine2],        
        A.[AddressLine3],        
        A.[AddressLine4],        
        A.[AddressLine5],        
        A.[CountryId],        
        C.[Name] As CountryName,        
        A.[StateId],        
        S.[Name] As StateName,
        S.StateCode,            
        A.[CityId],        
        CI.[Name] As CityName,        
        A.[ZipCode],    
        SP.SupplierTypeId,    
        ST.Type As SupplierType        
    FROM [dbo].[L_SupplierAddresses] SA    
    left JOIN [dbo].[Suppliers] SP ON SP.SupplierId= SA.SupplierId    
    left JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = SA.AddressTypeId     
    left JOIN [dbo].[SupplierTypes] ST ON ST.SupplierTypeId= SP.SupplierTypeId           
    left JOIN [dbo].[Addresses] A ON A.AddressId = SA.AddressId        
    left JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= A.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
    WHERE  SA.SupplierId=@SupplierId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
    ORDER BY A.AddressId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllAddressesByCustomerIdAndAddressTypeId  1093,1             
CREATE PROCEDURE [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]          
@CustomerId INT,
@AddressTypeId SMALLINT             
AS                                    
BEGIN                                    
 SET NOCOUNT ON;                                    
BEGIN TRY                                            
                          
    SELECT 
        A.AddressId,
        LCA.AddressTypeId,
        AT.Type as AddressType,     
        A.AddressLine1,
        A.AddressLine2,
        A.AddressLine3,
        A.AddressLine4,
        A.AddressLine5,
        A.CityId,
        CT.Name as CityName,
        A.StateId,
        S.Name As StateName,
        A.CountryId,
        C.Name AS CountryName,
        A.ZipCode   
    FROM [dbo].[L_CustomerAddresses] LCA
    LEFT JOIN [dbo].[Addresses] A ON A.[AddressId]= LCA.AddressId 
    LEFT JOIN [dbo].[AddressTypes] AT ON AT.[AddressTypeId]= LCA.AddressTypeId
    LEFT JOIN [dbo].[Countries] C ON C.[CountryId]= A.CountryId
    LEFT JOIN [dbo].[States] S ON S.[StateId]= A.StateId
    LEFT JOIN [dbo].[Cities] CT ON CT.[CityId]= A.CityId
    WHERE LCA.CustomerId = @CustomerId AND LCA.AddressTypeId=@AddressTypeId AND  A.DeletedAt IS NULL AND A.DeletedBy IS NULL  
                                                    
END TRY                                            
BEGIN CATCH                                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                            
END CATCH                                     
                                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetBankAddressByBankAddressId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetBankAddressByBankAddressId 3380          
CREATE PROCEDURE [dbo].[GetBankAddressByBankAddressId]            
@BankAddressId int               
AS            
BEGIN            
    SET NOCOUNT ON;            
       
    BEGIN TRY            
        SELECT  
            A.[AddressId],          
            A.[AddressLine1],        
            A.[AddressLine2],             
            A.[CountryId],        
            C.[Name] AS CountryName,        
            A.[StateId],        
            S.[Name] AS StateName,        
            A.[CityId],        
            CI.[Name] AS CityName,        
            A.[ZipCode]     
        FROM [dbo].[Addresses] A     
        LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
        LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId        
        LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
        WHERE A.[AddressId] = @BankAddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
        ORDER BY A.AddressId DESC        
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();          
        DECLARE @ErrorState int = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH       
END;
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAddresssByAddressId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetCustomerAddresssByAddressId 2202          
CREATE PROCEDURE [dbo].[GetCustomerAddresssByAddressId]            
@AddressId int             
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT  
        CA.CustomerAddressId,        
        A.[AddressId],        
        ATS.[AddressTypeId],        
        ATS.[Type],        
        A.[AddressLine1],        
        A.[AddressLine2],        
        A.[AddressLine3],        
        A.[AddressLine4],        
        A.[AddressLine5],        
        A.[CountryId],        
        C.[Name] As CountryName,        
        A.[StateId],        
        S.[Name] As StateName,        
        A.[CityId],        
        CI.[Name] As CityName,        
        A.[ZipCode],    
        CA.IsPreferredShipping,    
        CA.IsPreferredBilling        
    FROM [dbo].[Addresses] A             
    left JOIN [dbo].[L_CustomerAddresses] CA ON CA.AddressId = A.AddressId        
    left JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = CA.AddressTypeId   
    left JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= A.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
    WHERE  A.AddressId=@AddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
    ORDER BY A.AddressId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[GetRecipientAddressByrecipientAddressId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetRecipientAddressByrecipientAddressId 3381         
CREATE PROCEDURE [dbo].[GetRecipientAddressByrecipientAddressId]            
@RecipientAddressId int               
AS            
BEGIN            
    SET NOCOUNT ON;            
       
    BEGIN TRY            
        SELECT  
            A.[AddressId],          
            A.[AddressLine1],        
            A.[AddressLine2],             
            A.[CountryId],        
            C.[Name] AS CountryName,        
            A.[StateId],        
            S.[Name] AS StateName,        
            A.[CityId],        
            CI.[Name] AS CityName,        
            A.[ZipCode]     
        FROM [dbo].[Addresses] A     
        LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
        LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId        
        LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
        WHERE A.[AddressId] = @RecipientAddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
        ORDER BY A.AddressId DESC        
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();          
        DECLARE @ErrorState int = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH       
END;
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAddresssByAddressId]    Script Date: 02-09-2024 15:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetSupplierAddresssByAddressId 2202          
CREATE PROCEDURE [dbo].[GetSupplierAddresssByAddressId]            
@AddressId int             
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT  
        SA.SupplierAddressId,        
        A.[AddressId],        
        ATS.[AddressTypeId],        
        ATS.[Type],        
        A.[AddressLine1],        
        A.[AddressLine2],        
        A.[AddressLine3],        
        A.[AddressLine4],        
        A.[AddressLine5],        
        A.[CountryId],        
        C.[Name] As CountryName,        
        A.[StateId],        
        S.[Name] As StateName,        
        A.[CityId],        
        CI.[Name] As CityName,        
        A.[ZipCode]
    FROM [dbo].[Addresses] A             
    left JOIN [dbo].[L_SupplierAddresses] SA ON SA.AddressId = A.AddressId        
    left JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = SA.AddressTypeId   
    left JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= A.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
    WHERE  A.AddressId=@AddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
    ORDER BY A.AddressId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddAddress]    Script Date: 02-09-2024 15:48:24 ******/
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
@StateName VARCHAR(255)=NULL,                      
@CityId INT,     
@CityName VARCHAR(255)=NULL,              
@ZipCode VARCHAR(10),                  
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

            IF @StateName IS NOT NULL AND @StateId = 0
            BEGIN
                -- Ensure only one row is returned
                IF EXISTS (SELECT 1 FROM [dbo].[States] WHERE Name = @StateName AND CountryId = @CountryId)
                BEGIN
                    SET @StateId = (SELECT TOP 1 StateId FROM [dbo].[States] WHERE Name = @StateName AND CountryId = @CountryId ORDER BY StateId);
                END
                ELSE
                BEGIN
                    INSERT INTO [dbo].[States] (Name, CountryId, CreatedAt) 
                    VALUES (@StateName, @CountryId, GETDATE());
                    SET @StateId = SCOPE_IDENTITY();
                END 
            END

            IF @CityName IS NOT NULL AND @CityId = 0  
            BEGIN
                -- Ensure only one row is returned
                IF EXISTS (SELECT 1 FROM [dbo].[Cities] WHERE Name = @CityName AND StateId = @StateId)
                BEGIN
                    SET @CityId = (SELECT TOP 1 CityId FROM [dbo].[Cities] WHERE Name = @CityName AND StateId = @StateId ORDER BY CityId);
                END
                ELSE
                BEGIN
                    INSERT INTO [dbo].[Cities] (Name, StateId, CreatedAt) 
                    VALUES (@CityName, @StateId, GETDATE());
                    SET @CityId = SCOPE_IDENTITY(); 
                END
            END         
  
  
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
