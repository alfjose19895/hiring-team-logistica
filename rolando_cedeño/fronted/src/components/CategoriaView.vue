<template>
    <div class="container_ md-12">
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="box col-md-12">
                    <loading :active.sync="isLoading"
                    :can-cancel="true"
                    :on-cancel="onCancel"
                    :is-full-page="fullPage"></loading>                    
                    <h4 class="header-title mb-3">LIST CATEGORIES</h4>                  
                    <div class="text-right " style="margin-bottom:12px">
                        <button type="button" class="btn btn-sm btn-primary btn_agg" @click="openModalNewCategory" >New</button>
                    </div>                
                    <div id="table_cat_secc " >
                        <div class="table-responsive">                        
                            <table id="idtable_cat" ref="table_cat" class="stripe " style="width:100%">
                                <thead>
                                    <tr>
                                        <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">Code</th>
                                        <th scope="col">Name</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in categories" :key="item.idcategory" id="body">
                                        <td scope="row" style="width:20%">{{item.idcategory}}</td>
                                        <td style="width:65%">{{item.name}}</td>                                        
                                        <td style="width:20%">
                                            <button type="button" class="btn btn-sm btn-primary " style="margin-right: 5px;" @click="openModalEditCategory(item)" >Edit</button>
                                            <button type="button" class="btn btn-danger btn-sm  " @click="deleteCategory(item.idcategory)" >Delete</button>
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
    <!-- Modal Category -->
    <div class="modal fade" id="modal_category" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <label for="tipo_reb_exo_id" class="col-sm-2 control-label">Category <span style="color:red">*</span></label>
                                <div class="col-sm-9">
                                    <input type="text" name="name" class="form-control" v-model="dataCategory.name" id="name" minlength="1" autocomplete="off" maxlength="50" onKeyPress="if(this.value.length==50) return false;" placeholder="Enter a category">

                                    <span class="invalid-feedback" style="display:inline; color:red" role="alert" v-if="errores.name">{{errores.name[0]}}</span>
                                </div>
                            </div> 
                            <div class="form-group">
                                <div class="col-md-12 col-sm-6 col-xs-12 col-md-offset-2">                                    
                                    <button type="submit" class="btn btn-success btn-sm btn_guarda " @click.prevent="addCategory" v-if="btnAdd">Add</button>
                                    <button type="submit" class="btn btn-success btn_act " @click.prevent="editCategory" v-if="btnEdit" >Update</button>                                
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
    import CategoryService from './services/CategoryService'
    import * as $ from 'jquery'
    import axios from 'axios'
    import "datatables.net-dt/js/dataTables.dataTables"
    import "datatables.net-dt/css/jquery.dataTables.min.css"
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';    
    export default{
        components:{
            Loading
        },
        data(){           
            return{
                categories:[],
                dataCategory:{name:''},
                btnAdd:false,
                btnEdit:false,
                idCategory:'',
                endpoint:"http:localhost:8000/api",
                errores:{},
                isLoading: false,
                fullPage: true             
            }
        },
        mounted(){
            this.getCategories() //List of categories registered in the database
            this.changeTitle() //Change the template header title 
        },
       
        methods: {
            changeTitle(){
               $('#titulo_header_content').html('Categories')               
            },   
            // datatable style  
            table(){
                this.$nextTick(()=>{  
                    $(this.$refs.table_cat).DataTable({                        
                        "destroy":true,                    
                        order: [[ 0, "asc" ]],
                        searching:true,
                        info:true,
                        pageLength: 5,
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
            async getCategories(){         
                try{                   
                    this.isLoading = true;
                    await CategoryService.getAll().then(res=>{
                        this.isLoading = false;
                        if(res.data.error==true){
                            this.messageNotificacion("An error occurred while trying to get the category data","error");
                        }
                        this.categories=res.data
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
            openModalNewCategory(){              
                this.dataCategory={name:''}
                this.title='Add Category'
                this.btnAdd=true
                this.btnEdit=false
                this.errores={}
                window.$('#modal_category').modal('show');
            },
            openModalEditCategory(datos){
                this.dataCategory={name:datos.name}
                this.title='Edit Category'
                this.btnAdd=false
                this.btnEdit=true
                this.idCategory=datos.idcategory
                window.$('#modal_category').modal('show');
                this.errores={}
            },
            async addCategory(){
               try{
                    this.isLoading = true;             
                    await CategoryService.create(this.dataCategory).then(res=>{
                        console.log(res)
                        this.isLoading = false;  
                        if(res.data.error==true){
                            this.messageNotificacion(res.data.mensaje);
                            return
                        }
                        window.$('#modal_category').modal('hide');
                        this.getCategories()
                        this.messageNotificacion(res.data.mensaje,"success")
                   })
               }catch(e){   
                    console.log(e)
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
           async editCategory(){
                try{
                    this.isLoading = true;  
                    await CategoryService.update(this.idCategory, this.dataCategory).then(res=>{
                        this.isLoading = false;      
                        if(res.data.error==true){
                            this.messageNotificacion(res.data.mensaje);
                            return
                        }                        
                        this.getCategories();
                        window.$('#modal_category').modal('hide');
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
                        CategoryService.delete(id).then(res=>{
                            this.isLoading = false;  
                            if(res.data.error==true){
                                this.messageNotificacion(res.data.mensaje,"error")
                                return;
                            }
                            this.messageNotificacion(res.data.mensaje,"success")
                            this.getCategories();

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