import Notification from "../../components/myBootstrap/Notification"
import { fetchProductSizes } from "../../http/productAPI"

export const onClickButtonBuy = async (e, product) => {
    e.stopPropagation()
    e.preventDefault()

    let size 

    let cart = localStorage.getItem('cart')
    if (cart) {

        cart = JSON.parse(cart)
        let yes 
        cart = cart.map(i => {
            if (i.id === product.id) {
                yes = "yes"
                let newValue = i.value + 1
                return {...i, value: newValue, total: i.price * newValue}
            } else return i
        })
        if (!yes) {
            size = await fetchProductSizes(product.id)
            cart = [...cart, {
                id: product.id,
                value: 1,
                name: product.name,
                article: product.article,
                price: product.price,
                img: product.img[0].small,
                total: product.price,
                size
            }]
        }
        
    }else {
        size = await fetchProductSizes(product.id)
        cart = [{
            id:product.id,
            value:1,
            name:product.name,
            article:product.article,
            price:product.price,
            img:product.img[0].small,
            total: product.price,
            size
        }]
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    // alert("Товар добавлен в корзину.")

    
    // return <Notification>ghbgfhgfh</Notification>
}