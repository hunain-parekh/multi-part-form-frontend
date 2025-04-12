# 💻 Multi-Part Form Frontend – Next.js + Redux Toolkit + React Hook Form

Welcome to the frontend for the **6-step multi-part form** system. This responsive, fully-featured form is built with modern best practices including global state with Redux Toolkit, robust validation with react-hook-form, dynamic rendering, and API integration.

---

## 🚀 Project Overview

This frontend is built using:

- ⚛️ **Next.js 14 App Router** – Framework for hybrid React apps  
- 🔁 **Redux Toolkit + RTK Query** – Global state & API slice  
- 🧠 **React Hook Form** – Lightweight form validation  
- 🎨 **Tailwind CSS** – Modern utility-first styling  
- 📄 **Axios** – For sending multipart form data  

---

## 🧩 Key Features

- ✅ 6-step multi-part form with progress bar  
- ✅ Resume upload (PDF) via file input  
- ✅ Conditional rendering (e.g. company name, loan amount)  
- ✅ Dynamic validation with react-hook-form  
- ✅ Preloaded dropdowns for countries/cities  
- ✅ Redux-powered step state & data persistence  
- ✅ Listing page with edit/delete options  
- ✅ Mobile responsive UI  

---

## 📝 Form Steps Breakdown

| Step | Section               | Features |
|------|------------------------|----------|
| 1    | **User Profile**       | Name, Email, Passwords, Gender, DOB |
| 2    | **Contact Information**| Phones, Address, City, Country |
| 3    | **Employment Info**    | Job Title, Status, Company (conditional), Resume Upload |
| 4    | **Financial Info**     | Monthly Income, Loan Status (with conditional Loan Amount), Credit Score |
| 5    | **Preferences**        | Mode of Contact, Hobbies, Newsletter |
| 6    | **Review & Submit**    | Display all data for confirmation with edit buttons |

---

## 📦 Project Setup

### 1. Clone the Repo

```bash
git clone https://github.com/hunain-parekh/multi-part-form-frontend
cd multi-part-form-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env.local` file in the root and add your backend API base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### 4. Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔐 Form Handling

### ✅ Validation Logic

- Using `react-hook-form` with schema validation  
- Conditional rules handled within each step  
- Error messages shown inline below inputs  

### 🧠 State Management

- All form data is managed globally via `formSlice`  
- RTK Query (`formApi`) handles communication with backend

---

## 📤 Form Submission

- On final step, all data is serialized (except file) and sent via `multipart/form-data` to the backend
- The `resume` is uploaded as a file, and other fields are stringified JSON

---

## 🧾 Data Listing & Actions

After submission, user is redirected to `/` page which allows:

- 📄 View all submitted data  
- ✏️ Edit individual form entries  
- ❌ Delete a submission  

---

## 🧪 Testing & Notes

- Use browser dev tools to monitor form state & API activity  
- Test conditional visibility (e.g. company, loan amount)  
- Data is persisted via Redux state  

---

## ✅ Manager/Reviewer Notes

- Multi-step flow with form persistence  
- Clean UI using Tailwind  
- Modular component structure  
- Works well with provided backend API  
- Built with scalability and reusability in mind  

---

## 🧑 Author & Details

- **Developer:** Hunain Parekh  
- **Assigned By:** Umair Athar – FabTechSol  
- **Development Window:** 08 April 2025 – 11 April 2025
