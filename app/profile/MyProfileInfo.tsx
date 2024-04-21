import type { MyProfileData } from '@/util/profile';

// Components
import TeamInvite from '@/app/profile/TeamInvite';
import UpdateInformation from '@/app/profile/UpdateInformation';

// Utils
import { getConfig } from '@/util/config';


/**
 * The sidebar of "my team" specific actions on the profile page.
 */
export default async function MyProfileInfo(props: MyProfileData) {
    const config = await getConfig();

    return (
        <aside className="flex flex-col gap-4 md:sticky top-32 w-full md:w-72 lg:w-80 xl:w-96 h-max flex-none">
            <TeamInvite token={props.teamToken} />
            <UpdateInformation
                {...props}
                config={config.data}
            />
        </aside>
    )
}
