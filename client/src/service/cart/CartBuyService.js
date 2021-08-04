import Notification from "../../components/myBootstrap/Notification"

export const onClickButtonBuy = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    let cart = localStorage.getItem('cart')
    if (cart) {

        cart = JSON.parse(cart)
        let yes 
        cart = cart.map(i => {
            if (i.id === product.id) {
                yes = "yes"
                // let number = i.value
                // number++
                return {...i, value:i.value+1}
            } else return i
        })
        if (!yes) {
            cart = [...cart, {id:product.id,value:1,name:product.name,article:null}]
        }
        
    }else {
        cart = [{id:product.id,value:1,name:product.name,article:null}]
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    // alert("Товар добавлен в корзину.")

    
    // return <Notification>ghbgfhgfh</Notification>
}