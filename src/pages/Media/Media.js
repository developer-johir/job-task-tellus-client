import React, { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const Media = () => {

    const [posts, setPosts] = useState([])
    const { loading } = useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:5000/allPost')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10 mx-5'>
            {
                posts.length && posts.map(singlePost => <Post
                    key={singlePost._id}
                    singlePost={singlePost}
                ></Post>)
            }
        </div>
    );
};

export default Media;