// LocalStorage anahtarları
const USERS_STORAGE_KEY = "stok-takip-users";
const CURRENT_USER_KEY = "stok-takip-current-user";
const TOKEN_KEY = "stok-takip-token";

// Örnek kullanıcı oluştur (ilk çalıştırmada)
const initializeUsers = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (!users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
  }
};

// Kullanıcı kaydı
export const register = async (userData) => {
  initializeUsers();

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));

  // Kullanıcı adı kontrolü
  if (users.find((user) => user.username === userData.username)) {
    throw new Error("Bu kullanıcı adı zaten kullanılıyor");
  }

  // ID oluştur
  const newUser = {
    ...userData,
    id: Date.now().toString(),
    password: userData.password, // Gerçek uygulamada şifreleme yapılmalı!
  };

  // Kullanıcıyı kaydet
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Token oluştur (basit bir simülasyon)
  const token = `token_${newUser.id}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  return {
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
    },
  };
};

// Kullanıcı girişi
export const login = async (userData) => {
  initializeUsers();

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));

  // Kullanıcıyı bul
  const user = users.find((u) => u.username === userData.username);

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  // Şifre kontrolü
  if (user.password !== userData.password) {
    throw new Error("Geçersiz şifre");
  }

  // Token oluştur
  const token = `token_${user.id}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  // Giriş bilgisini sakla
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      id: user.id,
      username: user.username,
    })
  );
  localStorage.setItem(TOKEN_KEY, token);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};

// Mevcut kullanıcıyı kontrol et
export const getCurrentUser = () => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  if (!userJson) return null;
  return JSON.parse(userJson);
};

// Token kontrolü
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Çıkış yap
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
