import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import "./ArtistDashboard.css";

const ArtistDashboard = () => {
  const [activeSection, setActiveSection] = useState("articles");
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Dummy articles data
  const [articles, setArticles] = useState([
    { id: 1, title: "The Beauty of Abstract Art", content: "Abstract art brings imagination alive..." },
    { id: 2, title: "Color Theory in Modern Painting", content: "Artists use colors to create emotions..." },
  ]);

  // Handle delete
  const handleDelete = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  // Handle edit (simple alert for demo)
  const handleEdit = (id) => {
    const article = articles.find((a) => a.id === id);
    alert(`Edit article: ${article.title}`);
  };

  // Handle upload
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });

  const handleUpload = () => {
    if (newArticle.title && newArticle.content) {
      setArticles([
        ...articles,
        { id: Date.now(), title: newArticle.title, content: newArticle.content },
      ]);
      setNewArticle({ title: "", content: "" });
      setActiveSection("articles"); // go back to articles list
    } else {
      alert("Please fill out all fields!");
    }
  };

  // ✅ Handle Logout → Redirect to homepage
  const handleLogout = () => {
    // Optionally clear auth/session storage here
    navigate("/"); // Redirect to homepage
  };

  // Render content based on active section
  const renderSection = () => {
    switch (activeSection) {
      case "articles":
        return (
          <div>
            <h2>My Articles</h2>
            <div className="articles-grid">
              {articles.map((article) => (
                <div key={article.id} className="article-card">
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <div className="article-actions">
                    <button onClick={() => handleEdit(article.id)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {articles.length === 0 && <p>No articles yet. Upload one!</p>}
            </div>
          </div>
        );

      case "upload":
        return (
          <div>
            <h2>Upload Article</h2>
            <div className="upload-form">
              <input
                type="text"
                placeholder="Article Title"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              />
              <textarea
                placeholder="Article Content"
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
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
        <h1>Artist Dashboard</h1>
        <nav className="nav-links">
          <button
            className={`nav-link ${activeSection === "articles" ? "active" : ""}`}
            onClick={() => setActiveSection("articles")}
          >
            My Articles
          </button>
          <button
            className={`nav-link ${activeSection === "upload" ? "active" : ""}`}
            onClick={() => setActiveSection("upload")}
          >
            Upload Article
          </button>
        </nav>

        {/* Profile + Logout */}
        <div className="sidebar-bottom">
          <div className="profile-card">
            <div className="profile-info">
              <div className="name">John Doe</div>
              <div className="role">Artist</div>
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
