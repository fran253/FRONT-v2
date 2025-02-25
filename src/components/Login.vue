<script setup lang="ts">
  // Imports
  import { ref, defineProps, defineEmits } from "vue";
  import { useRouter } from "vue-router";
  import type { Usuario } from "@/types/usuario"; // Importamos la interfaz Usuario

  //propiedades y eventos
  const props = defineProps<{ mostrar: boolean }>();
  const emit = defineEmits(["cerrar"]);

  // Router navegacion
  const router = useRouter();

  // Variables 
  const mostrarModal = ref(props.mostrar);
  const esRegistro = ref(false);
  const step = ref(1);

  // Datos usuario
  const usuario = ref<Usuario>({
    nombre: "",
    email: "",
    password: "",
    tipoUsuario: "",
  });

  const confirmPassword = ref("");

  // Cambiar login y registro
  const toggleModo = () => {
    esRegistro.value = !esRegistro.value;
  };

  // Cerrar
  const cerrarModal = () => {
    mostrarModal.value = false;
    emit("cerrar");
  };

  // metodo login
  const iniciarSesion = () => {
    console.log("Iniciar sesión con:", usuario.value.email, usuario.value.password);
    cerrarModal();
  };

  // metodo register
  const registrarUsuario = () => {
    if (usuario.value.password !== confirmPassword.value) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Registrando usuario:", usuario.value);
    alert("Registro exitoso");

    //cerrar y redirigir
    cerrarModal();
    router.push("/cursos"); 
  };
</script>


<template>
  <v-dialog v-model="mostrarModal" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-center">
        <h2>{{ esRegistro ? "Registro" : "Iniciar sesión" }}</h2>
      </v-card-title>
      <v-card-text>

        <v-form v-if="!esRegistro" @submit.prevent="iniciarSesion">
          <v-text-field v-model="email" label="Correo Electrónico" outlined dense></v-text-field>
          <v-text-field v-model="password" label="Contraseña" type="password" outlined dense></v-text-field>
          
          <v-btn block color="orange" type="submit">
            Iniciar sesión
          </v-btn>
        </v-form>

        <v-stepper v-else v-model="step" :items="['Datos Personales', 'Contraseña', 'Tipo de Usuario']">
          <!-- Paso 1: Nombre y Correo -->
          <template v-slot:item.1>
            <v-card title="Datos Personales" flat>
              <v-text-field v-model="nombre" label="Nombre" outlined dense></v-text-field>
              <v-text-field v-model="email" label="Correo Electrónico" outlined dense></v-text-field>
            </v-card>
          </template>

          <!-- Paso 2: Contraseña -->
          <template v-slot:item.2>
            <v-card title="Contraseña" flat>
              <v-text-field v-model="password" label="Contraseña" type="password" outlined dense></v-text-field>
              <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" type="password" outlined dense></v-text-field>
            </v-card>
          </template>

          <!-- Paso 3: Tipo de Usuario -->
          <template v-slot:item.3>
            <v-card title="Tipo de Usuario" flat>
              <v-radio-group v-model="tipoUsuario">
                <v-radio label="Alumno" value="alumno"></v-radio>
                <v-radio label="Profesor" value="profesor"></v-radio>
              </v-radio-group>
              <v-btn @click="registrarUsuario" color="success">Registrarse</v-btn>
            </v-card>
          </template>
        </v-stepper>

        <div class="switch-auth">
          <span @click="toggleModo">
            {{ esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}
          </span>
        </div>

        <div class="actions">
          <router-link to="/cursos" class="guest-btn">Entrar sin iniciar sesión</router-link>
          <v-btn text color="grey" @click="cerrarModal">Cerrar</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


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
