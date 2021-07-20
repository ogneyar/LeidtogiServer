import React, { useEffect } from 'react'
import './Banner.css'


const $ = require( "jquery" )


const Banner = () => {

    useEffect(() => {

        // console.log(window.document.getElementById('Banner'));
        // console.log($('#Banner'));

        // window.onload = jqueryNivoSlider()
    
    }, [])

    function jqueryNivoSlider() {
        $('#oc-inivoslider').nivoSlider({
            effect: 'sliceDown',
            slices: 15,
            boxCols: 8,
            boxRows: 4,
            animSpeed:200,
            pauseTime: '3000',
            startSlide: 0,
            controlNav: true,
            directionNav: true,
            controlNavThumbs: false,
            pauseOnHover: true,
            ocnualAdvance: false,
            prevText: 'Prev',
            nextText: 'Next',
            afterLoad: function(){
                $('.oc-loading').css("display","none");
            },
            beforeChange: function(){
                $('.banner7-title, .banner7-des').css("left","-550px" )
                $('.banner7-readmore').css("left","-1500px")
            },
            afterChange: function(){
                $('.banner7-title, .banner7-des, .banner7-readmore').css("left","100px")
            }
        })
    }

    return (
        <aside className="Banner" id="Banner" style={{display: "flex"}}> 
		    <div className="banner7">
	            <div className="oc-banner7-container">
		            <div className="flexslider oc-nivoslider">
                        <div className="oc-loading" style={{display: "flex"}} />
                        <div className="row" >
				            <div className="col-md-1" />
				            <div className="col-md-10">
					            <div id="oc-inivoslider" className="slides nivoSlider">

									<a href="/search?search=SWITCH+TANK" className="nivo-imageLink" style={{display: "none"}}>
                                        <img id="img" style={{width: "494px", visibility: "hidden"}} src="https://cdn.mlk-shop.ru/image/cache/1497-415/information/milwaukee-banner.jpg" title="#banner7-caption1" alt="Switch tank" />
                                    </a>

									<a href="/lyogkij-start" className="nivo-imageLink" style={{display: "none"}}>
                                        <img style={{width: "494px", visibility: "hidden"}} src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/banner-4.jpg" title="#banner7-caption2" alt="ЛЁГКИЙ СТАРТ" />
                                    </a>

									<a href="/odezhda-s-podogrevom" className="nivo-imageLink" style={{display: "none"}}>
                                        <img style={{width: "494px", visibility: "hidden"}} src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/Heated-Gear-banner-dt.pg" title="#banner7-caption3" alt="Фирменный магазин инструментов MILWAUKEE" />
                                    </a>

									<a href="/pily-sabelnye" className="nivo-imageLink" style={{display: "none"}}>
                                        <img style={{width: "494px", visibility: "hidden"}} src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/m12_chz_1.jpg" title="#banner7-caption4" alt="Фирменный магазин инструментов MILWAUKEE" />
                                    </a>

									<a href="/vintoverty" className="nivo-imageLink" style={{display: "none"}}>
                                        <img style={{width: "494px", visibility: "hidden"}} src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/M18-FUEL-Upgrade-M18_FID-502C_1.jpg" title="#banner7-caption5" alt="Фирменный магазин инструментов MILWAUKEE" />
                                    </a>

									<a href="/one-key" className="nivo-imageLink" style={{display: "none"}}>
                                        <img style={{width: "494px", visibility: "hidden"}} src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" title="#banner7-caption6" alt="Фирменный магазин инструментов MILWAUKEE " />
                                    </a>

									<img className="nivo-main-image" src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{display: "inline", height: "414px", width: "1494px"}} alt="Фирменный магазин инструментов MILWAUKEE " />
                                    
                                    <div className="nivo-caption" style={{display: "block"}}></div>
                                    <div className="nivo-directionNav">
                                        <a className="fa fa-chevron-left fa-lg nivo-prevNav" href="javascript(void)"> </a>
                                        <a className="fa fa-chevron-right fa-lg nivo-nextNav" href="javascript(void)"> </a>
                                    </div>
                                    <div className="nivo-slice" name="0" style={{left: "0px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-0px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="1" style={{left: "100px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-100px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="2" style={{left: "200px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-200px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="3" style={{left: "300px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-300px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="4" style={{left: "400px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-400px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="5" style={{left: "500px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-500px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="6" style={{left: "600px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-600px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="7" style={{left: "700px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-700px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="8" style={{left: "800px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-800px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="9" style={{left: "900px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-900px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="10" style={{left: "1000px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-1000px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="11" style={{left: "1100px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-1100px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="12" style={{left: "1200px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-1200px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="13" style={{left: "1300px", width: "100px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-1300px"}} alt="Фирменный магазин" />
                                    </div>
                                    <div className="nivo-slice" name="14" style={{left: "1400px", width: "94px", height: "414px", opacity: 1, overflow: "hidden", top: "0px"}}>
                                        <img src="https://cdn.mlk-shop.ru/image/cache/1497-415/catalog/banners/ONE-KEY-banner-lrg2.jpg" style={{position:"absolute", width:"1494px", height:"auto", display:"block !important", top:0, left:"-1400px"}} alt="Фирменный магазин" />
                                    </div>
                                </div>
                                <div className="nivo-controlNav">
                                    <a className="nivo-control" rel="0" href="javascript(void)">1</a>
                                    <a className="nivo-control" rel="1" href="javascript(void)">2</a>
                                    <a className="nivo-control" rel="2" href="javascript(void)">3</a>
                                    <a className="nivo-control" rel="3" href="javascript(void)">4</a>
                                    <a className="nivo-control" rel="4" href="javascript(void)">5</a>
                                    <a className="nivo-control active" rel="5" href="javascript(void)">6</a>
                                </div>
				            </div>
				            <div className="col-md-1" />
			            </div>
		            </div>
	            </div>
            </div>	
        </aside>
    )
}

export default Banner
