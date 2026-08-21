import "./Policies.css";

function Policies() {
  return (
    <div className="policies-page">

      <div className="policies-hero">
        <span>Y&Y VEG GRILL</span>
        <h1>Our Policies</h1>
        <p>
          A few simple policies to keep your ordering experience
          smooth, clear and comfortable.
        </p>
      </div>


      <div className="policies-container">

        {/* Order & Cancellation */}
        <section className="policy-card">
          <div className="policy-icon">📦</div>

          <div>
            <h2>Order & Cancellation Policy</h2>

            <p>
              Once an order has been placed, our kitchen begins
              preparing it with care.
            </p>

            <p>
              Cancellation requests should be made as early as
              possible. Once preparation has started, cancellation
              may not be possible.
            </p>
          </div>
        </section>


        {/* Payment */}
        <section className="policy-card">
          <div className="policy-icon">💰</div>

          <div>
            <h2>Payment Policy</h2>

            <p>
              We currently accept the payment methods displayed
              during checkout.
            </p>

            <p>
              Customers are responsible for ensuring that the
              selected payment method is completed correctly.
            </p>
          </div>
        </section>


        {/* Refund */}
        <section className="policy-card">
          <div className="policy-icon">🔄</div>

          <div>
            <h2>Refund Policy</h2>

            <p>
              Refund requests are reviewed on a case-by-case basis.
            </p>

            <p>
              If you experience an issue with your order, please
              contact Y&Y Veg Grill with your order details so that
              we can review the matter and assist you.
            </p>
          </div>
        </section>


        {/* Privacy */}
        <section className="policy-card">
          <div className="policy-icon">🔒</div>

          <div>
            <h2>Privacy Policy</h2>

            <p>
              Information such as your name, phone number and order
              details is collected to process and manage your order.
            </p>

            <p>
              We aim to keep your information secure and use it only
              for purposes related to our services and customer
              support.
            </p>
          </div>
        </section>


        {/* Terms */}
        <section className="policy-card">
          <div className="policy-icon">📋</div>

          <div>
            <h2>Terms & Conditions</h2>

            <p>
              By using this website and placing an order, you agree
              to provide accurate information and follow the ordering
              process.
            </p>

            <p>
              Menu items, prices, availability and preparation times
              may change when required.
            </p>
          </div>
        </section>


        <div className="policy-footer">
          <strong>Y&Y Veg Grill</strong>
          <span>•</span>
          <span>Thank you for choosing us ❤️</span>
        </div>

      </div>
    </div>
  );
}

export default Policies;