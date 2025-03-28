"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Like from "./like";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    images: string[];
    ratting: string;
    originalPrice: number;
    newPrice: number;
    discount?: number;
    iduser: string;
  };
}
interface Saller{
  email:string
  id:string | number,
  imageUsers:string,
  name:string
}
export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let [saller, setSaller] = useState<Saller>();
  const user = JSON.parse(localStorage.getItem("user") || "{}") as {name: string; age: number;imageUsers:string,id:string |number };
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(
      (prev:any) => (prev - 1 + product.images.length) % product.images.length
    );
  };
 let router=useRouter()

  async function getByIdUser() {
    try {
      let { data } = await axios(
        `http://localhost:5000/users/${product.iduser}`
      );
      setSaller(data);
    } catch (error) {
      console.error(error);
      console.error(error);
    }
  }
  async function getUserforCart() {
    try {
      await axios.get(`http://localhost:5000/users/${user.id}/cart-saved`)
    } catch (error) {
      console.error(error);
      
    }
  }
  const toggleCart = async () => {
    try {
      const userResponse = await fetch(`http://localhost:5000/users/${user.id}/cart-saved`);
      if (!userResponse.ok) throw new Error("User not found");

      const userData = await userResponse.json();
      console.log(userData);
      
      let updatedCart = [...userData.cart];

      let productIndex = updatedCart.findIndex(
        (item) => item.idProduct === product.id
      );
      if (productIndex !== -1) {
        updatedCart[productIndex].cnt += 1;
      } else {
        updatedCart.push({
          idProduct: product.id,
          id: String(Date.now()),
          cnt: 1,
        });
      }

      const response = await fetch(`http://localhost:5000/users/${user.id}/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      });

      if (response.ok) {
      getUserforCart()
      } else {
        console.error("Error updating cart:", await response.text());
      }
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };
  
  useEffect(() => {
    getByIdUser();
    getUserforCart()
  }, []);
  function gotoInfoPage() {
    router.push(`/product/${product.id}`)
    localStorage.setItem("iduser",product.iduser)
  }
  return (
    <Card className="w-full max-w-sm overflow-hidden group h-[450px]">
      <div className="relative aspect-square overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={product.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${product.name} - image ${currentImageIndex + 1}`}
            className="object-cover transition-transform duration-300 group-hover:scale-105 w-[90%] m-auto h-[250px]"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between p-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "block h-1.5 w-1.5 rounded-full transition-all",
                  currentImageIndex === index ? "bg-primary w-3" : "bg-white/70"
                )}
              />
            ))}
          </div>
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              -{product.discount}%
            </Badge>
          )}
          <Like elem={product} />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">
              {product.ratting ? product.ratting : "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-primary">
            {product.newPrice ? product.newPrice.toFixed(2) : "N/A"} сом
          </span>
          {product.originalPrice > product.newPrice &&
            product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toFixed(2)} сом
              </span>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-6 w-6">
            <AvatarImage src={saller?.imageUsers} alt={""} />
            <AvatarFallback>{""}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500">{saller?.name}</span>
        </div>
        <div className="flex gap-[10px]">
          <span onClick={gotoInfoPage} className="cursor-pointer">
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
              className="lucide lucide-eye"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <span onClick={toggleCart} className="cursor-pointer">
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
              className="lucide lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
