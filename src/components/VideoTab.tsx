import { Video } from "lucide-react"

const VideosTab = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 ml-14 lg:ml-0">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((video) => (
                <div key={video} className="card bg-base-100 shadow-xl">
                    <figure className="bg-gray-200 h-48 flex items-center justify-center">
                        <Video className="w-12 h-12 text-gray-400" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Video {video}</h3>
                        <p>Video description goes here...</p>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Watch</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default VideosTab