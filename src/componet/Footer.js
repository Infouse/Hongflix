import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.scss'


const Footer = () => {
  return (
    <footer>
      <h2>YFILX</h2>
      <ul>
        <li className='footerBox'>
          <Link to='/'>Home</Link>
          <Link to='/'>Live</Link>
          <Link to='/'>You must watch</Link>
          <Link to='/'>Contact us</Link>
          <Link to='/'>FAQ</Link>
          <Link to='/'>Recent release</Link>
          <Link to='/'>Term of services</Link>
          <Link to='/'>Primium</Link>
          <Link to='/'>Top IMDB</Link>
          <Link to='/'>About us</Link>
          <Link to='/'>Pravacy policy</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer