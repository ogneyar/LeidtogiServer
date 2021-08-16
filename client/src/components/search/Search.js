import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { fetchAllProducts } from '../../http/productAPI';
import { API_URL } from '../../utils/consts';

import './Search.css'


const Search = () => {

    const [value, setValue] = useState("")
    const [list, setList] = useState([])
    const [array, setArray] = useState([])

    const history = useHistory()

    useEffect(() => {
        fetchAllProducts().then(data => setArray(data))
    },[])

    const onChangeSearchInputValue = (search) => {
        setValue(search)
        if (search) {
            setList(array.filter(i => i.article.includes(search)))
        }else setList([])
    }

    const onClickSearchInput = (search) => {onChangeSearchInputValue(search)}

    const onClickFon = (e) => {
        setList([])
    }

    const redirectOnSearch = (key, val) => {
        setList([])
        history.push(`/search?${key}=${val}`)
    }
    

    return (
        <div className="SearchComponent">
            <div className="SearchWrapper">
                <div id="searchDiv" className="SearchDiv">
                    <input 
                        className="SearchInput" 
                        type="text" 
                        autoComplete="off" 
                        name="search" 
                        id="search" 
                        placeholder="Поиск" 
                        value={value}
                        onChange={e => onChangeSearchInputValue(e.target.value)}
                        onClick={e => onClickSearchInput(e.target.value)}
                    />

                    <span className="InputGroupButton">

                        <button 
                            type="text" 
                            className="SearchButton btn btn-default"
                            onClick={() => redirectOnSearch("value", value)}
                        >
                            <i className="fa fa-search " />
                        </button>

                    </span>
                </div>
                
                {list && list.length > 0
                ?
                    <div 
                        className="SearchListBox"
                    >
                        <div 
                            className="SearchList"
                        >
                            {list.map((i, index) =>
                                index < 5 && 
                                <div
                                    key={i.id}
                                >
                                {/* {index !== 0 && <hr />} */}
                                <div
                                    className="SearchListItem"
                                    onClick={() => redirectOnSearch("article", i.article)}
                                >
                                    <img 
                                        className="SearchListItemImg"
                                        src={API_URL + i.img} 
                                        alt={i.name}
                                    />
                                    <div
                                        className="SearchListItemBody"
                                    >
                                        <div
                                            className="SearchListItemBodyBoxTitle"
                                        >
                                            <div
                                                className="SearchListItemBodyName"
                                            >
                                                {i.name}
                                            </div>
                                            <div
                                                className="SearchListItemBodyArticle"
                                            >
                                                артикул: {i.article}
                                            </div>
                                        </div>

                                        <div
                                            className="SearchListItemBodyPrice"
                                        >
                                            <div>
                                                {i.price} р.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )}
                            {list.length > 5 
                            ?
                            <>
                                {/* <hr /> */}
                                <div
                                    className="SearchListBottom"
                                    onClick={(e) => redirectOnSearch("value", value)}
                                >
                                    Показать все
                                </div>
                            </>
                            :
                                null
                            }
                        </div>

                        
                    </div>
                :
                    null
                }

            </div>

            {list && list.length > 0 
            ? <div className="fon" onClick={e => onClickFon(e)} />
            : null}

        </div>
    );
}

export default Search;
