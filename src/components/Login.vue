<!-- src/components/Login.vue -->
<template>
    <v-dialog v-model="mostrarModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-center">
          <h2>{{ esRegistro ? "Registro" : "Iniciar sesión" }}</h2>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="esRegistro ? registrarUsuario() : iniciarSesion()">
            <v-text-field v-if="esRegistro" v-model="nombre" label="Nombre" outlined dense></v-text-field>
            <v-text-field v-model="email" label="Correo Electrónico" outlined dense></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" outlined dense></v-text-field>
            <v-text-field v-if="esRegistro" v-model="confirmPassword" label="Confirmar Contraseña" type="password" outlined dense></v-text-field>
            
            <v-radio-group v-if="esRegistro" v-model="tipoUsuario">
              <v-radio label="Alumno" value="alumno"></v-radio>
              <v-radio label="Profesor" value="profesor"></v-radio>
            </v-radio-group>
  
            <v-btn block color="primary" type="submit">
              {{ esRegistro ? "Registrarse" : "Iniciar sesión" }}
            </v-btn>
          </v-form>
  
          <div class="switch-auth">
            <span @click="toggleModo">{{ esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}</span>
          </div>
  
          <div class="actions">
            <router-link to="/cursos" class="guest-btn">Entrar sin iniciar sesión</router-link>
            <v-btn text color="grey" @click="cerrarModal">Cerrar</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps({ mostrar: Boolean });
  const emit = defineEmits(["cerrar"]);
  const router = useRouter();
  
  const mostrarModal = ref(props.mostrar);
  const esRegistro = ref(false);
  const nombre = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const tipoUsuario = ref("");
  
  const toggleModo = () => {
    esRegistro.value = !esRegistro.value;
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
    emit("cerrar");
  };
  
  const iniciarSesion = () => {
    console.log("Iniciar sesión con:", email.value, password.value);
    cerrarModal();
  };
  
  const registrarUsuario = () => {
    if (password.value !== confirmPassword.value) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log({
      nombre: nombre.value,
      email: email.value,
      password: password.value,
      tipoUsuario: tipoUsuario.value,
    });
  
    alert("Registro exitoso");
    cerrarModal();
    router.push("/cursos"); // Redirige a cursos tras el registro
  };
  </script>
  
  <style scoped>
  .switch-auth {
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    color: #FF5500;
  }
  
  .switch-auth span:hover {
    text-decoration: underline;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .guest-btn {
    text-decoration: none;
    color: #FB7C3C;
  }
  </style>
  