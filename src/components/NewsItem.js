import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, url, author, time, name} = this.props; 
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
            <p className='absolute right-0 top-0 bg-[#0c0c17bf] text-sm rounded-md p-[3px] text-white'>{name ? name : "google.com"}</p>
            <img className="rounded-t-lg w-[100%] h-[30vh] object-cover" src={imgUrl} alt=""/>
            
            <div className="p-5 flex h-[calc(100% - 30vh)] justify-between flex-col">
                <a href={url}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}...</h5>
                </a>
                <div className="mb-2 font-normal text-gray-700 dark:text-gray-400 overflow-hidden">{description}..</div>
                <div className="mb-3 text-xs text-white dark:text-white overflow-hidden">By {author ? author : "unknown"} at {time ? new Date(time).toGMTString() : "12:00"}</div>
                <a href={url} target='__blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-max">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    )
  }
}
