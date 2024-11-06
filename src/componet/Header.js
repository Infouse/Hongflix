import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/reset.scss'
import '../styles/Header.scss'
import store from '../store'


const Header = ()=>{
  const {resetPageNum} = store()
  return(
    <header className='headerBox'>
          <div>
            <Link to='/' className='logo' onClick={resetPageNum}>YFILX</Link>
          </div>
          <ul className='headerNav'>
            <li>
              <Link to='/' className='Navbar' onClick={resetPageNum}>Home</Link>
            </li>
            <li>
              <Link to='/movieList' state='movies' className='Navbar' onClick={resetPageNum}>Movies</Link>
            </li>
            <li>
              <Link to='/movieList' state="tv" className='Navbar' onClick={resetPageNum}>TV Series</Link>
            </li>
          </ul>
     </header>
  )
}

export default Header