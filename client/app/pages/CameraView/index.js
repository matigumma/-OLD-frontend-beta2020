import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router'
import './styles.scss'
import Loading from '../../components/Loading'
import Anuncios from './Anuncios'
// import Iframe from 'react-iframe'
import Iframe from 'iframe-resizer-react'
import ReactPlayer from 'react-player'
import axios from 'axios'
import ReactGA from "react-ga";
import config from '../../../config'
const baseUrl = config.baseUrl
const videoBaseUrl = config.videoBaseUrl
const contentBaseUrl = config.imageBannerSrcUrl

async function loadTc(any, list){
  try {
    const eureca = await list.map((c)=>{
      if(c.slug == any)
        return c
    })
    const res = eureca.filter(eu => eu != undefined);
    return res
  } catch (error) {
    console.log(error)
  }
}

function getAdsList(tc) {//podria reemplazar esto por el dato traido por props
  try {
      let tmpAds = []
      if(tc.ad1.file!='') tmpAds.push(tc.ad1)
      if(tc.ad2.file!='') tmpAds.push(tc.ad2)
      if(tc.ad3.file!='') tmpAds.push(tc.ad3)
      if(tc.ad4.file!='') tmpAds.push(tc.ad4)
      if(tc.ad5.file!='') tmpAds.push(tc.ad5)
      if(tc.ad6.file!='') tmpAds.push(tc.ad6)
      return tmpAds
  } catch (error) {
      console.log(error)
  }
}
const Sponsor = React.memo(function Sponsor({sponsor, desdeCam}){
  function handleSponsorClick(){
    ReactGA.event({
      category: `Sponsor ${desdeCam}`,
      action: 'Click en sponsor',
      label: sponsor.name? sponsor.name : sponsor.link? sponsor.link : sponsor.file? sponsor.file : '',
      nonInteraction: false
    })
  }
  if(sponsor && sponsor.file){
    return (
    <a href={sponsor.link} onClick={handleSponsorClick} rel="external" target="_blank" >
      <img  src={`${contentBaseUrl}${sponsor.file}`} 
            className="d-inline-block align-top m-2" 
            style={{maxWidth:'171px'}} 
            alt="sponsor" />
    </a>
    )
  }else{
    return (
    <img src="/assets/img/Logo.png" 
      width="171" height="30" 
      className="d-inline-block align-top m-2"
      alt="freewaves"
    />
    )
  }
})
/* function loaded(ev){
  ev.target.previousSibling.className="d-none"
  ev.target.className="img-responsive m-0 adimg w-100 d-block"
}
function Anuncios({listadoAnuncios}){
  return(
  listadoAnuncios.map((ad,key)=>{
    return ( <div className="adimg" key={key}>
              <div className="hovereffect">
                  <i className="fas fa-4x m-2 fa-sync fa-spin" style={{outerHeight:'90px'}}></i>
                  <img className="img-responsive m-0 adimg d-none" onLoad={loaded} src={`${contentBaseUrl}${ad.file}`} alt={ad.name}/>
                  <div className="overlay">
                  <h2>
                    <a className="info" href={ad.link} target="_blank">{ad.name} + info</a>
                  </h2>
                  </div>
              </div>
            </div>
          )
  })
  )
}  */

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

