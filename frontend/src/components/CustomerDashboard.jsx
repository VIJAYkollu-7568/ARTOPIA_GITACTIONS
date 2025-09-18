import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import "./CustomerDashboard.css";

const artworks = [
  { id: 1, title: "Sunset Bliss", description: "A vibrant painting capturing the beauty of a sunset.", price: "$120", artist: "Alice Johnson", category: "acrylic", image: "https://picsum.photos/id/1015/400/250" },
  { id: 2, title: "Village Harmony", description: "Traditional art showcasing village life in harmony with nature.", price: "$200", artist: "Rajesh Kumar", category: "historical", image: "https://picsum.photos/id/1025/400/250" },
  { id: 3, title: "Abstract Dreams", description: "A bold abstract piece with splashes of imagination.", price: "$180", artist: "Sophia Brown", category: "painting", image: "https://picsum.photos/id/1035/400/250" },
  { id: 4, title: "Ancient Tales", description: "Historical artwork depicting cultural heritage.", price: "$300", artist: "Anita Sharma", category: "historical", image: "https://picsum.photos/id/1045/400/250" },
  { id: 5, title: "Color Splash", description: "Acrylic artwork with bold and vibrant colors.", price: "$220", artist: "Michael Lee", category: "acrylic", image: "https://picsum.photos/id/1055/400/250" },
];

const CustomerDashboard = () => {
  const [activeSection, setActiveSection] = useState("explore");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const navigate = useNavigate(); // ✅ initialize navigate

  // Simulating logged-in user info
  const [profile] = useState({
    name: "Alice Smith",
    role: "Art Collector",
    email: "alice@example.com",
    image: null,
  });

  // ✅ Logout function
  const handleLogout = () => {
    // Clear any user session/auth here if needed
    navigate("/"); // Redirect to homepage
  };

  // Explore / Category Page
  const renderExplore = () => {
    let filteredArtworks = artworks;
    if (activeSection !== "explore") {
      filteredArtworks = artworks.filter((art) => art.category === activeSection);
    }

    if (selectedArtwork) {
      return (
        <div className="artwork-detail">
          <img src={selectedArtwork.image} alt={selectedArtwork.title} className="detail-img" />
          <h2>{selectedArtwork.title}</h2>
          <p>{selectedArtwork.description}</p>
          <p><strong>Artist:</strong> {selectedArtwork.artist}</p>
          <p><strong>Price:</strong> {selectedArtwork.price}</p>
          <button className="cart-btn" onClick={() => alert("Added to cart!")}>Add to Cart</button>
          <button className="back-btn" onClick={() => setSelectedArtwork(null)}>Back</button>
        </div>
      );
    }

    return (
      <>
        <h2 className="section-title">
          {activeSection === "explore"
            ? "Explore All Arts"
            : `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Arts`}
        </h2>
        <div className="artworks-grid">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art) => (
              <div key={art.id} className="art-card" onClick={() => setSelectedArtwork(art)}>
                <img src={art.image} alt={art.title} />
                <h3>{art.title}</h3>
                <p>{art.artist}</p>
                <p>{art.price}</p>
              </div>
            ))
          ) : (
            <p>No artworks available in this category.</p>
          )}
        </div>
      </>
    );
  };

  const renderCart = () => (
    <div className="cart-page">
      <h2 className="section-title">My Cart</h2>
      <p>Your cart is currently empty.</p>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-page">
      <h2 className="section-title">My Orders</h2>
      <p>You don’t have any orders yet.</p>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "explore":
      case "historical":
      case "acrylic":
      case "painting":
        return renderExplore();
      case "cart":
        return renderCart();
      case "orders":
        return renderOrders();
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="customer-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Customer Dashboard</h1>
        <nav className="nav-links">
          <button className={`nav-link ${activeSection === "explore" ? "active" : ""}`} onClick={() => { setActiveSection("explore"); setSelectedArtwork(null); }}>Explore All Arts</button>
          <button className={`nav-link ${activeSection === "historical" ? "active" : ""}`} onClick={() => { setActiveSection("historical"); setSelectedArtwork(null); }}>Historical Arts</button>
          <button className={`nav-link ${activeSection === "acrylic" ? "active" : ""}`} onClick={() => { setActiveSection("acrylic"); setSelectedArtwork(null); }}>Acrylic Arts</button>
          <button className={`nav-link ${activeSection === "painting" ? "active" : ""}`} onClick={() => { setActiveSection("painting"); setSelectedArtwork(null); }}>Paintings</button>
          <button className={`nav-link ${activeSection === "cart" ? "active" : ""}`} onClick={() => { setActiveSection("cart"); setSelectedArtwork(null); }}>My Cart</button>
          <button className={`nav-link ${activeSection === "orders" ? "active" : ""}`} onClick={() => { setActiveSection("orders"); setSelectedArtwork(null); }}>My Orders</button>
        </nav>

        {/* Bottom Profile + Logout */}
        <div className="sidebar-bottom">
          <div className="profile-card">
            {profile.image ? (
              <img src={profile.image} alt="Profile" className="profile-avatar" />
            ) : (
              <FaUserCircle size={40} />
            )}
            <div className="profile-info">
              <p className="name">{profile.name}</p>
              <p className="role">{profile.role}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">{renderSection()}</main>
    </div>
  );
};

export default CustomerDashboard;
