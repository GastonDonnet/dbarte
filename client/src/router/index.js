import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tienda',
    name: 'Tienda',
    component: () =>
      import(/* webpackChunkName: "tienda" */ '../views/Tienda.vue')
  },
  {
    path: '/cuadro/:id',
    name: 'Cuadro',
    component: () =>
      import(/* webpackChunkName: "cuadro" */ '../views/CuadroDetalles.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
