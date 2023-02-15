<template>
<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Code</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Stok</th>
      <th scope="col"></th>
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
        <td>
          <font-awesome-icon icon="fa-regular fa-user-pen" />
          <button type="button" class="btn btn-warning"><font-awesome-icon :icon="['fas', 'edit']"/></button>
          <button type="button" class="btn btn-danger"><font-awesome-icon :icon="['fas', 'trash']"/></button>
        </td>
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
    name: "ListaProductoComponent",
    components: {    
    },
    props: {
      refresh_data: {
        type: Boolean,
        required: false,
        default: false
      }
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
  watch: {
    refresh_data: {
      handler: function(newVal) {
        if (newVal === true) {
          this.getListProducts();
        }      
      }
    },
    /*Se sensa variable para llamar el metodo de seteo de deudor */
    deudorEdit() {
      this.setDeudor();
    }
  },
    methods: {
      submitOrden() {
        alert("ok")
      },
      getListProducts() {
        axiosInstance.get("http://127.0.0.1:8000/product").then((response) => {
          this.products=response.data;
          console.log(this.products);
          console.log(response.data);
        });
      }
    }
  }
  </script>
<style>
</style>
