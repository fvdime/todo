const LOCAL_STORAGE_KEY = "task";

export const storeDataInLocalStorage = (tasks) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
}