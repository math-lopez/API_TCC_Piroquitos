/*Massa de teste para a tabela Usuarios_TB*/
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("teste", "1234", "admin");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("teste2", "1234", "aluno");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("teste3", "1234", "aluno");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("pr1", "1234", "prof");
INSERT INTO tcc.usuarios_tb(login, senha, tipo) VALUES ("pr2", "1234", "prof");

/*Massa de teste para a tabela Aluno_TB*/
INSERT INTO tcc.aluno_tb(nome, RA, login_FK) VALUES ("aaa", "1111", "teste");
INSERT INTO tcc.aluno_tb(nome, RA, login_FK) VALUES ("bbb", "2222", "teste2");
INSERT INTO tcc.aluno_tb(nome, RA, login_FK) VALUES ("ccc", "3333", "teste3");

/*Massa de teste para a tabela Func_TB*/
INSERT INTO tcc.func_tb(nome, funcional, login_FK) VALUES ("pa", "1111", "pr1");
INSERT INTO tcc.func_tb(nome, funcional, login_FK) VALUES ("pb", "2222", "pr2");

/*Massa de teste para a tabela Salas_TB*/
INSERT INTO tcc.salas_tb(idEsp, ipEsp) VALUES ("1", "1.1.1.1");
INSERT INTO tcc.salas_tb(idEsp, ipEsp) VALUES ("2", "2.2.2.2");

/*Massa de teste para a tabela Aulas_TB*/
INSERT INTO tcc.aulas_tb(nome, inicio_Aula, duracao_Min, profId_FK, salaId_FK) VALUES ("QUIMICA", '2020-12-05 19:15:00', 50, 1, 1);
INSERT INTO tcc.aulas_tb(nome, inicio_Aula, duracao_Min, profId_FK, salaId_FK) VALUES ("FISICA", '2020-11-15 19:15:00', 50, 2, 2);
INSERT INTO tcc.aulas_tb(nome, inicio_Aula, duracao_Min, profId_FK, salaId_FK) VALUES ("HISTORIA", '2020-10-20 19:15:00', 100, 2, 1);

/*Consultas prontas*/
SELECT * FROM tcc.usuarios_tb;
SELECT * FROM tcc.aluno_tb;
SELECT * FROM tcc.func_tb;
SELECT * FROM tcc.salas_tb;
SELECT * FROM tcc.aulas_tb;
SELECT * FROM tcc.aluno_tb_has_aulas_tb;