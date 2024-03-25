import SectionHeader from '@/components/SectionHeader';


export default function Rules() {
    return (
        <>
            <SectionHeader id="rules">
                Rules
            </SectionHeader>
            <ol className="list-decimal list-outside pl-6">
                <li>Have a good time!</li>
                <li>Learn as much as you can.</li>
                <li>Pay it forward.</li>
            </ol>
        </>
    )
}
