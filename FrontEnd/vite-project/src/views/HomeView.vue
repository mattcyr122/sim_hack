<template>
  <div id="app" class="app">
    <nav class="navbar">
      <div class="logo-container">
        <img :src="logo" alt="Logo" />
      </div>
      <ul class="nav-links">
        <li><a href="ViewPage.vue">View Wishlists</a></li>
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
        <!--New Flex Container for Header and Items-->
        <div class="wishlist-flex-container">
          <header class="wishlist-header">
            <h1>🎁 Welcome to Your Wishlist</h1>
            <p class="subtitle">Add, manage, and share your wishlist items</p>
          </header>

          <section class="wishlist-items">
            <h2>Your Items</h2>
            <div class="items-container">
              <div class="item-column">
              <div class="item-card">
                <div class="item-content">
                  <h3>Gift Box</h3>
                  <p class="item-description">Beautiful wrapped gift box</p>
                  <div class="item-actions">
                    <button class="item-btn edit">Edit</button>
                    <button class="item-btn delete">Remove</button>
                  </div>
                </div>
              </div>
              <div class="item-card">
                <div class="item-content">
                  <h3>Christmas Tree</h3>
                  <p class="item-description">6ft pine Christmas tree</p>
                  <div class="item-actions">
                    <button class="item-btn edit">Edit</button>
                    <button class="item-btn delete">Remove</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="item-column">
              <div class="item-card">
                <div class="item-content">
                  <h3>Custom Item</h3>
                  <p class="item-description">Add your own custom item</p>
                  <div class="item-actions">
                    <button class="item-btn edit">Edit</button>
                    <button class="item-btn delete">Remove</button>
                  </div>
                </div>
              </div>
              <div class="item-card">
                <div class="item-content">
                  <h3>Custom Item</h3>
                  <p class="item-description">Add your own custom item</p>
                  <div class="item-actions">
                    <button class="item-btn edit">Edit</button>
                    <button class="item-btn delete">Remove</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="items-column">
              <div class="add-item-card">
                <button class="add-item-btn">+ Add New Item</button>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/logo.svg'

const showUserSettings = ref(false)

const toggleUserSettings = () => {
  showUserSettings.value = !showUserSettings.value
}
</script>

<style scoped>
/* General Layout */
.app {
  background-color: #FFFDF7;
  color: #212121;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

/* Main Content */
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

/* Navbar */
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

.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #FFD700;
  transition: width 0.3s ease;
}

.nav-links li a:hover::after {
  width: 100%;
}

/* User Settings */
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

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 253, 247, 0.2);
}

.settings-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-settings-btn {
  background: none;
  border: none;
  color: #FFFDF7;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-settings-btn:hover {
  color: #FFD700;
}

.settings-content {
  flex-grow: 1;
  padding: 1rem 0;
}

.settings-content p {
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 253, 247, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding-left: 0.5rem;
}

.settings-content p:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
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
  /*justify-content: flex-start;
  justify-content: space-between;*/
  justify-content: center;
  /*justify-content: space-around;*/
}

.item-card {
  background-color: white;
  border: 2px solid #FFD700;
  border-radius: 12px;
  width: calc(25% - 1.5rem);
  min-width: 250px;
  height: 220px;
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
  /* flex-grow: 1; Remove this */
}

.item-content h3 {
  margin: 0 0 0.5rem 0;
  color: #C62828;
}

.item-description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto; /* Push buttons to the bottom */
}

.item-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.item-btn.edit {
  background-color: #FFD700;
  color: #212121;
}

.item-btn.edit:hover {
  background-color: #e6c200;
}

.item-btn.delete {
  background-color: #f5f5f5;
  color: #C62828;
}

.item-btn.delete:hover {
  background-color: #e0e0e0;
}

.add-item-card {
  background-color: rgba(255, 253, 247, 0.5);
  border: 2px dashed #C62828;
  border-radius: 12px;
  width: calc(25% - 1.5rem);
  min-width: 250px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-item-card:hover {
  background-color: rgba(198, 40, 40, 0.05);
  border-color: #FFD700;
}

.add-item-btn {
  background: none;
  border: none;
  color: #C62828;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.add-item-btn:hover {
  color: white;
  background-color: #C62828;
}

/* General Layout */
.app {
  background-color: #FFFDF7;
  color: #212121;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding-top: 80px;
  width: 100%;
}

/* Wishlist Container */
.wishlist-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Wishlist Header */
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

/* Items Container */
.items-container {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap */
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: space-around;
  overflow-x: auto; /* Horizontal scrolling */
  width: 100%;
}

.item-card {
  background-color: white;
  border: 2px solid #FFD700;
  border-radius: 12px;
  width: calc(25% - 1.5rem); /* 4 items per row */
  height: 220px;
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

.item-content h3 {
  margin: 0 0 0.5rem 0;
  color: #C62828;
}

.item-description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto; /* Push buttons to the bottom */
}

/* Add Item Card */
.add-item-card {
  background-color: rgba(255, 253, 247, 0.5);
  border: 2px dashed #C62828;
  border-radius: 12px;
  width: calc(25% - 1.5rem);
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-item-card:hover {
  background-color: rgba(198, 40, 40, 0.05);
  border-color: #FFD700;
}

@media (min-width: 1024px) {
  .wishlist-flex-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    height: 100%;
  }

  .wishlist-header {
    flex: 0 0 40%;
    padding-right: 2rem;
  }

  .wishlist-items {
    flex: 1;
    max-height: 500px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 1rem;
  }

  .items-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 2rem;
  }

  .item-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 260px; /* Width of a column */
    flex-shrink: 0;
  }

  .item-card,
  .add-item-card {
    width: 100%;
    height: 220px;
  }
}
@media (max-width: 1023px) {
  .items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  .item-card,
  .add-item-card {
    width: calc(50% - 1rem);
    min-width: 200px;
  }

  @media (max-width: 576px) {
    .item-card,
    .add-item-card {
      gap: 0.5rem;
      width: 100%;
    }
  }
  @media (max-width: 768px) {
  .items-container {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* adds vertical spacing between cards */
    align-items: center;
  }

  .item-card,
  .add-item-card {
    width: 100%; /* full width for smaller screens */
    gap: 0.5rem;
    max-width: 400px;
  }
}

}


 </style>