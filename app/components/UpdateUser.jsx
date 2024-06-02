import { useSession } from 'next-auth/react';
import {  useState } from 'react';


const UpdateUserForm = (user) => {
    const { data: session } = useSession();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [location, setLocation] = useState(user.location);
  const [phone, setPhone] = useState(user.phone);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [error, setError] = useState(user.linkedin);



  const handleSubmit = async (event) => {
    const errors = {}
    event.preventDefault();
    if(!session) return
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const userId = session.user.id;
    try {
      const response = await fetch(`/api/user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            name,
            email,
            password,
            location,
            phone,
            linkedin,
        }),
      });

      if (!response.ok) {
        const userData = await response.json();
        setError(userData.error);
        return;
      }
      setError(null);
      const form = event.target;
      form.reset()
      // ...
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center  gap-4 text-white text-sm'>
    <div className='flex gap-10'>
      <label className='flex flex-col items-center gap-2 mb-6'>
        Edit your Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='box-gradient rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>

       <label className='flex flex-col items-center gap-2 mb-4'>
        Change your Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='box-gradient  rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>
    </div>
    <div className='flex gap-10'>
       <label className='flex flex-col items-center gap-2 mb-4'>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='box-gradient rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>

       <label className='flex flex-col items-center gap-2 mb-4'>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='box-gradient rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>
    </div>
      <div className='flex gap-10'>
       <label className='flex flex-col items-center gap-2 mb-4'>
        Location
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className='box-gradient rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>

       <label className='flex flex-col items-center gap-2 mb-4'>
        Phone Number
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className='box-gradient rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>
       <label className='flex flex-col items-center gap-2 mb-4'>
        LinkedIn
        <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className='box-gradient rounded-2xl text-sm h-8 w-64 text-white text-center'/>
      </label>
    </div>
                  <div className="fixed bottom-0 w-[120px] h-[100px] text-center bg-gradient-to-t from-black to-transparent">
      <button type="submit" className='text-gradient text-2xl mt-7 hover:text-[28px] transition-all'>Save </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}</div>
    </form>
  );
};

export default UpdateUserForm;