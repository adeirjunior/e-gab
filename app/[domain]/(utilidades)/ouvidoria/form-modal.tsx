"use client"

import {
  Button,
  Card,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Divider, Grid, TextInput } from "@tremor/react";

export default function FormModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Nome
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="first-name"
                      placeholder="Nome"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Sobrenome
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="last-name"
                      name="last-name"
                      autoComplete="last-name"
                      placeholder="Sobrenome"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Endereço
                    </label>
                    <TextInput
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      placeholder="Endereço"
                      className="mt-2"
                    />
                  </div>
                    <div className="col-span-full ">
                      <label
                        htmlFor="city"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                      >
                        Cidade
                      </label>
                      <TextInput
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        placeholder="Cidade"
                        className="mt-2"
                      />
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="state"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                      >
                        Estado
                      </label>
                      <TextInput
                        type="text"
                        id="state"
                        name="state"
                        autoComplete="address-level1"
                        placeholder="Estado"
                        className="mt-2"
                      />
                    </div>
                    <div className="col-span-full">                                                                                                                                                                                                                                                                                                                                         
                      <label
                        htmlFor="postal-code"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                      >
                        CEP
                      </label>
                      <TextInput
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        placeholder="CEP"
                        className="mt-2"
                      />
                    </div>

                  <Divider />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                 Fechar
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
                  Criar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen}>Criar Sala</Button>
    </>
  );
}