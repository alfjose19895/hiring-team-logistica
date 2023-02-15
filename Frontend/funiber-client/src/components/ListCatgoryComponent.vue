<template>
<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">description</th>
      <th scope="col">state</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <template v-for="item in categories" :key="item.id">
      <tr>
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.description }}</td>
        <td>{{ item.state }}</td>
        <td> 
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
    name: "ListCatgoryComponent",
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
      categories:[]
    }),
    created() {
    this.getListcategories ();
  },
  props: {
      refresh_data: {
        type: Boolean,
        required: false,
        default: false
      }
    },
  methods: {
      setDatainput(item) {
        this.$emit("setDatainputParent",item)
      },
      getListcategories() {
        axiosInstance.get(import.meta.env.VITE_API_URL+"category").then((response) => {
          this.categories=response.data;
          console.log(this.categories);
          console.log(response.data);
        }).catch((error) =>{
          console.log(error.response.data)
          alert(error.response.data.detail);
        });
      },
      deleteProduct(id) {
        axiosInstance.delete(import.meta.env.VITE_API_URL+"category/"+id).then((response) => {
          alert("Registro Eliminao con Existo")
          this.getListcategories();
        }).catch((error) =>{
          console.log(error.response.data)
          alert(error.response.data.detail);
        });
      }
    },
  watch: {
    refresh_data: {
      handler: function(newVal) {
        if (newVal === true) {
          this.getListcategories();
        }      
      }
    },
  },
}
  </script>
  