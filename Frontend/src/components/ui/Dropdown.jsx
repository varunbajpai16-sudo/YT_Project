import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {logout} from "../../features/auth/auth.slice"
export default function ProfileDropdown() {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth.user)
  const username = user?.username
  const email = user?.email
  const avatar = user?.avatar
   const navigate = useNavigate(); 
  return (
    <div className="w-80 bg-[#282828] text-white rounded-xl shadow-2xl p-2 text-sm">
      
      {/* Profile Section */}
      <div className="flex items-start gap-3 p-3">
        <div className="w-15 h-15 rounded-full flex items-center justify-center font-semibold text-lg">
         {avatar ? (
    <img
      src={avatar}
      alt="user"
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-15 h-15 rounded-full bg-gray-600 flex items-center justify-center">
      <p>Guest</p>
    </div>
  )}
        </div>
        <div>
          <p className="font-medium">{username}</p>
          <p className="text-gray-400 text-xs">{email}</p>
          <p className="text-blue-500 text-xs mt-1 cursor-pointer hover:underline">
            View your channel
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 my-2"></div>

      {/* Menu Items */}
      <div className="space-y-1">
        <MenuItem label="Google Account" />
        <MenuItem label="Switch account" />
        <MenuItem label="Sign Up"   onClick={() => navigate("/login")}  />
        <MenuItem label="Sign out" onClick={()=>{
          dispatch(logout())
          }}/>

        <div className="border-t border-gray-700 my-2"></div>

        <MenuItem label="YouTube Studio" onClick={()=>navigate("/channel")}/>
        <MenuItem label="Purchases and memberships" />
        <MenuItem label="Your data in YouTube" />

        <div className="border-t border-gray-700 my-2"></div>

        <MenuItem label="Appearance: Device theme" />
        <MenuItem label="Display language: British English" />
        <MenuItem label="Restricted Mode: Off" />
        <MenuItem label="Location: India" />
        <MenuItem label="Keyboard shortcuts" />

        <div className="border-t border-gray-700 my-2"></div>

        <MenuItem label="Settings" />
        <MenuItem label="Help" />
        <MenuItem label="Send feedback" />
      </div>
    </div>
  );
}

/* Reusable Menu Item */
function MenuItem({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2 rounded-lg hover:bg-[#3a3a3a] cursor-pointer transition-colors duration-150"
    >
      {label}
    </div>
  );
}