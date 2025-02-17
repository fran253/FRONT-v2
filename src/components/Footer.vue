<template>
    <v-footer class="footer">
      <p class="texto__footer">&copy; 2025 Plataforma de Aprendizaje. Todos los derechos reservados.</p>
    </v-footer>
  </template>
  
  <script setup></script>
  
  <style lang="scss" scoped>
  .footer {
    background: #FB7C3C;
    padding: 20px;
    text-align: center;
    color: white;
    width: calc(100%); 
    position: relative;
    bottom: 0;
    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }
  }

  .texto__footer{

    margin-left: 40%;
  }
  </style>
  