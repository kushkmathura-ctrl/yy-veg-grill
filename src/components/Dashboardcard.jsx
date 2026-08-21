<div className="dashboard-grid">

  <div className="card green">
    <h2>{orders.length}</h2>
    <p>Total Orders</p>
  </div>

  <div className="card orange">
    <h2>{orders.filter(o => o.status==="Pending").length}</h2>
    <p>Pending</p>
  </div>

  <div className="card blue">
    <h2>{orders.filter(o => o.status==="Preparing").length}</h2>
    <p>Preparing</p>
  </div>

  <div className="card purple">
    <h2>₹{orders.reduce((t,o)=>t+o.total,0)}</h2>
    <p>Sales</p>
  </div>

</div>