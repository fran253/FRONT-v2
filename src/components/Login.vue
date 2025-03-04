<script setup lang="ts">
  // Imports
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";
  import type { Usuario } from "@/types/usuario";

  // Store de usuario
  const usuarioLogeadoStore = useUsuarioLogeadoStore();

  //propiedades y eventos
  const props = defineProps<{ mostrar: boolean }>();
  const emit = defineEmits(["cerrar"]);

  // Router navegacion
  const router = useRouter();

  // Variables 
  const mostrarModal = ref(props.mostrar);
  const esRegistro = ref(false);
  const step = ref(1);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Datos usuario
  const usuario = ref<Usuario>({
    nombre: "",
    email: "",
    password: "",
    tipoUsuario: "",
    idRol: undefined, // Añadimos el campo idRol
  });

  const confirmPassword = ref("");

  // Validaciones
  const camposValidos = computed(() => {
    return {
      nombre: esRegistro.value ? usuario.value.nombre.length >= 2 : true,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.value.email),
      password: usuario.value.password.length >= 6,
      passwordMatch: !esRegistro.value || usuario.value.password === confirmPassword.value,
      tipoUsuario: !esRegistro.value || ['alumno', 'profesor'].includes(usuario.value.tipoUsuario)
    };
  });

  const formEsValido = computed(() => {
    return esRegistro.value 
      ? Object.values(camposValidos.value).every(v => v === true)
      : camposValidos.value.email && camposValidos.value.password;
  });

  // Cambiar login y registro
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
    step.value = 1;
    errorMessage.value = "";
  };

  // Cerrar
  const cerrarModal = () => {
    mostrarModal.value = false;
    emit("cerrar");
    resetFormulario();
  };

  // Entrar como invitado
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
      errorMessage.value = "Por favor, verifica tus credenciales";
      return;
    }

    isLoading.value = true;
    errorMessage.value = "";

    try {
      const resultado = await usuarioLogeadoStore.login(
        usuario.value.email, 
        usuario.value.password
      );

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

  // Metodo register
  const registrarUsuario = async () => {
    if (!formEsValido.value) {
      errorMessage.value = "Por favor, completa todos los campos correctamente";
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
      errorMessage.value = error.message || 'Error en el registro';
    } finally {
      isLoading.value = false;
    }
  };
</script>

<template>
  <v-dialog v-model="mostrarModal" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-center">
        <h2>{{ esRegistro ? "Registro" : "Iniciar sesión" }}</h2>
      </v-card-title>
      <v-card-text>
        <!-- Mostrar mensaje de error global -->
        <v-alert 
          v-if="errorMessage" 
          type="error" 
          dense 
          class="mb-3"
        >
          {{ errorMessage }}
        </v-alert>

        <!-- Formulario de Login -->
        <v-form v-if="!esRegistro" @submit.prevent="iniciarSesion">
          <v-text-field 
            v-model="usuario.email" 
            label="Correo Electrónico" 
            :rules="[v => !!v || 'El correo es requerido']"
            :error-messages="!camposValidos.email ? ['Correo inválido'] : []"
            outlined 
            dense
          ></v-text-field>
          
          <v-text-field 
            v-model="usuario.password" 
            label="Contraseña" 
            type="password"
            :rules="[v => !!v || 'La contraseña es requerida']"
            :error-messages="!camposValidos.password ? ['Contraseña muy corta'] : []"
            outlined 
            dense
          ></v-text-field>
          
          <v-btn 
            block 
            color="orange" 
            type="submit"
            :disabled="!formEsValido"
            :loading="isLoading"
          >
            Iniciar sesión
          </v-btn>
        </v-form>

        <!-- Formulario de Registro con Stepper -->
        <v-stepper v-else v-model="step" :items="['Datos Personales', 'Contraseña', 'Tipo de Usuario']">
          <!-- Paso 1: Nombre y Correo -->
          <template v-slot:item.1>
            <v-card title="Datos Personales" flat>
              <v-text-field 
                v-model="usuario.nombre" 
                label="Nombre" 
                :rules="[v => !!v || 'El nombre es requerido']"
                :error-messages="!camposValidos.nombre ? ['Nombre inválido'] : []"
                outlined 
                dense
              ></v-text-field>
              <v-text-field 
                v-model="usuario.email" 
                label="Correo Electrónico" 
                :rules="[v => !!v || 'El correo es requerido']"
                :error-messages="!camposValidos.email ? ['Correo inválido'] : []"
                outlined 
                dense
              ></v-text-field>
            </v-card>
          </template>

          <!-- Paso 2: Contraseña -->
          <template v-slot:item.2>
            <v-card title="Contraseña" flat>
              <v-text-field 
                v-model="usuario.password" 
                label="Contraseña" 
                type="password"
                :rules="[v => !!v || 'La contraseña es requerida']"
                :error-messages="!camposValidos.password ? ['Contraseña muy corta'] : []"
                outlined 
                dense
              ></v-text-field>
              <v-text-field 
                v-model="confirmPassword" 
                label="Confirmar Contraseña" 
                type="password"
                :rules="[v => !!v || 'Confirmar contraseña es requerido']"
                :error-messages="!camposValidos.passwordMatch ? ['Las contraseñas no coinciden'] : []"
                outlined 
                dense
              ></v-text-field>
            </v-card>
          </template>

          <!-- Paso 3: Tipo de Usuario -->
          <template v-slot:item.3>
            <v-card title="Tipo de Usuario" flat>
              <v-radio-group 
                v-model="usuario.tipoUsuario"
                :rules="[v => !!v || 'Selecciona un tipo de usuario']"
                :error-messages="!camposValidos.tipoUsuario ? ['Selecciona un tipo de usuario'] : []"
              >
                <v-radio label="Alumno" value="alumno"></v-radio>
                <v-radio label="Profesor" value="profesor"></v-radio>
              </v-radio-group>

              <v-btn 
                color="success" 
                @click="registrarUsuario"
                :disabled="!formEsValido || isLoading"
                :loading="isLoading"
              >
                Registrarse
              </v-btn>
            </v-card>
          </template>
        </v-stepper>

        <div class="switch-auth">
          <span @click="toggleModo">
            {{ esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}
          </span>
        </div>

        <div class="actions">
          <v-btn 
            class="guest-btn" 
            text 
            color="primary" 
            @click="entrarComoInvitado"
          >
            Entrar sin iniciar sesión
          </v-btn>
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
    color: #FB7C3C;
  }
</style>