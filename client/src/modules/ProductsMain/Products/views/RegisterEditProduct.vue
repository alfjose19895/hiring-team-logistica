<template>
    <div>
        <div class="card-body">
            <label for="" class="mb-3">
                {{ objEditProduct.code ? 'Update product' : 'Register product' }}
            </label>
            <div class="row">
                <div class="col-md-12">
                    <div class="row col-md-12">
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="code">Code <span class="text-danger">*</span></label>
                            <input v-model="objParams.code" type="text" class="form-control" id="code" placeholder="Product code" />
                            <ErrorMessage v-if="errors && errors.code" :field_error="errors.code[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="product_name">Product name <span class="text-danger">*</span></label>
                            <input v-model="objParams.product_name" type="text" class="form-control" id="product_name" placeholder="Product name" />
                            <ErrorMessage v-if="errors && errors.product_name" :field_error="errors.product_name[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="category_name">Category<span class="text-danger">*</span></label>
                            <v-select v-model="objParams.category_id" :reduce="as => as.id" :getOptionLabel="as => as.category_name" :options="arrCategory" id="category_name"> </v-select>
                            <ErrorMessage v-if="errors && errors.category_id" :field_error="errors.category_id[0]" />
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="size">Size <span class="text-danger">*</span></label>
                            <input v-model="objParams.size" type="text" class="form-control" id="size" placeholder="Size" />
                            <ErrorMessage v-if="errors && errors.size" :field_error="errors.size[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="weight">Weight <span class="text-danger">*</span></label>
                            <input v-model="objParams.weight" type="text" class="form-control" id="weight" placeholder="Weight" />
                            <ErrorMessage v-if="errors && errors.weight" :field_error="errors.weight[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="volume">Volume <span class="text-danger">*</span></label>
                            <input v-model="objParams.volume" type="text" class="form-control" id="volume" placeholder="Volume" />
                            <ErrorMessage v-if="errors && errors.volume" :field_error="errors.volume[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="price">Price <span class="text-danger">*</span></label>
                            <input v-model="objParams.price" type="text" class="form-control" id="price" placeholder="Price" />
                            <ErrorMessage v-if="errors && errors.price" :field_error="errors.price[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="quantity">Quantity <span class="text-danger">*</span></label>
                            <input v-model="objParams.quantity" type="text" class="form-control" id="quantity" placeholder="Quantity" />
                            <ErrorMessage v-if="errors && errors.quantity" :field_error="errors.quantity[0]" />
                        </div>
                        <div class="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <label for="has_stock">Has stock <span class="text-danger">*</span></label>
                            <div class="form-check">
                                <input v-model="objParams.has_stock" value='1' class="form-check-input" type="radio" name="has_stock" id="has_stockYes">
                                <label class="form-check-label" for="has_stockYes">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input v-model="objParams.has_stock" value='0' class="form-check-input" type="radio" name="has_stock" id="has_stockNo">
                                <label class="form-check-label" for="has_stockNo">
                                    No
                                </label>
                            </div>
                            <ErrorMessage v-if="errors && errors.has_stock" :field_error="errors.has_stock[0]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer justify-content-between">
            <button type="button" @click="closeForm" class="btn btn-default">Close</button>
            <button type="button" @click="createOrUpdateProduct" class="btn btn-primary float-right">
                {{ objEditProduct.code ? 'Update' : 'Save' }}
            </button>
        </div>
    </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'

import { toastMessage } from '@/utils/toast'

import productService from '../services/productService'
const { saveProduct, updateProduct } = productService()

export default {
    /**
     * @property component name
     */
    name:'RegisterEditProduct',

    props:{
        arrCategory: {
            type: Array,
            default: () => [],
            required: false
        },
        objEditProduct: {
            type: Object,
            default: () => {},
            required: false
        },
    },

    components: {
        ErrorMessage,
    },

    data: () => ({
        objParams: {},
        errors: {}
    }),

    methods: {

        createOrUpdateProduct(){
            this.objEditProduct.code ? this.updateProduct() : this.createProduct()
        },
        /**
         * @description sends the request to the updateProduct method, to update the product by selecting
         */
        async updateProduct(){
            this.errors = {}
            const objLoader = this.$loading.show();
            const response = await updateProduct( this.objParams )
            objLoader.hide()
            if ( response.status == 200 && response.statusText == 'OK' ) {
                this.$toast.success('Success', toastMessage())
                this.$emit('getProducts')
            }else{
                if (response.status == 422) {
                    this.errors = response.data.errors
                }else{
                    this.$toast.error(`[${ response.status }] ${ response.statusText} ${ response.data }`, toastMessage())
                }
            }
        },
        /**
         * @description send the request to create a product
         */
        async createProduct(){
            this.errors = {}
            const objLoader = this.$loading.show();
            const response = await saveProduct( this.objParams )
            objLoader.hide()
            if ( response.status == 200 && response.statusText == 'OK' ) {
                this.$toast.success('Success', toastMessage())
                this.$emit('getProducts')
            }else{
                if (response.status == 422) {
                    this.errors = response.data.errors
                }else{
                    this.$toast.error(`[${ response.status }] ${ response.statusText} ${ response.data }`, toastMessage())
                }
            }
        },
        /**
         * @description emits the event, closeForm which closes the product registration or editing form.
         */
        closeForm(){
            this.$emit('closeForm')
        },
    },
    created(){
        if (this.objEditProduct?.code) {
            this.objParams = { ...this.objEditProduct }
        }
    }
}
</script>