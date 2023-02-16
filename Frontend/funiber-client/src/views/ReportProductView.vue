<template>
<NavbarView></NavbarView>
<form>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label>Codigo</label>
      <input type="text" class="form-control" 
      v-model="form_search.code"
      placeholder="Codigo">
    </div>
    <div class="col-md-4 mb-3">
      <label>Descripcion</label>
      <input type="text" class="form-control" 
      v-model="form_search.name"
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
    <div class="col-md-4 mb-3">
      <label>Sctock</label>
      <div class="form-group">
        <select class="custom-select" v-model="selectedStock">
          <option disabled value="null">Seleccione un elemento</option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  </div>
  <div>
    <button type="button"  @click.prevent="searchProduct()" class="btn btn-outline-primary">Buscar</button>
  </div>
</form>
<ListProductComponent :refresh_data_filter="refresh_data_child_filter"
 @setDatachild_filter="setRefresh_data_child_filter" :is_report="true"
 :form_search="form_search"></ListProductComponent>

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
  name: "ReportProductView",
  components: {
    NavbarView,
    ListProductComponent
  },
  data: () => ({
    form_search: {
      code:       null,
      name:       null,
      category_id:null,
      stock:      null
    },
    selectedStock:"null",
    selected:0,
    category:[],
    refresh_data_child_filter: false
  }),
  created() {
    this.getListCategory();
  },
  methods: {
    setRefresh_data_child_filter() {
      this.refresh_data_child_filter= false
    },
    getListCategory() {
      axiosInstance.get(import.meta.env.VITE_API_URL+"category").then((response) => {
        this.category=response.data;
        console.log(this.category);
        console.log(response.data);
      }).catch((error) =>{
          console.log(error.response.data)
          alert(error.response.data.detail);
        });
    },
    searchProduct(){
      this.form_search.stock=  this.selectedStock ==="null"? null : this.selectedStock
      this.form_search.category_id=this.selected ===0? null : this.selected
      this.form_search.code=  this.form_search.code ===""? null : this.form_search.code
      this.form_search.name=  this.form_search.name ===""? null : this.form_search.name
      this.refresh_data_child_filter=true
    }
  }
}
</script>
