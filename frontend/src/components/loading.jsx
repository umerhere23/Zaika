import React from 'react';
import Images from '../components/img/fp.gif';

const LoadingSpinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center loading-spinner" style={{height: "50vh" }}>
        <span className="sr-only"><img src={Images} alt="" srcset="" style={{width:"50%",marginLeft:"23%"}} /></span>
      </div>
   
  );
};

export default LoadingSpinner;
