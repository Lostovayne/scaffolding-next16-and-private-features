"use server";

import { revalidatePath } from "next/cache";

// Example Server Action
export async function createProductAction(formData: FormData) {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Creating product:", formData.get("name"));

  revalidatePath("/products");
  return { success: true };
}
