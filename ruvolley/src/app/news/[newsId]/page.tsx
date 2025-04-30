import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, ArrowLeft, Share2, Facebook, Twitter, Bookmark, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsItem } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getAllNews } from "@/lib/db"
import ShareButton from "@/components/share-button"

export default async function NewsDetailPage({ params, }: { params: Promise<{ newsId: number }> }) {
    const { newsId } = await params
    const allNews = await getAllNews()
    const newsItem = allNews.find((item: NewsItem) => item.id.toString() === newsId.toString())

    if (!newsItem) {
        notFound()
    }

    return (
        <div className="py-12 px-8">
            <Link href="/news" className="mb-6 inline-flex items-center text-blue-600 hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna a tutte le notizie
            </Link>

            <article className="mx-auto max-w-4xl">
                {/* Article Header */}
                <header className="mb-8">
                    <div className="mb-4 flex items-center space-x-2 text-sm text-blue-600">
                        {/* <span className="rounded-full bg-blue-100 px-3 py-1">{newsItem.category}</span> */}
                        <span>•</span>
                        <div className="flex items-center text-gray-500">
                            <CalendarDays className="mr-1 h-4 w-4" />
                            <time dateTime={newsItem.date}>{newsItem.date}</time>
                        </div>
                    </div>

                    <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                        {newsItem.title}
                    </h1>
                </header>

                {/* Featured Image */}
                {newsItem.image &&
                    <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-xl sm:h-[400px] md:h-[500px]">
                        <Image
                            src={newsItem.image || "/placeholder.svg"}
                            alt={newsItem.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                }

                {/* Social Sharing */}
                <div className="mb-8 flex items-center justify-between border-b border-t border-gray-200 py-4">
                    <div className="text-sm text-gray-500">Condividi:</div>
                    <div className="flex space-x-2">
                        <ShareButton />
                    </div>
                </div>

                {/* Article Content */}
                <div
                    className="prose prose-blue max-w-none prose-headings:font-bold prose-headings:text-blue-900 prose-a:text-blue-600 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{
                        __html: (newsItem.excerpt ?? "").replace(/\n/g, "<br />")
                    }}
                />

            </article>
        </div>
    )
}