"use server";

import { signIn } from "@/lib/auth";
import { LOGIN_TYPE } from "@/utils/types";
import { gql } from "graphql-request";
import { getClient } from "../libs/graphql-client";

export async function login(data: LOGIN_TYPE) {
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

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    console.log(error);

    const message = (error as { response: { errors: { message: string }[] } })
      .response.errors[0].message;

    return {
      status: "error",
      message: message,
    };
  }
}
