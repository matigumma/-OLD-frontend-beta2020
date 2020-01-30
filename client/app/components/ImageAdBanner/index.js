import React from 'react'
import config from '../../../config'

const imageSrcUrl = config.imageAdBannerSrcUrl

const ImageAdBanner = ({imagen, name, slug}) => {
    console.log(imagen)
    console.log(name)
    console.log(slug)
    function addDefaultSrc(ev){
        ev.target.src = '/assets/img/logo-footer.png'
    }
    function loaded(ev){
        ev.target.previousSibling.className="d-none"
        ev.target.className="img-responsive m-0 adimg w-100 d-block"
    }
/*     if(imagen){ */
        return (
            <div className="adimg">
                <div className="hovereffect">
                    
                    <img className="img-responsive m-0 adimg d-none" src={`${imageSrcUrl}${imagen}`}  alt={name}/>
                    <div className="overlay">
                    <h2>{name}</h2>
                    <a className="info" href={slug} target="_blank">+ info</a>
                    </div>
                </div>
            </div>
            )
/*     }else{
        return (
            <div className="adimg">
                <div className="hovereffect">
                    <i className="fas fa-4x m-2 fa-sync fa-spin" style={{outerHeight:'90px'}}></i>
                    <img className="img-responsive m-0 adimg d-none" src="" onLoad={addDefaultSrc} alt={name}/>
                    <div className="overlay">
                    <h2>{name}</h2>
                    <a className="info" href={slug} target="_blank">+ info</a>
                    </div>
                </div>
            </div>)
    } */
}
export default ImageAdBanner