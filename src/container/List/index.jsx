/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Table, Divider ,message} from 'antd'
import { Link } from 'react-router-dom'


import axios from 'axios'
import './style.css'

const { Column } = Table;


export class List extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        this.getMatchList()
    }

    delMatch=name=>{
        const self = this
        const postData = { matchName:name }
        axios.post('http://47.97.57.7/api/delMatch', JSON.stringify(postData))
        .then(function (response) {
            if(response.data){
                if(response.data.success){
                    message.success(response.data.msg)
                    self.getMatchList()
                }else{
                    message.error(response.data.msg)
                }
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getMatchList = id => {
        const self =this
        axios.post(`http://47.97.57.7/api/getMatchList`)
            .then(function (response) {
                console.log(response)
                if(response.data){
                    let data =[]
                    JSON.parse(response.data.cfg).map((v,i)=>{
                        data.push({
                            key: `${i+1}`,
                            name:v.htmlName,
                            age:v.id,
                            address:`https://league-live.vpgame.com/news/${v.htmlName}.html`
                        })
                    })
                    self.setState({
                        data
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Table  dataSource={this.state.data} >
                    <Column title="模版名称" dataIndex="name" key="name" />
                    <Column title="关联专栏ID" dataIndex="age" key="age" />
                    <Column 
                        title="模版链接" 
                        dataIndex="address" key="address" 
                        render={text => <a href={text} rel="noopener noreferrer" target="_blank">{text}</a>}
                    />
                    <Column 
                        title="操作" 
                        dataIndex="action" key="action" 
                        render={(text, record) => (
                                <span>
                                    <Link to={`/main/${record.name}/${record.age}`}>修改 {record.name}</Link>
                                        <Divider type="vertical" />
                                    <a onClick={()=>this.delMatch(record.name)}>删除</a>
                                </span>
                            )}
                    />
                    
                </Table>
            </div>
        );
    }
}

export default List;
