import React, {useState, useEffect} from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { blogpostService, accountService } from '../../_services';
import { BlogMaker } from './blog.maker';
import { Role } from '../../_helpers';

function BlogpostSection({ match }) {
  const { path } = match;
  const user = accountService.userValue;
  
  const[blogposts, setBlogposts] = useState(null);

  useEffect(() => {
    blogpostService.getAll().then(x => setBlogposts(x));
  }, []);

  function deleteBlogpost(id) {
    setBlogposts(blogposts.map(x => {
          if (x.id === id) { x.isDeleting = true; }
          return x;
      }));
      blogpostService.delete(id).then(() => {
        setBlogposts(blogposts => blogposts.filter(x => x.id !== id));
      });
  }

  const {link} = 'https://www.facebook.com/groups/218321711571380/';

  return (<>
    <section className="about-info p-lg-5 p-3" id="blogcorner">
      <div className="content-w3ls-inn px-lg-5">
        <div className="container py-md-5 py-3">
          <div className="content-sing-w3pvt px-lg-5"> <img className="img-fluid mb-2" src="src/tools/media/images/bg-ban4.jpg" alt=" "/>
            <h4 className="title-hny my-2">Tonga culture in the spotlight</h4>
            <p>The people need life, they need service. who can afford to come down to them and giive them what they want/ are you willing to work wih anfd for them. come lets begin the work.</p>
            <p className="mt-2">There is time for hoe, time for service delivery and time fr rebuilfing that which looks like a community of love, respect, and social cohession.</p>
            <div className="row about-w3pvt-top mt-2">
              <div className="col-lg-6 about-info">
                <h4 className="title-hny mb-3">Topics which made headlines</h4>
                <p>We have selected a few issues to talk about. what is your take on these. Lests begin.</p>
              </div>
              <div className="col-lg-6 about-img">
                <div className="row">
                  <div className="col"><img className="img-fluid" src="src/tools/images/g3.jpg" alt="user-image"/></div>
                  <div className="col"><img className="img-fluid" src="src/tools/images/g2.jpg" alt="image"/></div>
                </div>
              </div>
            </div>
            <div className="social-icons-footer">
              <ul className="list-unstyled w3pvt-icons mb-5">
                <li className="lead">Catch on Social :</li>
                <li>
                  <a href={`${link}`} target='_blank' rel="noopener noreferrer" >
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} color="navy" className="fa mx-2" />
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon icon={['fab', 'twitter']} color="skyblue" className="fa mx-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="banner_botton py-5 " >
            <div className="container card py-md-5" >
              {
                user && <BlogMaker />
              }
              {
                !user && <h4>
                  <Link to="/login" className="text-muted" >Login</Link> to Post a blog or Comment
                </h4>
              }
            </div>
            <div className="row features-w3pvt-main">
              <div className="col-md-12 feature-gird">
                <div className="row features-hny-inner-gd" >
                  {
                    blogposts && blogposts.map(blog =>
                      <div key={blog.id} className="col-12 border-bottom" >
                        <Media>
                          <FontAwesomeIcon
                            icon="user-circle"
                            size="4x"
                            className="align-self-start"
                          />
                          <Media.Body>
                            <p className="blog-post-meta" >
                              {blog.title} {blog.firstName} {blog.lastName}<br/>{blog.created}
                            </p>
                            {
                              user && user.role === Role.Admin &&
                              <button className="btn btn-sm btn-danger mr-1" onClick={() => deleteBlogpost(blog.id)} style={{ width: '60px' }} disabled={blog.isDeleting} >Delete</button>
                            }
                            {
                              user && user.role &&
                              <Link to={`${path}/editing/${blog.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            }
                          </Media.Body>
                        </Media>
                        <div style={{wordWrap:'break-word',display:'inline-block'}}>
                          <p dangerouslySetInnerHTML={{ __html:blog.blog_title}} className="editor" />
                          <p dangerouslySetInnerHTML={{ __html:blog.blog_message}} className="editor" />
                        </div>
                      </div> 
                    )
                  }
                  {
                    !blogposts && <div className="text-center"><div className="spinner-border spinner-border-lg align-center"></div></div>
                  }
                  {
                    blogposts && !blogposts.length &&
                    <h2>Nothing to show yet</h2>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

export { BlogpostSection };