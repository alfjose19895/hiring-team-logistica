<template>
<NavbarView></NavbarView>
<form>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="validationServer02">Description</label>
      <input type="text" class="form-control is-valid" id="validationServer02" placeholder="Last name" value="Otto" required>
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
<ListaProductoComponent></ListaProductoComponent>
</template>
<script>
import NavbarView from "@/views/Layouts/NavbarView.vue";
import ListaProductoComponent from "@/components/ListaCatgoryComponent.vue";
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
      Code:     null,
      Name:     null,
      Category: null,
      state:    true,
      stock:    true
    },
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
      });
    }
  }
}
</script>
