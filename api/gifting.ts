import { verifyToken, extractAuthToken } from "./_lib/authHelper.ts";

let memoryGifts: any[] = [];
let memoryGiftOrders: any[] = [];

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Public gift catalogue
  if (req.method === "GET") {
    const type = req.query?.type;
    if (type === "orders") {
      // Viewing gift orders requires authentication
      const token = extractAuthToken(req);
      const auth = verifyToken(token);
      if (!auth.valid) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
      }
      return res.status(200).json({ success: true, orders: memoryGiftOrders });
    }

    return res.status(200).json({
      success: true,
      items: memoryGifts,
    });
  }

  // POST: either public gift order placement or admin catalogue mutation
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    if (body.action === "place_gift_order") {
      const order = {
        id: `GIFT-${Math.floor(700 + Math.random() * 200)}`,
        ...body.order,
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      memoryGiftOrders.unshift(order);
      return res.status(201).json({ success: true, order });
    }

    // Mutations require admin authentication
    const token = extractAuthToken(req);
    const auth = verifyToken(token);

    if (!auth.valid) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: Admin authorization required to modify gifting catalogue.",
      });
    }

    if (req.method === "POST") {
      if (Array.isArray(body.items)) {
        memoryGifts = body.items;
        return res.status(200).json({ success: true, count: memoryGifts.length });
      }
      if (body.item) {
        const item = { ...body.item, id: body.item.id || `gift-${Date.now()}` };
        memoryGifts.push(item);
        return res.status(201).json({ success: true, item });
      }
    }

    if (req.method === "PUT") {
      const updatedItem = body.item || body;
      const idx = memoryGifts.findIndex((i) => i.id === updatedItem.id);
      if (idx >= 0) {
        memoryGifts[idx] = { ...memoryGifts[idx], ...updatedItem };
        return res.status(200).json({ success: true, item: memoryGifts[idx] });
      }
      memoryGifts.push(updatedItem);
      return res.status(200).json({ success: true, item: updatedItem });
    }

    if (req.method === "DELETE") {
      const id = req.query?.id || body?.id;
      memoryGifts = memoryGifts.filter((i) => i.id !== id);
      return res.status(200).json({ success: true, deletedId: id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}
