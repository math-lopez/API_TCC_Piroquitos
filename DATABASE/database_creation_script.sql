create database tcc;
use tcc;

CREATE TABLE Usuarios_TB (
login VARCHAR(45) PRIMARY KEY,
senha VARCHAR(45) NOT NULL,
tipo VARCHAR(5) NOT NULL);

CREATE TABLE Aluno_TB (
alunoId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
RA VARCHAR(45) NOT NULL UNIQUE,
login_FK VARCHAR(45) NOT NULL UNIQUE,
CONSTRAINT FK_UsuarioAluno FOREIGN KEY (login_FK) REFERENCES Usuarios_TB(login));

CREATE TABLE Func_TB (
funcionarioId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
funcional VARCHAR(45) NOT NULL UNIQUE,
login_FK VARCHAR(45) NOT NULL UNIQUE,
CONSTRAINT FK_UsuarioFunc FOREIGN KEY (login_FK) REFERENCES Usuarios_TB(login));

CREATE TABLE Salas_TB (
salaId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
idEsp INT UNSIGNED NOT NULL UNIQUE,
ipEsp VARCHAR(15) NOT NULL UNIQUE);

CREATE TABLE Aulas_TB (
aulaId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45),
inicio_Aula DATETIME NOT NULL,
duracao_Min INT NOT NULL, 
profId_FK INT UNSIGNED NOT NULL,
salaId_FK INT UNSIGNED NOT NULL,
CONSTRAINT FK_ProfAula FOREIGN KEY (profId_FK) REFERENCES Func_TB(funcionarioId),
CONSTRAINT FK_SalaAula FOREIGN KEY (salaId_FK) REFERENCES Salas_TB(salaId));

CREATE TABLE Aluno_TB_has_Aulas_TB (
alunoId_FK INT UNSIGNED NOT NULL,
aulaId_FK INT UNSIGNED NOT NULL,
presenca BOOLEAN,
PRIMARY KEY (alunoId_FK, aulaId_FK),
CONSTRAINT FK_AlunoAula FOREIGN KEY (alunoId_FK) REFERENCES Aluno_TB(alunoId),
CONSTRAINT FK_AulaAluno FOREIGN KEY (aulaId_FK) REFERENCES Aulas_TB(aulaId));