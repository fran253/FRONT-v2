<template>
  <div class="container">
    <HomeHeader />
    <LoginForm v-if="mostrarLogin" @mostrarRegistro="toggleRegistro" />
    <RegisterForm v-else @mostrarLogin="toggleLogin" />
    <InfoSection />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeHeader from '@/components/HomeHeader.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import InfoSection from '@/components/InfoSection.vue';

const mostrarLogin = ref(true);

const toggleRegistro = () => (mostrarLogin.value = false);
const toggleLogin = () => (mostrarLogin.value = true);
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: auto;
  flex: 1;
  padding-top: 20px; 
}
</style>
