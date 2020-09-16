import React from 'react';
import './style.css';
import {ReactComponent as ArrowIcon} from '../../assets/Seta.svg';
import {ReactComponent as GamerImage} from '../../assets/principal.svg';
const Home = ()=>(
    <div className="home-container">
        <div className="home-text">
            <h1 className="home-text-title">
                What game is the best ?
            </h1>
            <h3 className="home-text-subtitle">
                Click in the button bellow to discover what games the players like
            </h3>
            <div className="home-actions">
                <button className="home-btn">
                    I want to know
                </button>
                <div className="home-btn-icon">
                    <ArrowIcon/>
                </div>
            </div>
        </div>
        <GamerImage className="home-image"/>
    </div>
);

export default Home;