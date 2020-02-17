import React from 'react'
import {Link} from 'react-router-dom'

import config from '../../../config'

const imageSrcUrl = config.imageBannerSrcUrl
const imageSrcPoster = config.imageSrcPoster

const ImageBanner = ({cam}) => {
    function addDefaultSrc(ev){
        ev.target.src = '/assets/img/logo-footer.png'
    }
    function loaded(ev){
        ev.target.previousSibling.className="d-none"
        ev.target.className="m-0 cimg d-block"
    }
    if(cam.banner){
        return (
        <div>
            <Link to={{
                pathname: 'cam/'+cam.slug,
                state: {
                    thiscam: cam
                }
            }}>
                <i className="fas fa-4x m-2 fa-sync fa-spin" style={{outerHeight:'90px'}}></i>
                <img className="m-0 cimg d-none" src={ imageSrcUrl + cam.banner } onLoad={loaded} onError={addDefaultSrc} alt={cam.name}/>
            </Link>
        </div>)
    }else{
        return (
        <div>
            <Link to={{
                pathname: 'cam/'+cam.slug,
                state: {
                    thiscam: cam
                }
            }}>
                <i className="fas fa-4x m-2 fa-sync fa-spin" style={{outerHeight:'90px'}}></i>
                <img className="m-0 cimg d-none" src={ imageSrcPoster + cam.banner + '.jpg' } onLoad={loaded} onError={addDefaultSrc} alt={cam.name}/>
            </Link>
        </div>)
    }
}
export default ImageBanner