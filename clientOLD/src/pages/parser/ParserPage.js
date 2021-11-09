// eslint-disable-next-line
import React, { useEffect, useState, useContext } from 'react'
import ReactHtmlParser from 'react-html-parser'
// import uuid from 'react-uuid'

import { 
    // fetchParserImages, fetchParserSizes, fetchParserAll, fetchParserMailRu, 
    fetchParser } from '../../http/paserAPI';
// import { updateProductOnArticle, fetchAllProducts, fetchProductSizes, updateProductSizes } from '../../http/productAPI';
// import InfoPage from '../info/InfoPage';
// import { Context } from '../..'
import Loading from '../../components/Loading';
import { observer } from 'mobx-react-lite';


const ParserPage = observer(() => {

    // const { product } = useContext(Context)

    // const [stateImages, setStateImages] = useState([])
    // const [stateSizes, setStateSizes] = useState([])
    // const [stateAll, setStateAll] = useState([])
    // const [state, setState] = useState([])
    // const [article, setArticle] = useState("")

    const [valueBefore, setValueBefore] = useState("")
    const [valueAfter, setValueAfter] = useState("")
    const [value, setValue] = useState("")
    const [brand, setBrand] = useState("milwaukee")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    // const [stateMailRu, setStateMailRu] = useState([])
    // const [email, setEmail] = useState("")
    // const [loadingEmail, setLoadingEmail] = useState(false)

    // useEffect(() => {
    //     if (stateImages[0]?.big !== undefined) {
    //         console.log(stateImages)
    //         setMessage(JSON.stringify(stateImages))
    //     }
    // },[stateImages])

    // useEffect(() => {
    //     if (stateSizes?.weight !== undefined) {
    //         console.log(stateSizes)
    //         setMessage(JSON.stringify(stateSizes))
    //     }
    // },[stateSizes])

    // useEffect(() => {
    //     if (stateAll?.sizes !== undefined) {
    //         console.log(stateAll)
    //         setMessage(JSON.stringify(stateAll))
    //     }
    // },[stateAll])

    // useEffect(() => {
    //     if (stateMailRu?.status !== undefined) {
    //         console.log(stateMailRu)
    //         setMessage(JSON.stringify(stateMailRu))
    //     }
    // },[stateMailRu])

    // const onClickButtonParserImages = () => {
    //     if (article) {
    //         setLoading(true)
    //         setMessage("")

    //         fetchParserImages(brand, article).then(data => {
    //             setStateImages(data)
    //         }).finally(data => setLoading(false))
    //     }
    // }

    // const onClickButtonParserSizes = () => {
    //     if (article) {
    //         setLoading(true)
    //         setMessage("")

    //         fetchParserSizes(article).then(data => {
    //             setStateSizes(data)
    //         }).finally(data => setLoading(false))
    //     }
    // }

    // const onClickButtonParserAll = () => {
    //     if (article) {
    //         setLoading(true)
    //         setMessage("")
    
    //         fetchParserAll(brand, article).then(data => {
    //             setStateAll(data)
    //         }).finally(data => setLoading(false))
    //     }
    // }

    // const onClickButtonParserMailRu = () => {
    //     if (email) {
    //         setLoadingEmail(true)
    //         setMessage("")

    //         fetchParserMailRu(email).then(data => {
    //             setStateMailRu(data)
    //         }).finally(data => setLoadingEmail(false))
    //     }
    // }
    
    const onClickButtonParser = async () => {
        setMessage("")
        setLoading(true)
        let mess = ""
        for(let i = Number(valueBefore); i < Number(valueAfter); i=i+Number(value)) {
            await fetchParser(brand, i, value)
                // eslint-disable-next-line
                .then(data => {
                    mess += data
                })
                // eslint-disable-next-line
                .finally(() => {
                    setMessage(mess)
                })
        }
        setLoading(false)
        setMessage(mess + "Закончил.")
    }

    //  useEffect(() => {
    // },[state])


    return (
        <div style={{backgroundColor:"white",padding:"50px"}}>
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

                {/* {message && Array.isArray(message) && message[0]?.mess */}
                {message && message !== ""
                ?
                    <div className="inputBox">
                        {ReactHtmlParser(message)}
                    </div>

                    // message.map(i =>  
                    //     <div className="inputBox" key={uuid()}>
                    //         {ReactHtmlParser(i.mess)}
                    //     </div>
                    // )
                : null}

                {loading ? <Loading /> 
                : 
                <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                    {/* <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" /> */}
                    <input className="m-3" value={valueBefore} onChange={(e) => setValueBefore(e.target.value)} placeholder="Введите значение ОТ" />
                    <input className="m-3" value={valueAfter} onChange={(e) => setValueAfter(e.target.value)} placeholder="Введите значение ДО" />
                    <input className="m-3" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Введите количество ПО сколько" />
                    <input className="m-3" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Введите бренд" />
                    
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        {/* <button className="m-3" onClick={onClickButtonParserImages}>Начать парсинг изображений</button>
                        <button className="m-3" onClick={onClickButtonParserSizes}>Начать парсинг габаритов</button>
                        <button className="m-3" onClick={onClickButtonParserAll}>Начать парсинг всего</button> */}
                        <button className="m-3" onClick={onClickButtonParser}>Начать парсинг</button>

                        {/* <input className="m-3" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Введите артикул" />
                        <button className="m-3" onClick={onClickButtonParserSizes}>Начать парсинг mail.ru</button> */}
                    </div>
                </div>}
                
                {/* <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                <input className="m-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите почту mail.ru" />
                    {loadingEmail ? <Loading /> 
                    : 
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <button className="m-3" onClick={onClickButtonParserMailRu}>Начать парсинг mail.ru</button>
                    </div>}
                </div> */}

                {/* <div className="inputBox">
                    {message && message !== "" ? message : "пусто"}
                </div> */}

                
            </div>
        </div>
       
    )
})

export default ParserPage;
