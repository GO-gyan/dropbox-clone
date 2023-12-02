import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function Home() {
    return (
        <main className="">
            <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
                <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
                    <h1 className="text-5xl font-bold">
                        Welcome to my Dropbox Demo. <br />
                        <br />
                        Storing everything in my Dropbox.
                    </h1>
                    <p className="pb-20">
                        Enhance your personal storage with dropbox and you can do thabad thabad with this app and I am
                        sure that you will not get bored with thabad thabad.
                    </p>

                    <Link
                        href="/dashboard"
                        className="bg-[#0160FE] hover:bg-[#0160FE]/90 text-white font-bold rounded-full flex cursor-pointer p-5 w-fit"
                    >
                        Try it for free
                        <ArrowRight className="ml-6" />
                    </Link>
                </div>
                <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
                    <video autoPlay loop muted className="rounded-lg">
                        <source
                            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support video tag.
                    </video>
                </div>
            </div>
            <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
            <p className="text-center font-light p-2">This is my disclaimer.</p>
        </main>
    );
}
