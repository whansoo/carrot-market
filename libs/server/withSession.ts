import { withIronSessionApiRoute } from "iron-session/next";


declare module "iron-session" {
    interface IronSessionData {
      user?: {
        id: number;
      }
    }
  }
  
  
  const cookieOptions = {
    cookieName: "carrotsession",
    password: "123126345645789461651418979gfdgdfgdfhshnsmmhmsmwwmmwmdfmdslnflsdnghhggf",
  };
  
  export function withApiSession(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
  }