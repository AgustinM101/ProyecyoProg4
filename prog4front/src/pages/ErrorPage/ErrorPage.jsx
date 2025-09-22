
import "./ErrorPage.css";
import { Link } from "react-router-dom";



export function ErrorPage() {
  return (
    <div className="notfound-container">
      {/* Logo en la parte superior */}
      <div className="notfound-logo">
        <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png" alt="Gym Logo" />
      </div>

      <div className="notfound-grid">
        {/* Imagen para mobile */}
        <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757829935/pensamiento_tfyvbz.png" alt="Not found" className="mobile-image glow" />

        {/* Contenido */}
        <div className="notfound-content">
          <h1 className="notfound-title glow">Algo salió mal...</h1>
          <p className="notfound-text">
            La página que intentas abrir no existe. Puede que hayas escrito mal la dirección o que la página haya sido movida a otra URL. 
            Si crees que esto es un error, contactanos.
          </p>
          <Link to="/" className="notfound-button"> Volver al inicio</Link>
        </div>

        {/* Imagen para desktop */}
        <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757829935/pensamiento_tfyvbz.png" alt="Not found" className="desktop-image glow" />
      </div>
    </div>
  );
}
