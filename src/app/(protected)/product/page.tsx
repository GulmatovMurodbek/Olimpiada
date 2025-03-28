"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { Filter, Search, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ProductCard from "../(home)/cardProduct"

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 150])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [totalPages, setTotalPages] = useState(1)

  async function getCategory() {
    try {
      const { data } = await axios.get("http://localhost:5000/category")
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function getProduct() {
    try {
      const { data } = await axios.get("http://localhost:5000/products")
      setProducts(data)
      applyFilters(data)
    } catch (error) {
      console.error(error)
    }
  }

  const applyFilters = (productsData = products) => {
    let result = [...productsData]

    if (activeCategory !== "all") {
      result = result.filter((product: any) => product.category === activeCategory)
    }

    result = result.filter((product: any) => {
      const price = product.price || 0
      return price >= priceRange[0] && price <= priceRange[1]
    })

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product: any) =>
          product.name?.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query),
      )
    }

    setFilteredProducts(result)
    setTotalPages(Math.ceil(result.length / itemsPerPage))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: document.getElementById("products-section")?.offsetTop || 0,
      behavior: "smooth",
    })
  }

  // Get current page products
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }

  useEffect(() => {
    getCategory()
    getProduct()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [activeCategory, priceRange, searchQuery])

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <>
      <div className="relative h-80 bg-gradient-to-r from-primary/90 to-purple-600/90 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Pattern')] opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("discoverHand")}</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">{t("explore")}</p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder={t("searchplaceholder")}
              className="pl-12 h-12 text-base bg-white/95 backdrop-blur-sm border-0 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div id="products-section" className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide mb-8">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category: any) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.name ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mb-8 p-[10px]">
          <h2 className="text-2xl font-bold">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
          </h2>

          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-8">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={150}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="border rounded-md px-2 py-1 w-20">
                        <span className="text-sm">${priceRange[0]}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">to</span>
                      <div className="border rounded-md px-2 py-1 w-20">
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category: any) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={activeCategory === category.id}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setActiveCategory(category.id)
                              setFiltersOpen(false)
                            } else if (activeCategory === category.id) {
                              setActiveCategory("all")
                            }
                          }}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Customer Ratings</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center cursor-pointer"
                        >
                          {Array(rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                            ))}
                          {Array(5 - rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                          <span className="ml-1">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <Button className="w-full" onClick={() => setFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {getCurrentPageProducts().map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageToShow

              if (totalPages <= 5) {
                pageToShow = i + 1
              } else if (currentPage <= 3) {
                pageToShow = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i
              } else {
                pageToShow = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageToShow}
                  variant={currentPage === pageToShow ? "default" : "outline"}
                  size="icon"
                  className="w-10 h-10"
                  onClick={() => setCurrentPage(pageToShow)}
                >
                  {pageToShow}
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="flex justify-end items-center mt-4">
          <span className="text-sm text-muted-foreground mr-2">Items per page:</span>
          <select
            className="text-sm border rounded-md px-2 py-1"
            value={itemsPerPage}
            onChange={(e) => {
              const newItemsPerPage = Number.parseInt(e.target.value)
              setItemsPerPage(newItemsPerPage)
              setTotalPages(Math.ceil(filteredProducts.length / newItemsPerPage))
              setCurrentPage(1)
            }}
          >
            {[8, 12, 16, 24].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default Product

