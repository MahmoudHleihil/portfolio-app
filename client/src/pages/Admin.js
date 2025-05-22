import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:5000/api/projects');
    setProjects(res.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await axios.post('http://localhost:5000/api/projects', form);
    setForm({ title: '', description: '' });
    fetchProjects();
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/projects/${id}`);
    fetchProjects();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({ title: p.title, description: p.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  const saveEdit = async (id) => {
    await axios.put(`http://localhost:5000/api/projects/${id}`, editForm);
    cancelEdit();
    fetchProjects();
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input className="form-control mb-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="form-control mb-2" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Add Project</button>
      </form>

      <ul className="list-group">
        {projects.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-start">
            {editingId === p.id ? (
              <div className="w-100">
                <input className="form-control mb-1"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title"
                />
                <input className="form-control mb-1"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                />
                <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(p.id)}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <div>
                  <strong>{p.title}</strong><br />
                  {p.description}
                </div>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
