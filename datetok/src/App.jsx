import { useState } from "react";

export default function DateInviteApp() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("");

  const whatsappNumber = "27760288387";

  // 🔥 Google Sheets Web App URL (replace after deployment)
  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxZAJG3p7Mz5r4SU7CvK7ycSrsg7uGEqf36N_fYT-dnK7lp7RT5boZzp8-Zj58uInTn/exec";

  const sendToWhatsApp = async () => {
    if (!selectedRestaurant || !selectedDate) {
      alert("Pick a restaurant and a date first 😌");
      return;
    }

    const message = `Hey ❤️ I choose ${selectedRestaurant} on ${selectedDate} 😌`;

    // 1. Save to Google Sheets (no backend needed)
    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant: selectedRestaurant,
          date: selectedDate,
          message,
          timestamp: new Date().toISOString()
        })
      });

      setStatus("Saved to Google Sheets ✅");
    } catch (err) {
      setStatus("Failed to save ❌ (check Apps Script)");
    }

    // 2. Open WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const restaurants = [
    {
      name: "Sushi Night 🍣",
      vibe: "Cute sushi date with mocktails",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Burger Spot 🍔",
      vibe: "Messy burgers + milkshakes",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Fancy Dinner 🍷",
      vibe: "Dress up and act rich for a night",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dessert Date 🍰",
      vibe: "Cake, waffles, and soft life",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const dates = [
    "Saturday Afternoon ☀️",
    "Saturday Night ✨",
    "Sunday Chill 🌸",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HEADER */}
      <div className="fixed top-0 w-full z-50 flex justify-center py-4 bg-black/60 backdrop-blur-md">
        <h1 className="text-2xl font-bold">DateTok ❤️</h1>
      </div>

      {/* INTRO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500">
        <div className="text-6xl animate-bounce mb-4">❤️</div>

        <h1 className="text-5xl font-extrabold mb-4">Hey Miss Rorii 👀</h1>

        <p className="text-lg max-w-md opacity-90 mb-8">
          We've been through a lot lately... wanna go on a date and de-stress?
        </p>

        <button className="bg-white text-black px-8 py-4 rounded-full font-bold">
          Scroll ↓
        </button>
      </section>

      {/* RESTAURANTS */}
      {restaurants.map((spot, index) => (
        <section key={index} className="h-screen relative">

          <img src={spot.image} className="absolute w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-0 p-6 w-full">

            <h2 className="text-4xl font-bold">{spot.name}</h2>
            <p className="opacity-80 mb-4">{spot.vibe}</p>

            <div className="flex flex-wrap gap-3">
              {dates.map((date, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedRestaurant(spot.name);
                    setSelectedDate(date);
                  }}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedRestaurant === spot.name && selectedDate === date
                      ? "bg-white text-black"
                      : "bg-white/20"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

          </div>
        </section>
      ))}

      {/* FINAL */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-black">

        <div className="text-6xl mb-4">🥺</div>

        <h2 className="text-4xl font-bold mb-4">So… what do you say?</h2>

        <p className="opacity-70 mb-2">Pick your vibe above 👆</p>

        {status && (
          <p className="text-sm text-green-400 mb-3">{status}</p>
        )}

        <button
          onClick={sendToWhatsApp}
          className="bg-green-500 px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition"
        >
          Send on WhatsApp ❤️
        </button>

        <p className="mt-6 text-sm opacity-40">
          made with risky confidence 💀
        </p>

        {/* GOOGLE SHEETS SETUP */}
        <div className="mt-10 text-xs opacity-50 max-w-md">
          <p className="mb-2">📌 Google Sheets Setup:</p>
          <p>1. Go to Google Apps Script</p>
          <p>2. Paste this:</p>
          <pre className="whitespace-pre-wrap">{`function doPost(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.restaurant,
    data.date,
    data.message
  ]);

  return ContentService.createTextOutput("OK");
}`}</pre>
          <p>3. Deploy as Web App → paste URL into googleScriptUrl</p>
        </div>

      </section>

    </div>
  );
}
