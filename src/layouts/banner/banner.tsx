import './banner.scss'
import {useNavigate} from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className="banner">
            <div className="nav" onClick={() => navigate('/overview')}>overview</div>
            <div className="nav" onClick={() => navigate('/precept')}>precept</div>
        </div>
    )
}

export default Banner
