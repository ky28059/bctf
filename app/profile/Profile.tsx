import type {ProfileData} from '@/util/profile';
import ProfileCard from '@/app/profile/ProfileCard';
import ProfileSolves from '@/app/profile/ProfileSolves';


export default function Profile(props: ProfileData) {
    return (
        <div className="flex flex-col gap-4 flex-grow">
            <ProfileCard {...props} />
            <ProfileSolves {...props} />
        </div>
    )
}
