export type Challenge = {
    name: string,
    category: string,
    desc: string, // TODO?
    solves: number,
    points: number,
}
export default function Challenge(props: Challenge) {
    return (
        <div className="bg-black/50 px-6 py-4 rounded border border-tertiary">
            <div className="flex justify-between">
                <h3 className="font-semibold">
                    {props.category}/{props.name}
                </h3>

                <p className="text-theme-bright">
                    {props.solves} solves / {props.points} points
                </p>
            </div>

            <hr className="my-3 border-secondary" />

            <p className="text-sm">
                {props.desc} {/* TODO */}
            </p>

            <div className="flex mt-3 text-sm">
                <input
                    type="text"
                    className="rounded-l px-3 py-2 border border-primary flex-grow bg-black/30 placeholder:text-secondary"
                    placeholder="Flag"
                />
                <button
                    className="rounded-r py-2 px-3 border border-primary"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
