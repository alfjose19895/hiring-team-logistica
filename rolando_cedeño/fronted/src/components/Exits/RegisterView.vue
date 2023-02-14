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
                    <h4 class="header-title mb-3">REGISTER EXIT</h4>   
                   
                    <form  class="form-horizontal form-label-left " autocomplete="off">
                        <div class="form-group" >
                            <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Product <span style="color:red">*</span></label>
                            <div class="col-sm-9">
                                <select2ajax v-model="dataExit.product" class="input_prod select2" id='cmb_prod' :callback="url_search_prod" placeholder="Search by code or name product ">
                                </select2ajax>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Quantify <span style="color:red">*</span></label>
                            <div class="col-sm-8">
                                
                                <input type="number" name="quantify" class="form-control" v-model="dataExit.quantify" id="quantify" autocomplete="off"  placeholder="Enter a quantify">                                
                            </div>
                            <div class="col-md-1 col-xs-12" 
                            style="text-align-last: end;margin-top: 3px">                                    
                                <button type="submit" class="btn btn-primary btn-sm btn_guarda " @click.prevent="addCar" >Add Car</button>                                                                
                            </div>
                        </div>                            
                        
                   
                                                   
                        <div style="margin-top:22px; margin-bottom: 22px;" >
                            <!-- tabla inicial o cuando no haiga datos en el carrito -->
                            <div id="secctabla_items_sd" class="table-responsive" >
                                <table ref="tabla_item_sd"  style="color: black;font-size:13px"
                                    class="table table-striped table-bordered dataTable no-footer tble_carrito " role="grid" aria-describedby="datatable_info"
                                    id="idtabla_item_sd">
                                    <thead style="background-color:#3c8dbc; color:white; text-align: center;">
                                        <tr>
                                            <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">Code</th>
                                            <th scope="col" style="text-align:center">Name</th>
                                            <th scope="col" style="text-align:center">Category</th>
                                            <th scope="col" style="text-align:center">quantify</th>
                                            <th scope="col" style="text-align:center"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="carrito_">
                                        <tr id="sms_carrito_item">
                                            <td class="text-center" colspan="8"> <input type="hidden" nme="sms_carrito_vacio"
                                            id="sms_carrito_vacio" value="0"> No hay datos</td>
                                        </tr>
                        
                                    </tbody>
                                </table>
                            </div>   
                            <div id="secctabla_items" class="table_carrito table-responsive" style="display:none;">                     
                                <div class="table-responsive">                        
                                    <table id="idtable_cat" ref="table_cat" class="table table-striped table-bordered dataTable no-footer tble_carrito " style="width:100%; font-size: 13px;">
                                        <thead style="background-color:#3c8dbc; color:white; text-align: center;">
                                            <tr>
                                                <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">Code</th>
                                                <th scope="col" style="text-align:center">Name</th>
                                                <th scope="col" style="text-align:center">Category</th>
                                                <th scope="col" style="text-align:center">quantify</th>
                                                <th scope="col" style="text-align:center"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="carrito">
                                            <tr v-for="item in products_car" :key="item.id_product" :id=item.id_product>
                                                <td scope="row" style="width:10%">{{item.code}}</td>
                                                <td style="width:30%">{{item.product}}</td>                                        
                                                <td style="width:30%">{{item.category}}</td>  
                                                <td style="width:20%">{{item.quantify}}</td>  
                                                <td style="width:10%">
                                                    <button type="button" class="btn btn-sm btn-danger " style="margin-right: 5px;" @click="deleteItem(item.id_product)" ><i class="fa fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <input type="hidden" v-model="dataExit.idProdAdd" name="idProdAdd">
                            <input type="hidden" v-model="dataExit.ProdAdd" name="ProdAdd">
                            <input type="hidden" v-model="dataExit.CodeAdd" name="CodeAdd">
                            <input type="hidden" v-model="dataExit.CateAdd" name="CateAdd">
                            <input type="hidden" v-model="dataExit.IdCateAdd" name="IdCateAdd">
                            <input type="hidden" v-model="dataExit.QuantifyAdd" name="QuantifyAdd">
                        </div> 
                        <div class="col-md-12 text-center" style="margin-bottom: 20px;">
                            <button type="submit" class="btn btn-success btn-sm btn_guarda " @click.prevent="storeExit" >Save </button>    
                        </div>
                    </form>
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
    import * as $ from 'jquery'
    import global from "../../env"
    import ProductService from '../services/ProductService'
    import ExitService from '../services/ExitService'
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
                products_car:[],
                dataExit:{product:'',quantify:'',idProdAdd:'',ProdAdd:'',CodeAdd:'',CateAdd:'',IdCateAdd:'',QuantifyAdd:''},
                btnAdd:false,
                btnEdit:false,
                dataProduct:{name:'', code:'', idcategory:''},
                cmb_categories:[],
                errores:{},
                isLoading: false,
                fullPage: true,
                url_search_prod:global.Url+"/product-search-cmb"                
            }
        },
        mounted(){
            this.changeTitle() //Change the template header title 
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

            async addCar(){
                //validate the fields
                let product=$('#cmb_prod').val()
                let quantify=$('#quantify').val()               
                if(product == null || product==""){
                    this.messageNotificacion("Enter and select a product","error")
                    return
                }
                if(quantify == '' || quantify==undefined){
                    this.messageNotificacion("Enter a quantify","error")
                    $('#quantify').focus()
                    return                    
                }else{
                    if(quantify<=0){
                        this.messageNotificacion("Quantity must be greater than zero", "error")
                    return
                    }
                }

                 
                try{  
                
                    this.isLoading = true; 
                    await ProductService.getProduct(product).then(res=>{
                        this.isLoading = false;
                        console.log(res)
                        if(res.data.error!=false){
                            this.messageNotificacion("Ocurrio un error al intentar obtener los datos de los items");
                        }

                        globalThis.idProdSelecc=res.data.data.id_product
                        globalThis.ProdSelecc=res.data.data.product
                        globalThis.codeProdSelecc=res.data.data.code
                        globalThis.cateProdSelecc=res.data.data.category
                        globalThis.idCatProdSelecc=res.data.data.id_category
                        globalThis.currentQuantify=res.data.data.stock
                        globalThis.quant_selecc=quantify
                    
                        this.carProd()
                    });   

                }catch(e){ 
                    console.log(e)
                    this.isLoading = false;          
                    if(e.response.status===401){
                        window.location.href="/";
                        return
                    }
                    
                    this.messageNotificacion("An error occurred, please try again later","error")
                    
                }  
             
            },

            async carProd(){
                //check if that item already exists in the cart
                let lista=this.products_car.filter(datos => datos.id_product == idProdSelecc)
                if(lista.length>0){
                    let cantidad_anterior=lista[0].quantify
                    //add the old quantity with the new one
                    quant_selecc=Number(quant_selecc) + Number(cantidad_anterior)

                    if(parseFloat(currentQuantify) < parseFloat(quant_selecc)){
                        this.messageNotificacion("The quantity for this product cannot be greater than "+currentQuantify,"error")
                        return
                       
                    }
                    //remove the cart array
                    this.products_car=this.products_car.filter(datos => datos.id_product != idProdSelecc)                    
                    
                }
                if(parseFloat(currentQuantify) < parseFloat(quant_selecc)){
                    this.messageNotificacion("The quantity for this product cannot be greater than "+currentQuantify,"error")
                    return
                }

                $('#secctabla_items').show();//show the table with the items
                $('#secctabla_items_sd').hide();//hide the empty table

                //proceed to load each item to the array
                this.products_car.push({'id_product':idProdSelecc,'quantify':quant_selecc,'code':codeProdSelecc,'category':cateProdSelecc,'idcate_selecc':idCatProdSelecc, 'product':ProdSelecc});

                 //limpiamos los campos de buscar item e ingreso de cantidades 
                this.dataExit.quantify=''
                $("#cmb_prod").html('')
            },
            //If you press the remove from cart button
            deleteItem(id){
                alert(id)
                //eliminamos la fila de la tabla visual en la vista
                $('#'+id).closest('tr').remove();
                //remove the item from the cart array
                this.products_car=this.products_car.filter(datos => datos.id_product != id)
                var nfilas=$("#carrito tr").length;
                //si no hay ningun item 
                if(nfilas===0){
                    $('#secctabla_items').hide();
                    $('#secctabla_items_sd').show();
                }
            
            },
            storeExit(){
                //datos del carrito de item
                let idproduct_array=[]
                let product_array=[]
                let code_array=[]
                let category_array=[]
                let idcategory_array=[]
                let quantify_array=[]
              
                $.each(this.products_car, function(i, item){
                
                    idproduct_array.push(item.id_product)
                    product_array.push(item.product)
                    code_array.push(item.code)
                    category_array.push(item.category)
                    idcategory_array.push(item.idcate_selecc)
                    quantify_array.push(item.quantify)                    
                    
                })
               
                this.dataExit.idProdAdd=idproduct_array
                this.dataExit.ProdAdd=product_array
                this.dataExit.CodeAdd=code_array
                this.dataExit.CateAdd=category_array
                this.dataExit.IdCateAdd=idcategory_array
                this.dataExit.QuantifyAdd=quantify_array

                var nfilas=$("#carrito tr").length;
                if(nfilas===0){
                    this.messageNotificacion("You must add at least one product", "error")
                    return
                }

                console.log(this.dataExit)
                swal({
                    title: "Do you want to save the exit?",
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
                        this.processStore()
                    }
                    sweetAlert.close();   // ocultamos la ventana de pregunta
                }) 

            },
            async processStore(){
                try{                   
                    this.isLoading = true;
                    await ExitService.create(this.dataExit).then(res=>{
                        this.isLoading = false;
                        console.log(res)
                        if(res.data.error==true){
                            this.messageNotificacion(res.data.mensaje,"error");
                            return
                        }
                      
                        this.messageNotificacion(res.data.mensaje,"success");
                        this.clearFields()

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
           
            changeTitle(){
               $('#titulo_header_content').html('Exit')               
            },  
            
            clearFields(){
                this.products_car=[]
                this.dataExit={product:'',quantify:'',idProdAdd:'',ProdAdd:'',CodeAdd:'',CateAdd:'',IdCateAdd:'',QuantifyAdd:''}
                $('#secctabla_items').hide();
                $('#secctabla_items_sd').show();
                $('#carrito tr').html('')
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