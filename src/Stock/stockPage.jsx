import React, { useState, useEffect } from 'react';
import './stockStyle.css';
import '../GeneralStyles/Card.css';
import { Link, NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { fetchAllCars } from '../CarService';

export default function Stock() {
  document.title="Bilal Motors - All cars";
  const [cars, setCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);  
  const [Message, setMessage] = useState("");
  const [AddCarshow, setAddCarshow] = useState(false);
  const handleAddCarShow = () => setAddCarshow(true);
  const handleAddCarClose = () => {
    setAddCarshow(false);
    setMessage("");
  }

  const [car, setCar] = useState({
    carNumber: "",
    Name: "",
    Year: "",
    Hand: 0,
    Capacity: "",
    EntranceDate: "",
    isSold: false,
    CustomerName: "",
    SellingDate: "",
    Notes: "",
    Img1: "",
    Img2: "",
    Price: 0,
    Km: 0,
  });

  const handleInputChange = (event) => {
    setCar({
      ...car,
      [event.target.name]: event.target.value
    });
  };

const handleAddCarSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await addCar(car);
    console.log(response); 
    setMessage("New car inserted successfully");
  } catch (error) {
    console.error(error);
    setMessage("Failed to insert new car");
  }
};

useEffect(() => {
  async function fetchAndSetCars() {
    const allCars = await fetchAllCars();
    const StockCars = allCars.filter(car => !car.isSold);
    setCars(StockCars);
    setDisplayedCars(StockCars);  
  }
  fetchAndSetCars();
}, []);

  const ShowAllCars = async (event) => {
    event.preventDefault();
    setDisplayedCars(cars);  
  }
  
  const ShowByEntranceDate = async (event) => {
    event.preventDefault();
    const sortedData =[...cars].sort((a, b) =>  new Date(b.EntranceDate) -  new Date(a.EntranceDate)); 
    setDisplayedCars(sortedData);
  }
  
  const ShowByPrice = async (event) => {
    event.preventDefault();
      const sortedData =[...cars].sort((a, b) => b.Price - a.Price); 
      setDisplayedCars(sortedData);
  }
  

  return (
    <>
      <div  className="buttons">
    <button className="orginal-button" onClick={ShowAllCars}>All</button>
    <button className="Entrance-button" onClick={ShowByEntranceDate}>Filter By Entrance Date</button>
    <button className="Entrance-button" onClick={ShowByPrice}>Filter By Price</button>
    <button className="Add-car" onClick={handleAddCarShow} ><FontAwesomeIcon icon={faPlus} style={{Year: "#ffffff",}} /> Add Car </button>
    </div>

    <br/><br/><br/>
    <div className="Cars">
    {displayedCars.map((car) => (
      <Link to={`/CarProfile/${car.id}`} style={{ color: 'black', textDecoration: 'none' }}>
        <div className="Carcard">
          <img className='Cardimg' src={car.Img1} alt={car.Name}/>
          <div className="container">
            <span className="CarName" style={{fontSize:'15px'}}><b>{car.Name}</b></span>
            <span><b>Year : </b>{car.Year}</span>
            <span><b>hand : </b>{car.Hand} </span>
            <span><b>Capacity : </b>{car.Capacity} </span>
            <span><b>Km : </b>{car.Km}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>

  <Modal show={AddCarshow} onHide={handleAddCarClose} animation={false}>
  <Modal.Header closeButton>
    <Modal.Title><br/><h1>Add car</h1></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {Message && <small style={{color:'green'}}>{Message}</small>}
    <form className="row" onSubmit={handleAddCarSubmit}>
      <div className="form-group col-md-6">
        <label for="inputEmail4">Name</label>
        <input type="text" className="form-control" id="inputName" placeholder="Mazda 3" name="Name" value={car.Name} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputEmail4">Year</label>
        <input type="text" className="form-control" id="inputYear" placeholder="2023" name="Year" value={car.Year} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputEmail4">Hand</label>
        <input type="number" className="form-control" id="inputHand" placeholder="01" name="Hand" value={car.Hand} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputPassword4">Capacity</label>
        <input type="text" className="form-control" id="inputSizes" placeholder="2000cc" name="Capacity" value={car.Capacity} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputEmail4">EntranceDate</label>
        <input type="date" className="form-control" id="inputEntranceDate" placeholder="EntranceDate" name="EntranceDate" value={car.EntranceDate} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputEmail4">Price</label>
        <input type="number" className="form-control" id="inputPrice" placeholder="50,000" name="Price" value={car.Price} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputEmail4">Km</label>
        <input type="number" className="form-control" id="inputKm" placeholder="20000" name="Km" value={car.Km} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-6">
        <label for="inputEmail4">Car Number</label>
        <input type="text" className="form-control" id="CarNumber" placeholder="12345234" name="carNumber" value={car.carNumber} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-12">
        <label for="inputEmail4">Notes</label>
        <input type="text" className="form-control" id="Notes" placeholder="Test util 2024" name="Notes" value={car.Notes} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-12">
        <label for="inputAddress">image1 url</label>
        <input type="text" className="form-control" id="Img1" placeholder="https://static.nike.com/a/images/t_PDP_1728_v1/" name="Img1" value={car.Img1} onChange={handleInputChange} required/>
      </div>
      <div className="form-group col-md-12">
        <label for="inputAddress">image2 url</label>
        <input type="text" className="form-control" id="Img2" placeholder="https://static.nike.com/a/images/t_PDP_1728_v1/" name="Img2" value={car.Img2} onChange={handleInputChange} required/>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddCarClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">Add car</Button>
      </Modal.Footer>
    </form>
    </Modal.Body>
  </Modal>
    </>
  );
}

