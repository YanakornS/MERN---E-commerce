import React, { useContext, useState, useEffect } from "react";
import { FaGoogle, FaGithub, FaFacebook, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Index = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");

  // ใช้ useEffect เพื่อให้แน่ใจว่าข้อมูลของ user ได้รับการโหลดก่อน
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setEmail(user.email || "No email provided");
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // ถ้าไม่มี user ก็แสดงข้อความ "กำลังโหลด"
  }

  return (
    <div>
       <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-100">
        <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <img
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
              className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              alt="Banner"
            />
            <div className="absolute  flex h-[97px] w-[97px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img
                className="h-full w-full rounded-full"
                src={photoURL} // ใช้ข้อมูลรูปโปรไฟล์จาก state
                alt="Avatar"
              />
            </div>
          </div>
          {/* Profile Info */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-l font-semibold text-gray-500">{email}</p>
          </div>
          <a href="/updateprofile" className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-full flex items-center gap-2 hover:bg-blue-600 transition">
              <FaEdit /> Edit Profile
            </a>
          <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                17
              </p>
              <p className="text-sm font-normal text-gray-600">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                9.7K
              </p>
              <p className="text-sm font-normal text-gray-600">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                434
              </p>
              <p className="text-sm font-normal text-gray-600">Following</p>
            </div>
          </div>
          <p className="font-normal text-navy-700 mt-4 mx-auto w-max">
          {/* Providers icon */}
          <div className="space-x-3 mt-3 flex justify-center items-center">
            <a
              href="https://accounts.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn rounded-full">
                <FaGoogle className="size-4" />
              </button>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn rounded-full">
                <FaFacebook className="size-4" />
              </button>
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn rounded-full">
                <FaGithub className="size-4" />
              </button>
            </a>
          </div>
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default Index;
