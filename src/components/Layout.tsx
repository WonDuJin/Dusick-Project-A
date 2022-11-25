import { useState } from "react"
import Header from "./Header"
import Section1 from "./Section1"


const Layout = () =>{

  const [name, setName] = useState('KOSPI');

  const getStockType = (type:string) => {
    setName(type)
  }
  console.log(name)
  return(
    <>
      <Header getStockType={getStockType}></Header>
      <div>
        <main>

          <Section1 />
          
        </main>
      </div>
    </>
  )
}

export default Layout