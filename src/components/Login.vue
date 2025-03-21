<script setup lang="ts">
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";
  import type { Usuario } from "@/stores/dtos/UsuarioDTO";

  const usuarioLogeadoStore = useUsuarioLogeadoStore();
  const props = defineProps<{ mostrar: boolean }>();
  const emit = defineEmits(["cerrar"]);
  const router = useRouter();

  const mostrarModal = ref(props.mostrar);
  const esRegistro = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const usuario = ref<Usuario>({
    nombre: "",
    email: "",
    password: "",
    tipoUsuario: "",
    idRol: undefined, // Añadimos el campo idRol
  });

  const confirmPassword = ref("");

  const camposValidos = computed(() => ({
    nombre: esRegistro.value ? usuario.value.nombre.length >= 2 : true,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.value.email),
    password: usuario.value.password.length >= 6,
    passwordMatch: !esRegistro.value || usuario.value.password === confirmPassword.value,
    tipoUsuario: !esRegistro.value || ["alumno", "profesor"].includes(usuario.value.tipoUsuario),
  }));

  const formEsValido = computed(() => {
    return esRegistro.value
      ? Object.values(camposValidos.value).every((v) => v === true)
      : camposValidos.value.email && camposValidos.value.password;
  });

  const toggleModo = () => {
    esRegistro.value = !esRegistro.value;
    resetFormulario();
  };

  // Resetear formulario
  const resetFormulario = () => {
    usuario.value = {
      nombre: "",
      email: "",
      password: "",
      tipoUsuario: "",
      idRol: undefined,
    };
    confirmPassword.value = "";
    errorMessage.value = "";
  };

  const cerrarModal = () => {
    mostrarModal.value = false;
    emit("cerrar");
    usuario.value = { nombre: "", email: "", password: "", tipoUsuario: "" };
    confirmPassword.value = "";
    errorMessage.value = "";
  };

  const entrarComoInvitado = () => {
    usuarioLogeadoStore.entrarComoInvitado();
    cerrarModal();
    router.push("/cursos");
  };

  const redirigirSegunRol = () => {
    if (usuarioLogeadoStore.usuarioActual) {
      const usuario = usuarioLogeadoStore.usuarioActual;
      
      const idRol = usuario.idRol || 
                    (usuario.rol && usuario.rol.idRol) || 
                    (usuario.rol && usuario.rol.id);
      
      console.log("ID del rol:", idRol);
      
      if (idRol === 1) {
        router.push("/admin");
      } else {
        router.push("/cursos");
      }
    } else {
      router.push("/cursos");
    }
  };

  // Metodo login
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
        // Usar el nuevo método de redirección según rol
        redirigirSegunRol();
      } else {
        errorMessage.value = usuarioLogeadoStore.errorMessage;
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Error al iniciar sesión";
    } finally {
      isLoading.value = false;
    }
  };

  const registrarUsuario = async () => {
    if (!formEsValido.value) {
      errorMessage.value = "Completa todos los campos correctamente";
      return;
    }

    isLoading.value = true;
    errorMessage.value = "";

    try {
      // Asignar el idRol según el tipo de usuario
      let idRol = 2; // Valor por defecto (profesor)
      if (usuario.value.tipoUsuario === 'profesor') {
        idRol = 2; // Rol de profesor
      } else if (usuario.value.tipoUsuario === 'alumno') {
        idRol = 3; // Rol de alumno
      }
      
      // Formato exacto según el formato Swagger verificado
      const nuevoUsuario = {
        idUsuario: 0,
        nombre: usuario.value.nombre,
        apellido: "",  // Campo vacío por defecto
        gmail: usuario.value.email,  // Mapeo de email a gmail
        telefono: "",  // Campo vacío por defecto
        contraseña: usuario.value.password,  // Mapeo de password a contraseña
        idRol: idRol
      };
      
      console.log("Datos de registro:", JSON.stringify(nuevoUsuario));
      
      // Realizar petición directa a la API
      const response = await fetch("/api/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error al registrar: ${response.status}`);
      }
      
      // Obtener la respuesta e iniciar sesión si es exitoso
      const data = await response.json();
      console.log("Registro exitoso:", data);
      
      // Iniciar sesión con las credenciales del nuevo usuario
      const resultado = await usuarioLogeadoStore.login(
        usuario.value.email, 
        usuario.value.password
      );
      

      if (resultado) {
        cerrarModal();
        redirigirSegunRol();
      } else {
        // Aunque el registro fue exitoso, no se pudo iniciar sesión
        errorMessage.value = "Registro completado. Por favor inicia sesión.";
        esRegistro.value = false; // Cambiar a modo login
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Error en el registro";
    } finally {
      isLoading.value = false;
    }
  };


  
</script>

<template>
  <v-dialog v-model="mostrarModal" persistent max-width="500px">
    <v-card>
      <v-card-title class="text-center">
        <h2>{{ esRegistro ? "Registro" : "Iniciar sesión" }}</h2>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error" dense class="mb-3">
          {{ errorMessage }}
        </v-alert>

        <v-form v-if="!esRegistro" @submit.prevent="iniciarSesion">
          <v-text-field v-model="usuario.email" label="Correo Electrónico" outlined dense />
          <v-text-field v-model="usuario.password" label="Contraseña" type="password" outlined dense />

          <v-btn block color="orange" type="submit" :disabled="!formEsValido" :loading="isLoading">
            Iniciar sesión
          </v-btn>
        </v-form>

        <v-form v-else @submit.prevent="registrarUsuario">
          <v-text-field v-model="usuario.nombre" label="Nombre" outlined dense />
          <v-text-field v-model="usuario.email" label="Correo Electrónico" outlined dense />
          <v-text-field v-model="usuario.password" label="Contraseña" type="password" outlined dense />
          <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" type="password" outlined dense />
          
          <v-radio-group v-model="usuario.tipoUsuario">
            <v-radio label="Alumno" value="alumno"></v-radio>
            <v-radio label="Profesor" value="profesor"></v-radio>
          </v-radio-group>

          <v-btn block color="success" type="submit" :disabled="!formEsValido" :loading="isLoading">
            Registrarse
          </v-btn>
        </v-form>

        <div class="Login__Switch">
          <span @click="toggleModo">
            {{ esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}
          </span>
        </div>

        <div class="Login__opciones">
          <v-btn text color="grey" @click="cerrarModal">Cerrar</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@import "@/assets/sass/layout/Login.scss";
</style>
