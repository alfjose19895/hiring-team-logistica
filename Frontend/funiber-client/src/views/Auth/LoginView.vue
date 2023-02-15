<template>
    <div id="login">
      <div id="description">
        <h1>Logins</h1>
        <p>By ogging in you agres to the ridiculously long terms that you didn't bother to read.</p>
      </div>
      <div id="form">
        <form @submit.prevent="doLogin">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" placeholder="elon@musk.io" autocomplete="off">
          <label for="password">Password</label>&nbsp;
          <font-awesome-icon :icon="['fas', passwordFieldIcon]" @click="handlePassword"/>
          <i :class="passwordFieldIcon" v-on:click="handlePassword()" key="eyes"></i>
          <input :type="passwordFieldType" id="password" v-model="password" placeholder="**********">
          <button type="submit" @click.prevent="doLogin()">Log in</button>
          {{ this.msg }}
        </form>
      </div>
    </div>
</template>
<script setup>
/* import specific icons */
import { computed, ref,  onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data"
  }
});
const router = useRouter(); //<-- router declared outside function: CORRECT
const email = ref("");
const hidePassword = ref(true);
const password = ref("");
const passwordFieldIcon = computed(() => hidePassword.value ? "fa-eye" : "fa-eye-slash");
const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");

const handlePassword =() =>{
  hidePassword.value = !hidePassword.value;
}
const doLogin = () => {
  //emit('handlelogin', true);
 // router.push({ name: "home" });
  var bodyFormData = new FormData();
  bodyFormData.append('username', email.value);
  bodyFormData.append('password', password.value); 
  axiosInstance.post("http://127.0.0.1:8000/login/",bodyFormData).then((response) => {
    if (response.data.access_token != null ) {
      router.push({ name: "home" });
    }else{
      alert("Credenciales Incorrectas");
    }
    console.log(response.data.access_token);
  }).catch((response) =>{
    console.log(response);
        alert("Credenciales Incorrectas")
      });
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 50%;
  height: 50%;
  display: block;
}

div#app div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>