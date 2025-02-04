<script>
export default {
  name: "Header",
};
</script>

<template>
  <header class="header">
    <div class="logo">
      <img src="../images/logo.png" alt="logo" class="logo-image">
    </div>
    <nav class="menu">
      <router-link to="/peliculas">PELICULAS</router-link>
      <router-link to="#">MENU</router-link>
      <router-link to="#ENCUENTRANOS">
        <img src="../images/chincheta.png" alt="Ubicación">
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
    margin-top: 4%;
    margin-bottom: 1.5%;
    padding: 1px 0;

    .logo {
        .logo-image {
            width: 250px; 
            height: auto;
        }
    }

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000; 
        background-color: #FFC300;
        display: flex;
        justify-content: center; 
        padding: 19px 0;

        a {
            color: black;
            text-decoration: none;
            font-size: 1rem; 
            font-family: 'Jura', sans-serif;
            margin: 0 50px; 

            &:hover {
                color: #333333;
            }
        }
    }
}
</style>
