"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (p) =>
          p.prompt.includes(searchText) ||
          p.creator.username.includes(searchText) ||
          p.tag.includes(searchText)
      )
    );
  }, [searchText, posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
