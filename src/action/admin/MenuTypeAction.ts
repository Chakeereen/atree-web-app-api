'use server'

const baseUrl = process.env.API_URL as string;


export const createMenuTypeAction = async (prevState: any, formData: FormData) => {
  try {
    // ดึงค่า name จาก FormData
    const name = formData.get("name") as string;

    if (!name) {
      return { message: "Name is required", success: false };
    }

    // เรียก API POST /admin/menutype
    const response = await fetch(`${baseUrl}/api/admin/menuType`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to create MenuType", success: false };
    }

    const newType = await response.json();

    // return object ตามที่ FormContainer ต้องการ
    return { message: "MenuType created successfully", success: true };
  } catch (error) {
    console.error("createMenuTypeAction error:", error);
    return { message: "Internal Server Error", success: false };
  }
};

export const editMenuTypeAction = async (prevState: any, formData: FormData) => {
  try {
    // ดึงค่า categoryId และ categoryName จาก FormData
    const categoryId = formData.get("TypeID") as string;
    const name = formData.get("name") as string;


    if (!categoryId || !name) {
      return { message: "Category ID and name are required", success: false };
    }

    // เรียก API PATCH /admin/menutype
    const response = await fetch(`${baseUrl}/api/admin/menuType/${categoryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to update MenuType", success: false };
    }

    const updatedType = await response.json();

    return { message: "MenuType updated successfully", success: true };
  } catch (error) {
    console.error("editMenuTypeAction error:", error);
    return { message: "Internal Server Error", success: false };
  }
};

export const deleteMenuTypeAction = async (categoryId: number) => {
  try {
    if (!categoryId) {
      return { message: "Category ID is required", success: false };
    }

    const response = await fetch(`${baseUrl}/api/admin/menuType/${categoryId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to delete MenuType", success: false };
    }

    return { message: "MenuType deleted successfully", success: true };
  } catch (error) {
    console.error("deleteMenuTypeAction error:", error);
    return { message: "Internal Server Error", success: false };
  }
};

export const getMenuTypeAll = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/admin/menuType`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Failed to fetch categories", data: [] };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("getMenuTypeAll error:", error);
    return { success: false, error: "Internal Server Error", data: [] };
  }
};
