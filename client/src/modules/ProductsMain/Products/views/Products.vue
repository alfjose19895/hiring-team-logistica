<template>
    <div>
        <Header titleHeader="Products" />

        <div class="container-fluid">
            <div class="card">
                <RegisterEditProduct v-if="bolEditRegister"
                    @closeForm="closeForm" @getProducts="getProducts"
                    :arrCategory="arrCategory"
                    :objEditProduct="objEditProduct" />

                <template v-if="!bolEditRegister">
                    <div class="card-body">
                        <div class="row mb-4 ml-2">
                            <button type="button" @click="bolEditRegister = true" class="btn btn-primary mr-2"><i class="fas fa-plus fa-sm pr-2"></i>Add</button>
                        </div>

                        <div class="col" style="overflow-x: auto;">
                            <DxDataGrid
                                :column-auto-width="true"
                                :data-source="dataSource"
                                :row-alternation-enabled="true"
                                :show-borders="true"
                                :show-column-lines="true"
                                :show-row-lines="true"
                                id="gridContainer"
                                key-expr="id"
                            >
                                <DxColumn :width="100" :allow-sorting="false" data-field="Action" cell-template="editProduct" :allowFiltering=false />

                                <DxColumn data-field="code" />
                                <DxColumn data-field="product_name" />
                                <DxColumn data-field="has_stock" cell-template="has_stock"/>
                                <DxColumn data-field="category_name" />
                                <!-- <DxColumn data-field="product_measurements_id" /> -->
                                <DxColumn data-field="size" />
                                <DxColumn data-field="weight" />
                                <DxColumn data-field="volume" />
                                <DxColumn data-field="price" />
                                <DxColumn data-field="quantity" />
                                <DxColumn data-field="created_at" cell-template="created_at" />
                                <DxColumn data-field="updated_at" cell-template="updated_at" />

                                <template #editProduct="{ data }">
                                    <a @click="editProduct( data )" data-toggle="modal" data-target="#modal-edit">
                                        <i style="cursor: pointer;" class="fas fa-edit d-flex justify-content-center"></i>
                                    </a>
                                </template>

                                <template #has_stock="{ data }">
                                    <div>
                                        <span v-if="data.data.has_stock" style="color:green">Yes</span>
                                        <span v-else style="color:red">No</span>
                                    </div>
                                </template>

                                 <template #created_at="{ data }">
                                    <span> {{ formatDate(data.data.created_at) }} </span>
                                </template>

                                 <template #updated_at="{ data }">
                                    <span> {{ formatDate(data.data.updated_at) }} </span>
                                </template>

                                <DxHeaderFilter :visible="true" />
                                <DxSearchPanel :visible="true" :width="240" placeholder="Search..." />
                                <DxScrolling row-rendering-mode="virtual" />
                                <DxPaging :page-size="10" />
                                <DxPager :visible="true" :allowed-page-sizes="[5, 10, 'all']" :show-page-size-selector="true" :show-info="true" :show-navigation-buttons="true" />
                            </DxDataGrid>
                        </div>
                    </div>
                    <div class="card-footer"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/ContentHeader.vue'
import RegisterEditProduct from './RegisterEditProduct.vue'
import { formatDate } from '@/utils/formatDate'
import { toastMessage } from '@/utils/toast'

import categoryService from '../../Category/services/categoryService'
const { getAllCategory } = categoryService()

import productService from '../services/productService'
const { getAllProducts } = productService()

import {
    DxColumn,
    DxDataGrid,
    DxFilterRow,
    DxHeaderFilter,
    DxPager,
    DxPaging,
    DxScrolling,
    DxSearchPanel,
} from 'devextreme-vue/data-grid';

export default {
    /**
     * @property component name
     */
    name:'Products',

    components: {
        DxColumn,
        DxDataGrid,
        DxFilterRow,
        DxHeaderFilter,
        DxPager,
        DxPaging,
        DxScrolling,
        DxSearchPanel,
        Header,
        RegisterEditProduct,
    },

    data: () => ({
        formatDate, //function
        dataSource: [],
        bolEditRegister: false,
        arrCategory: [],
        objEditProduct: {}
    }),

    methods: {
        /**
         * @description gets all the category of the base
         */
        async getCategory(){

            const objLoader = this.$loading.show();
            const response = await getAllCategory()
            objLoader.hide()
            if ( response.status == 200 && response.statusText == 'OK' ) {
                this.arrCategory = response.data
            }else{
                this.$toast.error(`[${ response.status }] ${ response.statusText}`, toastMessage())
            }
        },

        /**
         * @description get all registered products
         */
        async getProducts(){
            this.dataSource = []
            this.bolEditRegister = false
            const objLoader = this.$loading.show();
            const response = await getAllProducts()
            objLoader.hide()
            if ( response.status == 200 && response.statusText == 'OK' ) {
                if (response.data.length) {
                    for (let g = 0; g < response.data.length; g++) {
                        let { id, code, product_name, has_stock, category_id, product_measurements_id, stock_inquiries_id, created_at, updated_at } = response.data[g];
                        let category_name = null
                        let size, weight, volume, price = null
                        let quantity = null

                        const category = response.data[g].category;
                        const product_measurements = response.data[g].product_measurements;
                        const stock_inquiries = response.data[g].stock_inquiries;

                        if (category.length) {
                            for (let j = 0; j < category.length; j++) {
                                const element = category[j]
                                category_name = element.category_name
                            }
                        }

                        if (product_measurements.length) {
                            for (let j = 0; j < product_measurements.length; j++) {
                                const element = product_measurements[j]
                                size = element.size
                                weight = element.weight
                                volume = price = element.volume, price
                                price = price = element.volume, price
                            }
                        }

                        if (stock_inquiries.length) {
                            for (let j = 0; j < stock_inquiries.length; j++) {
                                const element = stock_inquiries[j]
                                quantity = element.quantity
                            }
                        }

                        this.dataSource.push({
                            id, code, product_name, has_stock, category_id, category_name,
                            product_measurements_id,size, weight, volume, price,
                            stock_inquiries_id, quantity, created_at, updated_at,
                        })
                    }
                }
            }else{
                this.$toast.error(`[${ response.status }] ${ response.statusText}`, toastMessage())
            }
        },

        /**
         * @description sets the object objEditProduct, which is sent as a prop to the RegisterEditProduct component
         */
        editProduct( { data } ){
            this.objEditProduct = data
            this.bolEditRegister = true
        },

        closeForm(){
            this.bolEditRegister = !this.bolEditRegister
            this.objEditProduct = {}
        }
    },

    created(){
        this.getCategory()
        this.getProducts()
    }
}
</script>