// SignUp.tsx
import React, { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "@/pages/Auth/SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/"); // Redirect to home page after successful sign-up
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password (min 6 characters)</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Create a password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="redirect-message">
          Already have an account?{" "}
          <Link to="/sign-in" className="redirect-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}