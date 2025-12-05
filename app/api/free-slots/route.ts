import { NextRequest, NextResponse } from "next/server";

// GET /api/free-slots?startDate=ms&endDate=ms&calendarId=optional
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const calendarId = searchParams.get("calendarId") || process.env.LEADCONNECTOR_CALENDAR_ID || "ox4vzVu2ifBgvyV2FUUs";

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Missing startDate or endDate" }, { status: 400 });
    }

    const apiKey = process.env.LEADCONNECTOR_API_KEY;
    const version = process.env.LEADCONNECTOR_VERSION || "2021-07-28";

    if (!apiKey) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const upstream = new URL(`https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots`);
    upstream.searchParams.set("startDate", startDate);
    upstream.searchParams.set("endDate", endDate);

    const res = await fetch(upstream.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        Version: version,
      },
      // Avoid Next cache for dynamic data
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Upstream error" }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
