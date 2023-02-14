<script setup>
import { useRouter } from "vue-router";
const router = useRouter(); //<-- router declared outside function: CORRECT
const doNav = (name) => {
  router.push({ name: name});
};
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click.prevent="doNav('product')">Product</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="doNav('about') ">Category</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="doNav('login')">Report Product</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>