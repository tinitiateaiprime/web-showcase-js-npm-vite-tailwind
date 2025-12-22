// src/DataTable.jsx
import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZES = [5, 10, 20, 50];

const seedEmployees = () => {
  const depts = ["Engineering", "HR", "Finance", "Marketing", "Sales"];
  const roles = ["Developer", "Manager", "Analyst", "Designer", "Lead"];
  const statuses = ["Active", "On Leave", "Inactive"];
  const arr = [];
  for (let i = 1; i <= 37; i++) {
    const d = depts[i % depts.length];
    const r = roles[i % roles.length];
    const s = statuses[i % statuses.length];
    arr.push({
      id: i,
      name: `Employee ${String(i).padStart(2, "0")}`,
      email: `employee${i}@company.com`,
      department: d,
      role: r,
      status: s,
      salary: 40000 + (i % 9) * 3500,
      joinedOn: new Date(2021, (i * 3) % 12, (i * 7) % 28 + 1).toISOString(),
    });
  }
  return arr;
};

// simple CSV exporter
function exportCSV(rows, filename = "export.csv") {
  if (!rows?.length) return;
  const columns = Object.keys(rows[0]);
  const escape = (v) =>
    `"${String(v ?? "").replaceAll(`"`, `""`).replaceAll("\n", " ")}"`;
  const header = columns.map(escape).join(",");
  const body = rows.map((r) => columns.map((c) => escape(r[c])).join(",")).join("\n");
  const blob = new Blob([header + "\n" + body], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const badge = (status) => {
  const map = {
    Active: "bg-green-100 text-green-700 ring-green-200",
    "On Leave": "bg-amber-100 text-amber-800 ring-amber-200",
    Inactive: "bg-gray-100 text-gray-700 ring-gray-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${map[status] || "bg-slate-100 text-slate-700 ring-slate-200"}`}>
      {status}
    </span>
  );
};

