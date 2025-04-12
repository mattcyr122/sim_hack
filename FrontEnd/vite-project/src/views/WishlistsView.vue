<template>
    <div id="app" class="app">
      <nav class="navbar">
        <div class="logo-container">
          <img :src="logo" alt="Logo" />
        </div>
        <ul class="nav-links">
          <li><a href="#">View Wishlists</a></li>
          <li><a href="HomeView.vue">Home</a></li>
        </ul>
        <button class="user-settings-btn" @click="toggleUserSettings">
          <span v-if="!showUserSettings">☰</span>
          <span v-else>✕</span>
        </button>
      </nav>
  
      <aside class="user-account-settings" :class="{ 'open': showUserSettings }">
        <div class="settings-header">
          <h2>User Settings</h2>
          <button class="close-settings-btn" @click="showUserSettings = false">✕</button>
        </div>
        <div class="settings-content">
          <p>Account Information</p>
          <p>Preferences</p>
          <p>Notifications</p>
        </div>
      </aside>
  
      <main class="main-content">
        <div class="wishlist-container">
          <header class="wishlist-header">
            <h1>🌟 Explore Wishlists</h1>
            <p class="subtitle">View and grant wishes from other users</p>
          </header>
          
          <section class="wishlist-items">
            <h2>Public Wishlists</h2>
            <div class="items-container">
              <div class="item-card" v-for="(wishlist, index) in publicWishlists" :key="index">
                <div class="item-content">
                  <div class="user-info">
                    <img :src="wishlist.userAvatar" alt="User Avatar" class="user-avatar">
                    <span class="username">{{ wishlist.username }}</span>
                  </div>
                  <h3>{{ wishlist.item }}</h3>
                  <p class="item-description">{{ truncateDescription(wishlist.description) }}</p>
                  <div class="item-actions">
                    <button class="item-btn view-detail" @click="openItemDetail(wishlist)">View Detail</button>
                    <button class="item-btn grant-wish">Grant Wish</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  
      <!-- Item Detail Modal -->
      <div class="modal-overlay" v-if="selectedItem" @click="selectedItem = null">
        <div class="modal-content" @click.stop>
          <button class="close-modal" @click="selectedItem = null">✕</button>
          <div class="modal-header">
            <div class="modal-user-info">
              <img :src="selectedItem.userAvatar" alt="User Avatar" class="modal-avatar">
              <span class="modal-username">{{ selectedItem.username }}</span>
            </div>
            <h2>{{ selectedItem.item }}</h2>
          </div>
          <div class="modal-body">
            <div class="item-image-container">
              <img :src="selectedItem.image" :alt="selectedItem.item" class="item-image">
            </div>
            <div class="item-details">
              <h3>Description</h3>
              <p>{{ selectedItem.description }}</p>
              <h3>Details</h3>
              <p>{{ selectedItem.details }}</p>
              <h3>Where to Find</h3>
              <p>{{ selectedItem.whereToFind }}</p>
            </div>
          </div>
          <div class="modal-actions">
            <button class="modal-btn grant-wish">Grant This Wish</button>
            <button class="modal-btn close" @click="selectedItem = null">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import logo from '@/assets/logo.svg'
  
  const showUserSettings = ref(false)
  const selectedItem = ref(null)
  
  const toggleUserSettings = () => {
    showUserSettings.value = !showUserSettings.value
  }
  
  const truncateDescription = (desc) => {
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
  }
  
  const openItemDetail = (item) => {
    selectedItem.value = item
  }
  
  // Sample data - replace with actual data from your backend
  const publicWishlists = ref([
    {
      username: "Alex Johnson",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      item: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for travel and daily commutes. Looking for the latest model with Bluetooth 5.0 and comfortable ear cushions.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      details: "Preferred brand: Sony or Bose\nColor: Black or Silver\nBudget: $200-$300",
      whereToFind: "Available at Best Buy, Amazon, or directly from manufacturer websites"
    },
    {
      username: "Sarah Miller",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      item: "Cookbook Collection",
      description: "Looking for a set of classic cookbooks, especially Italian and French cuisine. Prefer hardcover editions with good condition.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      details: "Authors I like: Julia Child, Jamie Oliver\nWould accept used if in excellent condition",
      whereToFind: "Local bookstores, Amazon, or specialty cookbook shops"
    },
    {
      username: "Michael Chen",
      userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      item: "Gardening Tools Set",
      description: "High-quality gardening tools for my new vegetable garden. Need durable stainless steel tools with comfortable grips.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      details: "Essential tools: trowel, pruners, cultivator, gloves\nBonus if it comes with a carrying case",
      whereToFind: "Garden centers, Home Depot, or specialty online stores"
    },
    {
      username: "Emily Wilson",
      userAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      item: "Yoga Mat",
      description: "Eco-friendly yoga mat with good cushioning and grip. Preferably made from natural rubber or TPE material.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      details: "Thickness: 5-6mm\nColor: Earth tones or pastels\nNon-slip surface is a must",
      whereToFind: "Yoga studios, REI, or eco-friendly online retailers"
    },
    {
      username: "David Kim",
      userAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
      item: "Board Game",
      description: "Strategy board game for 2-4 players. Looking for something with good replay value and not too complex.",
      image: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      details: "Games I like: Catan, Ticket to Ride, Pandemic\nPlay time: 1-2 hours",
      whereToFind: "Local game stores, Target, or boardgame websites"
    }
  ])
  </script>
  
  <style scoped>
  /* General Layout - Inherited from original */
  .app {
    background-color: #FFFDF7;
    color: #212121;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', sans-serif;
  }
  
  /* Main Content - Inherited from original */
  .main-content {
    flex-grow: 1;
    padding-top: 80px;
    width: 100%;
  }
  
  .wishlist-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
  }
  
  .wishlist-header {
    margin-bottom: 2rem;
    text-align: center;
    flex-shrink: 0;
  }
  
  .wishlist-header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #C62828;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.1rem;
  }
  
  /* Navbar - Inherited from original */
  .navbar {
    background-color: #C62828;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .logo-container img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #FFD700;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin-left: auto;
  }
  
  .nav-links li a {
    color: #FFFDF7;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    padding: 0.5rem 0;
    position: relative;
  }
  
  .nav-links li a:hover {
    color: #FFD700;
  }
  
  /* User Settings - Inherited from original */
  .user-settings-btn {
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #FFFDF7;
    border-radius: 8px;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .user-settings-btn:hover {
    color: #FFD700;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .user-account-settings {
    background-color: #2E7D32;
    color: #FFFDF7;
    padding: 1.5rem;
    position: fixed;
    top: 0;
    right: -300px;
    height: 100%;
    width: 300px;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    transition: right 0.3s ease-in-out;
  }
  
  .user-account-settings.open {
    right: 0;
  }
  
  /* Wishlist Items */
  .wishlist-items {
    width: 100%;
    flex-grow: 1;
  }
  
  .wishlist-items h2 {
    color: #C62828;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  
  .items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  
  .item-card {
    background-color: white;
    border: 2px solid #FFD700;
    border-radius: 12px;
    width: calc(25% - 1.5rem);
    min-width: 250px;
    height: 280px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  .item-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  
  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.5rem;
    border: 1px solid #FFD700;
  }
  
  .username {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2E7D32;
  }
  
  .item-content h3 {
    margin: 0 0 0.5rem 0;
    color: #C62828;
    font-size: 1.2rem;
  }
  
  .item-description {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
    flex-grow: 1;
  }
  
  .item-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
  }
  
  .item-btn {
    padding: 0.5rem 0.8rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    flex: 1;
  }
  
  .item-btn.view-detail {
    background-color: #FFD700;
    color: #212121;
  }
  
  .item-btn.view-detail:hover {
    background-color: #e6c200;
  }
  
  .item-btn.grant-wish {
    background-color: #2E7D32;
    color: white;
  }
  
  .item-btn.grant-wish:hover {
    background-color: #1B5E20;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1002;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 12px;
    width: 80%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
    position: relative;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
  
  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    transition: color 0.3s ease;
  }
  
  .close-modal:hover {
    color: #C62828;
  }
  
  .modal-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .modal-user-info {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .modal-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.8rem;
    border: 2px solid #FFD700;
  }
  
  .modal-username {
    font-weight: 600;
    color: #2E7D32;
  }
  
  .modal-header h2 {
    margin: 0.5rem 0 0 0;
    color: #C62828;
    font-size: 1.8rem;
  }
  
  .modal-body {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .item-image-container {
    flex: 1;
  }
  
  .item-image {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #eee;
  }
  
  .item-details {
    flex: 2;
  }
  
  .item-details h3 {
    color: #2E7D32;
    margin: 1rem 0 0.5rem 0;
    font-size: 1.2rem;
  }
  
  .item-details p {
    margin: 0 0 1rem 0;
    color: #333;
    line-height: 1.5;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  .modal-btn {
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  
  .modal-btn.grant-wish {
    background-color: #2E7D32;
    color: white;
  }
  
  .modal-btn.grant-wish:hover {
    background-color: #1B5E20;
  }
  
  .modal-btn.close {
    background-color: #f5f5f5;
    color: #666;
  }
  
  .modal-btn.close:hover {
    background-color: #e0e0e0;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .item-card {
      width: calc(33.333% - 1.5rem);
    }
    
    .modal-body {
      flex-direction: column;
    }
  }
  
  @media (max-width: 768px) {
    .wishlist-container {
      padding: 1.5rem;
    }
    
    .item-card {
      width: calc(50% - 1.5rem);
    }
    
    .modal-content {
      width: 90%;
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 576px) {
    .wishlist-header h1 {
      font-size: 1.8rem;
    }
    
    .item-card {
      width: 100%;
    }
    
    .modal-actions {
      flex-direction: column;
    }
    
    .modal-btn {
      width: 100%;
    }
  }
  </style>
  