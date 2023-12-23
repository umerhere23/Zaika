import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Saveshippingdata,updateIngredientQuantity } from '../../Service/api.js';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardHeader,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBRadio,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer';

const BuyProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, quantity, image, price, Packame, Recpie,Seller,Quantity } = state;
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    seller:Seller,
    TotalPrice:price*quantity+400,
    shippingSameAsBilling: '',
    saveInfoForNextTime: '',
    Product:Packame,
    ProducdID:id
    
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(Quantity)
   
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        await Saveshippingdata(formFields);
        const quantityInt = parseInt(Quantity, 10);
        const updatedQuantity = quantityInt - quantity;
        await updateIngredientQuantity(id, updatedQuantity); 
  
        console.log(id, updatedQuantity);

        toast.success('Payment successful!', {
          autoClose: 500,
          onClose: () => {
            navigate('/Ecomerce');
          },
        });
      } catch (error) {
        toast.error('An error occurred while processing your payment.');
        console.error('API error:', error);
      }
    } else {
      toast.error('Please fill in all required fields correctly.');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formFields.firstName.trim()) {
      newErrors.firstName = 'First Name is required.';
    }
    if (!formFields.lastName.trim()) {
      newErrors.lastName = 'Last Name is required.';
    }
    if (!formFields.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formFields.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    }
    if (!formFields.cardName.trim()) {
      newErrors.cardName = 'Name on Card is required.';
    }
    if (!formFields.cardNumber.trim()) {
      newErrors.cardNumber = 'Card Number is required.';
    }
    if (!formFields.expiration.trim()) {
      newErrors.expiration = 'Expiration is required.';
    }
    if (!formFields.cvv.trim()) {
      newErrors.cvv = 'CVV is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (<>
    <div className="container ml-15">
     
  
      <div>
     
   <MDBContainer className="py-5">
   <MDBRow>
   <MDBCol md="8" className="mb-4 tts">
  <MDBCardHeader className="py-3">
    <h5 className="mb-0">Billing details</h5>
  </MDBCardHeader>
  <MDBCardBody>
    <MDBInput
      label="First Name"
      name="firstName"
      type="text"
      placeholder={
        errors.firstName
          ? errors.firstName
          : "Enter First Name"
      }
      onChange={handleInputChange}
      value={formFields.firstName}
    />
    <MDBInput
      label="Last Name"
      name="lastName"
      type="text"
      onChange={handleInputChange}
      value={formFields.lastName}
      placeholder={
        errors.lastName
          ? errors.lastName
          : "Enter last Name"
      }
    />
    <MDBInput
      wrapperClass="mb-4"
      label="Address"
      id="form3"
      type="text"
      name="address"
      onChange={handleInputChange}
      value={formFields.address}
      required
      placeholder={
        errors.address
          ? errors.address
          : "Enter address"
      }
    />
    <MDBInput
      wrapperClass="mb-4"
      label="Email"
      id="form4"
      type="email"
      name="email"
      onChange={handleInputChange}
      value={formFields.email}
      required
      placeholder={
        errors.email
          ? errors.email
          : "Enter email"
      }
    />
    <MDBInput
      wrapperClass="mb-4"
      label="Phone"
      id="form5"
      type="number"
      name="phone"
      onChange={handleInputChange}
      value={formFields.phone}
      required

      placeholder={
        errors.phone
          ? errors.phone
          : "Enter phone"
      }
    />
    <hr className="my-4" />
    <MDBCheckbox
      name="shippingSameAsBilling"
      id="checkoutForm1"
      label="Shipping address is the same as my billing address"
      onChange={handleInputChange}
      checked={formFields.shippingSameAsBilling}
    />
    <MDBCheckbox
      name="saveInfoForNextTime"
      id="checkoutForm2"
      label="Save this information for next time"
      onChange={handleInputChange}
      checked={formFields.saveInfoForNextTime}
    />
    <hr className="my-4" />
    <h5 className="mb-4">Payment</h5>
    <MDBRadio
      name="paymentMethod"
      id="flexRadioDefault1"
      label="Credit card"
      checked={formFields.paymentMethod === 'credit'}
      onChange={() => setFormFields({ ...formFields, paymentMethod: 'credit' })}
    />
    <MDBRadio
      name="paymentMethod"
      id="flexRadioDefault2"
      label="Debit card"
      checked={formFields.paymentMethod === 'debit'}
      onChange={() => setFormFields({ ...formFields, paymentMethod: 'debit' })}
    />
    <MDBInput
      label="Name on card"
      id="nameOnCard"
      name="cardName"
      type="text"
      wrapperClass="mb-4"
      value={formFields.cardName}
      onChange={handleInputChange}
      required
      pattern='/^[A-Za-z\s]+$/'
      placeholder={
        errors.cardName
          ? errors.cardName
          : "Enter Name on Card"
      }
      
    />
     <MDBInput
      label="Name on card"
      id="nameOnCard"
      name="cardNumber"
      type="text"
      wrapperClass="mb-4"
      value={formFields.cardNumber}
      onChange={handleInputChange}
      required
      pattern='/^\d{16}$/'
      max={16}
      placeholder={
        errors.cardNumber
          ? errors.cardNumber
          : "Enter cardNumber"
      }
    />
  <MDBRow>
  <MDBCol md="6">
    <MDBInput
      label="Expiration"
      id="expiration"
      name="expiration"
      type="date"
      wrapperClass="mb-4"
      value={formFields.expiration}
      onChange={handleInputChange}
      pattern="\d{4}-\d{2}-\d{2}"
      required

      placeholder={
        errors.expiration
          ? errors.expiration
          : "Enter expiration"
      }
    />
  </MDBCol>
  <MDBCol md="6">
  <MDBInput
  label="CVV"
  id="cvv"
  name="cvv"
  type="text"
  wrapperClass="mb-4"
  value={formFields.cvv}
  onChange={handleInputChange}
  pattern="\d{3}"
  minLength={3}
  maxLength={3}
  required
  placeholder={
    errors.cvv
      ? errors.cvv
      : "Enter CVV"
  }
/>

  </MDBCol>
</MDBRow>

    <button className="btn btn-primary" onClick={handleSubmit}>Continue to Checkout</button>
  </MDBCardBody>
</MDBCol>

     <MDBCol md="4" className="mb-5 ml-p-4 tnt" >
         <MDBCardHeader className="py-3  summary">
         <img src={image} alt="Product" className="img-fluid rounded" />

           <h5 className="mb-3">Summary</h5>
         </MDBCardHeader >
         <MDBCardBody className='summary'>
           <MDBListGroup flush>
           <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
           Recipe Name
               <span>{Recpie}</span>
             </MDBListGroupItem>
             <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
        Product ID
               <span>{id}</span>
             </MDBListGroupItem>
             <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
               Product Name
               <span>{Packame}</span>
             </MDBListGroupItem>
             <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
           Quantity
               <span>{quantity}</span>
             </MDBListGroupItem>
             <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
               Products Price
               <span>{price}/-</span>
             </MDBListGroupItem>
             <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
               Shipping
               <span>{400}/-</span>
             </MDBListGroupItem>
             <hr className="my-2"></hr>
             <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 summary">
               <div>
                 <strong>Total amount</strong>
                 <strong>
                   <p className="mb-0">(including GST)</p>
                 </strong>
               </div>
               <span><strong>{quantity*price+400}/-</strong>
               </span>
             </MDBListGroupItem>
           </MDBListGroup>
         </MDBCardBody>
     </MDBCol>
   </MDBRow>
 </MDBContainer>
      </div>
      <ToastContainer />

    </div>
          <Footer />
</>
  );
};

export default BuyProduct;