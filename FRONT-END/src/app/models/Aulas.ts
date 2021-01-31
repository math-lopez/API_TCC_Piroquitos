import { Professor } from "./Professor";
import { Sala } from "./Sala";

export interface Aulas{
    aulaId: number;
    duracao_Min: number;
    inicio_Aula: string;
    nome: string;
    professor: Professor;
    sala: Sala;
}