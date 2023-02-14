import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../components/TestPra.vue'
import CategoryComponent from '../components/CategoriaView.vue'
import SearchProductComponent from '../components/Products/SearchProductView.vue'
import AddProductComponent from '../components/Products/AddProductView.vue'
import registerIncomeComponent from '../components/Incomes/RegisterView.vue'
import listIncomeComponent from '../components/Incomes/ListView.vue'
import registerExitComponent from '../components/Exits/RegisterView.vue'
import listExitComponent from '../components/Exits/ListView.vue'
import searchStockComponent from '../components/Products/SearchStockView.vue'
import LoginComponent from '../components/Login.vue'
import RecordsComponent from '../components/Products/RecordView.vue'
import Store from '../store/index'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/productos',
    name: 'test',
    component: TestView
  },

  {
    path: '/categories',
    name: 'category',
    component: CategoryComponent,
    
  },

  {
    path: '/search-product',
    name: 'searchProduct',
    component: SearchProductComponent
  },

  {
    path: '/add-product',
    name: 'addProduct',
    component: AddProductComponent
  },

  {
    path: '/register-income',
    name: 'registerIncome',
    component: registerIncomeComponent
  },

  {
    path: '/list-income',
    name: 'listIncome',
    component: listIncomeComponent
  },

  {
    path: '/register-exit',
    name: 'registerExi',
    component: registerExitComponent
  },

  {
    path: '/list-exit',
    name: 'listExit',
    component: listExitComponent
  },

  {
    path: '/search-stock',
    name: 'searchStock',
    component: searchStockComponent
  },

  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },

  {
    path: '/records',
    name: 'records',
    component: RecordsComponent
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{

  let user= Store.state.auth
  next()

  console.log("dsds "+ user)
  if((to.name != 'login'  || to.name != 'home' ) && Store.state.user) next({name:'login'})
  else next()
})

export default router
