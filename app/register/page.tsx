"use client";

import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import UserApi from "../api/UserApi";
import { useUser } from "../context/UserContext";

//TODO: handle errors and improve styles

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserId } = useUser();
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await UserApi.create({
        name: email.split("@")[0],
        email,
        password,
      });

      setUserId(user.id);

      router.push(`/verify-email/${email}`);
    } catch (error) {
      console.error(`Error creating user and sending email: ${error}`);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="space-y-6 sm:space-y-8 flex flex-col justify-center"
        onSubmit={handleRegister}
      >
        <h2>Register</h2>

        <label className="input input-bordered flex items-center gap-2">
          <MdEmail className="text-white" />
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey className="text-white" />
          <input
            type="password"
            className="grow"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <input type="submit" value="Entrar" className="btn" />
        <p className="text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="link">
            Faça login
          </a>
        </p>
      </form>
    </div>
  );
}