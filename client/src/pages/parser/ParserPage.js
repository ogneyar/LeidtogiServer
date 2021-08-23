import React, { useEffect, useState, useContext } from 'react'
import { fetchParserImages, fetchParserSizes } from '../../http/paserAPI';
import { updateProductOnArticle, fetchAllProducts } from '../../http/productAPI';
import InfoPage from '../info/InfoPage';
import { Context } from '../..'
import Loading from '../../components/Loading';
import { observer } from 'mobx-react-lite';


const ParserPage = observer(() => {

    const { product } = useContext(Context)

    const [stateImages, setStateImages] = useState([])
    const [stateSizes, setStateSizes] = useState([])
    const [article, setArticle] = useState("")
    const [brand, setBrand] = useState("milwaukee")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (stateImages[0]?.big !== undefined) {
            updateProductOnArticle(article, {img:JSON.stringify(stateImages)})
                .then(data => {
                    setMessage("Сохранено")
                    fetchAllProducts().then(dat => product.setAllProducts(dat))
                })
                .finally(data => setLoading(false))
        }
    },[stateImages])

    useEffect(() => {
        if (stateSizes?.weight !== undefined) {
            console.log(stateSizes)
            setMessage("Получено")
            setLoading(false)
        }
    },[stateSizes])

    const onClickButtonParserImages = () => {
        setLoading(true)
        setMessage("")
        fetchParserImages(brand, article).then(data => {
            setStateImages(data)
        })
    }
    const onClickButtonParserSizes = () => {
        setLoading(true)
        setMessage("")
        fetchParserSizes(article).then(data => {
            setStateSizes(data)
        })
    }
    

    return (
        <InfoPage>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
            >
                {/* <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                    <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" />
                    <input className="m-3" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Введите бренд" />
                    {loading ? <Loading /> : <button className="m-3" onClick={onClickButtonParserImages}>Начать парсинг изображений</button>}
                </div>
                <div className="inputBox">
                    {message && message !== ""
                    ? 
                        message
                    : "пусто"}
                </div> */}

                <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                    <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" />
                    <input className="m-3" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Введите бренд" />
                    {loading ? <Loading /> : <button className="m-3" onClick={onClickButtonParserSizes}>Начать парсинг габаритов</button>}
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
