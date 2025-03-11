import {create} from "zustand";
import { User } from "../constans/type";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
}
const useUsers = create<UserState>((set: any) => ({
  users: [],
  setUsers: (users: User[]) => set({ users }),
}));

export default useUsers;

