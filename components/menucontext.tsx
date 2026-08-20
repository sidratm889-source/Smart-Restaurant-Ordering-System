"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { menuItems } from "../data/menuitems";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const STORAGE_KEY = "restaurant-menu";

const MenuContext = createContext<any>(null);

export function toSlugId(value: string) {
  return String(value).toLowerCase().trim().replace(/\s+/g, "-");
}

function makeItemId(name: string, existingId?: string) {
  if (existingId && !/\s/.test(String(existingId))) return String(existingId);
  return `${toSlugId(name || existingId || "item")}-${Date.now()}`;
}

function normalizeMenuItems(items: any[]) {
  return items.map((item) => {
    if (!item.id || /\s/.test(String(item.id))) {
      return { ...item, id: makeItemId(item.name, item.id) };
    }
    return item;
  });
}

function readStoredMenu() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return normalizeMenuItems(JSON.parse(saved));
  } catch {
    return null;
  }
  return null;
}

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>(menuItems);
  const skipFirestoreOverwrite = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = readStoredMenu();
    if (stored?.length) {
      setItems(stored);
      skipFirestoreOverwrite.current = true;
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "menu"),
      (snap) => {
        if (snap.empty) return;
        if (skipFirestoreOverwrite.current) return;
        setItems(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
        skipFirestoreOverwrite.current = true;
      },
      (error) => {
        // Firestore read blocked — keep localStorage / default menuItems
        console.warn("Menu sync unavailable:", error.message);
      }
    );

    return () => unsub();
  }, []);

  const updateMenuItem = useCallback(async (updatedItem: any) => {
    const { id, ...data } = updatedItem;
    skipFirestoreOverwrite.current = true;
    setItems((prev) => {
      const next = prev.map((item) => (item.id === id ? updatedItem : item));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    try {
      await setDoc(doc(db, "menu", id), data, { merge: true });
    } catch {
      // Saved locally; publish Firestore rules to sync to cloud
    }
  }, []);
  const addMenuItem = useCallback(async (newItem: any) => {
    const id = makeItemId(newItem.name, newItem.id);
    const itemWithId = { ...newItem, id };
    skipFirestoreOverwrite.current = true;
  
    setItems((prev) => {
      const next = [...prev, itemWithId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    try{
      const { id: _id, ...data } = itemWithId;
      await setDoc(doc(db, "menu", id), data, { merge: true });
    }catch{

    }
  }, []);

  const deleteMenuItem = useCallback(async (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteDoc(doc(db, "menu", id));
    } catch {
      // Deleted locally only
    }
  }, []);

  return (
    <MenuContext.Provider
      value={{
        items,
        setItems,
        updateMenuItem,
        deleteMenuItem,
        addMenuItem,
        loaded,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
