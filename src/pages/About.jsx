import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="about-badge">
          🍔 Y&Y Veg Grill
        </div>

        <h1>
          Fresh Food.
          <span> Premium Taste.</span>
        </h1>

        <p>
          Where delicious vegetarian food meets great taste,
          fresh ingredients and a warm dining experience.
        </p>
      </section>


      <section className="about-story">

        <div className="about-card main-story">
          <div className="about-icon">🌱</div>

          <h2>Our Story</h2>

          <p>
            Welcome to Y&Y Veg Grill — a place where great food
            and great taste come together.
          </p>

          <p>
            Our focus is simple: serve fresh, delicious vegetarian
            food with quality ingredients and flavours that make
            every meal memorable.
          </p>

          <p>
            From Indian favourites to Chinese dishes, Fast Food
            and Soya Chaap, our menu has something for every
            craving.
          </p>
        </div>


        <div className="about-card why-card">

          <h2>✨ Why Y&Y Veg Grill?</h2>

          <div className="why-list">

            <div className="why-item">
              <span>🥗</span>
              <div>
                <h3>100% Vegetarian</h3>
                <p>Delicious vegetarian food for everyone.</p>
              </div>
            </div>

            <div className="why-item">
              <span>🌱</span>
              <div>
                <h3>Fresh Ingredients</h3>
                <p>Quality ingredients in every dish.</p>
              </div>
            </div>

            <div className="why-item">
              <span>👨‍🍳</span>
              <div>
                <h3>Made With Care</h3>
                <p>Prepared with attention to taste and quality.</p>
              </div>
            </div>

            <div className="why-item">
              <span>🍽️</span>
              <div>
                <h3>Wide Variety</h3>
                <p>Indian, Chinese, Fast Food and Soya Chaap.</p>
              </div>
            </div>

            <div className="why-item">
              <span>❤️</span>
              <div>
                <h3>Taste You'll Remember</h3>
                <p>Food made to bring you back for more.</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      <section className="about-highlight">

        <div>
          <span>🍴</span>

          <h2>
            Good Food.
            <br />
            Good Mood.
          </h2>

          <p>
            Come enjoy a delicious vegetarian meal
            at Y&Y Veg Grill.
          </p>
        </div>

      </section>


      <section className="about-location">

        <div className="location-card">

          <div className="about-icon">📍</div>

          <h2>Visit Y&Y Veg Grill</h2>

          <p>
            Jai Shree Mini Complex,
            Chandralok Colony,
            NH-2,
            Mathura - 281004
          </p>

          <div className="timing">
            🕐 Open Daily
            <strong>11:00 AM – 11:00 PM</strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;