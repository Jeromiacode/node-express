-- DDL
CREATE TABLE [Message] (
	MessageId BIGINT IDENTITY,
	Pseudo NVARCHAR(50) NOT NULL,
	Content NVARCHAR(1000) NOT NULL,
	CreateDate DATETIME2 DEFAULT GETDATE(),
	CONSTRAINT PK_Message PRIMARY KEY (MessageId),
	CONSTRAINT CK_Message__Pseudo CHECK(TRIM(Pseudo) NOT LIKE ''),
	CONSTRAINT CK_Message__Content CHECK(TRIM(Content) NOT LIKE '')
);

-- DML
INSERT INTO [Message] (Pseudo, Content)
VALUES ('Jay', N'Hello Mia ♥');

INSERT INTO [Message] (Pseudo, Content)
VALUES ('Guish', N'Coffee needed !');

-- DRL
SELECT [MessageId], [Pseudo], [Content] AS [Contenu], [CreateDate] AS [Date de création]
FROM [Message]