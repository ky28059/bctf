import {NextRequest, NextResponse} from 'next/server';
import {getSolves} from '@/util/solves';


export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const offset = Number(req.nextUrl.searchParams.get('offset'));

    const res = await getSolves(params.id, offset);
    return NextResponse.json(res);
}
