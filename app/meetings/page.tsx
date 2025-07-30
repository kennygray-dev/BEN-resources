import {
    FaChurch,
    FaGoogle,
    FaHandsHelping,
    FaPrayingHands,
} from "react-icons/fa";

const meetings = [
    {
        day: "Sun",
        title: "Sunday Church Meeting",
        location: "Church",
        icon: <FaChurch className="text-white text-3xl" />,
        color: "from-pink-500 to-red-400",
    },
    {
        day: "Wed",
        title: "Discipleship Meeting",
        location: "Google Meet",
        icon: <FaHandsHelping className="text-white text-3xl" />,
        color: "from-indigo-500 to-purple-500",
    },
    {
        day: "Fri",
        title: "Prayer Meeting",
        location: "Google Meet",
        icon: <FaPrayingHands className="text-white text-3xl" />,
        color: "from-green-400 to-emerald-600",
    },
    {
        day: "Sat",
        title: "Evangelism",
        location: "Location Communicated",
        icon: <FaGoogle className="text-white text-3xl" />,
        color: "from-yellow-400 to-orange-500",
    },
];

export default function Words() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero Section */}
            <section
                className="relative h-[300px] md:h-[400px] bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2h1cmNoJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D')`,
                }}
            >
                {/* Faint oversized background text */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <h2 className="text-[12vw] font-extrabold text-white/10 whitespace-nowrap tracking-tight">
                        MEETING SCHEDULE
                    </h2>
                </div>

                {/* Overlay for darkening */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                {/* Foreground text */}
                <h1 className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-white text-6xl md:text-7xl font-bold tracking-tight text-center px-4">
                    Meeting
                    <br />
                    Schedule
                </h1>
            </section>

            {/* Cards Section */}
            <section className="p-6 mt-6 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {meetings.map((meeting) => (
                    <div
                        key={meeting.day}
                        className={`relative h-[220px] rounded-2xl shadow-lg bg-gradient-to-br ${meeting.color} text-white p-6 overflow-hidden`}
                    >
                        <div className="absolute -top-6 -left-4 text-[9rem] font-extrabold opacity-20 select-none pointer-events-none">
                            {meeting.day}
                        </div>
                        <div className="z-10 relative ">
                            <div className="mb-3">{meeting.icon}</div>
                            <h2 className="text-2xl font-bold">
                                {meeting.title}
                            </h2>
                            <p className="text-white/90 mt-2">
                                {meeting.location}
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}
