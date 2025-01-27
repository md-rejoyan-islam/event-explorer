import { getClient } from "@/app/libs/graphql-client";
import { LOGIN_TYPE, REGISTER_TYPE } from "@/utils/types";
import { gql } from "graphql-request";

export const userRegister = async (data: REGISTER_TYPE) => {
  try {
    const client = getClient();

    await client.request(
      gql`
        mutation UserRegister($registerData: userRegisterType!) {
          user: userRegister(registerData: $registerData) {
            name
            email
            password
            role
          }
        }
      `,
      { registerData: data }
    );
    return {
      status: "success",
      message: "User registered successfully",
    };
  } catch (error) {
    const message = (error as { response: { errors: { message: string }[] } })
      .response.errors[0].message;

    return {
      status: "error",
      message: message,
    };
  }
};
export const userLogin = async (data: LOGIN_TYPE) => {
  try {
    const client = getClient();
    await client.request(
      gql`
        mutation UserLogin($loginData: userLoginType!) {
          user: userLogin(loginData: $loginData) {
            token
          }
        }
      `,
      { loginData: data }
    );
    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    const message = (error as { response: { errors: { message: string }[] } })
      .response.errors[0].message;

    return {
      status: "error",
      message: message,
    };
  }
};
