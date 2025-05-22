import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-2">
            View Project
          </a>
        )}
      </div>
    </div>
  );
}
