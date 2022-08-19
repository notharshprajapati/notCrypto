import React, { useContext, useEffect, useState } from 'react';
import "./Navbar.css";
import { FaCoins } from 'react-icons/fa';
import { FcSearch } from 'react-icons/fc';
import {Link} from "react-router-dom";
import { SearchContext } from '../App';

const Navbar = ({filterCoin}) => {
  const [toggleInput,setToggleInput]=useState(false);
  const [searchValue,setSearchValue]= useState("");

  const {toggleSearchIcon}=useContext(SearchContext);

  const handleValue=(e)=>{
    setSearchValue(e.target.value);
  } 

  const handleToggle=()=>{
    setSearchValue("");
    setToggleInput(!toggleInput);
  }

  useEffect(()=>{
    filterCoin(searchValue);
  },[searchValue])


  useEffect(()=>{
    if(toggleSearchIcon===false)
    {
      setToggleInput(false);
    }
  },[toggleSearchIcon])

  return (
    <Link to="/">
        <div className="navbar">

            <FaCoins className="icon"/>
            <h1>Crypto <span className='blue'>Coins</span></h1>
        
        </div>
            {
              toggleSearchIcon&&<FcSearch className='search-icon' onClick={handleToggle}/>
            }
        {
        
        toggleInput&&<div className='navbar'>
          <input type="search" name=""  placeholder='Search' value={searchValue} onChange={handleValue}/>
        </div>
        }
    </Link>
  )
}

export default Navbar