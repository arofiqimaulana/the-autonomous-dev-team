import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>E-Commerce Home Page</h1>
      <p style={{ maxWidth: "600px", lineHeight: "1.6", color: "#4b5563" }}>
        Welcome to our demo e-commerce store! Browse our incredible selection of products.
        If you have any questions, our support team is ready to help you instantly. Just use the
        chat widget in the bottom right corner of the screen.
      </p>
      
      {/* Mock store items */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
        {[1, 2, 3].map((item) => (
          <div key={item} style={{ width: "250px", height: "300px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ width: "100%", height: "150px", backgroundColor: "#f3f4f6", borderRadius: "4px", marginBottom: "1rem" }}></div>
            <h3 style={{ fontWeight: "600" }}>Premium Item {item}</h3>
            <p style={{ color: "#3b82f6", fontWeight: "bold", marginTop: "0.5rem" }}>$99.99</p>
          </div>
        ))}
      </div>
      
      {/* Inject Chat Widget */}
      <ChatWidget />
    </main>
  );
}
