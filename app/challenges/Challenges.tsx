import Challenge, {Challenge as ChallengeObj} from '@/app/challenges/Challenge';


export default function Challenges() {
    return (
        <div className="flex-grow flex flex-col gap-3">
            {dummyChallenges.map((c) => (
                <Challenge
                    {...c}
                    key={c.name}
                />
            ))}
        </div>
    )
}

const dummyChallenges: ChallengeObj[] = [{
    name: 'C jail',
    category: 'misc',
    desc: 'I see jail...',
    solves: 135,
    points: 286
}, {
    name: 'C jail II',
    category: 'misc',
    desc: '...and I eat it!',
    solves: 47,
    points: 437
}, {
    name: 'vivan-jail',
    category: 'web',
    desc: 'Can you believe he actually did this on his actual, real life homework? Isn\'t that just a little wild?',
    solves: 124,
    points: 328
}, {
    name: 'yet-another-csp',
    category: 'web',
    desc: 'You know the drill.',
    solves: 3,
    points: 499
}, {
    name: 'math',
    category: 'crypto',
    desc: 'For this challenge, you will be doing math.',
    solves: 10,
    points: 497
}, {
    name: 'wasm-decomp-3',
    category: 'rev',
    desc: 'WASM decompiler? I hardly know her!',
    solves: 58,
    points: 477
}, {
    name: 'oxidized',
    category: 'pwn',
    desc: 'rust',
    solves: 13,
    points: 496
}]