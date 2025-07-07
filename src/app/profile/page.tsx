"use client"

import { useState } from "react"
import { Home, Video, Bell, MessageCircle, Plus, User, Menu, X } from "lucide-react"
import HomeTab from "@/components/HomeTab"
import VideosTab from "@/components/VideoTab"
import NotificationsTab from "@/components/NotificationsTab"
import MessagesTab from "@/components/MessagesTab"
import CreateTab from "@/components/CreateTab"
import ProfileTab from "@/components/ProfileTab"

// Tab Components
type TabType = "home" | "videos" | "notifications" | "messages" | "create" | "profile"

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>("home");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    const tabs = [
        { id: "home" as TabType, label: "Home", icon: Home },
        { id: "videos" as TabType, label: "Videos", icon: Video },
        { id: "notifications" as TabType, label: "Notifications", icon: Bell },
        { id: "messages" as TabType, label: "Messages", icon: MessageCircle },
        { id: "create" as TabType, label: "Create", icon: Plus },
        { id: "profile" as TabType, label: "Profile", icon: User },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case "home":
                return <HomeTab />
            case "videos":
                return <VideosTab />
            case "notifications":
                return <NotificationsTab />
            case "messages":
                return <MessagesTab />
            // case "create":
            //     return <CreateTab />
            case "profile":
                return <ProfileTab />
            default:
                return <HomeTab />
        }
    }

    return (
        <div className="min-h-screen">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-square btn-primary">
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64  dark:bg-black/100 dark:text-white/80 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary mb-8 ml-14 lg:ml-0">Dashboard</h1>
                    <nav className="space-y-2">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    // onClick={() => {
                                    //     setActiveTab(tab.id)
                                    //     setSidebarOpen(false)
                                    // }}

                                    onClick={() => {
                                        if (tab.id === "create") {
                                            setIsCreateModalOpen(true)
                                        } else {
                                            setActiveTab(tab.id)
                                            setSidebarOpen(false)
                                        }
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${activeTab === tab.id ? "bg-primary-500 text-white hover:bg-primary-600" : "hover:bg-primary-600 hover:text-white/95"
                                        }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/90 bg-opacity-50 z-30 lg:hidden text-white" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main content */}
            <div className="lg:ml-64">
                <main className="min-h-screen dark:bg-black/80 dark:text-white/70">{renderTabContent()}</main>
            </div>

            <CreateTab
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
            />

        </div>
    )
}