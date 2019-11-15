import React, { Component } from 'react'
import { Input ,Button} from 'antd'
import axios from 'axios'
import './style.css'

const inputMsg= [{key: "featuredId", name: "专栏ID"},
{key: "matchName", name: "模版名称"},
{key: "titleColor", name: "轮播图主标题颜色"},
{key: "subTitleColor", name: "轮播图副标题颜色"},
{key: "activeDotsColor", name: "轮播图动点颜色"},
{key: "dotsColor", name: "轮播图点颜色"},
{key: "logoColor", name: "右下角背景色"},
{key: "afterLogoColor", name: "右下角伪元素背景颜色"},
{key: "logoTitle", name: "右下角文案"},
{key: "logoFontSize", name: "右下角文字字体大小"},
{key: "logoMarginLeft", name: "右下角文字距离"},
{key: "swiperColor", name: "轮播图左右图标颜色"},
{key: "logoTitleColor", name: "右下角图标文字颜色"},
{key: "logoLength", name: "右下角图标长度 减去伪元素长度36px"},
{key: "backgroundColor", name: "背景颜色"},
{key: "newsTitleColor", name: "右侧文章初始文字颜色"},
{key: "newsTitleHoverColor", name: "右侧文章hover文字颜色"}]

class AddMatch extends Component {
    state={
        featuredId:1639,
        matchName: "mdl",
        titleColor: "#fff",
        subTitleColor: "#E9C688", 
        activeDotsColor: "#fff", 
        dotsColor: "#7F6241", 
        logoColor: "linear-gradient(90deg,#5C492D,#897044)", 
        afterLogoColor:"linear-gradient(90deg,#57452D,#5C492D)", 
        logoTitle: "看比赛就来VPGAME", 
        logoFontSize:"12px", 
        logoMarginLeft:"17px", 
        swiperColor:"#C7A76D", 
        logoTitleColor: "#FDE4A6", 
        logoLength: "179px", 
        backgroundColor: "transparent", 
        newsTitleColor:"#fff", 
        newsTitleHoverColor:"#E9C688"
    }

    handleAdd = ()=> {
        var postData = {...this.state}
        axios.post('http://47.97.57.7/api/addMatch', JSON.stringify(postData))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    handlefixed = () =>{
        var postData = {...this.state}
        axios.post('http://47.97.57.7/api/changeHtmlCfg', JSON.stringify(postData))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handledel = () =>{
        var postData = { matchName:this.state.matchName }
        axios.post('http://47.97.57.7/api/delMatch', JSON.stringify(postData))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleChange = (e,type) => {
        const { value } = e.target;
        this.setState({ 
            [type]: value 
        })
    }
    render() {
        console.log(this.state)
        return (
            <div className="add-match">
                {inputMsg.map((v,i)=>{
                    return <Input value={this.state[v.key]} key={i} onChange={(e)=>this.handleChange(e,v.key)} addonBefore={v.name} />
                })}
                <Button type="primary"  onClick = {()=>this.handleAdd()}>新增模版</Button>
                <Button type="primary" onClick = {()=>this.handlefixed()} style={{marginLeft:'20px'}}>修改模版</Button>
                <Button type="primary" onClick = {()=>this.handledel()} style={{marginLeft:'20px'}}>删除模版</Button>
            </div>
        );
    }
}

export default AddMatch
