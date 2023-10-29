import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import loading from '../assets/loading-animation2.gif'

export class Spinner extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className='flex h-[100vh] w-[100vw] justify-center items-center'>
        <img className="my-3 h-[30vh]" src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
