import { User } from "lucide-react"

const ProfileTab = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 ml-14 lg:ml-0">Profile</h2>
        <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="avatar">
                            <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                <User className="w-12 h-12" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold">John Doe</h3>
                            <p className="text-gray-600">@johndoe</p>
                            <p className="mt-2">Content creator and developer passionate about technology and design.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Personal Information</h3>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" value="John Doe" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" value="john@example.com" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bio</span>
                            </label>
                            <textarea className="textarea textarea-bordered" value="Content creator and developer..."></textarea>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Settings</h3>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Email Notifications</span>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Public Profile</span>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Dark Mode</span>
                                <input type="checkbox" className="toggle toggle-primary" />
                            </label>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ProfileTab