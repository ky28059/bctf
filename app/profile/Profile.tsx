import type {ProfileData} from '@/util/profile';
import ProfileCard from '@/app/profile/ProfileCard';
import ProfileSolves from '@/app/profile/ProfileSolves';


export default function Profile(props: ProfileData) {
    // TODO: funny stats

    return (
        <div className="container pt-32 pb-24 flex flex-col gap-4">
            <ProfileCard {...props} />
            <ProfileSolves {...props} />
        </div>
    )
}
