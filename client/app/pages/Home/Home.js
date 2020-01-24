import React, {Suspense, lazy} from 'react';
//import axios from 'axios'
import Loading from '../../components/Loading'
//import Slider from '../../components/Slider/Slider';
const Slider = lazy(() => import('../../components/Slider/Slider'))
//import Footer from '../../components/Footer/Footer';
const Footer = lazy(() => import('../../components/Footer/Footer'))
//import CamListHome from '../../components/CamListHome';
const CamListHome = lazy(() => import('../../components/CamListHome'))
//import MediumHome from '../../components/MediumHome'

const Home = (props) => {
    return (
      <div>
        <Suspense fallback={<Loading/>}>
          <Slider />
        </Suspense>
        <Suspense fallback={<Loading/>}>
          <CamListHome ads={props.ads} cameras={props.cameras} userState={props.userState}/>
        </Suspense>
        {/* <MediumHome userState={props.userState}/> */}
        <Suspense fallback={<Loading/>}>
          <Footer />
        </Suspense>
      </div>
    );
}

export default Home;
