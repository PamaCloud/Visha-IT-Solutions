import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Enquiry from "@/lib/models/Enquiry";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const query: any = {};
    if (type && type !== "all") {
      query.type = type;
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: enquiries,
    });
  } catch (error: any) {
    console.error("Failed to fetch enquiries:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
