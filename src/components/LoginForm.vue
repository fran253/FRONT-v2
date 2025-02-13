<template>
  <section class="login-section">
    <h2>Iniciar sesión</h2>
    <form>
      <input type="email" placeholder="Correo electrónico" required>
      <input type="password" placeholder="Contraseña" required>
      <button type="submit" class="login-btn">Acceder</button>
      <button type="button" class="registro-btn" @click="$emit('mostrarRegistro')">Registrarse</button>
      <router-link to="/cursos" class="guest-btn">Entrar sin inicio de sesión</router-link>
 
    </form>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.login-section {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); 
  width: 80%;
  max-width: 600px;
  margin: 0 auto 30px;
  text-align: center;
  min-height: 250px; 

  h2 {
    margin-bottom: 20px;
    color: #FF5500;
  }

  input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    width: 100%;
    padding: 14px;
    border: 2px solid transparent; 
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 12px;
    transition: all 0.3s ease; 
  }

  .login-btn {
    background-color: #FF5500;
    color: white;
    border-color: #cc4400; 
  }

  .registro-btn {
    background-color: #FB7C3C;
    color: white;
    border-color: #E06A2A; 
  }

  .guest-btn {
    background-color: #ccc;
    color: black;
  }

  button:hover {
    transform: scale(1.05); 
  }
}
</style>
