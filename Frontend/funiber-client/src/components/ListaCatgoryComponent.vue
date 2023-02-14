<template>
<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Code</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Stok</th>
    </tr>
  </thead>
  <tbody>
    <template v-for="item in products" :key="item.id">
      <tr>
        <th scope="row">1</th>
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.category.__data__.description }}</td>
        <td>{{ item.stock }}</td>
      </tr>
    </template>
  </tbody>
</table>
</template>
<script>
  import axios from "axios";
  const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "	application/json"
    }
  });
  export default {
    name: "ListaCatgoryComponent",
    components: {
      
    },
    data: () => ({
      form: {
        Code:     null,
        Name:     null,
        Category: null,
        state:    true,
        stock:    true
      },
      products:[]
    }),
    created() {
    this.getListProducts ();
  },
    methods: {
      submitOrden() {
        alert("ok")
      },
      getListProducts() {
        axiosInstance.get("http://127.0.0.1:8000/category").then((response) => {
          this.products=response.data;
          console.log(this.products);
          console.log(response.data);
        });
      }
    }
  }
  </script>
  