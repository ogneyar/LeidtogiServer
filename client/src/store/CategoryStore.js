import {makeAutoObservable} from 'mobx'

export default class CategoryStore {
    constructor() {
        this._categoryes = []
        this._sub_categoryes = []
        this._selectedCategory = {}
        makeAutoObservable(this)
    }

    setCategoryes(categoryes) {
        this._categoryes = categoryes
    }

    setSubCategoryes(sub_categoryes) {
        // this._sub_categoryes = sub_categoryes

        let newCategoryStore = new CategoryStore()
        this._sub_categoryes = newCategoryStore.setCategoryes(sub_categoryes)
    }
    
    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categoryes() {
        return this._categoryes
    }
    get sub_categoryes() {
        return this._sub_categoryes
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}