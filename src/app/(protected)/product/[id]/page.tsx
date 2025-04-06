"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductCard from "../../(home)/cardProduct";
import Like from "../../(home)/like";
import { Skeconston } from "@/components/ui/skeleton";
interface ProductDetails {
  id: string;
  name: string;
  images: string[];
  ratting: string;
  originalPrice: number;
  newPrice: number;
  discount?: number;
  iduser: string;
  about?: string;
  seller?: {
    name: string;
    avatar: string;
  };
  stock?: number;
  category?: string;
}
interface Saller {
  email: string;
  id: string | number;
  imageUsers: string;
  name: string;
}
let ProductInfo = () => {
  let iduser = localStorage.getItem("iduser");
  let user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string;
    age: number;
    imageUsers: string;
    id: string | number;
  };
  let { id } = useParams();
  let { t } = useTranslation();
  let [product, setProduct] = useState<ProductDetails | null>(null);
  let [loading, setLoading] = useState(true);
  let [saller, setSaller] = useState<Saller>();
  let [error, setError] = useState<string | null>(null);
  let [currentImageIndex, setCurrentImageIndex] = useState(0);
  let [dataUser, setDataUser] = useState([]);
  async function getProductById() {
    try {
      setLoading(true);
      let { data } = await axios.get(`http://localhost:5000/product/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load product information. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  async function getUserById() {
    try {
      let { data } = await axios.get(`http://localhost:5000/users/${iduser}`);
      setSaller(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getProductsByIdUser() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/product/users/${iduser}`
      );
      setDataUser(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getUserforCart() {
    try {
      await axios.get(`http://localhost:5000/users/${user.id}/cart-saved`);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProductById();
    getUserById();
    getProductsByIdUser();
    getUserforCart();
  }, [id]);

  let nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };
  let prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeconston className="aspect-square w-full rounded-xl" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeconston key={i} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Skeconston className="h-10 w-3/4 mb-4" />
            <Skeconston className="h-6 w-1/4 mb-6" />
            <Skeconston className="h-8 w-1/3 mb-2" />
            <Skeconston className="h-24 w-full mb-6" />
            <div className="flex gap-4 mb-6">
              <Skeconston className="h-12 w-1/2" />
              <Skeconston className="h-12 w-1/2" />
            </div>
            <Skeconston className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Product
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-amber-50 p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-700 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  let toggleCart = async () => {
    try {
      let userResponse = await fetch(
        `http://localhost:5000/users/${user.id}/cart-saved`
      );
      if (!userResponse.ok) throw new Error("User not found");

      let userData = await userResponse.json();
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

      let response = await fetch(
        `http://localhost:5000/users/${user.id}/cart`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: updatedCart }),
        }
      );

      if (response.ok) {
        getUserforCart();
      } else {
        console.error("Error updating cart:", await response.text());
      }
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-gray-100">
            <img
              src={
                product.images[currentImageIndex] ||
                "/placeholder.svg?height=600&width=600&text=No+Image"
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    Number.parseFloat(product.ratting) >= star
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.ratting}</span>
            <span className="text-sm text-muted-foreground">
              ({Math.floor(Math.random() * 100) + 10} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {product.newPrice.toFixed(2)}сом
              </span>
              {product.originalPrice > product.newPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toFixed(2)}сом
                </span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{product.about}</p>
          <div className="flex gap-4 mb-8">
            <Button onClick={toggleCart} className="flex gap-2 w-[200px]" >
              <ShoppingCart className="h-5 w-5 " />
              Add to Cart
            </Button>
              <div className="relative top-[-8px] left-7">
                <Like elem={product} />
              </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="flex gap-3">
              <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{t("freeShipping")}</p>
                <p className="text-sm text-muted-foreground">{t("standard")}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Category: {product.category || "Uncategorized"}</p>
            <p>SKU: {product.id}</p>
          </div>
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={saller?.imageUsers} alt={saller?.name} />
                  <AvatarFallback>{saller?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{saller?.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span>4</span>
                    <span className="text-muted-foreground"></span>
                    <span className="mx-1">•</span>
                    <span className="text-muted-foreground"></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Visit Shop
                </Button>
                <Button variant="outline" size="sm">
                  Contact
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <Info className="h-3 w-3 inline mr-1" />
              Member since
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">This saller products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dataUser?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
