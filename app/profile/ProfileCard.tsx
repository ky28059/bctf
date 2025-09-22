import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import type { ProfileData } from '@/util/profile';
import type { Challenge } from '@/util/challenges';
import type { CTFConfig } from '@/util/config';

// Components
import ProfileStats from '@/app/profile/ProfileStats';

// Icons
import { FaAddressBook, FaTrophy } from 'react-icons/fa6';
import { MdBarChart } from 'react-icons/md';

// Utils
import { pluralize } from '@/util/strings';


type ProfileCardProps = ProfileData & {
    challs?: Challenge[] | null,
    config: CTFConfig
}
export default function ProfileCard(props: ProfileCardProps) {
    const divisionName = props.config.divisions[props.division];

    return (
        <div className="bg-black/30 pl-12 pr-12 lg:pr-4 py-8 rounded-md flex flex-col lg:flex-row">
            <div className="grow w-full">
                <h1 className="text-2xl font-bold border-b border-secondary pb-1 mb-4">
                    {props.name}
                </h1>

                <ProfileCardStatistic icon={FaTrophy}>
                    {props.score} total points
                </ProfileCardStatistic>
                <ProfileCardStatistic icon={MdBarChart}>
                    {props.divisionPlace ? (
                        `${pluralize(props.divisionPlace)} place in the ${divisionName} division`
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
                    {divisionName} division
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
