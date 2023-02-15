<template>
<NavbarView></NavbarView>
<form>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="validationServer02">Description</label>
      <input type="text" class="form-control is-valid" v-model="form.description" required>
    </div>
  </div>
  <div>
    <button type="button"  @click.prevent="saveCategory()" class="btn btn-outline-primary">Guardar</button>
    <button type="button" @click.prevent="cleanData()" class="btn btn-outline-info">Nuevo</button>
  </div>
</form>
<ListCatgoryComponent @setDatainputParent="setDatainput" :refresh_data="refresh_data_child"></ListCatgoryComponent>
</template>
<script>
import NavbarView from "@/views/Layouts/NavbarView.vue";
import ListCatgoryComponent from "@/components/ListCatgoryComponent.vue";
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
    ListCatgoryComponent
  },
  data: () => ({
    form: {
      id:           null,
      description:  null,
      state:        true
    },
    category:[],
    refresh_data_child: false,
  }),
  created() {
    this.getListCategory();
  },
  methods: {
    setDatainput(data) {
      console.log(data)
      this.form.id=data.id
      this.form.description=data.description
      this.form.state=data.state
    },
    cleanData(){
      this.form.id=null
      this.form.description=null
      this.form.state=true
      this.getListCategory();
    },
    saveCategory(){
      if (this.form.description === null || (this.form.description).length==0 ) {
        alert("Ingrese Descripcion")
        return
      } 
      if (this.form.id===null || this.form.id===0) {
        this.postSaveCategory();
      }else{
        this.updateModifyCategory();
        this.form.id=null
      }
    },
    getListCategory() {
      axiosInstance.get(import.meta.env.VITE_API_URL+"category").then((response) => {
        this.category=response.data;
        console.log(this.category);
        console.log(response.data);
      }).catch((error) =>{
        console.log(error.response.data)
        this.refresh_data_child=false
        alert(error.response.data.detail);
      });
    },
    postSaveCategory() {
      this.refresh_data_child=false
      axiosInstance.post(import.meta.env.VITE_API_URL+"category",this.form).then((response) => {
        console.log(response.data);
        this.refresh_data_child=true
        alert("Registro Ingresado con Exito");
        this.cleanData();
      }).catch((error) =>{
        console.log(error.response.data)
        this.refresh_data_child=false
        alert(error.response.data.detail);
      });
    },
    updateModifyCategory() {
      this.refresh_data_child=false
      axiosInstance.put(import.meta.env.VITE_API_URL+"category",this.form).then((response) => {
        console.log(response.data);
        this.refresh_data_child=true
        alert("Registro Ingresado con Exito");
        this.cleanData();
      }).catch((error) =>{
        console.log(error.response.data)
        this.refresh_data_child=false
        alert(error.response.data.detail);
      });
    }
  }
}
</script>
