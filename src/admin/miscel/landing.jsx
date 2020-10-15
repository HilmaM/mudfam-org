import React from 'react';
import { Link } from 'react-router-dom';

function Landing({ match }) {
  const { path } = match;

  return (
  <div>
    <h1>Admin Manage Items</h1>
      <p>This section can only be accessed by administrators.</p>
      <p><Link to={`${path}/blogs`}>Manage Blogs</Link></p>
      <p>
        <Link to={`${path}/messages`} >Go to Inbox</Link>
      </p>
      <p>
      </p>
    </div>
  );
}

export { Landing };