import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const blankAuthor = {
    name: '',
};

const EditAuthor = () => {
    
    const navigate = useNavigate();
    const { flag, setFlag } = useOutletContext();
    const { id } = useParams();
    const [ formAuthor, setFormAuthor ] = useState(blankAuthor);
    const [ foundAuthor, setFoundAuthor ] = useState(blankAuthor);
    const [ errors, setErrors ] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        axios.get(`http://localhost:8000/api/authors/${id}`, { signal: controller.signal })
            .then( res => {
                console.log(res);
                setFormAuthor({ 
                    name: res.data.name
                });
                setFoundAuthor({ 
                    name: res.data.name
                });
            })
            .catch( err => console.log(err) );
        return () => controller.abort();
    }, [])

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
        


        if (foundAuthor.name === formAuthor.name) {
            setErrors({ 
                name: { name: 'ValidatorError', message: "What is the change?"}
            })
        } else {
            axios.put(`http://localhost:8000/api/authors/${id}`, formAuthor)
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
        }
    };

    return (
        <div>
            <h2>Edit your favorite author!</h2>
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
                                errors && 
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

export default EditAuthor