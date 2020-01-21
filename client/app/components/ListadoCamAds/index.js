import React from 'react';
import {Link} from 'react-router-dom';
import ImageBanner from '../ImageBanner'

const ListadoCamAds = ({cam, cam_key, ads}) => {
    
        ads.map((ad, ad_key)=>{
                (cam_key == ad.pos)
                ? <>
                    <div className="card" key={ad_key}>
                        <div className="card-body p-0">
                            <h1>Imagen del banner</h1>
                        </div>
                    </div>                                            
                    <div className="card" key={cam_key}>    
                        <div className="card-body p-0">
                                <ImageBanner imagen={cam.banner} name={cam.name} slug={cam.slug}/>
                            <div className="ml-2 my-auto">
                                <Link to={cam.slug} cam={cam}>
                                    <h5 className="card-title mb-0 list-title">{cam.title}</h5>
                                </Link>
                                <p className="card-text mb-0"><small>Mar del plata</small></p>
                                <p className="card-text"><small><i className="fas fa-map-marker-alt"></i> Ubicacion</small></p>
                            </div>
                        </div>
                    </div>
                </>
                : <div className="card" key={cam._id}>    
                        <div className="card-body p-0">
                                <ImageBanner imagen={cam.banner} name={cam.name} slug={cam.slug}/>
                            <div className="ml-2 my-auto">
                                <Link to={cam.slug} cam={cam}>
                                    <h5 className="card-title mb-0 list-title">{cam.title}</h5>
                                </Link>
                                <p className="card-text mb-0"><small>Mar del plata</small></p>
                                <p className="card-text"><small><i className="fas fa-map-marker-alt"></i> Ubicacion</small></p>
                            </div>
                        </div>
                    </div>
        })
    
};

export default ListadoCamAds;