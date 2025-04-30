"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { NewsItem } from "@/lib/utils"
import { getAllNews } from "@/lib/db"

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    useEffect(() => {
        const fetchNews = async () => {
            const news = await getAllNews()
            setNews(news)
        }
        fetchNews()
    }, [])

    return (
        <div className="py-12 px-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ultime Notizie</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Resta aggiornato con le ultime notizie e comunicazioni della nostra associazione di pallavolo.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 px-8">
                {news.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        {item.image && (
                            <div className="relative h-48 w-full">
                                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                            </div>
                        )}
                        <CardContent className="p-4">
                            <div className="flex items-center text-sm text-gray-500">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                <span>{item.date}</span>
                            </div>
                            <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                            <p className="mt-2 text-gray-600">
                                {(item.excerpt ?? "").slice(0, 300) + ((item.excerpt ?? "").length > 300 ? "..." : "")}
                            </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Link href={`/news/${item.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                                Leggi di più
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
