import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser({ users, setUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const maxId = users && users.length ? Math.max(...users.map(u => Number(u.id) || 0)) : 0;
    const newUser = {
      id: maxId + 1,
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || "Personal Company" },
      phone: "",
      website: ""
    };

    setUsers(prev => [newUser, ...prev]);
    try { localStorage.setItem("addedUser_" + newUser.id, JSON.stringify(newUser)); } catch {}
    navigate("/");
  };

  return (
    <div>
      <h2>Add User</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="label">Name</label>
          <input className="input-inline" value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label className="label">Email</label>
          <input className="input-inline" value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label className="label">Company (optional)</label>
          <input className="input-inline" value={company} onChange={e => setCompany(e.target.value)} />
        </div>

        <div style={{ marginTop: 8 }}>
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
