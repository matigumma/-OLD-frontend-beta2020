import React, {  } from 'react';
import {Link} from 'react-router-dom';

const MediumHome = (props) => {
/* class MediumHome extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.setState(this.props.userState)
    } */

    /* render() { */
        return (
            <section className="container mx-auto">
                <h2 className="caption mx-auto text-center text-primary my-5 py-5 h1">COMUNIDAD FREEWAVES</h2>
                <div className="card-columns redondas m-auto p-0">
                    <div className="card border-0">
                    <div className="card-body p-0 ">
                        <Link to="/raiders" alt="raiders" className="border-0 mx-auto text-center">
                        {/* <img className="m-auto redondel rounded-circle" src="/assets/img/guy-kawasaki-iij-QvyRAnM-unsplash.jpg"  alt="..."/> */}
                        <div className="m-auto redondel1 rounded-circle"></div>
                        <h3 className="text-dark my-2 ">RAIDER DEL MES</h3>
                        </Link>
                    </div>
                    </div>
                    <div className="card border-0">
                    <div className="card-body p-0">
                        <Link to="/fotos" alt="fotos" className="border-0 mx-auto text-center">
                        {/* <img className="m-auto redondel rounded-circle" src="/assets/img/Bulluc.jpg"  alt=".."/> */}
                        <div className="m-auto redondel2 rounded-circle"></div>
                        <h3 className="text-dark my-2 ">FOTOS</h3>
                        </Link>
                    </div>
                    </div>
                    <div className="card border-0">
                    <div className="card-body p-0">
                        <Link to="/spot" alt="spot" className="border-0 mx-auto text-center">
                        {/* <img className="m-auto redondel rounded-circle" src="/assets/img/Bulluc.jpg"  alt="."/> */}
                        <div className="m-auto redondel3 rounded-circle"></div>
                        <h3 className="text-dark my-2 ">SPOT DEL MES</h3>
                        </Link>
                    </div>
                    </div>
                </div>
            </section>
        );
    /* } */
}

export default MediumHome;