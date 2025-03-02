<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAsignaturaStore } from '@/stores/Asignaturas';
import type { AsignaturaDTO } from '@/stores/dtos/AsignaturasDTO';

// Store
const asignaturaStore = useAsignaturaStore();

// Variables reactivas
const searchQuery = ref('');
const showForm = ref(false);
const isEditing = ref(false);
const selectedAsignatura = ref<AsignaturaDTO | null>(null);
const asignaturaForm = ref<Partial<AsignaturaDTO>>({
  nombre: '',
  descripcion: '',
  imagen: '',
  idCurso: 18 // Valor predeterminado para el ID de curso
});
const confirmDelete = ref(false);
const idToDelete = ref<number | null>(null);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Asignaturas filtradas
const asignaturasFiltradas = computed(() => {
  if (!searchQuery.value) return asignaturaStore.asignaturas;
  return asignaturaStore.asignaturas.filter(asignatura =>
    asignatura.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Cargar asignaturas al montar el componente
onMounted(async () => {
  await asignaturaStore.fetchAllAsignaturas();
});

// Abrir formulario para crear
function openCreateForm() {
  showForm.value = true;
  isEditing.value = false;
  selectedAsignatura.value = null;
  asignaturaForm.value = {
    nombre: '',
    descripcion: '',
    imagen: '',
    idCurso: 18 // ID de curso predeterminado
  };
  errorMessage.value = '';
  successMessage.value = '';
}

// Abrir formulario para editar
async function openEditForm(asignatura: AsignaturaDTO) {
  showForm.value = true;
  isEditing.value = true;
  selectedAsignatura.value = asignatura;
  
  // Copiar los valores para evitar modificar directamente el objeto original
  asignaturaForm.value = {
    nombre: asignatura.nombre,
    descripcion: asignatura.descripcion,
    imagen: asignatura.imagen,
    idCurso: asignatura.idCurso
  };
  errorMessage.value = '';
  successMessage.value = '';
}

// Cerrar formulario
function closeForm() {
  showForm.value = false;
  errorMessage.value = '';
}

// Crear nueva asignatura con múltiples formatos para probar
async function createAsignatura() {
  if (!asignaturaForm.value.nombre || !asignaturaForm.value.descripcion) {
    errorMessage.value = "Los campos nombre y descripción son obligatorios";
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  // ID del curso como número entero
  const cursoId = parseInt(String(asignaturaForm.value.idCurso)) || 18;
  
  try {
    // Intentar con diferentes formatos uno tras otro
    let response = null;
    let success = false;
    
    // Formato 1: Objeto simple con idCurso
    if (!success) {
      const payload1 = {
        nombre: asignaturaForm.value.nombre,
        descripcion: asignaturaForm.value.descripcion,
        imagen: asignaturaForm.value.imagen || '',
        idCurso: cursoId
      };
      
      console.log("Intento 1 - Formato simple:", JSON.stringify(payload1));
      
      response = await fetch("/api/Asignatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload1),
      });
      
      console.log("Respuesta formato 1:", response.status);
      success = response.ok;
    }
    
    // Formato 2: Solo con objeto curso
    if (!success) {
      const payload2 = {
        nombre: asignaturaForm.value.nombre,
        descripcion: asignaturaForm.value.descripcion,
        imagen: asignaturaForm.value.imagen || '',
        curso: {
          idCurso: cursoId
        }
      };
      
      console.log("Intento 2 - Solo objeto curso:", JSON.stringify(payload2));
      
      response = await fetch("/api/Asignatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload2),
      });
      
      console.log("Respuesta formato 2:", response.status);
      success = response.ok;
    }
    
    // Formato 3: Combinado idCurso + objeto curso
    if (!success) {
      const payload3 = {
        nombre: asignaturaForm.value.nombre,
        descripcion: asignaturaForm.value.descripcion,
        imagen: asignaturaForm.value.imagen || '',
        idCurso: cursoId,
        curso: {
          idCurso: cursoId
        }
      };
      
      console.log("Intento 3 - Combinado:", JSON.stringify(payload3));
      
      response = await fetch("/api/Asignatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload3),
      });
      
      console.log("Respuesta formato 3:", response.status);
      success = response.ok;
    }
    
    // Formato 4: Completo según swagger
    if (!success) {
      const payload4 = {
        idAsignatura: 0,
        nombre: asignaturaForm.value.nombre,
        descripcion: asignaturaForm.value.descripcion,
        imagen: asignaturaForm.value.imagen || '',
        fechaCreacion: new Date().toISOString(),
        idCurso: cursoId,
        curso: {
          idCurso: cursoId,
          nombre: "",
          imagen: "",
          descripcion: "",
          fechaCreacion: new Date().toISOString()
        }
      };
      
      console.log("Intento 4 - Completo Swagger:", JSON.stringify(payload4));
      
      response = await fetch("/api/Asignatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload4),
      });
      
      console.log("Respuesta formato 4:", response.status);
      success = response.ok;
    }
    
    // Procesar respuesta final
    if (success) {
      // Actualizar la lista de asignaturas
      await asignaturaStore.fetchAllAsignaturas();
      successMessage.value = "Asignatura creada con éxito";
      closeForm();
    } else {
      // Intentar leer el texto de error
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {}
      
      console.error("Error en todos los intentos:", errorText);
      throw new Error(`No se pudo crear la asignatura. Código: ${response.status}`);
    }
  } catch (error) {
    console.error("Error completo:", error);
    errorMessage.value = error.message || "Error al crear la asignatura";
  } finally {
    isLoading.value = false;
  }
}

