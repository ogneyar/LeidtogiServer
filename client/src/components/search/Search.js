import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

import { fetchAllProducts } from '../../http/productAPI';
import { API_URL } from '../../utils/consts';

import './Search.css'


const Search = () => {

    const [value, setValue] = useState("")
    const [list, setList] = useState([])
    const [array, setArray] = useState([])

    useEffect(() => {
        fetchAllProducts().then(data => setArray(data))
    },[])

    const onClickSearchButton = () => {
        // console.log(value);
        // console.log(array);
    }

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


    return (
        <div className="Search">
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
                            onClick={onClickSearchButton}
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
