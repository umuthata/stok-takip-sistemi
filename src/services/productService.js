const SHEETDB_ENDPOINT = "https://sheetdb.io/api/v1/zymjeozltx08l";
const HEADERS = { "Content-Type": "application/json" };

// Tüm ürünleri getir
export const getAllProducts = async () => {
  const response = await fetch(`${SHEETDB_ENDPOINT}`);
  const json = await response.json();
  return json;
};

// Barkoda göre ürün getir
export const getProductByBarcode = async (barcode) => {
  const response = await fetch(`${SHEETDB_ENDPOINT}/search?barkodu=${barcode}`);
  const json = await response.json();
  if (json.length === 0) throw new Error("Ürün bulunamadı");
  return json[0];
};

// Ürün ekle
export const addProduct = async (productData) => {
  const response = await fetch(SHEETDB_ENDPOINT, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ data: [productData] }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("SheetDB HATASI:", err);
    throw new Error("Ürün eklenemedi");
  }

  return await response.json();
};

// Ürün güncelle (eski barkoddan silip yeni veriyi ekliyoruz)
export const updateProduct = async (eskiBarkod, yeniVeri) => {
  await deleteProduct(eskiBarkod); // Eski barkodu kullanarak sil
  return await addProduct(yeniVeri); // Yeni barkodlu ürünü ekle
};

// Ürün sil (barkoda göre)
export const deleteProduct = async (barkodu) => {
  const response = await fetch(`${SHEETDB_ENDPOINT}/barkodu/${barkodu}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Ürün silinemedi");
  return await response.json();
};
