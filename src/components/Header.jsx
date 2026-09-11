export default function Header() {
  return (
    <div className="flex sb px4 py1 ac">
      <div className="flex g1">
        <img src="/primary.png" alt="company logo" height={32} />
        <h6>Eco Fulfillment Centre</h6>
      </div>
      <div className="flex g2">
        <p>Home</p>
        <p>Services</p>
        <p>Company</p>
        <p>Log In</p>
        <p>Contact</p>
      </div>
    </div>
  )
}
