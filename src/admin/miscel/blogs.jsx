import React, {useState, useEffect} from 'react';
import { blogpostService } from '../../_services';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

function AllBlogs({match}){
  const {path} = match;
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogpostService.getAll().then(x => setBlogs(x));
  }, []);

  function deleteBlog(id) {
      setBlogs(blogs.map(x => {
          if (x.id === id) { x.isDeleting = true; }
          return x;
      }));
      blogpostService.delete(id).then(() => {
          setBlogs(blogs => blogs.filter(x => x.id !== id));
      });
  }

  return (<div className="py-md-2" >
    <h3>Inbox</h3>
    <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Write Blog</Link>
    <Table className="table table-striped" >
      <thead>
        <tr>
          <th style={{ width: '30%' }}>Names</th>
          <th style={{ width: '40%' }}>Title of blog</th>
          <th style={{ width: '20%' }}>Date Created</th>
          <th style={{ width: '10%' }}></th>
        </tr>
      </thead>
      <tbody>
        {
          blogs && blogs.map(blog => <tr key={blog.id} >
            <td>{blog.title} {blog.firstName} {blog.lastName}</td>
            <td><p dangerouslySetInnerHTML={{ __html: blog.blog_title }} /></td>
            <td>{moment(blog.created).format('DD/MM/YYYY | HH:mm:ss')}</td>
            <td>
              <Link to={`${path}/edit/${blog.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
              <button onClick={() => deleteBlog(blog.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={blog.isDeleting}>
                {blog.isDeleting 
                  ? <span className="spinner-border spinner-border-sm"></span>
                  : <span>Delete</span>
                }
              </button>
            </td>
          </tr>)
        }
        {!blogs &&
          <tr>
            <td colSpan="4" className="text-center">
              <span className="spinner-border spinner-border-lg align-center"></span>
            </td>
          </tr>
        }
        {
          blogs && !blogs.length && <p>Nothing to show yet!</p>
        }
      </tbody>
    </Table>
  </div>);
};

export { AllBlogs };