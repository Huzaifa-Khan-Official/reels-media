
const CreateTab = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 ml-14 lg:ml-0">Create</h2>
        <div className="max-w-2xl mx-auto">
            <div className="card shadow-xl hover:bg-primary-100 dark:hover:bg-black/90">
                <div className="card-body">
                    <h3 className="card-title">Create New Content</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" placeholder="Enter title" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Enter description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Media</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered" />
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-outline">Save Draft</button>
                        <button className="btn btn-primary">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default CreateTab