
<template>
   <div class="app">

<!-- Navbar -->
<nav class="navbar">
  <div class="logo-container">
    <img src="../assets/logo.svg" alt="Logo">
  </div>
  <ul class="nav-links">
    <li><a href="#">View Wishlists</a></li>
    <li><a href="#">Home</a></li>
  </ul>
  <button class="user-settings-btn" aria-label="User Menu">☰</button>
</nav>

<!-- User Settings (Hidden by default) -->
<aside class="user-account-settings">
  <div class="settings-header">
    <h2>User Settings</h2>
    <button class="settings-close-btn" aria-label="Close Settings">✕</button>
  </div>
  <div class="settings-content">
    <p>Account Information</p>
    <p>Preferences</p>
    <p>Notifications</p>
    <p>Logout</p>
  </div>
</aside>

<!-- Main Content -->
<main class="main-content">
  <div class="wishlist-container">
    <header class="wishlist-header">
      <h1>🌟{{ eventItemStore.event.title }}</h1>
      <p class="subtitle">View and grant wishes</p>
    </header>

    <section class="wishlist-items">
      <h2>wishlist Item</h2>
      <div class="items-container">
        <!-- Item Cards -->
        <div class="item-card"
  v-for="(item, index) in eventItemStore.eventItems" 
  :key="item.item_id">
          <div class="item-content">
            <div class="user-info">
              <img  alt="User" class="user-avatar">
              <span class="username">User123</span>
            </div>
            <h3>{{ item.wishlist_name }}</h3>
            <p class="item-price">{{ item.totalContributions}}/{{ item.cost }}</p>
            <div class="progress-container">
              <div class="progress-bar" style="width: 75%;"></div>
            </div>
            <p class="item-description">Noise-cancelling wireless headphones with 30hr battery life.</p>
            <div class="item-actions">
              <button class="item-btn grant-wish" @click="clickGrant(item.item_id)">Grant</button>
            </div>                
          </div>
        </div>

        
      </div>
    </section>
  </div>
</main>

Modal (Hidden by default)
<div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-user-info">
          <img  alt="Avatar" class="modal-avatar" />
          <span class="modal-username">User123</span>
        </div>
        <h2>Wireless Headphones</h2>
        <p class="modal-price">$129.99</p>
      </div>
      <div class="modal-body">
        <div class="item-image-container">
          <img
            src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg"
            alt="Item"
            class="item-image"
          />
        </div>
        <div class="item-details">
          <div class="funding-section">
            <h3>Group Funding Progress</h3>
            <div class="progress-container">
              <div class="progress-bar" style="width: 75%"></div>
            </div>
            <div class="funding-details">
              <p><strong>75%</strong> funded</p>
              <p><strong>$32.50</strong> still needed</p>
              <p><strong>8</strong> contributors</p>
            </div>
            <div class="contribution-options">
              <h4>Contribute Amount:</h4>
              <input
                type="number"
                class="contribution-input"
                placeholder="Enter amount in $"
                min="1"
                max="129.99"
              />
              <button class="contribute-btn">Contribute</button>
            </div>
          </div>
          <h3>Description</h3>
          <p>
            Premium noise-cancelling wireless headphones with 30-hour battery
            life, Bluetooth 5.0, and built-in microphone for crystal clear
            calls.
          </p>
          <h3>Details</h3>
          <p>
            • Active Noise Cancellation<br />
            • 30-hour playtime<br />
            • Foldable design<br />
            • Built-in microphone<br />
            • Bluetooth 5.0
          </p>
          <h3>Where to Find</h3>
          <p>
            <a href="#" target="_blank">Amazon - Wireless Headphones</a>
          </p>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-btn purchase-btn">Purchase This Item</button>
        <button class="modal-btn close" @click="closeModal">Close</button>
      </div>
    </div>
  </div>

</div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication'
import{useEventItemStore} from '@/stores/eventItems'

const authStore = useAuthenticationStore()
const eventItemStore = useEventItemStore()

const isOpen = ref(false)

// Functions to open/close
const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

// Call store action in lifecycle hook
onMounted(() => {
  eventItemStore.getEventItems();
})
function clickGrant(ItemID:number){
  openModal()

}
</script>
<style scoped>
/* General Layout */
:root {
  --primary-color: #C62828;
  --secondary-color: #2E7D32;
  --accent-color: #FFD700;
  --background-color: #FFFDF7;
  --text-color: #212121;
  --light-gray: #f5f5f5;
  --medium-gray: #e0e0e0;
  --dark-gray: #666;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  color: var(--primary-color);
}

.subtitle {
  color: var(--dark-gray);
  font-size: 1.1rem;
}

/* Navbar */
.navbar {
  background-color: var(--primary-color);
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
  border: 2px solid var(--accent-color);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
}

