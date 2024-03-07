import type {ProfileData} from '@/util/profile';
import ProfileCard from '@/app/profile/ProfileCard';


export default function Profile(props: ProfileData) {
    // TODO: solves

    return (
        <div className="container pt-32 pb-24 flex flex-col gap-4">
            <ProfileCard {...props} />
        </div>
    )
}
