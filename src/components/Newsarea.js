import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'


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
    }
    document.title = `NewsMonk | ${this.capitalize(this.props.category)}`; 
    console.log(window.title)
  }

  async fetchData(){
    console.log(this.state.page)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d1cc03e7acc04698909b90530ef0bd9c&page=${this.state.page}`
    this.setState({load:true})
    let response =await fetch(url);
    let data =await response.json(); 
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      load: false,
    });    
  }

  componentDidMount(){
    
    this.fetchData();    
  }

  increment = ()=>{
    console.log(this.state.page)
    this.setState({page: this.state.page + 1}, ()=>{
      this.fetchData(); 
    })
  }

  decrement = ()=>{
    console.log(this.state.page)
    this.setState({page: this.state.page - 1}, ()=>{
      this.fetchData();     
    })
  }

  capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1); 
  }
  render(){
    window.scrollTo(0,0);
    return(
      <div className='w-[90%] mx-auto mt-[5rem]'>
      {this.state.load && <Loading/>}
      <h1 className='text-3xl text-center mb-3'>NewsMonk - {this.capitalize(this.props.category)}</h1>
      <div className='flex align-center justify-evenly flex-wrap gap-1'>
        {!this.state.load && this.state.articles.map((ele) =>{
          return <NewsItem title={ele.title ? (ele.title.length >80 ? ele.title.slice(0,80) : ele.title) : this.defaultTitle} description={ele.description ? (ele.description.length >150 ? ele.description.slice(0,150) : ele.description) : this.defaultDesc} imgUrl={ele.urlToImage ?ele.urlToImage :  this.defaultImg} url={ele.url ? ele.url : "/"} author={ele.author} time={ele.publishedAt} name={ele.source.name} key={ele.url}/>
        })}
      </div>

      <div className="w-[100%] p-3 container flex justify-between">
            <button type="button" className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3" disabled={this.state.page <= 1} onClick={this.decrement}>
          <div className="flex flex-row align-middle">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
            </svg>
            <p className="ml-2">Prev</p>
          </div>
        </button>
        <button type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3" disabled={this.state.page >= Math.ceil(this.state.totalResults/20)} onClick={this.increment}>
          <div className="flex flex-row align-middle">
            <span className="mr-2">Next</span>
            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </div>
        </button>
        </div>
      </div>
    )
    
  }
}
