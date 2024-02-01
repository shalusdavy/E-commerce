import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import axios from 'axios';


const Home = () => {

const [post ,setpost]=useState([]);

useEffect(()=>{
  axios.get("http://localhost:3001").then((response)=>{
    setpost(response.data);
  });
},[])
// alert("hai")
console.log(post);


  
  const count = () => {
    return post.length; 
};
console.log(count());

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
        <Searchbar />

        <div className="shopping-cart" >
     <h6 style={{background:"white",borderRadius:"50%",width:"12px"
   }}>  {count()}</h6>
          <span class="material-symbols-outlined">shopping_cart</span>
        </div>
      </div>

      <div className="categories">
        {post.map((posts) => (
          <div key={posts.id} className="category">
            <img src={posts.image} alt={posts.name} />
            <img src={posts.image} alt={posts.name} />
            <img src={posts.image} alt={posts.name} />
            <img src={posts.image} alt={posts.name} />
            <img src={posts.image} alt={posts.name} />
            <h3>{posts.price}</h3>
            <p>{posts.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
