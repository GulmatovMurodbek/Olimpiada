"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Clock,
  Gift,
  Heart,
  Info,
  ShoppingCart,
  ShoppingCartIcon,
  Star,
  Truck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Like from "../(home)/like";
import { Separator } from "@radix-ui/react-separator";
import CardWishlist from "./cardWishlist";
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
}
interface Saller {
  email: string;
  id: string | number;
  imageUsers: string;
  name: string;
}
const Likepage = () => {
  const { t } = useTranslation();
  let [products, setProducts] = useState<ProductCardProps []>();

  const user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string;
    age: number;
    imageUsers: string;
    id: string | number;
  };

  async function getProductByidForWishlist() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/users/${user.id}/saved-products`
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProductByidForWishlist();
  }, []);
  return (
    <div className="mt-[40px]">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-purple-100 py-16 z-0 ">
        <div className="absolute inset-0 bg-[url('https://cdn.leonardo.ai/users/8fc1fdc7-37b8-4954-a6c3-d68ad73ba76a/generations/395032ef-6871-44bb-80e1-672ce6231599/segments/4:4:1/Flux_Dev_Design_a_visually_stunning_background_for_the_homepag_3.jpeg?w=512')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-1 bg-white/80 backdrop-blur-sm rounded-full mb-6">
              <span className="px-4 py-1.5 text-sm font-medium text-primary">
                {t("yourCurated")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t("yourwishlist")}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {t("discoverthe")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="font-medium">
                <ShoppingCartIcon className="mr-2 h-5 w-5" />
                {t("addAlltoCart")}
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                {t("continueShipping")}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute -top-10 right-20 w-32 h-32 bg-purple-300/30 rounded-full blur-xl"></div>
      </div>
      <div className="border-b bg-white dark:bg-[black]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {products?.length} {t("savedItems")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{t("updated")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {products?.length} Items on Sale
              </span>
            </div>
          </div>
        </div>
      </div> 
        <div className="container mx-auto px-4 py-8">
        {
          products?.map((product:any,index:any)=>
          {
            return <CardWishlist key={index} product={product}/>
          })
        }
      </div>
    </div>
  );
};

export default Likepage;
