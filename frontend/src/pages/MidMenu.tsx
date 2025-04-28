import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./midMenu.module.css";
import logo from "../assets/ChatGPT_Image_23_abr_2025__07_06_41_p.m.-removebg-preview.png";

function MidMenu() {
  const { mode } = useParams();

  return (
    <div className={styles.containerMenu}>
      <img src={logo} alt="Logo" />
      <div className={styles.containerOptions}>
        <div className={styles.playerSelection}>
          <div className={styles.playerButtons}>
            <Link to={`/${mode}/2`} className={styles.button}>
              vs 2 jugadores
            </Link>
            <Link to={`/${mode}/3`} className={styles.button}>
              vs 3 jugadores
            </Link>

            <Link to={`/${mode}/3`} className={styles.button}>
              vs 4 jugadores
            </Link>
          </div>
        </div>
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

export default MidMenu;
