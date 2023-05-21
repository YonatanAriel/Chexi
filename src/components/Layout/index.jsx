import Header from "../header"
import SongsContainer from '../SongsContainer'
import Footer from '../Footer'
import { Route, Routes } from "react-router-dom"
import Login from "../Login"
import SignUp from '../SignUp'
import LikedSongs from "../LikedSongs"
import PlayLists from "../PlayLists"
import styles from './style.module.css'
function Layout() {
  return ( <>
    <Header />
    <Routes>
        <Route path="/PlayLists" element={<PlayLists />}/>
        <Route path="/LikedSongs" element={<LikedSongs />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<SongsContainer />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Layout