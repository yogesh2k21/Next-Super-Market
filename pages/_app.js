import "../styles/globals.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  let router = useRouter();

  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);

  const logout = () => {
    console.log("removing token from localStorage....");
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({ value: null });
    setTimeout(() => {
      router.push("http://localhost:3000");
    }, 500);
  };

  useEffect(() => {
    console.log("hey i am _app.js useEffect");

    const token = localStorage.getItem("token");
    if (token) {
      console.log("changing user value");
      setUser({ value: token });
      setKey(Math.random());
    } else {
      // setUser({value:null})
      setKey(Math.random());
    }
  }, [router.query]); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <Navbar logout={logout} user={user} key={key} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
