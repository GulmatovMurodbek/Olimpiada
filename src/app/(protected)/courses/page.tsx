"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  GraduationCap,
  Mail,
  Star,
  Users,
} from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

let CoursesPage = () => {
  let { t } = useTranslation();
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4 w-[350px] lg:w-full">
              <div className="space-y-2">
                <Badge className="inline-flex mb-2 text-sm">
                  {t("freelearning")}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t("learnewskills")}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t("exploreFree")}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="px-8">
                  {t("browseFree")}
                </Button>
                <Button size="lg" variant="outline">
                  {t("howitworks")}
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                  <span>{t("freecourses")}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                  <span>{t("noCreditCard")}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {t("mostPopular")}
                </div>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/EUCWuV4kj5U?si=hGK6AA3prNDFtMzo"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-[20px] w-[350px]  lg:w-[560px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                {t("featuredFree")}
              </h2>
              <p className="text-muted-foreground">{t("handlpicked")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Filter className="mr-2 h-4 w-4" />
                {t("filter")}
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                {t("sortBy")}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Course 1 */}
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <iframe
                      width="300"
                      height="200"
                      src="https://www.youtube.com/embed/pZFU7t2arTA?si=nMr19VddQ_-blw8r"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    <Badge className="absolute top-2 right-2">
                      {t("bigginer")}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
                    >
                      {t("cooking")}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-lg">
                      {t("meet")}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {t("cook")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Лаззатҳои Гуногун</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{t("moretrhantenhours")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>3,245</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-2">
                    <a
                      href="https://www.youtube.com/@lazzatho"
                      className="w-full"
                    >
                      <Button className="w-full">Enroll Now - Free</Button>
                    </a>
                  </CardFooter>
                </Card>

                {/* Course 2 */}
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <iframe
                      width="300"
                      height="200"
                      src="https://www.youtube.com/embed/dGzCbURfwwc?si=oqgczVgtRomt2AzE"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    <Badge className="absolute top-2 right-2">
                      {t("bigginer")}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
                    >
                      {t("creating")}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-lg">
                      {t("createNewDresss")}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {t("createanewdress")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>DUZANDA TJ</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{t("moretrhantenhours")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>8,721</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-2">
                    <a
                      className="w-full"
                      href="https://www.youtube.com/@duzandatj6009/featured"
                    >
                      <Button className="w-full">Enroll Now - Free</Button>
                    </a>
                  </CardFooter>
                </Card>

                {/* Course 3 */}
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <iframe
                      width="300"
                      height="200"
                      src="https://www.youtube.com/embed/dPnsrTeTwtI?si=9gJuFlQe7HZQb56t"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    <Badge className="absolute top-2 right-2">Beginner</Badge>
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
                    >
                      {t("sew")}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-lg">
                      {t("coursesOfsew")}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {t("learnsewcorses")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Крючок Тв</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{t("moretrhantenhours")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.7</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>5,432</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-2">
                    <a
                      className="w-full"
                      href="https://www.youtube.com/@MY_HOBBI"
                    >
                      <Button className="w-full">Enroll Now - Free</Button>
                    </a>
                  </CardFooter>
                </Card>
              </div>
              <div className="flex justify-center mt-10">
                <Button variant="outline" className="gap-1">
                  View All Free Courses <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-0">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">Design Courses</h3>
                <p className="text-muted-foreground">
                  Showing design category courses
                </p>
              </div>
            </TabsContent>

            <TabsContent value="development" className="mt-0">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">
                  Development Courses
                </h3>
                <p className="text-muted-foreground">
                  Showing development category courses
                </p>
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">Business Courses</h3>
                <p className="text-muted-foreground">
                  Showing business category courses
                </p>
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="mt-0">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">Marketing Courses</h3>
                <p className="text-muted-foreground">
                  Showing marketing category courses
                </p>
              </div>
            </TabsContent>

            <TabsContent value="photography" className="mt-0">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">
                  Photography Courses
                </h3>
                <p className="text-muted-foreground">
                  Showing photography category courses
                </p>
              </div>
            </TabsContent>

            <TabsContent value="music" className="mt-0">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">Music Courses</h3>
                <p className="text-muted-foreground">
                  Showing music category courses
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {t("mostPopelarCourses")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Popular Course 1 */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Top Rated
                </div>
                <iframe
                  width="400"
                  height="200"
                  src="https://www.youtube.com/embed/XK57mu48OC0?si=Np8p06N34d3OFeAi"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <CardHeader>
                <CardTitle>{t("introdusingTodigitalMarketing")}</CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>15,432 students</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>4.9/5</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>8 modules</span>
                  </div>
                  <div>
                    <Badge variant="outline">{t("bigginer")}</Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  75% completion rate
                </p>
              </CardContent>
              <CardFooter>
                <a className="w-full" href="https://www.youtube.com/@coozin_uz">
                  <Button className="w-full">Start Learning</Button>
                </a>
              </CardFooter>
            </Card>

            {/* Popular Course 2 */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Top Rated
                </div>
                <iframe
                  width="400"
                  height="200"
                  src="https://www.youtube.com/embed/s8IfCO8VWC8?si=52_fvcY9Y4noRUz2"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <CardHeader>
                <CardTitle>{t("basicPhotography")}</CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>12,876 students</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>4.8/5</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>6 modules</span>
                  </div>
                  <div>
                    <Badge variant="outline">Beginner</Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "82%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  82% completion rate
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Learning</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {t("whychooseourfree")}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                {t("webeulievequality")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("expertInst")}</h3>
              <p className="text-muted-foreground">{t("learnindustry")}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("learnatyourownpace")}</h3>
              <p className="text-muted-foreground">
                {t("accessCourseMatrials")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {t("joinourlearningcommunity")}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t("StayUpdateWithNew")}
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t("enterYourEmail")}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">{t("subscibe")}</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                {t("bysubscribing")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  {t("readytostart")}
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  {t("createafreeacount")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>{t("accesto")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>{t("downloadable")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>{t("progressTracking")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>{t("communityforum")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesPage;
