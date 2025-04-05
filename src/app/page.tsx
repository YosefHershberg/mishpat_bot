import Navbar from "@/components/nav/Navbar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <main className='bg-cover bg-center h-screen w-screen absolute top-0 flex-1 flex flex-col items-center'>
      <Navbar />
      <section className="flex-1 flex flex-col p-5 items-center justify-center gap-18 max-w-2xl text-center">
        <h1 className="text-4xl mb-8 sm:mb-18 font-bold">Welcome to MishpatBot!</h1>
        <p className="text-lg">
          MishpatBot is a AI chat bot that provides legal information and resources
          to users. MishpatBot is designed to help people understand the law and
          how it applies to them.
        </p>
        <Link
          href='/chat'
          className="bg-secondary hover:bg-secondary/50 max-w-[30rem] p-4 rounded-xl shadow-2xl flex flex-col items-center gap-4"
        >
          <h1 className="text-lg font-bold flex items-center gap-3">Start Now <ChevronRight /></h1>
          <p>Free access to our AI model, specially tuned for subjects that have to do with law</p>
        </Link>
      </section>
    </main>
  );
}