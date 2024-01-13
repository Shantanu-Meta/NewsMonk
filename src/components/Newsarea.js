import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'

export default class Newsarea extends Component {
  defaultDesc = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum alias eius aut laboriosam minima facilis enim! Laborum necessitatibus eaque vitae."
  defaultTitle = "Today's Top NEWS"
  defaultImg = "https://groups.google.com/group/digital-services-2024/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1"

  constructor(props){
    super(props); 
    this.state = {
      articles: [],
      page: 1,
      totalResults: null, 
      load: true,
      progress: 0, 
    }
    document.title = `NewsMonk | ${this.capitalize(this.props.category)}`; 
  }

   fetchData = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.API_KEY}&page=${this.state.page}&pageSize=5`
    let response =await fetch(url);
    let data =await response.json(); 
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      load: false,
    });   
  }

  async componentDidMount(){
    this.setState({progress: 10})
    await this.fetchData();    
    this.setState({progress: 100})
  }

  fetchMoreData = async ()=>{
    this.setState({page: this.state.page + 1}, ()=>{
      this.fetchData(); 
    })
     
  }

  capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1); 
  }

  render(){
    return(
      <div className='w-full'>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <div className='w-[90%] mx-auto mt-[5rem]'>
        {this.state.load && <Loading/>}
        {this.state.articles.length>0 && <h1 className='text-3xl text-center mb-3'>NewsMonk - {this.capitalize(this.props.category)}</h1>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={!(this.state.totalResults===this.state.articles.length) && this.state.articles.length>0 && <Loading/>}
          >
          <div className='flex align-center justify-evenly flex-wrap gap-1'>
            {this.state.articles.map((ele) =>{
              return <NewsItem title={ele.title ? (ele.title.length >80 ? ele.title.slice(0,80) : ele.title) : this.defaultTitle} description={ele.description ? (ele.description.length >150 ? ele.description.slice(0,150) : ele.description) : this.defaultDesc} imgUrl={ele.urlToImage ?ele.urlToImage :  this.defaultImg} url={ele.url ? ele.url : "/"} author={ele.author} time={ele.publishedAt} name={ele.source.name} key={ele.url}/>
            })}
          </div>
          </InfiniteScroll>
        </div>
      </div>
    )
    
  }
}
