"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AdminNavigation() {
  const drawer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeMenu = () => drawer.current?.close();

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 720px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) drawer.current?.close();
    };

    mobile.addEventListener("change", closeOnDesktop);
    return () => mobile.removeEventListener("change", closeOnDesktop);
  }, []);

  const workbench = (
    <Link className="admin-nav-current" href="/baba" aria-current="page" onClick={closeMenu}>
      <span className="admin-nav-icon" aria-hidden="true" />工作台
    </Link>
  );

  return (
    <>
      <nav className="admin-desktop-nav" aria-label="后台导航">{workbench}</nav>
      <button
        ref={trigger}
        type="button"
        className="admin-menu-trigger"
        aria-haspopup="dialog"
        aria-controls="admin-menu"
        onClick={() => drawer.current?.showModal()}
      >
        <span className="admin-menu-icon" aria-hidden="true" />菜单
      </button>
      <dialog
        ref={drawer}
        id="admin-menu"
        className="admin-menu-drawer"
        aria-labelledby="admin-menu-title"
        onClose={() => trigger.current?.focus({ preventScroll: true })}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right) closeMenu();
        }}
      >
        <header className="admin-menu-header">
          <h2 id="admin-menu-title">后台菜单</h2>
          <button type="button" className="admin-menu-close" onClick={closeMenu}>关闭</button>
        </header>
        <nav aria-label="后台导航">{workbench}</nav>
      </dialog>
    </>
  );
}
