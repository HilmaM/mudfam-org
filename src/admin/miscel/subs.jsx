import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';

import { subscribeService } from '../../_services';

function AllSubs({match}){
  const {path} = match;
  const [subs, setSubs] = useState(null); 

  useEffect(() => {
    subscribeService.getAll().then(x => setSubs(x));
  }, []);

  function deleteSub(id) {
      setSubs(subs.map(x => {
          if (x.id === id) { x.isDeleting = true; }
          return x;
      }));
      subscribeService.delete(id).then(() => {
          setSubs(subs => subs.filter(x => x.id !== id));
      });
  }

  return (<div className="py-md-2" >
    <h3>Inbox</h3>
    <Table className="table table-striped" >
      <thead>
        <tr>
          <th style={{ width: '60%' }}>Email</th>
          <th style={{ width: '20%' }}>Date Created</th>
          <th style={{ width: '20%' }}></th>
        </tr>
      </thead>
      <tbody>
        {
          subs && subs.map(sub => <tr key={sub.id} >
            <td>{sub.email}</td>
            <td>{sub.created}</td>
            <td>
              <button onClick={() => deleteSub(sub.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={sub.isDeleting}>
                {sub.isDeleting 
                  ? <span className="spinner-border spinner-border-sm"></span>
                  : <span>Delete</span>
                }
              </button>
            </td>
          </tr>)
        }
        {!subs &&
          <tr>
            <td colSpan="4" className="text-center">
              <span className="spinner-border spinner-border-lg align-center"></span>
            </td>
          </tr>
        }
      </tbody>
    </Table>
  </div>);
};

export { AllSubs };