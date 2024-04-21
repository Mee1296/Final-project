import { BACKEND_URL } from "./config.js";

export async function getItems() {
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());

  return items;
}

export async function createItem(item) {
  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id, item) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}

export async function filterItems(filterName, lowerPrice, upperPrice) {
  // TODO3: implement this function
  // You may need to understand handleFilterItem() function in ./table.js before implementing this function.
  const data = {"filtername" : filterName,
              "lowerprice" : lowerPrice,
              "upperprice" : upperPrice}
  const filtered = await fetch(`${BACKEND_URL}/items/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
  return filtered
}

export async function getMembers() {
  // TODO4: implement this function
  const members = await fetch(`${BACKEND_URL}/members`).then((r) => r.json());

  return members;
}

export async function createMember(member) {
  // TODO4: implement this function
  await fetch(`${BACKEND_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
}

export async function deleteMember(id, item) {
  // TODO4: implement this function
  await fetch(`${BACKEND_URL}/members/${id}`, {
    method: "DELETE",
  });
}