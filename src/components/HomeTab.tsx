const HomeTab = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 ml-14 lg:ml-0">Home</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title">Recent Activity</h3>
                    <p>Your latest updates and activities will appear here.</p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title">Quick Stats</h3>
                    <div className="stats stats-vertical">
                        <div className="stat">
                            <div className="stat-title">Videos</div>
                            <div className="stat-value">12</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Followers</div>
                            <div className="stat-value">1.2K</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title">Trending</h3>
                    <p>Check out what&apos;s trending in your network.</p>
                </div>
            </div>
        </div>
    </div>
)

export default HomeTab