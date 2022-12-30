import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import './Post.css'

const Post = ({ singlePost }) => {

    const [btnColor, setBtnColor] = useState(false)
    const [count, setCount] = useState(0)
    const { _id, image, name } = singlePost

    function handleClick() {
        setBtnColor(btnColor => !btnColor)
        
        if(count === 0){
            setCount(count + 1)
        }
        else{
            setCount(count - 1)
        }
    }

    let toggleClassCheck = btnColor ? ' active' : ""

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img className='h-64 w-full' src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="card-actions ">
                    <button onClick={handleClick} >
                        <FiHeart className={`heart${toggleClassCheck}`}></FiHeart>
                    </button>
                    <p className='text-xl'>{count}Likes</p>
                    <FiMessageSquare className='comment'></FiMessageSquare>
                    <Link to={`/allPost/${_id}`} className="btn h-6 ml-16">View details</Link>
                </div>
            </div>
        </div>
    );
};

export default Post;