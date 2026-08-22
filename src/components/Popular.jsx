import "./Popular.css";
import menu from "../data/menu";
import FoodCard from "./FoodCard";

function Popular({ setCart, search, category, setToast }) {
  const filteredMenu = menu.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchCategory =
      category === "All" || item.category === category;

    return matchSearch && matchCategory;
  });

  // Menu ke sections
  const sections = [...new Set(filteredMenu.map((item) => item.section))];

  return (
    <section className="popular">

      <h2>Our Menu</h2>

      {sections.map((section) => {
        const sectionItems = filteredMenu.filter(
          (item) => item.section === section
        );

        return (
          <div className="menu-section" key={section}>

            <h3 className="menu-section-title">
              {section}
            </h3>

            <div className="popular-container">
              {sectionItems.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  setCart={setCart}
                  setToast={setToast}
                />
              ))}
            </div>

          </div>
        );
      })}

      {filteredMenu.length === 0 && (
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          😕 No dishes found
        </h3>
      )}

    </section>
  );
}

export default Popular;