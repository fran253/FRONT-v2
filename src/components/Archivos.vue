<script setup lang="ts">
  //IMPORTS
  import { ref, computed } from 'vue';
  import ModalArchivoComentario from '@/components/ModalArchivoComentarios.vue';
  import { Archivo } from "@/types/archivo";

  //propiedades
  const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

  //lista archivos
  const archivosHardcoded: Archivo[] = [
    { id: 1, temarioId: 1, nombre: "Guía de Vue", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 2, temarioId: 1, nombre: "Manual de Vuetify", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 3, temarioId: 2, nombre: "Documentación TypeScript", url: "https://www.orimi.com/pdf-test.pdf" }
  ];

  //filtrar archivos
  const archivosFiltrados = computed(() => {
    if (props.temarioId === null) return archivosHardcoded;
    return archivosHardcoded.filter(archivo =>
      archivo.temarioId === props.temarioId &&
      (props.terminoBusqueda ? archivo.nombre.toLowerCase().includes(props.terminoBusqueda.toLowerCase()) : true)
    );
  });

  //Archivo funciones
  const visorAbierto = ref(false);
  const archivoSeleccionado = ref<Archivo | null>(null);

  //abrir
  const verArchivo = (archivo: Archivo) => {
    archivoSeleccionado.value = archivo;
    visorAbierto.value = true;
  };

  //cerrar
  const cerrarModal = () => {
    visorAbierto.value = false;
  };
</script>


<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="10">
        <v-card class="pa-5">
          <v-row>
            <v-col v-for="archivo in archivosFiltrados" :key="archivo.id" cols="12" md="6" lg="4">
              <v-card class="pa-3">
                <v-card-title>{{ archivo.nombre }}</v-card-title>
                <v-divider></v-divider>

                <v-card-actions class="button-group">
                  <v-btn color="orange-darken-2" icon class="circular-btn" @click="verArchivo(archivo)" aria-label="Ver archivo">
                    <v-icon color="white">mdi-eye</v-icon>
                  </v-btn>
                  <v-btn color="orange-darken-2" icon class="circular-btn" :href="archivo.url" target="_blank" download aria-label="Descargar archivo">
                    <v-icon color="white">mdi-download</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <ModalArchivoComentario
      :archivo="archivoSeleccionado"
      :abierto="visorAbierto"
      @cerrar="cerrarModal"
    />
  </v-container>
</template>

<style lang="scss" scoped>
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .circular-btn {
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: orange;
  }
</style>
