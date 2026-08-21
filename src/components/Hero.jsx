import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <div className="hero-badge">
          🍽️ Fresh • Pure • Delicious
        </div>

        <h1>
          Welcome to <span>Y&Y Veg Grill</span>
        </h1>

        <p>
          Fresh Food • Fast Delivery • Premium Taste
        </p>

        <div className="buttons">
          <button className="order-btn">
            Order Now
          </button>

          <button className="menu-btn">
            View Menu
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;