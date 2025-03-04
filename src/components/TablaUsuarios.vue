<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUsuarioStore } from '@/stores/Usuario';
import type { UsuarioDTO } from '@/stores/dtos/UsuarioDTO';

// Store
const usuarioStore = useUsuarioStore();

// Variables reactivas
const searchQuery = ref('');
const showForm = ref(false);
const isEditing = ref(false);
const selectedUsuario = ref<UsuarioDTO | null>(null);
const usuarioForm = ref<Partial<UsuarioDTO & {contraseña?: string}>>({
  nombre: '',
  apellido: '',
  gmail: '',
  telefono: '',
  idRol: 2, // Valor predeterminado para rol (no administrador)
  fotoPerfil: '',
  contraseña: '' // Campo vacío para la contraseña
});
const confirmDelete = ref(false);
const idToDelete = ref<number | null>(null);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);

// Lista de roles para el select
const roles = [
  { idRol: 1, nombre: 'Administrador' },
  { idRol: 2, nombre: 'Profesor' },
  { idRol: 3, nombre: 'Alumno' },
];

// Usuarios filtrados
const usuariosFiltrados = computed(() => {
  if (!searchQuery.value) return usuarioStore.usuarios;
  return usuarioStore.usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    usuario.apellido.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    usuario.gmail.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Cargar usuarios al montar el componente
onMounted(async () => {
  await usuarioStore.fetchAllUsuarios();
});

// Abrir formulario para crear
function openCreateForm() {
  showForm.value = true;
  isEditing.value = false;
  selectedUsuario.value = null;
  usuarioForm.value = {
    nombre: '',
    apellido: '',
    gmail: '',
    telefono: '',
    idRol: 2, // Default: Profesor
    fotoPerfil: '',
    contraseña: '' // Contraseña vacía
  };
  errorMessage.value = '';
  successMessage.value = '';
}

// Abrir formulario para editar
async function openEditForm(usuario: UsuarioDTO) {
  showForm.value = true;
  isEditing.value = true;
  selectedUsuario.value = usuario;
  
  // Copiar los valores para evitar modificar directamente el objeto original
  usuarioForm.value = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    gmail: usuario.gmail,
    telefono: usuario.telefono,
    idRol: usuario.idRol,
    fotoPerfil: usuario.fotoPerfil,
    contraseña: '' // Contraseña vacía para edición
  };
  errorMessage.value = '';
  successMessage.value = '';
}

// Cerrar formulario
function closeForm() {
  showForm.value = false;
  errorMessage.value = '';
  showPassword.value = false;
}

// Alternar visibilidad de la contraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Crear nuevo usuario - Formato EXACTO del Swagger
async function createUsuario() {
  if (!usuarioForm.value.nombre || !usuarioForm.value.gmail || !usuarioForm.value.contraseña) {
    errorMessage.value = "Los campos nombre, email y contraseña son obligatorios";
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    // Formato exacto según el Swagger
    const payload = {
      idUsuario: 0,
      nombre: usuarioForm.value.nombre,
      apellido: usuarioForm.value.apellido || '',
      gmail: usuarioForm.value.gmail,
      telefono: usuarioForm.value.telefono || '',
      contraseña: usuarioForm.value.contraseña,
      idRol: parseInt(String(usuarioForm.value.idRol)) || 2
    };
    
    console.log("Datos enviados al servidor (formato Swagger):", JSON.stringify(payload));
    
    const response = await fetch("/api/Usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Intentar leer la respuesta
    let responseText = '';
    try {
      responseText = await response.text();
      console.log(`Respuesta del servidor: ${response.status} - ${responseText}`);
    } catch (e) {
      console.error("No se pudo leer la respuesta:", e);
    }

    if (!response.ok) {
      throw new Error(`Error al crear el usuario. Código: ${response.status}`);
    }

    // Actualizar la lista de usuarios
    await usuarioStore.fetchAllUsuarios();
    successMessage.value = "Usuario creado con éxito";
    closeForm();
  } catch (error) {
    console.error("Error completo:", error);
    errorMessage.value = error.message || "Error al crear el usuario";
  } finally {
    isLoading.value = false;
  }
}

// Actualizar usuario existente
async function updateUsuario() {
  if (!selectedUsuario.value) return;
  
  if (!usuarioForm.value.nombre || !usuarioForm.value.gmail) {
    errorMessage.value = "Los campos nombre y email son obligatorios";
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    // Formato exacto según el Swagger
    const payload = {
      idUsuario: selectedUsuario.value.idUsuario,
      nombre: usuarioForm.value.nombre,
      apellido: usuarioForm.value.apellido || '',
      gmail: usuarioForm.value.gmail,
      telefono: usuarioForm.value.telefono || '',
      contraseña: usuarioForm.value.contraseña || selectedUsuario.value.contraseña || "",
      idRol: parseInt(String(usuarioForm.value.idRol)) || 2
    };
    
    console.log("Datos enviados al servidor para actualizar (formato Swagger):", JSON.stringify(payload));
    
    const response = await fetch(`/api/Usuario/${selectedUsuario.value.idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Intentar leer la respuesta
    let responseText = '';
    try {
      responseText = await response.text();
      console.log(`Respuesta del servidor: ${response.status} - ${responseText}`);
    } catch (e) {
      console.error("No se pudo leer la respuesta:", e);
    }

    if (!response.ok) {
      throw new Error(`Error al actualizar el usuario. Código: ${response.status}`);
    }

    // Actualizar la lista de usuarios
    await usuarioStore.fetchAllUsuarios();
    successMessage.value = "Usuario actualizado con éxito";
    closeForm();
  } catch (error) {
    console.error("Error completo:", error);
    errorMessage.value = error.message || "Error al actualizar el usuario";
  } finally {
    isLoading.value = false;
  }
}

// Guardar usuario (crear o actualizar)
async function saveUsuario() {
  if (isEditing.value) {
    await updateUsuario();
  } else {
    await createUsuario();
  }
}

// Preparar eliminación (mostrar confirmación)
function prepareDelete(id: number) {
  confirmDelete.value = true;
  idToDelete.value = id;
  errorMessage.value = '';
}

// Confirmar eliminación
async function confirmDeleteUsuario() {
  if (idToDelete.value === null) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await fetch(`/api/Usuario/${idToDelete.value}`, {
      method: "DELETE",
    });

    // Depuración
    console.log(`Respuesta DELETE: ${response.status}`);
    
    if (!response.ok) {
      try {
        const errorText = await response.text();
        console.error("Respuesta del servidor al eliminar:", errorText);
      } catch (e) {}
      
      throw new Error(`Error al eliminar el usuario. Código: ${response.status}`);
    }

    successMessage.value = "Usuario eliminado con éxito";
    
    // Actualizar la lista de usuarios
    await usuarioStore.fetchAllUsuarios();
    
    confirmDelete.value = false;
    idToDelete.value = null;
  } catch (error) {
    console.error("Error completo al eliminar:", error);
    errorMessage.value = error.message || "Error al eliminar el usuario";
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

// Obtener nombre del rol según ID
function getNombreRol(idRol: number): string {
  const rol = roles.find(r => r.idRol === idRol);
  return rol ? rol.nombre : 'Desconocido';
}
</script>

<template>
  <div class="usuarios-table-container">
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
        label="Buscar usuario"
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
        Nuevo Usuario
      </v-btn>
    </div>

    <!-- Tabla de usuarios -->
    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Rol</th>
          <th>Foto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="8" class="text-center py-5">
            <v-progress-circular indeterminate color="#ff7424"></v-progress-circular>
          </td>
        </tr>
        <tr v-else-if="usuariosFiltrados.length === 0">
          <td colspan="8" class="text-center py-5">
            No se encontraron usuarios
          </td>
        </tr>
        <tr v-for="usuario in usuariosFiltrados" :key="usuario.idUsuario">
          <td>{{ usuario.idUsuario }}</td>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellido }}</td>
          <td>{{ usuario.gmail }}</td>
          <td>{{ usuario.telefono || 'N/A' }}</td>
          <td>{{ getNombreRol(usuario.idRol) }}</td>
          <td>
            <img 
              v-if="usuario.fotoPerfil" 
              :src="usuario.fotoPerfil" 
              alt="Foto de perfil" 
              class="usuario-img"
            />
            <span v-else>Sin foto</span>
          </td>
          <td>
            <div class="actions-container">
              <v-btn
                icon
                variant="text"
                color="primary"
                size="small"
                @click="openEditForm(usuario)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              
              <v-btn
                icon
                variant="text"
                color="error"
                size="small"
                @click="prepareDelete(usuario.idUsuario)"
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
          <span>{{ isEditing ? 'Editar' : 'Nuevo' }} Usuario</span>
        </v-card-title>
        
        <v-card-text>
          <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
            {{ errorMessage }}
          </v-alert>
          
          <v-alert v-if="successMessage" type="success" variant="tonal" class="mb-4">
            {{ successMessage }}
          </v-alert>
          
          <v-form @submit.prevent="saveUsuario">
            <v-text-field
              v-model="usuarioForm.nombre"
              label="Nombre"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="usuarioForm.apellido"
              label="Apellido"
            ></v-text-field>
            
            <v-text-field
              v-model="usuarioForm.gmail"
              label="Email"
              type="email"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="usuarioForm.telefono"
              label="Teléfono"
            ></v-text-field>
            
            <v-select
              v-model="usuarioForm.idRol"
              :items="roles"
              item-title="nombre"
              item-value="idRol"
              label="Rol"
              required
            ></v-select>
            
            <v-text-field
              v-model="usuarioForm.fotoPerfil"
              label="URL de foto de perfil"
            ></v-text-field>
            
            <div class="password-field-container">
              <v-text-field
                v-model="usuarioForm.contraseña"
                :label="isEditing ? 'Nueva contraseña (dejar vacío para mantener la actual)' : 'Contraseña'"
                :type="showPassword ? 'text' : 'password'"
                :required="!isEditing"
              ></v-text-field>
              
              <v-btn
                variant="text"
                color="primary"
                icon
                @click="togglePasswordVisibility"
                class="password-toggle-btn"
              >
                <v-icon>{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
              </v-btn>
            </div>
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
            @click="saveUsuario"
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
          ¿Eliminar usuario?
        </v-card-title>
        
        <v-card-text>
          <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
            {{ errorMessage }}
          </v-alert>
          
          <p>Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este usuario?</p>
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
            @click="confirmDeleteUsuario"
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
.usuarios-table-container {
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

.usuario-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.password-field-container {
  position: relative;
}

.password-toggle-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 8px;
}
</style>