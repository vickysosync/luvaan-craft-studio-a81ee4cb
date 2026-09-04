import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "LUVAAN Admin Portal — Sign In" },
      {
        name: "description",
        content: "Sign in to the LUVAAN admin portal to manage products, orders, cleaning bookings and site content.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Admin Portal" },
      { property: "og:description", content: "Mock admin sign-in for the LUVAAN frontend demo." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, notify } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (login(email, password)) {
      notify("Welcome back, admin.");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Incorrect email or password. Use the demo credentials below.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-5 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-[0.24em] text-primary-foreground"
          >
            LUVAAN
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-primary-foreground">
            LUVAAN Admin Portal
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/60">
            Mock authentication — frontend demo only.
          </p>
        </div>

        <form onSubmit={submit} className="card-luv mt-8 space-y-4 p-7">
          <div>
            <label className="label-luv" htmlFor="a-email">Email</label>
            <input
              id="a-email"
              type="email"
              required
              className="field"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="admin@luvaan.com"
            />
          </div>
          <div>
            <label className="label-luv" htmlFor="a-pass">Password</label>
            <input
              id="a-pass"
              type="password"
              required
              className="field"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full">Login</button>
          <div className="rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
            Demo credentials — <strong>admin@luvaan.com</strong> / <strong>admin123</strong>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-primary-foreground/50">
          <Link to="/" className="hover:text-accent">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
