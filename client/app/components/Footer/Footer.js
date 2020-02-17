import React from 'react';
import ReactPlayer from 'react-player'

const Footer = () => (
<footer className="footer w-100 mt-3">
  <img src="/assets/img/logo-footer.png" alt="Logo Freewaves" className="logo mx-auto d-block"/>
  <div className="container">
    
    <div className="row d-flex flex-wrap mt-5">
      <div className="col-md-12 col-lg-6">
        <div>
          <h4>¡Anticipate a las olas antes de salir!</h4>
FreeWaves es la forma más fácil de ver tu spot preferido en tiempo real estés donde estés. Ingresá desde tu compu o celular y mirá spots de Mar del Plata y Latinoamérica en tiempo real.
        </div>
        <div>
          <h5 className="caption m-0">Seguinos:</h5>
          <div className="d-flex mx-auto">
            <a href="https://www.instagram.com/freewaves.live/" rel="external" target="_blank" className="text-secondary m-2"><i className="fab fa-instagram fa-3x"></i></a>
            <a href="https://www.facebook.com/freewaves.live/" rel="external" target="_blank" className="text-secondary m-2"><i className="fab fa-facebook fa-3x"></i></a>
            <a href="https://www.youtube.com/channel/UCDkuDt4mP_MPGzd-tkUKGcw/videos" rel="external" target="_blank" className="text-secondary m-2"><i className="fab fa-youtube fa-3x"></i></a>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6">
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer 
          className="embed-responsive-item" 
          url="https://www.youtube.com/embed/n-5txBw5Ml8"
          width='100%'
          height='100%'
          />
        </div>
      </div>
    </div>
  </div>
  <div className="mt-4 w-100" style={{backgroundColor:'rgba(10, 90, 152, 0.66)'}}>
    <div className="container py-2">
      <span className="text-white font-weight-light">Copyright @ 2020 Freewaves.live Todos los derechos reservados.</span>
    </div>
  </div>
</footer>
);

export default Footer;
