import { Link } from "react-router";
import icon from "../assets/Navbar/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import useConstStore from "../store/constStore";

function ForgetPassword() {
  const [userId, setUserId] = useState("");
  const { baseUrl } = useConstStore();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}submitForgetPassword`, {
        user_id: userId,
        url: "https://u2uglobal.xyz/resetpassword",
      });
      console.log(response)
      if (response.data.status == 200) {
        setUserId("");
        alert("Email sent successfully. Please check your email.");
      }
    } catch (err) {
      alert(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center  bg-black ">
      <div className="bg-white shadow-xl p-4 max-w-100 rounded-xl">
        <img src={icon} alt="Logo" className="w-7 mx-auto my-3" />
        <div className="text-sm text-center">
          Too keep connected with us please login with your personal information
          by email address and password.
        </div>

        <div
          className="flex border-gray-400 rounded border items-center mt-3  px-3 py-2 text-lg gap-3 
             bg-white"
        >
          <FaRegUser className="text-gray-500" />
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User Id"
            className="w-full bg-transparent focus:outline-none font-semibold text-gray-700"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-white w-full my-3 bg-[#38C66C] font-semibold py-2 rounded cursor-pointer border border-black hover:border-amber-400 transition ease-in-out duration-300"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link
            to="/signin"
            className="font-bold hover:text-[#A32A91] transition ease-in-out duration-300 underline"
          >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
