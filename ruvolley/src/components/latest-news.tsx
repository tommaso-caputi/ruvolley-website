import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { NewsItem } from "@/lib/utils"
import { getAllNews } from "@/lib/db"
import { useEffect, useState } from "react"

export default function LatestNews() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([])
    useEffect(() => {
        const fetchNewsItems = async () => {
            const newsItems = await getAllNews()
            setNewsItems(newsItems.slice(0, 3))
        }
        fetchNewsItems()
    }, [])
    if (!newsItems || newsItems.length === 0) {
        return (
            <p className="text-gray-500 text-center">Nessuna notiza</p>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-3 px-8">
            {newsItems.map((item) => (
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
                            {(item.excerpt ?? "").slice(0, 100) + ((item.excerpt ?? "").length > 100 ? "..." : "")}
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
    )
}
