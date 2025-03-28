"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Info, ShoppingCart, Star, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import Like from "../(home)/like"
import axios from "axios"
import { useTranslation } from "react-i18next"

interface ProductProps {
  id: string
  name: string
  images: string[]
  ratting: string
  originalPrice: number
  newPrice: number
  discount?: number
  iduser: string
  about?: string
  category?: string
}

interface Seller {
  email: string
  id: string | number
  imageUsers: string
  name: string
}

const CardWishlist = ({ product }: { product: ProductProps }) => {
  const [seller, setSeller] = useState<Seller | null>(null)
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string
    age: number
    imageUsers: string
    id: string | number
  }

  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  async function getUserById() {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${product.iduser}`)
      setSeller(data)
    } catch (error) {
      console.error("Error fetching seller:", error)
    }
  }

  async function addToCart() {
    try {
      const userResponse = await fetch(`http://localhost:5000/users/${user.id}/cart-saved`)
      if (!userResponse.ok) throw new Error("User not found")

      const userData = await userResponse.json()
      const updatedCart = [...userData.cart]

      const productIndex = updatedCart.findIndex((item) => item.idProduct === product.id)
      if (productIndex !== -1) {
        updatedCart[productIndex].cnt += 1
      } else {
        updatedCart.push({
          idProduct: product.id,
          id: String(Date.now()),
          cnt: 1,
        })
      }

      const response = await fetch(`http://localhost:5000/users/${user.id}/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      })

      if (!response.ok) {
        console.error("Error updating cart:", await response.text())
      }
    } catch (error) {
      console.error("Error updating cart", error)
    }
  }
  useEffect(() => {
    getUserById()
  }, [product.iduser])

  return (
    <div className="mb-12 bg-white dark:bg-[black] dark:shadow-[0px_0px_10px_grey] rounded-xl shadow-sm border overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 p-6">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-gray-100">
            <img
              src={product.images[currentImageIndex] || "/placeholder.svg?height=600&width=600&text=No+Image"}
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
                    currentImageIndex === index ? "border-primary" : "border-transparent hover:border-gray-300"
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
                    Number.parseFloat(product.ratting) >= star ? "text-amber-500 fill-amber-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.ratting}</span>
            <span className="text-sm text-muted-foreground">({Math.floor(Math.random() * 100) + 10} reviews)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">{product.newPrice.toFixed(2)}сом</span>
              {product.originalPrice > product.newPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toFixed(2)}сом
                </span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{product.about}</p>
          <div className="flex gap-4 mb-8">
            <Button className="flex gap-2 w-[200px]" onClick={addToCart}>
              <ShoppingCart className="h-5 w-5" />
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
                <p className="font-medium">{t("freeShipping", "Free Shipping")}</p>
                <p className="text-sm text-muted-foreground">{t("standard", "Standard delivery: 3-5 business days")}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Category: {product.category || "Uncategorized"}</p>
            <p>SKU: {product.id}</p>
          </div>

          {seller && (
            <div className="mt-12 border-t pt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={seller.imageUsers} alt={seller.name} />
                    <AvatarFallback>{seller.name?.charAt(0) || "S"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{seller.name}</h3>
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
                Member since 2023
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardWishlist

