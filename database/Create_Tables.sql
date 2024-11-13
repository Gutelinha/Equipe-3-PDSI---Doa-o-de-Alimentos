-- Script para criação de tabelas

CREATE TABLE Produto (
	Codigo_Barras VARCHAR (50) PRIMARY KEY,
	Nome VARCHAR (60) NOT NULL,
	Marca VARCHAR (40),
	Tipo VARCHAR (40) NOT NULL,
	Unidade_Volume VARCHAR (20) NOT NULL
);

CREATE TABLE Campanha (
	Nome VARCHAR (70) PRIMARY KEY,
	Estado BOOLEAN DEFAULT TRUE NOT NULL,
	D_ini TIMESTAMP NOT NULL,
	D_fim TIMESTAMP
);

CREATE TABLE Doacao (
	Quantidade INT NOT NULL,
	Nome_Campanha VARCHAR (70) NOT NULL,
	Codigo_Barras_Produto VARCHAR(50) NOT NULL,
	CONSTRAINT PK_DOACAO
		PRIMARY KEY(Nome_Campanha, Codigo_Barras_Produto),
	CONSTRAINT FK_PRODUTO
		FOREIGN KEY(Codigo_Barras_Produto) REFERENCES Produto(Codigo_Barras)
		ON DELETE CASCADE,
	CONSTRAINT FK_CAMPANHA
		FOREIGN KEY(Nome_Campanha) REFERENCES Campanha(Nome)
		ON DELETE CASCADE
);
