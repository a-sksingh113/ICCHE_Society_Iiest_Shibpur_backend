import Layout from "../../layout/Layout";

const changePassword = () => {
  return (
    <Layout>
     <div className="w-[80%] max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-36 text-xs sm:text-base">
  <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
    Change your Password
  </h2>
  <form action="">
    <label className="block mb-2 font-medium">Enter old password:</label>
    <input
      type="password"
      placeholder="Old Password"
      className="w-full border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
    />
    <label className="block mt-4 mb-2 font-medium">Enter new password:</label>
    <input
      type="password"
      placeholder="New Password"
      className="w-full border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
    />
    <div className="flex justify-center mt-6">
      <button
        type="submit"
        className="border-2 border-gray-600 py-2 px-5 rounded hover:bg-gray-600 hover:text-white transition"
      >
        Change Password
      </button>
    </div>
  </form>
</div>

    </Layout>
  );
};
export default changePassword;
