import { Link } from "react-router-dom";
import  styles from './menu.module.css'
import logo from '../../assets/ChatGPT_Image_23_abr_2025__07_06_41_p.m.-removebg-preview.png'

function Menu() {
  return (
    <div className={styles.containerMenu}>
      <img src={logo} alt="Logo" />

      <div className={styles.containerOptions}>
        <Link to="Pc" className={styles.button}>vs PC</Link>
        <Link to="Jugador" className={styles.button}>vs Jugador</Link>
        {/* <button>Anotador</button> */}
      </div>
    </div>
  );
}
export default Menu;
