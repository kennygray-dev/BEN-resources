"use client";

export default function Words() {
    const images = [
        "https://i.imgur.com/LTFHeE7.jpeg",
        "https://i.imgur.com/K64LzWd.jpeg",
    ];

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero Section */}
            <section
                className="relative h-[300px] md:h-[400px] bg-cover bg-center"
                style={{
                    backgroundImage: `url("https://i.imgur.com/hiSSLWp.jpeg")`,
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold tracking-tight z-10 text-center px-4">
                    <span className="inline-flex items-center gap-3">
                        Have you prayed today?
                    </span>
                </h1>
            </section>

            {/* Image Grid */}
            <section className="p-6 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-zinc-800"
                    >
                        <img
                            src={src}
                            alt={`Prayer image ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </section>
        </main>
    );
}
