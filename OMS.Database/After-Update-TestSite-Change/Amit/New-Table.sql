USE [OmsLite]
GO
/****** Object:  Table [dbo].[PODeliveryMethod]    Script Date: 26-07-2024 10:01:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PODeliveryMethod](
	[PODeliveryMethodId] [int] NOT NULL,
	[PODeliveryMethod] [nvarchar](50) NULL,
 CONSTRAINT [PK_PODeliveryMethod] PRIMARY KEY CLUSTERED 
(
	[PODeliveryMethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[PODeliveryMethod] ([PODeliveryMethodId], [PODeliveryMethod]) VALUES (1, N'Email')
GO
INSERT [dbo].[PODeliveryMethod] ([PODeliveryMethodId], [PODeliveryMethod]) VALUES (2, N'Fax')
GO
INSERT [dbo].[PODeliveryMethod] ([PODeliveryMethodId], [PODeliveryMethod]) VALUES (3, N'Website')
GO
INSERT [dbo].[PODeliveryMethod] ([PODeliveryMethodId], [PODeliveryMethod]) VALUES (4, N'Portal')
GO
INSERT [dbo].[PODeliveryMethod] ([PODeliveryMethodId], [PODeliveryMethod]) VALUES (5, N'Phone call')
GO
INSERT [dbo].[PODeliveryMethod] ([PODeliveryMethodId], [PODeliveryMethod]) VALUES (6, N'Third Party')
GO
