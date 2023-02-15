

<template>
    <div>
        <Header titleHeader="Product Change History"  />

         <div class="container-fluid">
            <div class="card">
                <div class="card-body">
                    <div class="col" style="overflow-x: auto;">
                        <DxDataGrid
                            :column-auto-width="true"
                            :data-source="dataSource"
                            :row-alternation-enabled="true"
                            :show-borders="true"
                            :show-column-lines="true"
                            :show-row-lines="true"
                            key-expr="id"
                            id="gridContainer"
                        >
                            <DxColumn data-field="product_name" />
                            <DxColumn data-field="category_name" />
                            <DxColumn data-field="product_history"/>

                            <DxHeaderFilter :visible="true" />
                            <DxSearchPanel :visible="true" :width="240" placeholder="Search..." />
                            <DxScrolling row-rendering-mode="virtual" />
                            <DxPaging :page-size="10" />
                            <DxPager :visible="true" :allowed-page-sizes="[5, 10, 'all']" :show-page-size-selector="true" :show-info="true" :show-navigation-buttons="true" />
                        </DxDataGrid>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/ContentHeader.vue'

import { toastMessage } from '@/utils/toast'

import productChangeHistoryService from '../services/productChangeHistoryService'
const { getAllProductChangeHistory } = productChangeHistoryService()

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
    name:'ProductChangeHistory',

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
    },
        data: () => ({
        dataSource: [],
    }),
    methods: {

        async getAllProductChangeHistory(){
            const objLoader = this.$loading.show();
            const response = await getAllProductChangeHistory()
            objLoader.hide()
            if ( response.status == 200 && response.statusText == 'OK' ) {
                if (response.data.length) {
                    for (let g = 0; g < response.data.length; g++) {
                        let { id, product_history } = response.data[g];
                        let product_name, category_name = null
                        const product = response.data[g].product;
                        const category = response.data[g].category;

                        if (product.length) {
                            for (let j = 0; j < product.length; j++) {
                                product_name = product[j].product_name
                            }
                        }
                        if (category.length) {
                            for (let j = 0; j < category.length; j++) {
                                category_name = category[j].category_name
                            }
                        }
                        this.dataSource.push({product_name, category_name, id, product_history})
                    }
                }
            }else{
                this.$toast.error(`[${ response.status }] ${ response.statusText}`, toastMessage())
            }
        },
    },
    created(){
        this.getAllProductChangeHistory()
    }
}
</script>