import React from 'react';
import config from '../../../config'
const contentBaseUrl = config.imageBannerSrcUrl
const Anuncios = ({listadoAnuncios}) => {
    console.log('calling Anuncios')
        function loaded(ev){
            ev.target.previousSibling.className="d-none"
            ev.target.className="img-responsive m-0 adimg w-100 d-block"
        }

        function addDefaultSrc(ev){
            ev.target.src = '/assets/img/logo-footer.png'
            ev.target.nextSibling.className="d-none"
        }

        return(
        listadoAnuncios.map((ad,key)=>{
            return ( <div className="adimg m-1" key={key}>
                    <div className="hovereffect">
                        <i className="fas fa-4x m-2 fa-sync fa-spin" style={{outerHeight:'90px'}}></i>
                        <img className="img-responsive m-0 adimg d-none" onLoad={loaded} src={`${contentBaseUrl}${ad.file}`} onError={addDefaultSrc} alt={ad.name}/>
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
        
};

export default Anuncios;