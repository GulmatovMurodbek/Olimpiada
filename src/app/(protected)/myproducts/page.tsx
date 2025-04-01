"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import {
  Badge,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
interface Products {
  id: string;
  name: string;
  images: string[];
  ratting: string;
  originalPrice?: number;
  newPrice?: number;
  iduser: string;
}
const Myproduct = () => {
  let { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [name, setName] = useState("");
  const [images, setImageFiles] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [about, setAbout] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [currentImageIndices, setCurrentImageIndices] = useState<{
    [key: string]: number;
  }>({});
  const user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string;
    age: number;
    imageUsers: string;
    id: string | number;
  };
  async function getProductsByIdUser() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/product/users/${user.id}`
      );
      setProducts(data);
      const initialIndices = data.reduce((acc: any, product: any) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setCurrentImageIndices(initialIndices);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProductsByIdUser();
  }, []);
  const nextImage = (productId: string, imageCount: number) => {
    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [productId]: (prevIndices[productId] + 1) % imageCount,
    }));
  };
  const prevImage = (productId: string, imageCount: number) => {
    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [productId]: (prevIndices[productId] - 1 + imageCount) % imageCount,
    }));
  };
  const handleImageChange = (e:any) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file:any) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });
    Promise.all(promises).then((base64Images:any) => setImageFiles(base64Images));
  };
  const handleAddProduct = async () => {
    try {
      if (!name || !originalPrice || !category) {
        alert("Ҳамаи майдонҳои лозимӣ бояд пур карда шаванд!");
        return;
      }
  
      const newProduct = {
        name,
        images,
        originalPrice: Number(originalPrice),
        newPrice: newPrice ? Number(newPrice) : null,
        about,
        minOrder: minOrder ? Number(minOrder) : null,
        size,
        weight,
        category,
        iduser: user.id, 
      };
  
      const response = await axios.post("http://localhost:5000/product", newProduct);
      console.log("Маҳсулот бо муваффақият илова шуд:", response.data)
      setIsDialogOpen(false);
      getProductsByIdUser();
  
    } catch (error) {
      console.error("Хатогӣ ҳангоми иловаи маҳсулот:", error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("mycraftProducts")}
            </h1>
            <p className="text-muted-foreground mt-1">{t("manageYour")}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("addNewCraft")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Маҳсулоти нав илова кунед</DialogTitle>
              </DialogHeader>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ном"
              />
              <Input type="file" multiple onChange={handleImageChange} />
              <Input
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Нархи аслӣ"
                type="number"
              />
              <Input
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Нархи нав"
                type="number"
              />
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Тавсифи маҳсулот"
              />
              <Input
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder="Ҳадди ақали фармоиш"
              />
              <Input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Андозаҳо (бо вергул ҷудо кунед)"
              />
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Вазн (бо вергул ҷудо кунед)"
              />
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Категория"
              />
              <Button onClick={handleAddProduct} >Илова кардан</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products && products.length > 0
            ? products.map((product: any) => (
                <Card
                  key={product.id}
                  className="w-full max-w-md overflow-hidden border-0 shadow-lg rounded-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[currentImageIndices[product.id] || 0]
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                    />

                    <div className="absolute top-4 right-4 z-0 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>{product.ratting}</span>
                    </div>

                    {product.images && product.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
                          onClick={() =>
                            prevImage(product.id, product.images.length)
                          }
                        >
                          <ChevronLeft className="h-5 w-5" />
                          <span className="sr-only">Previous image</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
                          onClick={() =>
                            nextImage(product.id, product.images.length)
                          }
                        >
                          <ChevronRight className="h-5 w-5" />
                          <span className="sr-only">Next image</span>
                        </Button>
                      </>
                    )}
                  </div>

                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {product.about}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2">
                        {product.newPrice ? (
                          <>
                            <span className="text-xl font-bold text-red-500">
                              ${product.newPrice.toFixed(2)}
                            </span>
                            <span className="text-sm line-through text-gray-500">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">
                            ${product?.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <div>
                    <Button variant="destructive" className="ml-[20px]">
                      {t("delete")}
                    </Button>
                  </div>
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default Myproduct;
