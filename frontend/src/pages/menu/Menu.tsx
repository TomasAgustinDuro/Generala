import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import logo from "../../assets/ChatGPT_Image_23_abr_2025__07_06_41_p.m.-removebg-preview.png";

function Menu() {
  return (
    <div className={styles.containerMenu}>
      <img src={logo} alt="Logo" />
      <div className={styles.containerOptions}>
        <Link to="/menu/pc" className={styles.button}>
          vs PC
        </Link>
        <Link to={"/menu/jugador"} className={styles.button}>
          vs Jugador
        </Link>
      </div>
      <div className={styles.disclaimer}>
        <strong>
          <p>
            Si estas en celular al ingresar a un modo de juego gira la pantalla
          </p>
        </strong>
      </div>
    </div>
  );
}

export default Menu;
