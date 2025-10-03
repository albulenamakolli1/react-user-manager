import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

export default function UserDetails({ users }) {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user) return;
    async function fetchOne() {
      setLoading(true);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    }
    fetchOne();
  }, [id, user]);

  useEffect(() => {
    if (!user && users?.length) {
      const found = users.find(u => String(u.id) === String(id));
      if (found) setUser(found);
    }
  }, [users, id, user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return (<div><p>User not found.</p><Link to="/">Back</Link></div>);

  const address = user.address || {};
  const companyName = user.company?.name || user.companyName || "—";

  return (
    <div>
      <h2>{user.name}</h2>
      <p><strong>Company:</strong> {companyName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>

      <h3>Address</h3>
      <p>{address.street || ""} {address.suite || ""}</p>
      <p>{address.city || ""} {address.zipcode || ""}</p>

      <div style={{ marginTop: 12 }}>
        <Link to="/" className="btn btn-ghost">Back</Link>
      </div>
    </div>
  );
}
