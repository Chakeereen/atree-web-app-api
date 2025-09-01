'use server'

const baseUrl = process.env.API_URL as string;

// ✅ Create Table
export const createTableNoAction = async (prevState: any, formData: FormData) => {
  try {
    const locationDetail = formData.get("locationDetail") as string;

    if (!locationDetail) {
      return { message: "locationDetail is required", success: false };
    }

    const response = await fetch(`${baseUrl}/api/admin/table`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locationDetail }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to create Table", success: false };
    }

    const newTable = await response.json();
    return { message: "Table created successfully", success: true, data: newTable };
  } catch (error) {
    console.error("createTableAction error:", error);
    return { message: "Internal Server Error", success: false };
  }
};

// ✅ Edit Table
export const editTableNoAction = async (prevState: any, formData: FormData) => {
  try {
    const tableNo = formData.get("tableNo") as string;
    const locationDetail = formData.get("locationDetail") as string;

    if (!tableNo || !locationDetail) {
      return { message: "tableNo and locationDetail are required", success: false };
    }

    const response = await fetch(`${baseUrl}/api/admin/table/${tableNo}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locationDetail }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to update Table", success: false };
    }

    const updatedTable = await response.json();
    return { message: "Table updated successfully", success: true, data: updatedTable };
  } catch (error) {
    console.error("editTableAction error:", error);
    return { message: "Internal Server Error", success: false };
  }
};

// ✅ Delete Table
export const deleteTableNoAction = async (tableNo: number) => {
  try {
    if (!tableNo) {
      return { message: "tableNo is required", success: false };
    }

    const response = await fetch(`${baseUrl}/api/admin/table/${tableNo}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to delete Table", success: false };
    }

    return { message: "Table deleted successfully", success: true };
  } catch (error) {
    console.error("deleteTableAction error:", error);
    return { message: "Internal Server Error", success: false };
  }
};

// ✅ Get all Tables
export const getTableNoAll = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/admin/table`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Failed to fetch Tables", data: [] };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("getTableAll error:", error);
    return { success: false, error: "Internal Server Error", data: [] };
  }
};
