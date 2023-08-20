import React from 'react'

import mainLogo from '../../src/download (1).png';
import { Link } from 'react-router-dom'; 
import {ImSearch} from "react-icons/im"

export default function Header() {
  return (
    <>
    <nav className="header">
<img src={mainLogo} alt="" />
<div>
    <Link to="/tvshows">TV Shows</Link>
    <Link to="/tvshows">Movies</Link>
    <Link to="/tvshows">Recently Added</Link>
    <Link to="/tvshows">My List</Link>
</div>
<ImSearch />
    </nav>
      
    </>
  )
}
