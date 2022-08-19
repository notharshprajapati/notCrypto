import React, { useContext, useEffect, useState } from 'react';
import "./Coins.css";
import CoinItem from './CoinItem';
import Coin from '../routes/Coin';
import {Link} from "react-router-dom";
import { BsFillCaretDownFill,BsFillCaretUpFill } from 'react-icons/bs';
import { SearchContext } from '../App';

const PER_PAGE=25;
//Offset = currPage*PER_PAGE
//Offset= 0*25=0
//slice(0,25)

const Coins = (props) => {
    const [currPage,setCurrPage]=useState(0);
    const [offset,setOffset]=useState(0);
    const [active,setActive]=useState("1");

    const {toggleSearchIcon,setToggleSearchIcon}=useContext(SearchContext);

    const handleUpArrow=()=>{
        props.sortUpPrice();
    }
    
    const handleDownArrow=()=>{
        props.sortDownPrice();
    }

    const handlePages=(e)=>{
        setCurrPage(e.target.textContent-1);
        setActive(e.target.textContent)
    }

    useEffect(()=>{
      //At beginning offset is set to 0 because of current page 
      setOffset(currPage*PER_PAGE);
    },[currPage])
    
    useEffect(()=>{
        setToggleSearchIcon(true)
    },[])

  return (
    <>
        <div className="container">
            <div>
                <div className="heading">
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>
                        <BsFillCaretDownFill onClick={handleDownArrow}/>
                        <span> Price </span>
                       <BsFillCaretUpFill onClick={handleUpArrow} /> 
                    </p>
                    <p>24h</p>
                    <p className='hide-mobile'>Volume</p>
                    <p className='hide-mobile'>Mkt Cap</p>
                </div>

            {   
                props.coins.slice(offset,offset+PER_PAGE).map((coin)=>{
                    return (
                        <Link to={`/coin/${coin.id}`} element={<Coin/>} key={coin.id} >
                            <CoinItem coin={coin}/>
                        </Link>
                    )
                })
            }
            </div>
        </div>

        <div className="text-center">


        <nav aria-label="Page navigation example">
        <ul className="pagination">
            
            <li className={active==="1"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>1</a></li>
            <li className={active==="2"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>2</a></li>
            <li className={active==="3"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>3</a></li>
            <li className={active==="4"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>4</a></li>
            <li className={active==="5"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>5</a></li>
            <li className={active==="6"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>6</a></li>
            <li className={active==="7"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>7</a></li>
            <li className={active==="8"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>8</a></li>
            <li className={active==="9"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>9</a></li>
            <li className={active==="10"?"page-item active":"page-item"} onClick={handlePages}><a className="page-link" href='#'>10</a></li>
            
        </ul>
        </nav>
        
        </div>
    </>
  )
}

export default Coins