const CameraView = (props) => {
  //const [cameras, setCameras] = useState([])
  const [camara, setCamara] = useState([])
  const [ads, setAds] = useState([])
  const [adsReady, setAdsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [url, setUrl] = useState(null)
  const [withPreroll, setWithPreroll] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [skiped, setSkiped] = useState(false)
  const player = useRef()
  const skipBtn = useRef()
  
  const load = url => {
    setUrl(url)
  }
  

  const handleSkip = () => {
    skipBtn.current.classList.add('d-none')
    setSkiped(true)
    setPlayed(1)
    ReactGA.event({
      category: `Preroll ${camara.name}`,
      action: 'Skip video',
      label: camara.preroll.name? camara.preroll.name : camara.preroll.link? camara.preroll.link : camara.preroll.file? camara.preroll.file : '',
      nonInteraction: false
    })
    load(`${videoBaseUrl}${camara.name}.m3u8`)
  }
  
  const handleProgress = state => {
    //if (withPreroll) { //si hay un prerroll video
      if (state.playedSeconds > 3 && !skiped) { //si pasaron 3 segundos
        skipBtn.current.classList.remove('d-none') //muestro el boton de skip
      }
      if (state.played==1) {
        //setPlayed(0)
        setWithPreroll(false)
        //console.log('withPreroll: ',withPreroll)
        skipBtn.current.classList.add('d-none')
        load(`${videoBaseUrl}${camara.name}.m3u8`)
      }
      setPlayed(state.played) //estado de la reproduccion (si es preroll termina en algun momento, si es stream no..)
    //}
  }

  const showPoster = () =>{
    setTimeout(() => {
      setPlaying(true)
    }, 4000)
    ReactGA.event({
      category: `Poster ${camara.name}`,
      action: 'Show poster',
      label: camara.poster.name? camara.poster.name : camara.poster.link? camara.poster.link : camara.poster.file? camara.poster.file : '',
      nonInteraction: true
    })
  }
  

  useEffect(()=>{
    (() => window.scrollTo(0, 0))()

		async function loadCams () {
			const res = await getCameras()
			if(res.status === 200) {
        //console.log('loadCams: ',res.data)
        return res.data
			}
		}
    
    async function loadStream(c) {
      c.preroll.file ? 
      (
        setWithPreroll(true),
        await load(`${contentBaseUrl}${c.preroll.file}`),
        ReactGA.event({
          category: `Preroll ${c.name}`,
          action: 'Carga video',
          label: c.preroll.name? c.preroll.name : c.preroll.link? c.preroll.link : c.preroll.file? c.preroll.file : '',
          nonInteraction: true
        }),
        setIsLoading(false),
        (c.poster && c.poster.file) && showPoster()
      )
      :
      ( 
        await load(`${videoBaseUrl}${c.name}.m3u8`),
        setIsLoading(false),
        setPlaying(true)
      )
    }

    async function loadAnuncios(c) {
      const arr = await getAdsList(c)
      setAds(arr)
      setAdsReady(true)
    }

    async function loadCam (cams) {
      let res = await loadTc(props.match.params.any, cams)
      //console.log('res: ',res)
      if(res[0] === undefined){
        setNotFound(true)
      }else{
        setCamara(res[0])
        loadAnuncios(res[0])
        loadStream(res[0])
      }
    }
    loadCams().then((cameras)=>loadCam(cameras))
  },[])

  
  return (
    notFound
    ? <Redirect to={{pathname: '/404', state: {from:props.location}}} />
    :
    error
    ? isLoading
        ? <div className="pt-5"><Loading/></div>
        :<div className="">
          <div className='d-flex flex-column justify-content-center bg-dark'>
            <div className="py-4 container" style={{innerWidth:'100%', innerHeight:'80%'}}>
              <i className="text-white m4-4 fa fa-frown-o fa-5x" aria-hidden="true"></i>
              <br/>
              <span className="text-warning h4 my-3">Hubo un error en la transmision</span>
            </div>
            <Sponsor sponsor={camara.sponsor} desdeCam={camara.name} />
          </div>
          <section className="container mx-auto">
            <h2 className="caption mx-auto text-left text-primary my-1 py-1 h1">{camara.title}</h2>
            <div className="m-auto p-0">
              <div className="card-columns m-auto p-0">
                {
                  !adsReady
                  ?
                  <Loading/>
                  :
                  <Anuncios listadoAnuncios={ads} />
                }
              </div>
            </div>
          </section>
        </div>
    :<div className="">
      <div className='d-flex flex-column justify-content-center bg-dark'>
        <ReactPlayer
          className={window.innerWidth>1024? 'mx-auto' : 'm-0 p-0'}
          ref={player}
          url={url}
          config={{
            file: { 
              attributes: { 
                preload: 'metadata',
                poster: (camara.poster && camara.poster.file)? `${contentBaseUrl}${camara.poster.file}` : `/assets/img/sumateComoAnunciante.jpeg`
              } 
            } 
          }}
          volume={null}
          loop={false}
          onProgress={ withPreroll? handleProgress: !handleProgress }
          onError={ (e) => console.log('hubo un error',e) }
          muted
          playing={playing}
          playsinline
          pip
          controls
          width={window.innerWidth>1024? '80%' : '100%'}
          height='100%'
          />
        <button ref={skipBtn} className="d-none skip btn btn-sm btn-outline-warning position-absolute" onClick={ handleSkip }>Skip Ad</button>
        <Sponsor sponsor={camara.sponsor} desdeCam={camara.name} />
      </div>
      <section className="container mx-auto">
        <div className="clearfix text-right text-secondary my-1">
          <a href={camara.gmapLink} target="_blank" className="text-muted">
            <i className={`ml-2 mr-1 mt-2 fa-${window.innerWidth>1024? '2x':'1x'} fas fa-map-marker-alt`}></i>
            <span>UBICACIÓN</span>
          </a>
        </div>
        <h2 className="caption mx-auto text-left text-primary my-1 py-1 h1">{camara.title}</h2>
        <div className="m-auto p-0">
          <div className="card-columns m-auto p-0">
            {
              !adsReady
              ?
              <Loading/>
              :
              <Anuncios listadoAnuncios={ads} />
            }
          </div>
        </div>
      </section>
      <section className="w-90 my-5 d-block">
        {camara.lat && camara.lng
        ?
          <Iframe 
                src={`/assets/weather.html?lat=${camara.lat}&lng=${camara.lng}`}
                style={{ border: 'none', width: '1px', minWidth: '100%', height: window.innerWidth>1024? '700px':'600px'}}
          />
          :
          <></>
        }
        </section>
    </div>
  )
}

export default CameraView;