<template>
    
    <div class="container_ md-12">
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="box col-md-12">
                    
                    <h4 class="header-title mb-3">LISTADO PRODUCTOS</h4>
                    <button type="button" class="btn btn-info">wsx</button>
                
                    <div id="tabla_persona_secc" >
                        <div class="table-responsive">
                         
                           
                            <table id="idtabla_persona" ref="tabla_persona" class="stripe " style="width:100%">
                                <thead>
                                    <tr>
                                        <th  style="text-align: center" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Categorìa</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in personas" :key="item.id" id="body">

                                        <td scope="row" style="width:10%">{{item.id}}</td>
                                        <td style="width:15%">{{item.descripcion}}</td>
                                        <td style="width:30%">{{item.categoria}}</td>
                                        <td style="width:20%">{{item.precio}} </td>
                                        <td style="width:10%">{{item.precio}}</td>
                                        <td style="width:15%">
                                           
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
</template>

<script>

    import * as $ from 'jquery'
    import axios from 'axios'

    import "datatables.net-dt/js/dataTables.dataTables"
    import "datatables.net-dt/css/jquery.dataTables.min.css"

    
    export default{
        
        data(){           

            return{
                personas:[],
             
            }
        },
        mounted(){
            // this.obtenerPersona()    
            this.obtenerPersona() 
            
        },
       
        methods: {
           
                     
            tabla(){
                this.$nextTick(()=>{   
                                 
                    $(this.$refs.tabla_persona).DataTable({                        
                        "destroy":true,                    
                        order: [[ 0, "asc" ]],
                        searching:true,
                        info:true,
                        pageLength: 5,
                        sInfoFiltered:false,
                        "language":  {
                            "lengthMenu": 'Mostrar <select class="">'+
                                                '<option value="5">5</option>'+
                                                '<option value="10">10</option>'+
                                                '<option value="20">20</option>'+
                                                '<option value="30">30</option>'+
                                                '<option value="40">40</option>'+
                                                '<option value="-1">Todos</option>'+
                                        '</select> ',
                            "search": "Buscar",
                            "searchPlaceholder": "Ingrese un criterio de busqueda",
                            "zeroRecords": "No se encontraron registros coincidentes",
                            "infoEmpty": "No hay registros para mostrar",
                            "infoFiltered": " - filtrado de MAX registros",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                            "paginate": {
                                "previous": "Anterior",
                                "next": "Siguiente"
                            }
                        }
                    });
                })
            },
      
            async obtenerPersona(){         
                try{
                    var endpoint="http:localhost:8000/server";
                    alert(endpoint)
                    await axios.get('http://localhost:8000/api/productos').then(res=>{
                        console.log(res)
                        if(res.data.error==true){
                            // mensajeNotificacion("Ocurrio un error al intentar obtener los datos de las personas");
                        }
                        this.personas=res.data
                        $(this.$refs.tabla_persona).DataTable().destroy();
                        this.tabla()

                        console.log(this.personas)
                        console.log(res.data)
                    });
                }catch(e) {
                    
                    console.log(e)
                    //si cierra sesion 
                    if(e.response.status===401){
                        window.location.href="/";
                    }

                    else if(e.response.status===403){
                        // mensajeNotificacion("Usted no tiene permisos para realizar esta accion","error")
                        this.$router.push('/admin/403')
                    }

                    else{
                        // mensajeNotificacion("Ocurrió un error, intentelo más tarde","error")
                    } 
                }
                
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