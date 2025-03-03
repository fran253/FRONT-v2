<template>
    <v-footer class="Footer__Seccion">
      <p class="Footer__Seccion__Texto">&copy; 2025 Plataforma de Aprendizaje. Todos los derechos reservados.</p>
    </v-footer>
</template>

<style lang="scss" scoped>
  .Footer__Seccion {
    background: #FB7C3C;
    padding: 20px;
    text-align: center;
    color: white;
    width: 100%;
    position: relative;
    bottom: 0;
  }

  .Footer__Seccion__Texto {
    margin-left: 0;
  }

  /* Ordenador */
  @media (min-width: 769px) {
    .footer {
      width: calc(100%);
    }
    
    .Footer__Seccion__Texto {
      margin-left: 40%;
    }
  }
</style>
  