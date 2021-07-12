import {makeAutoObservable} from 'mobx'

export default class BrandStore {
    constructor() {
        this._brands = []
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }
    setSelectedBrand(brand) {
    //     this.setPage(1)
        this._selectedBrand = brand
    }

    get brands() {
        return this._brands
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}