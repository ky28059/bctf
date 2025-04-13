import type { ReactNode } from 'react';
import SectionHeader from '@/components/SectionHeader';


export default function Prizes() {
    const openDivisionPrizes = ['$600', '$300', '$100'];

    return (
        <>
            <SectionHeader id="prizes">
                Prizes
            </SectionHeader>

            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <PrizeTable division="Open">
                    {openDivisionPrizes.map((p, i) => (
                        <div className="table-row bg-black/20 divide-x divide-secondary" key={i}>
                            <div className="table-cell p-2 border-t border-secondary text-right">{i + 1}.</div>
                            <div className="table-cell px-4 py-2 border-t border-secondary">{p}</div>
                        </div>
                    ))}
                </PrizeTable>
            </div>

            <p className="mb-3">
                There will also be a $100 prize for the top 5 challenge writeups submitted after the competition.
            </p>

            <p className="text-sm text-primary">
                Prize transfers can only be arranged with entities in the United States.
            </p>
        </>
    )
}

function PrizeTable(props: { children: ReactNode, division: string }) {
    return (
        <div className="table w-full text-sm border border-secondary">
            <div className="table-header-group">
                <div className="table-row bg-black/40 font-semibold text-primary divide-x divide-secondary">
                    <div className="table-cell p-2 w-12 text-right">#</div>
                    <div className="table-cell px-4 py-2">
                        {props.division} division prizes
                    </div>
                </div>
            </div>

            {props.children}
        </div>
    )
}
