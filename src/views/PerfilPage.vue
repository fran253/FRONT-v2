<script setup>
//imports
import { ref, watch, computed, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import UserTab from '@/components/UserTab.vue';
import Login from '@/components/Login.vue';
import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";
import AvatarRiendo from '@/components/AvatarEmote.vue';


// Store de usuario
const usuarioLogeadoStore = useUsuarioLogeadoStore();

// Variables
const drawer = ref(false);
const items = ref([{ title: 'Perfil', disabled: false }]);

// Obtener el usuario actual del store
const usuarioActual = computed(() => usuarioLogeadoStore.usuarioActual);
  
// Utilizar el nombre del usuario logueado o un valor por defecto
const nombre = computed({
  get: () => usuarioActual.value?.nombre || "Usuario",
  set: (value) => {
    // Placeholder para futura funcionalidad de edición
  }
});

// Verificar si hay un usuario en el localStorage al cargar la página
const checkUsuarioLocal = () => {
  const usuarioGuardado = localStorage.getItem('usuario');
  if (usuarioGuardado && !usuarioActual.value) {
    try {
      usuarioLogeadoStore.usuarioActual = JSON.parse(usuarioGuardado);
      usuarioLogeadoStore.estaAutenticado = true;
    } catch (error) {
      console.error("Error al recuperar usuario del localStorage:", error);
    }
  }
};

// Frases inspiradoras para el perfil
const estados = [
  "Me encanta Estudiar",
  "Soy una persona aplicada",
  "Vivan las Mates!",
  "La historia mola",
  "Fan de literatura",
  "Alumno sin igual"
];

// Ejecutar al cargar el componente
onMounted(() => {
  checkUsuarioLocal();
});
</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" />
    
    <!-- Breadcrumb -->
    <v-breadcrumbs class="PerfilPage__Breadcrumb" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="perfil-container">
      <Sidebar v-model="drawer" />

      <div class="perfil-content">
        <v-row class="perfil-row">
          <!-- Fila superior con avatar, nombre, email y frase -->
          <v-col cols="12" class="perfil-info-row">
            <v-card class="perfil-card">
              <v-row no-gutters align="center">
                <!-- Avatar -->
                <v-col cols="12" sm="3" class="perfil-avatar-container">
                  <AvatarRiendo />
                </v-col>

                <!-- Información del usuario -->
                <v-col cols="12" sm="9" class="perfil-info">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field 
                        class="perfil-nombre" 
                        label="Nombre" 
                        v-model="nombre" 
                        variant="outlined"
                        density="compact"
                        bg-color="white"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" sm="6">
                      <v-text-field
                        class="perfil-email"
                        label="Email"
                        v-model="usuarioActual.gmail"
                        variant="outlined"
                        density="compact"
                        bg-color="white"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-autocomplete 
                        class="perfil-frase" 
                        label="¿Cuál es tu frase?" 
                        :items="estados" 
                        variant="outlined"
                        density="compact"
                        bg-color="white"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Fila inferior con pestañas -->
          <v-col cols="12" class="perfil-tab-row">
            <UserTab />
          </v-col>
        </v-row>
      </div>
    </v-container>

    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
// Variables de colores
$color-primary: #FF7424;
$color-secondary: #FB7C3C;
$color-background: #f5f5f5;
$color-text: #333333;
$color-card: #ffffff;
$color-border: rgba(0, 0, 0, 0.12);

.PerfilPage__Breadcrumb {
  margin-top: 5%;
  margin-left: 5%;
  z-index: 1;
  background-color: transparent;
  padding: 0;
  box-shadow: none;
  border-radius: 0;
}

.perfil-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px);
  padding: 16px;
  background-color: $color-background;
}

.perfil-content {
  flex: 1;
  margin-top: 16px;
  width: 100%;
}

.perfil-card {
  width: 100%;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.perfil-row {
  flex-wrap: wrap;
  gap: 24px;
}

.perfil-col-izquierda {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.perfil-avatar-container {
  margin-bottom: 24px;
}

.perfil-avatar {
  border: 3px solid $color-primary;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.perfil-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.perfil-nombre, .perfil-email, .perfil-frase {
  border-radius: 8px;
  
  :deep(.v-field__outline) {
    color: $color-primary;
  }
  
  :deep(.v-field__input) {
    color: $color-text;
    font-weight: 500;
  }
  
  :deep(.v-label) {
    color: $color-secondary;
  }
}

.perfil-col-derecha {
  display: flex;
  padding: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .PerfilPage__Breadcrumb {
    margin-top: 5%;
  }
  
  .perfil-card {
    padding: 12px;
  }
  
  .perfil-row {
    gap: 12px;
  }
  
  .perfil-avatar-container {
    margin-bottom: 16px;
  }
  
  .perfil-avatar {
    width: 100px;
    height: 100px;
  }
  
  .perfil-info-row, .perfil-tab-row {
    padding: 0 8px;
  }
}

@media (min-width: 769px) {
  .perfil-container {
    flex-direction: row;
    padding: 16px;
  }
  
  .perfil-content {
    margin-left: 16px;
  }
  
  .perfil-avatar-container {
    padding: 0;
  }
  
  .perfil-info {
    padding: 0 8px;
  }
  
  .perfil-info-row {
    margin-bottom: 20px;
  }
}

/* Desktop (992px y superior) */
@media (min-width: 992px) {
  .PerfilPage__Breadcrumb {
    margin-left: 5%;
  }
  
  .perfil-container {
    padding: 24px;
  }
  
  .perfil-content {
    margin-left: 20px;
  }
}
</style>