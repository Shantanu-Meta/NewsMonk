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
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=10`
    let response =await fetch(url);
    let data =await response.json(); 
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
    },()=>{
      console.log(data.totalResults)
    console.log(this.state.articles.length)
    });   
    
  }

  async componentDidMount(){    
    window.scrollTo(0,0); 
    this.setState({progress: 10})
    await this.fetchData();    
    this.setState({progress: 100})
  }

  fetchMoreData = async ()=>{    
    console.log(this.state.load)
    this.setState({page: this.state.page + 1}, ()=>{
      this.fetchData(); 
    })
  }

  searchArticle = (event)=>{
    console.log(event.target.value)
    let val = event.target.value.toUpperCase();
    let cards = document.querySelectorAll(".card");
    cards = Array.from(cards)
    if(val.length===0){
      console.log("Got")
      this.setState({
        load: true,
      })    
    }else{
      this.setState({
        load: false,
      })  
    }
    cards.forEach(ele=>{
      let title = ele.querySelector('.title');
      let desc = ele.querySelector('.desc');
      if (title.textContent.toUpperCase().indexOf(val) > -1 || desc.textContent.toUpperCase().indexOf(val) > -1) {
        ele.style.display="block";
    } else {
        ele.style.display="none";
    }
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
                        <input onInput={this.searchArticle} type="text" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search news.." required/>
                    </div>
              </form>
        </div>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.state.load && this.state.articles.length!==this.state.totalResults &&  this.fetchMoreData}
            hasMore={this.state.totalResults!==this.state.articles.length}
            loader={this.state.load && this.state.articles.length!==this.state.totalResults && <Loading/>}
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
