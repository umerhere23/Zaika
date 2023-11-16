import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from './footer';
import { fetchUserDetails } from '../Service/api'; // Adjust the path as necessary

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userEmail) {
            fetchUserDetails(userEmail)
                .then(data => {
                    setUserData(data);
                    // Show success message when data is successfully fetched
                    toast.success("User data fetched successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch(error => {
                    console.error('Failed to fetch user data:', error);
                    toast.error("Failed to fetch user data", {
                        // Toast configuration for error
                    });
                });
        }

        // Replace the current entry in the history stack to prevent going back
        if (!location.pathname.includes("/dashboard")) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate, location, userEmail]);

    return (
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        <div className="card" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="mb-1">Email: {userData?.email}</h5>
                                        <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                                            Address: {userData?.address}
                                        </p>
                                        <h5 className="mb-1"> {userEmail && <p>Email: {userEmail}</p>} </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
