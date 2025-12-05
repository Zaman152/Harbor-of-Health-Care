import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  patientLiaison: z.string().optional(),
  email: z.string().email(),
  countryCode: z.string(),
  phone: z.string(),
  postalCode: z.string().optional(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  message: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
    }

    const target = process.env.CONTACT_SUBMISSION_URL;
    if (!target) {
      // For local dev, don't fail hard; simulate success
      return NextResponse.json({ ok: true, simulated: true }, { status: 200 });
    }

    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ error: "Upstream rejected submission", status: res.status, body: text }, { status: 502 });
    }

    const data = await res.json().catch(() => ({ ok: true }));
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
