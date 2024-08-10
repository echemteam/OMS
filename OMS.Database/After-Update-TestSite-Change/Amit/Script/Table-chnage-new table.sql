
/****** Object:  Table [dbo].[APIAuthentication]    Script Date: 10-08-2024 15:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APIAuthentication](
	[AuthId] [int] IDENTITY(1,1) NOT NULL,
	[ProviderId] [int] NULL,
	[AuthKey] [nvarchar](255) NULL,
	[ClientId] [nvarchar](255) NULL,
	[ClientSecret] [nvarchar](255) NULL,
	[TokenEndpoint] [nvarchar](255) NULL,
	[TokenExpires] [datetime] NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[Token] [varchar](255) NULL,
	[TokenExpiryTime] [datetime] NULL,
 CONSTRAINT [PK_APIAuthentication] PRIMARY KEY CLUSTERED 
(
	[AuthId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiConfigurationEventParameterMap]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiConfigurationEventParameterMap](
	[ApiEventParametersId] [int] IDENTITY(1,1) NOT NULL,
	[ApiEventId] [int] NULL,
	[ParameterId] [int] NULL,
 CONSTRAINT [PK_ApiEventParameters] PRIMARY KEY CLUSTERED 
(
	[ApiEventParametersId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[APIEndpoints]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APIEndpoints](
	[EndpointId] [int] IDENTITY(1,1) NOT NULL,
	[ProviderId] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[Path] [nvarchar](255) NULL,
	[Method] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_APIEndpoints] PRIMARY KEY CLUSTERED 
(
	[EndpointId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiEvent]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiEvent](
	[ApiEventId] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [varchar](255) NOT NULL,
	[Description] [varchar](500) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ApiEventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[EventName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiEventParameterMapping]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiEventParameterMapping](
	[ApiParameterMappingId] [int] IDENTITY(1,1) NOT NULL,
	[ApiEventId] [int] NULL,
	[ProviderParameterId] [int] NULL,
	[EventParameterId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK__ApiEvent__D979ABB30074CFEE] PRIMARY KEY CLUSTERED 
(
	[ApiParameterMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiEventRequiredField]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiEventRequiredField](
	[ApiEventRequiredFieldId] [int] IDENTITY(1,1) NOT NULL,
	[FieldName] [varchar](255) NULL,
	[FieldType] [varchar](50) NULL,
	[FieldDescription] [varchar](500) NULL,
	[ApiEventId] [int] NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_ApiEventRequiredFields] PRIMARY KEY CLUSTERED 
(
	[ApiEventRequiredFieldId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiEventRequiredFieldsMapping]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiEventRequiredFieldsMapping](
	[ApiEventRequiredFieldsMappingId] [int] IDENTITY(1,1) NOT NULL,
	[ApiEventRequiredFieldId] [int] NOT NULL,
	[APIResponseFieldName] [varchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[ApiEventId] [int] NULL,
 CONSTRAINT [PK_ApiEventRequiredFieldsMapping] PRIMARY KEY CLUSTERED 
(
	[ApiEventRequiredFieldsMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiParameterMapping]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiParameterMapping](
	[ApiParameterMappingId] [int] IDENTITY(1,1) NOT NULL,
	[ApiEventParameterId] [int] NOT NULL,
	[ParameterId] [int] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_ApiParameterMappings] PRIMARY KEY CLUSTERED 
(
	[ApiParameterMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApiProvidersParametersMapping]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApiProvidersParametersMapping](
	[ApiParametersMappingId] [int] IDENTITY(1,1) NOT NULL,
	[EndpointId] [int] NULL,
	[ParameterId] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ApiParametersMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApprovalRequests]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApprovalRequests](
	[ApprovalRequestId] [int] IDENTITY(1,1) NOT NULL,
	[ModuleId] [int] NULL,
	[FunctionalityId] [int] NULL,
	[TableId] [int] NULL,
	[FunctionalityEventId] [int] NULL,
	[FunctionalitiesFieldId] [int] NULL,
	[OldValue] [nvarchar](max) NULL,
	[NewValue] [nvarchar](max) NULL,
	[RequestedByUserId] [smallint] NULL,
	[RequestedDate] [datetime] NULL,
	[ApprovedByUserId] [smallint] NULL,
	[ApprovedDate] [datetime] NULL,
	[Status] [nvarchar](50) NULL,
 CONSTRAINT [PK_ApprovalRequests] PRIMARY KEY CLUSTERED 
(
	[ApprovalRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Functionalities]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Functionalities](
	[FunctionalityId] [int] IDENTITY(1,1) NOT NULL,
	[ModuleId] [int] NULL,
	[Name] [nvarchar](100) NULL,
 CONSTRAINT [PK_Functionalities] PRIMARY KEY CLUSTERED 
(
	[FunctionalityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FunctionalitiesFields]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FunctionalitiesFields](
	[FunctionalitiesFieldId] [int] IDENTITY(1,1) NOT NULL,
	[FieldName] [nvarchar](150) NOT NULL,
	[FunctionalitiesTableId] [int] NULL,
	[RequiresApproval] [bit] NULL,
 CONSTRAINT [PK_FunctionalitiesFields] PRIMARY KEY CLUSTERED 
(
	[FunctionalitiesFieldId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FunctionalitiesResponsibles]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FunctionalitiesResponsibles](
	[FunctionalitiesResponsiblesId] [int] IDENTITY(1,1) NOT NULL,
	[FunctionalityId] [int] NULL,
	[ResponsibleUserId] [smallint] NULL,
 CONSTRAINT [PK_ModuleResponsibles] PRIMARY KEY CLUSTERED 
(
	[FunctionalitiesResponsiblesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FunctionalityEvents]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FunctionalityEvents](
	[FunctionalityEventId] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [nvarchar](255) NOT NULL,
	[EventDate] [datetime] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[FunctionalityId] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[FunctionalityEventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[OrderMethodId] [tinyint] NULL,
	[CustomerId] [int] NULL,
	[SubCustomerId] [int] NULL,
	[PoNumber] [varchar](255) NULL,
	[OrderReceivedDate] [datetime] NULL,
	[IsEndUser] [bit] NULL,
	[EndUserContactId] [int] NULL,
	[IsInvoiceSubmission] [bit] NULL,
	[InvoiceSubmissionContactId] [int] NULL,
	[IsPurchasing] [bit] NULL,
	[PurchasingContactId] [int] NULL,
	[ReferenceNumber] [nvarchar](100) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationAccountingDetails]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationAccountingDetails](
	[OrganizationAccountingDetailId] [tinyint] IDENTITY(1,1) NOT NULL,
	[CreditLimit] [decimal](18, 2) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationAccountingDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationBankDetails]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationBankDetails](
	[OrganizationBankDetailId] [tinyint] IDENTITY(1,1) NOT NULL,
	[BeneficiaryName] [nvarchar](255) NOT NULL,
	[CheckingAccountNumber] [nvarchar](50) NOT NULL,
	[RoutingAccountNumber] [nvarchar](50) NOT NULL,
	[SwiftCode] [nvarchar](50) NOT NULL,
	[BankAddress] [nvarchar](255) NOT NULL,
	[BankBranch] [nvarchar](100) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationBankDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationBusinessAddresses]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationBusinessAddresses](
	[OrganizationBusinessAddressId] [tinyint] IDENTITY(1,1) NOT NULL,
	[RegisteredAddressId] [int] NOT NULL,
	[PhysicalAddressId] [int] NOT NULL,
	[RemitToAddressId] [int] NULL,
	[BillToAddressId] [int] NULL,
	[LabAddressId] [int] NULL,
	[WarehouseAddressId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationBusinessAddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationContactDetails]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationContactDetails](
	[OrganizationContactDetailId] [tinyint] IDENTITY(1,1) NOT NULL,
	[CompanyWebsite] [nvarchar](255) NOT NULL,
	[SalesEmail] [nvarchar](255) NOT NULL,
	[AccountsEmail] [nvarchar](255) NOT NULL,
	[PurchaseEmail] [nvarchar](255) NOT NULL,
	[CustomerServiceEmail] [nvarchar](255) NOT NULL,
	[SalesPhone] [nvarchar](20) NOT NULL,
	[AccountsPhone] [nvarchar](20) NOT NULL,
	[TollFreePhone] [nvarchar](20) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationContactDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationHistory]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationHistory](
	[OrganizationHistoryId] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [nvarchar](255) NOT NULL,
	[ChangeBy] [smallint] NOT NULL,
	[ChangeAt] [datetime] NULL,
	[Description] [nvarchar](max) NULL,
	[EventStatus] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationLogisticDetails]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationLogisticDetails](
	[OrganizationLogisticDetailId] [tinyint] IDENTITY(1,1) NOT NULL,
	[FedExAccount] [nvarchar](50) NOT NULL,
	[DHLAccount] [nvarchar](50) NOT NULL,
	[UPSAccount] [nvarchar](50) NOT NULL,
	[USPSAccount] [nvarchar](50) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationLogisticDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationOtherCharges]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationOtherCharges](
	[OrganizationOtherChargeId] [tinyint] IDENTITY(1,1) NOT NULL,
	[HandlingFees] [decimal](18, 2) NOT NULL,
	[BankWireFees] [decimal](18, 2) NOT NULL,
	[CreditCardServiceFees] [decimal](18, 2) NOT NULL,
	[ColdBoxFees] [decimal](18, 2) NOT NULL,
	[ITNFees] [decimal](18, 2) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[DefaultPaymentTerms] [tinyint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationOtherChargeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationOtherSettings]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationOtherSettings](
	[OrganizationOtherSettingId] [int] IDENTITY(1,1) NOT NULL,
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
/****** Object:  Table [dbo].[OrganizationProfile]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationProfile](
	[OrganizationProfileId] [tinyint] IDENTITY(1,1) NOT NULL,
	[RegisteredName] [nvarchar](255) NULL,
	[DBAName] [nvarchar](255) NULL,
	[DateIncorporated] [datetime] NULL,
	[NAICSCode] [nvarchar](6) NULL,
	[EIN] [nvarchar](9) NULL,
	[TXTaxpayerNumber] [nvarchar](20) NULL,
	[SOSFileNumber] [nvarchar](20) NULL,
	[WebFileNumber] [nvarchar](20) NULL,
	[TWCTaxAccountNumber] [nvarchar](20) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_OrganizationProfile] PRIMARY KEY CLUSTERED 
(
	[OrganizationProfileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UC_RegisteredName] UNIQUE NONCLUSTERED 
(
	[RegisteredName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationShippingCharges]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationShippingCharges](
	[OrganizationShippingChargeId] [tinyint] IDENTITY(1,1) NOT NULL,
	[DomesticOvernight] [decimal](18, 2) NOT NULL,
	[DomesticSecondDay] [decimal](18, 2) NOT NULL,
	[DomesticGround] [decimal](18, 2) NOT NULL,
	[InternationalPriority] [decimal](18, 2) NOT NULL,
	[InternationalEconomy] [decimal](18, 2) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrganizationShippingChargeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SmtpSettings]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SmtpSettings](
	[SmtpSettingId] [smallint] IDENTITY(1,1) NOT NULL,
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
/****** Object:  Table [dbo].[SubCustomerMainCustomer]    Script Date: 10-08-2024 15:35:40 ******/
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
/****** Object:  Table [dbo].[SuppierBankDetails]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SuppierBankDetails](
	[SupplierBankDetailsId] [int] IDENTITY(1,1) NOT NULL,
	[BankAddressId] [int] NULL,
	[RecipientAddressId] [int] NULL,
	[MessageToRecipient] [nvarchar](140) NULL,
	[SupplierId] [int] NOT NULL,
	[IsAddressInUs] [bit] NULL,
	[RecipientPhoneNumber] [varchar](20) NULL,
	[PaymentTermId] [tinyint] NULL,
	[MessageToRecipientBank] [nvarchar](75) NULL,
	[BeneficiaryName] [varchar](100) NULL,
	[BankName] [varchar](200) NULL,
	[AccountType] [varchar](50) NULL,
	[AccountNumber] [varchar](50) NULL,
	[BranchCode] [varchar](50) NULL,
	[IbanNumber] [int] NULL,
	[SwiftCode] [varchar](50) NULL,
	[RoutingNumber] [varchar](9) NULL,
	[SortCode] [varchar](6) NULL,
	[BsbNumber] [varchar](6) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_SuppierBankDetails] PRIMARY KEY CLUSTERED 
(
	[SupplierBankDetailsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupplierAccoutingSettings]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupplierAccoutingSettings](
	[SupplierAccountingSettingId] [int] IDENTITY(1,1) NOT NULL,
	[PaymentTermId] [tinyint] NOT NULL,
	[SupplierId] [int] NOT NULL,
	[InvoiceSubmissionMethod] [tinyint] NULL,
	[PoDeliveryMethodId] [tinyint] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
	[DeletedAt] [datetime] NULL,
	[IsActive] [bit] NULL,
	[PODeliveryMethodDetail] [varchar](200) NULL,
 CONSTRAINT [PK_SupplierAccoutingSettings] PRIMARY KEY CLUSTERED 
(
	[SupplierAccountingSettingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupplierPaymentSettings]    Script Date: 10-08-2024 15:35:40 ******/
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
ALTER TABLE [dbo].[ApiEvent] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ApiEventRequiredField] ADD  CONSTRAINT [DF__ApiEventR__Creat__114071C9]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ApiEventRequiredFieldsMapping] ADD  CONSTRAINT [DF__ApiEventR__Creat__12349602]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ApiParameterMapping] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[FunctionalityEvents] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[OrganizationHistory] ADD  DEFAULT (getdate()) FOR [ChangeAt]
GO
ALTER TABLE [dbo].[APIAuthentication]  WITH CHECK ADD  CONSTRAINT [FK_APIAuthentication_APIProviders] FOREIGN KEY([ProviderId])
REFERENCES [dbo].[APIProviders] ([ProviderId])
GO
ALTER TABLE [dbo].[APIAuthentication] CHECK CONSTRAINT [FK_APIAuthentication_APIProviders]
GO
ALTER TABLE [dbo].[ApiConfigurationEventParameterMap]  WITH CHECK ADD  CONSTRAINT [FK_ApiConfigurationEventParameterMap_ApiConfigurationEventParameterMap] FOREIGN KEY([ApiEventParametersId])
REFERENCES [dbo].[ApiConfigurationEventParameterMap] ([ApiEventParametersId])
GO
ALTER TABLE [dbo].[ApiConfigurationEventParameterMap] CHECK CONSTRAINT [FK_ApiConfigurationEventParameterMap_ApiConfigurationEventParameterMap]
GO
ALTER TABLE [dbo].[ApiConfigurationEventParameterMap]  WITH CHECK ADD  CONSTRAINT [FK_ApiConfigurationEventParameterMap_Parameters] FOREIGN KEY([ParameterId])
REFERENCES [dbo].[Parameters] ([ParameterId])
GO
ALTER TABLE [dbo].[ApiConfigurationEventParameterMap] CHECK CONSTRAINT [FK_ApiConfigurationEventParameterMap_Parameters]
GO
ALTER TABLE [dbo].[APIEndpoints]  WITH CHECK ADD  CONSTRAINT [FK_APIEndpoints_APIProviders] FOREIGN KEY([ProviderId])
REFERENCES [dbo].[APIProviders] ([ProviderId])
GO
ALTER TABLE [dbo].[APIEndpoints] CHECK CONSTRAINT [FK_APIEndpoints_APIProviders]
GO
ALTER TABLE [dbo].[ApiEventRequiredField]  WITH CHECK ADD  CONSTRAINT [FK_ApiEventRequiredField_ApiEvent] FOREIGN KEY([ApiEventId])
REFERENCES [dbo].[ApiEvent] ([ApiEventId])
GO
ALTER TABLE [dbo].[ApiEventRequiredField] CHECK CONSTRAINT [FK_ApiEventRequiredField_ApiEvent]
GO
ALTER TABLE [dbo].[ApiEventRequiredFieldsMapping]  WITH CHECK ADD  CONSTRAINT [FK_ApiEventRequiredFieldsMapping_ApiEvent] FOREIGN KEY([ApiEventId])
REFERENCES [dbo].[ApiEvent] ([ApiEventId])
GO
ALTER TABLE [dbo].[ApiEventRequiredFieldsMapping] CHECK CONSTRAINT [FK_ApiEventRequiredFieldsMapping_ApiEvent]
GO
ALTER TABLE [dbo].[ApiParameterMapping]  WITH CHECK ADD  CONSTRAINT [FK_ApiParameterMappings_APIEndpoints] FOREIGN KEY([ParameterId])
REFERENCES [dbo].[APIParameters] ([ParameterId])
GO
ALTER TABLE [dbo].[ApiParameterMapping] CHECK CONSTRAINT [FK_ApiParameterMappings_APIEndpoints]
GO
ALTER TABLE [dbo].[ApprovalRequests]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalRequests_Functionalities] FOREIGN KEY([FunctionalityEventId])
REFERENCES [dbo].[FunctionalityEvents] ([FunctionalityEventId])
GO
ALTER TABLE [dbo].[ApprovalRequests] CHECK CONSTRAINT [FK_ApprovalRequests_Functionalities]
GO
ALTER TABLE [dbo].[ApprovalRequests]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalRequests_FunctionalitiesFields] FOREIGN KEY([FunctionalitiesFieldId])
REFERENCES [dbo].[FunctionalitiesFields] ([FunctionalitiesFieldId])
GO
ALTER TABLE [dbo].[ApprovalRequests] CHECK CONSTRAINT [FK_ApprovalRequests_FunctionalitiesFields]
GO
ALTER TABLE [dbo].[ApprovalRequests]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalRequests_Modules] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Modules] ([ModuleId])
GO
ALTER TABLE [dbo].[ApprovalRequests] CHECK CONSTRAINT [FK_ApprovalRequests_Modules]
GO
ALTER TABLE [dbo].[ApprovalRequests]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalRequests_Users] FOREIGN KEY([RequestedByUserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[ApprovalRequests] CHECK CONSTRAINT [FK_ApprovalRequests_Users]
GO
ALTER TABLE [dbo].[ApprovalRequests]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalRequests_Users1] FOREIGN KEY([ApprovedByUserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[ApprovalRequests] CHECK CONSTRAINT [FK_ApprovalRequests_Users1]
GO
ALTER TABLE [dbo].[Functionalities]  WITH CHECK ADD  CONSTRAINT [FK_Functionalities_Modules] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Modules] ([ModuleId])
GO
ALTER TABLE [dbo].[Functionalities] CHECK CONSTRAINT [FK_Functionalities_Modules]
GO
ALTER TABLE [dbo].[FunctionalitiesFields]  WITH CHECK ADD  CONSTRAINT [FK_FunctionalitiesFields_FunctionalitiesTables] FOREIGN KEY([FunctionalitiesTableId])
REFERENCES [dbo].[FunctionalitiesTables] ([FunctionalitiesTableId])
GO
ALTER TABLE [dbo].[FunctionalitiesFields] CHECK CONSTRAINT [FK_FunctionalitiesFields_FunctionalitiesTables]
GO
ALTER TABLE [dbo].[FunctionalitiesResponsibles]  WITH CHECK ADD  CONSTRAINT [FK_ModuleResponsibles_Users] FOREIGN KEY([FunctionalityId])
REFERENCES [dbo].[Functionalities] ([FunctionalityId])
GO
ALTER TABLE [dbo].[FunctionalitiesResponsibles] CHECK CONSTRAINT [FK_ModuleResponsibles_Users]
GO
ALTER TABLE [dbo].[FunctionalityEvents]  WITH CHECK ADD  CONSTRAINT [FK_Functionality] FOREIGN KEY([FunctionalityId])
REFERENCES [dbo].[Functionalities] ([FunctionalityId])
GO
ALTER TABLE [dbo].[FunctionalityEvents] CHECK CONSTRAINT [FK_Functionality]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Contacts] FOREIGN KEY([EndUserContactId])
REFERENCES [dbo].[Contacts] ([ContactId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Contacts]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Contacts1] FOREIGN KEY([PurchasingContactId])
REFERENCES [dbo].[Contacts] ([ContactId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Contacts1]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Contacts2] FOREIGN KEY([InvoiceSubmissionContactId])
REFERENCES [dbo].[Contacts] ([ContactId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Contacts2]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Customers]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderMethod] FOREIGN KEY([OrderMethodId])
REFERENCES [dbo].[OrderMethod] ([OrderMethodId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_OrderMethod]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Orders] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([OrderId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Orders]
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses]  WITH CHECK ADD  CONSTRAINT [FK__Organizat__BillT__6809520C] FOREIGN KEY([BillToAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] CHECK CONSTRAINT [FK__Organizat__BillT__6809520C]
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses]  WITH CHECK ADD  CONSTRAINT [FK__Organizat__LabAd__68FD7645] FOREIGN KEY([LabAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] CHECK CONSTRAINT [FK__Organizat__LabAd__68FD7645]
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses]  WITH CHECK ADD  CONSTRAINT [FK__Organizat__Physi__6621099A] FOREIGN KEY([PhysicalAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] CHECK CONSTRAINT [FK__Organizat__Physi__6621099A]
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses]  WITH CHECK ADD  CONSTRAINT [FK__Organizat__Regis__652CE561] FOREIGN KEY([RegisteredAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] CHECK CONSTRAINT [FK__Organizat__Regis__652CE561]
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses]  WITH CHECK ADD  CONSTRAINT [FK__Organizat__Remit__67152DD3] FOREIGN KEY([RemitToAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] CHECK CONSTRAINT [FK__Organizat__Remit__67152DD3]
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses]  WITH CHECK ADD  CONSTRAINT [FK__Organizat__Wareh__69F19A7E] FOREIGN KEY([WarehouseAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] CHECK CONSTRAINT [FK__Organizat__Wareh__69F19A7E]
GO
ALTER TABLE [dbo].[OrganizationOtherCharges]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationOtherCharges_PaymentTerms] FOREIGN KEY([DefaultPaymentTerms])
REFERENCES [dbo].[PaymentTerms] ([PaymentTermId])
GO
ALTER TABLE [dbo].[OrganizationOtherCharges] CHECK CONSTRAINT [FK_OrganizationOtherCharges_PaymentTerms]
GO
ALTER TABLE [dbo].[OrganizationOtherSettings]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationOtherSettings_PaymentTerms] FOREIGN KEY([DefaultPaymentTerms])
REFERENCES [dbo].[PaymentTerms] ([PaymentTermId])
GO
ALTER TABLE [dbo].[OrganizationOtherSettings] CHECK CONSTRAINT [FK_OrganizationOtherSettings_PaymentTerms]
GO
ALTER TABLE [dbo].[SubCustomerMainCustomer]  WITH CHECK ADD  CONSTRAINT [FK_SubCustomerId_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[SubCustomerMainCustomer] CHECK CONSTRAINT [FK_SubCustomerId_Customers]
GO
ALTER TABLE [dbo].[SuppierBankDetails]  WITH CHECK ADD  CONSTRAINT [FK_SuppierBankDetails_Addresses] FOREIGN KEY([RecipientAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[SuppierBankDetails] CHECK CONSTRAINT [FK_SuppierBankDetails_Addresses]
GO
ALTER TABLE [dbo].[SuppierBankDetails]  WITH CHECK ADD  CONSTRAINT [FK_SuppierBankDetails_Addresses_AddressId] FOREIGN KEY([BankAddressId])
REFERENCES [dbo].[Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[SuppierBankDetails] CHECK CONSTRAINT [FK_SuppierBankDetails_Addresses_AddressId]
GO
ALTER TABLE [dbo].[SuppierBankDetails]  WITH CHECK ADD  CONSTRAINT [FK_SuppierBankDetails_Suppliers_SupplierId] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Suppliers] ([SupplierId])
GO
ALTER TABLE [dbo].[SuppierBankDetails] CHECK CONSTRAINT [FK_SuppierBankDetails_Suppliers_SupplierId]
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings]  WITH CHECK ADD  CONSTRAINT [FK_SupplierAccoutingSettings_PaymentMethods_PaymentMethodId] FOREIGN KEY([InvoiceSubmissionMethod])
REFERENCES [dbo].[PaymentMethods] ([PaymentMethodId])
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] CHECK CONSTRAINT [FK_SupplierAccoutingSettings_PaymentMethods_PaymentMethodId]
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings]  WITH CHECK ADD  CONSTRAINT [FK_SupplierAccoutingSettings_Suppliers] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Suppliers] ([SupplierId])
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] CHECK CONSTRAINT [FK_SupplierAccoutingSettings_Suppliers]
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings]  WITH CHECK ADD  CONSTRAINT [FK_SupplierAccoutingSettings_Suppliers_SupplierId] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Suppliers] ([SupplierId])
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] CHECK CONSTRAINT [FK_SupplierAccoutingSettings_Suppliers_SupplierId]
GO
ALTER TABLE [dbo].[SupplierPaymentSettings]  WITH CHECK ADD  CONSTRAINT [FK_SupplierPaymentSettings_Suppliers] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Suppliers] ([SupplierId])
GO
ALTER TABLE [dbo].[SupplierPaymentSettings] CHECK CONSTRAINT [FK_SupplierPaymentSettings_Suppliers]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationAccountingDetails]    Script Date: 10-08-2024 15:35:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationAccountingDetails]
ON [dbo].[OrganizationAccountingDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Account Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Organization account Details added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationAccountingDetails] ENABLE TRIGGER [trg_AfterInsert_OrganizationAccountingDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationAccountingDetails]    Script Date: 10-08-2024 15:35:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationAccountingDetails]
ON [dbo].[OrganizationAccountingDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Accounting Details Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationAccountingDetailId = d.OrganizationAccountingDetailId WHERE i.CreditLimit <> d.CreditLimit)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Credit Limit changed from ', COALESCE(CAST(d.CreditLimit AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.CreditLimit AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationAccountingDetailId = d.OrganizationAccountingDetailId
        WHERE i.CreditLimit <> d.CreditLimit;
    END;
