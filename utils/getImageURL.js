const exportImageURL = (image) => {
  if (!image) return `https://eu.ui-avatars.com/api/?name=No+Image&size=250`;
  if (image?.startsWith("http")) return image;
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`;
};

export default exportImageURL;
