# React Time-to-Visible (TTV) Demo

This project demonstrates how to measure **Time-to-Visible (TTV)** — the time it takes for a user to actually see content on the screen after a request is made.

It connects a React frontend to a backend API and tracks when a specific DOM element becomes visible using the Intersection Observer API.

---

## 🧠 What This Project Shows

* Difference between API response time and user-perceived latency
* Measuring when content becomes visible in the browser
* Impact of backend performance (and caching) on frontend experience
* Real-world visibility tracking using browser APIs

---

## ⚙️ Tech Stack

* React (Vite)
* Browser Performance APIs
* Intersection Observer API

---

## 🏗️ Architecture

```
Browser (React)
     ↓
Fetch API call
     ↓
Node API (localhost:3000)
     ↓
(Optional) Redis Cache
     ↓
Response → DOM Render → Visibility Detection
```

---

## 🚀 How It Works

1. React app sends a request to the backend API
2. Response updates the DOM
3. A target element is observed using Intersection Observer
4. When the element becomes visible:

   * Timestamp is recorded
   * Time-to-Visible (TTV) is logged

---

## 📏 What is Time-to-Visible?

> **TTV = Time when element becomes visible − Time when request started**

This measures what the user actually experiences, not just backend speed.

---

## 🧪 Example Output

Browser console:

```
Time to Visible (ms): 235.12
```

---

## 📊 Comparing Performance

### Without Backend Caching

* Slower API response
* Higher TTV
* UI takes longer to render

---

### With Redis Caching

* Faster API response
* Lower TTV
* UI becomes visible much sooner

---

## ▶️ How to Run

### 1. Start Backend API (from another repo)

```
cd redis-caching-demo
node index.js
```

---

### 2. Start Frontend

```
npm install
npm run dev
```

---

### 3. Open Browser

The app will open automatically (Vite dev server).

Scroll down to trigger visibility detection.

---

## 🔍 How to Observe Results

1. Open browser DevTools → Console
2. Refresh the page
3. Scroll down
4. Observe TTV logs

---

## 🔗 Related Projects

* Load testing with k6 (backend stress testing)
* Redis caching demo (performance optimization)

---

## 🧭 Key Takeaways

* Backend speed does not directly equal user experience
* Measuring visibility is critical for real performance insights
* Small backend improvements can significantly impact perceived latency
* Frontend and backend performance must be evaluated together

---

## 🚀 Future Improvements

* Track multiple elements (above-the-fold vs below-the-fold)
* Add visual performance timeline
* Integrate real-user monitoring (RUM)
* Display metrics in UI instead of console

---

## 👤 Author

Built as part of a scalability and performance engineering series.
