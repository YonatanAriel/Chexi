import styles from './style.module.css';
import { FaRegHeart, FaHeart, FaPlay } from 'react-icons/fa';
import {TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled, TbPlayerPauseFilled} from 'react-icons/tb';
import {ImVolumeMute2, ImVolumeHigh, ImVolumeMedium, ImVolumeLow} from 'react-icons/im';
function Footer(){
    return <>
    <div className={styles.mainDiv}>
    <FaRegHeart />
    <FaHeart />
    <p>0:34</p>
    <TbPlayerSkipBackFilled />
    <FaPlay size={30} style={{color:"black"}}/>
    <TbPlayerPauseFilled />
    <TbPlayerSkipForwardFilled />
    <p>3:15</p>
    <ImVolumeMute2 /><ImVolumeHigh /><ImVolumeMedium /><ImVolumeLow />
    <input type="range" /> 
    </div>
    </>
}
export default Footer