import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <div className="contact-header">
        <span>📍 Y&Y Veg Grill</span>
        <h1>Get In Touch</h1>
        <p>
          Have a question, want to order, or just want to say hello?
          We're here for you.
        </p>
      </div>

      <div className="contact-container">

        {/* Phone */}
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h3>Call Us</h3>
          <p>7409433974</p>

          <a href="tel:7409433974">
            Call Now
          </a>
        </div>

        {/* WhatsApp */}
        <div className="contact-card">
          <div className="contact-icon">💬</div>
          <h3>WhatsApp</h3>
          <p>7409433974</p>

          <a
            href="https://wa.me/917409433974"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Address */}
        <div className="contact-card address-card">
          <div className="contact-icon">📍</div>
          <h3>Visit Us</h3>

          <p>
            Jai Shree Mini Complex,
            Chandralok Colony,
            NH-2,
            Mathura - 281004
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Jai+Shree+Mini+Complex+Chandralok+Colony+NH-2+Mathura+281004"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>

        {/* Opening Hours */}
        <div className="contact-card">
          <div className="contact-icon">🕐</div>
          <h3>Opening Hours</h3>

          <p>Every Day</p>

          <strong>
            11:00 AM – 11:00 PM
          </strong>
        </div>

        {/* Email */}
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h3>Email Us</h3>

          <p>
            radharanifood123@gmail.com
          </p>

          <a href="mailto:radharanifood123@gmail.com">
            Send Email
          </a>
        </div>

      </div>

      <div className="contact-bottom">
        <h2>🍔 We'd Love To Hear From You</h2>
        <p>
          Fresh food, premium taste and a warm welcome at Y&Y Veg Grill.
        </p>
      </div>

    </div>
  );
}

export default Contact;