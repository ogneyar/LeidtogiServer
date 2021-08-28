import React, { useEffect, useState, useContext } from 'react'
import { fetchParserImages, fetchParserSizes, fetchParserAll, fetchParserMailRu } from '../../http/paserAPI';
import { updateProductOnArticle, fetchAllProducts, fetchProductSizes, updateProductSizes } from '../../http/productAPI';
import InfoPage from '../info/InfoPage';
import { Context } from '../..'
import Loading from '../../components/Loading';
import { observer } from 'mobx-react-lite';


const ParserPage = observer(() => {

    const { product } = useContext(Context)

    const [stateImages, setStateImages] = useState([])
    const [stateSizes, setStateSizes] = useState([])
    const [stateAll, setStateAll] = useState([])
    const [article, setArticle] = useState("")
    const [brand, setBrand] = useState("milwaukee")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [stateMailRu, setStateMailRu] = useState([])
    const [email, setEmail] = useState("")
    const [loadingEmail, setLoadingEmail] = useState(false)

    useEffect(() => {
        if (stateImages[0]?.big !== undefined) {
            // updateProductOnArticle(article, {img:JSON.stringify(stateImages)})
            //     .then(data => {
            //         setMessage("Сохранено")
            //         fetchAllProducts().then(dat => product.setAllProducts(dat))
            //     })
            //     .finally(data => setLoading(false))
            console.log(stateImages)
            setMessage(JSON.stringify(stateImages))
            // setLoading(false)
        }
    },[stateImages])

    useEffect(() => {
        if (stateSizes?.weight !== undefined) {
            console.log(stateSizes)
            setMessage(JSON.stringify(stateSizes))
            // setLoading(false)
        }
    },[stateSizes])

    useEffect(() => {
        if (stateAll?.sizes !== undefined) {
            console.log(stateAll)
            setMessage(JSON.stringify(stateAll))
            // setLoading(false)
        }
    },[stateAll])

    useEffect(() => {
        if (stateMailRu?.status !== undefined) {
            console.log(stateMailRu)
            setMessage(JSON.stringify(stateMailRu))
        }
    },[stateMailRu])

    const onClickButtonParserImages = () => {
        if (article) {
            setLoading(true)
            setMessage("")

            fetchParserImages(brand, article).then(data => {
                setStateImages(data)
            }).finally(data => setLoading(false))
        }
    }
    const onClickButtonParserSizes = () => {
        if (article) {
            setLoading(true)
            setMessage("")

            fetchParserSizes(article).then(data => {
                setStateSizes(data)
            }).finally(data => setLoading(false))

            // product.allProducts.forEach(i => {
            //     fetchProductSizes(i.id).then(data => {
            //         if (!data?.weight) {
            //             fetchParserSizes(i.article).then(size => {
            //                 console.log("article",i.article);
            //                 console.log("size",size);
            //                 updateProductSizes(i.id, {size:JSON.stringify(size)})
            //             })
            //         }
            //     })
            // })
            // setLoading(false)
        }
    }
    const onClickButtonParserAll = () => {
        if (article) {
            setLoading(true)
            setMessage("")
    
            fetchParserAll(brand, article).then(data => {
                setStateAll(data)
            }).finally(data => setLoading(false))
        }
    }

    const onClickButtonParserMailRu = () => {
        if (email) {
            setLoadingEmail(true)
            setMessage("")

            fetchParserMailRu(email).then(data => {
                setStateMailRu(data)
            }).finally(data => setLoadingEmail(false))
        }
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
                </div> */}
                {/* <div className="inputBox">
                    {message && message !== ""
                    ? 
                        message
                    : "пусто"}
                </div> */}

                <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                    <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" />
                    <input className="m-3" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Введите бренд" />
                    {loading ? <Loading /> 
                    : 
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <button className="m-3" onClick={onClickButtonParserImages}>Начать парсинг изображений</button>
                        <button className="m-3" onClick={onClickButtonParserSizes}>Начать парсинг габаритов</button>
                        <button className="m-3" onClick={onClickButtonParserAll}>Начать парсинг ВСЕГО</button>

                        <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" />
                        <button className="m-3" onClick={onClickButtonParserSizes}>Начать парсинг mail.ru</button>
                    </div>}
                </div>
                <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                <input className="m-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите почту mail.ru" />
                    {loadingEmail ? <Loading /> 
                    : 
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <button className="m-3" onClick={onClickButtonParserMailRu}>Начать парсинг mail.ru</button>
                    </div>}
                </div>
                <div className="inputBox">
                    {message && message !== "" ? message : "пусто"}
                </div>
            </div>
        </InfoPage>
       
    )
})

export default ParserPage;
