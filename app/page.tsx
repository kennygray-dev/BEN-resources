"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMicrophone, FaStickyNote, FaComments, FaCalendarAlt, FaBible, FaBirthdayCake, FaUsers, FaPray } from "react-icons/fa";

export default function Home() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    const sections = [
        { name: "Recordings", href: "/recordings", icon: FaMicrophone },
        { name: "Meeting Schedules", href: "/meetings", icon: FaUsers },
        { name: "Prayers", href: "/prayers", icon: FaPray },
        { name: "Bible", href: "/bible", icon: FaBible },
        { name: "Notes", href: "/notes", icon: FaStickyNote },
        { name: "Words", href: "/words", icon: FaComments },
        { name: "Calendar", href: "/calendar", icon: FaCalendarAlt },
        { name: "Birthdays", href: "/birthdays", icon: FaBirthdayCake },
    ];

    const benText = `Welcome to BEN Abuja Resource Center.`;

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowInstallPrompt(false);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowInstallPrompt(false);
        }
    };

    return (
        <main className="min-h-screen px-4 py-6 sm:px-10 sm:py-10 font-dm-sans">
            {/* Install App Banner */}
            {showInstallPrompt && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-3 text-center">
                    <div className="flex items-center justify-between max-w-sm mx-auto">
                        <span className="text-sm">Install BEN Abuja App</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleInstallClick}
                                className="bg-white text-red-600 px-3 py-1 rounded text-xs font-medium"
                            >
                                Install
                            </button>
                            <button 
                                onClick={() => setShowInstallPrompt(false)}
                                className="text-white/80 px-2"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:gap-12 sm:items-center sm:h-[calc(100vh-80px)]">
                {/* Text Section */}
                <div className="w-full sm:w-1/2 text-center sm:text-left flex items-center justify-center sm:justify-start">
                    <p className="text-6xl sm:text-8xl font-bold tracking-wide flex flex-wrap justify-end sm:justify-start sm:max-w-full">
                        {benText.split(" ").map((word, index) => (
                            <span
                                key={index}
                                className={`word-fade ${
                                    word.toLowerCase() === "ben"
                                        ? "text-red-600 font-bold"
                                        : ""
                                }`}
                                style={{ animationDelay: `${index * 170}ms` }}
                            >
                                {word}&nbsp;
                            </span>
                        ))}
                    </p>
                </div>

                {/* Links Section */}
                <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-3 mt-8 sm:mt-0">
                    {sections.map(({ name, href, icon: Icon }) => (
                        <Link
                            key={name}
                            href={href}
                            className="flex justify-between items-center border-b border-neutral-300 py-3 text-xl sm:text-2xl font-medium opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="text-xl opacity-60" />
                                <span>{name}</span>
                            </div>
                            <span className="text-2xl">&rarr;</span>
                        </Link>
                    ))}
                </div>
            </div>

            
        </main>
    );
}