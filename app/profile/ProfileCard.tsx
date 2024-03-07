import type {ReactNode} from 'react';
import type {IconType} from 'react-icons';
import type {ProfileData} from '@/util/profile';

// Icons
import {FaTrophy} from 'react-icons/fa6';
import {MdBarChart} from 'react-icons/md';

// Utils
import {pluralize} from '@/util/strings';


export default function ProfileCard(props: ProfileData) {
    return (
        <div className="bg-black/30 px-12 py-8 rounded-md">
            <h1 className="text-2xl font-bold border-b border-secondary pb-1 mb-4">
                {props.name}
            </h1>

            <ProfileCardStatistic icon={FaTrophy}>
                {props.score} total points
            </ProfileCardStatistic>
            <ProfileCardStatistic icon={MdBarChart}>
                {pluralize(props.divisionPlace)} place in the {props.division} division
            </ProfileCardStatistic>
            <ProfileCardStatistic icon={MdBarChart}>
                {pluralize(props.globalPlace)} place across all teams
            </ProfileCardStatistic>
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
            <Icon className="text-lg" />
            {props.children}
        </p>
    )
}
