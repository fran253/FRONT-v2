<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsuarioLogeadoStore } from '@/stores/UsuarioLogeado';
import { useRouter } from 'vue-router';
import HeaderAdmin from '@/components/HeaderAdmin.vue';
import FooterAdmin from '@/components/FooterAdmin.vue';
import TablaAsignaturas from '@/components/TablaAsignaturas.vue';

const router = useRouter();
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const tab = ref('asignaturas');

// Verificar que el usuario tiene permisos de administrador
onMounted(() => {
  if (!usuarioLogeadoStore.usuarioActual) {
    router.push('/');
    return;
  }
  
  // Verificamos si el usuario actual tiene rol de administrador (id 1)
  const usuario = usuarioLogeadoStore.usuarioActual;
  const idRol = usuario.idRol || 
                (usuario.rol && usuario.rol.idRol) || 
                (usuario.rol && usuario.rol.id);
  
  if (idRol !== 1) {
    router.push('/cursos');
  }
});
</script>

<template>
  <div class="admin-layout">
    <HeaderAdmin />
    
    <main class="admin-content">
      <h1>Administración del Sistema</h1>
      
      <v-tabs v-model="tab" color="#ff7424">
        <v-tab value="asignaturas">Asignaturas</v-tab>
        <v-tab value="cursos">Cursos</v-tab>
        <v-tab value="usuarios">Usuarios</v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <v-window-item value="asignaturas">
          <section class="panel">
            <h2>Gestión de Asignaturas</h2>
            <TablaAsignaturas />
          </section>
        </v-window-item>
        
        <v-window-item value="cursos">
          <section class="panel">
            <h2>Gestión de Cursos</h2>
            <p>La gestión de cursos estará disponible próximamente.</p>
          </section>
        </v-window-item>
        
        <v-window-item value="usuarios">
          <section class="panel">
            <h2>Gestión de Usuarios</h2>
            <p>La gestión de usuarios estará disponible próximamente.</p>
          </section>
        </v-window-item>
      </v-window>
    </main>
    
    <FooterAdmin />
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

h2 {
  color: #444;
  margin-bottom: 1rem;
}

.panel {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>