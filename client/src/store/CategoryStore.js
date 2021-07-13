import {makeAutoObservable} from 'mobx'

export default class CategoryStore {
    constructor() {
        this._categories = []
        this._subCategories = []
        this._selectedCategory = {}
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setSubCategories(sub_categories) {
        this._subCategories = sub_categories
    }
    
    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categories() {
        return this._categories
    }
    get subCategories() {
        return this._subCategories
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}