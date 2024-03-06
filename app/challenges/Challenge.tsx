export default function Challenge() {
    return (
        <div className="bg-black/30 px-6 py-4 rounded">
            <div className="flex justify-between">
                <h3 className="font-semibold">
                    web/foo
                </h3>

                <p className="text-theme-bright">
                    36 solves / 484 points
                </p>
            </div>

            <hr className="my-3"/>

            <p className="text-sm">
                The flag is in <code>flag.txt</code>, but there's a twist!!
            </p>

            <div className="flex mt-3 text-sm">
                <input
                    type="text"
                    className="rounded-l px-3 py-2 border flex-grow bg-black/30"
                    placeholder="Flag"
                />
                <button
                    className="rounded-r py-2 px-3 border"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
