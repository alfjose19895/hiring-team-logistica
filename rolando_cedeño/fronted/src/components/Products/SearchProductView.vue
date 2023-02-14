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
                    <h4 class="header-title mb-3">SEARCH PRODUCTS</h4>   
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
                                    
                                    <select2ajax v-model="dataCategory.product" class="input_prod select2" id='cmb_prod' :callback=" url_search_prod "  placeholder="Search by code or name product ">
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
                            <div class="form-group" id="sect_cat" style="display: nonem;">
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
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Have Stock <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <Select2 v-model="dataCategory.filtro_stock"
                                        id="filtro_stock"
                                        :options="cmb_filtro_stock"
                                        :settings="{width:'100%' }" 
                                        placeholder="Select an option"
                                        />                                   
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
                                        <th scope="col">Tiene Stock</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in products" :key="item.id_product" id="body">
                                        <td scope="row" style="width:5%">{{item.id_product}}</td>
                                        <td style="width:15%">{{item.code}}</td>  
                                        <td style="width:20%">{{item.product}}</td>                                        
                                        <td style="width:20%">{{item.category}}</td>  
                                        <td style="width:10%">{{item.stock}}</td>  
                                        <td style="width:10%">
                                            <span v-if="item.tiene_stock==1" style="min-width: 90px !important;font-size: 11px" class="label label-success estado_validado"><i class="fa fa-thumbs-up"></i>&nbsp; Si &nbsp;&nbsp;</span>
                                            <span  v-if="item.tiene_stock==0" style="min-width: 90px !important;font-size: 11px" class="label label-danger estado_validado"><i class="fa fa-thumbs-down"></i>&nbsp; No</span>
                                        </td>  
                                        <td style="width:20%">
                                            <button type="button" class="btn btn-sm btn-primary " style="margin-right: 5px;" @click="openModalEditProduct(item)" >Edit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                   
                </div>
            </div>        
        </div>
    </div>
    <!-- Modal Product -->
    <div class="modal fade" id="modal_product" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">        
                <div class="modal-body">
                    <span style="font-size: 150%; color: green" class="fa fa-edit"></span> 
                    <label id="title" class="modal-title" style="font-size: 130%; color: black ;">{{ title }}</label>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span style="font-size: 35px" aria-hidden="true">&times;</span>
                    </button>
                    <hr>                    
                    <div class="x_content x_content_border_mobil">                            
                        <form  class="form-horizontal form-label-left " autocomplete="off">
                            <div class="form-group">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Product <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <input type="text" name="name" class="form-control" v-model="dataProduct.name" id="name" minlength="1" autocomplete="off" maxlength="50" onKeyPress="if(this.value.length==50) return false;" placeholder="Enter a product">

                                    <span class="invalid-feedback" style="display:inline; color:red" role="alert" v-if="errores.name">{{errores.name[0]}}</span>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Code <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <input type="text" name="name" class="form-control" v-model="dataProduct.code" id="name" minlength="1" autocomplete="off" maxlength="50" onKeyPress="if(this.value.length==50) return false;" placeholder="Enter a code">

                                    <span class="invalid-feedback" style="display:inline; color:red" role="alert" v-if="errores.code">{{errores.code[0]}}</span>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Category <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <Select2 v-model="dataProduct.idcategory"
                                        id="filtro_category_form"
                                        :options="cmb_categories"
                                        :settings="{width:'100%' }" 
                                        placeholder="Select an option"/>
                                    <span class="invalid-feedback" style="display:inline; color:red" role="alert" v-if="errores.idcategory">{{errores.idcategory[0]}}</span>
                                </div>
                            </div> 

                            <div class="form-group">
                                <div class="col-md-12 col-sm-6 col-xs-12 col-md-offset-2">                                    
                                    <button type="submit" class="btn btn-success btn-sm btn_guarda " @click.prevent="addCategory" v-if="btnAdd">Add</button>
                                    <button type="submit" class="btn btn-success btn_act " @click.prevent="editProduct" v-if="btnEdit" >Update</button>                                
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    </div>  
    <!-- end modal category -->
</template>

<script>
    import CategoryService from '../services/CategoryService'
    import ProductService from '../services/ProductService'
    import global from "../../env"
    import * as $ from 'jquery'
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
                cmb_filtro_stock:[],
                cmb_filtro_product:[],
                dataCategory:{product:'',filtro_category:'',category:'', filtro_stock:'', filtro_product:'',filtro_stock:''},
                btnAdd:false,
                btnEdit:false,
                idProduct:'',
                dataProduct:{name:'', code:'', idcategory:''},
                errores:{},
                isLoading: false,
                fullPage: true,
                url_search_prod:global.Url+"/product-search-cmb"          
            }
        },
        mounted(){
            this.changeTitle() //Change the template header title 
            this.obtenerCmbFiltroCategory()
            this.obtenerCmbFilterStock()
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
            obtenerCmbFilterStock(){
                for (var i = 0; i < 3; i++) {
                    if(i==0){
                        this.cmb_filtro_stock.push({'id':'1','text':'Si'});
                    }else if(i==1){
                        this.cmb_filtro_stock.push({'id':'0','text':'No'});
                    }else{
                        this.cmb_filtro_stock.push({'id':'2','text':'Ambos'});
                    }
                    this.dataCategory.filtro_stock="1"
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
               $('#titulo_header_content').html('Products')               
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
                    await ProductService.searchProduct(this.dataCategory).then(res=>{
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
           
            openModalEditProduct(datos){
                this.dataProduct={name:datos.product, code:datos.code, idcategory:datos.id_category},
                this.title='Edit Product'
                this.btnAdd=false
                this.btnEdit=true
                this.idProduct=datos.id_product
                window.$('#modal_product').modal('show');
                this.errores={}
            },
           
            async editProduct(){
                try{
                    this.isLoading = true;  
                    await ProductService.update(this.idProduct, this.dataProduct).then(res=>{
                        this.isLoading = false;      
                        if(res.data.error==true){
                            this.messageNotificacion(res.data.mensaje);
                            return
                        }                        
                        this.searchProducts();
                        window.$('#modal_product').modal('hide');
                        this.messageNotificacion(res.data.mensaje,"success")
                    });
                }catch(e){
                    this.isLoading = false;      
                    if(e.response.status===401){
                        window.location.href="/";
                    }else if(e.response.status===422){
                        this.errores=e.response.data.errors
                    }else{
                        this.messageNotificacion("Ocurrió un error, intentelo más tarde","error")
                    } 
                }
            },
            async deleteCategory(id){
                swal({
                    title: "Do you want to delete the category?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, continue",
                    cancelButtonText: "No, cancel",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                (isConfirm)=> {
                    if (isConfirm) {   
                        this.isLoading = true;
                        ProductService.delete(id).then(res=>{
                            this.isLoading = false;  
                            if(res.data.error==true){
                                this.messageNotificacion(res.data.mensaje,"error")
                                return;
                            }
                            this.messageNotificacion(res.data.mensaje,"success")
                            this.getProducts();

                        }, function(e) {
                            this.isLoading = false;       
                            console.log(e)
                            //si cierra sesion 
                            if(e.response.status===401){
                                window.location.href="/";
                            }
                    
                            else{
                                this.messageNotificacion("Ocurrió un error, intentelo más tarde","error")
                            }
                            
                        });
                    }
                    sweetAlert.close();   // ocultamos la ventana de pregunta
                }) 

              
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