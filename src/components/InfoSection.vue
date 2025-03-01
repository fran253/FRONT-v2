<template>
  <section class="info-section">
    <div class="info-card">
      <h3>Sube y comparte tests</h3>
      <p>Facilitamos la creación y distribución de tests para mejorar el aprendizaje.</p>
    </div>
    <div class="info-card">
      <h3>Comparte archivos y documentos</h3>
      <p>Un espacio donde los estudiantes pueden encontrar y compartir apuntes, resúmenes y ejercicios.</p>
    </div>
    <div class="info-card">
      <h3>Repositorios públicos para profesores</h3>
      <p>Los profesores pueden organizar y compartir material académico con sus alumnos de manera eficiente.</p>
    </div>
  </section>
</template>

<script setup></script>

/* Mobile First Approach */
<style lang="scss" scoped>
  .info-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 50px;
    padding: 0 15px;
  }

  .info-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    color: #333;
    text-align: center;
    width: 100%;
  }

  .info-card:nth-child(1) {
    background-color: #FF5500;
    color: white;
  }

  .info-card:nth-child(2) {
    background-color: #FB7C3C;
    color: white;
  }

  .info-card:nth-child(3) {
    background-color: #F7A277;
    color: white;
  }

  @media (min-width: 768px) {
    .info-section {
      gap: 40px;
      margin-top: 60px;
      padding: 0 30px;
    }

    .info-card {
      padding: 22px;
    }
  }

  @media (min-width: 992px) {
    .info-section {
      flex-direction: row;
      justify-content: space-between;
      gap: 50px;
      margin-top: 70px;
      padding: 0 50px;
    }

    .info-card {
      padding: 25px; 
      flex: 1;
    }
  }
</style>