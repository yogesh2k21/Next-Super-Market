import "../styles/globals.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  let router = useRouter();

  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);

  const logout = () => {
    console.log("removing token from localStorage....");
    toast.success('Successfully logout!')
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({ value: null }); //setting user value to null so that _app.js will re render the navbar and remove the login botton and add logout button bcoz they are depend on user.value in code
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  useEffect(() => {
    console.log("hey i am _app.js useEffect");

    const token = localStorage.getItem("token");
    if (token) {
      console.log("changing user value");
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        />
      <Navbar logout={logout} user={user} key={key} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
