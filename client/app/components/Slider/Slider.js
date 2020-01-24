import React, {useRef, useState, useEffect, useCallback} from 'react';
//import {useTransition, animated} from 'react-spring'
import './styles.scss';

function Slider(props) {
    const ref = useRef([])
    const [items, set] = useState([])
/*     const transitions = useTransition(items, null, {
        from: { opacity: 0, height: 0, innerHeight: 0, transform: 'perspective(600px) rotateX(0deg)', color: '#c23369' },
        enter: [
        { opacity: 1, height: 80, innerHeight: 80 },
        { transform: 'rotateX(180deg)' },
        { transform: 'rotateX(0deg)' },
        ],
        leave: [ { innerHeight: 0 }, { opacity: 0, height: 0 }],
        update: { color: '#ffffff' },
    })

    const reset = useCallback(() => {
        ref.current.map(clearTimeout)
        ref.current = []
        set([])
        ref.current.push(setTimeout(() => set(['Anticipate', 'a las', 'olas']), 0))
        ref.current.push(setTimeout(() => set(['Tu spot', 'favorito', 'online']), 3000))
        ref.current.push(setTimeout(() => set(['Freewaves', 'live', 'Comunnity']), 7000))
    }, []) 

    useEffect(() => {
        void reset()
        return () =>{
        ref.current.map(clearTimeout)
        }
    }, [])*/
    return (
        <header className="bd">
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
            </ol>
            <div className="carousel-inner">            
            <div className="carousel-item active">
                <img src="/assets/img/slide1.jpg" className="d-block w-100" alt="..."/> 
                <div className="carousel-caption d-none d-lg-block text-left">  
                <h1>ANTICIPATE A</h1>
                <h1>LAS OLAS</h1>
                <p>Freewaves es la forma mas fácil de viewpor<br/>
                    tu spot preferido en tiempo real esté<br/>
                    donde estés.<br/>
                </p>
{/*                 <span><b>VER CAMARAS</b></span>
                {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
                <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
                    <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
                </animated.div>
                ))} */}
                </div>
            </div>
            </div>
{/*             <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Prev</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a> */}
            <div className="espuma"></div>
        </div>
        </header>
    );
}

export default Slider;