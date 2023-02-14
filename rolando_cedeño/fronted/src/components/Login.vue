<template>
    <div class="col-md-2" ></div>
    <div class="container col-md-8" style="margin-top: 22px;">
        <div class="row box">
            <div class="col-xl-12 col-md-12" style="margin-top: 22px;">
                <form class="form-horizontal form-label-left " autocomplete="off">
                
                    <div class="form-group">
                        <label for="tipo_reb_exo_id" class="col-sm-3 control-label">User <span style="color:red">*</span></label>
                        <div class="col-sm-7">
                            <input type="text" name="email" class="form-control" v-model="dataProduct.email" id="email" minlength="1"
                                autocomplete="off" maxlength="50" onKeyPress="if(this.value.length==50) return false;"
                                placeholder="admin@admin.com">
                
                            <span class="invalid-feedback" style="display:inline; color:red" role="alert" v-if="errores.email">{{
                                errores.email[0]
                            }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="tipo_reb_exo_id" class="col-sm-3 control-label">Password <span style="color:red">*</span></label>
                        <div class="col-sm-7">
                            <input type="password" name="password" class="form-control" v-model="dataProduct.password" id="password" minlength="1"
                                autocomplete="off" maxlength="50" onKeyPress="if(this.value.length==50) return false;"
                                placeholder="password">
                
                            <span class="invalid-feedback" style="display:inline; color:red" role="alert" v-if="errores.password">{{
                                errores.password[0]
                            }}</span>
                        </div>
                    </div>
                
                
                    <div class="form-group">
                        <div class="col-md-12 col-sm-6 col-xs-12 col-md-offset-3">
                            <button type="submit" class="btn btn-success btn-sm btn_guarda " @click.prevent="login">Login</button>
                
                        </div>
                    </div>
                
                    <div class="ln_solid"></div>
                </form>
            </div>
        </div>
    
    
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials=true

import router from 'vue-router'

export default {
    data(){      
        return {
            cmb_categories:[],
            dataProduct:{email:'', password:''},
            errores:{},
            isLoading: false,
            fullPage: true,    
            user:{}         
        }
    },
    mounted(){
        $('.plantilla').hide()
        $('#titulo_header_content').html('')      
        // alert(this.$store.state.user.name)  
       
    },
    methods:{
        inicio(){

        },
        async login(){
            try{
                await this.$store.dispatch('login',this.dataProduct).then(res=>{                   
                    $('.plantilla').show()
                    this.$store.dispatch('getUser')
                    this.$router.push('/')                    
               })
               
            }catch(e){     
                   
                if(e.response.status===401){
                    this.errores={email:[]}
                    this.errores.email[0]="The email or password is incorrec"
                }
                else if(e.response.status===422){
                    this.errores=e.response.data.errors
                    $('.alert_dato').show()
                }
                else{
                    this.mensajeNotificacion("An error occurred, please try again late","error")
                } 
            }   
        
        }, 
        getUser(){
            axios.get("http://localhost:8000/api/user").then(res=>{
             console.log(res)
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
