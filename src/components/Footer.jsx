import Gear from './Gear.jsx'
import { useContent } from '../hooks/useContent.js'

export default function Footer() {
  const { t } = useContent()

  return (
    <footer className="footer">
      <Gear size={22} spin />
      <p>
        © {new Date().getFullYear()} {t.profile.name} · {t.ui.footer.built}
      </p>
      <div className="footer-links">
        <a href="#top">{t.ui.footer.backToTop}</a>
      </div>
    </footer>
  )
}
