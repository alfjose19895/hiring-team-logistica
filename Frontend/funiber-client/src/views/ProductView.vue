<template>
<NavbarView></NavbarView>
<form>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label>Codigo</label>
      <input type="text" class="form-control" 
      v-model="form.code"
      placeholder="Codigo">
    </div>
    <div class="col-md-4 mb-3">
      <label>Descripcion</label>
      <input type="text" class="form-control" 
      v-model="form.name"
      placeholder="Descripcion">
    </div>
    <div class="col-md-4 mb-3">
      <label>Categoria</label>
      <div class="form-group">
        <select class="custom-select" v-model="selected">
          <option disabled value="0">Seleccione un elemento</option>
          <option  v-for="item in category" v-bind:value="item.id">
            {{ item.description }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div>
    <button type="button"  @click.prevent="saveProduct()" class="btn btn-outline-primary">Guardar</button>
    <button type="button" @click.prevent="cleanData()" class="btn btn-outline-info">Nuevo</button>
  </div>
</form>
<ListProductComponent :refresh_data="refresh_data_child" @setDatainputParent="setDatainput" :is_report="false"></ListProductComponent>
</template>

<script>
import NavbarView from "@/views/Layouts/NavbarView.vue";
import ListProductComponent from "@/components/ListProductComponent.vue";
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
    ListProductComponent
  },
  data: () => ({
    form: {
      id  :     null,
      code:     null,
      name:     null,
      category_id: null,
      state:    true,
      stock:    true
    },
    selected:0,
    refresh_data_child: false,
    category:[]
  }),
  created() {
    this.getListCategory();
  },
  methods: {
    setDatainput(data) {
      console.log(data)
      this.form.id=data.id
      this.form.code=data.code
      this.form.name=data.name
      this.form.category_id=data.category_id
      this.selected= data.category_id
      console.log(this.selected)
    },
    cleanData(){
      this.form.code=null
      this.form.name=null
      this.form.category_id=0
      this.getListCategory();
      this.selected=0
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
    saveProduct(){
      if (this.form.code === null || (this.form.code).length==0 ) {
        alert("Ingrese Codigo")
        return
      }
      if (this.form.name === null || (this.form.name).length==0 ) {
        alert("Ingrese Nombre")
        return
      }
      if (this.selected==0 ) {
        alert("Seleccione Categoria")
        return
      }
      if (this.form.id===null || this.form.id===0) {
        this.postSaveProduct();
      }else{
        this.updateModifyProduct();
        this.form.id=null
      }
    },
    postSaveProduct() {
      this.form.category_id= this.selected;
      this.refresh_data_child=false
      axiosInstance.post(import.meta.env.VITE_API_URL+"product",this.form).then((response) => {
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
    updateModifyProduct() {
      this.form.category_id= this.selected;
      this.refresh_data_child=false
      axiosInstance.put(import.meta.env.VITE_API_URL+"product",this.form).then((response) => {
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
