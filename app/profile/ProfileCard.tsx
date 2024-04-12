import type {ReactNode} from 'react';
import type {IconType} from 'react-icons';
import type {ProfileData} from '@/util/profile';
import type {Challenge} from '@/util/challenges';

// Components
import ProfileStats from '@/app/profile/ProfileStats';

// Icons
import {FaAddressBook, FaTrophy} from 'react-icons/fa6';
import {MdBarChart} from 'react-icons/md';

// Utils
import {pluralize} from '@/util/strings';


export default function ProfileCard(props: ProfileData & {challs?: Challenge[] | null}) {
    return (
        <div className="bg-black/30 pl-12 pr-12 lg:pr-4 py-8 rounded-md flex flex-col lg:flex-row">
            <div className="flex-grow w-full">
                <h1 className="text-2xl font-bold border-b border-secondary pb-1 mb-4">
                    {props.name}
                </h1>

                <ProfileCardStatistic icon={FaTrophy}>
                    {props.score} total points
                </ProfileCardStatistic>
                <ProfileCardStatistic icon={MdBarChart}>
                    {props.divisionPlace ? (
                        `${pluralize(props.divisionPlace)} place in the ${props.division} division`
                    ) : (
                        'Unranked'
                    )}
                </ProfileCardStatistic>
                <ProfileCardStatistic icon={MdBarChart}>
                    {props.globalPlace ? (
                        `${pluralize(props.globalPlace)} place across all teams`
                    ) : (
                        'Unranked'
                    )}
                </ProfileCardStatistic>
                <ProfileCardStatistic icon={FaAddressBook}>
                    {props.division} division
                </ProfileCardStatistic>
            </div>

            {props.challs && (
                <ProfileStats
                    {...props}
                    challs={props.challs}
                />
            )}
        </div>
    )
}

type ProfileCardStatisticProps = {
    icon: IconType,
    children: ReactNode
}
function ProfileCardStatistic(props: ProfileCardStatisticProps) {
    const Icon = props.icon;

    return (
        <p className="flex gap-4 items-center mt-2 text-primary">
            <Icon className="text-lg flex-none" />
            {props.children}
        </p>
    )
}
