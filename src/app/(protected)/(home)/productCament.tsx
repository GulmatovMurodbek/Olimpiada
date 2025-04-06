"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import axios from "axios";
interface Product {
  id: string;
  name: string;
  images: string[];
  ratting: string;
  originalPrice: number;
  newPrice: number;
  discount?: number;
  iduser: string;
  length:string | number,
  camments:any
}
let ProductCament = ({ idProduct }: { idProduct: any }) => {
  let [addcommentinp, setaddcomentinp] = useState("");
  let[addreplice,setReplice]=useState("")
  let user = JSON.parse(localStorage.getItem("user") || "{}") as {
    name: string;
    age: number;
    imageUsers: string;
    id: string;
    saved: [];
  };
  let [product, setProduct] = useState<Product>();

  async function getProductById() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/product/${idProduct}`
      );
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProductById();
  }, []);
  async function addComent() {
    try {
      await axios.post("http://localhost:5000/addComment", {
        idaddcoment: user.id,
        text: addcommentinp,
        nameAddComents: user.name,
        imgAddCommentUser: user.imageUsers,
        productId:product?.id,
      });
      getProductById();
    } catch (error) {
      console.error(error);
    }
  }
  async function addReplice(idProduct:any) {
    try {
      await axios.post("http://localhost:5000/addreplice",
        {
          addrepliesName:user.name,
          addrepliesText:addreplice,
          idrepliceUser:user.id,
          productId:product?.id,
          idcoment:idProduct,
          avatar:user.imageUsers
        }
      )
      getProductById()
      setReplice("")
    } catch (error) {
      console.error(error);
    }
  }
  let [showReplyInputs, setShowReplyInputs] = useState<
    Record<number, boolean>
  >({});

  let toggleReplyInput = (commentId: number) => {
    setShowReplyInputs((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
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
  let [currentImageIndex, setCurrentImageIndex] = useState(0);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <>
      <span>
        <svg
          onClick={toggleModal}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle-icon lucide-message-circle"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      </span>
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0000007a] bg-opacity-50 z-50 flex items-center justify-center p-4 h-screen">
          <div className="container mx-auto py-8 px-4 w-[950px] h-[600px] rounded-[30px] bg-[white]">
            <span className="flex w-full justify-end">
              <svg
                onClick={toggleModal}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
            <div className="flex flex-col md:flex-row gap-6 w-[900px] mt-[20px]">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-md h-[300px]">
                  <img
                    src={
                      product?.images[currentImageIndex] ||
                      "/placeholder.svg?height=600&width=600&text=No+Image"
                    }
                    alt={product?.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    width={600}
                    height={600}
                  />
                  {product && product.images && product.images.length  > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                {product && product.images && product.images.length  > 1 && (
                  <div className="flex space-x-4 overflow-x-auto h-[300px] py-2 scrollbar-hide">
                    {product?.images.map((image: any, index: any) => (
                      <button
                        key={index}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} - image ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full h-[400px] md:w-1/2 overflow-x-auto">
                <div className="bg-card rounded-xl  h-[400px]">
                  <h3 className="font-semibold text-lg mb-4 text-card-foreground">
                    Customer Reviews
                  </h3>
                  <div className="space-y-6 overflow-y-auto h-[300px] pr-2">
                    {product?.camments.map((comment: any) => (
                      <div key={comment.idcoment} className="space-y-2">
                        <div className="flex">
                          <Avatar className="h-8 w-8 mr-2 flex-shrink-0 border">
                            <AvatarImage src={comment.imgAddCommentUser} />
                            <AvatarFallback>
                              {comment.nameAddComents
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted/30 rounded-2xl px-3 py-2">
                              <span className="font-semibold text-sm">
                                {comment.nameAddComents}
                              </span>
                              <p className="text-sm mt-1">{comment.text}</p>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <button
                                className="ml-1 font-semibold hover:text-primary transition-colors"
                                onClick={() =>
                                  toggleReplyInput(comment.idcoment)
                                }
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0 hover:text-rose-500 transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        {showReplyInputs[comment.idcoment] && (
                          <div className="ml-10 mt-2">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2 border">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback>ME</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex items-center border rounded-full overflow-hidden bg-background pr-2">
                                <Input
                                value={addreplice}
                                onChange={(e)=>setReplice(e.target.value)}
                                  placeholder={`Reply to ${comment.nameAddComents}...`}
                                  className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm"
                                />
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full"
                                  >
                                    <Smile className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                  <Button
                                    onClick={()=>addReplice(comment.idcoment)}
                                    variant="ghost"
                                    className="h-6 text-xs font-semibold text-primary"
                                  >
                                    Post
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Посухҳо */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-10 space-y-2 mt-2 overflow-y-auto">
                            {comment.replies.map((reply: any) => (
                              <div key={reply.idaddreplices} className="flex">
                                <Avatar className="h-7 w-7 mr-2 flex-shrink-0 border">
                                  <AvatarImage src={reply.avatar} />
                                  <AvatarFallback>
                                    {reply.addrepliesName
                                      .substring(0, 2)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-muted/30 rounded-2xl px-3 py-2">
                                    <span className="font-semibold text-sm">
                                      {reply.addrepliesName}
                                    </span>
                                    <p className="text-sm mt-0.5">
                                      {reply.addrepliesText}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 flex-shrink-0 hover:text-rose-500 transition-colors"
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Илова кардани изҳори нав */}
                  <div className=" mt-[10px] border-t">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2 border">
                        <AvatarImage src={user.imageUsers} />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex items-center border rounded-full overflow-hidden bg-muted/20 pr-2">
                        <Input
                          value={addcommentinp}
                          onChange={(e) => setaddcomentinp(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-sm"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                          >
                            <Smile className="h-5 w-5 text-muted-foreground" />
                          </Button>
                          <Button
                            onClick={addComent}
                            size="sm"
                            className="h-8 rounded-full px-4"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCament;
