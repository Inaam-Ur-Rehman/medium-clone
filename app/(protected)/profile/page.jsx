"use client";
import supabase from "@/utils/db";
import uploadFile from "@/utils/uploadFile";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getImageURL from "@/utils/getImageURL";
import prisma from "@/utils/prisma";
import { useSession } from "next-auth/react";
import { useUser } from "@clerk/nextjs";
import { getProfile, updateProfile } from "@/utils/actions/user.actions";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
  });

  useEffect(() => {
    (async () => {
      const data = await getProfile(user?.id);
      if (data) {
        setFormData({
          bio: data.bio,
          website: data.webiste,
        });
      }
    })();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateProfile(user?.id, {
      bio: formData.bio,
      website: formData.website,
    });
    if (data) {
      alert("Profile updated");
      router.replace("/dashboard");
    }
  };

  return (
    <div className="px-4 mt-12 max-w-7xl max-auto">
      <p className="text-xl font-bold">Hello, {user?.family_name}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {formData?.avatar && (
            <button
              type="button"
              className="block mx-auto mt-4 max-w-max"
              onClick={() =>
                setFormData({
                  ...formData,
                  avatar: "",
                })
              }
            >
              Remove Image
            </button>
          )}
          <textarea
            className="w-full h-32 p-4 mt-4 border rounded-md"
            cols={4}
            rows={4}
            value={formData.bio}
            placeholder="Enter your bio"
            onChange={(e) =>
              setFormData({
                ...formData,
                bio: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="w-full p-4 mt-4 border rounded-md"
            placeholder="Enter your website"
            value={formData.website}
            onChange={(e) =>
              setFormData({
                ...formData,
                website: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white rounded-md bg-theme-green"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
