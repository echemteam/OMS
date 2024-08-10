CREATE TABLE [dbo].[OrderMethod](
	[OrderMethodId] [tinyint] NOT NULL,
	[OrderMethod] [varchar](100) NULL,
 CONSTRAINT [PK_OrderMethod] PRIMARY KEY CLUSTERED 
(
	[OrderMethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[OrderMethod] ([OrderMethodId], [OrderMethod]) VALUES (1, N'Phone Call')
GO
INSERT [dbo].[OrderMethod] ([OrderMethodId], [OrderMethod]) VALUES (2, N'Fax')
GO
INSERT [dbo].[OrderMethod] ([OrderMethodId], [OrderMethod]) VALUES (3, N'Email')
GO
INSERT [dbo].[OrderMethod] ([OrderMethodId], [OrderMethod]) VALUES (4, N'Online')
GO
