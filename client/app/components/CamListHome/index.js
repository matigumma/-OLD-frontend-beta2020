import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Loading from '../Loading'
import ImageBanner from '../ImageBanner'
import ImageAdBanner from '../ImageAdBanner'

import config from '../../../config'
const imageSrcUrl = config.imageAdBannerSrcUrl

const CamListHome = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [cameras, setCameras] = useState([])
    const [ads, setAds] = useState([])

    useEffect(()=>{
        setCameras(props.cameras)
        setAds(props.ads)
        setIsLoading(false)
    },[props])

    let an=[]
    return(
        isLoading
        ? <Loading/>
        :
        <div className="">
                <section className="container m-auto">
                <div className="clearfix text-right text-secondary my-1">
{/*                     <span>ver en mapa</span>
                    <i className="ml-2 fas fa-map-marker-alt"></i> */}
                </div>
                <h2 className="caption mr-auto my-4 text-primary h1">CAMARAS EN VIVO</h2> 
                
                <div className="card-columns m-auto p-0">
                    {
                        cameras.map((cam,cam_key)=>{
                            ads.map((ad, ad_key)=>{
                                if(cam_key == ad.pos){
                                    an[ad_key] = <div className="card" key={ad._id}>
                                                    <div className="card-body p-0">
                                                        {/* <ImageAdBanner imagen={ad.image} name={ad.title} slug={ad.link}/> */}
                                                        <div className="adimg">
                                                            <div className="hovereffect">
                                                                <img className="img-responsive m-0 adimg w-100 d-block" src={`${imageSrcUrl}${ad.image}`}  alt={ad.title}/>
                                                                <div className="overlay">
                                                                <h2>{ad.title}</h2>
                                                                <a className="info" href={ad.link} target="_blank">+ info</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                 </div>
                                }
                            })
                            return(<div key={cam_key}>
                                    {an[cam_key]}
                                    <div className="card" key={cam_key}>
                                        <div className="card-body p-0">
                                            <ImageBanner imagen={cam.banner} name={cam.name} slug={cam.slug}/>
                                            <div className="ml-2 my-auto">
                                                <Link to={{
                                                    pathname: 'cam/'+cam.slug,
                                                    state: {
                                                        thiscam: cam
                                                    }
                                                }} >
                                                    <h5 className="card-title mb-0 list-title">{cam.title}</h5>
                                                </Link>
                                                <p className="card-text mb-0">
                                                    <small> </small>
                                                </p>
                                                <p className="card-text">
                                                    <small><i className="fas fa-map-marker-alt"></i> {cam.ciudad} · {cam.pais}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
                </section>
            </div>
    )
}
export default CamListHome