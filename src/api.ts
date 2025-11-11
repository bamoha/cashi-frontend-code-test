import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { transactions } from "./database";

const PAGE_SIZE = 10;

const paginate = <T,>(array: T[], page = 1) => {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  return {
    items: array.slice(startIndex, endIndex),
    pagination: {
      totalItems,
      totalPages,
      page,
      pageSize: PAGE_SIZE,
    },
  };
};

const user = {
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: "user@test.com",
  password: "password",
};

const sessionId = faker.string.uuid();

const loginHandler = http.post("/api/auth/login", async ({ request }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const credentials = (await request.json()) as {
    email: string;
    password: string;
  };

  if (
    !credentials?.email ||
    !credentials?.password ||
    credentials.email !== user.email ||
    credentials.password !== user.password
  ) {
    return new HttpResponse(null, { status: 401 });
  }

  const { password, ...rest } = user;
  void password;
  return HttpResponse.json(rest, {
    headers: {
      "Set-Cookie": `sessionId=${sessionId}; Path=/; SameSite=Lax; HttpOnly=false`,
    },
  });
});

const meHandler = http.get("/api/auth/me", ({ cookies }) => {
  if (!cookies.sessionId) {
    return new HttpResponse(null, { status: 401 });
  }

  const { password, ...rest } = user;
  void password;
  return HttpResponse.json(rest);
});

const transactionsHandler = http.get(
  "/api/transactions",
  async ({ request, cookies }) => {
    if (!cookies.sessionId) {
      return new HttpResponse(null, { status: 401 });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const url = new URL(request.url);
    const merchant = url.searchParams.get("merchant") ?? "";
    const date = url.searchParams.get("date");
    const pageParam = url.searchParams.get("page") ?? "";
    const page = pageParam ? Number(pageParam) : 1;

    const filteredTransactions = transactions
      .filter((transaction) => {
        return transaction.merchant
          .toLowerCase()
          .includes(merchant.toLowerCase());
      })
      .filter((transaction) => {
        if (!date) {
          return true;
        }
        return (
          new Date(transaction.date).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
        );
      });

    return HttpResponse.json(paginate(filteredTransactions, page));
  }
);

const transactionHandler = http.get(
  "/api/transactions/:id",
  async ({ params, cookies }) => {
    if (!cookies.sessionId) {
      return new HttpResponse(null, { status: 401 });
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const transaction = transactions.find((txn) => txn.id === params.id);
    return transaction
      ? HttpResponse.json(transaction)
      : new HttpResponse(null, { status: 404 });
  }
);

const dashboardHandler = http.get("/api/dashboard/stats", async ({ cookies }) => {
  if (!cookies.sessionId) {
    return new HttpResponse(null, { status: 401 });
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const mostRecentTransactions = transactions.slice(0, 5);
  const expensesAmount = transactions
    .filter((txn) => txn.amount < 0)
    .reduce((total, curr) => (total += curr.amount), 0);
  const incomeAmount = transactions
    .filter((txn) => txn.amount > 0)
    .reduce((total, curr) => (total += curr.amount), 0);
  
  const accountBalance = incomeAmount + expensesAmount;

  const json = {
    accountBalance: {
      amount: accountBalance,
      currency: "USD",
    },
    quickStats: {
      income: {
        amount: incomeAmount,
        currency: "USD",
      },
      expenses: {
        amount: Math.abs(expensesAmount),
        currency: "USD",
      },
    },
    mostRecentTransactions: mostRecentTransactions.map((txn) => ({
      id: txn.id,
      date: txn.date,
      merchant: txn.merchant,
      amount: txn.amount,
    })),
  };

  return HttpResponse.json(json);
});

export const apiHandlers = [
  loginHandler,
  meHandler,
  dashboardHandler,
  transactionsHandler,
  transactionHandler,
];
