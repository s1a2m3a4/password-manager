
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // For toggling password visibility
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copytext = (text) => {
    toast("COPIED TO CLIPBOARD", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle visibility state
  };

  const savepassword = () => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
    toast("Password saved", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  } else {
    toast("Error: Password is not saved", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  }
  
  };

  const deletepassword = (id) => {
    console.log("deleting password with id", id);
    let c = confirm("do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter(item => item.id !== id))
      );
    }
  };

  const editpassword = (id) => {
    console.log("editing password with id", id);
    setform(passwordArray.filter(i => i.id === id)[0]);
    setpasswordArray(passwordArray.filter(item => item.id !== id));
 
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div class="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className=" p-2 md:p-0 md:mycontainer">
        <h1 className="text-3xl font-bold text-center ">
          <span className="text-green-600"> &lt;</span>
          <span>PASSWORD</span>
          <span className="text-green-600">manager/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center ">
          YOUR OWN PASSWORD MANAGER
        </p>
        <div className="flex flex-col p-4 text-black gap-5 items-center ">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-600 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />

          <div className=" flex flex-col md:flex-row w-full justify-between gap-4">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter username"
              className="rounded-full border border-green-600 w-full p-4 py-1"
              type="text"
              id="username"
              name="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handlechange}
                placeholder="Enter Password"
                className="rounded-full border border-green-600 w-full p-4 py-1"
                type={isPasswordVisible ? "text" : "password"} // Toggles between text and password
                id="password"
                name="password"
              />
              <span
                className="absolute right-0 cursor-pointer"
                onClick={showPassword}
              >
                <i
                  ref={ref}
                  className={`fa-solid ${isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                    } p-3 py-2`}
                ></i>
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex justify-center  items-center  gap-2 bg-green-500 rounded-full px-2 py-2 w-fit hover:bg-green-400 border-2 border-green-950"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zpwnkfbk.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords To show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center  ">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className=" copy  cursor-pointer "
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >

                            <i class="fa-solid fa-copy ml-2 "></i>
                          </div>
                        </div>
                      </td>

                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                        <div
                          className="  copy cursor-pointer "
                          onClick={() => {
                            copytext(item.username);
                          }}
                        >
                          <i class="fa-solid fa-copy ml-2 "></i>
                        </div>
                        </div>
                      </td>

                      <td className=" py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div
                          className=" copy cursor-pointer"
                          onClick={() => {
                            copytext(item.password);
                          }}
                        >
                         
                          <i class="fa-solid fa-copy ml-2 "></i>
                        </div>
                        </div>
                      </td>

                      <td className="justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editpassword(item.id)
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </span>

                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletepassword(item.id)
                          }}
                        >
                          <i class="fa-regular fa-trash-can"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
