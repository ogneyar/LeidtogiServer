import { runInAction, makeAutoObservable } from 'mobx'

export default class BrandStore {
    constructor() {
        this._brands = []
        this._allBrands = []
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }
    setAllBrands(brands) {
        this._allBrands = brands
    }
    setSelectedBrand(brand) {
        runInAction(() => {
            this._selectedBrand = brand
        })
    }

    get brands() {
        return this._brands
    }
    get allBrands() {
        return this._allBrands
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}