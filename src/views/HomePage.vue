<template>
  <div class="container">
    <HomeHeader />
    <LoginForm v-if="mostrarLogin" @mostrarRegistro="toggleRegistro" />

    <v-stepper v-if="!mostrarLogin" v-model="step" :items="['Datos Personales', 'Contraseña', 'Tipo de Usuario']">
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

    <InfoSection />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HomeHeader from '@/components/HomeHeader.vue';
import LoginForm from '@/components/LoginForm.vue';
import InfoSection from '@/components/InfoSection.vue';

const router = useRouter();
const mostrarLogin = ref(true);
const step = ref(1);
const nombre = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const tipoUsuario = ref('');

const toggleRegistro = () => (mostrarLogin.value = false);

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

  alert("Registro completado");
  router.push('/cursos'); // Redirige a la página de cursos
};
</script>


<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: auto;
  flex: 1;
  margin-top: 10%;
}
</style>
