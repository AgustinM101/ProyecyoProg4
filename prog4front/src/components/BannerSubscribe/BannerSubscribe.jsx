
import "./BannerSubscribe.css"; 

export default function BannerSubscribe() {
  return (
    <section className="banner-section">
      <div className="banner-content">
        <div className="banner-text">
          <h2>DEJÁ EL SEDENTARISMO ATRÁS</h2>
          <p>
            Transformá tu cuerpo y tu vida con nuestros planes de entrenamiento.  
            Unite hoy y empezá a ver los resultados.
          </p>
          <button className="banner-btn">¡Inscribite ya!</button>
        </div>

        <div className="banner-images">
          <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792217/IMG_1998_lhh9zu.jpg" alt="Antes y después 1" />
          <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792215/IMG_1997_fbwnuz.jpg" />
          <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792213/IMG_2789_zntikj.jpg" />
        </div>
      </div>
    </section>
  );
}
