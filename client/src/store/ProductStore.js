import {makeAutoObservable} from 'mobx'
import { LIMIT } from '../utils/consts'


export default class ProductStore {
    constructor() {        
        this._products = []
        this._page = 1
        this._totalCount = 0
        this._limit = LIMIT
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
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