END;

GO
ALTER TABLE [dbo].[OrganizationAccountingDetails] ENABLE TRIGGER [trg_AfterUpdate_OrganizationAccountingDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationBankDetails]    Script Date: 10-08-2024 15:35:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationBankDetails]
ON [dbo].[OrganizationBankDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Bank Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'organization Bank Details added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationBankDetails] ENABLE TRIGGER [trg_AfterInsert_OrganizationBankDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationBankDetails]    Script Date: 10-08-2024 15:35:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationBankDetails]
ON [dbo].[OrganizationBankDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Organization Bank Details Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId WHERE i.BeneficiaryName <> d.BeneficiaryName)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Beneficiary Name changed from ', COALESCE(d.BeneficiaryName, 'NULL'), '  to  ', COALESCE(i.BeneficiaryName, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId
        WHERE i.BeneficiaryName <> d.BeneficiaryName;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId WHERE i.CheckingAccountNumber <> d.CheckingAccountNumber)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Checking Account Number changed from ', COALESCE(d.CheckingAccountNumber, 'NULL'), '  to  ', COALESCE(i.CheckingAccountNumber, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId
        WHERE i.CheckingAccountNumber <> d.CheckingAccountNumber;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId WHERE i.RoutingAccountNumber <> d.RoutingAccountNumber)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Routing Account Number changed from ', COALESCE(d.RoutingAccountNumber, 'NULL'), '  to  ', COALESCE(i.RoutingAccountNumber, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId
        WHERE i.RoutingAccountNumber <> d.RoutingAccountNumber;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId WHERE i.SwiftCode <> d.SwiftCode)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Swift Code changed from ', COALESCE(d.SwiftCode, 'NULL'), '  to  ', COALESCE(i.SwiftCode, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId
        WHERE i.SwiftCode <> d.SwiftCode;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId WHERE i.BankAddress <> d.BankAddress)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Bank Address changed from ', COALESCE(d.BankAddress, 'NULL'), '  to  ', COALESCE(i.BankAddress, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId
        WHERE i.BankAddress <> d.BankAddress;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId WHERE i.BankBranch <> d.BankBranch)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Bank Branch changed from ', COALESCE(d.BankBranch, 'NULL'), '  to  ', COALESCE(i.BankBranch, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationBankDetailId = d.OrganizationBankDetailId
        WHERE i.BankBranch <> d.BankBranch;
    END;

    -- Log deletion events if applicable
    IF EXISTS (SELECT * FROM deleted WHERE DeletedAt IS NOT NULL)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            'Bank Details Deleted' AS EventName,
            d.DeletedBy AS ChangeBy,
            d.DeletedAt AS ChangeAt,
            CONCAT(
                'Bank Details with ID ', d.OrganizationBankDetailId, ' was deleted.'
            ) AS Description,
            'Delete' AS EventStatus
        FROM deleted d
        WHERE d.DeletedAt IS NOT NULL;
    END;
