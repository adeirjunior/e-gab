"use client";

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { ErrorMessage } from "../ErrorMessage";
import { ButtonContainerLg } from "../ButtonContainerLg";
import { Input } from "@nextui-org/react";

export const Step1 = () => {
  const {
    userData,
    setUserData,
    firstStepErrors,
  } = useNewUserSteps();

  const IsAnyError = (path: any) =>
    firstStepErrors.some((err: any) => err.path === path);

  return (
    <>
      <h4 onClick={() => console.log(firstStepErrors)}>Informações pessoais</h4>
      <p>Por favor forneça seu nome, email, e telefone.</p>
      <div>
        <div className="mb-5 flex flex-col">
          <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
            {firstStepErrors?.map((err: any, index: number) =>
              err.path === "name" ? (
                <ErrorMessage key={index} errMessage={err.message} />
              ) : null,
            )}
          </div>

          <Input
            value={userData.name}
            onChange={(e) =>
              setUserData({
                ...userData,
                name: e.target.value,
              })
            }
            label="Nome"
            variant="bordered"
            color={IsAnyError("name") ? "danger" : "default"}
            type="text"
            placeholder="João Paulo"
            id="name"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
            {firstStepErrors?.map((err: any, index: number) =>
              err.path === "email" ? (
                <ErrorMessage key={index} errMessage={err.message} />
              ) : null,
            )}
          </div>

          <Input
            value={userData.email}
            variant="bordered"
            label="Email"
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value,
              })
            }
            color={IsAnyError("email") ? "danger" : "default"}
            type="text"
            placeholder="joaopaulo@exemplo.com"
            id="email"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
            {firstStepErrors?.map((err: any, index: number) =>
              err.path === "tel" ? (
                <ErrorMessage key={index} errMessage={err.message} />
              ) : null,
            )}
          </div>

          <Input
            value={userData.tel}
            onChange={(e) =>
              setUserData({
                ...userData,
                tel: e.target.value,
              })
            }
            label="Telefone"
            variant="bordered"
            color={IsAnyError("tel") ? "danger" : "default"}
            type="number"
            placeholder="+55 11 955553333"
            id="phone"
          />
        </div>
        <ButtonContainerLg/>
      </div>

      {/* <div className="hidden w-full lg:flex lg:ite"></div> */}
    </>
  );
};
