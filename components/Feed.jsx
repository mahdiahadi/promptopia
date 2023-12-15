"use client"

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data,handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
          <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}
const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchedresults, setSearchedresults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchData = async (e) => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data)
  }

  useEffect(() => {
    fetchData();
  },[])
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator?.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedresults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setsearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedresults(searchResult);
  };

   return (
    <section className="feed">
      <form  className="relative w-full flex-center">
        <input
         type="text" 
         placeholder="Search for a tag or username"
         value={searchText}
         onChange={handleSearchChange}
         required
         className="search_input peer"
         />
      </form>
      {
        searchText ? (
          <PromptCardList
            data={searchedresults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList
            data={allPosts}
            handleTagClick={handleTagClick}
          />
        )
      }
    </section>
  )
}

export default Feed