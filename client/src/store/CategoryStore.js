import {makeAutoObservable} from 'mobx'

export default class CategoryStore {
    constructor() {
        this._categories = []
        this._allCategories = []
        this._selectedCategory = {}
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setAllCategories(categories) {
        this._allCategories = categories
    }
    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categories() {
        return this._categories
    }
    get allCategories() {
        return this._allCategories
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}