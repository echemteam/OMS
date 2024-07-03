USE [OmsLite]
GO
/****** Object:  Table [dbo].[ContactTypes]    Script Date: 03-07-2024 17:31:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContactTypes](
	[ContactTypeId] [smallint] NOT NULL,
	[Type] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[IsForCustomers] [bit] NOT NULL,
	[IsForSuppliers] [bit] NOT NULL,
 CONSTRAINT [PK_ContactTypes] PRIMARY KEY CLUSTERED 
(
	[ContactTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentTypes]    Script Date: 03-07-2024 17:31:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentTypes](
	[DocumentTypeId] [tinyint] NOT NULL,
	[Type] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[IsForSuppliers] [bit] NOT NULL,
	[IsForCustomers] [bit] NOT NULL,
 CONSTRAINT [documenttypes_documenttypeid_primary] PRIMARY KEY CLUSTERED 
(
	[DocumentTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupplierTypes]    Script Date: 03-07-2024 17:31:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupplierTypes](
	[SupplierTypeId] [smallint] NOT NULL,
	[Type] [varchar](20) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_SupplierTypes] PRIMARY KEY CLUSTERED 
(
	[SupplierTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ContactTypes] ADD  CONSTRAINT [DF_ContactTypes_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ContactTypes] ADD  CONSTRAINT [DF_ContactTypes_IsForCustomers]  DEFAULT ((0)) FOR [IsForCustomers]
GO
ALTER TABLE [dbo].[ContactTypes] ADD  CONSTRAINT [DF_ContactTypes_IsForSuppliers]  DEFAULT ((0)) FOR [IsForSuppliers]
GO
ALTER TABLE [dbo].[DocumentTypes] ADD  CONSTRAINT [DF_DocumentTypes_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[DocumentTypes] ADD  CONSTRAINT [DF_DocumentTypes_IsForSuppliers]  DEFAULT ((0)) FOR [IsForSuppliers]
GO
ALTER TABLE [dbo].[DocumentTypes] ADD  CONSTRAINT [DF_DocumentTypes_IsForCustomers]  DEFAULT ((0)) FOR [IsForCustomers]
GO