// Actualizar asignatura existente - versión que funciona
async function updateAsignatura() {
  if (!selectedAsignatura.value) return;
  
  if (!asignaturaForm.value.nombre || !asignaturaForm.value.descripcion) {
    errorMessage.value = "Los campos nombre y descripción son obligatorios";
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    // Estructura que sabemos que funciona para el PUT
    const payload = {
      idAsignatura: selectedAsignatura.value.idAsignatura,
      nombre: asignaturaForm.value.nombre,
      descripcion: asignaturaForm.value.descripcion,
      imagen: asignaturaForm.value.imagen || '',
      curso: {
        idCurso: parseInt(String(asignaturaForm.value.idCurso)) || 18
      }
    };

    console.log("Datos enviados al servidor para actualizar:", JSON.stringify(payload));
    
    const response = await fetch(`/api/Asignatura/${selectedAsignatura.value.idAsignatura}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Intentar obtener texto de la respuesta para depuración
    let responseText = '';
    try {
      responseText = await response.text();
      console.log(`Respuesta del servidor: ${response.status} - ${responseText}`);
    } catch (e) {
      console.error("No se pudo leer la respuesta:", e);
    }

    if (!response.ok) {
      throw new Error(`Error al actualizar la asignatura. Código: ${response.status}`);
    }

    // Actualizar la lista de asignaturas
    await asignaturaStore.fetchAllAsignaturas();
    successMessage.value = "Asignatura actualizada con éxito";
    
    closeForm();
  } catch (error) {
    console.error("Error completo:", error);
    errorMessage.value = error.message || "Error al actualizar la asignatura";
  } finally {
    isLoading.value = false;
  }
}

// Guardar asignatura (crear o actualizar)
async function saveAsignatura() {
  if (isEditing.value) {
    await updateAsignatura();
  } else {
    await createAsignatura();
  }
}

// Preparar eliminación (mostrar confirmación)
function prepareDelete(id: number) {
  confirmDelete.value = true;
  idToDelete.value = id;
  errorMessage.value = '';
}

// Confirmar eliminación
async function confirmDeleteAsignatura() {
  if (idToDelete.value === null) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await fetch(`/api/Asignatura/${idToDelete.value}`, {
      method: "DELETE",
    });

    // Depuración
    console.log(`Respuesta DELETE: ${response.status}`);
    
    if (!response.ok) {
      try {
        const errorText = await response.text();
        console.error("Respuesta del servidor al eliminar:", errorText);
      } catch (e) {}
      
      throw new Error(`Error al eliminar la asignatura. Código: ${response.status}`);
    }

    successMessage.value = "Asignatura eliminada con éxito";
    
    // Actualizar la lista de asignaturas
    await asignaturaStore.fetchAllAsignaturas();
    
    confirmDelete.value = false;
    idToDelete.value = null;
  } catch (error) {
    console.error("Error completo al eliminar:", error);
    errorMessage.value = error.message || "Error al eliminar la asignatura";
  } finally {
    isLoading.value = false;
  }
}

// Cancelar eliminación
function cancelDelete() {
  confirmDelete.value = false;
  idToDelete.value = null;
  errorMessage.value = '';
}

// Formatear fecha
function formatDate(date: Date | string): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
}
</script>

<template>
  <div class="asignaturas-table-container">
    <!-- Alertas -->
    <v-alert
      v-if="errorMessage"
      type="error"
      variant="tonal"
      closable
      class="my-3"
    >
      {{ errorMessage }}
    </v-alert>

    <v-alert
      v-if="successMessage"
      type="success"
      variant="tonal"
      closable
      class="my-3"
    >
      {{ successMessage }}
    </v-alert>

    <!-- Barra de herramientas -->
    <div class="table-toolbar">
      <v-text-field
        v-model="searchQuery"
        label="Buscar asignatura"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        class="search-input"
      />
      
      <v-btn
        color="#ff7424"
        @click="openCreateForm"
        prepend-icon="mdi-plus"
      >
        Nueva Asignatura
      </v-btn>
    </div>

    <!-- Tabla de asignaturas -->
    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Curso ID</th>
          <th>Fecha Creación</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="7" class="text-center py-5">
            <v-progress-circular indeterminate color="#ff7424"></v-progress-circular>
          </td>
        </tr>
        <tr v-else-if="asignaturasFiltradas.length === 0">
          <td colspan="7" class="text-center py-5">
            No se encontraron asignaturas
          </td>
        </tr>
        <tr v-for="asignatura in asignaturasFiltradas" :key="asignatura.idAsignatura">
          <td>{{ asignatura.idAsignatura }}</td>
          <td>{{ asignatura.nombre }}</td>
          <td>
            <span class="descripcion-truncada">{{ asignatura.descripcion }}</span>
          </td>
          <td>{{ asignatura.idCurso }}</td>
          <td>{{ formatDate(asignatura.fechaCreacion) }}</td>
          <td>
            <img 
              v-if="asignatura.imagen" 
              :src="asignatura.imagen" 
              alt="Imagen de asignatura" 
              class="asignatura-img"
            />
            <span v-else>Sin imagen</span>
          </td>
          <td>
            <div class="actions-container">
              <v-btn
                icon
                variant="text"
                color="primary"
                size="small"
                @click="openEditForm(asignatura)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              
              <v-btn
                icon
                variant="text"
                color="error"
                size="small"
                @click="prepareDelete(asignatura.idAsignatura)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Formulario para crear/editar -->
    <v-dialog v-model="showForm" max-width="600px">
      <v-card>
        <v-card-title>
          <span>{{ isEditing ? 'Editar' : 'Nueva' }} Asignatura</span>
        </v-card-title>
        
        <v-card-text>
          <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
            {{ errorMessage }}
          </v-alert>
          
          <v-alert v-if="successMessage" type="success" variant="tonal" class="mb-4">
            {{ successMessage }}
          </v-alert>
          
          <v-form @submit.prevent="saveAsignatura">
            <v-text-field
              v-model="asignaturaForm.nombre"
              label="Nombre"
              required
            ></v-text-field>
            
            <v-textarea
              v-model="asignaturaForm.descripcion"
              label="Descripción"
              required
            ></v-textarea>
            
            <v-text-field
              v-model="asignaturaForm.imagen"
              label="URL de imagen"
            ></v-text-field>
            
            <v-text-field
              v-model.number="asignaturaForm.idCurso"
              label="ID de Curso"
              type="number"
              required
              :hint="!isEditing ? 'Probando múltiples formatos para ID de curso' : ''"
              persistent-hint
            ></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="closeForm"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="#ff7424"
            @click="saveAsignatura"
            :loading="isLoading"
          >
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de confirmación para eliminar -->
    <v-dialog v-model="confirmDelete" max-width="400px">
      <v-card>
        <v-card-title>
          ¿Eliminar asignatura?
        </v-card-title>
        
        <v-card-text>
          <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
            {{ errorMessage }}
          </v-alert>
          
          <p>Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta asignatura?</p>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="cancelDelete"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            @click="confirmDeleteAsignatura"
            :loading="isLoading"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.asignaturas-table-container {
  width: 100%;
  overflow-x: auto;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input {
  max-width: 300px;
}

.actions-container {
  display: flex;
  gap: 0.5rem;
}

.descripcion-truncada {
  display: block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asignatura-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
</style>