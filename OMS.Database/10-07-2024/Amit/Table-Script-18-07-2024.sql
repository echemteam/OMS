
/****** Object:  Table [dbo].[SubCompanyMainCompany]    Script Date: 18-07-2024 14:18:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SubCompanyMainCompany](
	[SubCompanyMainCompanyId] [int] IDENTITY(1,1) NOT NULL,
	[MainCompanyId] [int] NULL,
	[SubCompanyId] [int] NULL,
	[DeletedBy] [smallint] NULL,
	[DeletedAt] [datetime] NULL,
 CONSTRAINT [PK_SubCompanyMainCompany] PRIMARY KEY CLUSTERED 
(
	[SubCompanyMainCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SubCompanyMainCompany]  WITH CHECK ADD  CONSTRAINT [FK_SubCompanyMainCompany_Customers] FOREIGN KEY([MainCompanyId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO

ALTER TABLE [dbo].[SubCompanyMainCompany] CHECK CONSTRAINT [FK_SubCompanyMainCompany_Customers]
GO


