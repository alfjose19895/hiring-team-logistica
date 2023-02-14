<script setup>

import NavbarView from "../src/views/Layouts/NavbarView.vue";
import { computed, ref } from "vue";
import { RouterView } from 'vue-router'
const login= ref(false);
function handlelogin(value){
  alert(value);
  login.value = value;
  console.log("aaa");
}
</script>
<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
