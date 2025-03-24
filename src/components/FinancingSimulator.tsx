"use client";

import { useState, useEffect } from "react";
import { TextInput, Button, NumberInput, Text, NumberFormatter } from "@mantine/core";
import { FaWhatsapp } from "react-icons/fa";
import Cookies from "js-cookie";
import WhatsappButton from "./WhatsappButton";
import { notifications } from "@mantine/notifications";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BiSolidErrorAlt } from "react-icons/bi";

interface FinancingSimulatorProps {
  carPrice: number;
  carId: string;
  onClose?: () => void; // Adicione esta linha
}

export default function FinancingSimulator({ carPrice, carId, onClose }: FinancingSimulatorProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    document: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    document: false,
  });

  const [isValid, setIsValid] = useState(false);
  const [entryValue, setEntryValue] = useState<number>(carPrice * 0.2);
  const [installments, setInstallments] = useState<number>(36);
  const interestRate = 0.015;

  // Funções de formatação com tratamento para valores vazios
  const formatPhone = (value: string) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})/, "$1-$2")
      .slice(0, 15);
  };

  const formatDocument = (value: string) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    const savedData = Cookies.get("financingUserData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserData({
          name: parsed.name || "",
          phone: parsed.phone || "",
          email: parsed.email || "",
          document: parsed.document || "",
        });
        setStep(1);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);

  useEffect(() => {
    const newErrors = {
      name: userData.name.trim() === "",
      phone: userData.phone.replace(/\D/g, "").length !== 11,
      email: !isValidEmail(userData.email),
      document: userData.document.replace(/\D/g, "").length !== 11,
    };

    setErrors(newErrors);
    setIsValid(!Object.values(newErrors).includes(true));
  }, [userData]);

  // Função segura para atualizar entryValue
  const handleEntryValueChange = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) || carPrice * 0.2 : value;
    setEntryValue(Math.max(carPrice * 0.2, Math.min(carPrice, numValue)));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/financing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          ...userData,
          entryValue,
          installments,
        }),
      });

      const json = await res.json();

      if (json.success) {
        notifications.show({
          title: "Sucesso!",
          message: "Solicitação enviada com sucesso!",
          color: "teal",
          icon: <IoCheckmarkSharp size="1.1rem" />,
        });
        if (onClose) onClose();
      } else {
        notifications.show({
          title: "Erro",
          message: json.error || "Erro ao enviar solicitação",
          color: "red",
          icon: <BiSolidErrorAlt size="1.1rem" />,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      notifications.show({
        title: "Erro",
        message: "Ocorreu um erro ao enviar a solicitação",
        color: "red",
        icon: <BiSolidErrorAlt size="1.1rem" />,
      });
    }
  };

  return (
    <div className="w-full mx-auto">
      {step === 1 ? (
        <>
          <Text className="text-xl font-semibold mb-4">Preencha seus dados</Text>

          <TextInput
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            error={errors.name ? "Campo obrigatório" : ""}
            required
          />

          <TextInput
            label="Celular"
            placeholder="(99) 99999-9999"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: formatPhone(e.target.value) })
            }
            error={errors.phone ? "Número inválido" : ""}
            required
            className="mt-3"
          />

          <TextInput
            label="E-mail"
            placeholder="exemplo@email.com"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            error={errors.email ? "E-mail inválido" : ""}
            required
            className="mt-3"
          />

          <TextInput
            label="CPF"
            placeholder="000.000.000-00"
            value={userData.document}
            onChange={(e) => setUserData({ ...userData, document: formatDocument(e.target.value) })}
            error={errors.document ? "CPF inválido" : ""}
            required
            className="mt-3"
          />

          <Button
            fullWidth
            disabled={!isValid}
            variant="light"
            onClick={() => {
              Cookies.set("financingUserData", JSON.stringify(userData), { expires: 7 });
              setStep(2);
            }}
            className="mt-4"
          >
            Continuar
          </Button>
        </>
      ) : (
        <>
          <Text className="text-xl font-semibold mb-4">Simulação de Financiamento</Text>

          <Text className="text-gray-600">
            Valor do carro: <strong>
              <NumberFormatter
                prefix="R$ "
                value={carPrice.toFixed(2)}
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
              />
            </strong>
          </Text>

          <NumberInput
            hideControls
            label="Entrada"
            min={carPrice * 0.2}
            max={carPrice}
            value={entryValue}
            onChange={handleEntryValueChange}
            thousandSeparator="."
            decimalSeparator=","
            className="mt-3"
          />

          <Text className="mt-4 font-semibold">Escolha o prazo:</Text>
          <div className="flex gap-2 mt-2">
            {[12, 24, 36, 48, 60].map((months) => (
              <Button
                key={months}
                variant={installments === months ? "filled" : "outline"}
                className="px-4"
                radius="xl"
                onClick={() => setInstallments(months)}
              >
                {months}
              </Button>
            ))}
          </div>

          <Text className="mt-4 text-lg font-semibold">
            Valor da parcela: <span className="text-blue-600">
              <NumberFormatter
                prefix="R$ "
                value={((carPrice - entryValue) * interestRate / (1 - Math.pow(1 + interestRate, -installments))).toFixed(2)}
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
              />
            </span>
          </Text>

          <WhatsappButton message="Olá! Gostaria de saber mais sobre o financiamento." />

          <Button
            variant="outline"
            fullWidth
            className="mt-2"
            onClick={handleSubmit}
          >
            Receber contato do time comercial
          </Button>
        </>
      )}
    </div>
  );
}