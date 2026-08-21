import Search from "../components/Search";
import Popular from "../components/Popular";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Cart from "../components/Cart";

function Home({
  cart,
  setCart,
  search,
  setSearch,
  category,
  setCategory,
  showCart,
  setShowCart,
  toast,
  setToast,
}) {
  return (
    <>
      <Hero />

      <Search
        search={search}
        setSearch={setSearch}
      />

      <Categories
        category={category}
        setCategory={setCategory}
      />

      <div style={{ display: "flex" }}>
        <Popular
          setCart={setCart}
          search={search}
          category={category}
          setToast={setToast}
        />

        {showCart && (
          <div
            className="cart-overlay"
            onClick={() => setShowCart(false)}
          ></div>
        )}

        <Cart
          cart={cart}
          setCart={setCart}
          showCart={showCart}
          setShowCart={setShowCart}
        />
      </div>
    </>
  );
}

export default Home;