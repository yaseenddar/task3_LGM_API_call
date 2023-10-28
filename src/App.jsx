import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      const userData = response.data.data;
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && users.length > 0) {
      const loadUser = (index) => {
        setTimeout(() => {
          setVisibleUsers((prevUsers) => [...prevUsers, users[index]]);
          if (index + 1 < users.length) {
            loadUser(index + 1);
          }
        }, 1000); // 1-second delay before showing the next user
      };

      loadUser(0); // Start loading users one by one
    }
  }, [loading, users]);

  return (
    <div className='h-[100vh] flex flex-col justify-center'>
      <button
        className='button mx-auto bg-blue-400 hover:bg-white hover:border-2 hover:text-red-500 hover:border-red-500 text-xl py-2 px-4 rounded-md m-1'
        onClick={handleClick}
      >
        Click
      </button>
      <div className='gap-2 grid grid-cols-1 md:grid-cols-3'>
        {visibleUsers.map((user) => (
          <div className='card bg-gray-100 hover:bg-gray-200 drop-shadow-lg shadow-top hover:shadow-xl border-[8px] hover:rounded-2xl w-[15rem] h-[20rem] p-1' key={user.id}>
            <img className='my-auto rounded-[50%] w-full mx-1' src={user.avatar} alt="image" />
            <div className='flex flex-col justify-center items-center'>
              <p className='ml-2'>{user.first_name.concat(" ", user.last_name)}</p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
