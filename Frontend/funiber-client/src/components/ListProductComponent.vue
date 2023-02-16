<template>
<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Code</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Stok</th>
      <th v-if="is_report==false" scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <template v-for="item in products" :key="item.id">
      <tr>
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.category.__data__.description }}</td>
        <td>{{ item.stock }}</td>
        <td v-if="is_report==false">
          <button type="button" class="btn btn-warning" @click="setDatainput(item)"><font-awesome-icon :icon="['fas', 'edit']"/></button>
          <button type="button" class="btn btn-danger" @click="deleteProduct(item.id)"><font-awesome-icon :icon="['fas', 'trash']"/></button>
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
    name: "ListProductComponent",
    components: {    
    },
    props: {
      refresh_data: {
        type: Boolean,
        required: false,
        default: false
      },
      refresh_data_filter: {
        type: Boolean,
        required: false,
        default: false
      },
      is_report: {
        type: Boolean,
        required: false,
        default: false
      },
      form_search: {
        type: Object,
        required: false,
        default: () => {}
      }
    },
    data: () => ({
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
    refresh_data_filter: {
      handler: function(newVal) {
        if (newVal === true) {
          console.log(this.form_search)
          this.getListProductsFilter();
        }      
      }
    }
  },
    methods: {
      setDatainput(item) {
        console.log(item)
        this.$emit("setDatainputParent",item)
      },
      getListProducts() {
        axiosInstance.get(import.meta.env.VITE_API_URL+"product").then((response) => {
          this.products=response.data;
          console.log(this.products);
          console.log(response.data);
        }).catch((error) =>{
          console.log(error.response.data)
          alert(error.response.data.detail);
        });
      },
      getListProductsFilter() {
        axiosInstance.post(import.meta.env.VITE_API_URL+"product/filter",this.form_search).then((response) => {
          this.products=response.data;
          console.log(response.data);
          this.$emit("setDatachild_filter")
        }).catch((error) =>{
          console.log(error.response.data)
          alert(error.response.data.detail);
        });
      },
      deleteProduct(id) {
        axiosInstance.delete(import.meta.env.VITE_API_URL+"product/"+id).then((response) => {
          alert("Registro Eliminao con Existo")
          this.getListProducts();
        }).catch((error) =>{
          console.log(error.response.data)
          alert(error.response.data.detail);
        });
      }
    }
  }
  </script>
<style>
</style>
