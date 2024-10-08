import React, { useState } from "react";
import "./SearchForBusinesses.css";

const SearchForBusinesses = ({ title, posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Number of posts to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get the current posts to display
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="content-container">
      <div className="post-section">
        <div className="post-header">
          <h2>{`Top 10 Best ${title} in Riyadh`}</h2>
          <select className="sort-dropdown">
            <option>Sort by</option>
            <option>Rating</option>
            <option>Most Popular</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="posts">
          {currentPosts.map((post, index) => (
            <div key={index} className="post">
              <img src={post.image} alt={post.title} className="post-image" />
              <div className="post-info">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-rating">Rating: {post.rating}</p>
                <p className="post-description">{post.description}</p>
                <p className="post-hours">Opening Hours: {post.openingHours}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForBusinesses;
