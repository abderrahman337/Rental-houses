
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import {  AccountCircleOutlined, BubbleChartOutlined, ChatBubbleOutline ,Home,PeopleAltOutlined ,  StarOutlineRounded, VillaOutlined } from "@mui/icons-material";
import dataProvider, { stringify } from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { AgentProfile, 
  Agent,
  AllProperties,
  CreateProperty,
  HomePage,
  Login,
  MyProfile,
  PropertyDetails,
  EditProperty,
  } from "pages";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;


      //save user to mongodb
      if(profileObj){
        const response = await fetch ('http://localhost:8080/api/v1/users', {
              method:'POST', 
              headers:{'Content-Type': 'application/json'},
              body : JSON.stringify({
                name : profileObj.name,
                email:profileObj.email,
                avatar : profileObj.picture
              })
        })
        const data = await response.json()

        if(response.status==200){
          localStorage.setItem(
            "User",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid : data._id
            })
          )  
        }else{
          return Promise.reject()

        }
      }
 
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("User");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "Properties",
              list : AllProperties, 
              show : PropertyDetails,
              create : CreateProperty,
              edit: EditProperty,
              icon : <VillaOutlined/>

            },
            {
              name: "Agents",
              list : Agent,
              show : AgentProfile,
              icon : <PeopleAltOutlined/>
              
            },
            {
              name: "Reviews ",
              list : Home,
              icon : <StarOutlineRounded/>
              
            },
            {
              name: "Messages ",
              list : PropertyDetails,
              icon : <BubbleChartOutlined/>
            },
            {
              name: "myprofile ",
              options :{label : 'MyProfile'},
              list : MyProfile, 
              icon: <AccountCircleOutlined/>
              
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage ={HomePage}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
