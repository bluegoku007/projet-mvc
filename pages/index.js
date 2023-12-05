import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState,useEffect } from 'react'
import "bulma/css/bulma.css"
import  axios  from 'axios'
import { images } from '@/next.config'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [value, setvalue] = useState();
  const [Fajr, setFajr] = useState();
  const [Dhuhr,setDuhur]=useState();
  const [Asr, setAsr] = useState();
  const [Maghrib, setMaghrib] = useState();
  const [Isha, setIsha] = useState();
  const [temp, settemp] = useState();
  const [countries,setCountries] = useState([])
  const [country, setcountry] = useState("Afghanistan");
  const bg="https://source.unsplash.com/1600x900/?landscape"
  const [weather, setweather] = useState();
  const [population, setpopulation] = useState();
  const [capital, setcapital] = useState();
  const [flag, setflag] = useState();
  useEffect(() => {
    async function searchPressed2 (){
      const {data}=await axios.get(`https://unstats.un.org/unsd/amaapi/api/Country?countriesOnly=true`)
      setCountries(data)

   }
   searchPressed2()
  }, []);
  const apikey='71bce99a742e885d3c2118c14a53b32a'
  async function searchtemp(){
    const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=71bce99a742e885d3c2118c14a53b32a&units=metric`)
    settemp(data.main.temp)
    console.log(data.weather[0].main)
    setweather(data.weather[0].main)
    return data
  }
  async function searchpopulation(){
    const {data}=await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    setpopulation (data[0].population)
    setcapital (data[0].capital)
    setflag (data[0].flags.png)
  }
  async function searchPressed1 (){
      const {data}=await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${value}&country=${country}&method=8`)
      console.log(data.data.timings)

      setFajr(data.data.timings.Fajr)
      setDuhur (data.data.timings.Dhuhr)
      setAsr (data.data.timings.Asr)
      setMaghrib (data.data.timings.Maghrib)
      setIsha (data.data.timings.Isha)

    //  console.log('hello')
//      console.log(data.result)
   return data

}
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <h2 className='content is-large'>salat App</h2>
        <div class="field-body">
        <div><label className='label mr-5 mt-1'>select country</label></div>

                                    <div class="field is-narrow">
                                        <div class="control">
                                            <div class="select is-fullwidth">
                                            <select onChange={(e)=>{setcountry(e.target.value)}}>
                                                {countries&&countries.map((country) =>(<option key={country.countryName}>{country.countryName}</option>))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        <label className='label'>enter city name</label>
        <div class="columns">
            <div class="column is-half"><input className='input' onChange={(e)=>{setvalue(e.target.value)}}></input></div>
       <div className='column is-half'>
        <button className="button is-normal is-success" onClick={()=>{searchPressed1();searchtemp();searchpopulation()}}>Click</button>
        </div>
        </div>
        <div className='columns'>
        <div className='column is-one-fifth'>
        <div className='box '>
          <h4>Fajr</h4>
          <br></br>
          {Fajr}
        </div>
        </div>
        <div className='column is-one-fifth'>
        <div className='box '>
      <h4>Dhuhr:</h4>
        <br></br>  
          {Dhuhr}      
        </div>
        </div>
        <div className='column is-one-fifth'>
<div className='box '>
<h4>Asr</h4>
  <br></br>
{Asr}</div>
</div>
<div className='column is-one-fifth'>
<div className='box '>
  <h4>Maghrib:</h4>
  <br></br>
  {Maghrib}
  </div>
</div>
<div className='column is-one-fifth'>
<div className='box  mb-5 mr-1'>
 <h4>Isha:</h4>
  <br></br>
  {Isha}
  </div>
</div>
</div>
<div className='columns'>
    <div className='column is-half is-offset-one-quarter'>
    <div className='box'>
  <h2 className='text'>temperture:{temp} celisus</h2>
  <h2 className='text'>weather:{weather}</h2>
  <h2 className='text'>population:{population}</h2>
  <h2 className='text'>capital:{capital}</h2>
  <div className='columns'>
    <div className='column is-half is-offset-one-quarter'>
  <img classname='ml-6'src={flag}></img></div></div>

</div>
</div>
</div>
      </main>
    </>
  )
}
