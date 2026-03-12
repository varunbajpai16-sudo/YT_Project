import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export default function SendFeedback() {
    const handleclick = ()=>{
        toast.success("Feedback Registered Succesfully")
        setTimeout(() => {
             navigate("/")
        },1000);
       
    }
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#181818] p-8 rounded-xl shadow-lg">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">Send Feedback</h1>
        <p className="text-gray-400 text-sm mb-6">
          Help us improve your experience. Tell us what went wrong or suggest improvements.
        </p>

        {/* Feedback Form */}
        <form className="flex flex-col gap-5">

          {/* Category */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Feedback Type
            </label>
            <select className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-white">
              <option>Bug / Issue</option>
              <option>Suggestion</option>
              <option>UI Problem</option>
              <option>Video Problem</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Describe your feedback
            </label>
            <textarea
              rows="5"
              placeholder="Tell us what happened..."
              className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:border-white"
            ></textarea>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Email (optional)
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-white"
            />
          </div>

          {/* Screenshot */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Upload Screenshot (optional)
            </label>
            <input
              type="file"
              className="w-full text-sm text-gray-400 file:bg-white file:text-black file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a]"
              onClick={()=>navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200"
              onClick={handleclick}
            >
              Send Feedback
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}