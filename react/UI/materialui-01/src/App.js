import { CssBaseline } from '@material-ui/core';
import React, {Fragment} from 'react';
import './App.css';
import {Header, Footer, Content} from './Components/index'
import {MainData, DetailData} from './store'

class App extends React.Component {

  state = {
    rightContent: [],
    FooterData: '',
    DetailData: [],
    EditorId: -1
  }

  componentDidMount() {
    this.setState({
      DetailData: DetailData
    })
  }

  createData() {
    let MainLevel = MainData.reduce((resData, item) => {
      resData = {
        ...resData,
        [item]: []
      }
      return resData;
    }, {})
    
    let allMainData = Object.entries(this.state.DetailData.reduce((resData, item) => {
      resData[item.MainData] = [...resData[item.MainData], item]
      return resData;
    }, MainLevel))
    if(this.state.FooterData === '全部') {
      return allMainData
    } else if (this.state.FooterData === '') {
      return allMainData
    } else {
      return allMainData.filter((v) => {
        return v[0] === this.state.FooterData
      })
    }
  }

  getLeftClickData = (id) => {
    let res = this.state.DetailData.find((item) => (item.id === id))
    this.setState({
      rightContent: res
    })
  }

  getFooterData = (data) => {
    this.setState({
      FooterData: data
    })
  }

  getInputData = (data) =>{
    let newDetailData = Array.from(this.state.DetailData)
    data.id = this.state.DetailData.length + 1
    newDetailData.push(data)
    this.setState({
      DetailData: newDetailData
    })
  }

  getEditorData = (data) => {
    // console.log(data)
    let DetailData = Array.from(this.state.DetailData)
    let EditorId = this.state.EditorId
    let index = -1;
    // **不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。**
    DetailData.forEach((v, i) => {
      v.id === EditorId && (index = i)
    })
    if(index === -1) {
      console.error('没有找到您所要修改的信息！')
      return;
    }
    DetailData[index] = data
    DetailData[index].id = EditorId
    this.setState({
      DetailData: DetailData
    })
  }
  getEditorId = (id) => {
    this.setState({
      EditorId: id
    })
  }

  onDelete = (id) => {
    let DetailData = Array.from(this.state.DetailData);
    DetailData = DetailData.filter((v, i) => {
      return id !== v.id;
    })
    this.setState({
      DetailData: DetailData
    })
  }

  render() {
    const newData = this.createData();
    return (
      <Fragment>
        <CssBaseline/>
        <Header getInputData={this.getInputData}/>
        <Content 
          getLeftClickData={this.getLeftClickData} 
          newData={newData}
          rightContent={this.state.rightContent}
          onDelete={this.onDelete}
          getEditorData={this.getEditorData}
          getEditorId={this.getEditorId}
          />
        <Footer MainData={MainData} getFooterData={this.getFooterData}/>  
      </Fragment>
    );
  }
}

export default App;
