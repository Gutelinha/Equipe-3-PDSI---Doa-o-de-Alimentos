-- Script para criação de tabelas

CREATE TABLE Produto (
	codigo_barras VARCHAR (50) PRIMARY KEY,
	nome VARCHAR (60) NOT NULL,
	marca VARCHAR (40),
	tipo VARCHAR (40) NOT NULL,
	unidade_volume VARCHAR (20) NOT NULL
);

CREATE TABLE Campanha (
	nome VARCHAR (70) PRIMARY KEY,
	ativa BOOLEAN DEFAULT TRUE NOT NULL,
	data_inicio DATE NOT NULL,
	data_fim DATE
);

CREATE TABLE Doacao (
	quantidade INT NOT NULL,
	nome_campanha VARCHAR (70) NOT NULL,
	codigo_barras_produto VARCHAR(50) NOT NULL,
	CONSTRAINT PK_DOACAO
		PRIMARY KEY(nome_campanha, codigo_barras_produto),
	CONSTRAINT FK_PRODUTO
		FOREIGN KEY(codigo_barras_produto) REFERENCES Produto(codigo_barras)
		ON DELETE CASCADE,
	CONSTRAINT FK_CAMPANHA
		FOREIGN KEY(nome_campanha) REFERENCES Campanha(nome)
		ON DELETE CASCADE
);
