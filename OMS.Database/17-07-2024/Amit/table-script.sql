
/****** Object:  Table [dbo].[APIAuthentication]    Script Date: 17-07-2024 17:50:37 ******/
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
 CONSTRAINT [PK_APIAuthentication] PRIMARY KEY CLUSTERED 
(
	[AuthId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[APIEndpoints]    Script Date: 17-07-2024 17:50:38 ******/
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
/****** Object:  Table [dbo].[APIParameters]    Script Date: 17-07-2024 17:50:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APIParameters](
	[ParameterId] [int] IDENTITY(1,1) NOT NULL,
	[EndpointId] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[DataType] [nvarchar](50) NULL,
	[DefaultValue] [nvarchar](255) NULL,
	[IsRequired] [bit] NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_APIParameters] PRIMARY KEY CLUSTERED 
(
	[ParameterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[APIProviders]    Script Date: 17-07-2024 17:50:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APIProviders](
	[ProviderId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[BaseURL] [nvarchar](255) NULL,
	[AuthenticationType] [nvarchar](50) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[CreatedBy] [smallint] NULL,
	[UpdatedBy] [smallint] NULL,
	[DeletedBy] [smallint] NULL,
 CONSTRAINT [PK_APIProviders] PRIMARY KEY CLUSTERED 
(
	[ProviderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApprovalConfiguration]    Script Date: 17-07-2024 17:50:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApprovalConfiguration](
	[ApprovalConfigurationId] [int] IDENTITY(1,1) NOT NULL,
	[RuleName] [varchar](100) NULL,
	[ModuleId] [int] NULL,
	[FunctionalityId] [int] NULL,
	[FunctionalitiesFieldId] [int] NULL,
	[ApproverRoleId] [tinyint] NULL,
	[ApprovalAction] [nvarchar](100) NULL,
 CONSTRAINT [PK_ApprovalConfiguration] PRIMARY KEY CLUSTERED 
(
	[ApprovalConfigurationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApprovalRequests]    Script Date: 17-07-2024 17:50:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApprovalRequests](
	[ApprovalRequestId] [int] IDENTITY(1,1) NOT NULL,
	[ModuleId] [int] NULL,
	[FunctionalityId] [int] NULL,
	[TableId] [int] NULL,
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
ALTER TABLE [dbo].[APIAuthentication]  WITH CHECK ADD  CONSTRAINT [FK_APIAuthentication_APIProviders] FOREIGN KEY([ProviderId])
REFERENCES [dbo].[APIProviders] ([ProviderId])
GO
ALTER TABLE [dbo].[APIAuthentication] CHECK CONSTRAINT [FK_APIAuthentication_APIProviders]
GO
ALTER TABLE [dbo].[APIEndpoints]  WITH CHECK ADD  CONSTRAINT [FK_APIEndpoints_APIProviders] FOREIGN KEY([ProviderId])
REFERENCES [dbo].[APIProviders] ([ProviderId])
GO
ALTER TABLE [dbo].[APIEndpoints] CHECK CONSTRAINT [FK_APIEndpoints_APIProviders]
GO
ALTER TABLE [dbo].[APIParameters]  WITH CHECK ADD  CONSTRAINT [FK_APIParameters_APIEndpoints] FOREIGN KEY([EndpointId])
REFERENCES [dbo].[APIEndpoints] ([EndpointId])
GO
ALTER TABLE [dbo].[APIParameters] CHECK CONSTRAINT [FK_APIParameters_APIEndpoints]
GO
ALTER TABLE [dbo].[ApprovalConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalConfiguration_ApprovalConfiguration] FOREIGN KEY([ApproverRoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[ApprovalConfiguration] CHECK CONSTRAINT [FK_ApprovalConfiguration_ApprovalConfiguration]
GO
ALTER TABLE [dbo].[ApprovalConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalConfiguration_Functionalities] FOREIGN KEY([FunctionalityId])
REFERENCES [dbo].[Functionalities] ([FunctionalityId])
GO
ALTER TABLE [dbo].[ApprovalConfiguration] CHECK CONSTRAINT [FK_ApprovalConfiguration_Functionalities]
GO
ALTER TABLE [dbo].[ApprovalConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalConfiguration_FunctionalitiesFields] FOREIGN KEY([FunctionalitiesFieldId])
REFERENCES [dbo].[FunctionalitiesFields] ([FunctionalitiesFieldId])
GO
ALTER TABLE [dbo].[ApprovalConfiguration] CHECK CONSTRAINT [FK_ApprovalConfiguration_FunctionalitiesFields]
GO
ALTER TABLE [dbo].[ApprovalConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalConfiguration_Modules] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Modules] ([ModuleId])
GO
ALTER TABLE [dbo].[ApprovalConfiguration] CHECK CONSTRAINT [FK_ApprovalConfiguration_Modules]
GO
ALTER TABLE [dbo].[ApprovalRequests]  WITH CHECK ADD  CONSTRAINT [FK_ApprovalRequests_Functionalities] FOREIGN KEY([FunctionalityId])
REFERENCES [dbo].[Functionalities] ([FunctionalityId])
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
