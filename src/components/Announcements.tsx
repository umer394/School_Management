export default function Announcements(){
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-sm text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum dolor sit. </h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tenetur expedita, dolore eum exercitationem totam consequuntur commodi recusandae, sunt provident mollitia id repellendus, a soluta laudantium. Voluptatibus aut eos beatae.</p>
                </div>
                <div className="bg-lamaPurpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum dolor sit. </h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit repellendus praesentium eos magni incidunt eaque aut non, dicta sed ex optio saepe, et quibusdam fugiat ratione assumenda. Beatae, deserunt!</p>
                </div>
                <div className="bg-lamaYellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum dolor sit. </h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi aperiam, aliquam commodi ipsam ut quaerat ullam ab officiis quod voluptas amet, dolorem laudantium sunt ea alias iste? Voluptas, obcaecati corrupti.</p>
                </div>
            </div>
        </div>
    )
}