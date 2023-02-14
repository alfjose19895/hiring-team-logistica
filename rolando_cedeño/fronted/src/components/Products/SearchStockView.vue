<template>
    <div class="container_ md-12">
        <div class="row">
            <div class="col-xl-12 col-md-12">

                <loading :active.sync="isLoading"
                    :can-cancel="true"
                    :on-cancel="onCancel"
                    :is-full-page="fullPage">
                </loading>          
                <div class="box col-md-12" id="sect_search">                             
                    <h4 class="header-title mb-3">SEARCH PRODUCTS WITH STOCK</h4>   
                    <div id="form_search">
                        <form  class="form-horizontal form-label-left " autocomplete="off">
                            <div class="form-group">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Filter Product <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <Select2 v-model="dataCategory.filtro_product"
                                        id="filtro_product"
                                        :options="cmb_filtro_product"
                                        :change="cambioFilterProduct()"
                                        :settings="{width:'100%' }" 
                                        placeholder="Select an option"/>
                                </div>
                            </div> 
                            <div class="form-group"  id="sect_prod" style="display: none;">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Product <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <select2ajax v-model="dataCategory.product" class="input_prod select2" id='cmb_prod' :callback="url_search_prod"  placeholder="Search by code or name product ">
                                    </select2ajax>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Filter Category <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <Select2 v-model="dataCategory.filtro_category"
                                        id="filtro_category"
                                        :options="cmb_filtro_category"
                                        :change="cambioFiltroCategory()"
                                        :settings="{width:'100%' }" 
                                        placeholder="Select an option"/>
                                </div>
                            </div> 
                            <div class="form-group" id="sect_cat" style="display: none;">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Category <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <Select2 v-model="dataCategory.category"
                                        id="categories"
                                        :options="cmb_categories"
                                        :settings="{width:'100%' }" 
                                        placeholder="Select an option"/>
                                </div>
                            </div> 
                           
                            <div class="form-group">
                                <div class="col-md-12 col-sm-6 col-xs-12 col-md-offset-2">                                    
                                    <button type="submit" class="btn btn-success btn-sm btn_guarda " @click.prevent="searchProduct" >Search</button>                                                                
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                        </form>
                    </div>                                 
                </div>
                <div class="box col-md-12" id="table_product_secc" style="display:none; ">      
                    <div style="margin-top:22px" >
                        <div class="col-md-12" style="margin-bottom:22px" >
                            <button type="button" class="btn btn-danger btn-sm"  @click="back()">Go Back</button>

                        </div>
                        <div class="table-responsive">                        
                            <table id="idtable_cat" ref="table_cat" class="stripe " style="width:100%">
                                <thead>
                                    <tr>
                                        <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">Id</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Stock</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in products" :key="item.id_product" id="body">
                                        <td scope="row" style="width:10%">{{item.id_product}}</td>
                                        <td style="width:20%">{{item.code}}</td>  
                                        <td style="width:10%">{{item.product}}</td>                                        
                                        <td style="width:25%">{{item.category}}</td>  
                                        <td style="width:15%">{{item.stock}}</td>  
                                       
                                       
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                   
                </div>
            </div>        
        </div>
    </div>
  
</template>

