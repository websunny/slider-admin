import React, { Component } from 'react';
import { Input ,Button,Layout, Breadcrumb,message} from 'antd'
import { withRouter } from "react-router-dom";
import Stencil from '../../components/Stencil';
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

const { Content }= Layout
class Main extends Component {
    state={
        htmlCfg:{
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
        },
        featuredData:[{
            author: "几页",
            comment: 73,
            content: "MDL决赛日，VG以1-3不敌对手TNC，遗憾屈居亚军。",
            cover: "https://vp-image.vpgame.com/112023108d.jpg",
            description: "MDL决赛日，VG以1-3不敌对手TNC，遗憾屈居亚军。",
            gallery: {image: Array(0), count: 0},
            game_type: 1,
            id: 293952,
            keyword: "MDL 成都Major",
            play_time: "",
            post_time: "11月25日",
            title: "MDL决赛日一图流：水牛组合的胜利，Ori尽力了",
            type: "article",
            view: 102944
        }],
    }
    
    componentDidMount() {
        if(this.state.htmlCfg.featuredId){
            this.getHtml(this.state.htmlCfg.featuredId)
        }
        if(this.props.match.params.id){
            const self =this
            axios.post(`http://47.97.57.7/api/getMatchList`)
            .then(function (response) {
                console.log(response)
                if(response.data.cfg){
                    let data =JSON.parse(response.data.htmlCfg)[self.props.match.params.name]
                    console.log(data)
                    data.featuredId=self.props.match.params.id
                    data.matchName=self.props.match.params.name
                    self.setState({
                        htmlCfg:data
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }


    handleAdd = ()=> {
        var postData = {...this.state.htmlCfg}
        axios.post('http://47.97.57.7/api/addMatch', JSON.stringify(postData))
        .then(function (response) {
            if(response.data){
                if(response.data.success){
                    message.success(response.data.msg)
                }else{
                    message.error(response.data.msg)
                }
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    handlefixed = () =>{
        var postData = {...this.state.htmlCfg}
        axios.post('http://47.97.57.7/api/changeHtmlCfg', JSON.stringify(postData))
        .then(function (response) {
            if(response.data){
                if(response.data.success){
                    message.success(response.data.msg)
                }else{
                    message.error(response.data.msg)
                }
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getHtml = id => {
        let self = this
        axios.get(`https://www.vpgame.com/news/api/news/column/${id}/articles?offset=0&limit=10`)
            .then(function (response) {
                
                if(response.data.data && response.data.data.length){
                    self.setState({
                        featuredData:response.data.data
                    })
                }
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
        const cfg = {...this.state.htmlCfg}
        cfg[type] = value
        if(type === 'featuredId'){
            this.getHtml(e.target.value)
        }
        this.setState({ 
            htmlCfg: cfg 
        })
    }
    render() {
        console.log(this.state.featuredData)
        return (
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>请填写相关信息用于新增修改或删除模版(注意新增或者修改模版需要填写所有信息，删除模版必须填写模版名称，其他填不填无所谓)</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="add-match-show">
                        <Stencil data={this.state.featuredData} htmlConfig = {this.state.htmlCfg}/>
                    </div>
                     <div className="add-match-detail">
                            {inputMsg.map((v,i)=>{
                                return <Input value={this.state.htmlCfg[v.key]} key={i} onChange={(e)=>this.handleChange(e,v.key)} addonBefore={v.name} />
                            })}
                            <Button type="primary"  onClick = {()=>this.handleAdd()}>
                                新增模版
                            </Button>
                            <Button type="primary" style={{marginLeft:'10px'}} onClick = {()=>this.handlefixed()}>
                                修改模版
                            </Button>
                        </div>
                </Content>
        );
    }
}

export default withRouter(Main);
