import React, {useState,useEffect,useRef} from 'react';
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {
   const [error, setError] = useState(false)
   const [localStorage, setLocalStorage] = useState(null)
   const [showSuccessMessage, setShowSuccessMessage] = useState(false)
   
   const commentEl = useRef();
   const nameEl = useRef();
   const emailEl = useRef();
   const storeDateEl = useRef();

   useEffect( ()=>
   {
       nameEl.current.value = window.localStorage.getItem('name')
       emailEl.current.value = window.localStorage.getItem('email')
   },[])

   const handleCommentSubmission =()=>{
       
      setError(false)
      const {value: comment } = commentEl.current;
      const {value: name } = nameEl.current;
      const {value: email } = emailEl.current;
      const { checked : storeData} = storeDateEl.current;
      if(!comment || !name || !email)
      {
        setError(true);
        return;

      }

      const commentObj ={
        name, email,comment,slug
      }

      if(storeData){
         window.localStorage.setItem('name',name)
         window.localStorage.setItem('email',email)
      } else{
             window.localStorage.removeItem('name',name)
             window.localStorage.removeItem('email',email)

      }

      submitComment(commentObj)
      .then( (res)=> {
        setShowSuccessMessage(true)
        setTimeout( ()=>{
          setShowSuccessMessage(false)
        },3000)
      })
   }
   

  return (
      <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
       <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a reply.</h3>
       <div className='grid grid-cols-1 gap-4 mb-4'>
           <textarea 
           ref={commentEl} 
           className='p-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            placeholder='comment'
            name='comment'
           />
       </div>

       <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4'>
         <input className='py-2 px-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
         type='text'
         ref={nameEl}
         placeholder='Name'
        name='name'

         />

          <input className='py-2 px-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
         type='text'
         ref={emailEl}
         placeholder='Email'
        name='email'

         />
       </div>
       <div className='grid grid-cols-1 gap-4 mb-4'>
          <div>
            <input type="checkbox" ref={storeDateEl} id='storeData' name='storedata' value='true' />
            <label className='text-gray-500 cursor-pointer ml-2 ' htmlFor='storeData'> Save my email and name for the next time I comment</label>
          </div>
       </div>
       {error && <p className='text-xs text-red-500'> All fields are required</p>}
       <div className='mt-8'>
       <button type='button' onClick={handleCommentSubmission}
       className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'>
         Post  Comment
       </button>
       {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}

       </div>
       
      </div>
  )
};

export default CommentsForm;
