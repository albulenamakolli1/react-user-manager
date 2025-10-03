import React, { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { Link } from "react-router-dom";

export default function Home({ users, setUsers }) {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        let list = users || [];
        if (q !== "") {
            list = list.filter(u =>
                (u.name || "").toLowerCase().includes(q) ||
                (u.email || "").toLowerCase().includes(q)
            );
        }
        const copy = [...list];
        copy.sort((a, b) => {
            if (!a.name) return 1;
            if (!b.name) return -1;
            return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
        return copy;
    }, [users, search, sortAsc]);

    const handleDelete = (id) => {
        if (!window.confirm("Do you want to delete this user (local only)?")) return;
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    return (
        <div>
            <div className="search-actions">
                <SearchBar value={search} onChange={setSearch} />
                <Link to="/add" className="btn btn-primary">Add User</Link>
                <button className="btn btn-ghost" onClick={() => setSortAsc(s => !s)}>
                    Sort: {sortAsc ? "A → Z" : "Z → A"}
                </button>
            </div>

            <div style={{ marginTop: 12 }}>
                <p style={{ color: "#555" }}>
                    Showing <strong>{filtered.length}</strong> / {users.length || 0}
                </p>

                {filtered.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="user-grid">
                        {filtered.map(u => (
                            <UserCard key={u.id} user={u} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
