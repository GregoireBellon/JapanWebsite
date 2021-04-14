import {createRouter, createWebHistory} from 'vue-router'
import FlashCards from '../views/FlashCards'
import Home from '../views/Home'
import Kanji from '../views/Kanji'
import About from '../views/About'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/flashcards',
        name: 'FlashCards',
        component: FlashCards
    },
    {
        path: '/kanji',
        name: 'Kanji',
        component: Kanji
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),routes,
})

export default router