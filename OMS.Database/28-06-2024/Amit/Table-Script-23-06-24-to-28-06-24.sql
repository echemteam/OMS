--USE [OmsLiteTest]
--GO
/****** Object:  Table [dbo].[CustomerAuditHistory]    Script Date: 28-06-2024 16:08:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerAuditHistory](
	[CustomerAuditHistoryId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NULL,
	[EventName] [varchar](150) NULL,
	[ChangedBy] [smallint] NULL,
	[ChangedAt] [datetime] NULL,
	[Description] [varchar](max) NULL,
	[EventStatus] [varchar](10) NULL,
 CONSTRAINT [PK_CustomerAuditHistory] PRIMARY KEY CLUSTERED 
(
	[CustomerAuditHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupplierAuditHistory]    Script Date: 28-06-2024 16:08:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupplierAuditHistory](
	[SupplierAuditHistoryId] [int] IDENTITY(1,1) NOT NULL,
	[SupplierId] [int] NULL,
	[EventName] [varchar](150) NULL,
	[ChangedBy] [smallint] NULL,
	[ChangedAt] [datetime] NULL,
	[Description] [varchar](max) NULL,
	[EventStatus] [varchar](10) NULL,
 CONSTRAINT [PK_SupplierAuditHistoryId] PRIMARY KEY CLUSTERED 
(
	[SupplierAuditHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
