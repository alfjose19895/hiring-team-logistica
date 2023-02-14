<template>
    <div class="container_ md-12">
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <loading :active.sync="isLoading"
                    :can-cancel="true"
                    :on-cancel="onCancel"
                    :is-full-page="fullPage">
                </loading>             

                <div class="box col-md-12" id="head_income">
                          
                    <h4 class="header-title mb-3">LIST EXISTS</h4>                  
                                  
                    <div id="table_exits_head_secc " >
                        <div class="table-responsive">                        
                            <table id="idtable_exits_head" ref="table_exits_head" class="stripe " style="width:100%">
                                <thead>
                                    <tr>
                                        <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">Id</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in exits" :key="item.idhead_exit " id="body">
                                        <td scope="row" style="width:10%">{{item.idhead_exit }}</td>
                                        <td style="width:20%">{{item.date_created}}</td>  
                                        <td style="width:40%">{{item.name_user}}</td>  
                                        <td style="width:15%">{{item.quantity_entered}}</td>                                         
                                        <td style="width:15%">
                                            <button type="button" class="btn btn-sm btn-primary " style="margin-right: 5px;" @click="details(item)" >Details</button>
                                         
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                   
                </div>
                <div class="box col-md-12" id="detail_income" style="display:none">  
                    
                    <div class="col-md-12" style="margin-top: 20px; margin-bottom: 30px;">

                        <div class="col-md-6">
                            <ul class="nav nav-pills nav-stacked">
                                <li style="border-color: white"><a><i class="fa fa-list text-red"></i> <b class="text-black" style="font-weight: 600 !important">Id</b>: <span  id="idHeadExit" style="font-weight: 500"></span></a></li>
                                <li style="border-color: white"><a><i class="fa fa-list-ol text-yellow"></i> <b class="text-black" style="font-weight: 600 !important">Quantity Products:</b> <span  id="QuantityProduct" style="font-weight: 500"></span></a></li>
                            
                            </ul>
                        </div>     
                        <div class="col-md-6">
                            <ul class="nav nav-pills nav-stacked">
                                <li style="border-color: white"><a><i class="fa fa-user text-red"></i> <b class="text-black" style="font-weight: 600 !important">Usuario:</b> <span  id="User" style="font-weight: 500"></span></a></li>
                                <li style="border-color: white"><a><i class="fa fa-calendar text-yellow"></i> <b class="text-black" style="font-weight: 600 !important">Date</b>: <span  id="Date" style="font-weight: 500"></span></a></li>
                            
                            </ul>
                        </div> 
                    </div>   
                        
                    <div class="table-responsive" style="margin-top: 20px;">                        
                        <table id="idtable_det" ref="table_det" class="stripe " style="width:100%">
                            <thead>
                                <tr>
                                    <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">Code Product</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Quantity</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in detail_exits" :key="item.iddetail_exit  " id="body">
                                    <td scope="row" style="width:20%">{{item.code_product}}</td>
                                    <td style="width:20%">{{item.product}}</td>  
                                    <td style="width:40%">{{item.category}}</td>  
                                    <td style="width:20%">{{item.quantify}}</td>                                         
                                
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-12 text-center" style=" margin-bottom: 20px;">
                        <button type="button" class="btn btn-sm btn-danger " style="margin-right: 5px;" @click="back()" >Back</button>
                    </div>
                    
                                        
                </div>
            </div>        
        </div>
    </div>
   
</template>

<script>
    import ExitService from '../services/ExitService' 
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
                exits:[],
                detail_exits:[],
                isLoading: false,
                fullPage: true             
            }
        },
        mounted(){
            this.getExits() //List of incomes registered in the database
            this.changeTitle() //Change the template header title 
        },
       
        methods: {
            changeTitle(){
               $('#titulo_header_content').html('Exits')               
            },   
            // datatable style  
            table(idtabla){
                this.$nextTick(()=>{  
                    $(`#${idtabla}`).DataTable({                     
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
            async getExits(){         
                try{                   
                    this.isLoading = true;
                    await ExitService.getAll().then(res=>{
                        this.isLoading = false;
                        if(res.data.error==true){
                            this.messageNotificacion("An error occurred while trying to get the category data","error");
                        }
                        this.exits=res.data
                        $(this.$refs.table_exits_head).DataTable().destroy();
                        this.table('idtable_exits_head')

                      
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

            async details(data){
                try{  
                    $('#idHeadExit').html('')
                    $('#QuantityProduct').html('')
                    $('#User').html('')
                    $('#Date').html('')
                    let id=data.idhead_exit                  
                    this.isLoading = true;
                    await ExitService.deatilExit(id).then(res=>{
                        this.isLoading = false;
                        if(res.data.error==true){
                            this.messageNotificacion("An error occurred while trying to get the category data","error");
                            return
                        }
                        $('#head_income').hide()
                        $('#detail_income').show()
                        this.detail_exits=res.data
                        $(this.$refs.table_det).DataTable().destroy();
                        this.table('idtable_det')
                        $('#idHeadExit').html(data.idhead_exit )
                        $('#QuantityProduct').html(data.quantity_entered)
                        $('#User').html(data.name_user)
                        $('#Date').html(data.date_created)
                      
                      
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
            back(){
                $('#head_income').show()
                $('#detail_income').hide()
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