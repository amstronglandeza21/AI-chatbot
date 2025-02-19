const API_URL = "https://dd5492ef-e4a7-43eb-89b5-645b1376e368-00-2zlai65y1tkxy.pike.replit.dev";

export const sendMessageToChatbot = async (prompt: string) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.response; // Assuming the backend returns { response: "AI's response" }
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Something went wrong. Try again."; // Custom error message
  }
};
