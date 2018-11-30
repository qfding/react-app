import React, {Component} from 'react'
import './search.scss'

import API from '../api'
import 'whatwg-fetch'


//复杂组件，容器组件
export default class Search extends Component{
    constructor(...rest){
        super();
        this.state={
            hotInfo:[]
        }
        this.history=rest[0].history
    }
    render(){
        let {hotInfo}=this.state;
        return(
            <div id='search' className='page'>
                <header className='header'>
                    <input placeholder='葡萄酒' ref='searchInp' onChange={this.inpChangeAction.bind(this)}/>
                    <span onClick={this.backAction.bind(this)}>取消</span>
                </header>
                <div className='hotBox'>
                    <h2>热门搜索</h2>
                    <div className='showHot'>
                        {
                            hotInfo.map((item)=>{
                                return (
                                    <a key={item.title}>
                                        {item.title}
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    backAction(){
        this.history.goBack()
    }
    inpChangeAction(ev){
        console.log(ev)
    }
    componentDidMount(){
         //请求Classes的url
         fetch(API.SEARCH_HOT_API+'?appCode=1')
         //获得请求的响应对象
         .then((response)=>{
             //以json的形式解析请求得到的json数据
             return response.json();
         })
         //请求得到结果，解析完成
         .then((json)=>{
             this.setState({hotInfo: json.data.hotWord}, ()=>{            
             });
             console.log(json.data.hotWord);
         })
         .catch((ex)=>{
             console.log('parsing failed', ex)
         })
    }
}


