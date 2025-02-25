export interface Test {
    idTest: number;
    titulo: string;
    fechaCreacion: string;
    idTemario: number;
}
  
export interface Pregunta {
    idPregunta: number;
    enunciado: string;
    idTest: number;
    opciones: Opcion[];
}
  
export interface Opcion {
    idOpcion: number;
    texto: string;
    esCorrecta: boolean;
}
  