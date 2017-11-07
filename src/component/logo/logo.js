import React from 'react'
import logoImg from './MOBA2.svg'
import './logo.css'
class Logo extends React.Component {
    render() {
        return <div className="Container">
            <img src={logoImg} alt="logo" />
        </div>
    }
}
export default Logo