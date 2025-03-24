"use client";

import { useState, useEffect } from "react";
import { TextInput, Button, NumberInput, Text, NumberFormatter } from "@mantine/core";
import { FaWhatsapp } from "react-icons/fa";
import Cookies from "js-cookie";

interface FinancingSimulatorProps {
  carPrice: number;
}

export default function FinancingSimulator({ carPrice }: FinancingSimulatorProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    cpf: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    cpf: false,
  });

  const [isValid, setIsValid] = useState(false); // Estado para validar o formulário
  const [entryValue, setEntryValue] = useState(carPrice * 0.2);
  const [installments, setInstallments] = useState(36);
  const interestRate = 0.015; // 1.5% ao mês

  // Máscara para telefone (99) 99999-9999
  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})/, "$1-$2")
      .slice(0, 15);
  };

  // Máscara para CPF 999.999.999-99
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  // Validação de e-mail
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    const savedData = Cookies.get("financingUserData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed);
      setStep(1); // Começa no passo 1 preenchido
    }
  }, []);

  // Validação do formulário (roda quando os inputs mudam)
  useEffect(() => {
    const newErrors = {
      name: userData.name.trim() === "",
      phone: userData.phone.replace(/\D/g, "").length !== 11,
      email: !isValidEmail(userData.email),
      cpf: userData.cpf.replace(/\D/g, "").length !== 11,
    };

    setErrors(newErrors);
    setIsValid(!Object.values(newErrors).includes(true));
  }, [userData]);


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
            value={userData.cpf}
            onChange={(e) => setUserData({ ...userData, cpf: formatCPF(e.target.value) })}
            error={errors.cpf ? "CPF inválido" : ""}
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
            thousandSeparator="."
            decimalSeparator=","
            onChange={(value) => setEntryValue(value || carPrice * 0.2)}
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

          <Button fullWidth mt="md" color="green" leftSection={<FaWhatsapp />} className="bg-green-500 text-white font-semibold">
            Enviar WhatsApp
          </Button>

          <Button variant="outline" fullWidth className="mt-2">
            Receber contato do time comercial
          </Button>
        </>
      )}
    </div>
  );
}
