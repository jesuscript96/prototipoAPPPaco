import { expenses, notifications, payrollAdvance } from "@/mock/paco-data";

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

export async function simulatePacoAction<T>(result: T, ms = 450) {
  await wait(ms);
  return result;
}

export async function getPacoNotifications() {
  await wait(300);
  return notifications;
}

export async function submitPayrollAdvance(amount = payrollAdvance.selected) {
  await wait(650);
  const commission = Math.round(amount * 0.08);
  return {
    ok: true,
    advance: {
      id: `adv-${Date.now()}`,
      amount,
      commission,
      net: amount - commission,
      status: "Confirmado",
      chargeDate: payrollAdvance.chargeDate,
    },
    expense: {
      id: `exp-${Date.now()}`,
      type: "Adelanto de nómina",
      amount,
      commission,
      period: "1Q junio",
      date: "Hoy",
      status: "Adeudo próximo",
    },
  };
}

export async function getExpensesWithMockAdvance(includeSubmitted: boolean) {
  await wait(350);
  if (!includeSubmitted) return expenses;
  return [
    { id: "exp-live", type: "Adelanto de nómina", amount: 1200, commission: 96, period: "1Q junio", date: "Hoy", status: "Confirmado en prototipo" },
    ...expenses,
  ];
}
