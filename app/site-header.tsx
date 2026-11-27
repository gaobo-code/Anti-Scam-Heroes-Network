import Image from "next/image";
import Link from "next/link";
import FriendlyLinks from "./friendly-links";

type SiteHeaderProps = {
  action: { href: string; label: string };
  showFriendlyLinks?: boolean;
  overlay?: boolean;
};

export default function SiteHeader({
  action,
  showFriendlyLinks = false,
  overlay = false,
}: SiteHeaderProps) {
  return (
    <header className={`site-header${showFriendlyLinks ? " site-header-pair" : ""}${overlay ? " site-header-overlay" : ""}`}>
      <nav className="site-header-inner" aria-label="主导航">
        <Link className="site-header-brand" href="/" aria-label="反诈英雄网首页">
          <span className="site-header-mark">
            <Image src="/brand-light.webp" alt="" width={28} height={28} />
          </span>
          <span>反诈英雄网</span>
        </Link>
        <div className="site-header-nav">
          {showFriendlyLinks && <FriendlyLinks />}
          <Link className="site-header-action" href={action.href}>{action.label}</Link>
        </div>
      </nav>
    </header>
  );
}
