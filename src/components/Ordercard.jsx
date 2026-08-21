function OrderCard() {
  return <div>Order Card</div>;
}
<h3
  style={{
    color:
      time - order.createdAt < 600000
        ? "green"
        : time - order.createdAt < 900000
        ? "orange"
        : "red",
  }}
>
  ⏱ {getTimer(order.createdAt)}
</h3>

export default OrderCard;