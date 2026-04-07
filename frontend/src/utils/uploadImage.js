const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dg54i84x2/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'unistay_preset';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export async function uploadImage(file) {

  if (!(file instanceof File)) {
    throw new Error('Arquivo de imagem inválido.');
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Formato inválido. Use JPG, PNG ou WEBP.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('A imagem deve ter no máximo 5MB.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  let response;

  try {
    response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new Error('Erro ao enviar imagem. Tente novamente.');
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error('Não foi possível processar a resposta do upload da imagem.');
  }

  if (!response.ok || !data?.secure_url) {
    throw new Error(data?.error?.message || 'Erro ao enviar imagem. Tente novamente.');
  }

  return data.secure_url;
}
