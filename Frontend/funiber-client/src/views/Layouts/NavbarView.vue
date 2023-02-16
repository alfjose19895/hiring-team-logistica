<script setup>
import { useRouter } from "vue-router";
const router = useRouter(); //<-- router declared outside function: CORRECT
const doNav = (name) => {
  router.push({ name: name});
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#" @click.prevent="doNav('home')">Resumen Jordan R.</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#" @click.prevent="doNav('product')">Producto</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="doNav('category')">Catagoria</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="doNav('reportproduct')">Reporte Producto</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>