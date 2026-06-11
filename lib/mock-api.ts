import { records } from "@/mock/data";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRecords({ pageParam = 0, query = "" }: { pageParam?: number; query?: string }) {
  await wait(450);
  const pageSize = 3;
  const normalized = query.trim().toLowerCase();
  const filtered = records.filter((record) =>
    [record.folio, record.client, record.status, record.owner].join(" ").toLowerCase().includes(normalized),
  );
  const start = pageParam * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    nextPage: start + pageSize < filtered.length ? pageParam + 1 : undefined,
    total: filtered.length,
  };
}

export async function mockSubmit() {
  await wait(700);
  return { ok: true, message: "Guardado correctamente" };
}
