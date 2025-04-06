"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Camera, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductCard from "../(home)/cardProduct";
import { useTranslation } from "react-i18next";
interface Profile {
  email: string;
  id: string | number;
  imageUsers: string;
  name: string;
}
let Myprofile = () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string;
    age: number;
    imageUsers: string;
    id: string | number;
  };
  let [profile, setProfile] = useState<Profile>();
  let [dataUser, setDataUser] = useState([]);
  async function getMyProfile() {
    try {
      let { data } = await axios.get(`http://localhost:5000/users/${user.id}`);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getProductsByIdUser() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/product/users/${user.id}`
      );
      setDataUser(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getMyProfile();
    getProductsByIdUser();
  }, []);
  let { t } = useTranslation();
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">
              {t("myProfile")}
            </h1>
            <p className="text-gray-500 mt-2">{t("viewAndEdit")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-pink-400 to-purple-400">
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={profile?.imageUsers || "/placeholder.svg"}
                      alt={profile?.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white hover:bg-gray-50 text-pink-500 shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-20 pb-8 px-6 md:px-10">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile?.name}
                </h2>
                <p className="text-gray-500 mt-1">@{profile?.name}</p>
                <p className="text-gray-600 mt-4 max-w-md mx-auto"></p>
              </div>

              <Separator className="my-8" />

              <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Personal Information
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={profile?.name}
                      className="border-gray-200 focus-visible:ring-pink-400 h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={profile?.email}
                      className="border-gray-200 focus-visible:ring-pink-400 h-11 rounded-xl"
                    />
                  </div>
                  <div className="pt-4">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-11 rounded-xl shadow-sm transition-all duration-300">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              My Crafts
            </h3>
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
export default Myprofile;
