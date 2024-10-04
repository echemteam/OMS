USE [OmsLite]
GO
/****** Object:  Table [dbo].[Units]    Script Date: 04-10-2024 16:28:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Units](
	[UnitId] [int] NOT NULL,
	[Unit] [varchar](15) NULL,
	[DisplayOrder] [tinyint] NULL,
 CONSTRAINT [PK_Units] PRIMARY KEY CLUSTERED 
(
	[UnitId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
