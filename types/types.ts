
export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    email: string;
    password: string;
}

export interface AuthFunctionProps {
    signIn: (formUser: LoginDto) => Promise<void>;
    signOut: () => Promise<void>;
    isSignedIn: boolean;
    signUp: () => Promise<void>;
    user: any
    setUser: () => void
}

export interface ChildrenProps {
    children: React.ReactNode;
}

export interface User {
    id: string;
    email: string;
    password: string;
    username: string;
}

export interface AuthContextProps {
    user: User | null;
    isSignedIn: boolean;
    signIn: (formUser: LoginDto) => Promise<void>;
    signOut: () => void;
    signUp: (newUser: RegisterDto) => Promise<void>;
    errors: string[]
}

export const defaultValue: AuthContextProps = {
    user: null,
    isSignedIn: false,
    signIn: async () => {},
    signOut: () => {},
    signUp: async () => {},
    errors: []
};

export interface Task {
    _id: string;
    title: string;
    description: string;
    priority: string
}

export interface TaskFunctionProps {
    createTask: (task: TaskDto) => void;
    deleteTask: (taskId: string) => void;
    updateTask: (taskUpdated: TaskUpdatedDto) => void;
    getTasks: () => void;
    tasks: Task[],
}

export const defaultTaskValue: TaskFunctionProps = {
    createTask: async () => {},
    deleteTask: () => {},
    updateTask: () => {},
    getTasks: () => {},
    tasks: [],
}


export type TaskDto = {
    title: string;
    description: string;
    priority: string
}

export type TaskUpdatedDto = {
    taskId: string;
    title?: string;
    description?: string;
    priority?: string;
}

export type UpdateTaskParams = {
    taskId: string
}

