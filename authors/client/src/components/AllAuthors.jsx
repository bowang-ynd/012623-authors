import React  from 'react';
import axios from 'axios';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';


const AllAuthors = () => {
    const { authors, flag, setFlag } = useOutletContext();
    const navigate = useNavigate();
    
    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then( res => {
                console.log(res.data);
                setFlag(!flag);
                navigate('/authors');
            })
            .catch( err => console.log(err) );
    }
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors && authors.map( author => {
                            return (
                                <tr key={ author._id }>
                                    <td>{ <Link to={`/authors/${ author._id}`}> { author.name }</Link> }</td>
                                    <td className='d-flex justify-content-evenly'>
                                        <Link className='btn btn-primary me-3' to={`/authors/${ author._id }/edit`}>Edit</Link>
                                        <button className="btn btn-primary" onClick={ e => handleDelete(e, author._id) }>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllAuthors