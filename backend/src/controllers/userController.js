import User from "../models/User.js";

export async function syncUser(req, res) {
  try {
    const clerkId = req.auth().userId;
    const { emailAddresses, firstName, lastName, imageUrl } = req.auth().sessionClaims;

    const email = emailAddresses?.[0]?.emailAddress;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        name: `${firstName || ""} ${lastName || ""}`.trim(),
        profileImage: imageUrl,
      });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("syncUser error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
