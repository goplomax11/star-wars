import React from 'react';
import './header.css'

const Header = () =>{
    return (
        <div className='d-flex header item'>
            <div><h2>Star DB</h2></div>
            <a href='#' className='header-item'>People</a>
            <a href='#' className='header-item'>Planets</a>
            <a href='#' className='header-item'>Starships</a>
        </div>
    )
}

export default Header;