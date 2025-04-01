"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Share2,
  Star
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState} from "react";
import ProductCard from "../../(home)/cardProduct";
import { useTranslation } from "react-i18next";
interface Profile {
  email: string;
  id: string | number;
  imageUsers: string;
  name: string;
}
const Userprofile = () => {
  const{t}=useTranslation()
  let { id } = useParams();
  let [profile, setProfile] = useState<Profile>();
  const [dataUser, setDataUser] = useState([]);
  let idUser=localStorage.getItem("iduserforprile")
  async function getUserById() {
    try {
      let { data } = await axios.get(`http://localhost:5000/users/${id}`);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getProductsByIdUser() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/product/users/${idUser}`
      );
      setDataUser(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserById();
    getProductsByIdUser()
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-indigo-50 z-0 dark:from-[black] dark:to-[#3f3e3e]">
      <div className="relative h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E7B71C] to-[#27A49C] opacity-90 dark:bg-gradient-to-r dark:from-[#2b2102] dark:to-[#183533]"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-rose-50 "></div>
      </div>

      <div className="container px-4 mx-auto -mt-40 mb-16 relative z-0">
        <div className="bg-white dark:bg-[black] rounded-2xl shadow-xl overflow-hidden border border-pink-100">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={profile?.imageUsers || "/placeholder.svg"}
                    alt={"imageUser"}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between flex-grow text-center md:text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {profile?.name}
                      </h1>
                      <p className="text-gray-500 mt-1">{profile?.email}</p>
                    </div>
                    <div className="flex gap-2 mx-auto sm:mx-0">
                      <Button
                        variant="outline"
                        className="border-pink-200 hover:bg-pink-50 transition-all duration-300"
                      >
                        <MessageCircle className="h-4 w-4 mr-2 text-pink-500" />
                        {t("message")}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-pink-200 hover:bg-pink-50 transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4 text-pink-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 bg-pink-50 p-4 rounded-lg border border-pink-100">
                    <p className="text-gray-700 italic"></p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-medium text-[black]">4.8</span>
                    <span className="text-gray-500 ml-1"></span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
                    <MapPin className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-700">Tajikistan</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
                    <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-700">Since 2025r</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t("handlecraft")}
            </h2>
            <Button
              variant="outline"
              className="border-pink-200 hover:bg-pink-50 transition-all duration-300"
            >
              {t("veiwAllCollection")}
            </Button>
          </div>

          <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">{t("thisSallerProducts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dataUser?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
