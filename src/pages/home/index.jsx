import React, {Component} from 'react'
import './index.scss'

import API from '../../api'
import 'whatwg-fetch'
import message from '../../assets/message.png'

//复杂组件，容器组件
export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            swiperInfo:[],
            classesInfo:[],
            noticeInfo:[],
            winInfo:[]
        }
        
    }
    render(){
       let {swiperInfo,classesInfo,noticeInfo,winInfo}=this.state;

        return(
            <div id='home' className='page'>
                <div className="swiper-container first-swiper" ref="firstSwiper">
                    <div className="swiper-wrapper">
                        {
                            swiperInfo.map((item)=>{
                                return (
                                    <div className="swiper-slide" key={item.imgUrl}>
                                        <img src={item.imgUrl} alt=""/>
                                    </div>
                                )
                            })
                        }
                    
                    </div>
                    <div className="swiper-pagination" ref="firstSwiperPagination"></div>
                </div>
                <div className='whitespace'></div>  

                <div className="swiper-container second-swiper" ref="secondSwiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <ul className="one-Pice">
                                {
                                    classesInfo.slice(0,8).map((item)=>{
                                        return (
                                            <li key={item.id}>
                                                <img src={item.img_url} alt=""/>
                                                <span>{item.name}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="swiper-slide">
                            <ul className="one-Pice">
                                {
                                    classesInfo.slice(8).map((item)=>{
                                        return (
                                            <li key={item.id}>
                                                <img src={item.img_url} alt=""/>
                                                <span>{item.name}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="swiper-pagination" ref="secondSwiperPagination"></div>
                    <div className='swiper-container notice' ref="thirdSwiper">
                        <ul className='swiper-wrapper noticeSwiper'>
                            {
                                noticeInfo.map((item)=>{
                                    return (
                                        <li className='swiper-slide' key={item.id}>
                                            <p>{item.title}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className='noticeMore'>更多</div>
                    </div>
                </div>

               <div className="content">
                    {
                        winInfo.map((item)=>{
                            return (
                                <div className='winInfo' key={item.id}>
                                    <h2>{item.name}</h2>
                                    <ul className="win-box">
                                        {
                                            item.catalogs[0].items.slice(0,4).map((data)=>{
                                                return (
                                                    <li key={data.id}>
                                                        <img src={data.imgUrl} alt=""/>
                                                        <p>{data.name}</p>
                                                        <span>￥{data.price}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
               </div>

               <div className='search'>
                    茅台醇
               </div>

               <div className="message">
                    <img src={message} alt=""/>
               </div>
            </div>
        ) 
        
            
    }

    

    componentDidMount(){
        //请求swiper的url
        fetch(API.INDEX_BANNER_API)
        //获得请求的响应对象
        .then((response)=>{
            //以json的形式解析请求得到的json数据
            return response.json();
        })
        //请求得到结果，解析完成
        .then((json)=>{
            this.setState({swiperInfo: json.data.wxBanner}, ()=>{
                this.swiper = new window.Swiper(this.refs.firstSwiper, {
                    loop:true,
                    autoplay:true,
                    pagination: {
                      el: this.refs.firstSwiperPagination,
                    },
                  });              
            });
            // console.log(json.data.wxBanner);
        })
        .catch((ex)=>{
            console.log('parsing failed', ex)
        })


        //请求Classes的url
        fetch(API.INDEX_CLASSES_API)
        //获得请求的响应对象
        .then((response)=>{
            //以json的形式解析请求得到的json数据
            return response.json();
        })
        //请求得到结果，解析完成
        .then((json)=>{
            this.setState({classesInfo: json.data}, ()=>{
                this.swiper = new window.Swiper(this.refs.secondSwiper, {
                    loop:true,
                    pagination: {
                      el: this.refs.secondSwiperPagination,
                    },
                  });              
            });
            // console.log(json);
        })
        .catch((ex)=>{
            console.log('parsing failed', ex)
        })

        
         //请求Notice的url
         fetch(API.INDEX_NOTICE_API+'?pageNum=1&pageSize=10&channel=1&appCode=1')
         //获得请求的响应对象
         .then((response)=>{
             //以json的形式解析请求得到的json数据
             return response.json();
         })
         //请求得到结果，解析完成
         .then((json)=>{
             this.setState({noticeInfo: json.data.list}, ()=>{
                 this.swiper = new window.Swiper(this.refs.thirdSwiper, {
                     loop:true,
                     direction : 'vertical',
                     autoplay:true,
                   });              
             });
            //  console.log(json.data.list);
         })
         .catch((ex)=>{
             console.log('parsing failed', ex)
         })

         //请求WIN的url
         fetch(API.INDEX_WIN_API+'?appCode=1')
         //获得请求的响应对象
         .then((response)=>{
             //以json的形式解析请求得到的json数据
             return response.json();
         })
         //请求得到结果，解析完成
         .then((json)=>{
             this.setState({winInfo: json.data.floors}, ()=>{
                             
             });
             console.log(json.data.floors);
         })
         .catch((ex)=>{
             console.log('parsing failed', ex)
         })
        
    }

   


}

