USE [master];
GO

CREATE DATABASE [GoldenBook];
GO

USE [GoldenBook];
GO

CREATE TABLE [Member] (
    [MemberId] BIGINT IDENTITY,
    [Email] VARCHAR(250),
    [Password] CHAR(60),
    CONSTRAINT PK_Member PRIMARY KEY ([MemberId]),
    CONSTRAINT UK_Member__Email UNIQUE ([Email])
);

GO

ALTER TABLE [Member]
    ADD Pseudo VARCHAR (50) NOT NULL
        CONSTRAINT UK_Member_Pseudo UNIQUE;