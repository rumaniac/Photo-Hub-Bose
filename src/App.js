import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchingData } from "./redux/actions";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.pageNumber = 1;
    dispatch(fetchingData(sessionStorage.pageNumber, ""));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

export default App;
