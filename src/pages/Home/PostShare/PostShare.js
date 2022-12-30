import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../../Shared/Loading/Loading'
import { FaImages } from 'react-icons/fa';
import './PostShare.css'


const PostShare = () => {

    const { register, handleSubmit, formState: { errors }, isLoading } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key
    const handleAddPost = data => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = (`https://api.imgbb.com/1/upload?key=${imageHostKey}`)
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const post = {
                        name: data.status,
                        image: imgData.data.url
                    }
                    // console.log(post);

                    // save product information to database

                    fetch('http://localhost:5000/allPost', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            // toast.success(`${data.title} is add successfully`)
                        })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-center items-center'>
            <div className=' p-7'>
                <form onSubmit={handleSubmit(handleAddPost)}>

                    <div className="form-control w-full max-w-xs" >
                        <input placeholder="What's happening?" {...register("status", {
                            required: 'category is required',
                        })} className="textarea textarea-bordered h-20 w-96 max-w-xs" type="text" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="data-control w-full ma-w-xs">
                        <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" /> 
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <input className='btn btn-info w-full mt-6' value="Share" type="submit" />
                </form>
            </div>
        </div>

    );
};

export default PostShare;