import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { Spinner } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch projects');
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Projects</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by project title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      <div className="row">
        {filteredProjects.map(project => (
          <div key={project.id} className="col-md-4 mb-4" data-aos="fade-up">
            <ProjectCard project={project} />
          </div>
        ))}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center w-100">
            <p className="text-muted">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}
