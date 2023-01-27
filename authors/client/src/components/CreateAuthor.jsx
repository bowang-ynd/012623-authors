import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

const blankAuthor = {
    name: '',
};

const CreateAuthor = () => {
    
    const navigate = useNavigate();
    const { flag, setFlag } = useOutletContext();
    const [ formAuthor, setFormAuthor ] = useState(blankAuthor);
    const [ errors, setErrors ] = useState(null);

    // handle front-end validation
    const [ nameError, setNameError ] = useState(null);
    
    const handleChange = (e) => {
        setFormAuthor({
            name: e.target.value
        });

        if (e.target.value !== '' && e.target.value.length < 3){
            setNameError('Name should have at least 3 characters!');
        } else {
            setNameError(null);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/authors', formAuthor)
            .then( res => {
                console.log(res.data);
                setFlag(!flag);
                setErrors(null);
                navigate('/authors');
            })
            .catch( err => {
                console.log(err);
                setErrors(err.response.data.errors);
            } );
    };

    return (
        <div>
            <h2>Create a new author!</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={ handleSubmit }>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-lable">Name: </label>
                            <input type="text" name='name' className="form-control" value={formAuthor.name} onChange={ handleChange } />
                            {
                                nameError && 
                                <span className='form-text text-danger'>{nameError}</span>
                            }
                            {
                                errors?.name && 
                                <span className='form-text text-danger'>{errors.name.message}</span>
                            }
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button type="submit" className="btn btn-primary">Create!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAuthor