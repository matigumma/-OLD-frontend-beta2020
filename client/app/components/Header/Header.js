import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import classnames from "classnames"
import 'bootstrap/dist/js/bootstrap.bundle.min'

import config from '../../../config'
const baseUrl = config.baseUrl
import axios from 'axios'
async function getCameras() {
  try {
      const response = await axios({
          url: `${baseUrl}/cameras-list`,
          method: 'GET'
      })
      //console.log('getCameras(): ',response)
      
      return response
  } catch (error) {
  console.log(error)
  }
}

const ListadoCamaras = React.memo(function ListadoCamaras(props){
//console.log(props.camaras.length)
  if(props.camaras.length > 0){
    return(
      <ul className="navbar-nav mr-auto">
        {props.camaras.map((cam, key) => (      
          <Link className="nav-link" to={'/cam/'+cam.slug} onClick={props.toggle} key={key}>
            <li className="nav-itemListadoCamaras nav-item text-center" >
              {cam.title}
            </li>
          </Link>
          )
        )}
      </ul>)
    }else{
      return <img className="no-list float-right" src="/assets/img/alert.png"/>
    }
})

const UserPic = React.memo(function UserPic(props){
  if (props.userState){
    if(props.userState.photos.length > 0){
      return <img id="thumbIcon" className="" src={props.userState.photos[0]}/>
    }else{
      //return <img id="thumbIcon" className="far fa-user-circle fa-2x" src="/assets/img/user-image.jpg"/>
      //return <i id="thumbIcon" className="fa fa-user fa-2x" aria-hidden="true"></i>
      return <i id="thumbIcon" className="fa fa-user-circle-o fa-1x text-primary" aria-hidden="true"></i>
    }
  }else{
    //console.log(props.userState.loggedIn)
    return <i id="thumbIcon" className="fa fa-user-circle fa-1x" aria-hidden="true"></i>
  }
})

const UserNavMenu = React.memo(function UserNavMenu(props){
  //console.log('UserNavMenu: ',props)
    if(props.userState){
      return (
      <ul className="navbar-nav ml-2">
        <li className="nav-item">
          <span className="nav-link">
            <i className="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp;{'Hola ' + props.userState.local.username }
          </span>
        </li>
{/*           <Link className="nav-link" to={'/user/' + props.userState._id} >
            <li className="nav-item">
                User profile
            </li>
            </Link> */}
          <Link to="#" className="nav-link" onClick={props._logout}>
            <li className="nav-item">
              LogOut
            </li>
          </Link>
      </ul>
      )
    } else {
      return (
        <ul className="navbar-nav ml-2">
            <Link className="nav-link" to="/signup">
              <li className="nav-item">
                Registro
              </li>
            </Link>
            <Link className="nav-link" to="/login">
              <li className="nav-item" >
                LogIn
              </li>
            </Link>
        </ul>
      )
    }
})

const Header = (props) => {
  const [listadoCamaras, setListadoCamaras] = useState([])
  //const [cameras, setCameras] = useState([])
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)

  useEffect(()=>{

    async function loadCams () {
			const res = await getCameras()
			if(res.status === 200) {
        //setCameras(res.data)
        return res.data
			}
		}

    loadCams().then((retcams)=>setListadoCamaras(retcams))
    
  },[])

  useEffect(()=>{
    document.addEventListener('click', (event)=>
          {
          let clickover = event.target
          let navbar = document.getElementById("usernav");               
          let _opened = navbar.classList.contains("show");
          if (_opened === true && !clickover.classList.contains("navbar-collapse")) {
              navbar.classList.toggle('show');
          }
      })
  })

  useEffect(()=>{
    if(window.innerWidth > 992) {
      const navMenu = document.getElementById('navbarSupportedContent')
      const menuToggler = document.getElementById('menuToggler')
      menuToggler.style.visibility='hidden';
      navMenu.className = 'navbar-nav navbar-expand order-2 ml-auto'
    }
    const camListIcon = document.getElementById('camListIcon');

    camListIcon.addEventListener('click', toggleListadoCamaras );
    //window.addEventListener("scroll", handleScroll);
    return () => {
      camListIcon.removeEventListener('click', toggleListadoCamaras );
      //window.removeEventListener("scroll", handleScroll);

    }
  })
  function navBarToggle(){
    const userNavBarToggle = document.getElementById('usernav')
    userNavBarToggle.classList.toggle('show')
  }

  function toggleListadoCamaras() {
    const offCanvas = document.getElementById('listadoCamaras');
    offCanvas.classList.toggle('open');
  }

  function handleScroll() {
    /* const { prevScrollpos } = this.state; */

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    setPrevScrollpos(currentScrollPos)
    setVisible(visible)
  }


  
  /* render() { */
    return (
      <>
      <nav className=
      {classnames("navbar navbar-light bg-light shadow", {
        "navbar hide": !visible
      })}
      id="header">
              
              <button id="usernav-menuToggler" className="navbar-toggler order-0 pt-1" type="button" data-toggle="collapse" data-target="#usernav"
                  aria-controls="usernav" aria-expanded="false" aria-label="Toggle navigation">
                    <UserPic userState={props.state}/>
              </button>

              <Link className="navbar-brand order-1 ml-2" to="/" alt="Logo Freewaves.live">
                  <img src="/assets/img/Logo.png" width="171" height="30" className="d-inline-block align-top"
                      alt="freewaves"/><small className="text-muted">Beta4.0</small>
              </Link>

              <button id="menuToggler" className="navbar-toggler order-3 ml-auto p-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> 
                  <span className="navbar-toggler-icon"></span>
              </button>

              <button id="camListIcon" className="navbar-toggler order-4 p-2" type="button" data-toggle="offcanvas" data-target="#listadoCamaras">
                  {/* <span className="oi oi-video" style={{lineHeight: 0}}></span> */}
                  <i className="fas fa-video text-danger shadow-sm"></i>
              </button>
              
              
              <div className="collapse navbar-collapse order-5" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-2">
                      
                      <li className="nav-item">
                          {/* <Link className="nav-link" to="/anuncios">Comunidad</Link> */}
                          <a href="http://freewaves.live/comunidad-fw/" target="_blank" className="nav-link">
                          Comunidad
                          </a>
                      </li>
                      <li className="nav-item">
                          {/* <Link className="nav-link" to="/users/list">Galeria</Link> */}
                          <a href="http://freewaves.live/nahuel-villarino/" target="_blank" className="nav-link">
                          Galeria
                          </a>
                      </li>
                      <li className="nav-item">
                          {/* <Link className="nav-link" to="/users/list">Galeria</Link> */}
                          <a href="http://freewaves.live/auspiciantes/" target="_blank" className="nav-link">
                          Auspiciantes
                          </a>
                      </li>
                      <li className="nav-item">
                          {/* <Link className="nav-link" to="/settings">Contacto</Link> */}
                          <a href="http://freewaves.live/contacto/" target="_blank" className="nav-link">
                          Contacto
                          </a>
                      </li>
                  </ul>
              </div>
              <div className="navbar-collapse collapse order-6" id="usernav">
                  <UserNavMenu userState={props.state} _logout={props._logout} />
              </div>
              <div id="listadoCamaras" className="navbar-collapse offcanvas-collapse">                  
                  <ListadoCamaras camaras={listadoCamaras} toggle={toggleListadoCamaras} />
              </div>
      </nav>
      {props.children}
      </>
    );
  /* } */
}

export default Header