import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const SinglePost = () => {
    const { loading } = useContext(AuthContext)
    const data = useLoaderData()
    const { image, name } = data

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img className='m-10 h-72 w-96' src={image} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;