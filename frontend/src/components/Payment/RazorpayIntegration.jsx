export default function RazorpayIntegration({ amount }) {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "QueueAway",
          description: "Test Payment",
          handler: (response) => {
            alert(`Payment ID: ${response.razorpay_payment_id}`);
          },
        };
        new window.Razorpay(options).open();
      };
      document.body.appendChild(script);
    };
  
    return (
      <div>
        <button onClick={loadRazorpay}>Pay ₹{amount}</button>
        <button>Cash on Delivery</button>
      </div>
    );
  }