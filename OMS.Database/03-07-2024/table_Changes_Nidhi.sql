USE [OmsLite]
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (1, N'Primary', CAST(N'2024-06-05T02:13:22.720' AS DateTime), 1, 1)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (2, N'EndUser', CAST(N'2024-06-05T02:13:22.720' AS DateTime), 1, 0)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (3, N'Purchasing', CAST(N'2024-06-06T04:42:01.563' AS DateTime), 1, 0)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (4, N'Invoice Submission', CAST(N'2024-06-06T04:42:29.673' AS DateTime), 1, 0)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (5, N'Invoice Follow-up', CAST(N'2024-06-06T04:42:51.050' AS DateTime), 1, 0)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (6, N'AP', CAST(N'2024-06-06T04:43:08.290' AS DateTime), 1, 0)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (7, N'Accounts Receivable', CAST(N'2024-07-01T00:00:00.000' AS DateTime), 0, 1)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (8, N'Purchase Order', CAST(N'2024-07-01T00:00:00.000' AS DateTime), 0, 1)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (9, N'Sales Department', CAST(N'2024-07-01T00:00:00.000' AS DateTime), 0, 1)
GO
INSERT [dbo].[ContactTypes] ([ContactTypeId], [Type], [CreatedAt], [IsForCustomers], [IsForSuppliers]) VALUES (10, N'QC department', CAST(N'2024-07-01T00:00:00.000' AS DateTime), 0, 1)
GO
INSERT [dbo].[DocumentTypes] ([DocumentTypeId], [Type], [CreatedAt], [IsForSuppliers], [IsForCustomers]) VALUES (1, N'Tax or Registration document', CAST(N'2024-06-10T11:24:42.123' AS DateTime), 1, 1)
GO
INSERT [dbo].[DocumentTypes] ([DocumentTypeId], [Type], [CreatedAt], [IsForSuppliers], [IsForCustomers]) VALUES (2, N'Customer details form', CAST(N'2024-06-10T11:24:42.123' AS DateTime), 0, 1)
GO
INSERT [dbo].[DocumentTypes] ([DocumentTypeId], [Type], [CreatedAt], [IsForSuppliers], [IsForCustomers]) VALUES (3, N'Our submitted forms', CAST(N'2024-06-10T11:24:42.127' AS DateTime), 1, 1)
GO
INSERT [dbo].[DocumentTypes] ([DocumentTypeId], [Type], [CreatedAt], [IsForSuppliers], [IsForCustomers]) VALUES (4, N'Supplier details form', CAST(N'2024-07-01T00:00:00.000' AS DateTime), 1, 0)
GO
INSERT [dbo].[SupplierTypes] ([SupplierTypeId], [Type], [CreatedAt]) VALUES (1, N'Company', CAST(N'2024-06-17T04:44:24.117' AS DateTime))
GO
INSERT [dbo].[SupplierTypes] ([SupplierTypeId], [Type], [CreatedAt]) VALUES (2, N'Individual', CAST(N'2024-06-17T04:44:24.117' AS DateTime))
GO
