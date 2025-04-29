import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white px-8 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div>
                    <h3 className="mb-4 text-lg font-bold">Ruvolley</h3>
                    <p className="text-gray-400">
                        Descrizione veloce
                    </p>
                    <div className="mt-4 flex space-x-4">
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-lg font-bold">Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/teams" className="text-gray-400 hover:text-white">
                                Squadre
                            </Link>
                        </li>
                        <li>
                            <Link href="/schedule" className="text-gray-400 hover:text-white">
                                Calendari e risultati
                            </Link>
                        </li>
                        <li>
                            <Link href="/sponsors" className="text-gray-400 hover:text-white">
                                Sponsors
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className="text-gray-400 hover:text-white">
                                Notizie
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-lg font-bold">Squadre</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/teams/s3" className="text-gray-400 hover:text-white">
                                S3
                            </Link>
                        </li>
                        <li>
                            <Link href="/teams/u17-mens" className="text-gray-400 hover:text-white">
                                U17 maschile
                            </Link>
                        </li>
                        <li>
                            <Link href="/teams/u14-womens" className="text-gray-400 hover:text-white">
                                U14 femmilie
                            </Link>
                        </li>
                        <li>
                            <Link href="/teams/2nd-division-mens" className="text-gray-400 hover:text-white">
                                2nd Divisione maschile
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-lg font-bold">Contattaci</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center text-gray-400">
                            <MapPin className="mr-2 h-5 w-5" />
                            <span>luogo sede</span>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <Phone className="mr-2 h-5 w-5" />
                            <span>numero di telefono</span>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <Mail className="mr-2 h-5 w-5" />
                            <span>email</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Ruvolley. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
