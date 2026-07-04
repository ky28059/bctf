import SectionHeader from '@/components/SectionHeader';


export default function Rules() {
    return (
        <>
            <SectionHeader id="rules">
                Rules
            </SectionHeader>
            <ol className="list-decimal list-outside pl-6 space-y-2">
                <li>
                    During the competition, each person may only be a part of one team total, and only members of a
                    given team may assist in solving a challenge for that team.
                </li>
                <li>
                    Flags are of the format{' '}
                    <code className="bg-black/40 px-2 py-1 text-primary rounded">{'bctf{[ -~]+}'}</code>{' '}
                    unless otherwise noted on the challenge description. No brute-force guessing flags.
                </li>
                <li>
                    No flag or hint sharing. Do not solicit or accept hints or guidance from any person except through
                    official support channels.
                </li>
                <li>
                    Do not attempt to attack or interfere with other teams or any servers used in this competition that
                    are not explicitly designated for being hacked in a problem.
                </li>
                <li>
                    Do not perform any sort of online bruteforce against any of our systems.
                </li>
                <li>Learn as much as you can, and have a good time!</li>
                <li>Pay it forward.</li>
            </ol>
        </>
    )
}
