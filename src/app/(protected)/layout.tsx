"use client";
import type React from "react";
import { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import { ModeToggle } from "@/components/darkMode";
import suratLogo from "../../images/Flux_Dev_Design_a_stunning_logo_for_an_online_marketplace___wh_1-removebg-preview.png";
import Image from "next/image";
import axios from "axios";
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

// Navigation items configuration
const navigationItems = [
  {
    path: "/",
    label: "home",
    icon: (
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
    ),
  },
  {
    path: "/product",
    label: "product",
    icon: (
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
    ),
  },
  {
    path: "/about",
    label: "about",
    icon: (
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
    ),
  },
  {
    path: "/contact",
    label: "contact",
    icon: (
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
    ),
  },
  {
    path: "/courses",
    label: "courses",
    icon: (
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
        className="lucide lucide-presentation-icon lucide-presentation"
      >
        <path d="M2 3h20" />
        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
        <path d="m7 21 5-5 5 5" />
      </svg>
    ),
  },
  {
    path: "/myproducts",
    label: "myProduct",
    icon: (
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
        className="lucide lucide-shopping-basket-icon lucide-shopping-basket"
      >
        <path d="m15 11-1 9" />
        <path d="m19 11-4-7" />
        <path d="M2 11h20" />
        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
        <path d="M4.5 15.5h15" />
        <path d="m5 11 4-7" />
        <path d="m9 11 1 9" />
      </svg>
    ),
  },
];

const actionItems = [
  {
    path: "/like",
    icon: (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-heart-icon lucide-heart w-6 h-6 text-[#E6B312]"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </span>
    ),
    activeColor: "text-[#E6B312]",
    hoverColor: "hover:text-[#E6B312]",
  },
  {
    path: "/cart",
    icon: (
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
        className="lucide lucide-shopping-cart w-6 h-6 text-[#27A49C]"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
    activeColor: "text-[#27A49C]",
    hoverColor: "hover:text-[#27A49C]",
  },
  {
    path: "/profile",
    label: "profile",
    icon: null,
    activeColor: "bg-gray-100 dark:bg-gray-800",
    hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
];

interface ProductCardProps {
  id: string;
  name: string;
  images: string[];
  ratting: string;
  originalPrice: number;
  newPrice: number;
  discount?: number;
  iduser: string;
  length: number;
  cart: any[]; // Changed from object to array
}

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const isActive = useCallback(
    (path: string) => {
      if (path === "/") {
        return pathname === path;
      }
      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname]
  );

  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("language") || "tj";
    const currentLang =
      languages.find((lang) => lang.code === savedLang) || languages[0];
    i18n.changeLanguage(savedLang);
    setSelectedLang(currentLang);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router, i18n]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartCount(cartItems.length);
  }, [pathname]);

  async function getCartItems() {
    try {
      if (user && user.id) {
        const { data } = await axios.get(
          `http://localhost:5000/users/${user.id}/cart-saved`
        );
        console.log("User Data:", data);

        const userData = Array.isArray(data) ? data[0] : data;

        if (userData && Array.isArray(userData.cart)) {
          setCartItemsCount(userData.cart.length);
          console.log("Cart items count:", userData.cart.length);
        } else {
          console.log("Cart is not an array or doesn't exist:", userData.cart);
          setCartItemsCount(0);
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItemsCount(0);
    }
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string;
    age: number;
    imageUsers: string;
    id: string;
  };

  useEffect(() => {
    getCartItems();
  }, [pathname, user.id]);

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
          src={lang.flag || "/placeholder.svg"}
          alt={lang.label}
          width={24}
          height={16}
          className="mr-2"
        />
        {lang.label}
      </div>
    ),
  }));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-w-[320px] w-full">
      <header className="fixed top-0 w-full bg-[oldlace] dark:bg-black z-10 shadow-md">
        <div className="w-full p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-[100px] h-[60px]">
                <Image
                  alt="Logo"
                  src={suratLogo || "/placeholder.svg"}
                  className="object-contain absolute top-[-16px] left-[25px]"
                />
              </div>
              <h1>
                <span className="text-2xl md:text-3xl text-[#E6B312]">
                  Ҳунари
                </span>
                <span className="text-2xl md:text-3xl text-[#27A49C]">
                  {" "}
                  ман
                </span>
              </h1>
            </div>
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
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
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
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
                  className="lucide lucide-menu"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
            <div className="flex items-center border w-full md:w-[300px] pr-3 gap-2 bg-white border-[#E6B312] h-[46px] rounded-[5px] overflow-hidden">
              <input
                className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm"
                placeholder={t("searchForProducts")}
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

            <div className="flex justify-between items-center gap-2">
              <Select
                options={options}
                value={{
                  value: selectedLang.code,
                  label: options.find((opt) => opt.value === selectedLang.code)
                    ?.label,
                }}
                onChange={changeLanguage}
                className="w-40 dark:text-black z-20"
              />

              <div className="flex items-center gap-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>

        <nav
          className={`w-full transition-all duration-300 ${
            isMenuOpen ? "max-h-[500px]" : "max-h-0 md:max-h-[500px]"
          } md:block overflow-hidden`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-2 md:p-4">
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:gap-2">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={t(item.label)}
                  onClick={() => navigateTo(item.path)}
                  isActive={isActive(item.path)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 mt-4 md:mt-0">
              {actionItems.map((item, index) =>
                item.path !== "/profile" ? (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    className={`flex items-center gap-1 transition-colors relative ${
                      item.hoverColor
                    } ${isActive(item.path) ? item.activeColor : ""}`}
                  >
                    {item.icon}
                    {item.path === "/cart" && (
                      <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                      item.hoverColor
                    } ${isActive(item.path) ? item.activeColor : ""}`}
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      {user.imageUsers ? (
                        <Image
                          alt="User"
                          fill
                          src={user.imageUsers || "/placeholder.svg"}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="hidden md:inline text-sm font-medium truncate max-w-[100px]">
                      {user.name || t("profile")}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="mt-[200px] md:mt-[180px] min-h-screen bg-[oldlace] dark:bg-black px-4">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  onClick,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-3 rounded-md transition-all text-left
        ${
          isActive
            ? "bg-[#E6B31220] dark:bg-[#27A49C20] text-[#E6B312] dark:text-[#27A49C] font-medium"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
    >
      <span
        className={
          isActive
            ? "text-[#E6B312] dark:text-[#27A49C]"
            : "text-gray-700 dark:text-gray-300"
        }
      >
        {icon}
      </span>
      <span className="text-base">{label}</span>
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E6B312] dark:bg-[#27A49C]"></span>
      )}
    </button>
  );
};

export default ClientLayout;
