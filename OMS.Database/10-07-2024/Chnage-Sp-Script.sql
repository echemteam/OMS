/****** Object:  StoredProcedure [dbo].[UpdateResponsibleUser]    Script Date: 10-07-2024 17:14:30 ******/
DROP PROCEDURE [dbo].[UpdateResponsibleUser]
GO
/****** Object:  StoredProcedure [dbo].[GetContactBySupplierId]    Script Date: 10-07-2024 17:14:30 ******/
DROP PROCEDURE [dbo].[GetContactBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 10-07-2024 17:14:30 ******/
DROP PROCEDURE [dbo].[GetContactByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetAllModules]    Script Date: 10-07-2024 17:14:30 ******/
DROP PROCEDURE [dbo].[GetAllModules]
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalities]    Script Date: 10-07-2024 17:14:30 ******/
DROP PROCEDURE [dbo].[GetAllFunctionalities]
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalities]    Script Date: 10-07-2024 17:14:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllFunctionalities 1       
CREATE PROCEDURE [dbo].[GetAllFunctionalities]    
@ModuleId INT            
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                      
                    
SELECT
    FunctionalityId,
    Name                 
    FROM [dbo].[Functionalities]
    WHERE ModuleId=@ModuleId
                                              
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllModules]    Script Date: 10-07-2024 17:14:31 ******/
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
                                            
END TRY                                  
BEGIN CATCH                                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                  
END CATCH                           
                          
END 
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 10-07-2024 17:14:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetContactByCustomerId 1028,NULL,'4,3,2'      
CREATE PROCEDURE [dbo].[GetContactByCustomerId]                        
@CustomerId int,
@SearchText varchar(150)= NULL,
@SearchContactType varchar(100)= NULL                         
AS                        
BEGIN                        
    SET NOCOUNT ON;      
          
    BEGIN TRY 
        DECLARE @ContactTypeIdTable TABLE (ContactTypeId SMALLINT);              
                 
        IF (@SearchContactType !='' AND @SearchContactType IS NOT NULL AND LEN(@SearchContactType) > 0)
        BEGIN
            INSERT INTO @ContactTypeIdTable (ContactTypeId)              
            SELECT value              
            FROM STRING_SPLIT(@SearchContactType, ',');
        END 
                     
        SELECT            
            LCC.CustomerContactId,                    
            LCC.[CustomerId],                
            LCC.ContactId,                
            LCC.ContactTypeId,                
            CT.Type,                
            CON.FirstName,                
            CON.LastName,              
            CC.IsPrimary  
        FROM       
            [dbo].[L_CustomerContacts] LCC                
            LEFT JOIN [dbo].[Contacts] CON ON LCC.ContactId = CON.ContactId                
            LEFT JOIN [dbo].[ContactTypes] CT ON LCC.ContactTypeId = CT.ContactTypeId    
            LEFT JOIN [dbo].[L_CustomerContacts] CC ON CC.ContactId = CON.ContactId    
            OUTER APPLY (SELECT TOP 1 E.EmailAddress FROM [dbo].[Emails] E WHERE E.OwnerId = CON.ContactId AND E.OwnerTypeId = 3 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL
            ) AS E      
            --LEFT JOIN [dbo].[Emails] E ON CON.ContactId = E.OwnerId AND E.OwnerTypeId = 3 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL      
            --LEFT JOIN [dbo].[Phones] P ON CON.ContactId = P.OwnerId AND P.OwnerTypeId = 3 AND P.DeletedBy IS NULL AND P.DeletedAt IS NULL      
        WHERE        
            LCC.CustomerId = @CustomerId       
            AND CON.DeletedBy IS NULL       
            AND CON.DeletedAt IS NULL
            AND (@SearchText IS NULL OR CON.FirstName LIKE '%' + @SearchText + '%' OR CON.LastName LIKE '%' + @SearchText + '%' OR E.EmailAddress LIKE '%' + @SearchText + '%')
            AND (@SearchContactType IS NULL OR LCC.ContactTypeId IN (SELECT ContactTypeId FROM @ContactTypeIdTable))        
        ORDER BY       
            LCC.ContactId,LCC.IsPrimary,LCC.ContactTypeId DESC                    
    END TRY              
    BEGIN CATCH                  
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                  
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                  
        DECLARE @ErrorState int = ERROR_STATE()                  
              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                  
    END CATCH             
