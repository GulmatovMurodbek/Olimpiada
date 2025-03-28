"use client";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
export default function Home() {
  const { t, i18n } = useTranslation();
 let router=useRouter()
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleLogin = async (event:any) => {
   event.preventDefault();
   try {
     const response = await axios.post("http://localhost:5000/login", {
       email,
       password,
     });
     localStorage.setItem("token", response.data.token);
     localStorage.setItem("user", JSON.stringify(response.data.user));
     router.push("/")
   } catch (error:any) {
    console.error("Login Error:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Хатогӣ рух дод!");
  }
 };
  return (
    <div className=" h-screen">
      <div className="max-w-md mx-auto mt-[100px] relative overflow-hidden z-10 bg-[#EBEDEB] p-8 rounded-lg shadow-md 
                before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl 
                after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
      <h2 className="text-2xl font-bold text-[black] mb-6">{t("login")}</h2>
      <form method="post" action="#" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[black]" htmlFor="name">
            {t("fullName")}
          </label>
          <input
            className="mt-1 p-2 w-full bg-[#EBEDEB] border border-gray-600 rounded-md text-[black]"
            type="email"
            name="name"
            id="name"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[black]" htmlFor="password">
            {t("passworld")}
          </label>
          <input
            className="mt-1 p-2 w-full bg-[#EBEDEB] border border-gray-600 rounded-md text-[black]"
            type="password"
            name="password"
            id="email"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            type="button"
            onClick={()=>router.push("/register")}
          >
            {t("accout")}
          </button>
          <button
            className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            type="submit">
            {t("go")}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
