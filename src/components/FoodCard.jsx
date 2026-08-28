import "./Popular.css";

function FoodCard({ name, price, image, setCart, setToast }) {
  const addToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.name === name
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          name,
          price,
          image,
          quantity: 1,
        },
      ];
    });

    setToast(`✅ ${name} added to cart`);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  return (
    <div className={`food-card ${!image ? "no-image" : ""}`}>

      {/* Image sirf tab dikhegi jab image available ho */}
      {image && (
        <img
          src={image}
          alt={name}
        />
      )}

      <div className="food-card-content">

        <h3>{name}</h3>

        <p>₹{price}</p>

        <button onClick={addToCart}>
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default FoodCard;