import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Test123() {
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const [logmessage, setLogmessage] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe2, setRememberMe2] = useState(false);

  useEffect(() => {
    const savedAdminID = localStorage.getItem("adminID");
    const savedRememberMe2 = localStorage.getItem("rememberMe2");

    if (savedRememberMe2 === "true" && savedAdminID) {
      setAdminID(savedAdminID);
      setRememberMe2(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/HealerZ/PHP/Testlogin.php", {
        adminID: adminID,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        const message = response.data.message;

        if (message === "Login successful.") {
          toast.success(message);

          if (rememberMe2) {
            localStorage.setItem("adminID", adminID);
            localStorage.setItem("rememberMe2", "true");
          } else {
            localStorage.removeItem("adminID");
            localStorage.removeItem("rememberMe2");
          }

          const userRole = response.data.role;

          switch (userRole) {
            case "doctor":
              sessionStorage.setItem("doctor", true);
              sessionStorage.setItem("role", userRole);
              navigate("/doctor");
              break;
            case "pharmacist":
              sessionStorage.setItem("pharmacist", true);
              sessionStorage.setItem("role", userRole);
              navigate("/inventory-interface/dashboard");
              break;
            case "admin":
              sessionStorage.setItem("admin", true);
              sessionStorage.setItem("role", userRole);
              navigate("/admin/dashboard");
              break;
            default:
              // Handle other roles or provide a default redirection
              break;
          }
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        toast.error("Login failed.");
      });
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card border-0 shadow loginncardpos">
              <div className="card-header bg-white text-center logoaddinglogin">
                <AdminPanelSettingsIcon
                  className="loginiconlogin"
                  sx={{ fontSize: "40px" }}
                />
                <h3>Login | Admin</h3>
              </div>
              <div className="card-body">
                <form action="" className="py-2">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="D0001"
                      value={adminID}
                      onChange={(e) => setAdminID(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Admin ID</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {password && (
                      <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <div className="search-icon">
                            <VisibilityOffIcon />
                          </div>
                        ) : (
                          <div className="search-icon">
                            <VisibilityIcon />
                          </div>
                        )}
                      </span>
                    )}
                  </div>
                  <div
                    className="form-check mb-3"
                    style={{ marginTop: "15px" }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMeCheckbox"
                      checked={rememberMe2}
                      onChange={() => setRememberMe2(!rememberMe2)}
                    />
                    <label
                      className="form-check-label remmberme"
                      htmlFor="rememberMeCheckbox"
                    >
                      Remember Me !
                    </label>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn text-white shadow btn-gr mt-3 w-100"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(75, 20, 141, 1) 0%, rgba(224, 64, 253, 1) 100%)",
                      }}
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
