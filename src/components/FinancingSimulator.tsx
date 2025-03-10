"use client";

import { useState } from "react";
import { Card, TextInput, Button, NumberInput, Text, NumberFormatter } from "@mantine/core";

interface FinancingSimulatorProps {
  carPrice: number; // Preço do carro vindo da API ou componente pai
}

export default function FinancingSimulator({ carPrice }: FinancingSimulatorProps) {
  const [step, setStep] = useState(1); // Controla as etapas do formulário
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    cpf: "",
  });

  const [entryValue, setEntryValue] = useState(carPrice * 0.2); // Valor mínimo de entrada (20%)
  const [installments, setInstallments] = useState(36); // Prazo inicial (36 meses)

  // Taxa de juros fixa (exemplo)
  const interestRate = 0.015; // 1.5% ao mês

  // Cálculo das parcelas usando a fórmula do sistema Price
  const calculateInstallment = () => {
    const financedAmount = carPrice - entryValue;
    const monthlyRate = interestRate;
    const numerator = financedAmount * monthlyRate;
    const denominator = 1 - Math.pow(1 + monthlyRate, -installments);
    return denominator !== 0 ? (numerator / denominator).toFixed(2) : "0.00";
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
            required
          />
          <TextInput
            label="Celular"
            placeholder="(99) 99999-9999"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            required
            className="mt-3"
          />
          <TextInput
            label="E-mail"
            placeholder="exemplo@email.com"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            className="mt-3"
          />
          <TextInput
            label="CPF"
            placeholder="000.000.000-00"
            value={userData.cpf}
            onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
            required
            className="mt-3"
          />

          <Button fullWidth className="mt-6 bg-blue-600 text-white" onClick={() => setStep(2)}>
            Continuar
          </Button>
        </>
      ) : (
        <>
          <Text className="text-xl font-semibold mb-4">Simulação de Financiamento</Text>
          <Text className="text-gray-600">Valor do carro: <strong><NumberFormatter prefix="R$ " value={carPrice.toFixed(2)} thousandSeparator="." decimalScale={2} decimalSeparator="," /></strong></Text>

          <NumberInput
            hideControls
            label="Entrada"
            min={carPrice * 0.2}
            max={carPrice}
            value={entryValue}
            thousandSeparator="."
            decimalSeparator=","
            onChange={(value) => setEntryValue(value)}
            className="mt-3"
          />

          <Text className="mt-4 font-semibold">Escolha o prazo:</Text>
          <div className="flex gap-2 mt-2">
            {[12, 24, 36, 48, 60].map((months) => (
              <Button
                key={months}
                variant={installments === months ? "filled" : "outline"}
                className="px-4"
                onClick={() => setInstallments(months)}
              >
                {months}x
              </Button>
            ))}
          </div>

          <Text className="mt-4 text-lg font-semibold">
            Valor da parcela: <span className="text-blue-600"><NumberFormatter prefix="R$ " value={calculateInstallment()} thousandSeparator="." decimalScale={2} decimalSeparator="," /></span>
          </Text>

          <Button fullWidth className="mt-6 bg-green-600 text-white">
            Finalizar Simulação
          </Button>
        </>
      )}
    </div>
  );
}
