import supabase from "./db";

const uploadFile = async (e) => {
  const file = e.target.files[0];
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${Math.floor(Math.random() * 1000)}-${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) console.log(error);
  return data.fullPath || null;
};

export default uploadFile;
