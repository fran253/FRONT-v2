import { defineStore } from "pinia";
import { ref } from "vue";
import type { Usuario } from "@/types/usuario";

export const useUsuarioLogeadoStore = defineStore("usuarioLogeado", () => {
  // Estado del usuario actual
  const usuarioActual = ref<Usuario | null>(null);
  const estaAutenticado = ref(false);
  const errorMessage = ref("");

  // Método para verificar si el usuario existe en la base de datos
  async function verificarUsuario(email: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/Usuario/verificar-email?email=${email}`);
      
      if (!response.ok) {
        errorMessage.value = "Error al verificar usuario";
        return false;
      }

      const existe = await response.json();
      return existe;
    } catch (error: any) {
      errorMessage.value = error.message || "Error de conexión";
      return false;
    }
  }

  // Método para iniciar sesión
  async function login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch("/api/Usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        errorMessage.value = "Credenciales inválidas";
        return false;
      }

      const usuario = await response.json();
      usuarioActual.value = usuario;
      estaAutenticado.value = true;
      errorMessage.value = "";
      
      // Guardar en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      
      return true;
    } catch (error: any) {
      errorMessage.value = error.message || "Error al iniciar sesión";
      return false;
    }
  }

  // Método para registrar usuario
  async function registrar(usuario: Usuario): Promise<boolean> {
    try {
      const response = await fetch("/api/Usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: usuario.nombre,
          apellidos: usuario.apellido,
          gmail: usuario.email,
          telefono: usuario.telefono || '', 
          contraseña: usuario.password,
          rol: {
            idRol: usuario.idRol || 2 // Rol por defecto
          }
        })
      });

      if (!response.ok) {
        errorMessage.value = "Error al registrar usuario";
        return false;
      }

      const nuevoUsuario = await response.json();
      usuarioActual.value = nuevoUsuario;
      estaAutenticado.value = true;
      errorMessage.value = "";
      
      // Guardar en localStorage
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
      
      return true;
    } catch (error: any) {
      errorMessage.value = error.message || "Error al registrar";
      return false;
    }
  }

  // Método para cerrar sesión
  function logout() {
    usuarioActual.value = null;
    estaAutenticado.value = false;
    errorMessage.value = "";
    localStorage.removeItem('usuario');
  }

  // Método para entrar como invitado
  function entrarComoInvitado() {
    usuarioActual.value = null;
    estaAutenticado.value = false;
    errorMessage.value = "";
    localStorage.removeItem('usuario');
  }

  return {
    usuarioActual,
    estaAutenticado,
    errorMessage,
    verificarUsuario,
    login,
    registrar,
    logout,
    entrarComoInvitado
  };
});