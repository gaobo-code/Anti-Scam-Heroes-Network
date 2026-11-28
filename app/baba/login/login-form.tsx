"use client";

import { useActionState, useEffect, useRef } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, submit, pending] = useActionState(login, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const page = form?.closest<HTMLElement>(".admin-login");
    const viewport = window.visualViewport;
    if (!form || !page) return;

    const insetProperty = "--admin-keyboard-inset";
    let frame = 0;
    let keyboardCheck = 0;

    const adjustForKeyboard = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const field = document.activeElement;
        if (!(field instanceof HTMLInputElement) || !form.contains(field) || (viewport && viewport.scale !== 1)) {
          page.style.removeProperty(insetProperty);
          return;
        }

        const height = viewport?.height ?? window.innerHeight;
        const offsetTop = viewport?.offsetTop ?? 0;
        const inset = Math.max(0, document.documentElement.clientHeight - height);
        page.style.setProperty(insetProperty, `${inset}px`);

        const fieldBounds = field.getBoundingClientRect();
        const margin = 16;
        const visibleTop = offsetTop + margin;
        const visibleBottom = offsetTop + height - margin;
        if (fieldBounds.bottom > visibleBottom) {
          window.scrollBy({ top: fieldBounds.bottom - visibleBottom, behavior: "instant" });
        } else if (fieldBounds.top < visibleTop) {
          window.scrollBy({ top: fieldBounds.top - visibleTop, behavior: "instant" });
        }
      });
    };

    const onFocus = () => {
      adjustForKeyboard();
      window.clearTimeout(keyboardCheck);
      // Some mobile browsers update the viewport after the keyboard animation.
      keyboardCheck = window.setTimeout(adjustForKeyboard, 500);
    };

    window.addEventListener("resize", adjustForKeyboard);
    viewport?.addEventListener("resize", adjustForKeyboard);
    form.addEventListener("focusin", onFocus);
    form.addEventListener("focusout", adjustForKeyboard);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(keyboardCheck);
      window.removeEventListener("resize", adjustForKeyboard);
      viewport?.removeEventListener("resize", adjustForKeyboard);
      form.removeEventListener("focusin", onFocus);
      form.removeEventListener("focusout", adjustForKeyboard);
      page.style.removeProperty(insetProperty);
    };
  }, []);

  return (
    <form ref={formRef} className="admin-form" action={submit} autoComplete="off">
      <label>
        <span>账号</span>
        <input name="username" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={64} required />
      </label>
      <label>
        <span>密码</span>
        <input name="password" type="password" autoComplete="new-password" maxLength={256} required />
      </label>
      {state?.error && <p className="admin-error" role="alert">{state.error}</p>}
      <button className="admin-submit" disabled={pending}>{pending ? "正在登录…" : "登录"}</button>
    </form>
  );
}
