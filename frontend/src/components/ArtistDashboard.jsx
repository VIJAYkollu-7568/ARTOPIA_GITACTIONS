import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ArtistDashboard.css";

const ArtistDashboard = () => {
  const [activeSection, setActiveSection] = useState("allPosts");
  const navigate = useNavigate();

  // ✅ Fetch logged-in user details (dummy or from localStorage/sessionStorage)
  const [user, setUser] = useState({ name: "John Doe", role: "Artist" });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Dummy data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Beauty of Abstract Art",
      content: "Abstract art brings imagination alive...",
    },
    {
      id: 2,
      title: "Color Theory in Modern Painting",
      content: "Artists use colors to create emotions...",
    },
  ]);

  const [customers] = useState([
    { id: 1, name: "Alice", purchases: 5 },
    { id: 2, name: "Bob", purchases: 2 },
  ]);

  const [artists] = useState([
    { id: 1, name: "David", style: "Abstract" },
    { id: 2, name: "Sophia", style: "Realism" },
  ]);

  // Upload state
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleUpload = () => {
    if (newPost.title && newPost.content) {
      setPosts([
        ...posts,
        { id: Date.now(), title: newPost.title, content: newPost.content },
      ]);
      setNewPost({ title: "", content: "" });
      setActiveSection("allPosts");
    } else {
      alert("Please fill out all fields!");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user
    navigate("/"); // redirect
  };

  // Render sections
  const renderSection = () => {
    switch (activeSection) {
      case "customers":
        return (
          <div>
            <h2>My Customers</h2>
            <ul>
              {customers.map((c) => (
                <li key={c.id}>
                  {c.name} – Purchases: {c.purchases}
                </li>
              ))}
            </ul>
          </div>
        );

      case "artists":
        return (
          <div>
            <h2>My Artists</h2>
            <ul>
              {artists.map((a) => (
                <li key={a.id}>
                  {a.name} – Style: {a.style}
                </li>
              ))}
            </ul>
          </div>
        );

      case "allPosts":
        return (
          <div>
            <h2>All Posts</h2>
            <div className="articles-grid">
              {posts.map((p) => (
                <div key={p.id} className="article-card">
                  <h3>{p.title}</h3>
                  <p>{p.content}</p>
                </div>
              ))}
              {posts.length === 0 && <p>No posts yet. Upload one!</p>}
            </div>
          </div>
        );

      case "upload":
        return (
          <div>
            <h2>Upload Post</h2>
            <div className="upload-form">
              <input
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              <textarea
                placeholder="Post Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              ></textarea>
              <button onClick={handleUpload} className="upload-btn">
                Upload
              </button>
            </div>
          </div>
        );

      default:
        return <p>Select a section</p>;
    }
  };

  return (
    <div className="artist-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Dashboard</h1>
        <nav className="nav-links">
          <button
            className={`nav-link ${
              activeSection === "customers" ? "active" : ""
            }`}
            onClick={() => setActiveSection("customers")}
          >
            My Customers
          </button>
          <button
            className={`nav-link ${
              activeSection === "artists" ? "active" : ""
            }`}
            onClick={() => setActiveSection("artists")}
          >
            My Artists
          </button>
          <button
            className={`nav-link ${
              activeSection === "allPosts" ? "active" : ""
            }`}
            onClick={() => setActiveSection("allPosts")}
          >
            All Posts
          </button>
          <button
            className={`nav-link ${activeSection === "upload" ? "active" : ""}`}
            onClick={() => setActiveSection("upload")}
          >
            Upload Post
          </button>
        </nav>

        {/* Profile + Logout */}
        <div className="sidebar-bottom">
          <div className="profile-card">
            <div className="profile-info">
              <div className="name">{user.name}</div>
              <div className="role">{user.role}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">{renderSection()}</main>
    </div>
  );
};

export default ArtistDashboard;
