USE [OmsLite]
GO
/****** Object:  Table [dbo].[OrganizationOtherSettings]    Script Date: 26-07-2024 10:04:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationOtherSettings](
	[OrganizationOtherSettingId] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationId] [tinyint] NULL,
	[DefaultPaymentTerms] [tinyint] NULL,
	[FedexAccountDetail] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_OrganizationOtherSettings] PRIMARY KEY CLUSTERED 
(
	[OrganizationOtherSettingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationProfile]    Script Date: 26-07-2024 10:04:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationProfile](
	[OrganizationId] [tinyint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NOT NULL,
	[Logo] [varchar](255) NOT NULL,
	[AddressLine1] [varchar](255) NOT NULL,
	[AddressLine2] [varchar](255) NOT NULL,
	[CityId] [int] NOT NULL,
	[StateId] [int] NOT NULL,
	[CountryId] [smallint] NOT NULL,
	[ZipCode] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[Base64File] [nvarchar](max) NULL,
 CONSTRAINT [PK_OrganizationProfile] PRIMARY KEY CLUSTERED 
(
	[OrganizationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SmtpSettings]    Script Date: 26-07-2024 10:04:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SmtpSettings](
	[SmtpSettingId] [smallint] IDENTITY(1,1) NOT NULL,
	[OrganizationId] [tinyint] NOT NULL,
	[EmailProvider] [varchar](255) NOT NULL,
	[SmtpServer] [varchar](255) NOT NULL,
	[SmtpPort] [int] NOT NULL,
	[SmtpUserName] [varchar](255) NOT NULL,
	[SmtpPassword] [varchar](255) NOT NULL,
	[UseSsl] [bit] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_SMTPSettings] PRIMARY KEY CLUSTERED 
(
	[SmtpSettingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubCustomerMainCustomer]    Script Date: 26-07-2024 10:04:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCustomerMainCustomer](
	[SubCustomerMainCustomerId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NULL,
	[SubCustomerId] [int] NULL,
	[DeletedBy] [smallint] NULL,
	[DeletedAt] [datetime] NULL,
 CONSTRAINT [PK_SubCustomerMainCustomer] PRIMARY KEY CLUSTERED 
(
	[SubCustomerMainCustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupplierPaymentSettings]    Script Date: 26-07-2024 10:04:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupplierPaymentSettings](
	[SupplierPaymentSettingId] [int] IDENTITY(1,1) NOT NULL,
	[SupplierId] [int] NULL,
	[CCNote] [nvarchar](2000) NULL,
	[IsCCExistsOnFile] [bit] NULL,
	[CheckMailingAddressId] [int] NULL,
	[OtherNote] [nvarchar](2000) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[DeletedAt] [datetime] NULL,
 CONSTRAINT [PK_SupplierPaymentSettings] PRIMARY KEY CLUSTERED 
(
	[SupplierPaymentSettingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OrganizationOtherSettings]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationOtherSettings_PaymentTerms] FOREIGN KEY([DefaultPaymentTerms])
REFERENCES [dbo].[PaymentTerms] ([PaymentTermId])
GO
ALTER TABLE [dbo].[OrganizationOtherSettings] CHECK CONSTRAINT [FK_OrganizationOtherSettings_PaymentTerms]
GO
ALTER TABLE [dbo].[OrganizationProfile]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationProfile_Cities] FOREIGN KEY([CityId])
REFERENCES [dbo].[Cities] ([CityId])
GO
ALTER TABLE [dbo].[OrganizationProfile] CHECK CONSTRAINT [FK_OrganizationProfile_Cities]
GO
ALTER TABLE [dbo].[OrganizationProfile]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationProfile_Countries] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Countries] ([CountryId])
GO
ALTER TABLE [dbo].[OrganizationProfile] CHECK CONSTRAINT [FK_OrganizationProfile_Countries]
GO
ALTER TABLE [dbo].[OrganizationProfile]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationProfile_States] FOREIGN KEY([StateId])
REFERENCES [dbo].[States] ([StateId])
GO
ALTER TABLE [dbo].[OrganizationProfile] CHECK CONSTRAINT [FK_OrganizationProfile_States]
GO
ALTER TABLE [dbo].[SmtpSettings]  WITH CHECK ADD  CONSTRAINT [FK_SMTPSettings_OrganizationProfile] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[OrganizationProfile] ([OrganizationId])
GO
ALTER TABLE [dbo].[SmtpSettings] CHECK CONSTRAINT [FK_SMTPSettings_OrganizationProfile]
GO
ALTER TABLE [dbo].[SubCustomerMainCustomer]  WITH CHECK ADD  CONSTRAINT [FK_SubCustomerId_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[SubCustomerMainCustomer] CHECK CONSTRAINT [FK_SubCustomerId_Customers]
GO
ALTER TABLE [dbo].[SupplierPaymentSettings]  WITH CHECK ADD  CONSTRAINT [FK_SupplierPaymentSettings_Suppliers] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Suppliers] ([SupplierId])
GO
ALTER TABLE [dbo].[SupplierPaymentSettings] CHECK CONSTRAINT [FK_SupplierPaymentSettings_Suppliers]
GO
