import React, { useState } from 'react';
import './AddressFrom.css';

export default function AddressForm({ activeStep, setStep }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const countries = [
    'Norway',
    'Sweden',
    'United States',
    'France',
    'Japan',
  ].sort();

  const selectCountry = () => {
    return countries.map((country) => <option key={country}>{country}</option>);
  };

  const submitAddressDetails = (event) => {
    const details = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      country: country,
      city: city,
      state: state,
      zip: zip,
    };
    setStep(activeStep + 1);
    event.preventDefault();
    console.log(details);
  };

  return (
    <>
      <form onSubmit={(event) => submitAddressDetails(event)}>
        <h2>Shipping Details</h2>
        <input
          name={firstName}
          required
          type="text"
          placeholder="First Name *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          required
          name={lastName}
          type="text"
          placeholder="last Name *"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          required
          type="text"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          required
          type="text"
          placeholder="Address *"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Apt#"
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
        ></input>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {selectCountry()}
        </select>
        <input
          required
          type="text"
          placeholder="State *"
          value={state}
          onChange={(e) => setState(e.target.value)}
        ></input>
        <input
          type="text"
          required
          placeholder="City *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <input
          type="text"
          required
          placeholder="Zip *"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
