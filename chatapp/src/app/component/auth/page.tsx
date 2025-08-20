"use client";
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import upload from '@/app/lib/Upload';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '@/app/lib/store'; 
import { getDoc } from 'firebase/firestore';

function Auth() {
 const [isLogin, setIsLogin] = useState(true);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [username, setUsername] = useState('');
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [avatar, setAvatar] = useState({ file: null, url: '' });

  const router = useRouter();
  const dispatch = useDispatch();

 const handleAvatar = (e) =>{
  if(e.target.files[0]){
  setAvatar({
    file: e.target.files[0],
    url: URL.createObjectURL(e.target.files[0])
  })
}
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setIsLoading(true);

  try {
   if (isLogin) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setSuccess('Logged in successfully!');
        
        // Dispatch the thunk to fetch the user info after successful login
        dispatch(fetchUserInfo(res.user.uid));

        router.push('/component/dashboard');
   } else {
    if (password !== confirmPassword) {
     setError('Passwords do not match.');
     setIsLoading(false);
     return;
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const imgUrl = await upload(avatar.file)
    setSuccess('Account created successfully!');
        
        const userData = {
          username,
          email,
          avatar: imgUrl,
          id: res.user.uid,
        };

    await setDoc(doc(db, "users", res.user.uid), userData);

        // Dispatch the thunk to fetch and set the user info after signup
        dispatch(fetchUserInfo(res.user.uid));

        router.push('/dashboard');
   }
  } catch (err) {
   setError(err.message);
   console.error(err);
  } finally {
   setIsLoading(false);
  }
 };

 const toggleForm = () => {
  setIsLogin(!isLogin);
  setError('');
  setSuccess('');
 };

 return (
  <div className="flex items-center justify-center min-h-screen bg-[#F7F7F8] p-4">
   <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
     {isLogin ? 'Login' : 'Sign Up'}
    </h2>
    {error && (
     <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      {error}
     </div>
    )}
    {success && (
     <div className="w-full p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
      {success}
     </div>
    )}
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
       {!isLogin && (
        <div className='border-1 border-[#a8a8ab] rounded-lg p-2'>
         <input type='file' onChange={handleAvatar}/>
        </div>
       )}
       {!isLogin && (
        <input
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3795BD]"
         required
        />
       )}
       <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3795BD]"
        required
       />
       <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3795BD]"
        required
       />
       {!isLogin && (
        <input
         type="password"
         placeholder="Confirm Password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3795BD]"
         required
        />
       )}
       <button
        type="submit"
        className="w-full p-3 mt-4 text-white font-semibold rounded-lg bg-[#3795BD] hover:bg-[#2c7ca6] transition duration-300 disabled:opacity-50"
        disabled={isLoading}
       >
        {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
       </button>
     </form>
     <p className="mt-6 text-sm text-gray-600">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <button
       onClick={toggleForm}
       className="ml-1 font-semibold text-[#3795BD] hover:underline"
      >
       {isLogin ? 'Sign Up' : 'Login'}
      </button>
     </p>
   </div>
  </div>
 );
}

export default Auth;
