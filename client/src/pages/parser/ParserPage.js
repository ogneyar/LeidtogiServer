import React, { useEffect, useState, useContext } from 'react'
import { fetchParserImages } from '../../http/paserAPI';
import { updateProduct, fetchAllProducts } from '../../http/productAPI';
import InfoPage from '../info/InfoPage';
import { Context } from '../..'
import Loading from '../../components/Loading';
import { observer } from 'mobx-react-lite';


const ParserPage = observer(() => {

    const { product } = useContext(Context)

    const [state, setState] = useState([])
    const [article, setArticle] = useState("")
    const [brand, setBrand] = useState("milwaukee")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (state[0]?.big !== undefined) {
            console.log(state)
            let id
            product.allProducts.forEach(i => {
                if (i.article === article) id = i.id
            })
            if (id) {
                updateProduct(id, {img:JSON.stringify(state)})
                    .then(data => {
                        setMessage("Сохранено")
                        fetchAllProducts().then(dat => product.setAllProducts(dat))
                    })
                    .finally(data => setLoading(false))
            }else setLoading(false)
        }
    },[state])

    const onClickButton = () => {
        setLoading(true)
        setMessage("")
        fetchParserImages(brand, article).then(data => {
            setState(data)
        })
    }

    return (
        <InfoPage>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                    <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" />
                    <input className="m-3" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Введите бренд" />
                    {loading ? <Loading /> : <button className="m-3" onClick={onClickButton}>Начать парсинг сайта</button>}
                </div>
                <div className="inputBox">
                    {message && message !== ""
                    ? 
                        message
                    : "пусто"}
                </div>
            </div>
        </InfoPage>
       
    )
})

export default ParserPage;
