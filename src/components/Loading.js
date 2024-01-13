import React, { Component } from 'react'
import loading from '../assets/loading.gif'
export default class Loading extends Component {
  render() {
    return (
        <div className='w-full grid place-content-center'>
            <img src={loading} alt="Loading..." className='w-[70px] h-[70px]'/>
        </div>
    )
  }
}
