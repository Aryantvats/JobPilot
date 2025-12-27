"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

/* ------------------ Types ------------------ */

interface User {
  _id: string;
  name: string;
  email: string;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Education {
  degree: string;
  branch: string;
  year: number;
}

interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Bookmark {
  _id?: string;
  source: "internshala" | "career";
  title: string;
  company?: string;
  url: string;
}

export interface Profile {
  _id: string;
  userId: string;

  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  careerObjective?: string;

  education: Education[];
  workExperience: WorkExperience[];

  certifications?: string;
  projects?: string;
  skills?: string;
  interestedRoles?: string;

  githubLink?: string;
  resumeDriveLink?: string;

  createdAt: string;
  updatedAt: string;
}

interface AppContextType {
  router: ReturnType<typeof useRouter>;
  currency: string;

  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  token: string | null;

  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;

  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;

  mousePosition: MousePosition;
  setMousePosition: React.Dispatch<React.SetStateAction<MousePosition>>;

  careerPageJobs: unknown[];
  setCareerPageJobs: React.Dispatch<React.SetStateAction<unknown[]>>;

  internshalaJobs: unknown[];
  setInternshalaJobs: React.Dispatch<React.SetStateAction<unknown[]>>;

  fetchUser: () => Promise<void>;
  login: (formData: Record<string, unknown>) => Promise<void>;
  signup: (formData: Record<string, unknown>) => Promise<void>;
  logout: () => void;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  /* 🔥 Bookmarks */
  bookmarks: Bookmark[];
  fetchBookmarks: () => Promise<void>;
  addBookmark: (job: Bookmark) => Promise<void>;
  removeBookmark: (url: string) => Promise<void>;
  isBookmarked: (url?: string) => boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

/* ------------------ Context ------------------ */

const AppContext = createContext<AppContextType | undefined>(undefined);

/* ------------------ Provider ------------------ */

export const AppProvider = ({ children }: AppProviderProps) => {
  const router = useRouter();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "INR";

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const [careerPageJobs, setCareerPageJobs] = useState<unknown[]>([]);
  const [internshalaJobs, setInternshalaJobs] = useState<unknown[]>([]);

  /* 🔥 Bookmarks state (FULL objects) */
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  /* ------------------ Auth Helpers ------------------ */

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/me");
      if (data?.success) setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get("/api/v1/profile/me");
      if (data?.success) setProfile(data.profile);
    } catch {
      toast.error("Failed to fetch profile");
    }
  };

  const login = async (formData: Record<string, unknown>) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/login", formData);

      if (!data?.success) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      await Promise.all([
        fetchUser(),
        fetchUserProfile(),
        fetchBookmarks(),
      ]);

      toast.success("Login successful");
      router.push("/dashboard/careerPageJobs");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData: Record<string, unknown>) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/register", formData);
      if (data?.success) {
        toast.success("Signup successful. Please login.");
        router.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    setToken(null);
    setUser(null);
    setProfile(null);
    setBookmarks([]);
    router.push("/");
  };

  /* ------------------ Bookmark Helpers ------------------ */

  const fetchBookmarks = async () => {
    try {
      const { data } = await axios.get("/api/v1/bookmark");
      if (data?.success) {
        setBookmarks(data.bookmarks);
      }
    } catch {
      setBookmarks([]);
    }
  };

  const addBookmark = async (job: Bookmark) => {
    const { data } = await axios.post("/api/v1/bookmark", job);

    setBookmarks((prev) => {
      if (prev.some((b) => b.url === job.url)) return prev;
      return [...prev, data.bookmark || job];
    });

    toast.success("Job saved");
  };

  const removeBookmark = async (url: string) => {
    await axios.delete("/api/v1/bookmark", { data: { url } });

    setBookmarks((prev) => prev.filter((b) => b.url !== url));
    toast.success("Job removed");
  };

  const isBookmarked = (url?: string) => {
    if (!url) return false;
    return bookmarks.some((b) => b.url === url);
  };

  /* ------------------ Restore Session ------------------ */

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    setToken(storedToken);
    axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;

    fetchUser();
    fetchUserProfile();
    fetchBookmarks();
  }, []);

  /* ------------------ Context Value ------------------ */

  const value: AppContextType = {
    router,
    currency,

    user,
    setUser,

    token,

    profile,
    setProfile,

    showLogin,
    setShowLogin,

    mousePosition,
    setMousePosition,

    careerPageJobs,
    setCareerPageJobs,

    internshalaJobs,
    setInternshalaJobs,

    fetchUser,
    login,
    signup,
    logout,

    loading,
    setLoading,

    bookmarks,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/* ------------------ Hook ------------------ */

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