END;
GO
ALTER TABLE [dbo].[OrganizationBankDetails] ENABLE TRIGGER [trg_AfterUpdate_OrganizationBankDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationBusinessAddresses]    Script Date: 10-08-2024 15:35:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationBusinessAddresses]
ON [dbo].[OrganizationBusinessAddresses]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Organization Business Address Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Organization Business Address Added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationBusinessAddresses] ENABLE TRIGGER [trg_AfterInsert_OrganizationBusinessAddresses]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationContactDetails]    Script Date: 10-08-2024 15:35:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationContactDetails]
ON [dbo].[OrganizationContactDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Contact Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Contact Details Added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationContactDetails] ENABLE TRIGGER [trg_AfterInsert_OrganizationContactDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationContactDetails]    Script Date: 10-08-2024 15:35:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationContactDetails]
ON [dbo].[OrganizationContactDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Contact Details Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.CompanyWebsite <> d.CompanyWebsite)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Company Website changed from ', COALESCE(d.CompanyWebsite, 'NULL'), ' to ', COALESCE(i.CompanyWebsite, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.CompanyWebsite <> d.CompanyWebsite;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.SalesEmail <> d.SalesEmail)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Sales Email changed from ', COALESCE(d.SalesEmail, 'NULL'), ' to ', COALESCE(i.SalesEmail, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.SalesEmail <> d.SalesEmail;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.AccountsEmail <> d.AccountsEmail)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Accounts Email changed from ', COALESCE(d.AccountsEmail, 'NULL'), ' to ', COALESCE(i.AccountsEmail, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.AccountsEmail <> d.AccountsEmail;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.PurchaseEmail <> d.PurchaseEmail)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Purchase Email changed from ', COALESCE(d.PurchaseEmail, 'NULL'), ' to ', COALESCE(i.PurchaseEmail, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.PurchaseEmail <> d.PurchaseEmail;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.CustomerServiceEmail <> d.CustomerServiceEmail)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Customer Service Email changed from ', COALESCE(d.CustomerServiceEmail, 'NULL'), ' to ', COALESCE(i.CustomerServiceEmail, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.CustomerServiceEmail <> d.CustomerServiceEmail;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.SalesPhone <> d.SalesPhone)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Sales Phone changed from ', COALESCE(d.SalesPhone, 'NULL'), ' to ', COALESCE(i.SalesPhone, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.SalesPhone <> d.SalesPhone;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.AccountsPhone <> d.AccountsPhone)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Accounts Phone changed from ', COALESCE(d.AccountsPhone, 'NULL'), ' to ', COALESCE(i.AccountsPhone, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.AccountsPhone <> d.AccountsPhone;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId WHERE i.TollFreePhone <> d.TollFreePhone)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Toll-Free Phone changed from ', COALESCE(d.TollFreePhone, 'NULL'), ' to ', COALESCE(i.TollFreePhone, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationContactDetailId = d.OrganizationContactDetailId
        WHERE i.TollFreePhone <> d.TollFreePhone;
    END;
END;
GO
ALTER TABLE [dbo].[OrganizationContactDetails] ENABLE TRIGGER [trg_AfterUpdate_OrganizationContactDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationLogisticDetails]    Script Date: 10-08-2024 15:35:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationLogisticDetails]
ON [dbo].[OrganizationLogisticDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Organization Logistic Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Organization Logistic Details Added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationLogisticDetails] ENABLE TRIGGER [trg_AfterInsert_OrganizationLogisticDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationLogisticDetails]    Script Date: 10-08-2024 15:35:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationLogisticDetails]
ON [dbo].[OrganizationLogisticDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Logistic Details Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId WHERE i.FedExAccount <> d.FedExAccount)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'FedEx Account number changed from ', COALESCE(d.FedExAccount, 'NULL'), ' to ', COALESCE(i.FedExAccount, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId
        WHERE i.FedExAccount <> d.FedExAccount;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId WHERE i.DHLAccount <> d.DHLAccount)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'DHL Account number changed from ', COALESCE(d.DHLAccount, 'NULL'), ' to ', COALESCE(i.DHLAccount, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId
        WHERE i.DHLAccount <> d.DHLAccount;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId WHERE i.UPSAccount <> d.UPSAccount)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'UPS Account number changed from ', COALESCE(d.UPSAccount, 'NULL'), ' to ', COALESCE(i.UPSAccount, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId
        WHERE i.UPSAccount <> d.UPSAccount;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId WHERE i.USPSAccount <> d.USPSAccount)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'USPS Account  number changed from ', COALESCE(d.USPSAccount, 'NULL'), ' to ', COALESCE(i.USPSAccount, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationLogisticDetailId = d.OrganizationLogisticDetailId
        WHERE i.USPSAccount <> d.USPSAccount;
    END;

END;
GO
ALTER TABLE [dbo].[OrganizationLogisticDetails] ENABLE TRIGGER [trg_AfterUpdate_OrganizationLogisticDetails]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationOtherCharges]    Script Date: 10-08-2024 15:35:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationOtherCharges]
ON [dbo].[OrganizationOtherCharges]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Other Charges Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Other charges details added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationOtherCharges] ENABLE TRIGGER [trg_AfterInsert_OrganizationOtherCharges]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationOtherCharges]    Script Date: 10-08-2024 15:35:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationOtherCharges]
ON [dbo].[OrganizationOtherCharges]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Organization Other Charges Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId WHERE i.HandlingFees <> d.HandlingFees)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Handling Fees changed from ', COALESCE(CAST(d.HandlingFees AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.HandlingFees AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId
        WHERE i.HandlingFees <> d.HandlingFees;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId WHERE i.BankWireFees <> d.BankWireFees)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Bank Wire Fees changed from ', COALESCE(CAST(d.BankWireFees AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.BankWireFees AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId
        WHERE i.BankWireFees <> d.BankWireFees;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId WHERE i.CreditCardServiceFees <> d.CreditCardServiceFees)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Credit Card Service Fees changed from ', COALESCE(CAST(d.CreditCardServiceFees AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.CreditCardServiceFees AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId
        WHERE i.CreditCardServiceFees <> d.CreditCardServiceFees;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId WHERE i.ColdBoxFees <> d.ColdBoxFees)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Cold Box Fees changed from ', COALESCE(CAST(d.ColdBoxFees AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.ColdBoxFees AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId
        WHERE i.ColdBoxFees <> d.ColdBoxFees;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId WHERE i.ITNFees <> d.ITNFees)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'ITN Fees changed from ', COALESCE(CAST(d.ITNFees AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.ITNFees AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationOtherChargeId = d.OrganizationOtherChargeId
        WHERE i.ITNFees <> d.ITNFees;
    END;
END;
GO
ALTER TABLE [dbo].[OrganizationOtherCharges] ENABLE TRIGGER [trg_AfterUpdate_OrganizationOtherCharges]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationProfile]    Script Date: 10-08-2024 15:35:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationProfile]
ON [dbo].[OrganizationProfile]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Organization Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Created new organization profile' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationProfile] ENABLE TRIGGER [trg_AfterInsert_OrganizationProfile]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationProfile]    Script Date: 10-08-2024 15:35:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationProfile]
ON [dbo].[OrganizationProfile]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Organization Profile Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.RegisteredName <> d.RegisteredName)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Registered Name changed from ', COALESCE(d.RegisteredName, 'NULL'), '  to  ', COALESCE(i.RegisteredName, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.RegisteredName <> d.RegisteredName;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.DBAName <> d.DBAName)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'DBA Name changed from ', COALESCE(d.DBAName, 'NULL'), '  to  ', COALESCE(i.DBAName, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.DBAName <> d.DBAName;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.DateIncorporated <> d.DateIncorporated)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Date Incorporated changed from ', COALESCE(CONVERT(NVARCHAR, d.DateIncorporated, 120), 'NULL'), '  to  ', COALESCE(CONVERT(NVARCHAR, i.DateIncorporated, 120), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.DateIncorporated <> d.DateIncorporated;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.NAICSCode <> d.NAICSCode)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'NAICS Code changed from ', COALESCE(d.NAICSCode, 'NULL'), '  to  ', COALESCE(i.NAICSCode, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.NAICSCode <> d.NAICSCode;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.EIN <> d.EIN)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'EIN changed from ', COALESCE(d.EIN, 'NULL'), '  to  ', COALESCE(i.EIN, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.EIN <> d.EIN;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.TXTaxpayerNumber <> d.TXTaxpayerNumber)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'TX Taxpayer Number changed from ', COALESCE(d.TXTaxpayerNumber, 'NULL'), '  to  ', COALESCE(i.TXTaxpayerNumber, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.TXTaxpayerNumber <> d.TXTaxpayerNumber;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.SOSFileNumber <> d.SOSFileNumber)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'SOS File Number changed from ', COALESCE(d.SOSFileNumber, 'NULL'), '  to  ', COALESCE(i.SOSFileNumber, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.SOSFileNumber <> d.SOSFileNumber;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.WebFileNumber <> d.WebFileNumber)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Web File Number changed from ', COALESCE(d.WebFileNumber, 'NULL'), '  to  ', COALESCE(i.WebFileNumber, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.WebFileNumber <> d.WebFileNumber;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId WHERE i.TWCTaxAccountNumber <> d.TWCTaxAccountNumber)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'TWC Tax Account Number changed from ', COALESCE(d.TWCTaxAccountNumber, 'NULL'), '  to  ', COALESCE(i.TWCTaxAccountNumber, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationProfileId = d.OrganizationProfileId
        WHERE i.TWCTaxAccountNumber <> d.TWCTaxAccountNumber;
    END;
