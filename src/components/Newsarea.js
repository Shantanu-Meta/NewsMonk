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
      searchedData: "",
    }
    document.title = `NewsMonk | ${this.capitalize(this.props.category)}`; 
  }
  

   fetchData = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=10`
    let response =await fetch(url);
    let data =await response.json(); 
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      load: false,
    });   
  }

  searchData= (value)=>{
    let newArticles = []; 
    this.state.articles.forEach(element => {
      if(element.title.includes(value) || element.description.includes(value)) newArticles.push(element); 
    });
    this.setState({articles: newArticles}); 
  }

  async componentDidMount(){    window.scrollTo(0,0); 
    this.setState({progress: 10})
    await this.fetchData();    
    this.setState({progress: 100})
  }

  fetchMoreData = async ()=>{    console.log("fetch More")
    this.setState({page: this.state.page + 1}, ()=>{
      this.fetchData(); 
    })
  }

  searchArticle = ()=>{
    if(this.state.searchedData==="") return; 
    let newArticles = []; 
    for(let i=0; i<this.state.articles.length; i++){
      let ele = this.state.articles[i]; 
      if(ele.title && ele.description && (ele.title.includes(this.state.searchedData) || ele.description.includes(this.state.searchedData))){
        newArticles.push(ele); 
      }
    }
    if(newArticles.length !==0 )
      this.setState({articles: newArticles}); 
    else alert("No Match found")
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
        <div className='w-[90%] mx-auto mt-[5rem] pb-[0.5rem]'>
        {this.state.articles.length>0 && <h1 className='text-3xl text-center mb-3'>NewsMonk - {this.capitalize(this.props.category)}</h1>}
        { this.state.articles.length>0 && <div className='w-[30%] mx-auto my-[1rem]'>
              <form autoComplete="off">   
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input onChange={(e) => {
                          this.setState({searchedData: e.target.value})}} type="text" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search news.." required/>

                          <button type="button" className="text-white absolute end-1 top-[50%] translate-y-[-50%]  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={this.searchArticle}>Search</button>
                    </div>
              </form>
        </div>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.state.searchedData.length===0 && this.fetchMoreData}
            hasMore={this.state.totalResults!==this.state.articles.length}
            loader={this.state.searchedData.length===0 && <Loading/>}
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
