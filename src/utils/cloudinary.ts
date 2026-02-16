export const optimizeCloudinaryUrl = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  // If already optimized, return as is
  if (url.includes("f_auto,q_auto")) return url;

  // Insert optimization params after "upload/"
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
};
