<template>
<NavbarView></NavbarView>
<form>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="validationServer01">Code</label>
      <input type="text" class="form-control is-valid" 
      v-model="form.code"
      id="validationServer01" placeholder="First name"  required>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationServer02">Name</label>
      <input type="text" class="form-control is-valid" 
      v-model="form.name"
      id="validationServer02" placeholder="Last name" required>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationServerUsername">Category</label>
      <div class="form-group">
        <select class="custom-select" v-model="selected" required>
          <option v-for="item in category" v-bind:value="{ id: item.id, text: item.description }">
            {{ item.description }}
          </option>
        </select>
      </div>
      <div>Selected: {{  }}</div>
    </div>
  </div>
  <button class="btn btn-primary" @click.prevent="postRegistraProduct()">Submit form</button>
</form>
<ListaProductoComponent :refresh_data="refresh_data_child"></ListaProductoComponent>
</template>

<script>
import NavbarView from "@/views/Layouts/NavbarView.vue";
import ListaProductoComponent from "@/components/ListaProductoComponent.vue";
import axios from "axios";
const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "	application/json"
  }
});
export default {
  name: "Product",
  components: {
    NavbarView,
    ListaProductoComponent
  },
  data: () => ({
    form: {
      code:     null,
      name:     null,
      category_id: null,
      state:    true,
      stock:    true
    },
    selected:"0",
    refresh_data_child: false,
    category:[]
  }),
  created() {
    this.getListCategory();
  },
  methods: {
    submitOrden() {
      alert("ok")
    },
    getListCategory() {
      axiosInstance.get("http://127.0.0.1:8000/category").then((response) => {
        this.category=response.data;
        console.log(this.category);
        console.log(response.data);
      }).catch((response) =>{
        alert("Credenciales Incorrectas")
      });
    },
    postRegistraProduct() {
      this.form.category_id= this.selected.id;
      this.refresh_data_child=false
      axiosInstance.post("http://127.0.0.1:8000/product",this.form).then((response) => {
        this.category=response.data;
        console.log(this.category);
        console.log(response.data);
        this.refresh_data_child=true
      }).catch((response) =>{
        this.refresh_data_child=false
        alert("Credenciales Incorrectas")
      });
    }
  }
}
</script>
