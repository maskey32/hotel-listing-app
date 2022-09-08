import React, { useEffect, useState } from "react";
import { HomeTopBar } from "../../components/home-top-bar";
import { Hotel } from "../../components/hotel/HotelComponent";
import { Footer } from "../../components/footer";
import { Divider } from '@chakra-ui/react'
import './Home.css'
import api from '../../api/axios';

export const HomePage = () => {
    const [state, setState] = useState([]);

    const fetchedData = async () => {
        try {
            const response = await api.get('/api/listing/read');
            const listings = response.data.listings;
            console.log('---response' + response);
            console.log(listings);
            setState(listings);
        } catch (err) {
            console.log(err.response.data);
        }
    }
    
    useEffect(() => {
        fetchedData();
    }, [])

    let hotelData = state.map(object => {
        return (
            <div>
                <Hotel 
                url={object.image} 
                beds={object.numOfBeds}
                baths={object.numOfBaths}
                title={object.description}
                price={object.price}
                rating={object.rating}
                />
            </div>
        );
    })

    if (state.length === 0) {
            hotelData = <div>Please check again</div>
    }

    return (
        <>
            <HomeTopBar />
            <Divider orientation='horizontal' />
            
                <h1 id="head">LIST OF AVAILABLE HOTELS</h1>
                <hr />
                <p id="ptag">Book and have a nice stay with us</p>
            
            <div id="hotels">
            {hotelData}
            </div>
            <Footer id='footer-bar'/>
        </>
    );
};