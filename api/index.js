export default function handler(req, res) {
  if (req.url === "/health") {
    return res.status(200).json({ status: "API Gateway is running" });
  }

  if (req.url === "/") {
    return res.status(200).send("API Gateway Service is running 🚀");
  }

  return res.status(404).json({ error: "Route not found" });
}
