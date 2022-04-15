import '../styles/globals.css'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
  <Navbar/>
  <Component {...pageProps} />
  <Footer/>
  </>
  )}

export default MyApp
