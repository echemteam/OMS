USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddAddress]    Script Date: 01-10-2024 16:26:04 ******/
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
        AND [StateId]=@StateId AND [CityId]=@CityId AND DeletedAt IS NULL AND DeletedBy IS NULL)        
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
/****** Object:  StoredProcedure [dbo].[GetAllAddressTypes]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
-- GetAllAddressTypes         
CREATE PROCEDURE [dbo].[GetAllAddressTypes]                    
                   
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
BEGIN TRY                            
          
SELECT                    
[AddressTypeId],  
[Type],  
[IsForCustomers],  
[IsForSuppliers]  
FROM [dbo].[AddressTypes]  
  
order by Type asc
                                      
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END   
GO
/****** Object:  StoredProcedure [dbo].[GetAllCities]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
-- GetAllCities 2336           
CREATE PROCEDURE [dbo].[GetAllCities]                      
@StateId INT                     
AS                      
BEGIN                      
    SET NOCOUNT ON;                      
    BEGIN TRY                              
            
    SELECT                      
    [CityId],    
    [Name],    
    [StateId]    
    FROM [dbo].[Cities] Where [StateId]=@StateId      

	order by Name asc
                                        
    END TRY                              
BEGIN CATCH                              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                              
END CATCH                       
                      
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllContactTypes]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllContactTypes       
CREATE PROCEDURE [dbo].[GetAllContactTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
[ContactTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM [dbo].[ContactTypes]

order by Type asc
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllCountries]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
-- GetAllCountries         
CREATE PROCEDURE [dbo].[GetAllCountries]                    
                   
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
BEGIN TRY                            
          
SELECT                    
[CountryId],  
[Name],
[PhoneCode]
FROM [dbo].[Countries]  
order by Name asc
                                      
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllCustomers]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetAllCustomers]
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                 
                    
SELECT    
    C.[CustomerId],  
    C.[Name],
    C.IsBuyingForThirdParty,
    C.StatusId,
    S.[Status] as StatusName,
    C.CreatedAt
FROM [dbo].[Customers] C
LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId
WHERE C.deletedby IS NULL 
  AND C.deletedAt IS NULL   

Order by C.Name asc
                                                
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllDeliveryAccounts]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
-- GetAllDeliveryAccounts           
CREATE PROCEDURE [dbo].[GetAllDeliveryAccounts]                      
AS                      
BEGIN                      
    SET NOCOUNT ON;                      
    BEGIN TRY                              
            
    SELECT                      
        [DeliveryAccountId],    
        [Name]  
    FROM  [dbo].[DeliveryAccounts]    
    
	order by Name asc
END TRY                              
BEGIN CATCH                              
    DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                              
    DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                              
    DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                              
END CATCH                       
END   
GO
/****** Object:  StoredProcedure [dbo].[GetAllDocumentTypes]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
-- GetAllDocumentTypes         
CREATE PROCEDURE [dbo].[GetAllDocumentTypes]                    
                   
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
BEGIN TRY                            
          
SELECT  
[DocumentTypeId],  
[Type],  
[IsForCustomers],  
[IsForSuppliers]  
FROM  [dbo].[DocumentTypes]  
    
	order by Type asc

END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END   
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalities]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetAllFunctionalities 0
CREATE PROCEDURE [dbo].[GetAllFunctionalities]        
 @ModuleId INT               
AS                                  
BEGIN                                  
 SET NOCOUNT ON;                                  
BEGIN TRY                                          
                        
SELECT    
    F.FunctionalityId,    
    F.Name,  
    FE.IsFunctional                     
    FROM [dbo].[Functionalities] F  
    LEFT JOIN [dbo].[FunctionalityEvents] FE ON F.FunctionalityId= FE.FunctionalityId      
    WHERE @ModuleId = 0 OR F.ModuleId = @ModuleId   
 GROUP BY   
 F.FunctionalityId,  
 F.Name,  
 FE.IsFunctional  
       order by F.Name asc                          
END TRY                                          
BEGIN CATCH                                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                          
END CATCH                                   
                                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalitiesFields]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllFunctionalitiesFields 1         
CREATE PROCEDURE [dbo].[GetAllFunctionalitiesFields]      
@functionalityId INT              
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                        
                      
SELECT  
    [FunctionalitiesFieldId],  
    [FieldName]
    FROM [dbo].[FunctionalitiesFields] F
    INNER JOIN [dbo].[FunctionalitiesTables] FT ON F.[FunctionalitiesTableId] = FT.[FunctionalitiesTableId]
    WHERE FT.[FunctionalityId]=@functionalityId
     order by FieldName Asc
END TRY                                        
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                        
END CATCH                                 
                                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalityEventByFunctionalityId]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllFunctionalityEventByFunctionalityId 2
CREATE PROCEDURE [dbo].[GetAllFunctionalityEventByFunctionalityId]
    @FunctionalityId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT
            FE.FunctionalityEventId,
            FE.EventName
        FROM
            [dbo].[FunctionalityEvents] FE
        WHERE
            FE.FunctionalityId = @FunctionalityId
            --AND FE.IsFunctional = 1;
		order by FE.EventName asc
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllGroupTypes]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllGroupTypes       
CREATE PROCEDURE [dbo].[GetAllGroupTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
 [GroupTypeId],    
 [Type],
 [IsForCustomers],
 [IsForSuppliers]
FROM  [dbo].[GroupTypes]

 ORDER BY Type asc;  
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllIncoterm]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
CREATE PROCEDURE [dbo].[GetAllIncoterm]    
AS                                  
BEGIN                                  
 SET NOCOUNT ON;                                  
BEGIN TRY                                     
                        
SELECT   
    IncotermId,
    IncotermName 
FROM [dbo].[Incoterm]  

order by IncotermName asc
                                                    
END TRY                                          
BEGIN CATCH                                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                          
END CATCH                                   
                                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllModules]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllModules
CREATE PROCEDURE [dbo].[GetAllModules]        
AS                          
BEGIN                          
 SET NOCOUNT ON;                          
BEGIN TRY                                  
                
SELECT
 ModuleId,
 ModuleName        
 FROM [dbo].[Modules]  
 
 order by ModuleName asc
                                            
END TRY                                  
BEGIN CATCH                                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                  
END CATCH                           
                          
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllOrderMethod]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllOrderMethod]  
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                   
                      
SELECT 
    OrderMethodId,
    OrderMethod
FROM [dbo].[OrderMethod]

order by OrderMethod asc
                                                  
END TRY                                        
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                        
END CATCH                                 
                                
END   
GO
/****** Object:  StoredProcedure [dbo].[GetAllPaymentMethod]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
   
CREATE PROCEDURE [dbo].[GetAllPaymentMethod]   
    
AS  
   
BEGIN                    
 SET NOCOUNT ON;                    
BEGIN TRY                            
          
SELECT                    
 PaymentMethodId,  
 Method  
FROM [dbo].PaymentMethods  

order by Method asc
                                      
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END   
GO
/****** Object:  StoredProcedure [dbo].[GetAllPhoneTypes]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllPhoneTypes       
CREATE PROCEDURE [dbo].[GetAllPhoneTypes]                  
AS                  
BEGIN                  
    SET NOCOUNT ON;                  
    BEGIN TRY                          
        
    SELECT                  
        [PhoneTypeId],
        [Type]
    FROM  [dbo].[PhoneTypes]

	order by Type asc

END TRY                          
BEGIN CATCH                          
    DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
    DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
    DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllPODeliveryMethod]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllPODeliveryMethod      
CREATE PROCEDURE [dbo].[GetAllPODeliveryMethod]              
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                        
                      
SELECT      
[PODeliveryMethodId],    
[PODeliveryMethod]
 FROM [dbo].[PODeliveryMethod]         
 
 order by PODeliveryMethod asc
END TRY                                        
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                        
END CATCH                                 
                                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllRoles]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetAllRoles     
CREATE PROCEDURE [dbo].[GetAllRoles]                
               
AS                
BEGIN                
 SET NOCOUNT ON;                
BEGIN TRY                        
      
SELECT                
	[RoleId] ,  
	[RoleName]       
FROM  [dbo].[Roles]  
WHERE DeletedAt IS NULL AND DeletedBy IS NULL
     order by RoleName asc                            
END TRY                        
BEGIN CATCH                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                        
END CATCH                 
                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllStates]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
-- GetAllStates         
CREATE PROCEDURE [dbo].[GetAllStates]                    
                   
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
BEGIN TRY                            
          
SELECT                    
[StateId],  
[Name] +' '+ [StateCode] As [Name],  
[CountryId]  
FROM [dbo].[States]  
  
order by Name Asc  
                                      
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END   
GO
/****** Object:  StoredProcedure [dbo].[GetAllTerritories]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllTerritories       
CREATE PROCEDURE [dbo].[GetAllTerritories]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
 [TerritoryId],    
 [Territory]
FROM [dbo].[Territories]

order by Territory asc;
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllUser]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================          
-- Author:  <Author,,Name>          
-- Create date: <Create Date,,>          
-- Description: <Description,,>          
-- =============================================          
CREATE PROCEDURE [dbo].[GetAllUser]                              
AS                            
BEGIN                            
 SET NOCOUNT ON;                            
BEGIN TRY                                    
                  
SELECT          
 U.UserId,          
 CONCAT(FirstName, ' ', LastName) AS FullName,      
 UR.RoleId,      
 R.RoleName      
 FROM Users U      
 RIGHT JOIN L_UserRoles UR ON  U.UserId = UR.UserId AND UR.DeletedAt IS NULL AND UR.DeletedBy IS NULL    
 LEFT JOIN Roles R ON R.RoleId = UR.RoleId      
 WHERE U.DeletedAt IS NULL AND U.DeletedBy IS NULL AND IsActive=1     
  order by FullName ASC  
                                              
END TRY                                    
BEGIN CATCH                                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                    
END CATCH                             
                            
END   
GO
/****** Object:  StoredProcedure [dbo].[GetDefaultPaymentTemplete]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
   
CREATE PROCEDURE [dbo].[GetDefaultPaymentTemplete]   
    
AS  
   
BEGIN                    
 SET NOCOUNT ON;                    
BEGIN TRY                            
          
SELECT                    
 PaymentTermId,  
 PaymentTerm  
FROM [dbo].PaymentTerms  
 
order by PaymentTerm asc
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END   
GO
/****** Object:  StoredProcedure [dbo].[GetUnAssignedUserByRoleId]    Script Date: 01-10-2024 16:26:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetUnAssignedUserByRoleId 1  
CREATE PROCEDURE [dbo].[GetUnAssignedUserByRoleId]  
 @RoleId tinyint           
AS          
BEGIN          
 SET NOCOUNT ON;          
          
SELECT DISTINCT U.UserId, U.UserName          
FROM [dbo].[Users] U          
LEFT JOIN [dbo].[L_UserRoles] UR ON U.UserId = UR.UserId          
WHERE U.UserId NOT IN (          
    SELECT UserId          
    FROM [dbo].[L_UserRoles]           
    WHERE UR.RoleId = @RoleId  AND UR.DeletedAt IS NULL AND UR.DeletedBy IS NULL            
) and U.DeletedAt IS NULL AND U.DeletedBy IS NULL --AND UR.DeletedAt IS NULL AND UR.DeletedBy IS NULL        
order by  U.UserName asc
END   
  
  
GO
