import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user, onDelete }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Company:</strong> {user.company?.name || user.companyName || "—"}</p>
      <div style={{ marginTop: 8 }}>
        <Link className="btn btn-ghost" to={`/user/${user.id}`} state={{ user }}>Details</Link>
        {onDelete && <button className="btn" style={{ marginLeft: 8 }} onClick={() => onDelete(user.id)}>Delete</button>}
      </div>
    </div>
  );
}
