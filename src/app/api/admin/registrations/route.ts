import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import LeadRegistration from "@/lib/models/LeadRegistration";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const userType = searchParams.get("userType");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: any = {};

    if (userType && userType !== "all") {
      query.userType = userType;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { fullName: regex },
        { email: regex },
        { phone: regex },
        { companyName: regex },
        { industry: regex },
      ];
    }

    const registrations = await LeadRegistration.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Summary counts
    const totalCount = await LeadRegistration.countDocuments();
    const clientCount = await LeadRegistration.countDocuments({ userType: "client" });
    const candidateCount = await LeadRegistration.countDocuments({ userType: "candidate" });
    const newCount = await LeadRegistration.countDocuments({ status: "new" });

    return NextResponse.json({
      success: true,
      data: registrations,
      counts: {
        total: totalCount,
        client: clientCount,
        candidate: candidateCount,
        new: newCount,
      },
    });
  } catch (error: any) {
    console.error("Failed to fetch registrations:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
