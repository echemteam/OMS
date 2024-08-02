USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSmtpSettings]    Script Date: 02-08-2024 15:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
CREATE PROCEDURE [dbo].[AddEditSmtpSettings]             
@SMTPSettingId SMALLINT,            
@EmailProvider VARCHAR(255),      
@SMTPServer VARCHAR(255),      
@SMTPPort INT,      
@SMTPUsername VARCHAR(255),      
@SMTPPassword VARCHAR(255),      
@UseSSL BIT,      
@CreatedBy SMALLINT      
AS            
BEGIN            
    SET NOCOUNT ON;                        
    BEGIN TRY                                        
        DECLARE @keyId AS INT;            
            
        IF @SMTPSettingId > 0            
        BEGIN            
            IF EXISTS (SELECT 1 FROM [dbo].[SMTPSettings] WHERE [SMTPSettingId] = @SMTPSettingId)            
            BEGIN            
                UPDATE [dbo].[SMTPSettings]            
                SET            
                    [EmailProvider] = @EmailProvider,    
                    [SmtpServer] = @SmtpServer,    
                    [SmtpPort] = @SmtpPort,    
                    [SmtpUserName] = @SmtpUserName,    
                    [SmtpPassword] = @SmtpPassword,    
                    [UseSsl] = @UseSsl,    
                    [UpdatedAt] = GETDATE(),      
                    [UpdatedBy] = @CreatedBy       
                WHERE            
                    [SMTPSettingId] = @SMTPSettingId      
                            
                SELECT @SMTPSettingId AS KeyValue,               
                'SMTP Settings Updated' AS ErrorMessage;            
            END             
            ELSE            
            BEGIN            
                SELECT @SMTPSettingId AS KeyValue,               
                  'NO RECORD FOUND' AS ErrorMessage;            
            END            
        END            
        ELSE            
        BEGIN            
            INSERT INTO [dbo].[SMTPSettings]      
            (                     
                  
                EmailProvider,      
                SmtpServer,      
                SmtpPort,      
                SmtpUserName,      
                SmtpPassword,      
                UseSsl,      
                CreatedBy,      
                CreatedAt      
            )                        
            VALUES                      
            (                    
                  
                @EmailProvider,      
                @SmtpServer,      
                @SmtpPort,      
                @SmtpUserName,      
                @SmtpPassword,      
                @UseSsl,      
                @CreatedBy,      
                GETDATE()        
            );                        
                        
            SET @keyId = SCOPE_IDENTITY();            
               
            SELECT @keyId AS KeyValue,               
            'SMTP Settings added' AS ErrorMessage;            
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
/****** Object:  StoredProcedure [dbo].[GetSmtpSettings]    Script Date: 02-08-2024 15:58:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetSmtpSettings  
CREATE PROCEDURE [dbo].[GetSmtpSettings]                         
AS                
BEGIN                
 SET NOCOUNT ON;                
           
 BEGIN TRY                
    SELECT TOP 1     
        SS.SmtpSettingId,        
        SS.EmailProvider,      
        SS.SmtpServer,      
        SS.SmtpPort,      
        SS.SmtpUserName,      
        SS.SmtpPassword,      
        SS.UseSsl      
    FROM [dbo].[SMTPSettings] SS      
      
    WHERE SS.DeletedBy IS NULL AND SS.DeletedAt IS NULL            
    ORDER BY SS.SmtpSettingId DESC            
          
END TRY          
    BEGIN CATCH              
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()              
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()              
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)              
    END CATCH           
END 
GO
