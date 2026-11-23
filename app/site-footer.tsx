import Image from "next/image";
import Link from "next/link";
import "./site-footer.css";

type SiteFooterProps = {
  action: { href: string; label: string };
};

export default function SiteFooter({ action }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <Link href="/" className="site-footer-brand" aria-label="反诈英雄网首页">
        <Image src="/brand-light.png" alt="" width={26} height={26} />
        反诈英雄网
      </Link>
      <p>纪念与电诈恶势力抗争、为守护人民而付出的英雄。</p>
      <Link href={action.href} className="site-footer-action">
        <span aria-hidden="true">{action.href.startsWith("#") ? "↑" : "←"}</span>
        {action.label}
      </Link>
    </footer>
  );
}
