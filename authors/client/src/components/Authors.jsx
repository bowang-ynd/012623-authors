import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

const Authors = () => {
    
    const [authors, setAuthors] = useState(null);
    const [flag, setFlag] =useState(false);

    useEffect( () => {
        const controller = new AbortController();
        axios.get('http://localhost:8000/api/authors', { signal: controller.signal })
            .then( res => {
                setAuthors(res.data);
            })
            .catch( err => console.log(err) );
        return () => controller.abort();
    }, [flag]);

    return (
        <div>
            <h2 className='text-center'>Favorite Authors</h2>
            <Outlet context={{ authors, flag, setFlag }}/>
        </div>
    )
}

export default Authors