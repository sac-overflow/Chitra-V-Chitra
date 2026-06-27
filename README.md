# Chitra V Chitra - Interactive Event Management Website

A modern, high-fidelity premium web application for interactive event management. This system includes customized budgeting, responsive booking modals, interactive details forms, and a backend log engine for leads.

## Features

### 1. Customer Interaction & Backend CSV Database Logging
- **Contact Form**: Located at `/contact`, this submits client inquiries directly to the server.
- **Service Consultation & Checkout**: Located on the Services page. Clicking any service opens an overlay/modal details flow containing options and a Summary tab.
- **Backend Logging**: All submissions are posted to `/api/enquiry` on the Node server and written directly into `server/enquiries.csv`.
- **Download Database**: An endpoint `GET /api/enquiries` allows administrators to download the lead list CSV.
- **Console Alerts**: New submissions print styled warning panels in the server console logs for real-time admin monitoring.

### 2. Custom Budgeting Engine
- **Non-Wedding Services**: Uses a slider to select base price ranges, with a numeric text field below to type a customized target budget.
- **Wedding Services**: Customization steps calculate estimated base package totals. In the final step, a custom budget target input box allows users to override estimates and set their own target.

### 3. Edge-Case Validation Constraints
- **Email Validator**: Validated against standard pattern matches (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- **Phone Validator**: Enforces standard phone characters (`+`, `-`, `(`, `)`) and strict digit boundaries (between 10 and 15 digits).
- **Budget Validator**: Rejects negative numbers, non-numeric values, or a budget of `0`.
- **Backend Security**: Enforced using validation rules inside `/api/enquiry` returning `400 Bad Request` if frontend clients submit invalid formats.

---

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation
Install dependencies in both the workspace root and the backend server folder:
```bash
# Install root packages
npm install

# Install server packages
cd server
npm install
cd ..
```

### Running the Project

1. **Start the Backend Server**:
   ```bash
   cd server
   node server.js
   ```
   The backend server runs on `http://localhost:3001`.

2. **Start the React Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   The application will open on `http://localhost:5173`.