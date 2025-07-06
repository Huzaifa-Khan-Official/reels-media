import { Bell } from "lucide-react"

const NotificationsTab = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 ml-14 lg:ml-0">Notifications</h2>
        <div className="space-y-4">
            {[
                { id: 1, type: "like", message: "John liked your video", time: "2 hours ago" },
                { id: 2, type: "comment", message: "Sarah commented on your post", time: "4 hours ago" },
                { id: 3, type: "follow", message: "Mike started following you", time: "1 day ago" },
                { id: 4, type: "mention", message: "You were mentioned in a post", time: "2 days ago" },
            ].map((notification) => (
                <div key={notification.id} className="alert flex gap-2 items-center">
                    <Bell className="w-5 h-5" />
                    <div>
                        <div className="font-bold">{notification.message}</div>
                        <div className="text-xs opacity-70">{notification.time}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default NotificationsTab