<script>
    import * as $ from 'jquery'
    import global from "../../env"
    import CategoryService from '../services/CategoryService'
    import ProductService from '../services/ProductService'
    import axios from 'axios'
    import "datatables.net-dt/js/dataTables.dataTables"
    import "datatables.net-dt/css/jquery.dataTables.min.css"
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';    
    import select2ajax from './SelectAjaxSearch.vue';
    import Select2 from 'vue3-select2-component';
    export default{
        components:{
            Loading,select2ajax,Select2
        },
        data(){           
            return{
                products:[],
                cmb_filtro_category:[],
                cmb_categories:[],
                cmb_filtro_product:[],
                dataCategory:{product:'',filtro_category:'',category:'', filtro_stock:'', filtro_product:''},
              
                errores:{},
                isLoading: false,
                fullPage: true,
                url_search_prod:global.Url+"/product-search-cmb"           
            }
        },
        mounted(){
            this.changeTitle() //Change the template header title 
            this.obtenerCmbFiltroCategory()
           
            this.obtenerCategories()
            this.obtenerCmbFilterProduct()
        },
       
        methods: {
            obtenerCmbFilterProduct(){
                for (var i = 0; i < 2; i++) {
                    if(i==0){
                        this.cmb_filtro_product.push({'id':'T','text':'Todos'});
                    }else{
                        this.cmb_filtro_product.push({'id':'F','text':'Filtrar'});
                    }
                    this.dataCategory.filtro_product="T"
                }
            },
            cambioFilterProduct(){               
                let cmb_filtrar=$('#filtro_product').val()
                if(cmb_filtrar=="T"){
                    $('#sect_prod').hide();
                }else if(cmb_filtrar=="F"){
                    $('#sect_prod').show();                                     
                }
            },
           
            obtenerCmbFiltroCategory(){
                for (var i = 0; i < 2; i++) {
                    if(i==0){
                        this.cmb_filtro_category.push({'id':'T','text':'Todos'});
                    }else{
                        this.cmb_filtro_category.push({'id':'F','text':'Filtar'});
                    }
                    this.dataCategory.filtro_category="T"
                }
            },
            cambioFiltroCategory(){               
                let cmb_filtrar=$('#filtro_category').val()
                if(cmb_filtrar=="T"){
                    $('#sect_cat').hide();
                    $('#categories').val('').change()
                }else if(cmb_filtrar=="F"){
                    $('#sect_cat').show(); 
                                    
                }
            },
            // display the message on the screen
            messageNotificacion(texto, tipo,time=7000){               
                PNotify.removeAll()
                new PNotify({
                    title: 'Information Message',
                    text: texto,
                    type: tipo,
                    hide: true,
                    delay: time,
                    styling: 'bootstrap3',
                    addclass: ''
                });
            },
            async obtenerCategories(){
                try {
                    this.isLoading = true;
                    await CategoryService.getCategoryCmb().then(res=>{
                        console.log(res.data)
                        this.isLoading = false;
                        if (res.data.error == true) {
                            this.messageNotificacion("Ocurrio un error al intentar obtener los datos de los tipo identificacion");
                            return
                        }
                        this.cmb_categories = res.data
                        console.log(this.cmb_categories)
                       
                    
                    });
                } catch (e) {
                    this.isLoading = false;
                    if (e.response.status === 401) {
                        window.location.href = "/";
                        return
                    }                    
                    this.messageNotificacion("Ocurrió un error, intentelo más tarde", "error")
                }
            },

            searchProduct(){
                //validate the fields
                let filter_product=$('#filtro_product').val()
                let product=$('#cmb_prod').val()
                let filter_category=$('#filtro_category').val()
                let category=$('#categories').val()
                let stock=$('#filtro_stock').val()

                if(filter_product == 'F'){
                    if(product == null || product==""){
                        this.messageNotificacion("Enter and select a product","error")
                        return
                    }
                }
                if(filter_category == 'F'){
                    if(category == null || category==""){
                        this.messageNotificacion("Select a category","error")
                        return
                    }
                }
                this.dataCategory.filtro_product=filter_product
                this.dataCategory.product=product
                this.dataCategory.filtro_category=filter_category
                this.dataCategory.category=category
                this.dataCategory.filtro_stock=stock
                this.searchProducts()
            },
            back(){
                $('#table_product_secc').hide()
                $('#sect_search').show()
            },
            changeTitle(){
               $('#titulo_header_content').html('STOCK')               
            },   
            // datatable style  
            table(){
                this.$nextTick(()=>{  
                    $(this.$refs.table_cat).DataTable({                        
                        "destroy":true,                    
                        order: [[ 0, "asc" ]],
                        searching:true,
                        info:true,
                        pageLength: 10,
                        sInfoFiltered:false,
                    });
                })
            }, 
            // display the message on the screen
            messageNotificacion(texto, tipo,time=7000){               
                PNotify.removeAll()
                new PNotify({
                    title: 'Information Message',
                    text: texto,
                    type: tipo,
                    hide: true,
                    delay: time,
                    styling: 'bootstrap3',
                    addclass: ''
                });
            },
            async searchProducts(){         
                try{                   
                    this.isLoading = true;
                    console.log(this.dataCategory)
                    await ProductService.searchProductStock(this.dataCategory).then(res=>{
                        this.isLoading = false;
                        console.log(res)
                        if(res.data.error==true){
                            this.messageNotificacion("An error occurred while trying to get the category data","error");
                            return
                        }
                        if(res.data.length<=0){
                            this.messageNotificacion("No data found","error");
                            return
                        }
                        $('#table_product_secc').show()
                        $('#sect_search').hide()
                        this.products=res.data
                        $(this.$refs.table_cat).DataTable().destroy();
                        this.table()
                    });
                }catch(e) {
                    this.isLoading = false;
                    console.log(e)
                    //close session
                    if(e.response.status===401){
                        window.location.href="/";
                    }else{
                       this.messageNotificacion("An error occurred, try again later","error")
                    } 
                }                
            },
           
           
        }
      
    }
      

</script>

<style>
    .select2-container .select2-selection--single .select2-selection__rendered {
        display: block;
        padding-left: 0px;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .select2-container .select2-selection--single {
        height: 33px ;
    }
    .form-control {
        height: 33px;
    }
    .form-control-sm {
        width: 300px !important;
        height:35px !important;
    }
    .table-responsive{
        overflow-x: inherit;
    }

    .desabiilitar {
        opacity: 0.5;
        pointer-events: none;
    }
 
 
    @media screen and (max-width: 767px){
        .table-responsive{
            overflow-x: auto;
        }
    }
</style>