
ALTER TABLE [dbo].[FunctionalitiesTables] DROP CONSTRAINT [FK_FunctionalitiesTables_Functionalities]
GO
ALTER TABLE [dbo].[FunctionalitiesFields] DROP CONSTRAINT [FK_FunctionalitiesFields_FunctionalitiesTables]
GO
ALTER TABLE [dbo].[Functionalities] DROP CONSTRAINT [FK_Functionalities_Modules]
GO
/****** Object:  Table [dbo].[Modules]    Script Date: 18-07-2024 17:36:46 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Modules]') AND type in (N'U'))
DROP TABLE [dbo].[Modules]
GO
/****** Object:  Table [dbo].[FunctionalitiesTables]    Script Date: 18-07-2024 17:36:46 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[FunctionalitiesTables]') AND type in (N'U'))
DROP TABLE [dbo].[FunctionalitiesTables]
GO
/****** Object:  Table [dbo].[FunctionalitiesFields]    Script Date: 18-07-2024 17:36:46 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[FunctionalitiesFields]') AND type in (N'U'))
DROP TABLE [dbo].[FunctionalitiesFields]
GO
/****** Object:  Table [dbo].[Functionalities]    Script Date: 18-07-2024 17:36:46 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Functionalities]') AND type in (N'U'))
DROP TABLE [dbo].[Functionalities]
GO
/****** Object:  Table [dbo].[Functionalities]    Script Date: 18-07-2024 17:36:46 ******/
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
/****** Object:  Table [dbo].[FunctionalitiesFields]    Script Date: 18-07-2024 17:36:47 ******/
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
/****** Object:  Table [dbo].[FunctionalitiesTables]    Script Date: 18-07-2024 17:36:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FunctionalitiesTables](
	[FunctionalitiesTableId] [int] IDENTITY(1,1) NOT NULL,
	[FunctionalityId] [int] NULL,
	[TableName] [nvarchar](100) NULL,
 CONSTRAINT [PK_FunctionalitiesTables] PRIMARY KEY CLUSTERED 
(
	[FunctionalitiesTableId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modules]    Script Date: 18-07-2024 17:36:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modules](
	[ModuleId] [int] IDENTITY(1,1) NOT NULL,
	[ModuleName] [nvarchar](100) NULL,
 CONSTRAINT [PK_Modules] PRIMARY KEY CLUSTERED 
(
	[ModuleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Functionalities] ON 
GO
INSERT [dbo].[Functionalities] ([FunctionalityId], [ModuleId], [Name]) VALUES (1, 1, N'Update Customer')
GO
INSERT [dbo].[Functionalities] ([FunctionalityId], [ModuleId], [Name]) VALUES (2, 2, N'Update Supplier')
GO
SET IDENTITY_INSERT [dbo].[Functionalities] OFF
GO
SET IDENTITY_INSERT [dbo].[FunctionalitiesFields] ON 
GO
INSERT [dbo].[FunctionalitiesFields] ([FunctionalitiesFieldId], [FieldName], [FunctionalitiesTableId], [RequiresApproval]) VALUES (1, N'Tax Id', 1, 1)
GO
INSERT [dbo].[FunctionalitiesFields] ([FunctionalitiesFieldId], [FieldName], [FunctionalitiesTableId], [RequiresApproval]) VALUES (2, N'Tax Id', 2, 1)
GO
SET IDENTITY_INSERT [dbo].[FunctionalitiesFields] OFF
GO
SET IDENTITY_INSERT [dbo].[FunctionalitiesTables] ON 
GO
INSERT [dbo].[FunctionalitiesTables] ([FunctionalitiesTableId], [FunctionalityId], [TableName]) VALUES (1, 1, N'Customers')
GO
INSERT [dbo].[FunctionalitiesTables] ([FunctionalitiesTableId], [FunctionalityId], [TableName]) VALUES (2, 2, N'Suppliers')
GO
SET IDENTITY_INSERT [dbo].[FunctionalitiesTables] OFF
GO
SET IDENTITY_INSERT [dbo].[Modules] ON 
GO
INSERT [dbo].[Modules] ([ModuleId], [ModuleName]) VALUES (1, N'Customer')
GO
INSERT [dbo].[Modules] ([ModuleId], [ModuleName]) VALUES (2, N'Supplier')
GO
SET IDENTITY_INSERT [dbo].[Modules] OFF
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
ALTER TABLE [dbo].[FunctionalitiesTables]  WITH CHECK ADD  CONSTRAINT [FK_FunctionalitiesTables_Functionalities] FOREIGN KEY([FunctionalityId])
REFERENCES [dbo].[Functionalities] ([FunctionalityId])
GO
ALTER TABLE [dbo].[FunctionalitiesTables] CHECK CONSTRAINT [FK_FunctionalitiesTables_Functionalities]
GO
