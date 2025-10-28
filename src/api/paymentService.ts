import axiosInstance from "@/api/axiosInstance";

interface PaymentOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status?: string;
}

export const createPaymentOrder = async (amount: number): Promise<PaymentOrderResponse> => {
  try {
    const response = await axiosInstance.post<PaymentOrderResponse>(
      "/payments/create-order",
      { amount }
    );

    if (!response.data || !response.data.id) {
      throw new Error("Invalid response: Order ID not found");
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ createPaymentOrder error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to create Razorpay order"
    );
  }
};
