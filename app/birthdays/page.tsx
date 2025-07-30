"use client";

import { useState, useEffect } from "react";
import { AiOutlineCalendar, AiOutlineGift, AiOutlineUser } from "react-icons/ai";

type Member = {
  id: number;
  name: string;
  birthday: string | null;
};

export default function Birthdays() {
  const [currentTime] = useState(new Date());
  const [sortedMembers, setSortedMembers] = useState<Member[]>([]);

  const members: Member[] = [
    { id: 1, name: "Pastor Ella", birthday: "January 16th" },
    { id: 2, name: "Bro Ken", birthday: "March 13th" },
    { id: 3, name: "Bro Praise", birthday: "May 4th" },
    { id: 4, name: "Sis Peace", birthday: "June 24th" },
    { id: 5, name: "Bro David King", birthday: "September 4th" },
    { id: 6, name: "Bro Osasenaga", birthday: "September 26th" },
    { id: 7, name: "Bro Ogochukwu", birthday: "October 26th" },
    { id: 8, name: "Sis Ruth", birthday: null },
    { id: 9, name: "Sis Grace Amorita", birthday: "April 14th" },
    { id: 10, name: "Bro Zion", birthday: "May 3rd" },
    { id: 11, name: "Sis Saviour", birthday: "July 8th" },
    { id: 12, name: "Sis Precious", birthday: null },
    { id: 13, name: "Sis Oluwadamilola", birthday: "December 19th" },
    { id: 14, name: "Bro Samuel", birthday: null },
    { id: 15, name: "Sis Nwanase", birthday: null },
    { id: 16, name: "Bro Patrick", birthday: null },
    { id: 17, name: "Sis Debby", birthday: "July 26th" },
    { id: 18, name: "Bro Orove Emmanuel", birthday: "August 1st" },
    { id: 19, name: "Sis Lauretta", birthday: "October 22nd" },
    { id: 20, name: "Sis Ottah Benedictt", birthday: "August 24th" },
  ];

  const parseBirthday = (birthday: string) => {
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    const [monthName, dayStr] = birthday.split(' ');
    const month = months.indexOf(monthName);
    const day = parseInt(dayStr);
    return { month, day };
  };

  const getDaysUntilBirthday = (birthday: string) => {
    const { month, day } = parseBirthday(birthday);
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, month, day);
    
    if (nextBirthday < today) {
      nextBirthday = new Date(currentYear + 1, month, day);
    }
    
    return Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const withBirthdays = members.filter((m): m is Member & { birthday: string } => 
      m.birthday !== null
    );
    
    const sorted = [...withBirthdays].sort((a, b) => 
      getDaysUntilBirthday(a.birthday) - getDaysUntilBirthday(b.birthday)
    );
    setSortedMembers(sorted);
  }, []);

  const todaysBirthdays = sortedMembers.filter(m => {
    const { month, day } = parseBirthday(m.birthday!);
    return currentTime.getMonth() === month && currentTime.getDate() === day;
  });

  const upcomingBirthdays = sortedMembers.filter(m => 
    !todaysBirthdays.includes(m)
  );

  const membersWithoutBirthdays = members.filter(m => !m.birthday);

  return (
    <main className="min-h-screen p-4 font-dm-sans">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-xl p-6">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <AiOutlineGift />
            BEN Birthdays
          </h1>
          <p className="text-sm opacity-80">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', month: 'long', day: 'numeric' 
            })}
          </p>
        </div>

        {/* Today's Birthdays */}
        {todaysBirthdays.length > 0 && (
          <div className="backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🎂 Today's Birthdays
            </h2>
            <div className="space-y-3">
              {todaysBirthdays.map(member => (
                <div key={member.id} className="backdrop-blur-md bg-white/30 dark:bg-black/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full backdrop-blur-sm bg-white/40 dark:bg-black/40 flex items-center justify-center">
                      <AiOutlineUser />
                    </div>
                    <h3 className="font-medium">{member.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Birthdays */}
        <div className="backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AiOutlineCalendar />
            Upcoming Birthdays
          </h2>
          
          <div className="space-y-3">
            {upcomingBirthdays.map(member => {
              const daysUntil = getDaysUntilBirthday(member.birthday!);
              
              return (
                <div key={member.id} className="backdrop-blur-md bg-white/30 dark:bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full backdrop-blur-sm bg-white/40 dark:bg-black/40 flex items-center justify-center">
                        <AiOutlineUser size={14} />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm opacity-80">
                          {member.birthday}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300`}>
                      {daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Members without birthdays */}
        {membersWithoutBirthdays.length > 0 && (
          <div className="backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AiOutlineUser />
              Members (No Birthday Listed)
            </h2>
            <div className="flex flex-wrap gap-2">
              {membersWithoutBirthdays.map(member => (
                <div key={member.id} className="backdrop-blur-sm bg-white/30 dark:bg-black/30 px-3 py-1.5 rounded-md text-sm">
                  {member.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}