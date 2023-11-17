import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
                <h1>Dashboard</h1>
                {userData ? (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Name: {userData.Username}</h5>
                            <p className="card-text">Email: {userData.email}</p>
                            {/* Add more user details here */}
                        </div>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
