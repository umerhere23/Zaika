import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from './footer';
import { fetchUserDetails } from '../Service/api';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const userEmail = location.state?.userEmail; // Retrieve email passed from login

    useEffect(() => {
        if (userEmail) {
            fetchUserData(userEmail);
        }
    }, [userEmail]);

    const fetchUserData = async (email) => {
        try {
            const result = await fetchUserDetails(email);
            setUserData(result);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to fetch user data");
        }
    };

    return (
        <>
            <div className="container py-5">
                <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
                {userData ? (
   <div className='new'>
   <div className="max-w-md mx-auto">
       <table className="table ">
           <tbody>
           <tr className='square border border-warning'>
                   <th colSpan={"2"} style={{textAlign:"center"}}> User Profile Data</th>

               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">Name:</th>
                   <td className="text-gray-800">{userData.Username}</td>
               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">Email:</th>
                   <td className="text-gray-800">{userData.email}</td>
               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">Address:</th>
                   <td className="text-gray-800">{userData.address}</td>
               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">City:</th>
                   <td className="text-gray-800">{userData.city}</td>
               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">State:</th>
                   <td className="text-gray-800">{userData.state}</td>
               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">Zip:</th>
                   <td className="text-gray-800">{userData.zip}</td>
               </tr>
               <tr>
                   <th className="text-lg font-bold text-gray-700">Account Created On:</th>
                   <td className="text-gray-800">{new Date(userData.createdAt).toLocaleString()}</td>
               </tr>
           </tbody>
       </table>
   </div>
</div>

    
                ) : (
                    <p>Loading user data...</p>
                )}
                <div className="flex justify-center mt-4 btnedit">
                    <Link to="/edit-profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded txt">
                        Edit Profile
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
