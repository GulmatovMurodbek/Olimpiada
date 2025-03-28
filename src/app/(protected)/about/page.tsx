"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flower, Heart, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Aboutpage = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#E6B312]/30"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#27A49C]/20"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-[#E6B312]/20"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-[#27A49C]/10 px-4 py-1 text-sm text-[#27A49C]">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>{t("handcrafted")}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#27A49C]">
                {t("ourStory")}
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("aboutText")}
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button className="rounded-full bg-[#E6B312] hover:bg-[#E6B312]/90 text-white">
                  {t("shopNow")}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-[#27A49C] text-[#27A49C] hover:bg-[#27A49C]/10"
                >
                  {t("meetOurA")}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-[#E6B312]/20 blur-xl"></div>
              <img
                src="https://cdn.leonardo.ai/users/8fc1fdc7-37b8-4954-a6c3-d68ad73ba76a/generations/f8ff8380-6cdf-4ef0-bca3-37e592c92bff/segments/1:4:1/Flux_Dev_Depict_a_vibrant_and_inviting_illustration_for_an_onl_0.jpeg?w=512"
                alt="Artisans working on handcrafted items"
                width={550}
                height={550}
                className="relative mx-auto aspect-square overflow-hidden rounded-2xl object-cover object-center border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[#27A49C] flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-2xl">8+</div>
                  <div className="text-xs">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-[black]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-[#E6B312]/10 px-4 py-1 text-sm text-[#E6B312]">
              <Heart className="mr-1 h-3.5 w-3.5" />
              <span>{t("WhyDoThis")}</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#27A49C]">
                {t("ourMisson")}
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("weBelieve")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-[#27A49C]/5 overflow-hidden">
              <div className="h-2 bg-[#E6B312]"></div>
              <CardContent className="pt-8 pb-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6B312]/10 mx-auto">
                  <Heart className="h-8 w-8 text-[#E6B312]" />
                </div>
                <h3 className="text-xl font-bold text-center text-[#27A49C] mb-3">
                  {t("support")}
                </h3>
                <p className="text-muted-foreground text-center">
                  {t("WeProvide")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-[#E6B312]/5 overflow-hidden">
              <div className="h-2 bg-[#27A49C]"></div>
              <CardContent className="pt-8 pb-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#27A49C]/10 mx-auto">
                  <ShoppingBag className="h-8 w-8 text-[#27A49C]" />
                </div>
                <h3 className="text-xl font-bold text-center text-[#E6B312] mb-3">
                  {t("QualityProducts")}
                </h3>
                <p className="text-muted-foreground text-center">
                  {t("everyItems")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-[#27A49C]/5 overflow-hidden">
              <div className="h-2 bg-[#E6B312]"></div>
              <CardContent className="pt-8 pb-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6B312]/10 mx-auto">
                  <MapPin className="h-8 w-8 text-[#E6B312]" />
                </div>
                <h3 className="text-xl font-bold text-center text-[#27A49C] mb-3">
                  {t("globalComunity")}
                </h3>
                <p className="text-muted-foreground text-center">
                  {t("Weconnetc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section
        className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden z-0 bg-[oldlace] dark:bg-[black]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-[#E6B312]/30"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-[#27A49C]/20"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-[#27A49C]/10 px-4 py-1 text-sm text-[#27A49C]">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>{t("Thepeople")}</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#E6B312]">{t("meetOurTeam")}</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("passionatePeople")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {[
              {
                name: "Murodbek Gulmatov",
                role: "Founder & CEO",
                image: "",
              }
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E6B312] to-[#27A49C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-1 rounded-full bg-white shadow-lg">
                    <img
                      src={"../../../images/suratMa.jpg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="rounded-full object-cover h-48 w-48"
                    />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-bold text-[#27A49C]">{member.name}</h3>
                  <p className="text-sm text-[#E6B312]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-[black]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-[#E6B312]/10 px-4 py-1 text-sm text-[#E6B312]">
                <Heart className="mr-1 h-3.5 w-3.5" />
                <span>{t("whatwestand")}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#27A49C]">{t("ourValues")}</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
               {t("atCraftMarket")}
              </p>
              <ul className="grid gap-8">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                    <Flower className="h-5 w-5 text-[#E6B312]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#27A49C] text-lg">{t("auth")}</h3>
                    <p className="text-muted-foreground">
                      {t("wecelebrate")}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                    <Flower className="h-5 w-5 text-[#E6B312]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#27A49C] text-lg">{t("sustain")}</h3>
                    <p className="text-muted-foreground">
                   {t("WePromote")}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                    <Flower className="h-5 w-5 text-[#E6B312]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#27A49C] text-lg">{t("community")}</h3>
                    <p className="text-muted-foreground">
                      {t("wefosterConnect")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-[#27A49C]/10 blur-xl"></div>
              <img
                src="https://cdn.leonardo.ai/users/8fc1fdc7-37b8-4954-a6c3-d68ad73ba76a/generations/bed43a03-ee31-4acb-80c7-06be9c5353cf/segments/2:4:1/Flux_Dev_Create_a_vibrant_and_empowering_image_for_an_about_us_1.jpeg?w=512"
                alt="Artisans working together in a workshop"
                width={550}
                height={550}
                className="relative mx-auto aspect-square overflow-hidden rounded-2xl object-cover object-center border-4 border-white shadow-lg"
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#E6B312] flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-2xl">100%</div>
                  <div className="text-xs">{t("auth")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-[oldlace] dark:bg-[black]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-[#27A49C]/10 px-4 py-1 text-sm text-[#27A49C]">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>{t("testimonials")}</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#E6B312]">{t("whatPeopleSay")}</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
               {t("hearFrom")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2 lg:gap-12">
            <Card className="border-0 shadow-lg bg-white dark:bg-[black] dark:shadow-[0px_0px_10px_grey] overflow-hidden">
              <div className="h-2 bg-[#E6B312]"></div>
              <CardContent className="p-8">
                <div className="mb-4 text-[#E6B312]">
                  <Sparkles className="h-8 w-8" />
                </div>
                <p className="mb-6 italic text-lg">
                 {t("hasTransformed")}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://cdn.leonardo.ai/users/8fc1fdc7-37b8-4954-a6c3-d68ad73ba76a/generations/f31e7878-bf52-4ccc-9278-62b8759dfab5/segments/2:4:1/Flux_Dev_Create_a_stunning_background_that_features_a_Tajik_wo_1.jpeg?w=512"
                    alt="Elena"
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-[#27A49C]"
                  />
                  <div>
                    <p className="font-bold text-[#27A49C]">Saida</p>
                    <p className="text-sm text-[#E6B312]">Pazanda</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white dark:bg-[black] dark:shadow-[0px_0px_10px_grey] overflow-hidden">
              <div className="h-2 bg-[#27A49C]"></div>
              <CardContent className="p-8">
                <div className="mb-4 text-[#27A49C]">
                  <Sparkles className="h-8 w-8" />
                </div>
                <p className="mb-6 italic text-lg">
                {t("IloveShopping")}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://cdn.leonardo.ai/users/8fc1fdc7-37b8-4954-a6c3-d68ad73ba76a/generations/f31e7878-bf52-4ccc-9278-62b8759dfab5/segments/1:4:1/Flux_Dev_Create_a_stunning_background_that_features_a_Tajik_wo_0.jpeg?w=512"
                    alt="Marcus"
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-[#E6B312]"
                  />
                  <div>
                    <p className="font-bold text-[#E6B312]">Myhayo</p>
                    <p className="text-sm text-[#27A49C]">Kharidor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#27A49C] to-[#27A49C]/90 text-white">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t("joininourcomunity")}</h2>
            <p className="mx-auto max-w-[600px] opacity-90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("whetheryoure")}
            </p>
          </div>
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center mt-6">
            <Button size="lg" className="rounded-full bg-white text-[#27A49C] hover:bg-white/90">
              {t("startShoping")}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white text-black hover:bg-white/10">
             {t("becomeaseller")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutpage;
