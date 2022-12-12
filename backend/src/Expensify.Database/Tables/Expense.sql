CREATE TABLE [dbo].[Expense]
(
	[Id] UNIQUEIDENTIFIER NOT NULL, 
    [Description] NVARCHAR(100) NOT NULL, 
    [Note] NVARCHAR(500) NULL, 
    [Currency] INT NOT NULL, 
    [Amount] DECIMAL(18, 2) NOT NULL, 
    [Date] DATETIME2 NOT NULL, 
    [UserId] NVARCHAR(100) NOT NULL, 
    CONSTRAINT [PK_Expense] PRIMARY KEY ([Id]) 
)