END 
GO
/****** Object:  StoredProcedure [dbo].[GetContactBySupplierId]    Script Date: 10-07-2024 17:14:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
-- GetContactBySupplierId 2021,NULL,NULL        
CREATE PROCEDURE [dbo].[GetContactBySupplierId]                          
@SupplierId int,
@SearchText varchar(150)= NULL,
@SearchContactType varchar(100)= NULL                             
AS                          
BEGIN                          
    SET NOCOUNT ON;        
            
    BEGIN TRY 
        DECLARE @ContactTypeIdTable TABLE (ContactTypeId SMALLINT);              
                 
        IF (@SearchContactType !='' AND @SearchContactType IS NOT NULL AND LEN(@SearchContactType) > 0)
        BEGIN
            INSERT INTO @ContactTypeIdTable (ContactTypeId)              
            SELECT value              
            FROM STRING_SPLIT(@SearchContactType, ',');
        END 
                          
        SELECT              
            SCC.SupplierContactId,                      
            SCC.SupplierId,                  
            SCC.ContactId,                  
            SCC.ContactTypeId,                  
            CT.Type,                  
            CON.FirstName,                  
            CON.LastName,                
            SC.IsPrimary      
        FROM         
            [dbo].[L_SupplierContacts] SCC                  
            LEFT JOIN [dbo].[Contacts] CON ON SCC.ContactId = CON.ContactId                  
            LEFT JOIN [dbo].[ContactTypes] CT ON SCC.ContactTypeId = CT.ContactTypeId      
            LEFT JOIN [dbo].[L_SupplierContacts] SC ON SC.ContactId = CON.ContactId
            OUTER APPLY (SELECT TOP 1 E.EmailAddress FROM [dbo].[Emails] E WHERE E.OwnerId = CON.ContactId AND E.OwnerTypeId = 4 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL
            ) AS E       
            --LEFT JOIN [dbo].[Emails] E ON CON.ContactId = E.OwnerId AND E.OwnerTypeId = 3 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL        
            --LEFT JOIN [dbo].[Phones] P ON CON.ContactId = P.OwnerId AND P.OwnerTypeId = 3 AND P.DeletedBy IS NULL AND P.DeletedAt IS NULL        
        WHERE          
            SCC.SupplierId = @SupplierId         
            AND CON.DeletedBy IS NULL         
            AND CON.DeletedAt IS NULL
            AND (@SearchText IS NULL OR CON.FirstName LIKE '%' + @SearchText + '%' OR CON.LastName LIKE '%' + @SearchText + '%' OR E.EmailAddress LIKE '%' + @SearchText + '%')
            AND (@SearchContactType IS NULL OR SCC.ContactTypeId IN (SELECT ContactTypeId FROM @ContactTypeIdTable))            
        ORDER BY         
            SCC.ContactId,SCC.IsPrimary,SCC.ContactTypeId DESC                
    END TRY                
    BEGIN CATCH                    
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                    
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                    
        DECLARE @ErrorState int = ERROR_STATE()                    
                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                    
    END CATCH               
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateResponsibleUser]    Script Date: 10-07-2024 17:14:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
         
CREATE PROCEDURE [dbo].[UpdateResponsibleUser]          
@OwnerId INT,                 
@OwnerType SMALLINT,
@ResponsibleUserId SMALLINT         
AS          
BEGIN          
 SET NOCOUNT ON;          
BEGIN TRY                    
   
    IF NOT EXISTS (SELECT CustomerId FROM [dbo].[Customers] WHERE CustomerId = @OwnerId) AND
       NOT EXISTS (SELECT SupplierId FROM [dbo].[Suppliers] WHERE SupplierId = @OwnerId)           
    BEGIN          
        SELECT @OwnerId as KeyValue,                   
        'NO RECORD FOUND' as ErrorMessage          
    END          
    ELSE          
    BEGIN          
    
    IF @OwnerType = 1
        BEGIN
            UPDATE [dbo].[Customers]  SET ResponsibleUserId=@ResponsibleUserId WHERE CustomerId=@OwnerId AND DeletedAt IS NULL AND DeletedBy IS NULL
            
            SELECT @OwnerId as KeyValue,                   
            'Responsible User Updated' as ErrorMessage  
        END
        
        IF @OwnerType = 2
        BEGIN
            UPDATE [dbo].[Suppliers]  SET ResponsibleUserId=@ResponsibleUserId WHERE SupplierId=@OwnerId AND DeletedAt IS NULL AND DeletedBy IS NULL
            
            SELECT @OwnerId as KeyValue,                   
            'Responsible User Updated' as ErrorMessage  
        END
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
