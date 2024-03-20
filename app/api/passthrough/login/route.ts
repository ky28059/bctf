import {NextResponse} from 'next/server';
import {login} from '@/util/users';


// TODO: error handling?
export async function POST(req: Request) {
    const {teamToken} = await req.json();
    const token = await login(teamToken);
    return NextResponse.json(token);
}
