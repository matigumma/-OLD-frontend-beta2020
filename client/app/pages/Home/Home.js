import React from 'react';

//import Loading from '../../components/Loading'
//const CamListHome = lazy(() => import('../../components/CamListHome'))
import CamListHome from '../../components/CamListHome';
//const Slider = lazy(() => import('../../components/Slider/Slider'))
import Slider from '../../components/Slider/Slider';
//const Footer = lazy(() => import('../../components/Footer/Footer'))
import Footer from '../../components/Footer/Footer';
//import MediumHome from '../../components/MediumHome'

const Home = () => {
    return (
      <div>
          <Slider />
          <CamListHome />
        {/* <MediumHome userState={props.userState}/> */}
          <Footer />
      </div>
    );
}

export default Home;
