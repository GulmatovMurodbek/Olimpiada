"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./home.css";
import axios from "axios";
import CategoryCard from "./category";
import {
  MessageCircle,
  Search,
  ShoppingBag,
  Truck,
  User,
  Zap,
} from "lucide-react";
import ProductCard from "./cardProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

let Home = () => {
  let router = useRouter();
  let [category, setCategory] = useState([]);
  let [products, setProduct] = useState([]);

  let token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let { t } = useTranslation();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
  async function getCategory() {
    try {
      let { data } = await axios.get("http://localhost:5000/category");
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getProduct() {
    try {
      let { data } = await axios.get("http://localhost:5000/products");
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCategory();
    getProduct();
  }, []);
  let getRandomProducts = (products: any[] | undefined, count: number) => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    
    let shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  console.log(products);
  
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row p-5 items-center justify-center gap-[50px] mt-[20px]  dark:bg-[black] divAll2">
        <div className="w-[90%] lg:w-[30%]">
          <h1 className="text-4xl font-sans">{t("homePageHeaderWorld")}</h1>
          <div className="flex mt-[40px] gap-4">
            <button onClick={()=>router.push("./product")} className="w-[150px] h-[50px] text-[20px] bg-[#E6B312] text-[white] rounded-[10px]">
              {t("products")}
            </button>
            <button onClick={()=>router.push("/about")} className="w-[150px] h-[50px] text-[20px] bg-[#27A49C] text-[white] rounded-[10px] ">
              {t("about")}
            </button>
          </div>
        </div>
        <div className="w-[90%] lg:w-[40%] h-[500px] divRight rounded-2xl shadow-[0px_0px_10px_grey]"></div>
      </div>
      <section className="py-12 bg-gray-50 dark:bg-[black]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {t("bayByCategory")}
            </h2>
            <p className="text-muted-foreground max-w-2xl">{t("colections")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {category.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-10 text-amber-900">
          {t("whySellWithUs")}
        </h3>
        <div className=" flex flex-col lg:flex-row  gap-[20px] ">
          <div className="bg-white dark:bg-[black] p-6 rounded-xl shadow-sm border border-amber-100 text-center w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="text-lg font-semibold mb-2 text-amber-900">
              {t("castomersget")}
            </h4>
            <p className="text-amber-800/70">{t("connectcostemers")}</p>
          </div>
          <div className="bg-white dark:bg-[black] p-6 rounded-xl shadow-sm border border-amber-100 text-center w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-lg font-semibold mb-2 text-amber-900">
              {t("firePricing")}
            </h4>
            <p className="text-amber-800/70">{t("setYour")}</p>
          </div>
          <div className="bg-white dark:bg-[black] p-6 rounded-xl shadow-sm border border-amber-100 text-center w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <div className="text-4xl mb-4">🛒</div>
            <h4 className="text-lg font-semibold mb-2 text-amber-900">
              {t("easySelling")}
            </h4>
            <p className="text-amber-800/70">{t("simpconstools")}</p>
          </div>
          <div className="bg-white dark:bg-[black] p-6 rounded-xl shadow-sm border border-amber-100 text-center w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <div className="text-4xl mb-4">💬</div>
            <h4 className="text-lg font-semibold mb-2 text-amber-900">
              {t("directComunications")}
            </h4>
            <p className="text-amber-800/70">{t("relationship")}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row p-5 items-center justify-center gap-[50px] mt-[20px] bg-[oldlace] dark:bg-[black] divAll2">
        <div className="w-[100%] lg:w-[40%]  h-[500px] divRight2 rounded-2xl shadow-[0px_0px_10px_grey]"></div>
        <div className="w-[100%] lg:w-[30%]">
          <h1 className="text-4xl font-sans">{t("everyCraft")}</h1>
          <div className="flex mt-[40px] gap-4">
            <button onClick={()=>router.push("/product")} className="w-[150px] h-[50px] text-[20px] bg-[#E6B312] text-[white] rounded-[10px]">
              {t("products")}
            </button>
            <button onClick={()=>router.push("/about")} className="w-[150px] h-[50px] text-[20px] bg-[#27A49C] text-[white] rounded-[10px] ">
              {t("about")}
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getRandomProducts(products, 6).map((product: any) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{t("succes")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("hear")}
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div
              className={
                "bg-white rounded-xl p-6 border shadow-sm w-full md:w-[calc(50%-0.75rem)]"
              }
            >
              <div className="flex flex-col h-full">
                <svg
                  className="h-8 w-8 text-primary/30 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <p className="text-muted-foreground mb-6 flex-1">
                  {t("Istarted")}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={
                      "https://i.pinimg.com/736x/bf/7b/62/bf7b62a681864667295af4d604b6a028.jpg"
                    }
                    alt={""}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{"Mahliyo"}</h4>
                    <p className="text-sm text-muted-foreground">Saller</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "bg-white rounded-xl p-6 border shadow-sm w-full md:w-[calc(50%-0.75rem)]"
              }
            >
              <div className="flex flex-col h-full">
                <svg
                  className="h-8 w-8 text-primary/30 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <p className="text-muted-foreground mb-6 flex-1">
                  {t("Istarted2")}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={
                      "https://64.media.tumblr.com/97f359279c286e46cbdb8a210bbfe145/3d8b2dd7ed83170a-eb/s1280x1920/64028251865f9abeb0f1d961161523aa46d10662.jpg"
                    }
                    alt={""}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">Aziza</h4>
                    <p className="text-sm text-muted-foreground">Saller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("ready")}</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {t("join")}
          </p>
          <Button onClick={()=>router.push("/myproducts")} size="lg" variant="secondary" className="font-medium">
            {t("todaySall")}
          </Button>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
              Questions & Answers
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{t("FQA")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("FindRespones")}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("HowDo")}</AccordionTrigger>
                <AccordionContent>{t("startingIsSimple")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("WhatFees")}</AccordionTrigger>
                <AccordionContent>{t("WeCharge")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("HowIsShipping")}</AccordionTrigger>
                <AccordionContent>{t("SellersAre")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t("WhatByers")}</AccordionTrigger>
                <AccordionContent>{t("WeOffer")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>{t("getFeat")}</AccordionTrigger>
                <AccordionContent>{t("Weregulary")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-[black]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
              {t("simpleProcces")}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{t("howItWorks")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("whether")}
            </p>
          </div>

          <Tabs defaultValue="sellers" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="sellers"> {t("forSellers")} </TabsTrigger>
              <TabsTrigger value="buyers"> {t("forBayers")} </TabsTrigger>
            </TabsList>

            <TabsContent value="sellers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-[black] p-6 rounded-xl border shadow-sm relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("createYourShop")}
                  </h3>
                  <p className="text-muted-foreground">{t("signUp")}</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100  flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("freeRegister")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("customizable")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("BrandStory")}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-[black] p-6 rounded-xl border shadow-sm relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("lostYourProducts")}
                  </h3>
                  <p className="text-muted-foreground">{t("upload")}</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        {" "}
                        {t("BulkUploadOptions")}{" "}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("inventory")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("flexible")}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-[black] p-6 rounded-xl border shadow-sm relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("growYourBusiness")}
                  </h3>
                  <p className="text-muted-foreground">{t("Receiveorders")}</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("Analyst")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("marketingTools")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("Secure")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Button onClick={()=>router.push("/myproducts")} size="lg" className="font-medium">
                  {t("today")}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="buyers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl border shadow-sm relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("discoverContent")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("browse")}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("filters")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        {t("personalized")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("curated")}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("connect")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("comunicate")}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("direct")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("direct")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("artisan")}</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("shopWithConfidence")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("enjoySecure")}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("securePayment")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t("orderTracking")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        {t("bayersprotections")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Button onClick={()=>router.push("/products")} size="lg" variant="outline" className="font-medium">
                  {t("startShoping")}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Home;
