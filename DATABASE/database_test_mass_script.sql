/*Massa de teste para a tabela Usuarios_TB*/
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("a1", "1234", "aluno");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("a2", "1234", "aluno");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("s1", "1234", "secre");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("pr1", "1234", "profe");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("pr2", "1234", "profe");

/*Massa de teste para a tabela Aluno_TB*/
INSERT INTO tcc.aluno_tb(nome, RA, login_FK) VALUES ("Gabriel Soares", "N1111", "a1");
INSERT INTO tcc.aluno_tb(nome, RA, login_FK) VALUES ("Lucca Zaccaria", "N2222", "a2");

/*Massa de teste para a tabela Func_TB*/
INSERT INTO tcc.func_tb(nome, funcional, login_FK) VALUES ("Lucas", "0001", "s1");
INSERT INTO tcc.func_tb(nome, funcional, login_FK) VALUES ("Marco", "0002", "pr1");
INSERT INTO tcc.func_tb(nome, funcional, login_FK) VALUES ("André", "0003", "pr2");

/*Massa de teste para a tabela Salas_TB*/
INSERT INTO tcc.salas_tb(idEsp, ipEsp) VALUES ("001", "1.1.1.1");
INSERT INTO tcc.salas_tb(idEsp, ipEsp) VALUES ("002", "2.2.2.2");

/*Massa de teste para a tabela Aulas_TB*/
INSERT INTO tcc.aulas_tb(nome, inicio_Aula, duracao_Min, profId_FK, salaId_FK) VALUES ("REDES - 1", '2020-12-05 19:15:00', 50, 2, 1);
INSERT INTO tcc.aulas_tb(nome, inicio_Aula, duracao_Min, profId_FK, salaId_FK) VALUES ("REDES - 2", '2020-11-15 19:15:00', 50, 2, 2);
INSERT INTO tcc.aulas_tb(nome, inicio_Aula, duracao_Min, profId_FK, salaId_FK) VALUES ("MOBILE - 1", '2020-10-20 19:15:00', 90, 3, 1);

/*Deletes para teste das triggers*/
DELETE FROM tcc.aulas_tb WHERE aulaId = 1;
DELETE FROM tcc.aluno_tb WHERE alunoId = 1;

/*Consultas prontas*/
SELECT * FROM tcc.usuarios_tb;
SELECT * FROM tcc.aluno_tb;
SELECT * FROM tcc.func_tb;
SELECT * FROM tcc.salas_tb;
SELECT * FROM tcc.aulas_tb;
SELECT * FROM tcc.aluno_tb_has_aulas_tb;