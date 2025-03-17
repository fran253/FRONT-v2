<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";

// Definir la interfaz Usuario si no existe un módulo externo
interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  password: string;
  idRol: number;
}

const usuarioLogeadoStore = useUsuarioLogeadoStore();
const props = defineProps<{ mostrar: boolean }>();
const emit = defineEmits(["cerrar"]);
const router = useRouter();

const mostrarModal = ref(props.mostrar);
const esRegistro = ref(false);
const isLoading = ref<boolean>(false);
const errorMessage = ref("");

const usuario = ref<Usuario>({
  idUsuario: 0,
  nombre: "",
  email: "",
  password: "",
  idRol: 0
});

const confirmPassword = ref("");

const formEsValido = computed(() => {
  return usuario.value.email.length > 5 && usuario.value.password.length > 6;
});

const cerrarModal = () => {
  mostrarModal.value = false;
  emit("cerrar");
  usuario.value = { idUsuario: 0, nombre: "", email: "", password: "", idRol: 0 };
  confirmPassword.value = "";
  errorMessage.value = "";
};

const iniciarSesion = async () => {
  if (!formEsValido.value) {
    errorMessage.value = "Verifica tus credenciales";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const resultado = await usuarioLogeadoStore.login(usuario.value.email, usuario.value.password);
    if (resultado) {
      cerrarModal();
      router.push("/cursos");
    } else {
      errorMessage.value = usuarioLogeadoStore.errorMessage;
    }
  } catch (error: any) {
    errorMessage.value = error.message || "Error al iniciar sesión";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <v-dialog v-model="mostrarModal" persistent max-width="500px">
    <v-card>
      <v-card-title class="text-center">
        <h2>Iniciar sesión</h2>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage.length > 0" type="error" dense class="mb-3">
          {{ errorMessage }}
        </v-alert>

        <v-form @submit.prevent="iniciarSesion">
          <v-text-field v-model="usuario.email" label="Correo Electrónico" outlined dense />
          <v-text-field v-model="usuario.password" label="Contraseña" type="password" outlined dense />
          <v-btn block color="orange" type="submit" :disabled="!formEsValido" :loading="isLoading">
            Iniciar sesión
          </v-btn>
        </v-form>

        <div class="Login__opciones">
          <v-btn text color="grey" @click="cerrarModal">Cerrar</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

