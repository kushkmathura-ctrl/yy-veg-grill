import "./Categories.css";

function Categories({ category, setCategory }) {
  return (
    <section className="categories">

      <h2>Our Categories</h2>

      <div className="category-container">

        {/* All */}
        <div
          className={`card ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          🍽️
          <h3>All</h3>
        </div>

        {/* Indian */}
        <div
          className={`card ${category === "Indian" ? "active" : ""}`}
          onClick={() => setCategory("Indian")}
        >
          🇮🇳
          <h3>Indian</h3>
        </div>

        {/* Soya Chaap */}
        <div
          className={`card ${category === "Soya Chaap" ? "active" : ""}`}
          onClick={() => setCategory("Soya Chaap")}
        >
          🥙
          <h3>Soya Chaap</h3>
        </div>

        {/* Fast Food */}
        <div
          className={`card ${category === "Fast Food" ? "active" : ""}`}
          onClick={() => setCategory("Fast Food")}
        >
          🍔
          <h3>Fast Food</h3>
        </div>

        {/* Chinese */}
        <div
          className={`card ${category === "Chinese" ? "active" : ""}`}
          onClick={() => setCategory("Chinese")}
        >
          🥡
          <h3>Chinese</h3>
        </div>

      </div>

    </section>
  );
}

export default Categories;