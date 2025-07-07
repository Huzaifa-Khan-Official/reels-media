import { User } from "lucide-react"

const ProfileTab = () => (
    <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ml-14 lg:ml-0">Profile</h2>
        <div className="max-w-7xl mx-auto">
            {/* Profile Header Card */}
            <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950 mb-4 sm:mb-6">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-primary-600 text-white flex items-center justify-center">
                                <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                            </div>
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">John Doe</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">@johndoe</p>
                            <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-2xl">
                                Content creator and developer passionate about technology and design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                {/* Personal Information Card */}
                <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950">
                    <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                            Personal Information
                        </h3>
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue="john@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                                <textarea
                                    defaultValue="Content creator and developer passionate about technology and design. I love creating engaging content and building amazing user experiences."
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base h-20 sm:h-24 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                <input
                                    type="text"
                                    defaultValue="San Francisco, CA"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Card */}
                <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950">
                    <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Settings</h3>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                        Email Notifications
                                    </span>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        Receive notifications about your account
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                        Public Profile
                                    </span>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        Make your profile visible to others
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Switch to dark theme</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                        Two-Factor Authentication
                                    </span>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        Add extra security to your account
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                            <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base font-medium cursor-pointer">
                                Save Changes
                            </button>
                            <button className="flex-1 px-4 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium border border-gray-300 dark:border-gray-600  dark:text-gray-300  bg-white hover:bg-primary-600 hover:text-white text-gray-700 cursor-pointer dark:bg-gray-700 dark:hover:bg-primary-600">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Stats Section */}
            <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950 p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-primary-600">127</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Posts</div>
                </div>
                <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950 p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-600">1.2K</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950 p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-purple-600">856</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Following</div>
                </div>
                <div className="card hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950 p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-orange-600">4.8</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
            </div>
        </div>
    </div>
)

export default ProfileTab