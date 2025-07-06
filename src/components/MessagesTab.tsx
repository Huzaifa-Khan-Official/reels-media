import { MessageCircle } from "lucide-react"

const MessagesTab = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 ml-14 lg:ml-0">Messages</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
            <div className="lg:col-span-1">
                <div className="card shadow-xl h-full dark:bg-black/90 bg-primary-50">
                    <div className="card-body">
                        <h3 className="card-title">Conversations</h3>
                        <div className="space-y-2">
                            {["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson"].map((name) => (
                                <div key={name} className="flex items-center space-x-3 p-2 dark:hover:bg-primary-600 rounded cursor-pointer hover:bg-primary-500 hover:text-white">
                                    <div className="avatar placeholder w-10 h-10">
                                        <div className="rounded-full">
                                            <span className="text-xs">
                                                {name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{name}</div>
                                        <div className="text-xs opacity-70">Last message...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2">
                <div className="card shadow-xl h-full dark:bg-black/90  bg-primary-50">
                    <div className="card-body flex flex-col h-full">
                        <h3 className="card-title">Chat</h3>
                        <div className="flex-1 flex items-center gap-4 text-gray-800 dark:text-gray-400">
                            <MessageCircle className="w-12 h-12 mb-2" />
                            <p>Select a conversation to start messaging</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default MessagesTab