import { verifyToken, extractAuthToken } from "./_lib/authHelper.ts";

// In-memory / production fallback storage for serverless runtime
let memoryMenuItems: any[] = [];

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Public menu list
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      items: memoryMenuItems,
      source: memoryMenuItems.length > 0 ? "server" : "initial",
    });
  }

  // Mutations require admin authentication
  const token = extractAuthToken(req);
  const auth = verifyToken(token);

  if (!auth.valid) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Admin authorization token required to modify menu.",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    if (req.method === "POST") {
      // Add or batch update menu
      if (Array.isArray(body.items)) {
        memoryMenuItems = body.items;
        return res.status(200).json({ success: true, count: memoryMenuItems.length });
      }
      if (body.item) {
        const newItem = { ...body.item, id: body.item.id || `item-${Date.now()}` };
        memoryMenuItems.push(newItem);
        return res.status(201).json({ success: true, item: newItem });
      }
      return res.status(400).json({ success: false, error: "Missing item data" });
    }

    if (req.method === "PUT") {
      // Update item
      const updatedItem = body.item || body;
      const idx = memoryMenuItems.findIndex((i) => i.id === updatedItem.id);
      if (idx >= 0) {
        memoryMenuItems[idx] = { ...memoryMenuItems[idx], ...updatedItem };
        return res.status(200).json({ success: true, item: memoryMenuItems[idx] });
      }
      memoryMenuItems.push(updatedItem);
      return res.status(200).json({ success: true, item: updatedItem });
    }

    if (req.method === "DELETE") {
      const id = req.query?.id || body?.id;
      if (!id) return res.status(400).json({ success: false, error: "Item ID required" });
      memoryMenuItems = memoryMenuItems.filter((i) => i.id !== id);
      return res.status(200).json({ success: true, deletedId: id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}
