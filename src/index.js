import React, { useState, createRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

import { Container, Row, Col } from "react-grid-system";
//API-key :  MfwZLqWeh1YPrvrlULOqgzZfOlRkIR7r
/*
  Instructions:
    part1:
    You're given the UI for a basic form. Your task is to 
    hook it all up using refs. 

    The `Focus X Input` buttons should focus that specific input
    field.

    The `Submit` button should log `name`, `email`, and `password`
    to the console.

    The `Reset` button should result all of the input fields to 
    empty strings.

    part2: 
    Develop a search tag with debounce functionality.
    Debouncing means that a function will not be called again until
    a certain amount of time has passed. So here the setsearch method
    is called repeatedly for every key stroke, instead it should
    be delayed by the time peroid mentioned in the debounce method (add some 
    console log to validate this no need to use any api mock). 
    It should avoid memory leaks and the solution provided should be scalable.
    
    For api integration create an account in https://developers.giphy.com/dashboard/
    Once you have got your API token refer the search api docs page

    eg: api endpoint
    https://api.giphy.com/v1/gifs/search?api_key=< your api token >&q=<search value>

    Display the result images below in a 4x4 grid box, you can choose any size of your preference

    NOTE: 
    do not use any external library like lodash

*/

function ReactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted values are:");

    console.log(nameref.current.value);
    console.log(emailref.current.value);
    console.log(passref.current.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    nameref.current.value = "";
    emailref.current.value = "";
    passref.current.value = "";
    console.log("Reset values are :");

    console.log(nameref.current.value);
    console.log(emailref.current.value);
    console.log(passref.current.value);
  };

  const nameref = createRef();
  const emailref = createRef();
  const passref = createRef();

  const [imgURL, setimagURl] = useState([]);

  const handleSearch = (value) => {
    // add your api logic here
    const url = `https://api.giphy.com/v1/gifs/search?api_key=MfwZLqWeh1YPrvrlULOqgzZfOlRkIR7r&q=${value}`;
    axios.get(url).then((res) => {
      console.log("API response is ", res.data.data[0].images.original.url);
      let images = res.data.data.map((ele) => ele.images.original.url);
      console.log(images.length);
      setimagURl(images);
    });
  };

  const debounce = (callback, delay) => {
    // add your debounce logic here
    let dbncTimer;
    return function () {
      const currCtxt = this;
      const argmnts = arguments;
      clearTimeout(dbncTimer);
      dbncTimer = setTimeout(() => callback.apply(currCtxt, argmnts, delay));
    };
  };

  // do not modify this line
  const debouncedSearch = debounce(handleSearch, 1000);
  //const debouncedSearch = debounce(handleSearch, 1000);
  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" ref={nameref} type="text" />
        </label>
        <label>
          Email:
          <input placeholder="email" ref={emailref} type="text" />
        </label>
        <label>
          Password:
          <input placeholder="password" ref={passref} type="text" />
        </label>
        <hr />
        <button onClick={() => nameref.current.focus()}>
          Focus Name Input
        </button>
        <button onClick={() => emailref.current.focus()}>
          Focus Email Input
        </button>
        <button onClick={() => passref.current.focus()}>
          Focus Password Input
        </button>
        <hr />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
        <button onClick={(e) => handleReset(e)}>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            // do not modify this line
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </label>
        <Container>
          <Row>
            {imgURL?.map((ele, index) => (
              <Col key={index} sm={4}>
                <img src={ele} alt={ele} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<ReactForm />, rootElement);
