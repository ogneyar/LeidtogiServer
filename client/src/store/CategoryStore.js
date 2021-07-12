import {makeAutoObservable} from 'mobx'

export default class CategoryStore {
    constructor() {
        this._categoryes = []
        this._subCategoryes = []
        this._selectedCategory = {}
        makeAutoObservable(this)
    }

    setCategoryes(categoryes) {
        this._categoryes = categoryes
    }

    setSubCategoryes(sub_categoryes) {
        this._subCategoryes = sub_categoryes

        // let newCategoryStore = new CategoryStore()
        // newCategoryStore.setCategoryes(sub_categoryes)
        // this._sub_categoryes = newCategoryStore
    }
    
    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categoryes() {
        return this._categoryes
    }
    get subCategoryes() {
        return this._subCategoryes
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}