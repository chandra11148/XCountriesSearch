import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) =>{ setCountries(data);setFilteredData(data)})
      .catch((err) => console.error("Error ", err));
  }, []);
  useEffect(()=>{
    if(searchText==""){
      setFilteredData(countries);
    }else{
      const filterData = countries.filter((country)=>country.name.common.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredData(filterData);
    }
  },[searchText]);
  const handleInput =(e)=>{
    setSearchText(e.target.value);
  };
  const wraperStyle ={
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    heigth:"100vh",
    width:"100vw"
  };
  const inputContainer={
    padding:"10px",
    width:"100vw",
    
    
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    boderBottom:"1px solid #000"
  }
  const inputStyle={
    padding:"4px",
    width:"50%",
    borderRadius:"5px",
    fontWeight:"700",
    border:"2px solid #000"
  }
  const cardContainer={
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    padding:"10px"
  }
  const cardStyle ={
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:'center',
    border:"1px solid black",
    padding:"10px",
    marginLeft:"25px",
    marginTop:"10px",
    width:"20%",
    textAlign:"center"
  }
  return <>
    <div style={wraperStyle}>
      <div style={inputContainer}>
        <input type="text" value={searchText} onChange={handleInput} style={inputStyle} placeholder="search a country"/>
      </div>
      <div style={cardContainer}>
        {filteredData && filteredData.map((country)=>(
          <div key={country.cca3} style={cardStyle} className="countryCard">
            <img src={country.flags.png} alt={country.flags.alt} width="50%"/>
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  </>;
}

export default App;
