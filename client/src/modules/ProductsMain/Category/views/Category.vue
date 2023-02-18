<template>
    <div>
        <Header titleHeader="Category" />

        <div class="container-fluid">
            <div class="card">
                <!-- <div class="card-header">
                    <h3 class="card-title">Title</h3>
                </div> -->

                <div class="card-body">
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

                            <DxColumn data-field="category_name" caption="Category Name" />
                            <DxColumn data-field="created_at" cell-template="created_at" />
                            <DxColumn data-field="updated_at" cell-template="updated_at" />
                            <DxColumn data-field="status" caption="Status" cell-template="status" />

                            <template #created_at="{ data }">
                                <span> {{ formatDate(data.data.created_at) }} </span>
                            </template>

                                <template #updated_at="{ data }">
                                <span> {{ formatDate(data.data.updated_at) }} </span>
                            </template>

                            <template #status="{ data }">
                                <div>
                                    <i v-if="data.data.status" class="fas fa-toggle-on iconToggle"></i>
                                    <i v-else class="fas fa-toggle-off iconToggle"></i>
                                </div>
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
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
import Header from '../../../../components/ContentHeader.vue'
import { toastMessage } from '@/utils/toast'

import categoryService from '../services/categoryService'
const { getAllCategory } = categoryService()

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
    name:'Category',

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
        formatDate, //function
        dataSource: [],
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
                this.dataSource = response.data
            }else{
                this.$toast.error(`[${ response.status }] ${ response.statusText}`, toastMessage())
            }
        },
    },
    created(){
        this.getCategory()
    }
}
</script>