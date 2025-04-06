"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Twitter,
} from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

let Contactpage = () => {
  let { t } = useTranslation();
  return (
    <>
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#E6B312]/30"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#27A49C]/20"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-[#E6B312]/20"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center rounded-full bg-[#27A49C]/10 px-4 py-1 text-sm text-[#27A49C] mb-4">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>{t("wedLove")}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#27A49C] mb-4">
              {t("getInTouch")}
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed">
              {t("haveQuestions")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-[#E6B312]/10 blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-[#E6B312]/20">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#E6B312] text-white px-6 py-2 rounded-full font-medium">
                  {t("SendUs")}
                </div>
                <form className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-[#27A49C]"
                      >
                        {t("yourName")}
                      </label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        className="rounded-lg border-[#E6B312]/30 focus:border-[#27A49C] focus:ring-[#27A49C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-[#27A49C]"
                      >
                        {t("emailAdress")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        className="rounded-lg border-[#E6B312]/30 focus:border-[#27A49C] focus:ring-[#27A49C]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-[#27A49C]"
                    >
                      {t("subject")}
                    </label>
                    <Input
                      id="subject"
                      placeholder={t("howcanwe")}
                      className="rounded-lg border-[#E6B312]/30 focus:border-[#27A49C] focus:ring-[#27A49C]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-[#27A49C]"
                    >
                      {t("yourMessage")}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t("tellus")}
                      className="min-h-[150px] rounded-lg border-[#E6B312]/30 focus:border-[#27A49C] focus:ring-[#27A49C]"
                    />
                  </div>
                  <Button className="w-full rounded-lg bg-[#27A49C] hover:bg-[#27A49C]/90 text-white">
                    <Send className="mr-2 h-4 w-4" />
                    {t("sendMassage")}
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E6B312]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#27A49C]/10 rounded-bl-full"></div>
                <h2 className="text-2xl font-bold text-[#E6B312] mb-6 relative z-10">
                  {t("contactinformation")}
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                      <Phone className="h-5 w-5 text-[#E6B312]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#27A49C]">
                        {t("phone")}
                      </h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+1 (555) 987-6543</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                      <Mail className="h-5 w-5 text-[#E6B312]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#27A49C]">
                        {t("email")}
                      </h3>
                      <p className="text-muted-foreground">
                        hunariman@gmail.com
                      </p>
                      <p className="text-muted-foreground">
                        support@hunariman.com
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                      <MapPin className="h-5 w-5 text-[#E6B312]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#27A49C]">
                        {t("adress")}
                      </h3>
                      <p className="text-muted-foreground">Dushanbe </p>
                      <p className="text-muted-foreground">
                        {" "}
                        Dushanbe, AC 12345
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6B312]/10">
                      <Clock className="h-5 w-5 text-[#E6B312]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#27A49C]">
                        {t("bisnessHour")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("mondayfriday")}
                      </p>
                      <p className="text-muted-foreground">{t("suturday")}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E6B312]/20">
                <h2 className="text-2xl font-bold text-[#E6B312] mb-6">
                  {t("connectWithUs")}
                </h2>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-[#27A49C] text-[#27A49C] hover:bg-[#27A49C]/10 hover:text-[#27A49C] h-12 w-12"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-[#27A49C] text-[#27A49C] hover:bg-[#27A49C]/10 hover:text-[#27A49C] h-12 w-12"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-[#27A49C] text-[#27A49C] hover:bg-[#27A49C]/10 hover:text-[#27A49C] h-12 w-12"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-[#27A49C] mb-2">{t("findUs")}</h2>
            <p className="text-muted-foreground">{t("Visit")}</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white h-[400px]">
            <img
              src="https://c8.alamy.com/comp/2YAD6DE/dushanbe-city-aerial-panoramic-view-dushanbe-is-the-capital-city-of-tajikistan-2YAD6DE.jpg"
              alt="Map location"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-[#E6B312]/20 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-[#E6B312]" />
                <h3 className="font-medium text-[#27A49C]">Мағозаи Ҳунари ман</h3>
              </div>
              <p className="text-sm text-muted-foreground">street Firdavsi, Dushanbe,Borbad 124</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
              Questions & Answers
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{t("FQA")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("FindRespones")}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("HowDo")}</AccordionTrigger>
                <AccordionContent>{t("startingIsSimple")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("WhatFees")}</AccordionTrigger>
                <AccordionContent>{t("WeCharge")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("HowIsShipping")}</AccordionTrigger>
                <AccordionContent>{t("SellersAre")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t("WhatByers")}</AccordionTrigger>
                <AccordionContent>{t("WeOffer")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>{t("getFeat")}</AccordionTrigger>
                <AccordionContent>{t("Weregulary")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contactpage;
