import type { ReactNode } from 'react';
import SectionHeader from '@/components/SectionHeader';


export default function Prizes() {
    const openDivisionPrizes = ['$300', '$150', '$50'];

    return (
        <>
            <SectionHeader id="prizes">
                Prizes
            </SectionHeader>

            <p className="mb-3">
                This year, there will be no prizes for regular CTF challenges :( However, we will have the following
                prizes for the top 3 scoring teams in our king-of-the-hill challenges:
            </p>

            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <PrizeTable label="KOTH">
                    {openDivisionPrizes.map((p, i) => (
                        <div className="table-row bg-black/20 divide-x divide-tertiary" key={i}>
                            <div className="table-cell p-2 border-t border-tertiary text-right text-primary">{i + 1}</div>
                            <div className="table-cell px-4 py-2 border-t border-tertiary">{p}</div>
                        </div>
                    ))}
                </PrizeTable>
            </div>

            <p className="mb-3">
                There will also be a $150 prize for the top 5 challenge writeups submitted after the competition.
            </p>

            <p className="text-sm text-primary">
                Prize transfers can only be arranged with entities in the United States.
            </p>
        </>
    )
}

function PrizeTable(props: { children: ReactNode, label: string }) {
    return (
        <div className="table w-full text-sm border border-secondary rounded-lg overflow-hidden">
            <div className="table-header-group">
                <div className="table-row bg-black/40 font-semibold text-primary divide-x divide-tertiary">
                    <div className="table-cell p-2 w-10 text-right">#</div>
                    <div className="table-cell px-4 py-2">
                        {props.label} prizes
                    </div>
                </div>
            </div>

            {props.children}
        </div>
    )
}
