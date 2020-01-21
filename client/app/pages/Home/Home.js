import React, { Component } from 'react';
//import 'whatwg-fetch';
//import axios from 'axios'
import Slider from '../../components/Slider/Slider';
import Footer from '../../components/Footer/Footer';
import CamListHome from '../../components/CamListHome';
import MediumHome from '../../components/MediumHome'

const Home = (props) => {
    return (
      <div>
        <Slider />
        <CamListHome ads={props.ads} cameras={props.cameras} userState={props.userState}/>
        {/* <MediumHome userState={props.userState}/> */}
        <Footer />
      </div>
    );
}

export default Home;
