import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <Link to="/" className="footer-brand text-decoration-none">CraveFood</Link>
        <span>© 2025 CraveFood. Made for good food moments.</span>
      </div>
    </footer>
  )
}
