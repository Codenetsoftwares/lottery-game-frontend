import { toast } from "react-toastify";
import strings from "./constant/stringConstant";

export function getNoAuthCallParams(methodType, body) {
  const params = {
    method: methodType,
    headers: strings.applicationJSON,
  };
  switch (methodType) {
    case strings.GET:
      return params;
    case strings.POST:
      return { ...params, body: JSON.stringify(body) };
    default:
      return false;
  }
}

export async function getHeaderObject(accessToken, contentType) {
  try {
    if (accessToken) {
      return {
        ...contentType,
        authorization: `Bearer ${accessToken}`,
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
}

// getNoAuthCallParams private api call
export const getAuthCallParams = async (methodType, body) => {
  const store = JSON.parse(localStorage.getItem(strings.LOCAL_STORAGE_KEY));
  const accessToken = store?.admin?.accessToken;
  const params = {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
  };

  switch (methodType) {
    case "GET":
      return params;
    case "POST":
      return { ...params, body: JSON.stringify(body) };
    case "PUT":
      return { ...params, body: JSON.stringify(body) };

    default:
      return false;
  }
};

export async function makeCall(callName, callParams, isToast) {
  try {
    let call = await fetch(callName, callParams);
    let timeout = getTimeoutPromise();

    const response = await Promise.race([timeout, call]).catch((err) => {
      throw err;
    });

    const json = await response.json();
    if (json.responseCode === 401) {
      localStorage.clear();
      sessionStorage.setItem("sessionExpierd", true);
      window.location.href = "/home";
    }
    if (json.success === false) {
      toast.error(json.errMessage|| "An error occurred");
      return null;
    } else if (isToast && (json.success === true || json.code === 200)) {
      // will update after backend api will provide proper response structure
      toast.success(json.message || "Operation successful");
    }
   
    return json;
  } catch (error) {
 
    toast.error(error.message || "An error occurred");
    return null;
  }
}

export function getTimeoutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject({ error: true, message: "Timeout", success: false }),
      5000
    );
  });
}

//   export const checkStatus = async (error) => {
//     const navigate = useNavigate();
//     if (error.status === 403 || error.status === 401) {
//       localStorage.clear();
//        navigate(urls.landingViewPath);
//       return true;
//     } else return false;
//   };
