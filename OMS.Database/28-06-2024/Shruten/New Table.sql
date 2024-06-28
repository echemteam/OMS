USE [OmsLite]
GO
/****** Object:  Table [dbo].[ChecklistEvents]    Script Date: 28-06-2024 18:07:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChecklistEvents](
	[EventId] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChecklistItems]    Script Date: 28-06-2024 18:07:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChecklistItems](
	[ChecklistItemId] [int] IDENTITY(1,1) NOT NULL,
	[ItemDescription] [varchar](255) NOT NULL,
	[ChecklistId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ChecklistItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Checklists]    Script Date: 28-06-2024 18:07:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Checklists](
	[ChecklistId] [int] IDENTITY(1,1) NOT NULL,
	[ChecklistName] [varchar](255) NOT NULL,
	[EventId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ChecklistId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserChecklistResponses]    Script Date: 28-06-2024 18:07:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserChecklistResponses](
	[ResponseId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[ChecklistItemId] [int] NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ResponseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ChecklistItems]  WITH CHECK ADD  CONSTRAINT [FK_ChecklistItems_Checklists] FOREIGN KEY([ChecklistId])
REFERENCES [dbo].[Checklists] ([ChecklistId])
GO
ALTER TABLE [dbo].[ChecklistItems] CHECK CONSTRAINT [FK_ChecklistItems_Checklists]
GO
ALTER TABLE [dbo].[Checklists]  WITH CHECK ADD  CONSTRAINT [FK_Checklists_ChecklistEvents] FOREIGN KEY([EventId])
REFERENCES [dbo].[ChecklistEvents] ([EventId])
GO
ALTER TABLE [dbo].[Checklists] CHECK CONSTRAINT [FK_Checklists_ChecklistEvents]
GO
ALTER TABLE [dbo].[UserChecklistResponses]  WITH CHECK ADD  CONSTRAINT [FK_UserChecklistResponses_ChecklistItems] FOREIGN KEY([ChecklistItemId])
REFERENCES [dbo].[ChecklistItems] ([ChecklistItemId])
GO
ALTER TABLE [dbo].[UserChecklistResponses] CHECK CONSTRAINT [FK_UserChecklistResponses_ChecklistItems]
GO
