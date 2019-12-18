import React, { Component } from 'react'
import './style.css'
class Stencil extends Component {
    state={
        hoverIndex:-1
    }
    toggleHover=index=>{
        this.setState({
            hoverIndex:index
        })
    }

    cancelHover=()=>{
        this.setState({
            hoverIndex:-1
        })
    }
        
    render() {
        const {data,htmlConfig} =this.props
        return (
            <div>
                <div className="container" style={{background:htmlConfig.backgroundColor}}>
                    <div className="slick">
                        <div className="wrap">
                            <a href = {data[0].address} className="banner" target="_blank" rel="noopener noreferrer">
                                <img src={data[0].cover} alt="" />
                                <div className="content">
                                    <div className="title" style={{color:htmlConfig.titleColor}}>{data[0].title}</div>
                                    <div className="sub-title" style={{color:htmlConfig.subTitleColor}}>{data[0].description}</div>
                                </div>
                            </a>
                        </div>
                        <div className="buttons">
                            <span className="on" style={{background:htmlConfig.activeDotsColor}}></span>
                            <span style={{background:htmlConfig.dotsColor}}></span>
                            <span style={{background:htmlConfig.dotsColor}}></span>
                            <span style={{background:htmlConfig.dotsColor}}></span>
                        </div>
                        <div className="arrow arrow_left">
                            <svg t="1573701983956" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="955" width="200" height="200"><path d="M511.702499 0a511.702499 511.702499 0 1 0 511.702498 511.702499A511.702499 511.702499 0 0 0 511.702499 0z m107.100522 711.623475a47.600232 47.600232 0 0 1 0 67.116327 46.767228 46.767228 0 0 1-33.439163 13.804068 47.600232 47.600232 0 0 1-33.796165-14.042069l-231.337129-232.051133a47.600232 47.600232 0 0 1 1.428007-65.450319l234.907147-235.621151a47.600232 47.600232 0 1 1 67.116327 67.235328L422.095061 511.702499z" fill={htmlConfig.swiperColor} p-id="956"></path></svg>
                        </div>
                        <div className="arrow arrow_right">
                            <svg t="1573702054062" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1077" width="200" height="200"><path d="M511.702499 1024A511.702499 511.702499 0 1 0 0 511.702499a511.702499 511.702499 0 0 0 511.702499 511.702498z m-107.100523-711.623475a47.600232 47.600232 0 1 1 67.116327-66.997327l232.051133 232.170134a47.600232 47.600232 0 0 1-1.547007 65.450319L467.434282 778.501801a47.600232 47.600232 0 1 1-67.235328-67.116327L601.785938 511.702499z" fill={htmlConfig.swiperColor} p-id="1078"></path></svg>
                        </div>
                    </div>
                    <div className="news-box">
                        {
                            data.slice(4).map((value,index)=>{
                                return <a href ={value.address} className="news-item" target="_blank" rel="noopener noreferrer" key={`data${index}`}>
                                    <div className='img-box'>
                                        <img src={value.cover} alt={value.description} />
                                    </div>
                                    <div className="news-item-title" onMouseEnter={()=>this.toggleHover(index)} onMouseLeave={this.cancelHover} style={{color:this.state.hoverIndex === index?htmlConfig.subTitleColor:htmlConfig.newsTitleColor}}>{value.title}</div>
                                </a>
                            })
                        }
                    </div>
                    <a className="logo" style={{width:htmlConfig.logoLength}} href ='http://www.vpgame.com' target="_blank" rel="noopener noreferrer">
                        <div style={{
                            "fontSize":htmlConfig.logoFontSize,
                            "marginLeft":htmlConfig.logoMarginLeft,
                            "color":htmlConfig.logoTitleColor
                            }}>{htmlConfig.logoTitle}</div>
                        <img src={require('./vp-small.png')} alt="" />
                    </a>
                    <div className="trapezium" style={{
                            "background":htmlConfig.logoColor,
                            "width":htmlConfig.logoLength,
                            }}><div className="trapezium-before" style={{"background":htmlConfig.afterLogoColor}}></div></div>
                    </div>
            </div>
        );
    }
}

export default Stencil;