export default function DataTable() {
  // ----- data/loading -----
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // simulate fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(seedEmployees());
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // ----- table state -----
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "salary", label: "Salary", sortable: true },
    { key: "joinedOn", label: "Joined", sortable: true },
  ];

  // ----- filtering -----
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) => {
      const hay = `${r.name} ${r.email} ${r.department} ${r.role} ${r.status} ${r.salary}`.toLowerCase();
      return hay.includes(q);
    });
  }, [data, query]);

  // ----- sorting -----
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      // date
      if (sortKey === "joinedOn") {
        const da = new Date(va).getTime();
        const db = new Date(vb).getTime();
        return da === db ? 0 : da > db ? dir : -dir;
      }
      // number
      if (typeof va === "number" && typeof vb === "number") {
        return va === vb ? 0 : va > vb ? dir : -dir;
      }
      // fallback string
      return String(va ?? "").localeCompare(String(vb ?? ""), undefined, { numeric: true }) * dir;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // ----- pagination -----
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, pageCount);
  const start = (pageSafe - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  // reset selection when data/filtering/page changes
  useEffect(() => {
    setSelectedIds(new Set());
    if (page > pageCount) setPage(pageCount);
  }, [query, pageSize, pageCount, sortKey, sortDir]);

  // ----- helpers -----
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const allOnPageSelected = paged.length > 0 && paged.every((r) => selectedIds.has(r.id));
  const someOnPageSelected = paged.some((r) => selectedIds.has(r.id)) && !allOnPageSelected;

  const toggleSelectAllOnPage = () => {
    const next = new Set(selectedIds);
    if (allOnPageSelected) {
      paged.forEach((r) => next.delete(r.id));
    } else {
      paged.forEach((r) => next.add(r.id));
    }
    setSelectedIds(next);
  };

  const toggleRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const removeSelected = () => {
    if (!selectedIds.size) return;
    setData((d) => d.filter((r) => !selectedIds.has(r.id)));
    setSelectedIds(new Set());
    // keep pagination sane
    setPage(1);
  };

  const exportSelected = () => {
    if (selectedIds.size) {
      const rows = sorted.filter((r) => selectedIds.has(r.id));
      exportCSV(rows, "employees-selected.csv");
    } else {
      exportCSV(sorted, "employees-all.csv");
    }
  };

  const prettyMoney = (n) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const prettyDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10 px-4">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">📊 Employees</h1>
            <p className="text-slate-600">Search, sort, paginate, select, export.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportSelected}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Export CSV {selectedIds.size ? `(${selectedIds.size})` : ""}
            </button>
            <button
              onClick={removeSelected}
              disabled={!selectedIds.size}
              className={
                "rounded-md px-3 py-2 text-sm font-medium transition " +
                (selectedIds.size
                  ? "bg-rose-600 text-white hover:bg-rose-700"
                  : "bg-rose-200 text-white cursor-not-allowed")
              }
            >
              Delete Selected
            </button>
          </div>
        </header>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, dept, role…"
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-3 pr-9 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">⌘K</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600">
              Rows per page{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="ml-2 rounded border border-slate-300 bg-white px-2 py-1 text-sm"
              >
                {PAGE_SIZES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={() => {
                setQuery("");
                setSortKey("name");
                setSortDir("asc");
                setPage(1);
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 bg-slate-50 text-slate-700">
              <tr className="border-b border-slate-200">
                <th scope="col" className="w-10 px-3 py-2">
                  <input
                    type="checkbox"
                    aria-label="Select all rows on this page"
                    className="h-4 w-4 accent-indigo-600"
                    checked={allOnPageSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someOnPageSelected;
                    }}
                    onChange={toggleSelectAllOnPage}
                  />
                </th>
                {columns.map((c) => {
                  const active = sortKey === c.key;
                  const aria =
                    active ? (sortDir === "asc" ? "ascending" : "descending") : "none";
                  return (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={aria}
                      className={`select-none px-3 py-2 font-semibold ${c.sortable ? "cursor-pointer" : ""}`}
                      onClick={() => c.sortable && toggleSort(c.key)}
                      title={c.sortable ? "Click to sort" : undefined}
                    >
                      <div className="flex items-center gap-1">
                        {c.label}
                        {c.sortable && (
                          <span
                            className={`text-xs ${
                              active ? "text-indigo-600" : "text-slate-400"
                            }`}
                          >
                            {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
                <th scope="col" className="px-3 py-2 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading
                ? Array.from({ length: pageSize }).map((_, i) => (
                    <tr key={`sk-${i}`} className="animate-pulse">
                      <td className="px-3 py-3">
                        <div className="h-4 w-4 rounded bg-slate-200" />
                      </td>
                      {columns.map((c) => (
                        <td key={c.key} className="px-3 py-3">
                          <div className="h-4 w-28 rounded bg-slate-200" />
                        </td>
                      ))}
                      <td className="px-3 py-3">
                        <div className="ml-auto h-8 w-20 rounded bg-slate-200" />
                      </td>
                    </tr>
                  ))
                : paged.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Select ${r.name}`}
                          className="h-4 w-4 accent-indigo-600"
                          checked={selectedIds.has(r.id)}
                          onChange={() => toggleRow(r.id)}
                        />
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-900">{r.name}</td>
                      <td className="px-3 py-3 text-slate-600">{r.email}</td>
                      <td className="px-3 py-3">{r.department}</td>
                      <td className="px-3 py-3">{r.role}</td>
                      <td className="px-3 py-3">{badge(r.status)}</td>
                      <td className="px-3 py-3 tabular-nums">{prettyMoney(r.salary)}</td>
                      <td className="px-3 py-3 text-slate-600">{prettyDate(r.joinedOn)}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => alert(`Viewing ${r.name}`)}
                          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>

            {!loading && !paged.length && (
              <tfoot>
                <tr>
                  <td colSpan={columns.length + 2} className="px-3 py-10 text-center text-slate-500">
                    No results. Try adjusting your search.
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* pagination */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium">{total ? start + 1 : 0}</span>–
            <span className="font-medium">{Math.min(start + pageSize, total)}</span> of{" "}
            <span className="font-medium">{total}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe <= 1}
              className={
                "rounded-md px-3 py-2 text-sm " +
                (pageSafe <= 1
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50")
              }
            >
              Prev
            </button>
            <span className="text-sm text-slate-700">
              Page <span className="font-semibold">{pageSafe}</span> / {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={pageSafe >= pageCount}
              className={
                "rounded-md px-3 py-2 text-sm " +
                (pageSafe >= pageCount
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50")
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
