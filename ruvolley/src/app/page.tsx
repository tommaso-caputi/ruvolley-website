import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialPopup from "@/components/social-popup";
import UpcomingMatches from "@/components/upcoming-matches";
import SponsorShowcase from "@/components/sponsor-showcase";
import LatestNews from "@/components/latest-news";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Social Media Popup */}
      <SocialPopup />

      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-16 md:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Passione per la <span className="text-yellow-400">Pallavolo</span>
            </h1>
            <p className="mt-4 text-lg text-blue-100 sm:text-xl">
              Unendo giocatori, tifosi e sponsor per celebrare lo sport che amiamo
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-400">
                <Link href="/schedule">Calendario Partite</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="">
                <Link href="/teams">Le Nostre Squadre</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]">
            <div className="absolute inset-0 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
              {/* <Image
                src="/icon.jpg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Volleyball player in action"
                fill
                className="object-cover"
                priority
              /> */}
            </div>
            {/* <div className="absolute -right-4 -top-4 rounded-full bg-yellow-500 p-4 shadow-lg">
              <Trophy className="h-8 w-8 text-blue-900" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-full bg-white p-4 shadow-lg">
              <Users className="h-8 w-8 text-blue-900" />
            </div> */}
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="bg-gray-50 py-16 px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Prossime partite</h2>
          <p className="mt-4 text-lg text-gray-600">Sostieni le nostre squadre nelle prossime partite</p>
        </div>
        <UpcomingMatches />
      </section>

      {/* Sponsors Section */}
      <section className="bg-white py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">I nostri sponsor</h2>
          <p className="mt-4 text-lg text-gray-600">Siamo grati per il supporto di queste organizzazioni</p>
        </div>
        <SponsorShowcase />
      </section>

      {/* Latest News Section */}
      <section className="bg-gray-50 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ultime notizie</h2>
          <p className="mt-4 text-lg text-gray-600">Resta aggiornato con le ultime novità della nostra associazione</p>
        </div>
        <LatestNews />
      </section>
    </div>
  )
}
