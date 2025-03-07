import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"


const Layout = ()=>{
    return(
        <main>
            <Header/>
            <Outlet/>
            <hr className="my-10"></hr>
            <Footer/>
        </main>
    )
}

export default Layout;