import {makeAutoObservable} from 'mobx'
import { LIMIT } from '../utils/consts'


export default class ProductStore {
    constructor() {
        this._products = [] // искомые товары
        this._allProducts = [] // все товары
        this._page = 1 // номер отображаемой страницы
        this._totalCount = 0 // общее количество искомых товаров
        this._limit =  localStorage.getItem('limit') || LIMIT // сколько товаров отобразить на странице
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }
    setAllProducts(products) {
        this._allProducts = products
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setLimit(limit) {
        this._limit = limit
    }

    get products() {
        return this._products
    }
    get allProducts() {
        return this._allProducts
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}