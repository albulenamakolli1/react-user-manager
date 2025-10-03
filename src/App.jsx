import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import AddUser from "./pages/AddUser";

/*
  App: mban dhe shperndan users state ne faqet - e kam bere state ne App
  qe shtimi te mund te paraqitet menjehere kudo.
*/
function App() {
  const [users, setUsers] = useState([]);

  // Marrim initial users nga API vetem nje here.
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="app-container">
      <header className="topbar">
        <Link to="/"><h1>User Manager</h1></Link>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add User</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home users={users} setUsers={setUsers} />} />
          <Route path="/user/:id" element={<UserDetails users={users} />} />
          <Route path="/add" element={<AddUser users={users} setUsers={setUsers} />} />
        </Routes>
      </main>

      <footer className="footer">React Internship Challenge</footer>
    </div>
  );
}

export default App;
