export interface User{
    id: number;
    username: string;
    email: string;
}

export interface LibraryInfo {
    id: number;
    creator: User;
    library_name: string;
    library_description: string;
    entry_key: string;
    joinable: boolean;
    updated_at: Date;
}


export interface HomeData {
    header: string
    header_active?: boolean;
    user: LibraryInfo;
    body: LibraryInfo[];
    active: boolean
}

export interface Member{
    id: number;
    user: User;
    library: LibraryInfo;
    is_admin: boolean;
}

export interface DetailData {
    header: string
    header_active: boolean;
    sub_header: string;
    body: Member;
    members: Member[];
    active: boolean;
    creator: boolean;
}

export interface ChatMessage {
    content: string;
    role: string;
}

export interface Course {
    id: number;
    course_name: string;
    course_description: string;
    library: LibraryInfo;
}

export interface LibraryData {
    header: LibraryInfo
    header_active: boolean;
    body: Course[];
    active: boolean;
}

export interface Document{
    id: number;
    user: User;
    course: Course;
    file: string
}

export interface CourseData {
    permission: boolean;
    data: Document[];
}


export interface Question {
    question: string;
    options: string[];
    explanation: string;
    answer: string;
}