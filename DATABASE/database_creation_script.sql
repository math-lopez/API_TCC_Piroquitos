create database tcc;
use tcc;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE user (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);


-- -----------------------------------------------------
-- Table `mydb`.`Aluno_TB`
-- -----------------------------------------------------
CREATE TABLE Aluno_TB (
  `alunoId` INT NOT NULL AUTO_INCREMENT,
  `RA` VARCHAR(9) NOT NULL,
  `caminhoImagem` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`alunoId`));


-- -----------------------------------------------------
-- Table `mydb`.`Salas_TB`
-- -----------------------------------------------------
CREATE TABLE Salas_TB (
  `idSala` INT NOT NULL,
  `idEsp32cam` VARCHAR(45) NOT NULL,
  `ipEsp32cam` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSala`));


-- -----------------------------------------------------
-- Table `mydb`.`Aulas_TB`
-- -----------------------------------------------------
CREATE TABLE Aulas_TB (
  `idAula` INT NOT NULL PRIMARY KEY,
  `dataHora` VARCHAR(45) NOT NULL,
  `caminhoImagem` VARCHAR(100) NOT NULL,
  `Salas_TB_idSala` INT NOT NULL,
	FOREIGN KEY (`Salas_TB_idSala`)
    REFERENCES Salas_TB (`idSala`));
    


-- -----------------------------------------------------
-- Table `mydb`.`Aluno_TB_has_Aulas_TB`
-- -----------------------------------------------------
CREATE TABLE Aluno_TB_has_Aulas_TB (
  `Aluno_TB_alunoId` INT NOT NULL,
  `Aulas_TB_idAula` INT NOT NULL,
  `presenca` TINYINT NULL,
  PRIMARY KEY (`Aluno_TB_alunoId`, `Aulas_TB_idAula`),
    FOREIGN KEY (`Aluno_TB_alunoId`)
    REFERENCES Aluno_TB (`alunoId`),
    FOREIGN KEY (`Aulas_TB_idAula`)
    REFERENCES Aulas_TB (`idAula`));


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios_TB`
-- -----------------------------------------------------
CREATE TABLE Usuarios_TB (
  `usuarioId` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `tipo` CHAR(5) NOT NULL,
  PRIMARY KEY (`usuarioId`));


-- -----------------------------------------------------
-- Table `mydb`.`Funcionarios_TB`
-- -----------------------------------------------------
CREATE TABLE Funcionarios_TB (
  `funcionarioId` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`funcionarioId`));


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios_TB_has_Aluno_TB`
-- -----------------------------------------------------
CREATE TABLE Usuarios_TB_has_Aluno_TB (
  `Usuarios_TB_usuarioId` INT NOT NULL,
  `Aluno_TB_alunoId` INT NOT NULL,
  PRIMARY KEY (`Usuarios_TB_usuarioId`, `Aluno_TB_alunoId`),
    FOREIGN KEY (`Usuarios_TB_usuarioId`)
    REFERENCES Usuarios_TB (`usuarioId`),
    FOREIGN KEY (`Aluno_TB_alunoId`)
    REFERENCES Aluno_TB (`alunoId`));


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios_TB_has_Funcionarios_TB`
-- -----------------------------------------------------
CREATE TABLE Usuarios_TB_has_Funcionarios_TB (
  `Usuarios_TB_usuarioId` INT NOT NULL,
  `Funcionarios_TB_funcionarioId` INT NOT NULL,
  PRIMARY KEY (`Usuarios_TB_usuarioId`, `Funcionarios_TB_funcionarioId`),
    FOREIGN KEY (`Usuarios_TB_usuarioId`)
    REFERENCES Usuarios_TB (`usuarioId`),
    FOREIGN KEY (`Funcionarios_TB_funcionarioId`)
    REFERENCES Funcionarios_TB (`funcionarioId`));