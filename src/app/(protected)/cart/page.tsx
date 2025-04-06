"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Trash2, ShoppingBag, Minus, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Define the product type based on the information provided
interface Product {
  id: string | number
  name: string
  rating: number
  iduser: string | number
  images: string[]
  originalPrice: number
  newPrice: number
  about: string
  minOrder: number
  category: string
  quantity: number,
  cnt:number | string
}

interface User {
  name: string
  age: number
  imageUsers: string
  id: string | number
}

const CartPage = () => {
  // Get user from localStorage
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (err) {
      console.error("Error parsing user data:", err)
    }
  }, [])

  async function getProductsCart() {
    if (!user?.id) return

    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.get(`http://localhost:5000/users/${user.id}/cart-products`)
      setProducts(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load cart products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) {
      getProductsCart()
    }
  }, [user])

  const subtotal = products.reduce((sum, product) => sum + product.newPrice * product?.cnt, 0)
  const shipping = subtotal > 0 ? 10 : 0 
  const tax = subtotal * 0.08 
  const total = subtotal + shipping + tax

  
  const refreshCart = () => {
    getProductsCart()
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Please log in to view your cart</h2>
        <p className="text-muted-foreground mb-8">You need to be logged in to access your shopping cart.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button variant="outline" onClick={refreshCart}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={refreshCart}>Try Again</Button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button size="lg">Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Cart Items ({products.reduce((acc:any, item:any) => acc + item.cnt, 0)})
                </h2>

                {products.map((product, index) => (
                  <div key={product.id}>
                    <div className="flex flex-col sm:flex-row gap-4 py-4">
                      <div className="flex-shrink-0">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=120&width=120"}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-wrap justify-between">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center">
                            <span className="font-medium text-lg">${product.newPrice.toFixed(2)}</span>
                            {product.originalPrice > product.newPrice && (
                              <span className="text-muted-foreground line-through ml-2">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline">{product.category}</Badge>
                          <div className="flex items-center text-amber-500">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                            <span className="text-muted-foreground ml-1 text-xs">({product.rating})</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.about}</p>

                        <div className="mt-4 flex flex-wrap gap-4 items-center justify-between">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                            
                              disabled={product.quantity <= product.minOrder}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={product.cnt}
                              // onChange={(e) => {
                              //   const value = Number.parseInt(e.target.value)
                              //   if (!isNaN(value) && value >= product.minOrder) {
                              //     updateQuantity(product.id, value)
                              //   }
                              // }}
                              min={product.minOrder}
                              className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              // onClick={() => updateQuantity(product.id, product.cnt + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price and remove button */}
                          <div className="flex items-center gap-4">
                            <span className="font-medium">${(product.newPrice * product?.cnt).toFixed(2)}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              // onClick={() => removeItem(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Separator between items */}
                    {index < products.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order summary - takes up 1/3 of the space on desktop */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {/* Order details */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-2">
                      <Input placeholder="Promo code" className="flex-1" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>

                  <Button className="w-full mt-4" size="lg">
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage

