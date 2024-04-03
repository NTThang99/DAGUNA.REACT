import { useState, useEffect } from 'react';


const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa ở đây
    const checkLoginStatus = () => {
      const userLocal = JSON.parse(localStorage.getItem('user'));
      setUser(userLocal);
    };

    checkLoginStatus();
  }, []);

  const login = () => {
    // Thực hiện logic đăng nhập ở đây
    // Ví dụ: Cài đặt trạng thái đăng nhập trong local storage hoặc cookie
     const userLocal = JSON.parse(localStorage.getItem('user'));
      setUser(userLocal);
  };

  const logout = () => {
    // Thực hiện logic đăng xuất ở đây
    // Ví dụ: Xóa trạng thái đăng nhập trong local storage hoặc cookie
    localStorage.removeItem("user");
    setUser(null);
  };
  const hasAnyRole = (role, authority)=>{
    for(let i =0 ;i <authority.length;i++){
        if(authority[i] === role){
            return true;
        }
    }
    return false;
}

  return { user, login, logout, hasAnyRole };
};

export default useAuth;