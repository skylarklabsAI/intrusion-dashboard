import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import api from "../services/api";
import TokenService from "../services/tokenService";

const cameraServiceBaseUrl = "https://prodserver.skylarklabs.ai";
const notificationServiceBaseUrl = "https://prodserver.skylarklabs.ai"; // [Todo] dont forgot to change notificationServiceBaseUrl in utils/webPush.js
const authServiceBaseUrl = "https://prodserver.skylarklabs.ai"; // [Todo] dont forgot to change baseURL in services/api.js

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cameraList, setCameraList] = React.useState([]);
  const [loadingCameras, setLoadingCameras] = React.useState([]);

  useEffect(() => {
    if (loading == true) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      api
        .post(`${authServiceBaseUrl}/auth/accounts/login/`, {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.access) {
            TokenService.setUser(response.data);
            window.location.pathname = "/";
          }
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err.response);
        });
    });
  };

  const register = async (data) => {
    console.log(data);
    const response = await api.post(
      `${authServiceBaseUrl}/auth/accounts/register/`,
      data
    );
    return response;
  };

  const get_camera_list = () => {
    return api.get(`${cameraServiceBaseUrl}/camera_app/camera/`);
  };

  const fetch_cameras = () => {
    console.log("fetching cameras...");
    get_camera_list()
      .then((response) => {
        console.log(response);
        setCameraList(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const add_camera = (data) => {
    return api.post(`${cameraServiceBaseUrl}/camera_app/camera/`, data);
  };

  const handleAddCamera = async (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      add_camera(data)
        .then((response) => {
          console.log(response);
          // -------- refetching cameras again -----------//
          fetch_cameras();
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          resolve(false);
        });
    });
  };

  const update_camera = (camera_id, data) => {
    var form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return api.patch(
      `${cameraServiceBaseUrl}/camera_app/camera/${camera_id}/`,
      form_data
    );
  };

  const handleUpdateCamera = (camId, data) => {
    return new Promise((resolve, reject) => {
      update_camera(camId, data)
        .then((response) => {
          // ---------- again fetching cameras ----------------//
          fetch_cameras();
          resolve(true);
        })
        .catch((err) => {
          console.log(err.message);
          resolve(false);
        });
    });
  };

  const delete_camera = (camera_id) => {
    console.log("deleting camera");
    var formData = new FormData();
    formData.append("camera_id", camera_id);
    return api.post(
      `${cameraServiceBaseUrl}/camera_app/camera/safe_delete/`,
      formData
    );
  };

  const handleDeleteCamera = (camId) => {
    return new Promise((resolve, reject) => {
      delete_camera(camId)
        .then((response) => {
          console.log("delete");
          console.log(response);
          // ---------- again fetching cameras ----------------//
          fetch_cameras();
          resolve(true);
        })
        .catch((err) => {
          console.log(err.response);
          resolve(false);
        });
    });
  };

  const handleAddService = (camera_id, service, config) => {
    console.log(config);
    return new Promise((resolve, reject) => {
      api
        .post(`${cameraServiceBaseUrl}/camera_app/services/add-service/`, {
          camera_id,
          service,
          args: config,
        })
        .then((response) => {
          console.log("delete");
          console.log(response);
          // ---------- again fetching cameras ----------------//
          HandleStreamUrlRefresh(camera_id);
          setLoadingCameras([camera_id, ...loadingCameras]);
          resolve(true);
        })
        .catch((err) => {
          console.log(err.response);
          resolve(false);
        });
    });
  };

  const fetch_camera_by_id = (id) => {
    console.log("fetching camera by id");
    return api.get(`${cameraServiceBaseUrl}/camera_app/camera/${id}/`);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const HandleStreamUrlRefresh = (camera_id) => {
    console.log("refreshing for streamurl");
    const data = {};
    const error = false;
    const i = 0;
    fetch_camera_by_id(camera_id)
      .then(async (res) => {
        console.log(res.data);
        data = res.data;
        while (data && !data["stream_url"] && error === false && i <= 20) {
          console.log("inside while");
          await sleep(3000);
          console.log("after sleep");
          fetch_camera_by_id(camera_id)
            .then((res) => {
              console.log(res.data);
              data = res.data;
            })
            .catch((err) => {
              console.log(err);
              error = true;
            });
          i += 1;
        }
        console.log("outside while");
        await sleep(7000); // wait for hls to run
        fetch_cameras();
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      })
      .finally(() => {
        const temp = loadingCameras.filter((cam) => {
          return cam !== camera_id;
        });
        setLoadingCameras(temp);
      });
  };

  const fetch_camera_services = (id) => {
    console.log("fetching camera services by cam_id");
    return api.get(
      `${cameraServiceBaseUrl}/camera_app/services/get-services/?id=${id}`
    );
  };

  const fetch_notifications = (url = "") => {
    return api.get(
      `${notificationServiceBaseUrl}/notifications/getnotification/${url}`
    );
  };

  const fetch_next_notifications = (url = "") => {
    return api.get(`${url}`);
  };

  const notification_resolve = (id) => {
    return api.put(
      `${notificationServiceBaseUrl}/notifications/resolve/${id}/`
    );
  };

  const notification_unresolve = (id) => {
    return api.put(
      `${notificationServiceBaseUrl}/notifications/unresolve/${id}/`
    );
  };

  const logout = () => {
    TokenService.removeUser();
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadingCameras,
        cameraList,
        login,
        register,
        fetch_cameras,
        handleAddCamera,
        handleUpdateCamera,
        handleDeleteCamera,
        handleAddService,
        fetch_camera_services,
        fetch_camera_by_id,
        fetch_notifications,
        fetch_next_notifications,
        notification_resolve,
        notification_unresolve,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function ProtectRoute(Component) {
  console.log("protect route called");

  return () => {
    // console.log("called");
    const { user, loading } = useAuth();
    useEffect(() => {
      if (loading) return;
      if (!user) window.location.pathname = "/login";
      console.log(user);
    }, [loading, user]);

    return <Component {...arguments} />;
  };
}

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
