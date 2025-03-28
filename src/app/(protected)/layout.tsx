"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import Select from "react-select";
import suratLogo from "../../images/Flux_Dev_Design_a_stunning_logo_for_an_online_marketplace___wh_1-removebg-preview.png";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/darkMode";
const languages = [
  {
    code: "tj",
    label: "Тоҷикӣ",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/1280px-Flag_of_Tajikistan.svg.png",
  },
  {
    code: "ru",
    label: "Русский",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png",
  },
  {
    code: "en",
    label: "English",
    flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  },
];
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const token = localStorage.getItem("token");
  let router = useRouter();
  if (!token) {
    router.push("/");
  }
  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("language") || "tj";
    const currentLang =
      languages.find((lang) => lang.code === savedLang) || languages[0];
    i18n.changeLanguage(savedLang);
    setSelectedLang(currentLang);
  }, []);

  if (!isMounted) return null;
  const changeLanguage = (selectedOption: any) => {
    i18n.changeLanguage(selectedOption.value);
    localStorage.setItem("language", selectedOption.value);
    setSelectedLang(
      languages.find((lang) => lang.code === selectedOption.value) ||
        languages[0]
    );
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}") as { name: string; age: number;imageUsers:string };
  const options = languages.map((lang) => ({
    value: lang.code,
    label: (
      <div className="flex items-center">
        <img
          src={lang.flag}
          alt={lang.label}
          width={24}
          height={16}
          className="mr-2"
        />
        {lang.label}
      </div>
    ),
  }));
  return (
    <div className="w-[100%] ">
      <div className="fixed top-0 w-[100%] bg-[oldlace]  dark:bg-[black] z-10">
        <div className="w-[100%] p-[15px] flex justify-between">
          <div className="flex items-center p-[0px] relative left-[50px] ">
            <Image
              alt="Logo"
              width={0}
              height={0}
              src={suratLogo}
              className="w-[100px] absolute left-[-70px] "
            />
            <h1>
              <span className="text-[30px] text-[#E6B312]">Ҳунари</span>
              <span className="text-[30px] text-[#27A49C]"> ман</span>
            </h1>
          </div>
          <div className="flex items-center border w-120 pr-3 gap-2 bg-white border-[#E6B312] h-[46px] rounded-[5px] overflow-hidden">
            <input
              className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm "
              placeholder="Search for products"
              type="text"
            />
            <svg
              fill="#6B7280"
              viewBox="0 0 30 30"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
            <div className="h-6 w-px bg-gray-500/50"></div>
            <svg
              fill="#6B7280"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 32 32"
              width="20px"
            >
              <g fill="#6B7280">
                <path d="M111,314 C111,311.238 113.239,309 116,309 C118.761,309 121,311.238 121,314 L121,324 C121,326.762 118.761,329 116,329 C113.239,329 111,326.762 111,324 L111,314 L111,314 Z M116,331 C119.866,331 123,327.866 123,324 L123,314 C123,310.134 119.866,307 116,307 C112.134,307 109,310.134 109,314 L109,324 C109,327.866 112.134,331 116,331 L116,331 Z M127,326 L125,326 C124.089,330.007 120.282,333 116,333 C111.718,333 107.911,330.007 107,326 L105,326 C105.883,330.799 110.063,334.51 115,334.955 L115,337 L114,337 C113.448,337 113,337.448 113,338 C113,338.553 113.448,339 114,339 L118,339 C118.552,339 119,338.553 119,338 C119,337.448 118.552,337 118,337 L117,337 L117,334.955 C121.937,334.51 126.117,330.799 127,326 L127,326 Z" />
              </g>
            </svg>
          </div>
          <Select
            options={options}
            value={{
              value: selectedLang.code,
              label: options.find((opt) => opt.value === selectedLang.code)
                ?.label,
            }}
            onChange={changeLanguage}
            className="w-40 dark:text-[black] "
          />
        </div>
        <div className=" w-[100%] p-[15px]  flex items-center justify-between ">
          <div className=" w-[85%] flex">
            <h1
              onClick={() => router.push("/")}
              className="text-[18px] flex items-center gap-[5px]  cursor-pointer  p-[15px]"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-house"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <span>{t("home")}</span>
            </h1>
            <h1
              onClick={() => router.push("/product")}
              className="text-[18px] flex items-center gap-[5px] cursor-pointer   p-[15px]"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chart-no-axes-gantt"
                >
                  <path d="M8 6h10" />
                  <path d="M6 12h9" />
                  <path d="M11 18h7" />
                </svg>
              </span>
              <span> {t("product")} </span>
            </h1>
            <h1
              onClick={() => router.push("/chats")}
              className="text-[18px] flex items-center gap-[5px] cursor-pointer   p-[15px]"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <span> {t("masseges")}</span>
            </h1>
            <h1
              onClick={() => router.push("/about")}
              className="text-[18px] flex items-center gap-[5px] cursor-pointer   p-[15px]"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-store"
                >
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
                </svg>
              </span>
              <span> {t("about")}</span>
            </h1>
            <h1
              onClick={() => router.push("/contact")}
              className="text-[18px] flex items-center gap-[5px] cursor-pointer   p-[15px]"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-receipt-text"
                >
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                  <path d="M14 8H8" />
                  <path d="M16 12H8" />
                  <path d="M13 16H8" />
                </svg>
              </span>
              <span> {t("contact")}</span>
            </h1>
            <h1
              onClick={() => router.push("/myproducts")}
              className="text-[18px] flex items-center gap-[5px] cursor-pointer   p-[15px]"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-receipt-text"
                >
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                  <path d="M14 8H8" />
                  <path d="M16 12H8" />
                  <path d="M13 16H8" />
                </svg>
              </span>
              <span> {t("myProduct")}</span>
            </h1>
          </div>
          <div className="w-[30%] flex justify-center items-center gap-[10px]">
            <span
              onClick={() =>router.push("/like")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart w-[30px] h-[30px] text-[#E6B312]"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </span>
            <span
              onClick={() => router.push("/cart")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart w-[30px] h-[30px] text-[#27A49C]"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </span>
            <span
              onClick={() => router.push("/setting")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings w-[30px] h-[30px]"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <ModeToggle />
            <div
              onClick={() => router.push("/profile")}
              className="flex gap-[10px] items-center cursor-pointer"
            >
              <Image
                alt="Logo"
                width={0}
                height={0}
                src={user.imageUsers}
                className="w-[40px] rounded-full"
              />
              <h1 className="text-[20px]">{user.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[150px] bg-[oldlace] dark:bg-[black]">{children}</div>
    </div>
  );
};

export default Layout;
