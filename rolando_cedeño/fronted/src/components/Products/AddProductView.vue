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
                    <h4 class="header-title mb-3">NEW PRODUCT</h4>   
                    <div id="form_search">
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
                                    <button type="submit" class="btn btn-success btn-sm btn_guarda " @click.prevent="addProduct" >Add</button>
                                                         
                                </div>
                            </div>
                        
                            <div class="ln_solid"></div>
                        </form>
                    </div>                                 
                </div>
                
            </div>        
        </div>
    </div>
  
</template>

<script>
    import ProductService from '../services/ProductService'
    import CategoryService from '../services/CategoryService'
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
                cmb_categories:[],
                dataProduct:{name:'', code:'', idcategory:''},
                errores:{},
                isLoading: false,
                fullPage: true             
            }
        },
        mounted(){
            this.changeTitle() //Change the template header title
            this.obtenerCategories()
        },
       
        methods: {
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
                    console.log(e)
                    this.isLoading = false;
                    if (e.response.status === 401) {
                        window.location.href = "/";
                        return
                    }                    
                    this.messageNotificacion("Ocurrió un error, intentelo más tarde", "error")
                }
            },
            changeTitle(){
               $('#titulo_header_content').html('Products')               
            },   
            async addProduct(){
               try{
                    this.isLoading = true;             
                    await ProductService.create(this.dataProduct).then(res=>{
                        this.isLoading = false;  
                        if(res.data.error==true){
                            this.messageNotificacion(res.data.mensaje);
                            return
                        }
                        window.$('#modal_category').modal('hide');
                        this.limpiarCampos()
                        this.messageNotificacion(res.data.mensaje,"success")
                   })
               }catch(e){   
                    this.isLoading = false;  ; 
                    if(e.response.status===401){
                        window.location.href="/";
                    }else if(e.response.status===422){
                        this.errores=e.response.data.errors
                    }else{
                        this.messageNotificacion("An error occurred, try again later","error")
                    }  
               }
           },  
           limpiarCampos(){
                this.dataProduct={name:'', code:'', idcategory:''}
                this.errores={}
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