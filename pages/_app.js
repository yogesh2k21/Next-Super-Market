import '../styles/globals.css'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Navbar/>
  <Component {...pageProps} />
  <Footer/>
  </>
  )}

export default MyApp
