//ModalTest.vue es la ventana que aparece en cada test cuando se vaya a realizar, con sus preguntas dentro

<script setup lang="ts">
  import { ref } from "vue";
  import PreguntaCard from "@/components/CardPregunta.vue";
  import type { Pregunta } from "@/types/test";

  const props = defineProps<{ abierto: boolean; preguntas: Pregunta[] }>();
  const emit = defineEmits(["cerrar"]);

  // Estado del test
  const respuestas = ref<{ [key: number]: number }>({}); // Guarda la respuesta de cada pregunta

  // Guardar la opción seleccionada
  const seleccionarOpcion = (idPregunta: number, idOpcion: number) => {
    respuestas.value[idPregunta] = idOpcion;
  };

  // Enviar respuestas
  const enviarTest = () => {
    console.log("Respuestas enviadas:", respuestas.value);
    emit("cerrar");
  };
</script>

<template>
  <v-dialog v-model="props.abierto" persistent max-width="800px">
    <v-card>
      <v-card-title class="text-center">Realizar Test</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="pregunta in props.preguntas" :key="pregunta.idPregunta" cols="12">
              <PreguntaCard :pregunta="pregunta" @seleccionarOpcion="(idOpcion) => seleccionarOpcion(pregunta.idPregunta, idOpcion)" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="red" @click="$emit('cerrar')">Cancelar</v-btn>
        <v-btn color="green" @click="enviarTest">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
