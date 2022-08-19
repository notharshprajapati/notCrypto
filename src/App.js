import axios from "axios";
import React ,{ useState, useEffect, useContext} from 'react';
import {Routes,Route} from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./routes/Coin";
import Navbar from "./components/Navbar";

export const SearchContext=React.createContext();

const App = () => {
  const [coins,setCoins]= useState([]);
  const [allCoins,setAllCoins]=useState([]);
  const [toggleSort,setToggleSort]=useState(false);
  const [toggleSearchIcon,setToggleSearchIcon]=useState(false);

  const getApiData=async()=>{
    try{
      const response= await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false");  
      let allCoinsData=response.data;
      setAllCoins(allCoinsData);
      setCoins(allCoinsData);
      
    }catch(err)
    {
      console.log(err);
    }

  }

  useEffect(()=>{
    getApiData();
  },[]);

  const filterCoin=(coin)=>{
      //all coins is an array which pass reference to originalCoins variable
      let originalCoins=allCoins;

      let filterData=originalCoins.filter((coinObj)=>{
        return coinObj.id.includes(coin.toLowerCase());
      })
      setCoins(filterData); 
  }

  const sortUpPrice=()=>{
    if(toggleSort==false)
    {
      //sort method change original totalCoiuns array so that why we spread value of allCoins into new totalCoins variable
      let totalCoins=[...allCoins];
      
      totalCoins.sort((a,b)=>{
        return b.current_price-a.current_price;
      })   
      setCoins(totalCoins);
      setToggleSort(!toggleSort);
    }else{
      removeSort();
    }
  }


  const sortDownPrice=()=>{
    if(toggleSort==false)
    {
    //sort method change original totalCoiuns array so that why we spread value of allCoins into new totalCoins variable
      let totalCoins=[...allCoins];

      totalCoins.sort((a,b)=>{
        return a.current_price-b.current_price;
      })   

      setCoins(totalCoins);
      setToggleSort(!toggleSort);
    }else{
      removeSort();
    }
    
  }

  const removeSort=()=>{
    setCoins(allCoins);
    setToggleSort(!toggleSort);
  }


  return (
    <>
    <SearchContext.Provider value={{toggleSearchIcon,setToggleSearchIcon}}>

      <Navbar filterCoin={filterCoin}/>
      <Routes>

        <Route path="/" element={<Coins coins={coins} sortUpPrice={sortUpPrice} sortDownPrice={sortDownPrice}/>} />
        
        <Route path="/coin" element={<Coin/>}>
          <Route path=":coinId" element={<Coin/>} />
        </Route>

      </Routes>
    
    </SearchContext.Provider>
    </>
  )
}

export default App;