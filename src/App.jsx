// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Search2 from './searchDestructuringPropsRightAway.jsx';
import Search from './searchBasicDestructuring.jsx';

import './App.css'

import RenderListDestructuringPropsInFunctionSignature from "./renderListDestructuringPropsInFunctionSignature.jsx";
import RenderListUsingRestDestructuring from "./renderListUsingRestDestructuring.jsx";
import RenderListUsingSpreadDotDotOperatorVariation1 from "./renderListUsingSpreadDotDotOperatorVariation1.jsx";
import RenderListUsingSpreadDotDotOperatorVariation2 from "./renderListUsingSpreadDotDotOperatorVariation2.jsx";

//Declaration of App component
function App() {

  const welcome = {
     greeting: 'Hey',
     title: "Chito",
  };
  
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
 
   //get an item from local storage called "search" and use that 
   //value to init searchTerm otherwise use "React"

   //The solution is complete but it has a flaw now that might cause bugs.
   //The Flaw:
   //The localstorage is only updated in the event handler "handleSearch".
   //If we use setSearchTerm somewhere in our app we break the code
   //because localstorage is not updated.

   //The solution: - use React's useEffect Hook
   //Handle the side-effect in a centralized location not in a specific handler
   const [searchTerm, setSearchTerm] = React.useState(
     localStorage.getItem('search') || 'React'
    );
  
  //useEffect hook
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    console.log(`Event passed in by Search  component to parent via  
                Callback handleChange is = ' ${event.target.value} `);
    //set the state based on this value
    setSearchTerm(event.target.value); 

    //First, use local storage to store search term from previous iteration.
    //local storage is updated in the event handler. Do this in useEffect Hook
    //localStorage.setItem('search', event.target.value);
}

  //Now filter the search output based on what has been inputted in the search box.
  //filter() is a method of an object. In this case stories. 
  //It could be made more concise by using an arrow function with an 
  //immediate return. 
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
       <h1> 
          {welcome.greeting} {welcome.title}
      </h1>
       
       {/* // B - Pass in a callback handler as prop to search component*/}
       <Search search={searchTerm} onSearch={handleSearch} />; 

       <hr/>

        {/* <RenderListDestructuringPropsInFunctionSignature list={searchedStories} /> */}
       {/* <RenderListUsingRestDestructuring list={searchedStories} /> */}
       {/* <RenderListUsingSpreadDotDotOperatorVariation1 list={searchedStories}/> */}
       <RenderListUsingSpreadDotDotOperatorVariation2 list={searchedStories}/>

    </div>
  )
}

export default App