.nav-links li a {
  color: var(--background-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links li a:hover {
  color: var(--accent-color);
}

/* User Settings */
.user-settings-btn {
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--background-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-settings-btn:hover {
  color: var(--accent-color);
  background-color: rgba(255, 255, 255, 0.1);
}

.user-account-settings {
  background-color: var(--secondary-color);
  color: var(--background-color);
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  transition: right 0.3s ease-in-out;
  z-index: 1001;
  overflow-y: auto;
}

.user-account-settings.open {
  right: 0;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 253, 247, 0.2);
}

.settings-content {
  padding: 1rem;
}

.settings-content p {
  padding: 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.settings-content p:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.settings-close-btn {
  background: none;
  border: none;
  color: var(--background-color);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-close-btn:hover {
  color: var(--accent-color);
}

/* Wishlist Items */
.wishlist-items {
  width: 100%;
  flex-grow: 1;
}

.wishlist-items h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.items-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.item-card {
  background-color: white;
  border: 2px solid var(--accent-color);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 320px;
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
  border: 1px solid var(--accent-color);
}

.username {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--secondary-color);
}

.item-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.item-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--secondary-color);
  margin: 0 0 0.5rem 0;
}

.progress-container {
  width: 100%;
  background-color: var(--light-gray);
  border-radius: 10px;
  height: 20px;
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--secondary-color);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.item-description {
  color: var(--dark-gray);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
  background-color: var(--accent-color);
  color: var(--text-color);
}

.item-btn.view-detail:hover {
  background-color: #e6c200;
}

.item-btn.grant-wish {
  background-color: var(--secondary-color);
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
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  padding: 1rem;
}

.modal-overlay.active {
  display: flex;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--medium-gray);
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
  border: 2px solid var(--accent-color);
}

.modal-username {
  font-weight: 600;
  color: var(--secondary-color);
}

.modal-header h2 {
  margin: 0.5rem 0 0 0;
  color: var(--primary-color);
  font-size: 1.8rem;
}

.modal-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--secondary-color);
  margin: 0.5rem 0 0 0;
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
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--medium-gray);
  object-fit: cover;
}

.item-details {
  flex: 2;
}

.funding-section {
  background-color: var(--light-gray);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--medium-gray);
}

.funding-section h3 {
  color: var(--secondary-color);
  margin-top: 0;
}

.funding-details {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.funding-details p {
  margin: 0.5rem 0;
}

.funding-details strong {
  color: var(--secondary-color);
}

.contribution-options {
  margin-top: 1rem;
}

.contribution-options h4 {
  margin-bottom: 0.5rem;
  color: var(--dark-gray);
}

.contribution-input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  font-size: 16px;
  border: 1px solid var(--medium-gray);
  border-radius: 6px;
}

.contribute-btn {
  width: 100%;
  padding: 0.7rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.contribute-btn:hover {
  background-color: #1B5E20;
}

.item-details h3 {
  color: var(--secondary-color);
  margin: 1rem 0 0.5rem 0;
  font-size: 1.2rem;
}

.item-details p {
  margin: 0 0 1rem 0;
  color: #333;
  line-height: 1.5;
}

.item-details a {
  color: var(--primary-color);
  text-decoration: none;
}

.item-details a:hover {
  text-decoration: underline;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--medium-gray);
}

.modal-btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.modal-btn.purchase-btn {
  background-color: var(--secondary-color);
  color: white;
}

.modal-btn.purchase-btn:hover {
  background-color: #1B5E20;
}

.modal-btn.close {
  background-color: var(--light-gray);
  color: var(--dark-gray);
}

.modal-btn.close:hover {
  background-color: var(--medium-gray);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .wishlist-container {
    padding: 1.5rem;
  }
  
  .modal-body {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .wishlist-container {
    padding: 1rem;
  }
  
  .wishlist-header h1 {
    font-size: 1.8rem;
  }
  
  .items-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  .modal-body {
    flex-direction: column;
  }
  
  .item-image-container {
    margin-bottom: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 0.8rem;
  }
  
  .logo-container img {
    width: 40px;
    height: 40px;
  }
  
  .nav-links {
    display: none;
  }
  
  .wishlist-header h1 {
    font-size: 1.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .items-container {
    grid-template-columns: 1fr;
  }
  
  .item-card {
    height: auto;
  }
  
  .modal-content {
    padding: 1.5rem 1rem;
  }
  
  .modal-header h2 {
    font-size: 1.5rem;
  }
  
  .modal-price {
    font-size: 1.1rem;
  }
  
  .user-account-settings {
    width: 100%;
    right: -100%;
  }
  
  .user-account-settings.open {
    right: 0;
  }
}

</style>