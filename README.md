# 🌍 World Clock Portal ⏰

A modern, interactive **World Clock application** built with **React + TypeScript**, allowing users to track multiple timezones, customize clock themes, and reorder clocks using a custom drag-and-swap system.

This project focuses on **front-end performance, clean UX, and scalable state management**.

---

## 🚀 Features

- 🔍 **Async city search** using a custom backend (`/cities?query=`)
- 🕒 **Real-time clocks** for multiple timezones
- 🔄 **Custom drag-and-swap logic** (no drag-drop libraries)
- 🔢 **Customize clock face**
- 🔔 **Confirmation popups & notifications**
- 💾 Settings persisted using `localStorage`

---

## 🖥️ Demo

![](./resources/world_clock_portal.gif)

---

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- React-Select (Async)
- Moment.js & moment-timezone

### State Management

- React Context API (theme & clock settings)
- React hooks (`useCallback`, `useMemo`, `React.memo`)
- Redux

### Backend

- Node.js
- Express
- Timezone & city data API

### Tooling

- Vite
- ESLint
- LocalStorage persistence

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/amandee27/world-clock-portal
cd world-clock-portal
```
