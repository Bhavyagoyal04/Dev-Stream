import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

export async function syncUser(req, res) {
  try {
    const clerkId = req.auth().userId;
    console.log("SyncUser endpoint called for clerkId:", clerkId);
    const { emailAddresses, firstName, lastName, imageUrl } = req.auth().sessionClaims || {};

    if (!emailAddresses || (Array.isArray(emailAddresses) && emailAddresses.length === 0)) {
      console.warn("⚠️ Warning: emailAddresses is missing from sessionClaims. Make sure Custom Session Claims are configured in Clerk Dashboard.");
    }

    // Robust email extraction: handle both array of objects and raw string
    let email = "";
    if (Array.isArray(emailAddresses)) {
      email = emailAddresses[0]?.email_address || emailAddresses[0];
    } else if (typeof emailAddresses === "string") {
      email = emailAddresses;
    }

    const name = `${firstName || ""} ${lastName || ""}`.trim();

    console.log("Syncing user data:", { email, name, clerkId });

    if (!email) {
      // If email is STILL missing, we can't create a valid user in our DB
      return res.status(400).json({ 
        message: "Email is missing from Clerk session claims. Please check your Clerk dashboard configuration.",
        receivedClaims: req.auth().sessionClaims 
      });
    }

    // use upsert to avoid race conditions with Inngest functions
    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        clerkId,
        email,
        name,
        profileImage: imageUrl,
      },
      { new: true, upsert: true, runValidators: true }
    );

    console.log("Successfully synced user to MongoDB:", user._id);

    // ensure stream user is also synced synchronously
    await upsertStreamUser({
      id: user.clerkId.toString(),
      name: user.name,
      image: user.profileImage,
    });

    res.status(200).json({ user });
  } catch (err) {
    console.error("❌ syncUser error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
