<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />

  <Banner />

  <InfoCine />

  <Carrusel />

  <Mapa />

  <Footer />
</template>

<style scoped>
.banner {
  width: 100%;
  position: relative;
}

.banner-image {
  width: 100%;
  height: auto;
}

.info-section {
  padding-top: 5%;
}

.info-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 260px;
  max-width: 1200px;
  margin: 0 auto;
}

.info-logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 40px;
  width: 30%;
}

.info-logo {
  width: 100%;
  max-width: 250px;
}

.info-description {
  font-size: 1.2rem;
  line-height: 1.6;
  width: 400px;
}
</style>
