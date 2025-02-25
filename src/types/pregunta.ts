import type { Pregunta } from "@/types/test";

// Base de preguntas organizada por idTest
export const preguntasPorTest: Record<number, Pregunta[]> = {
  // Test 1: Vue
  1: [
    {
      idPregunta: 101,
      enunciado: "¿Cuál es el color del logo de Vue?",
      idTest: 1,
      opciones: [
        { idOpcion: 1, texto: "Rojo", esCorrecta: false },
        { idOpcion: 2, texto: "Verde", esCorrecta: true },
        { idOpcion: 3, texto: "Azul", esCorrecta: false },
        { idOpcion: 4, texto: "Amarillo", esCorrecta: false },
      ],
    },
    {
      idPregunta: 102,
      enunciado: "¿Qué directiva se usa para enlazar datos bidireccionales en Vue?",
      idTest: 1,
      opciones: [
        { idOpcion: 5, texto: "v-bind", esCorrecta: false },
        { idOpcion: 6, texto: "v-model", esCorrecta: true },
        { idOpcion: 7, texto: "v-if", esCorrecta: false },
        { idOpcion: 8, texto: "v-for", esCorrecta: false },
      ],
    },
  ],
  
  // Test 2: Vuetify
  2: [
    {
      idPregunta: 201,
      enunciado: "¿Qué es Vuetify?",
      idTest: 2,
      opciones: [
        { idOpcion: 9, texto: "Un framework CSS", esCorrecta: false },
        { idOpcion: 10, texto: "Una librería de componentes UI para Vue", esCorrecta: true },
        { idOpcion: 11, texto: "Un lenguaje de programación", esCorrecta: false },
        { idOpcion: 12, texto: "Un sistema operativo", esCorrecta: false },
      ],
    },
    {
      idPregunta: 202,
      enunciado: "¿Qué sistema de grid usa Vuetify?",
      idTest: 2,
      opciones: [
        { idOpcion: 13, texto: "Bootstrap grid", esCorrecta: false },
        { idOpcion: 14, texto: "Flexbox grid de 12 columnas", esCorrecta: true },
        { idOpcion: 15, texto: "CSS Grid", esCorrecta: false },
        { idOpcion: 16, texto: "No tiene sistema de grid", esCorrecta: false },
      ],
    },
  ],
  
  // Test 3: TypeScript
  3: [
    {
      idPregunta: 301,
      enunciado: "¿Qué es TypeScript?",
      idTest: 3,
      opciones: [
        { idOpcion: 17, texto: "Un framework de JavaScript", esCorrecta: false },
        { idOpcion: 18, texto: "Un superset tipado de JavaScript", esCorrecta: true },
        { idOpcion: 19, texto: "Un lenguaje de programación completamente diferente", esCorrecta: false },
        { idOpcion: 20, texto: "Una librería de JavaScript", esCorrecta: false },
      ],
    },
    {
      idPregunta: 302,
      enunciado: "¿Cuál es la extensión de los archivos TypeScript?",
      idTest: 3,
      opciones: [
        { idOpcion: 21, texto: ".js", esCorrecta: false },
        { idOpcion: 22, texto: ".ts", esCorrecta: true },
        { idOpcion: 23, texto: ".type", esCorrecta: false },
        { idOpcion: 24, texto: ".typescript", esCorrecta: false },
      ],
    },
  ],
  
  // Test 4: JavaScript
  4: [
    {
      idPregunta: 401,
      enunciado: "¿Cuál es un tipo de dato primitivo en JavaScript?",
      idTest: 4,
      opciones: [
        { idOpcion: 25, texto: "Object", esCorrecta: false },
        { idOpcion: 26, texto: "Array", esCorrecta: false },
        { idOpcion: 27, texto: "String", esCorrecta: true },
        { idOpcion: 28, texto: "Function", esCorrecta: false },
      ],
    },
    {
      idPregunta: 402,
      enunciado: "¿Cómo se declara una constante en JavaScript?",
      idTest: 4,
      opciones: [
        { idOpcion: 29, texto: "let", esCorrecta: false },
        { idOpcion: 30, texto: "var", esCorrecta: false },
        { idOpcion: 31, texto: "const", esCorrecta: true },
        { idOpcion: 32, texto: "constant", esCorrecta: false },
      ],
    },
  ],
  
  // Test 5: HTML & CSS
  5: [
    {
      idPregunta: 501,
      enunciado: "¿Qué significa HTML?",
      idTest: 5,
      opciones: [
        { idOpcion: 33, texto: "Hyper Text Markup Language", esCorrecta: true },
        { idOpcion: 34, texto: "High Tech Modern Language", esCorrecta: false },
        { idOpcion: 35, texto: "Hyperlinks and Text Markup Language", esCorrecta: false },
        { idOpcion: 36, texto: "Home Tool Markup Language", esCorrecta: false },
      ],
    },
    {
      idPregunta: 502,
      enunciado: "¿Qué propiedad CSS se usa para cambiar el color del texto?",
      idTest: 5,
      opciones: [
        { idOpcion: 37, texto: "text-color", esCorrecta: false },
        { idOpcion: 38, texto: "font-color", esCorrecta: false },
        { idOpcion: 39, texto: "color", esCorrecta: true },
        { idOpcion: 40, texto: "text-style", esCorrecta: false },
      ],
    },
  ]
};

// Función para obtener preguntas por ID de test
export const obtenerPreguntasPorTest = (idTest: number): Pregunta[] => {
  return preguntasPorTest[idTest] || [];
};