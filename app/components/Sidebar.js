import React from "react"

import UpcomingMeetings from "../public/UpcomingMeetings"

const Sidebar = () => {
    return (
        <div className="h-screen flex flex-col pl-4 pr-5">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <img src="" alt="ola" />
                </div>
                <div>
                    <img src="" alt="ola" />
                </div>
                <div className="flex flex-col">
                    <div>Creador</div>
                    <div>Nil Ojeda</div>
                </div>
            </div>
            <div className="flex flex-col justify-evenly h-full">
                <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-4">
                    <div className="text-black font-normal text-base">Proximas reuniones</div>
                    <div className="flex flex-col justify-evenly">
                        <div className="text-black font-medium text-sm text-opacity-50">
                            Enero 10 2023
                        </div>
                        {/* aqui abra un map de reuniones */}
                        {UpcomingMeetings.upcomingMeetings.map((meetings) => (
                            <div className="flex flex-row w-full items-center">
                                <div className="text-black font-medium text-lg">
                                    {meetings.time}
                                </div>
                                <span className="w-1 h-full rounded-lg bg-amber-500"></span>
                                <div className="flex flex-col">
                                    <div className="text-black font-medium text-sm text-opacity-50">
                                        {meetings.job}
                                    </div>
                                    <div className="text-black font-medium text-sm">
                                        {meetings.topic}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-4">
                    <div className="text-black font-normal text-base">Últimas colaboraciones</div>
                    <div className="flex flex-col">
                        {/* aqui abra un map con las últimas colaboraciones */}
                        <div className="flex flex-row items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                            <div className="flex flex-col">
                                <div className="text-black font-medium text-sm text-opacity-50">
                                    Senior UI Designer
                                </div>
                                <div className="text-black font-medium text-sm">Overwiew</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
