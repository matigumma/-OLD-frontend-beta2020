import React from 'react';
//import axios from 'axios'
//import Loading from '../../components/Loading'
import Slider from '../../components/Slider/Slider';
//const Slider = lazy(() => import('../../components/Slider/Slider'))
import CamListHome from '../../components/CamListHome';
//const CamListHome = lazy(() => import('../../components/CamListHome'))
import Footer from '../../components/Footer/Footer';
//const Footer = lazy(() => import('../../components/Footer/Footer'))
//import MediumHome from '../../components/MediumHome'

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
