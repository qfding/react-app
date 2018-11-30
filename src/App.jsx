import React, {Component} from 'react'
import { BrowserRouter, Route, NavLink as Link, Redirect, Switch  } from 'react-router-dom'

import home from './pages/home/index'
import classes from './pages/classes/index'
import shopcar from './pages/shopcar/index'
import mine from './pages/mine/index'
import search from './common/search'

import './App.css'

export default class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <div className="app">

                    <Switch>
                        <Route path="/" exact render={()=>{
                            //对'/'重定向
                            return <Redirect to="/home"/>
                        }}/>

                        <Route path="/home" component={home}/>
                        <Route path="/classes" component={classes}/>
                        <Route path="/shopcar" component={shopcar}/>
                        <Route path="/mine" component={mine}/>
                        <Route path="/search" component={search}/>
                        <Route render={()=>{
                            //对'/'重定向
                            return <Redirect to="/home"/>
                        }}/>
                    </Switch>
                    


                    <nav className="tabs">
                        <Link className="tab" to="/home">
                            <i className='iconfont icon-shouye'></i>
                            <span>首页</span>
                        </Link>
                        <Link className="tab" to="/classes">
                            <i className='iconfont icon-leimupinleifenleileibie'></i>
                            <span>分类</span>
                        </Link>
                        <Link className="tab" to="/shopcar">
                            <i className='iconfont icon-cart'></i>
                            <span>购物车</span>
                        </Link>
                        <Link className="tab" to="/mine">
                            <i className='iconfont icon-tubiaozhizuomoban-copy'></i>
                            <span>我的</span>
                        </Link>
                    </nav>
                    

                </div>
            </BrowserRouter>
        )
    }
}