END;
GO
ALTER TABLE [dbo].[OrganizationProfile] ENABLE TRIGGER [trg_AfterUpdate_OrganizationProfile]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_OrganizationShippingCharges]    Script Date: 10-08-2024 15:35:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_OrganizationShippingCharges]
ON [dbo].[OrganizationShippingCharges]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Shipping Charges Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Shipping Charges Details added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[OrganizationShippingCharges] ENABLE TRIGGER [trg_AfterInsert_OrganizationShippingCharges]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_OrganizationShippingCharges]    Script Date: 10-08-2024 15:35:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_OrganizationShippingCharges]
ON [dbo].[OrganizationShippingCharges]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Shipping Charges Details Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId WHERE i.DomesticOvernight <> d.DomesticOvernight)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Domestic Overnight Shipping Charge changed from ', COALESCE(CAST(d.DomesticOvernight AS NVARCHAR), 'NULL'), '  to  ', COALESCE(CAST(i.DomesticOvernight AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId
        WHERE i.DomesticOvernight <> d.DomesticOvernight;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId WHERE i.DomesticSecondDay <> d.DomesticSecondDay)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Domestic Second Day Shipping Charge changed from ', COALESCE(CAST(d.DomesticSecondDay AS NVARCHAR), 'NULL'), '  to  ', COALESCE(CAST(i.DomesticSecondDay AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId
        WHERE i.DomesticSecondDay <> d.DomesticSecondDay;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId WHERE i.DomesticGround <> d.DomesticGround)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Domestic Ground Shipping Charge changed from ', COALESCE(CAST(d.DomesticGround AS NVARCHAR), 'NULL'), '  to  ', COALESCE(CAST(i.DomesticGround AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId
        WHERE i.DomesticGround <> d.DomesticGround;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId WHERE i.InternationalPriority <> d.InternationalPriority)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'International Priority Shipping Charge changed from ', COALESCE(CAST(d.InternationalPriority AS NVARCHAR), 'NULL'), '  to  ', COALESCE(CAST(i.InternationalPriority AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId
        WHERE i.InternationalPriority <> d.InternationalPriority;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId WHERE i.InternationalEconomy <> d.InternationalEconomy)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'International Economy Shipping Charge changed from ', COALESCE(CAST(d.InternationalEconomy AS NVARCHAR), 'NULL'), '  to  ', COALESCE(CAST(i.InternationalEconomy AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.OrganizationShippingChargeId = d.OrganizationShippingChargeId
        WHERE i.InternationalEconomy <> d.InternationalEconomy;
    END;
END;
GO
ALTER TABLE [dbo].[OrganizationShippingCharges] ENABLE TRIGGER [trg_AfterUpdate_OrganizationShippingCharges]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_SmtpSettings]    Script Date: 10-08-2024 15:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_AfterInsert_SmtpSettings]
ON [dbo].[SmtpSettings]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Smtp Settings Details Added';
    DECLARE @ChangeAt DATETIME = GETDATE();

    INSERT INTO OrganizationHistory (
        EventName,
        ChangeBy,
        ChangeAt,
        Description,
        EventStatus
    )
    SELECT
        @EventName AS EventName,
        i.CreatedBy AS ChangeBy,
        @ChangeAt AS ChangeAt,
        'Smtp settings details added' AS Description,
        'Insert' AS EventStatus
    FROM inserted i;
END;
GO
ALTER TABLE [dbo].[SmtpSettings] ENABLE TRIGGER [trg_AfterInsert_SmtpSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_SmtpSettings]    Script Date: 10-08-2024 15:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_SmtpSettings]
ON [dbo].[SmtpSettings]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(255) = 'Smtp Settings Updated';
    DECLARE @ChangeAt DATETIME = GETDATE();

    -- Check and insert history entries for each column change
    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId WHERE i.EmailProvider <> d.EmailProvider)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Email Provider changed from ', COALESCE(d.EmailProvider, 'NULL'), ' to ', COALESCE(i.EmailProvider, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId
        WHERE i.EmailProvider <> d.EmailProvider;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId WHERE i.SmtpServer <> d.SmtpServer)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Smtp Server changed from ', COALESCE(d.SmtpServer, 'NULL'), ' to ', COALESCE(i.SmtpServer, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId
        WHERE i.SmtpServer <> d.SmtpServer;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId WHERE i.SmtpPort <> d.SmtpPort)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Smtp Port changed from ', COALESCE(CAST(d.SmtpPort AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.SmtpPort AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId
        WHERE i.SmtpPort <> d.SmtpPort;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId WHERE i.SmtpUserName <> d.SmtpUserName)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Smtp UserName changed from ', COALESCE(d.SmtpUserName, 'NULL'), ' to ', COALESCE(i.SmtpUserName, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId
        WHERE i.SmtpUserName <> d.SmtpUserName;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId WHERE i.SmtpPassword <> d.SmtpPassword)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Smtp Password changed from ', COALESCE(d.SmtpPassword, 'NULL'), ' to ', COALESCE(i.SmtpPassword, 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId
        WHERE i.SmtpPassword <> d.SmtpPassword;
    END;

    IF EXISTS (SELECT * FROM inserted i JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId WHERE i.UseSsl <> d.UseSsl)
    BEGIN
        INSERT INTO OrganizationHistory (
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        )
        SELECT
            @EventName AS EventName,
            i.UpdatedBy AS ChangeBy,
            @ChangeAt AS ChangeAt,
            CONCAT(
                'Use Ssl changed from ', COALESCE(CAST(d.UseSsl AS NVARCHAR), 'NULL'), ' to ', COALESCE(CAST(i.UseSsl AS NVARCHAR), 'NULL')
            )+'.' AS Description,
            'Update' AS EventStatus
        FROM inserted i
        JOIN deleted d ON i.SmtpSettingId = d.SmtpSettingId
        WHERE i.UseSsl <> d.UseSsl;
    END;
