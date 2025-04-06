"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useRouter } from "next/navigation";
let register = () => {
  let [name, setName] = useState("");
  let [password, setpassword] = useState("");
  let [email, setEmail] = useState("");
  let { t, i18n } = useTranslation();
  let router=useRouter()
  let handleRegister = async (event: any) => {
    event.preventDefault();
    
    
    let name = (document.getElementById("name") as HTMLInputElement)?.value;
    let email = (document.getElementById("email") as HTMLInputElement)?.value;
    let password = (document.getElementById("password") as HTMLInputElement)?.value;
    let fileInput = document.getElementById("image") as HTMLInputElement;
    let file = fileInput?.files?.[0];
  
    if (!file) {
      alert("Лутфан тасвирро интихоб кунед!");
      return;
    }
  
    let reader = new FileReader();
  
    reader.onloadend = () => {
      let img = new Image();
      img.src = reader.result as string;
  
      img.onload = async () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
  
        let maxWidth = 800;
        let maxHeight = 800;
        let width = img.width;
        let height = img.height;
  
        if (width > maxWidth || height > maxHeight) {
          let ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
  
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
  
        let base64Image = canvas.toDataURL("image/jpeg", 0.8); 
  
        
        let newUser = {
          name,
          email,
          password,
          imageUsers: base64Image,
        };
  
        try {
          let response = await axios.post("http://localhost:5000/register", newUser);
          
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user))
            router.push("/"); 
          } else {
            alert("Сабти ном ноком шуд!");
          }
        } catch (error: any) {
          console.error("Хатогӣ ҳангоми сабти ном:", error.response?.data || error.message);
          alert(error.response?.data?.error || "Хатогӣ ҳангоми сабти ном!");
        }
      };
    };
  
    reader.readAsDataURL(file);
  };
  return (
    <div className="  w-[100%] p-[10px]">
      <div
        className="max-w-md mx-auto mt-[90px] relative overflow-hidden z-10 bg-[#EBEDEB] p-8 rounded-lg shadow-md 
                before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl 
                after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        <h2 className="text-2xl font-bold text-[black] mb-6">{t("register")}</h2>
        <form onSubmit={handleRegister} action="#">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[black]"
              htmlFor="name"
            >
              {t("fullName")}
            </label>
            <input
              className="mt-1 p-2 w-full bg-[#EBEDEB] border border-gray-600 rounded-md text-[black]"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[black]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-1 p-2 w-full bg-[#EBEDEB] border border-gray-600 rounded-md text-[black]"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[black]"
              htmlFor="email"
            >
              {t("passworld")}
            </label>
            <input
              className="mt-1 p-2 w-full bg-[#EBEDEB] border border-gray-600 rounded-md text-[black]"
              type="password"
              name="email"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="mb-4"></div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture" className="text-[black]">{t("picture")}</Label>
            <Input id="image" type="file" />
          </div>
          <div className="flex justify-between mt-[20px]">
            <button
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              type="button"
              onClick={()=>router.push("/login")}
            >
              {t("accoutHave")}
            </button>
            <button
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              type="submit"
            >
              {t("go")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default register;