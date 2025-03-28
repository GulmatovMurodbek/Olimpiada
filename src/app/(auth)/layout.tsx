"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import "./stylesAuth/style.css";
import suratLogo from "../../images/Flux_Dev_Design_a_stunning_logo_for_an_online_marketplace___wh_1-removebg-preview.png";
import Image from "next/image";

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
  const { i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

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
    <div className="p-4 flex flex-col divAll">
      <div className="flex items-center justify-between">
        <div className="flex items-center p-[0px] relative left-[50px]">
          <Image alt="Logo" width={0} height={0} src={suratLogo} className="w-[100px] absolute right-[130px] " />
          <h1>
            <span className="text-[30px] text-[#E6B312]">Ҳунари</span>
            <span className="text-[30px] text-[#27A49C]"> ман</span>
          </h1>
        </div>
        <Select
          options={options}
          value={{
            value: selectedLang.code,
            label: options.find((opt) => opt.value === selectedLang.code)
              ?.label,
          }}
          onChange={changeLanguage}
          className="w-40"
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