END;
GO
ALTER TABLE [dbo].[SmtpSettings] ENABLE TRIGGER [trg_AfterUpdate_SmtpSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterInsert_SupplierAccoutingSettings]    Script Date: 10-08-2024 15:35:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterInsert_SupplierAccoutingSettings]
ON [dbo].[SupplierAccoutingSettings]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Financial Settings Added';
    DECLARE @ChangedAt DATETIME = GETDATE();

    INSERT INTO [dbo].[SupplierAuditHistory](
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.CreatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        'Financial Settings Added 'AS Description,
        --CONCAT('Financial Settings Added by ', u.FirstName, ' ', u.LastName, ' at ', FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.') AS Description,
        'Insert'
    FROM inserted i
    LEFT JOIN Users u ON i.CreatedBy = u.UserId;
END;
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] ENABLE TRIGGER [trg_AfterInsert_SupplierAccoutingSettings]
GO
/****** Object:  Trigger [dbo].[trg_AfterUpdate_SupplierAccoutingSettings]    Script Date: 10-08-2024 15:35:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_AfterUpdate_SupplierAccoutingSettings]
ON [dbo].[SupplierAccoutingSettings]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventName NVARCHAR(100) = 'Financial Settings Updated';
    DECLARE @ChangedAt DATETIME = GETDATE();

    -- Main audit history insertion
    INSERT INTO [dbo].[SupplierAuditHistory] (
        SupplierId,
        EventName,
        ChangedBy,
        ChangedAt,
        Description,
        EventStatus
    )
    SELECT
        i.SupplierId,
        @EventName AS EventName,
        i.UpdatedBy AS ChangedBy,
        @ChangedAt AS ChangedAt,
        CONCAT(
            'Updated financial settings chnage ',
            --ISNULL(u.FirstName + ' ' + u.LastName, 'Unknown') + ' at ' + FORMAT(@ChangedAt, 'h:mm tt') + ' on ' + FORMAT(@ChangedAt, 'MM/dd/yyyy') + '.',
            STUFF((
                SELECT 
                    CASE WHEN i.PaymentTermId <> d.PaymentTermId THEN ', Payment Term' ELSE '' END +
                    CASE WHEN i.InvoiceSubmissionMethod <> d.InvoiceSubmissionMethod THEN ', Invoice Submission Method' ELSE '' END +
                    CASE WHEN i.PoDeliveryMethodId <> d.PoDeliveryMethodId THEN ', Payment Method' ELSE '' END 
                FROM inserted i
                JOIN deleted d ON i.SupplierAccountingSettingId = d.SupplierAccountingSettingId
                FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')
                , 1, 2, '')
            ) AS Description,
        'Update'
    FROM inserted i
    JOIN deleted d ON i.SupplierAccountingSettingId= d.SupplierAccountingSettingId
    LEFT JOIN Users u ON i.UpdatedBy = u.UserId;

END;
GO
ALTER TABLE [dbo].[SupplierAccoutingSettings] ENABLE TRIGGER [trg_AfterUpdate_SupplierAccoutingSettings]
GO
