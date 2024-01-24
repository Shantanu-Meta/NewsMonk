import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  constructor(){
    super(); 
    sessionStorage.getItem("focus")===null ? sessionStorage.setItem("focus","General") : console.log("OK")
    this.state = {
      focus: sessionStorage.getItem("focus")
    }
  }
  changeState(field){
    this.setState({
      focus: field
    }); 
    sessionStorage.setItem("focus",field)
  }

  render() {
    return (
      <div className="fixed top-0 left-0 w-full z-10	">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="  max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" style={this.state.focus==="General" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("General")}}>
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="relative self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NewsMonk
                <span className='absolute bottom-[-50%] left-0 text-sm dark:text-white ml-0'>By- <a href='https://shantanu-meta.github.io/Shantanu-portfolio/'>Shantanu</a></span></span>
                
            </Link>
            <button  type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"  data-accordion-target="#navbar-default" aria-expanded="true" aria-controls="navbar-default">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li style={this.state.focus==="General" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("General")
                  }}>
                  <Link to="/" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">General</Link>
                  </li>
                  <li style={this.state.focus==="Science" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("Science")}}>
                  <Link to="/science" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >Science</Link>
                  </li>
                  <li style={this.state.focus==="Sports" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("Sports")}}>
                  <Link to="/sports" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >Sports</Link>
                  </li>
                  <li style={this.state.focus==="Technology" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("Technology")}}>
                  <Link to="/technology" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Technology</Link>   
                  </li>
                  <li style={this.state.focus==="Health" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("Health")}}>
                  <Link to="/health" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >Health</Link>
                  </li>
                  <li style={this.state.focus==="Business" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("Business")}}>
                  <Link to="/business" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Business</Link>
                  </li>
                  <li style={this.state.focus==="Entertainment" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("Entertainment")}}>
                  <Link to="/entertainment" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Entertainment</Link>
                  </li>
                  <li style={this.state.focus==="About" ? {color:"blue"} : {color:"white"}} onClick={()=>{
                    this.changeState("About")}}>
                  <Link to="/About" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">About</Link>
                  </li>
              </ul>
            </div>
        </div>
        </nav>
      </div>
    )
  }
}
